const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./service-account.json');
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function kanjiFromUrl(href) {
  try {
    const path = decodeURIComponent(href);
    const part = path.split('/japanese-kanji/')[1] || '';
    return part.replace(/-kanji-meaning.*$/, '').trim();
  } catch (e) { return ''; }
}

async function compare() {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  await page.goto('https://www.jlptmatome.com/jlpt-n5-kanji-list', {waitUntil: 'networkidle0'});

  // Collect ALL kanji across all pages with global dedup
  const globalSeen = new Set();
  let allHrefs = [];
  let pageNum = 1;
  while (true) {
    await new Promise(r => setTimeout(r, 1000));
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href*="/japanese-kanji/"]')).map(a => a.href)
    );
    for (const href of hrefs) {
      if (!globalSeen.has(href)) { globalSeen.add(href); allHrefs.push(href); }
    }
    console.log(`Page ${pageNum}: ${allHrefs.length} unique so far`);
    const clicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next') && !b.disabled);
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    pageNum++;
  }
  await browser.close();

  const realOrder = allHrefs.map(kanjiFromUrl);
  console.log('\n=== REAL WEBPAGE ORDER (all', realOrder.length, 'kanji) ===');
  realOrder.forEach((k, i) => process.stdout.write(`${i+1}.${k}  `));
  console.log('\n');

  // Get DB order
  const snap = await db.collection('JLPT-matome').doc('N5').collection('kanjilist').orderBy('orderIndex','asc').get();
  const dbOrder = snap.docs.map(d => d.id);
  console.log('=== DB ORDER (', dbOrder.length, 'kanji) ===');
  dbOrder.forEach((k, i) => process.stdout.write(`${i+1}.${k}  `));
  console.log('\n');

  // Find differences
  console.log('=== DIFFERENCES ===');
  const maxLen = Math.max(realOrder.length, dbOrder.length);
  let diffs = 0;
  for (let i = 0; i < maxLen; i++) {
    if (realOrder[i] !== dbOrder[i]) {
      console.log(`Position ${i+1}: Real="${realOrder[i]}" vs DB="${dbOrder[i]}"`);
      diffs++;
    }
  }
  if (diffs === 0) console.log('PERFECT MATCH! ✓');
  else console.log(`Total differences: ${diffs}`);
}

compare();
