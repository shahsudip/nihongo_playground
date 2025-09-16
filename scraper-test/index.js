const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

console.log('JLPT Quiz Scraper started with Stealth Mode.');

// --- CONFIGURATION ---
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const TEST_CATEGORIES = ['grammar', 'vocabulary', 'kanji', 'reading']; 
const BASE_URL = 'https://japanesetest4you.com/';
// --- END CONFIGURATION ---

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
console.log('Firestore initialized successfully.');

// =================================================================
// SECTION 1: SCRAPER FOR INDIVIDUAL EXERCISE TESTS
// =================================================================

async function scrapeTestPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    const quizData = await page.evaluate((currentCategory) => {
      const mainContent = document.querySelector('div.entry.clearfix');
      if (!mainContent) return null;

      const title = document.title.split('|')[0].trim();
      const allParagraphs = Array.from(mainContent.querySelectorAll('p'));
      
      let questions = [], answers = {}, vocabulary = [], readingPassage = '';
      let parsingMode = 'questions';

      if (currentCategory === 'reading') {
        const firstQuestionIndex = allParagraphs.findIndex(p => p.querySelector('input[type="radio"]'));
        if (firstQuestionIndex > 0) {
          readingPassage = allParagraphs.slice(0, firstQuestionIndex).map(p => p.innerText).join('\n\n');
        }
      }

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
          if (match) answers[parseInt(match[1])] = parseInt(match[2]) - 1;
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

      questions.forEach((q, index) => { q.correctOptionIndex = answers[index + 1]; });
      if (questions.length === 0) return null;
      return { title, sourceUrl: window.location.href, readingPassage, questions, vocabulary };
    }, category);
    return quizData;
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    return null;
  }
}

async function scrapeAllTests(browser) {
  console.log('🚀 Starting scrape of all exercise tests...');
  for (const level of LEVELS) {
    for (const category of TEST_CATEGORIES) {
      let exerciseNum = 1, consecutiveFailures = 0;
      const collectionName = `${category}-test`;
      console.log(`\n--- Scraping Level: ${level.toUpperCase()}, Category: ${collectionName} ---`);

      while (consecutiveFailures < 3) {
        const docId = `exercise-${exerciseNum}`;
        const docRef = db.collection('jlpt').doc(level).collection(collectionName).doc(docId);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
          console.log(`- Skipping ${level}/${collectionName}/${docId}, data already exists.`);
          consecutiveFailures = 0;
          exerciseNum++;
          continue;
        }
        const url = `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${exerciseNum}/`;
        const page = await browser.newPage();
        console.log(`Attempting to scrape: ${url}`);
        const quizData = await scrapeTestPage(page, url, category);
        
        if (quizData) {
          consecutiveFailures = 0;
          await docRef.set(quizData);
          console.log(`✅ Successfully saved: ${level}/${collectionName}/${docId}`);
        } else {
          consecutiveFailures++;
          console.log(`- No valid quiz data found. (Failure ${consecutiveFailures}/3)`);
        }
        await page.close();
        exerciseNum++;
      }
    }
  }
  console.log('✅ Finished scraping all exercise tests.');
}


// =================================================================
// SECTION 2: SCRAPER FOR VOCABULARY & GRAMMAR LISTS
// =================================================================

async function scrapeVocabularyLists(browser) {
  console.log('\n🚀 Starting scrape of main vocabulary lists...');
  for (const level of LEVELS) {
    const collectionName = 'vocabulary_list';
    const docId = 'full-list';
    const docRef = db.collection('jlpt').doc(level).collection(collectionName).doc(docId);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      console.log(`- Skipping ${level}/${collectionName}, data already exists.`);
      continue;
    }

    const url = `${BASE_URL}jlpt-${level}-vocabulary-list/`;
    const page = await browser.newPage();
    console.log(`Attempting to scrape: ${url}`);

    try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        const vocabList = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('div.entry.clearfix table tr'));
            return rows.slice(1).map(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length < 3) return null;
                return {
                    japanese: cells[0]?.innerText.trim(),
                    reading: cells[1]?.innerText.trim(),
                    english: cells[2]?.innerText.trim(),
                };
            }).filter(Boolean);
        });

        if (vocabList.length > 0) {
            await docRef.set({ title: `JLPT ${level.toUpperCase()} Vocabulary List`, words: vocabList });
            console.log(`✅ Successfully saved: ${level}/${collectionName}/${docId}`);
        } else {
            console.log(`- No vocabulary table found for ${level}.`);
        }
    } catch (error) {
        console.error(`Failed to scrape ${url}:`, error.message);
    } finally {
        await page.close();
    }
  }
   console.log('✅ Finished scraping all vocabulary lists.');
}

async function scrapeGrammarDetailPage(page, url) {
    try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        return await page.evaluate(() => {
            const content = document.querySelector('div.entry.clearfix');
            if (!content) return null;

            const title = content.querySelector('h1.page-title')?.innerText.trim() || document.title.split('|')[0].trim();
            const paragraphs = Array.from(content.querySelectorAll('p'));
            
            let meaning = '', formation = '', currentSection = '';
            const examples = [];

            for (const p of paragraphs) {
                const strongText = p.querySelector('strong')?.innerText.toLowerCase() || '';
                if (strongText.includes('meaning')) { currentSection = 'meaning'; continue; }
                if (strongText.includes('formation')) { currentSection = 'formation'; continue; }
                if (strongText.includes('example sentences')) { currentSection = 'examples'; continue; }
                
                const text = p.innerText.trim();
                if (!text) continue;

                if (currentSection === 'meaning') meaning += text + '\n';
                else if (currentSection === 'formation') formation += text + '\n';
                else if (currentSection === 'examples') examples.push(text);
            }
            
            return {
                title,
                meaning: meaning.trim(),
                formation: formation.trim(),
                examples,
                sourceUrl: window.location.href,
            };
        });
    } catch (error) {
        console.error(`Failed to scrape detail page ${url}:`, error.message);
        return null;
    }
}

async function scrapeGrammarLists(browser) {
  console.log('\n🚀 Starting scrape of main grammar lists...');
  const collectionName = 'grammar_list';

  for (const level of LEVELS) {
    console.log(`\n--- Scraping Grammar List for Level: ${level.toUpperCase()} ---`);
    const listUrl = `${BASE_URL}jlpt-${level}-grammar-list/`;
    const page = await browser.newPage();
    let detailLinks = [];

    try {
        console.log(`Fetching links from: ${listUrl}`);
        await page.goto(listUrl, { waitUntil: 'networkidle0' });
        detailLinks = await page.evaluate(() => 
            Array.from(document.querySelectorAll('div.entry.clearfix ul li a'))
                 .map(a => ({ url: a.href, title: a.innerText }))
        );
        console.log(`Found ${detailLinks.length} grammar points for ${level.toUpperCase()}.`);
    } catch (error) {
        console.error(`Could not fetch grammar list for ${level}:`, error.message);
        await page.close();
        continue;
    }
    await page.close();

    for (const link of detailLinks) {
        const slug = link.url.split('/').filter(Boolean).pop();
        const docRef = db.collection('jlpt').doc(level).collection(collectionName).doc(slug);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            console.log(`- Skipping ${slug}, data already exists.`);
            continue;
        }

        const detailPage = await browser.newPage();
        console.log(`Scraping detail: ${link.title}`);
        const grammarData = await scrapeGrammarDetailPage(detailPage, link.url);
        if (grammarData && grammarData.examples.length > 0) {
            await docRef.set(grammarData);
            console.log(`✅ Successfully saved: ${slug}`);
        } else {
            console.log(`- No valid data or examples found for ${slug}.`);
        }
        await detailPage.close();
    }
  }
  console.log('✅ Finished scraping all grammar lists.');
}

// =================================================================
// SECTION 3: MAIN EXECUTION
// =================================================================

async function main() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  
  await scrapeAllTests(browser);
  await scrapeVocabularyLists(browser);
  await scrapeGrammarLists(browser);

  await browser.close();
  console.log('\n🎉 Full scrape process completed!');
}

main().catch(console.error);