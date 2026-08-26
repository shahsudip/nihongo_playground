const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto('https://www.jlptmatome.com/jlpt-n5-vocabulary-list', {waitUntil: 'networkidle0'});
  
  let pageNum = 1;
  
  while (true) {
    await new Promise(r => setTimeout(r, 1000));
    // Count only the actual vocabulary CARDS (grid items), not sidebar/footer links
    const cardCount = await page.evaluate(() => {
      // The grid of vocab cards - each card has a link with vocab word
      const grid = document.querySelector('.grid');
      if (grid) {
        return grid.querySelectorAll('a[href*="/japanese-vocabulary/"]').length;
      }
      // Fallback: count all unique vocab links in main content area only
      const main = document.querySelector('.bg-white.border') || document.querySelector('main') || document.querySelector('#top');
      if (main) return main.querySelectorAll('a[href*="/japanese-vocabulary/"]').length;
      return 0;
    });
    console.log(`Page ${pageNum}: ${cardCount} vocab cards in grid`);
    
    const clicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next') && !b.disabled);
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    pageNum++;
  }
  
  await browser.close();
}
run();
