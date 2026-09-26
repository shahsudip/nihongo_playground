const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PAGES = [
  "https://growwithkitty.com/jlpt/n3/days-1-10",
  "https://growwithkitty.com/jlpt/n3/days-11-20",
  "https://growwithkitty.com/jlpt/n3/days-21-30",
  "https://growwithkitty.com/jlpt/n3/days-31-40",
  "https://growwithkitty.com/jlpt/n3/days-41-50",
  "https://growwithkitty.com/jlpt/n3/days-51-60",
  "https://growwithkitty.com/jlpt/n3/days-61-70",
  "https://growwithkitty.com/jlpt/n3/days-71-80",
  "https://growwithkitty.com/jlpt/n3/days-81-90",
  "https://growwithkitty.com/jlpt/n3/days-91-100",
  "https://growwithkitty.com/jlpt/n3/days-101-108"
];

async function scrape() {
  console.log('Starting Puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  let allVocab = [];

  for (let i = 0; i < PAGES.length; i++) {
    const url = PAGES[i];
    console.log(`Scraping page ${i + 1}/${PAGES.length}: ${url}`);
    
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait a bit just in case
    await new Promise(r => setTimeout(r, 2000));

    const pageData = await page.evaluate(() => {
      const vocabList = [];
      // This selector depends on the actual page structure.
      // We will look for list items or divs that contain the vocab.
      // Usually they are in a `<dl>` or `<div class="card">` etc.
      // Let's grab everything that looks like a vocab card.
      
      // On GrowWithKitty theme pages, the words are usually inside <article> or <section> or <li>
      // Let's try to find elements that have audio buttons or japanese text
      const elements = document.querySelectorAll('li, article, .vocab-card'); // Fallback
      
      // We will actually just serialize the main content and parse it more robustly if needed,
      // but let's try to extract all structured data we can find.
      
      // A more robust approach for Astro sites is to look for the specific structure:
      // In the overview it had: <li class="result ..."> <a ...> <span>実施<span>jisshi</span></span> ...
      // On the detail page, it might be different. Let's extract raw HTML of main area and we can parse it.
      
      const main = document.querySelector('main');
      return main ? main.innerHTML : '';
    });
    
    // We will save raw HTML first to ensure we don't lose data, then parse it.
    const outputPath = path.join(__dirname, `../scratch/kitty_raw_page_${i+1}.html`);
    fs.writeFileSync(outputPath, pageData);
    console.log(`Saved raw HTML for page ${i+1}`);
  }

  await browser.close();
  console.log('Done scraping. Now we can parse the HTML files.');
}

scrape().catch(console.error);
