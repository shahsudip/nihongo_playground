const puppeteer = require('puppeteer');
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function testExtract() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://www.jlptmatome.com/japanese-kanji/%E5%AE%89-kanji-meaning', { waitUntil: 'networkidle2' });
    await delay(3000); 

    const data = await page.evaluate(() => {
        // Find kanji character (it's the big text)
        const kanjiEl = Array.from(document.querySelectorAll('h2')).find(el => el.innerText.includes('KANJI DETAILS'));
        let kanji = '';
        if (kanjiEl && kanjiEl.nextElementSibling) {
            kanji = kanjiEl.nextElementSibling.innerText.trim();
        } else {
             // Fallback
             kanji = document.querySelector('.text-\\[100px\\]')?.innerText || '';
        }

        const sections = Array.from(document.querySelectorAll('h3, p, div'));
        
        let onyomi = '';
        let kunyomi = '';
        let meaning = '';
        let strokeCount = '';
        
        for (let el of sections) {
            const text = el.innerText?.trim();
            if (el.tagName.toLowerCase() === 'h3' || el.tagName.toLowerCase() === 'p') {
                if (text === 'Onyomi') onyomi = el.nextElementSibling?.innerText?.trim();
                else if (text === 'Kunyomi') kunyomi = el.nextElementSibling?.innerText?.trim();
                else if (text === 'Meaning') meaning = el.nextElementSibling?.innerText?.trim();
                else if (text === 'Strokes') strokeCount = el.nextElementSibling?.innerText?.trim();
            }
        }
        
        // svg kanji drawing
        const drawingSection = Array.from(document.querySelectorAll('div')).find(el => el.innerText && el.innerText.trim().startsWith('HOW TO WRITE THE KANJI'));
        let kanjiDrawingSetupCode = '';
        if (drawingSection && drawingSection.nextElementSibling) {
            kanjiDrawingSetupCode = drawingSection.nextElementSibling.innerHTML;
        }

        // word examples
        const wordSection = Array.from(document.querySelectorAll('div')).find(el => el.innerText && el.innerText.trim().startsWith('WORD EXAMPLES USING'));
        const wordExamples = [];
        if (wordSection && wordSection.nextElementSibling) {
             let container = wordSection.nextElementSibling;
             // Usually each word is a flex container or anchor tag block
             let words = container.querySelectorAll('a');
             words.forEach(w => {
                 // Try to format it
                 let lines = w.innerText.split('\n').map(l => l.trim()).filter(l => l);
                 if (lines.length > 0) wordExamples.push(lines.join(' | '));
             });
        }

        // sentence examples
        const sentenceSection = Array.from(document.querySelectorAll('div')).find(el => el.innerText && el.innerText.trim().startsWith('SENTENCE EXAMPLES USING'));
        const exampleSentences = [];
        if (sentenceSection && sentenceSection.nextElementSibling) {
             let container = sentenceSection.nextElementSibling;
             let cards = container.querySelectorAll('.bg-white.border'); // usually cards have bg-white border
             if (cards.length === 0) cards = container.children;
             Array.from(cards).forEach(c => {
                 let lines = c.innerText.split('\n').map(l => l.trim()).filter(l => l);
                 if (lines.length > 0) exampleSentences.push(lines.join(' | '));
             });
        }
        
        return {
            kanji,
            onyomi,
            kunyomi,
            meaning,
            strokeCount,
            hasSvg: !!kanjiDrawingSetupCode,
            kanjiDrawingSetupCode: kanjiDrawingSetupCode.substring(0, 100) + '...', // print first 100 chars
            wordExamples: wordExamples.slice(0, 2),
            exampleSentences: exampleSentences.slice(0, 2)
        };
    });
    
    console.log(JSON.stringify(data, null, 2));
    await browser.close();
}
testExtract().catch(console.error);
