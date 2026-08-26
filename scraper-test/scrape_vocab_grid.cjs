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
  
  const level = 'N5';
  console.log(`Navigating to JLPT ${level} Vocab List...`);
  
  await page.goto(`https://www.jlptmatome.com/jlpt-${level.toLowerCase()}-vocabulary-list`, {waitUntil: 'networkidle0'});
  
  // Scrape the grid on the main page
  const list = await page.evaluate(() => {
      const rows = [];
      // The cards are in a grid, inside <a> tags usually if they are clickable, or just divs.
      // Let's find all the "More details" buttons to locate the cards
      const buttons = Array.from(document.querySelectorAll('button, div')).filter(el => el.innerText && el.innerText.includes('More details'));
      
      for (const btn of buttons) {
          // the card is likely the parent container
          const card = btn.closest('.border-gray-200, .bg-white, .rounded-lg'); // Adjust based on common classes
          if (!card) continue;
          
          try {
              // Giant text (kanji/kana)
              const kanji = card.querySelector('.text-5xl, .text-4xl, h2')?.innerText.trim() || '';
              
              // Gray box
              const box = card.querySelector('.bg-gray-100');
              if (!box) continue;
              
              const texts = Array.from(box.querySelectorAll('p, div, span')).map(el => el.innerText.trim()).filter(t => t);
              // usually texts[0] = hiragana, texts[1] = romaji, texts[2] = meaning
              
              rows.push({
                  kanji,
                  hiragana: texts.length > 0 ? texts[0] : '',
                  romaji: texts.length > 1 ? texts[1] : '',
                  meaning: texts.length > 2 ? texts[2] : ''
              });
          } catch (e) {}
      }
      return rows;
  });
  
  console.log(`Found ${list.length} vocab on main page.`);
  if (list.length > 0) console.log(list[0]);
  
  await browser.close();
}

scrapeVocab();
