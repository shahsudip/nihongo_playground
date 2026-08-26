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
      const buttons = Array.from(document.querySelectorAll('button, div')).filter(el => el.innerText && el.innerText.includes('More details'));
      
      for (const btn of buttons) {
          const card = btn.closest('.border-gray-200, .bg-white, .rounded-lg');
          if (!card) continue;
          
          try {
              const kanji = card.querySelector('.text-5xl, .text-4xl, h2')?.innerText.trim() || '';
              
              const box = card.querySelector('.bg-gray-100');
              if (!box) continue;
              
              const texts = Array.from(box.querySelectorAll('p, div, span')).map(el => el.innerText.trim()).filter(t => t);
              
              rows.push({
                  japanese: kanji,
                  hiragana: texts.length > 0 ? texts[0] : '',
                  romaji: texts.length > 1 ? texts[1] : '',
                  english: texts.length > 2 ? texts[2] : ''
              });
          } catch (e) {}
      }
      return rows;
  });
  
  console.log(`Found ${list.length} vocab on main page. Uploading to Firestore...`);
  
  const batch = db.batch();
  let count = 0;
  
  for (const item of list) {
      if (!item.japanese) continue;
      
      const docRef = db.collection('JLPT-matome').doc(level).collection('vocablist').doc(item.japanese);
      batch.set(docRef, {
          japanese: item.japanese,
          hiragana: item.hiragana,
          romaji: item.romaji,
          english: item.english,
          timestamp: new Date().toISOString()
      }, {merge: true});
      
      count++;
      if (count % 500 === 0) {
          await batch.commit();
      }
  }
  
  if (count % 500 !== 0) {
      await batch.commit();
  }
  
  console.log(`Successfully uploaded ${count} vocab words to JLPT-matome/${level}/vocablist !`);
  await browser.close();
}

scrapeVocab();
