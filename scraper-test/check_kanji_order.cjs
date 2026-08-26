const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto('https://www.jlptmatome.com/jlpt-n5-kanji-list', {waitUntil: 'networkidle0'});
  
  let allLinks = [];
  let pageNum = 1;
  
  while (true) {
    await new Promise(r => setTimeout(r, 1000));
    const links = await page.evaluate(() => {
      // Get unique kanji links in order they appear on page
      const seen = new Set();
      const ordered = [];
      for (const a of document.querySelectorAll('a[href*="/japanese-kanji/"]')) {
        if (!seen.has(a.href)) {
          seen.add(a.href);
          ordered.push({ href: a.href, text: a.innerText.trim() });
        }
      }
      return ordered;
    });
    console.log(`Page ${pageNum}: ${links.length} kanji`);
    allLinks.push(...links);
    
    const clicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next') && !b.disabled);
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    pageNum++;
  }
  
  // Show first 10 and last 5 in order
  console.log('\nFirst 10 in real order:');
  allLinks.slice(0, 10).forEach((l, i) => console.log(i, l.text, l.href));
  console.log('\nTotal unique kanji:', allLinks.length);
  
  await browser.close();
}
run();
