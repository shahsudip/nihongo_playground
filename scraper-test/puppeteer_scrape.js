const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.jlptpracticetest.com/n3/201007/vocabulary', { waitUntil: 'networkidle0' });
  
  // Wait for the main question container to appear
  try {
    await page.waitForSelector('main', { timeout: 10000 });
  } catch (e) {
    console.log("Could not find main element, grabbing what we can.");
  }
  
  // Get the HTML of the main content area
  const content = await page.evaluate(() => {
    return document.querySelector('main') ? document.querySelector('main').outerHTML : document.body.innerHTML;
  });
  
  fs.writeFileSync('scraped_rendered.html', content);
  console.log('Saved rendered HTML to scraped_rendered.html');
  
  await browser.close();
}

scrape();
