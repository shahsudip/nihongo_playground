const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('app_theme', 'light');
    localStorage.setItem('shin500_theme', 'light');
  });

  await page.goto('http://localhost:5173/nihongo_playground/#/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'scripts/landing_mobile.png' });
  console.log('Saved: scripts/landing_mobile.png');

  await browser.close();
})();
