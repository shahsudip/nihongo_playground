// scraper/index.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer');

console.log('JLPT Quiz Scraper started.');

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();
  console.log('Firestore initialized successfully.');

  async function scrapeAndSave() {
    // 1. UPDATED URL
    const url = 'https://japanesetest4you.com/japanese-language-proficiency-test-jlpt-n5-grammar-exercise-1/';
    console.log(`Launching browser and navigating to: ${url}`);
    
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully.');

    // 2. UPDATED SCRAPING LOGIC
    const quizData = await page.evaluate(() => {
      const data = [];
      // Select all the <p> tags inside the main content div
      const questionParagraphs = document.querySelectorAll('div.entry.clearfix p');

      questionParagraphs.forEach(p => {
        // We only care about paragraphs that contain radio button inputs
        if (p.querySelector('input[type="radio"]')) {
          const innerHTML = p.innerHTML;
          const parts = innerHTML.split('<br>');
          
          const questionText = parts[0].trim(); // The question is the text before the first <br>
          
          const options = [];
          // The rest of the parts are the options
          for (let i = 1; i < parts.length; i++) {
            // Create a temporary element to easily strip HTML tags (like <input>)
            const tempEl = document.createElement('div');
            tempEl.innerHTML = parts[i];
            const optionText = tempEl.textContent.trim();
            if (optionText) {
              options.push(optionText);
            }
          }
          
          if (questionText && options.length > 0) {
            data.push({ question: questionText, options: options });
          }
        }
      });
      return data;
    });

    await browser.close();
    console.log(`Number of questions found: ${quizData.length}`);

    if (quizData.length === 0) {
      console.log('No questions found. The website structure may have changed.');
      return;
    }

    // 3. SAVE TO A NEW FIRESTORE COLLECTION
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