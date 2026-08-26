const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./service-account.json');
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

async function scrapeGrammar() {
  console.log("Starting grammar scraper with client-side pagination...");
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  
  const level = 'N1';
  let allLinks = [];

  await page.goto(`https://www.jlptmatome.com/jlpt-${level.toLowerCase()}-grammar-list`, {waitUntil: 'networkidle0'});
  
  let hasNext = true;
  let pageNum = 1;
  while (hasNext) {
    console.log(`Extracting links from page ${pageNum}...`);
    await new Promise(r => setTimeout(r, 1000));

    const linksOnPage = await page.evaluate(() => {
      const allLinks = Array.from(document.querySelectorAll('a[href*="/japanese-grammar/"]'));
      return allLinks
        .filter(a => !a.closest('footer') && !a.closest('.w-full.bg-\\[\\#3A3A3A\\]') && !a.closest('.max-w-sm'))
        .map(a => a.href);
    });
    
    if (linksOnPage.length === 0) {
      console.log("No links found on this page, stopping pagination.");
      break;
    }
    
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
  console.log(`Found ${uniqueLinks.length} grammar points across all pages. Beginning deep scrape...`);
  
  let batch = db.batch();
  let count = 0;

  for (const url of uniqueLinks) {
    try {
      await page.goto(url, {waitUntil: 'networkidle0'});
      await page.waitForSelector('#grammar-section h1', {timeout: 5000}).catch(() => null);
      
      const data = await page.evaluate(() => {
        const result = {
          title: '',
          meaning: '',
          definition: '',
          how_to_use: '',
          table: [],
          when_to_use: '',
          limitations: [],
          examples: []
        };
        
        const titleEl = document.querySelector('#grammar-section h1') || document.querySelector('h1.text-4xl');
        if (titleEl) result.title = titleEl.innerText.trim();
        
        const sections = Array.from(document.querySelectorAll('.bg-black.text-white'));
        for (const sec of sections) {
          const text = sec.innerText.trim().toLowerCase();
          const nextP = sec.nextElementSibling;
          if (!nextP) continue;
          
          if (text === 'meaning') result.meaning = nextP.innerText.trim();
          if (text === 'definition') result.definition = nextP.innerText.trim();
          if (text === 'how to use') result.how_to_use = nextP.innerText.trim();
        }
        
        const whenToUseTitle = Array.from(document.querySelectorAll('div.rounded-full')).find(el => el.innerText.includes('When to use'));
        if (whenToUseTitle && whenToUseTitle.nextElementSibling) {
            result.when_to_use = whenToUseTitle.nextElementSibling.innerText.trim();
        }
        
        const limitationsTitle = Array.from(document.querySelectorAll('div.rounded-full')).find(el => el.innerText.includes('Limitations'));
        if (limitationsTitle && limitationsTitle.nextElementSibling && limitationsTitle.nextElementSibling.tagName === 'UL') {
            result.limitations = Array.from(limitationsTitle.nextElementSibling.querySelectorAll('li')).map(li => li.innerText.trim());
        }

        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(tr => {
            const tds = tr.querySelectorAll('td');
            if (tds.length === 2) {
                result.table.push({
                    common: tds[0].innerText.trim(),
                    formal: tds[1].innerText.trim()
                });
            }
        });
        
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
            }
        });
        
        return result;
      });
      
      if (data.title) {
        let safeId = data.title.replace(/\//g, '_').trim();
        const docRef = db.collection('JLPT-matome').doc(level).collection('grammarlist').doc(safeId);
        
        // Inject orderIndex based on count
        data.orderIndex = count;
        
        batch.set(docRef, data, {merge: true});
        count++;
        console.log(`Scraped: ${data.title}`);
        
        if (count % 50 === 0) {
            await batch.commit();
            batch = db.batch(); // Create new batch!
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
  
  console.log(`Successfully completed! Scraped and uploaded ${count} grammar points.`);
  await browser.close();
}

scrapeGrammar();
