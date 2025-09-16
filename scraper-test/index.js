// scraper/index.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer');

console.log('JLPT Quiz Scraper started [DEBUG MODE].');

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();
  console.log('Firestore initialized successfully.');

  async function scrapeAndSave() {
    const url = 'https://japanesetest4you.com/japanese-language-proficiency-test-jlpt-n5-grammar-exercise-1/';
    console.log(`Launching browser and navigating to: ${url}`);
    
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully.');

    // --- START OF DEBUGGING CODE ---
    console.log('---------------------------------');
    console.log('--- CAPTURING PAGE HTML NOW ---');
    console.log('---------------------------------');
    
    // This line will get the full HTML content after the page has loaded
    const htmlContent = await page.content();
    console.log(htmlContent); // Print the entire HTML to the log
    
    console.log('---------------------------------');
    console.log('--- END OF PAGE HTML ---');
    console.log('---------------------------------');
    // --- END OF DEBUGGING CODE ---

    // The rest of the script will still run to see if it finds anything
    const quizData = await page.evaluate(() => {
        // (This part will likely still fail, which is expected for this test)
        // ... (original evaluate logic)
    });

    await browser.close();
    console.log(`Number of questions found: ${quizData.length}`);
  }

  scrapeAndSave()
    .catch((error) => {
      console.error('Unhandled error in scrapeAndSave:', error);
      process.exit(1); // Exit with failure on error
    });

} catch (error) {
  console.error('Critical error during script initialization:', error);
  process.exit(1);
}