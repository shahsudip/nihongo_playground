const puppeteer = require('puppeteer');
const fs = require('fs');

async function dumpKanji() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://www.jlptmatome.com/japanese-kanji/%E5%AE%89-kanji-meaning', { waitUntil: 'networkidle2' });
    
    // Wait for the data to load
    await new Promise(res => setTimeout(res, 3000)); 

    const html = await page.evaluate(() => {
        // Try to find the container that holds the kanji details
        const main = document.querySelector('div.bg-[#D8F1FD]') || document.body;
        return main.innerHTML;
    });
    
    fs.writeFileSync('main_content.html', html);
    await browser.close();
}
dumpKanji().catch(console.error);
