const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./service-account.json');
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

async function scrapeVocab() {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  
  // We'll scrape N5 first
  const level = 'N5';
  console.log(`Navigating to JLPT ${level} Vocab List...`);
  
  await page.goto(`https://www.jlptmatome.com/jlpt-${level.toLowerCase()}-vocabulary-list`, {waitUntil: 'networkidle0'});
  
  // The vocab cards are inside the grid
  // They are clickable divs with <a href="/japanese-vocabulary/...">
  const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href^="/japanese-vocabulary/"]'));
      // Filter out duplicate links
      const uniqueHrefs = [...new Set(anchors.map(a => a.href))];
      return uniqueHrefs;
  });
  
  console.log(`Found ${links.length} vocabulary words for ${level}. Scraping...`);
  
  let i = 0;
  for (const url of links.slice(0, 50)) { // Just scrape first 50 to avoid taking too long for now
      i++;
      console.log(`Scraping ${i}/${links.length}: ${url}`);
      try {
          await page.goto(url, {waitUntil: 'networkidle0'});
          
          // Try to extract the JSON-LD data
          const vocabData = await page.evaluate(() => {
              const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
              let data = null;
              for (const script of scripts) {
                  try {
                      const json = JSON.parse(script.innerText);
                      if (json['@type'] && json['@type'].includes('Vocab')) {
                          data = json;
                      } else if (json['@type'] === 'WebPage' && json.mainEntity) {
                          data = json.mainEntity;
                      } else if (json.headline && json.headline.includes('Meaning')) {
                          data = json;
                      }
                  } catch (e) {}
              }
              
              // Fallback to DOM parsing if JSON-LD fails
              const meaningBox = document.querySelector('.bg-gray-100');
              return {
                  kanji: document.querySelector('h1')?.innerText.replace(' Meaning', '') || '',
                  meaning: document.querySelector('.font-bold.text-gray-700')?.innerText || '',
                  hiragana: document.querySelectorAll('.text-gray-600')[0]?.innerText || '',
                  romaji: document.querySelectorAll('.text-gray-600')[1]?.innerText || '',
                  example: document.querySelector('.bg-gray-100 p')?.innerText || ''
              };
          });
          
          console.log(vocabData);
      } catch (err) {
          console.error(`Failed ${url}`, err);
      }
  }
  
  await browser.close();
}

scrapeVocab();
