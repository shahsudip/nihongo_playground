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
  } catch (e) {
    return '';
  }
}

async function fixKanjiOrder() {
  console.log("Fixing kanji orderIndex with GLOBAL deduplication across all pages...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const level = 'N5';

  await page.goto(`https://www.jlptmatome.com/jlpt-${level.toLowerCase()}-kanji-list`, { waitUntil: 'networkidle0' });

  // Collect all hrefs with GLOBAL deduplication (one Set across all pages)
  const globalSeen = new Set();
  let allHrefs = [];
  let pageNum = 1;

  while (true) {
    await new Promise(r => setTimeout(r, 1000));
    const hrefs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href*="/japanese-kanji/"]')).map(a => a.href);
    });

    // Add to global list only if not seen before (preserves first-seen order)
    for (const href of hrefs) {
      if (!globalSeen.has(href)) {
        globalSeen.add(href);
        allHrefs.push(href);
      }
    }
    console.log(`Page ${pageNum}: collected so far = ${allHrefs.length} unique kanji`);

    const clicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next') && !b.disabled);
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    pageNum++;
  }

  // Decode kanji from URLs
  const allKanji = allHrefs.map((href, i) => ({
    href,
    kanji: kanjiFromUrl(href),
    orderIndex: i
  }));

  console.log(`\nTotal unique kanji (globally deduplicated): ${allKanji.length}`);
  console.log('First 10:', allKanji.slice(0, 10).map(k => k.kanji).join(', '));
  console.log('Last 5:', allKanji.slice(-5).map(k => k.kanji).join(', '));

  // Get existing kanji in DB
  const existingDocs = await db.collection('JLPT-matome').doc(level).collection('kanjilist').get();
  const existingIds = new Set(existingDocs.docs.map(d => d.id));
  console.log(`DB has ${existingIds.size} kanji`);

  // Update only orderIndex for each kanji
  let batch = db.batch();
  let updateCount = 0;

  for (const { kanji, orderIndex } of allKanji) {
    const safeId = kanji.replace(/\//g, '_').trim();
    if (existingIds.has(safeId)) {
      const docRef = db.collection('JLPT-matome').doc(level).collection('kanjilist').doc(safeId);
      batch.update(docRef, { orderIndex });
      updateCount++;
    } else {
      console.log(`MISSING in DB: ${kanji} (orderIndex=${orderIndex})`);
    }
  }

  await batch.commit();
  console.log(`\n✓ Updated orderIndex for ${updateCount} kanji. No duplicates!`);
  await browser.close();
}

fixKanjiOrder();
