// scraper/index.js

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
const db = getFirestore();
const BASE_URL = 'https://japanesetest4you.com';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeQuizPage(browser, url) {
  const page = await browser.newPage();
  try {
    console.log(`  Scraping page: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });

    const quizData = await page.evaluate(() => {
      const mainContent = document.querySelector('div.entry.clearfix');
      if (!mainContent) return null;

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

      questions.forEach((q, index) => {
        q.correctOptionIndex = answers[index + 1];
      });

      return {
        title: document.title.split('|')[0].trim(),
        sourceUrl: window.location.href,
        questions,
        vocabulary,
      };
    });
    return quizData;
  } finally {
    await page.close();
  }
}

async function discoverExerciseUrls(browser, categoryUrl) {
  const exerciseUrls = new Set();
  let nextUrl = categoryUrl;
  const page = await browser.newPage();
  try {
    while (nextUrl) {
      console.log(`  Discovering links on: ${nextUrl}`);
      await page.goto(nextUrl, { waitUntil: 'networkidle0' });
      const urlsOnPage = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.posts-listing article h2 a')).map(a => a.href)
      );
      urlsOnPage.forEach(url => exerciseUrls.add(url));
      nextUrl = await page.evaluate(() => document.querySelector('a.next.page-numbers')?.href || null);
    }
  } catch (error) {
    console.log(`  Could not access category page ${categoryUrl}, it might not exist. Skipping.`)
  } finally {
    await page.close();
  }
  return Array.from(exerciseUrls);
}

async function runMasterScrape() {
  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const categories = ['grammar', 'kanji', 'vocabulary', 'reading'];
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  try {
    for (const level of levels) {
      for (const category of categories) {
        const categoryUrl = `${BASE_URL}/category/jlpt-${level}/jlpt-${level}-${category}-test/excercises-1`;
        console.log(`\nProcessing Category: ${level.toUpperCase()} ${category.toUpperCase()}`);
        
        const exerciseUrls = await discoverExerciseUrls(browser, categoryUrl);
        console.log(`  Found ${exerciseUrls.length} exercises.`);
         if (exerciseUrls.length > 0) {
          const metadataRef = db.collection('jlpt').doc(level).collection(category).doc('--metadata--');
          await metadataRef.set({
            totalExercises: exerciseUrls.length,
            lastScraped: FieldValue.serverTimestamp()
          }, { merge: true });
          console.log(`  Saved metadata: ${exerciseUrls.length} total exercises.`);
        }
        
        for (const url of exerciseUrls) {
          const quizData = await scrapeQuizPage(browser, url);
          if (quizData && quizData.questions.length > 0) {
            const exerciseNum = quizData.title.split(' ').pop();
            const docId = `${level}-${category}-exercise-${exerciseNum}`;
            
            const docRef = db.collection('jlpt').doc(docId);
            await docRef.set({
              ...quizData,
              level,
              category,
              exercise: exerciseNum,
              scrapedAt: FieldValue.serverTimestamp()
            }, { merge: true });
            
            console.log(`    -> Saved/Updated: ${docId}`);
          } else {
            console.log(`    -> Skipped (no data found): ${url}`);
          }
          await sleep(500);
        }
      }
    }
  } finally {
    await browser.close();
  }
}

runMasterScrape()
  .then(() => console.log('\nMaster Scrape finished successfully!'))
  .catch((error) => console.error('\nA critical error occurred during the master scrape:', error));