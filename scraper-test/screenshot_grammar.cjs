const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  await page.goto('https://www.jlptmatome.com/jlpt-n5-grammar-list', {waitUntil: 'networkidle0'});
  
  await page.screenshot({path: 'grammar_screenshot.png', fullPage: true});
  console.log("Saved grammar_screenshot.png");
  
  await browser.close();
}
run();
