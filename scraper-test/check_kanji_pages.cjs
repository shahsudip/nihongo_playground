const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto('https://www.jlptmatome.com/jlpt-n5-kanji-list', {waitUntil: 'networkidle0'});
  
  // Count kanji cards on page 1
  const countPage1 = await page.evaluate(() => {
    return document.querySelectorAll('a[href*="/japanese-kanji/"]').length / 2; // each appears twice
  });
  
  const uniqueLinks1 = await page.evaluate(() => {
    return [...new Set(Array.from(document.querySelectorAll('a[href*="/japanese-kanji/"]')).map(a => a.href))];
  });
  
  console.log('Unique kanji links page 1:', uniqueLinks1.length);
  
  // Click next
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  
  const uniqueLinks2 = await page.evaluate(() => {
    return [...new Set(Array.from(document.querySelectorAll('a[href*="/japanese-kanji/"]')).map(a => a.href))];
  });
  console.log('Unique kanji links page 2:', uniqueLinks2.length);
  
  // Click next again
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next') && !b.disabled);
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  
  const uniqueLinks3 = await page.evaluate(() => {
    return [...new Set(Array.from(document.querySelectorAll('a[href*="/japanese-kanji/"]')).map(a => a.href))];
  });
  console.log('Unique kanji links page 3:', uniqueLinks3.length);
  
  // Has next?
  const hasNext = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next'));
    return btn && !btn.disabled;
  });
  console.log('Has page 4?', hasNext);
  
  await browser.close();
}
run();
