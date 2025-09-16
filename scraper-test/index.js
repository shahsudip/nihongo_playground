// scraper/index.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

console.log('JLPT Quiz Scraper started with Stealth Mode.');

  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);




const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const CATEGORIES = ['grammar', 'vocabulary', 'kanji', 'reading-comprehension'];
const BASE_URL = 'https://japanesetest4you.com/japanese-language-proficiency-test-jlpt-';
// --- END CONFIGURATION ---

// Initialize Firebase Admin
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
console.log('Firestore initialized successfully.');

/**
 * Scrapes a single exercise page.
 * @param {import('puppeteer').Page} page - The Puppeteer page object.
 * @param {string} url - The URL to scrape.
 * @returns {Promise<object|null>} The scraped quiz data or null if scraping fails.
 */
async function scrapePage(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    const quizData = await page.evaluate(() => {
      const mainContent = document.querySelector('div.entry.clearfix');
      if (!mainContent) return null;

      const title = document.title.split('|')[0].trim();
      const allParagraphs = Array.from(mainContent.querySelectorAll('p'));
      
      let questions = [];
      let answers = {};
      let vocabulary = [];
      let parsingMode = 'questions';

      allParagraphs.forEach(p => {
        const strongText = p.querySelector('strong')?.innerText || '';

        if (strongText.includes('Answer Key')) parsingMode = 'answers';
        else if (strongText.includes('New words')) parsingMode = 'vocab';
        
        if (parsingMode === 'questions' && p.querySelector('input[type="radio"]')) {
          const parts = p.innerHTML.split('<br>');
          const questionText = parts[0].trim();
          const options = parts.slice(1).map(part => {
            const tempEl = document.createElement('div');
            tempEl.innerHTML = part;
            return tempEl.textContent.trim();
          }).filter(Boolean);
          if (questionText && options.length > 0) questions.push({ questionText, options });
        } else if (parsingMode === 'answers') {
          const match = p.innerText.match(/Question (\d+): (\d+)/);
          if (match) answers[parseInt(match[1])] = parseInt(match[2]) - 1; // 0-based
        } else if (parsingMode === 'vocab') {
          const text = p.innerText;
          if (text.includes(':')) {
            const [term, english] = text.split(/:(.*)/s);
            const termMatch = term.match(/(.*) \((.*)\)/);
            if (termMatch) vocabulary.push({
              japanese: termMatch[1].trim(),
              romaji: termMatch[2].trim(),
              english: english.trim()
            });
          }
        }
      });

      questions.forEach((q, index) => {
        q.correctOptionIndex = answers[index + 1];
      });

      if (questions.length === 0) return null; // Page exists but is not a valid quiz

      return { title, sourceUrl: window.location.href, questions, vocabulary };
    });

    return quizData;
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    return null;
  }
}

/**
 * Main function to orchestrate the scraping of all content.
 */
async function scrapeAll() {
  console.log('🚀 Starting full site scrape...');
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  
  for (const level of LEVELS) {
    for (const category of CATEGORIES) {
      let exerciseNum = 1;
      let consecutiveFailures = 0;
      
      console.log(`\n--- Scraping Level: ${level.toUpperCase()}, Category: ${category} ---`);

      while (consecutiveFailures < 3) { // Stop after 3 consecutive empty pages
        const url = `${BASE_URL}${level}-${category}-exercise-${exerciseNum}/`;
        const page = await browser.newPage();
        
        console.log(`Attempting to scrape: ${url}`);
        const quizData = await scrapePage(page, url);
        
        if (quizData) {
          consecutiveFailures = 0; // Reset counter on success
          const docId = `exercise-${exerciseNum}`;
          const docRef = db.collection('jlpt').doc(level).collection(category).doc(docId);
          await docRef.set(quizData);
          console.log(`✅ Successfully scraped and saved: ${level}/${category}/${docId}`);
        } else {
          consecutiveFailures++;
          console.log(`- No valid quiz data found. (Failure ${consecutiveFailures}/3)`);
        }
        
        await page.close();
        exerciseNum++;
      }
      console.log(`Finished category ${category}. Found ${exerciseNum - 1 - consecutiveFailures} exercises.`);
    }
  }

  await browser.close();
  console.log('\n🎉 Full scrape completed!');
}

scrapeAll().catch(console.error);