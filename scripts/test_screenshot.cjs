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
    window.__MOCK_USER__ = {
      uid: 'mock_uid_123',
      displayName: 'Sudip Sah',
      email: 'sudip@example.com'
    };
  });

  await page.goto('http://localhost:5173/nihongo_playground/#/anki-decks', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: 'scripts/local_light_mode.png', fullPage: true });
  console.log('Light mode screenshot saved: scripts/local_light_mode.png');

  // Toggle to dark mode
  await page.evaluate(() => {
    const toggleBtn = document.querySelector('button[aria-label*="theme" i], button[title*="theme" i]') || document.querySelector('header button');
    if (toggleBtn) {
      toggleBtn.click();
    } else {
      localStorage.setItem('app_theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark', 'theme-dark');
      document.documentElement.classList.remove('theme-light');
    }
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: 'scripts/local_dark_mode.png', fullPage: true });
  console.log('Dark mode screenshot saved: scripts/local_dark_mode.png');

  await browser.close();
})();
