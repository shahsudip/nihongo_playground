const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  const res = await page.goto('https://www.jlptmatome.com/jlpt-n5-grammar-list/page/2', {waitUntil: 'networkidle0'});
  console.log('Status:', res.status());
  
  const aTags = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href);
  });
  
  const grammarLinks = [...new Set(aTags.filter(h => h.includes('/japanese-grammar/')))];
  console.log("Total unique grammar links on page 2:", grammarLinks.length);
  console.log(grammarLinks);
  
  await browser.close();
}
run();
