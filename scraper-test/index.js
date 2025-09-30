const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

console.log('MLC JLPT Quiz Scraper started.');

// Ensure your FIREBASE_SERVICE_ACCOUNT environment variable is set correctly
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// --- Configuration for the MLC Japanese Website ---
const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const CATEGORIES = ['kanji', 'grammar', 'katakana'];
const BASE_URL = 'http://www.mlcjapanese.co.jp/';
const QUIZ_RANGE = Array.from({ length: 10 }, (_, i) => i + 1);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
console.log('Firestore initialized for MLC scraper.');

/**
 * Parses the unique HTML structure of mlcjapanese.co.jp quizzes.
 * @param {object} page - The Puppeteer page object.
 * @returns {Promise<object|null>} - The scraped quiz data or null on failure.
 */
async function scrapeMlcTestPage(page) {
  return await page.evaluate(() => {
    const titleElement = document.querySelector('h1.entry-title');
    if (!titleElement) return null;

    const title = titleElement.innerText.trim();
    const questions = [];
    
    const answerMap = new Map();
    const scriptContent = Array.from(document.querySelectorAll('script')).map(s => s.textContent).join('\n');
    const answerRegex = /if\(qnum == (\d+)\)\s*\{\s*if\(anum == (\d+)\)/g;
    let match;
    while ((match = answerRegex.exec(scriptContent)) !== null) {
      const qNum = parseInt(match[1], 10);
      const correctAnum = parseInt(match[2], 10);
      answerMap.set(qNum, correctAnum - 1);
    }

    const contentElement = document.querySelector('div[id^="sp-html-src-"]');
    if (!contentElement) return null;
    
    // --- FIX 1: This regex now handles both standard and full-width spaces ---
    const questionBlocks = contentElement.innerHTML.split(/Q:\d+[ \t　]+/).slice(1);

    questionBlocks.forEach((block, index) => {
      const questionNumber = index + 1;
      
      const parts = block.split('<form>');
      if (parts.length < 2) return;

      let questionText = parts[0].replace(/<font color="#ff0000">/g, ' __').replace(/<\/font>/g, '__ ').trim();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = questionText;
      questionText = tempDiv.textContent.replace(/\s+/g, ' ').trim();

      const formHtml = parts[1].split('</form>')[0];
      const optionLines = formHtml.split('<br>').map(s => s.trim()).filter(Boolean);
      const options = [];
      optionLines.forEach(line => {
          if (line.startsWith('<input')) {
              const tempOptionDiv = document.createElement('div');
              tempOptionDiv.innerHTML = line;
              const optionText = tempOptionDiv.textContent.replace(/^\s*[\d１２３４５６７８９０]+\s*/, '').trim();
              if(optionText) options.push(optionText);
          }
      });
      
      const correctOptionIndex = answerMap.get(questionNumber);
      
      if (questionText && options.length > 0) {
          questions.push({
              questionNumber,
              questionText,
              options,
              correctOption: (correctOptionIndex !== undefined && options[correctOptionIndex]) 
                  ? { index: correctOptionIndex, text: options[correctOptionIndex] }
                  : null
          });
      }
    });

    if (questions.length === 0) return null;
    
    return {
      title,
      sourceUrl: window.location.href,
      questions
    };
  });
}

/**
 * Main loop to scrape all quizzes from mlcjapanese.co.jp.
 * @param {object} browser - The Puppeteer browser instance.
 */
async function scrapeAllMlcTests(browser) {
  console.log('🚀 Starting scrape of all MLC Japanese tests...');

  for (const level of LEVELS) {
    for (const category of CATEGORIES) {
      if (category === 'katakana' && level !== 'n5') {
        continue;
      }
      
      console.log(`\n--- Scraping Level: ${level.toUpperCase()}, Category: ${category.toUpperCase()} ---`);
      
      for (const exerciseNum of QUIZ_RANGE) {
        const testId = exerciseNum.toString().padStart(2, '0');
        const docId = `${category}-exercise-${testId}`;
        const docRef = db.collection('jlpt-mlc').doc(level).collection('quizzes').doc(docId);

        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          console.log(`- Document ${docRef.path} already exists. Skipping.`);
          continue;
        }

        let url;
        if (category === 'katakana') {
            url = `${BASE_URL}n5n4_jlpt_katakana_quiz_${testId}.html`;
        } else {
            url = `${BASE_URL}${level}_jlpt_${category}_quiz_${testId}.html`;
        }
        
        const page = await browser.newPage();
        console.log(`Attempting to scrape: ${url}`);
        
        try {
            const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
            if (!response.ok()) {
                console.log(`- Page not found (404): ${url}`);
                continue; // Skip to the next iteration
            }

            const quizData = await scrapeMlcTestPage(page);

            if (quizData) {
                await docRef.set(quizData);
                console.log(`✅ Successfully saved data to ${docRef.path}`);
            } else {
                console.log(`- No valid quiz data found at ${url}.`);
            }
        } catch (error) {
            if (!error.message.includes('net::ERR_ABORTED')) {
                console.error(`Error processing URL ${url}:`, error.message);
            }
        } finally {
            // --- FIX 2: Add a safety check before closing the page ---
            if (!page.isClosed()) {
                await page.close();
            }
        }
      }
    }
  }

  console.log('\n✅ Finished scraping all MLC tests.');
}

async function main() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  await scrapeAllMlcTests(browser);
  await browser.close();
  console.log('\n🎉 Full MLC scrape process completed!');
}

main().catch(console.error);

