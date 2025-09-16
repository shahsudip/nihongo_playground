// scraper/index.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
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
    const page = await puppeteer.newPage();
    
    console.log('Going to page...');
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully.');

    // This new logic extracts questions, answers, and vocabulary all at once.
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

        // Switch parsing mode based on headers
        if (strongText.includes('Answer Key')) {
          parsingMode = 'answers';
          return;
        }
        if (strongText.includes('New words')) {
          parsingMode = 'vocab';
          return;
        }

        // --- PARSE BASED ON MODE ---

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
            const [term, english] = text.split(/:(.*)/s); // Split only on the first colon
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

      // Combine answers into the questions array
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

    await browser.close();
    
    if (!quizData || quizData.questions.length === 0) {
      console.log('Failed to scrape complete quiz data. The website structure may have changed.');
      return;
    }

    console.log(`Successfully scraped: ${quizData.questions.length} questions and ${quizData.vocabulary.length} vocabulary words.`);

    // Save the entire quiz object as a single document
    const collectionRef = db.collection('jlpt-n5-quizzes');
    console.log(`Saving quiz "${quizData.title}" to Firestore...`);
    await collectionRef.add(quizData);
    console.log('Successfully saved complete quiz to Firestore.');
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