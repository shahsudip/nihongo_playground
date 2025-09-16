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
console.log('Firestore initialized successfully. RUNNING IN LOG-ONLY MODE.');

// =================================================================
// SECTION 1: SCRAPER FOR INDIVIDUAL EXERCISE TESTS
// =================================================================

async function scrapeTestPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    if (category === 'reading') {
        return await page.evaluate(() => {
            const content = document.querySelector('div.entry.clearfix');
            if (!content) return null;
            const title = document.title.split('|')[0].trim();
            const passages = [];
            let currentPassage = null;
            content.childNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const el = node;
                    const strongText = el.querySelector('strong')?.innerText || '';
                    if (el.tagName === 'P' && strongText.startsWith('Reading Passage')) {
                        if (currentPassage) passages.push(currentPassage);
                        currentPassage = { passageTitle: strongText.trim(), passageImage: '', passageText: '', questions: [], };
                        return;
                    }
                    if (currentPassage) {
                        if (el.tagName === 'FIGURE') {
                            currentPassage.passageImage = el.querySelector('img')?.src || '';
                        } else if (el.tagName === 'P' && el.querySelector('input[type="radio"]')) {
                            const innerHTML = el.innerHTML;
                            const parts = innerHTML.split('<br>').map(part => {
                                const tempEl = document.createElement('div');
                                tempEl.innerHTML = part;
                                return tempEl.textContent.trim();
                            });
                            const questionText = parts[0] || '';
                            const options = parts.slice(1).filter(Boolean);
                            const questionNumber = parseInt(questionText.match(/^(\d+)/)?.[1] || '0', 10);
                            currentPassage.questions.push({ questionNumber, questionText, options });
                        } else if (el.tagName === 'P' && el.innerText.trim()) {
                            if (!el.querySelector('input[type="radio"]')) {
                                currentPassage.passageText += el.innerText.trim() + '\n';
                            }
                        }
                    }
                }
            });
            if (currentPassage) passages.push(currentPassage);
            const answers = {};
            const allParagraphs = Array.from(content.querySelectorAll('p'));
            let isAnswerKeySection = false;
            for (const p of allParagraphs) {
                const strongText = p.querySelector('strong')?.innerText || '';
                if (strongText.includes('Answer Key')) isAnswerKeySection = true;
                if (isAnswerKeySection) {
                    const text = p.innerText;
                    const match = text.match(/Question\s*(\d+):\s*(\d+)/);
                    if (match) answers[parseInt(match[1])] = parseInt(match[2]) - 1;
                }
            }
            passages.forEach(passage => {
                passage.passageText = passage.passageText.trim();
                passage.questions.forEach(q => {
                    if (answers[q.questionNumber] !== undefined) q.correctOptionIndex = answers[q.questionNumber];
                });
            });
            if (passages.length === 0) return null;
            return { title, sourceUrl: window.location.href, passages };
        });
    } else {
        return await page.evaluate((currentCategory) => {
            const mainContent = document.querySelector('div.entry.clearfix');
            if (!mainContent) return null;
            const title = document.title.split('|')[0].trim();
            const allParagraphs = Array.from(mainContent.querySelectorAll('p'));
            let questions = [], answers = {}, vocabulary = [];
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
                    if (match) answers[parseInt(match[1])] = parseInt(match[2]) - 1;
                } else if (parsingMode === 'vocab') {
                    const text = p.innerText;
                    if (text.includes(':')) {
                        const [term, english] = text.split(/:(.*)/s);
                        const termMatch = term.match(/(.*) \((.*)\)/);
                        if (termMatch) vocabulary.push({ japanese: termMatch[1].trim(), romaji: termMatch[2].trim(), english: english.trim() });
                    }
                }
            });
            questions.forEach((q, index) => { q.correctOptionIndex = answers[index + 1]; });
            if (questions.length === 0) return null;
            return { title, sourceUrl: window.location.href, questions, vocabulary };
        }, category);
    }
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
        const url = `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${exerciseNum}/`;
        const page = await browser.newPage();
        console.log(`Attempting to scrape: ${url}`);
        const quizData = await scrapeTestPage(page, url, category);
        if (quizData) {
          consecutiveFailures = 0;
          console.log(`\n--- WOULD SAVE TO: ${docRef.path} ---`);
          console.log(JSON.stringify(quizData, null, 2));
          console.log(`--- END OF DATA ---`);
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
    const url = `${BASE_URL}jlpt-${level}-vocabulary-list/`;
    const page = await browser.newPage();
    console.log(`Attempting to scrape: ${url}`);
    try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        const vocabList = await page.evaluate(() => {
            const paragraphs = Array.from(document.querySelectorAll('div.entry.clearfix p'));
            const words = [];
            for (const p of paragraphs) {
                const text = p.innerText.trim();
                if (!text.includes(':') || text.toLowerCase().includes('jlpt n')) continue;
                const parts = text.split(/:(.*)/s);
                if (parts.length < 2) continue;
                const japaneseAndRomaji = parts[0].trim();
                const english = parts[1].trim();
                let japanese = '', romaji = '';
                const romajiMatch = japaneseAndRomaji.match(/\((.*)\)/);
                if (romajiMatch) {
                    romaji = romajiMatch[1].trim();
                    japanese = japaneseAndRomaji.replace(/\(.*\)/, '').trim();
                } else {
                    japanese = japaneseAndRomaji;
                }
                words.push({ japanese, romaji, english });
            }
            return words;
        });
        if (vocabList.length > 0) {
            const dataToSave = { title: `JLPT ${level.toUpperCase()} Vocabulary List`, words: vocabList };
            console.log(`\n--- WOULD SAVE TO: ${docRef.path} ---`);
            console.log(JSON.stringify(dataToSave, null, 2));
            console.log(`--- END OF DATA ---`);
        } else {
            console.log(`- No vocabulary data found for ${level}.`);
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
            const childNodes = Array.from(content.childNodes);
            
            let meaning = '', formation = '';
            const examples = [];
            let currentSection = '';

            for (const node of childNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) continue;

                const el = node;
                if (el.tagName !== 'P') continue;

                const strongText = el.querySelector('strong')?.innerText.toLowerCase() || '';
                const text = el.innerText.trim();

                if (strongText.includes('meaning')) {
                    currentSection = 'meaning';
                    meaning += text.replace(/meaning:/i, '').trim();
                    continue;
                }
                if (strongText.includes('formation')) {
                    currentSection = 'formation';
                    formation += text.replace(/formation:/i, '').trim();
                    continue;
                }
                if (strongText.includes('example sentences')) {
                    currentSection = 'examples';
                    continue;
                }
                
                if (!text) continue;

                if (currentSection === 'meaning' && !strongText) {
                    meaning += '\n' + text;
                } else if (currentSection === 'formation' && !strongText) {
                    formation += '\n' + text;
                } else if (currentSection === 'examples') {
                    const lines = el.innerHTML.split('<br>').map(line => {
                        const tempEl = document.createElement('div');
                        tempEl.innerHTML = line;
                        return tempEl.textContent.trim();
                    }).filter(Boolean);
                    
                    if (lines.length >= 2) {
                        examples.push({
                            japanese: lines[0] || '',
                            english: lines[1] || '',
                            romaji: lines[2] || '',
                        });
                    }
                }
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
        // CORRECTED: The links are in <p> tags, not <ul>
        detailLinks = await page.evaluate(() => 
            Array.from(document.querySelectorAll('div.entry.clearfix p a'))
                 .filter(a => a.href.includes('/flashcard/')) // Filter only for flashcard links
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
        
        const detailPage = await browser.newPage();
        console.log(`Scraping detail: ${link.title}`);
        const grammarData = await scrapeGrammarDetailPage(detailPage, link.url);
        
        if (grammarData && grammarData.examples.length > 0) {
            console.log(`\n--- WOULD SAVE TO: ${docRef.path} ---`);
            console.log(JSON.stringify(grammarData, null, 2));
            console.log(`--- END OF DATA ---`);
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