const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./service-account.json');
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

async function scrapeVocabDeep() {
  console.log("Starting deep vocab scraper with client-side pagination...");
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  
  const level = 'N2';
  let allLinks = [];

  await page.goto(`https://www.jlptmatome.com/jlpt-${level.toLowerCase()}-vocabulary-list`, {waitUntil: 'networkidle0'});
  
  let hasNext = true;
  let pageNum = 1;
  while (hasNext) {
    console.log(`Extracting links from page ${pageNum}...`);
    // Wait for links to render
    await new Promise(r => setTimeout(r, 1000));

    const linksOnPage = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        return anchors.map(a => a.href).filter(h => h.includes('/japanese-vocabulary/'));
    });
    
    allLinks.push(...linksOnPage);
    
    hasNext = await page.evaluate(() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next'));
        if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
            return true;
        }
        return false;
    });
    pageNum++;
  }
  
  const uniqueLinks = [...new Set(allLinks)];
  console.log(`Found ${uniqueLinks.length} vocab words across all pages. Beginning deep scrape...`);
  
  let batch = db.batch();
  let count = 0;
  let orderIndex = 0;
  
  for (const url of uniqueLinks) {
    try {
      await page.goto(url, {waitUntil: 'networkidle0'});
      await page.waitForSelector('#word-section h1', {timeout: 5000}).catch(() => null);
      
      const data = await page.evaluate(() => {
        const result = {
          japanese: '',
          english: '',
          hiragana: '',
          romaji: '',
          examples: []
        };
        
        const titleEl = document.querySelector('#word-section h1') || document.querySelector('h1.text-4xl');
        if (titleEl) result.japanese = titleEl.innerText.trim();
        
        const meaningTitle = Array.from(document.querySelectorAll('h3')).find(h3 => h3.innerText.includes('Meaning'));
        if (meaningTitle && meaningTitle.nextElementSibling) {
            result.english = meaningTitle.nextElementSibling.innerText.trim();
        }

        const hiraganaTitle = Array.from(document.querySelectorAll('h3')).find(h3 => h3.innerText.includes('Hiragana'));
        if (hiraganaTitle && hiraganaTitle.nextElementSibling) {
            result.hiragana = hiraganaTitle.nextElementSibling.innerText.trim();
        }

        const romajiTitle = Array.from(document.querySelectorAll('h3')).find(h3 => h3.innerText.includes('Romaji'));
        if (romajiTitle && romajiTitle.nextElementSibling) {
            result.romaji = romajiTitle.nextElementSibling.innerText.trim();
        }

        const exampleCards = document.querySelectorAll('.bg-gradient-to-r.from-gray-100');
        exampleCards.forEach(card => {
            const lines = Array.from(card.querySelectorAll('.text-center p')).map(p => p.innerText.trim());
            if (lines.length >= 4) {
                result.examples.push({
                    japanese: lines[0],
                    hiragana: lines[1],
                    romaji: lines[2],
                    english: lines[3]
                });
            } else if (lines.length === 3) {
                 result.examples.push({
                    japanese: lines[0],
                    hiragana: lines[0], 
                    romaji: lines[1],
                    english: lines[2]
                });
            }
        });
        
        return result;
      });
      
      if (data.japanese) {
        data.orderIndex = orderIndex++;
        let safeId = data.japanese.replace(/\//g, '_').trim();
        const docRef = db.collection('JLPT-matome').doc(level).collection('vocablist').doc(safeId);
        batch.set(docRef, data, {merge: true});
        count++;
        console.log(`Scraped: ${data.japanese} (${data.examples.length} examples)`);
        
        if (count % 50 === 0) {
            await batch.commit();
            batch = db.batch(); // Create a new batch!
            console.log(`Committed ${count} records...`);
        }
      }
    } catch (e) {
      console.error(`Failed to scrape ${url}`, e.message);
    }
  }
  
  if (count % 50 !== 0 && count > 0) {
      await batch.commit();
  }
  
  console.log(`Successfully completed! Deep scraped and uploaded ${count} vocab points.`);
  await browser.close();
}

scrapeVocabDeep();
