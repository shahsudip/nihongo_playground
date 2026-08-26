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
    
    // 1. Get all N5 kanji links
    const kanjiLinks = new Set();
    const listPage = await browser.newPage();
    
    console.log("Fetching N5 kanji list...");
    for (let i = 1; i <= 3; i++) {
        const url = `https://www.jlptmatome.com/jlpt-n5-kanji-list?page=${i}`;
        await listPage.goto(url, { waitUntil: 'networkidle2' });
        await delay(2000);
        
        const links = await listPage.evaluate(() => {
            return Array.from(document.querySelectorAll('a'))
                .map(a => a.href)
                .filter(href => href.includes('/japanese-kanji/') && !href.includes('/articles'));
        });
        
        links.forEach(l => kanjiLinks.add(l));
        console.log(`Page ${i}: Found ${links.length} links. Total unique: ${kanjiLinks.size}`);
    }
    await listPage.close();

    const kanjiArray = Array.from(kanjiLinks);
    console.log(`Total N5 kanji to scrape: ${kanjiArray.length}`);
    
    // 1.5 Delete existing N5 kanji
    const snapshot = await db.collection('JLPT-matome').doc('N5').collection('kanjilist').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    console.log(`Deleted ${snapshot.docs.length} old kanji records.`);

    // 2. Scrape each kanji
    const page = await browser.newPage();
    let orderIndex = 0;
    for (let url of kanjiArray) {
        console.log(`Scraping: ${url}`);
        let retries = 3;
        while (retries > 0) {
            try {
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
                                
                                // parse termCode for onyomi/kunyomi
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
                    
                    // Stroke count
                    const h3s = Array.from(document.querySelectorAll('h3, p, div.font-semibold'));
                    for (let el of h3s) {
                        const text = el.innerText?.trim();
                        if (text === 'Strokes') {
                            result.strokeCount = el.nextElementSibling?.innerText?.trim();
                        }
                    }
                    
                    // SVG Drawing
                    const drawingHeading = Array.from(document.querySelectorAll('div.bg-black')).find(el => el.innerText && el.innerText.trim().toUpperCase().startsWith('HOW TO WRITE THE KANJI'));
                    if (drawingHeading && drawingHeading.nextElementSibling) {
                        const svg = drawingHeading.nextElementSibling.querySelector('svg');
                        if (svg) {
                            result.kanjiDrawingSetupCode = svg.outerHTML;
                        }
                    }
                    
                    return result;
                });
                
                if (data.kanji) {
                    data.orderIndex = orderIndex++;
                    // updated to match user request: JLPT-matome -> N5 -> kanjilist
                    await db.collection('JLPT-matome').doc('N5').collection('kanjilist').doc(data.kanji).set(data);
                    console.log(`Saved ${data.kanji} to DB.`);
                } else {
                    console.log(`Failed to parse kanji data from JSON-LD.`);
                }
                break;
            } catch (err) {
                console.error(`Error on ${url}: ${err.message}`);
                retries--;
                if (retries === 0) console.log(`Skipping ${url}`);
                else await delay(3000);
            }
        }
    }
    
    await browser.close();
    console.log("Done scraping N5 kanji!");
    process.exit(0);
}

run().catch(console.error);
