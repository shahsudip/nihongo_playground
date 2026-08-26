const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto('https://www.jlptmatome.com/jlpt-n5-vocabulary-list', {waitUntil: 'networkidle0'});
  
  let totalLinks = [];
  let pageNum = 1;
  
  while (true) {
    await new Promise(r => setTimeout(r, 1000));
    const links = await page.evaluate(() => {
      return [...new Set(Array.from(document.querySelectorAll('a[href*="/japanese-vocabulary/"]')).map(a => a.href))];
    });
    console.log(`Page ${pageNum}: ${links.length} unique vocab links`);
    totalLinks.push(...links);
    
    const clicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next') && !b.disabled);
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    pageNum++;
  }
  
  console.log('Total unique links:', [...new Set(totalLinks)].length);
  await browser.close();
}
run();
