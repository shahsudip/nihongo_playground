const puppeteer = require('puppeteer');
async function run() {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto('https://www.jlptmatome.com/japanese-kanji/%E5%AE%89-kanji-meaning', {waitUntil: 'networkidle0'});
  
  const info = await page.evaluate(() => {
    // check all h1s
    const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim());
    // check kanji section
    const kanjiSection = document.querySelector('#kanji-section');
    const kanjiH1 = kanjiSection ? kanjiSection.querySelector('h1')?.innerText.trim() : null;
    
    // check all black label sections
    const blackLabels = Array.from(document.querySelectorAll('.bg-black.text-white')).map(el => ({
      label: el.innerText.trim(),
      next: el.nextElementSibling?.innerText.trim()?.substring(0, 50)
    }));
    
    return { h1s, kanjiH1, blackLabels };
  });
  
  console.log('All h1s:', info.h1s);
  console.log('Kanji section h1:', info.kanjiH1);
  console.log('Black labels:', JSON.stringify(info.blackLabels, null, 2));
  
  await browser.close();
}
run();
