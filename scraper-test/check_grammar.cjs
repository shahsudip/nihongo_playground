const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto('https://www.jlptmatome.com/jlpt-n5-grammar-list', {waitUntil: 'networkidle0'});
  
  const html = await page.content();
  const aTags = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href);
  });
  
  const grammarLinks = [...new Set(aTags.filter(h => h.includes('/japanese-grammar/')))];
  console.log("Total unique grammar links on page:", grammarLinks.length);
  console.log(grammarLinks);
  
  // Also check if there is a 'Next' button
  const hasNext = await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.innerText.includes('Next'));
      return nextBtn && !nextBtn.hasAttribute('disabled');
  });
  console.log("Has next button?", hasNext);
  
  await browser.close();
}
run();
