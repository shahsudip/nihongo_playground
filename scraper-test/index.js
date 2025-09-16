// scraper/index.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// 1. Use puppeteer-extra and the Stealth plugin
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

console.log('JLPT Quiz Scraper started with Stealth Mode.');

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();
  console.log('Firestore initialized successfully.');

  async function scrapeAndSave() {
    const url = 'https://japanesetest4you.com/japanese-language-proficiency-test-jlpt-n5-grammar-exercise-1/';
    console.log(`Launching STEALTH browser and navigating to: ${url}`);

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    console.log('Going to page...');
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully.');

    // 2. This is the logic to extract the questions
    const quizData = await page.evaluate(() => {
      const data = [];
      const questionParagraphs = document.querySelectorAll('div.entry.clearfix p');

      questionParagraphs.forEach(p => {
        if (p.querySelector('input[type="radio"]')) {
          const innerHTML = p.innerHTML;
          const parts = innerHTML.split('<br>');
          const questionText = parts[0].trim();
          const options = [];

          for (let i = 1; i < parts.length; i++) {
            const tempEl = document.createElement('div');
            tempEl.innerHTML = parts[i];
            const optionText = tempEl.textContent.trim();
            if (optionText) {
              options.push(optionText);
            }
          }

          if (questionText && options.length > 0) {
            data.push({ question: questionText, options: options, sourceUrl: window.location.href });
          }
        }
      });
      return data;
    });

    await browser.close();
    console.log(`Number of questions found: ${quizData.length}`);

    if (quizData.length === 0) {
      console.log('No questions found. The website structure may have changed, or the block is still active.');
      return;
    }

    const collectionRef = db.collection('jlpt-n5-quizzes');
    console.log(`Preparing to write ${quizData.length} questions to Firestore...`);
    for (const question of quizData) {
      await collectionRef.add(question);
    }
    console.log(`Successfully saved ${quizData.length} questions to the 'jlpt-n5-quizzes' collection.`);
  }

  scrapeAndSave()
    .then(() => {
      console.log('Scrape and save process finished.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Unhandled error in scrapeAndSave:', error);
      process.exit(1);
    });

} catch (error) {
  console.error('Critical error during script initialization:', error);
  process.exit(1);
}