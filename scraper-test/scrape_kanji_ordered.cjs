const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./service-account.json');
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function scrapeKanjiOrdered() {
  console.log("Scraping kanji in exact webpage order with correct selectors...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const level = 'N5';

  await page.goto(`https://www.jlptmatome.com/jlpt-${level.toLowerCase()}-kanji-list`, { waitUntil: 'networkidle0' });

  // Step 1: collect all links in exact page order
  let allLinks = [];
  let pageNum = 1;
  while (true) {
    await new Promise(r => setTimeout(r, 1000));
    const links = await page.evaluate(() => {
      const seen = new Set();
      const ordered = [];
      for (const a of document.querySelectorAll('a[href*="/japanese-kanji/"]')) {
        if (!seen.has(a.href)) {
          seen.add(a.href);
          ordered.push(a.href);
        }
      }
      return ordered;
    });
    console.log(`List page ${pageNum}: ${links.length} unique kanji`);
    allLinks.push(...links);

    const clicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next') && !b.disabled);
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    pageNum++;
  }

  console.log(`Total unique kanji to scrape: ${allLinks.length}`);

  let batch = db.batch();
  let count = 0;

  for (const url of allLinks) {
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.waitForSelector('#kanji-section h1', { timeout: 5000 }).catch(() => null);

      const data = await page.evaluate(() => {
        const result = { 
          kanji: '', 
          onyomi: '', 
          kunyomi: '', 
          meaning: '',
          wordExamples: [],
          sentenceExamples: []
        };

        // Correct selector: #kanji-section h1 (not the first h1 which is level "N5")
        const kanjiH1 = document.querySelector('#kanji-section h1');
        if (kanjiH1) result.kanji = kanjiH1.innerText.trim();

        // Find the section with "MEANING, PRONUNCIATION..."
        const meaningSection = Array.from(document.querySelectorAll('.bg-black.text-white'))
          .find(el => el.innerText.includes('MEANING') || el.innerText.includes('PRONUNCIATION'));
        
        if (meaningSection && meaningSection.nextElementSibling) {
          const content = meaningSection.nextElementSibling;
          // Onyomi
          const onyomiEl = Array.from(content.querySelectorAll('h3, p, div'))
            .find(el => el.innerText.includes('Onyomi'));
          if (onyomiEl && onyomiEl.nextElementSibling) {
            result.onyomi = onyomiEl.nextElementSibling.innerText.trim();
          }
          // Kunyomi
          const kunyomiEl = Array.from(content.querySelectorAll('h3, p, div'))
            .find(el => el.innerText.includes('Kunyomi'));
          if (kunyomiEl && kunyomiEl.nextElementSibling) {
            result.kunyomi = kunyomiEl.nextElementSibling.innerText.trim();
          }
          // Meaning
          const meaningEl = Array.from(content.querySelectorAll('h3, p, div'))
            .find(el => el.innerText.trim() === 'Meaning');
          if (meaningEl && meaningEl.nextElementSibling) {
            result.meaning = meaningEl.nextElementSibling.innerText.trim();
          }
        }

        // Word examples - under "WORD EXAMPLES USING..."
        const wordSection = Array.from(document.querySelectorAll('.bg-black.text-white'))
          .find(el => el.innerText.includes('WORD EXAMPLES'));
        if (wordSection && wordSection.nextElementSibling) {
          const content = wordSection.nextElementSibling.innerText.trim();
          const lines = content.split('\n').map(l => l.trim()).filter(l => l);
          for (let i = 0; i + 3 < lines.length; i += 4) {
            result.wordExamples.push({
              japanese: lines[i],
              hiragana: lines[i + 1],
              romaji: lines[i + 2],
              english: lines[i + 3]
            });
          }
        }

        // Sentence examples - under "SENTENCE EXAMPLES USING..."
        const sentenceSection = Array.from(document.querySelectorAll('.bg-black.text-white'))
          .find(el => el.innerText.includes('SENTENCE EXAMPLES'));
        if (sentenceSection && sentenceSection.nextElementSibling) {
          const content = sentenceSection.nextElementSibling.innerText.trim();
          const lines = content.split('\n').map(l => l.trim()).filter(l => l);
          for (let i = 0; i + 3 < lines.length; i += 4) {
            result.sentenceExamples.push({
              japanese: lines[i],
              hiragana: lines[i + 1],
              romaji: lines[i + 2],
              english: lines[i + 3]
            });
          }
        }

        return result;
      });

      if (data.kanji && data.kanji !== 'N5') {
        const safeId = data.kanji.replace(/\//g, '_').trim();
        data.orderIndex = count; // strict index in webpage order
        const docRef = db.collection('JLPT-matome').doc(level).collection('kanjilist').doc(safeId);
        batch.set(docRef, data, { merge: true });
        count++;
        console.log(`[${count}] ${data.kanji} - onyomi:${data.onyomi?.substring(0,10)} meaning:${data.meaning?.substring(0,20)}`);

        if (count % 50 === 0) {
          await batch.commit();
          batch = db.batch();
          console.log(`Committed ${count} records...`);
        }
      } else {
        console.warn(`Skipped bad entry from ${url}: kanji="${data.kanji}"`);
      }
    } catch (e) {
      console.error(`Failed: ${url}`, e.message);
    }
  }

  if (count % 50 !== 0 && count > 0) await batch.commit();
  console.log(`\nDone! Scraped and indexed ${count} kanji in exact webpage order.`);
  await browser.close();
}

scrapeKanjiOrdered();
