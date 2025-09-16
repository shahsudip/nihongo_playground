// scraper/index.js
process.env.LEVEL = 'n5';
process.env.CATEGORY = 'kanji';
process.env.EXERCISE = '01';
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
const db = getFirestore();
const BASE_URL = 'https://japanesetest4you.com/japanese-language-proficiency-test-';

// This function scrapes a single page. It remains the same.
async function scrapeQuizPage(browser, url) {
  const page = await browser.newPage();
  try {
    console.log(`  Scraping page: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });

    const quizData = await page.evaluate(() => {
        const mainContent = document.querySelector('div.entry.clearfix');
        if (!mainContent) return null;
        // ... (The detailed page evaluation logic is the same)
        const allParagraphs = Array.from(mainContent.querySelectorAll('p'));
        let questions = [];
        let answers = {};
        let vocabulary = [];
        let parsingMode = 'questions';
        allParagraphs.forEach(p => {
            const strongText = p.querySelector('strong')?.innerText || '';
            if (strongText.includes('Answer Key')) { parsingMode = 'answers'; return; }
            if (strongText.includes('New words')) { parsingMode = 'vocab'; return; }
            if (parsingMode === 'questions' && p.querySelector('input[type="radio"]')) {
                const innerHTML = p.innerHTML;
                const parts = innerHTML.split('<br>');
                const questionText = parts[0].trim();
                const options = [];
                for (let i = 1; i < parts.length; i++) {
                    const tempEl = document.createElement('div');
                    tempEl.innerHTML = parts[i];
                    const optionText = tempEl.textContent.trim();
                    if (optionText) options.push(optionText);
                }
                if (questionText && options.length > 0) {
                    questions.push({ questionText, options });
                }
            } else if (parsingMode === 'answers') {
                const text = p.innerText;
                const match = text.match(/Question (\d+): (\d+)/);
                if (match) {
                    const questionNum = parseInt(match[1], 10);
                    const answerNum = parseInt(match[2], 10);
                    answers[questionNum] = answerNum - 1;
                }
            } else if (parsingMode === 'vocab') {
                const text = p.innerText;
                if (text && text.includes(':')) {
                    const [term, english] = text.split(/:(.*)/s);
                    const termMatch = term.match(/(.*) \((.*)\)/);
                    if (termMatch) {
                        vocabulary.push({
                            japanese: termMatch[1].trim(),
                            romaji: termMatch[2].trim(),
                            english: english ? english.trim() : ''
                        });
                    }
                }
            }
        });
        questions.forEach((q, index) => { q.correctOptionIndex = answers[index + 1]; });
        return { title: document.title.split('|')[0].trim(), sourceUrl: window.location.href, questions, vocabulary };
    });
    return quizData;
  } finally {
    await page.close();
  }
}


/**
 * Main function that runs for only ONE exercise.
 */
async function runTargetedScrape() {
  const level = process.env.LEVEL;
  const category = process.env.CATEGORY;
  const exercise = process.env.EXERCISE;

  if (!level || !category || !exercise) {
    console.error('Missing required parameters: LEVEL, CATEGORY, EXERCISE');
    process.exit(1);
  }

  // Build the dynamic URL for the single exercise
  const slug = `jlpt-${level}-${category}-exercise-${exercise.padStart(2, '0')}`;
  const url = `${BASE_URL}${slug}/`;
  const docId = `exercise-${exercise}`; // The ID for the document within the subcollection

  console.log(`Scraping URL: ${url}`);
  
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  
  try {
    const quizData = await scrapeQuizPage(browser, url);

    if (!quizData || quizData.questions.length === 0) {
      throw new Error('Failed to scrape quiz data from the page.');
    }

    // Save the data to the correct nested path in the 'jlpt' collection
    const docRef = db.collection('jlpt').doc(level).collection(category).doc(docId);
    await docRef.set({
      ...quizData,
      level,
      category,
      exercise,
      scrapedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    console.log(`Successfully saved data to Firestore path: jlpt/${level}/${category}/${docId}`);

  } finally {
    await browser.close();
  }
}

runTargetedScrape()
  .then(() => console.log('Targeted Scraper finished successfully!'))
  .catch((error) => {
    console.error('A critical error occurred:', error);
    process.exit(1);
  });