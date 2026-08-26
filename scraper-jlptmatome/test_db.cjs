const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../scraper-test/service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function run() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const url = 'https://www.jlptmatome.com/japanese-kanji/%E5%AE%89-kanji-meaning';
    
    console.log(`Scraping: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(2000);
    
    const data = await page.evaluate(() => {
        let result = {
            kanji: null,
            onyomi: null,
            kunyomi: null,
            meaning: null,
            strokeCount: null,
            kanjiDrawingSetupCode: null,
            wordExamples: [],
            exampleSentences: []
        };
        
        // JSON-LD
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        for (let s of scripts) {
            try {
                const json = JSON.parse(s.innerText);
                if (json['@type'] === 'WebPage' && json.mainEntity) {
                    const me = json.mainEntity;
                    result.kanji = me.name;
                    result.meaning = me.description;
                    
                    const parts = me.termCode ? me.termCode.split(',') : [];
                    if (parts.length > 0) result.onyomi = parts[0].trim();
                    if (parts.length > 1) result.kunyomi = parts[1].trim();
                    
                    if (me.exampleOfWork && Array.isArray(me.exampleOfWork)) {
                        me.exampleOfWork.forEach(ex => {
                            if (ex.text) {
                                if (ex.text.example_type === 'word') {
                                    result.wordExamples.push(ex.text.example);
                                } else if (ex.text.example_type === 'sentence') {
                                    result.exampleSentences.push(ex.text.example);
                                }
                            }
                        });
                    }
                }
            } catch(e) {}
        }
        
        const h3s = Array.from(document.querySelectorAll('h3, p, div.font-semibold'));
        for (let el of h3s) {
            const text = el.innerText?.trim();
            if (text === 'Strokes') {
                result.strokeCount = el.nextElementSibling?.innerText?.trim();
            }
        }
        
        const drawingHeading = Array.from(document.querySelectorAll('div')).find(el => el.innerText && el.innerText.trim().toUpperCase().startsWith('HOW TO WRITE THE KANJI'));
        if (drawingHeading && drawingHeading.nextElementSibling) {
            const svg = drawingHeading.nextElementSibling.querySelector('svg');
            if (svg) {
                result.kanjiDrawingSetupCode = svg.outerHTML;
            }
        }
        
        return result;
    });
    
    if (data.kanji) {
        await db.collection('JLPT-matome').doc(data.kanji).set(data);
        console.log(`Saved ${data.kanji} to DB.`);
    } else {
        console.log(`Failed to parse kanji data from JSON-LD.`);
    }
    
    console.log(JSON.stringify(data, null, 2));

    await browser.close();
    process.exit(0);
}

run().catch(console.error);
