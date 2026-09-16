// scripts/test_raw_fields_ui.cjs
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testUI() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const execPath = fs.existsSync(chromePath) ? chromePath : (fs.existsSync(edgePath) ? edgePath : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: execPath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.evaluateOnNewDocument(() => {
    window.__MOCK_USER__ = { uid: 'test-user', email: 'test@example.com', displayName: 'Test User' };
  });

  const url = 'http://localhost:5173/nihongo_playground/#/anki-quiz/anime-sentence-mining';
  console.log('Navigating to:', url);

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('button', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 2500));

    const outDir = path.join(__dirname, '..', 'tmp_inspect');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    await page.screenshot({ path: path.join(outDir, 'anki_flashcard_view.png') });
    console.log('Saved anki_flashcard_view.png');

    // Click on "📋 Raw Fields" button
    const rawFieldsBtn = await page.waitForSelector('button ::-p-text(Raw Fields)');
    if (rawFieldsBtn) {
      await rawFieldsBtn.click();
      console.log('Clicked Raw Fields button');
    }

    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outDir, 'anki_raw_fields_view.png') });
    console.log('Saved anki_raw_fields_view.png');

  } catch (e) {
    console.error('Error during test:', e);
  } finally {
    await browser.close();
  }
}

testUI();
