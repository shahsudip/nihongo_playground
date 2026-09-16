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
  // Mobile viewport (iPhone / Pixel size)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('app_theme', 'light');
    localStorage.setItem('shin500_theme', 'light');
    window.__MOCK_USER__ = {
      uid: 'mock_uid_123',
      displayName: 'Sudip Sah',
      email: 'sudip@example.com'
    };
  });

  await page.goto('http://localhost:5173/nihongo_playground/#/anki-decks', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture mobile closed state
  await page.screenshot({ path: 'scripts/mobile_navbar_closed.png' });
  console.log('Saved: scripts/mobile_navbar_closed.png');

  // 2. Click hamburger button to open
  const hamburger = await page.$('header button[aria-label*="navigation menu"]');
  if (hamburger) {
    await hamburger.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scripts/mobile_navbar_opened.png' });
    console.log('Saved: scripts/mobile_navbar_opened.png');

    // 3. Click hamburger button again to test closing
    await hamburger.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scripts/mobile_navbar_reclosed.png' });
    console.log('Saved: scripts/mobile_navbar_reclosed.png');
  } else {
    console.error('Hamburger button not found!');
  }

  await browser.close();
})();
