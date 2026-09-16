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
  await page.setViewport({ width: 1280, height: 900 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('app_theme', 'light');
    localStorage.setItem('shin500_theme', 'light');
  });

  // Navigate to Landing Page (root)
  await page.goto('http://localhost:5173/nihongo_playground/#/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'scripts/landing_light.png', fullPage: true });
  console.log('Saved: scripts/landing_light.png');

  // Toggle to dark mode
  await page.evaluate(() => {
    const toggleBtn = document.querySelector('header button[aria-label*="theme" i], button[title*="theme" i]') || document.querySelector('header button');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: 'scripts/landing_dark.png', fullPage: true });
  console.log('Saved: scripts/landing_dark.png');

  await browser.close();
})();
