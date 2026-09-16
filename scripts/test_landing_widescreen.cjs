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
  // Widescreen 1920x1080
  await page.setViewport({ width: 1920, height: 1080 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('app_theme', 'light');
    localStorage.setItem('shin500_theme', 'light');
  });

  await page.goto('http://localhost:5173/nihongo_playground/#/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'scripts/landing_widescreen_light.png' });
  console.log('Saved: scripts/landing_widescreen_light.png');

  // Toggle to dark
  await page.evaluate(() => {
    const toggleBtn = document.querySelector('header button[aria-label*="theme" i], button[title*="theme" i]') || document.querySelector('header button');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: 'scripts/landing_widescreen_dark.png' });
  console.log('Saved: scripts/landing_widescreen_dark.png');

  await browser.close();
})();
