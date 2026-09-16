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
  await page.setViewport({ width: 1280, height: 800 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('app_theme', 'light');
    localStorage.setItem('shin500_theme', 'light');
    window.__MOCK_USER__ = { uid: 'u1', displayName: 'Sudip', email: 's@s.com' };
  });

  await page.goto('http://localhost:5173/nihongo_playground/#/levels', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'scripts/levels_light.png' });
  console.log('Saved: scripts/levels_light.png');

  // Toggle theme
  await page.evaluate(() => {
    const toggleBtn = document.querySelector('button[aria-label*="theme" i]');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: 'scripts/levels_dark.png' });
  console.log('Saved: scripts/levels_dark.png');

  await browser.close();
})();
