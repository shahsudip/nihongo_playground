const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('https://www.jlptmatome.com/jlpt-n5-kanji-list', {waitUntil: 'networkidle0'});
  await page.screenshot({path: 'real_kanji_page1.png', fullPage: false});
  console.log('Saved real_kanji_page1.png');
  await browser.close();
}
run();
