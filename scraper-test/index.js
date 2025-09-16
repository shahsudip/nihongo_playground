// functions/index.js

const { onCall } = require('firebase-functions/v2/https');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Use stealth plugin to avoid blocking
puppeteer.use(StealthPlugin());

// Initialize Firebase Admin SDK
// This is done once when the function instance starts
try {
  initializeApp();
} catch (e) {
  console.log('App already initialized.');
}
const db = getFirestore();

exports.triggerExerciseScraper = onCall({
  // Increase timeout and memory for Puppeteer
  timeoutSeconds: 300,
  memory: '1GiB',
}, async (request) => {
  const { level, category, exercise } = request.data;

  // 1. --- VALIDATE INPUT ---
  if (!level || !category || !exercise) {
    console.error('Validation failed: Missing level, category, or exercise.');
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "level", "category", and "exercise" arguments.'
    );
  }

  // 2. --- DYNAMICALLY CONSTRUCT THE URL ---
  const url = `https://japanesetest4you.com/japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${exercise}/`;
  console.log(`Scraping URL: ${url}`);

  let browser;
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log(`Page loaded successfully for exercise ${exercise}.`);

    const quizData = await page.evaluate(() => {
        const mainContent = document.querySelector('div.entry.clearfix');
        if (!mainContent) return null;

        const allParagraphs = Array.from(mainContent.querySelectorAll('p'));
        
        let questions = [];
        let answers = {};
        let vocabulary = [];
        
        let parsingMode = 'questions'; // Modes: 'questions', 'answers', 'vocab'

        allParagraphs.forEach(p => {
          const strongText = p.querySelector('strong')?.innerText || '';

          if (strongText.includes('Answer Key')) {
            parsingMode = 'answers';
            return;
          }
          if (strongText.includes('New words')) {
            parsingMode = 'vocab';
            return;
          }

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
              answers[questionNum] = answerNum - 1; // Store as 0-based index
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
                  english: english.trim()
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
          questions: questions,
          vocabulary: vocabulary
        };
    });
    
    if (!quizData || quizData.questions.length === 0) {
        throw new Error('Failed to scrape complete quiz data. The website structure may have changed.');
    }

    // 3. --- SAVE TO THE CORRECT FIRESTORE PATH ---
    const docId = `exercise-${exercise}`;
    const docRef = db.collection('jlpt').doc(level).collection(category).doc(docId);
    
    console.log(`Saving quiz "${quizData.title}" to Firestore at path: ${docRef.path}`);
    await docRef.set(quizData);

    console.log('Successfully saved complete quiz to Firestore.');
    return { status: 'success', message: `Successfully scraped and saved JLPT ${level} ${category} exercise ${exercise}.` };

  } catch (error) {
    console.error('Error during scraping process:', error);
    throw new functions.https.HttpsError('internal', 'Failed to scrape the website.', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});