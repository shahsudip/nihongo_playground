const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../scraper-test/service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function scrapeKanji(url) {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for the data to load
    await delay(3000); 

    const data = await page.evaluate(() => {
        const kanji = document.querySelector('h1')?.innerText || ''; 
        // We will return the innerText of some key elements
        return {
            kanji,
            text: document.body.innerText.substring(0, 500)
        };
    });
    
    console.log("Scraped data:", data);
    
    await browser.close();
}

scrapeKanji('https://www.jlptmatome.com/japanese-kanji/%E5%AE%89-kanji-meaning').catch(console.error);
