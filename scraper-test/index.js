const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

console.log('JLPT Quiz Scraper started with Stealth Mode.');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const LEVELS = ['n5', 'n4'];
const TEST_CATEGORIES = ['grammar', 'vocabulary', 'kanji', 'reading'];
const BASE_URL = 'https://japanesetest4you.com/';

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
console.log('Firestore initialized successfully. RUNNING IN LOG-ONLY MODE.');

async function scrapeTestPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    return await page.evaluate((currentCategory) => {
      const content = document.querySelector('div.entry.clearfix');
      if (!content) return null;
      const title = document.title.split('|')[0].trim();
      let passages = [], questions = [], answers = {};

      let parsingMode = 'questions';
      let expectedQuestionNumber = 1;

      const allParagraphs = Array.from(content.querySelectorAll('p'));

      if (currentCategory === 'reading') {
        let currentPassage = null;
        let currentQuestionInPassage = null;

        const commitCurrentQuestionInPassage = () => {
          if (currentQuestionInPassage && currentPassage) {
            currentQuestionInPassage.questionText = currentQuestionInPassage.questionText.replace(/^\d+\.\s*/, '').trim();
            if (currentQuestionInPassage.questionText || currentQuestionInPassage.options.length > 0) {
              delete currentQuestionInPassage.inputName;
              currentPassage.questions.push(currentQuestionInPassage);
            }
            currentQuestionInPassage = null;
          }
        };

        content.childNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node;
          const strongText = el.querySelector('strong')?.innerText?.trim() || '';

          if (el.tagName === 'P' && strongText.startsWith('Reading Passage')) {
            commitCurrentQuestionInPassage();
            if (currentPassage) passages.push(currentPassage);
            currentPassage = { passageTitle: strongText, passageImage: '', passageText: '', questions: [] };
            expectedQuestionNumber = 1;
            return;
          }

          if (currentPassage) {
            const hasRadio = el.tagName === 'P' && el.querySelector('input[type="radio"]');

            if (hasRadio) {
              const inputName = el.querySelector('input[type="radio"]').getAttribute('name');
              const innerHTML = el.innerHTML;
              const parts = innerHTML.split('<br>').map(part => {
                const tempEl = document.createElement('div');
                tempEl.innerHTML = part;
                tempEl.querySelectorAll('input').forEach(input => input.remove());
                return tempEl.textContent.trim();
              }).filter(Boolean);

              if (parts.length === 0) return;

              const potentialQuestionText = parts[0] || '';
              const startsWithNumber = /^\d+\./.test(potentialQuestionText);
              const isContinuation = currentQuestionInPassage && currentQuestionInPassage.inputName === inputName && !startsWithNumber;

              if (isContinuation) {
                currentQuestionInPassage.options.push(...parts);
              } else {
                commitCurrentQuestionInPassage();
                let questionNumber = parseInt(potentialQuestionText.match(/^(\d+)\./)?.[1], 10);
                if (!questionNumber) {
                  const inputNameMatch = inputName && inputName.match(/quest(\d+)/i);
                  questionNumber = inputNameMatch ? parseInt(inputNameMatch[1], 10) + 1 : expectedQuestionNumber;
                }
                currentQuestionInPassage = {
                  questionNumber,
                  questionText: potentialQuestionText,
                  options: parts.slice(1),
                  correctOption: null,
                  inputName: inputName,
                  vocabulary: []
                };
                expectedQuestionNumber = Math.max(expectedQuestionNumber, questionNumber + 1);
              }
            } else {
              commitCurrentQuestionInPassage();
              if (el.tagName === 'FIGURE') {
                currentPassage.passageImage = el.querySelector('img')?.src || '';
              } else if (el.tagName === 'P' && el.innerText.trim()) {
                currentPassage.passageText += el.innerText.trim() + '\n';
              }
            }
          }
        });
        commitCurrentQuestionInPassage();
        if (currentPassage) passages.push(currentPassage);
      } else {
        let currentQuestion = null;
        const commitCurrentQuestion = () => {
          if (currentQuestion) {
            currentQuestion.questionText = currentQuestion.questionText.replace(/^\d+\.\s*/, '').trim();
            if (currentQuestion.questionText || currentQuestion.options.length > 0) {
              delete currentQuestion.inputName;
              questions.push(currentQuestion);
            }
            currentQuestion = null;
          }
        };

        allParagraphs.forEach(p => {
          const strongText = p.querySelector('strong')?.innerText?.trim() || '';
          if (strongText.includes('Answer Key') || strongText.includes('New words')) {
            commitCurrentQuestion();
            parsingMode = strongText.includes('Answer Key') ? 'answers' : 'vocab';
            return;
          }
          if (parsingMode !== 'questions') return;

          const hasRadio = p.querySelector('input[type="radio"]');
          if (hasRadio) {
            const inputName = hasRadio.getAttribute('name');
            const innerHTML = p.innerHTML;
            const parts = innerHTML.split('<br>').map(part => {
              const tempEl = document.createElement('div');
              tempEl.innerHTML = part;
              tempEl.querySelectorAll('input').forEach(input => input.remove());
              return tempEl.textContent.trim();
            }).filter(Boolean);

            if (parts.length === 0) return;

            const potentialQuestionText = parts[0] || '';
            const startsWithNumber = /^\d+\./.test(potentialQuestionText);
            const isContinuation = currentQuestion && currentQuestion.inputName === inputName && !startsWithNumber;

            if (isContinuation) {
              currentQuestion.options.push(...parts);
            } else {
              commitCurrentQuestion();
              let questionNumber = parseInt(potentialQuestionText.match(/^(\d+)\./)?.[1], 10);
              if (!questionNumber) {
                questionNumber = inputName && inputName.match(/quest(\d+)/i)
                  ? parseInt(inputName.match(/quest(\d+)/i)[1], 10) + 1
                  : expectedQuestionNumber;
              }
              currentQuestion = {
                questionNumber,
                questionText: potentialQuestionText,
                options: parts.slice(1),
                correctOption: null,
                inputName: inputName
              };
              expectedQuestionNumber = Math.max(expectedQuestionNumber, questionNumber + 1);
            }
          } else {
            commitCurrentQuestion();
          }
        });
        commitCurrentQuestion();
      }

      allParagraphs.forEach(p => {
        const strongText = p.querySelector('strong')?.innerText?.trim() || '';
        if (strongText.includes('Answer Key')) parsingMode = 'answers';

        if (parsingMode === 'answers') {
          const text = p.innerText.trim();
          const regex = /Question\s*(\d+):\s*(\d+)/gi;
          let match;
          while ((match = regex.exec(text)) !== null) {
            const questionNum = parseInt(match[1], 10);
            const answerIndex = parseInt(match[2], 10) - 1;
            answers[questionNum] = answerIndex;
          }
        }
      });

      if (currentCategory === 'reading') {
        passages.forEach(passage => {
          passage.passageText = passage.passageText.trim();
          passage.questions.forEach(q => {
            if (answers[q.questionNumber] !== undefined) {
              const correctIndex = answers[q.questionNumber];
              if (correctIndex >= 0 && correctIndex < q.options.length) {
                q.correctOption = { index: correctIndex, text: q.options[correctIndex] || '' };
              }
            }
          });
        });
        if (passages.every(p => p.questions.length === 0)) return null;
        return { title, sourceUrl: window.location.href, passages };
      } else {
        questions = questions.filter(q => {
          if (answers[q.questionNumber] !== undefined) {
            const correctIndex = answers[q.questionNumber];
            if (correctIndex >= 0 && correctIndex < q.options.length) {
              q.correctOption = { index: correctIndex, text: q.options[correctIndex] || '' };
            }
          }
          return q.questionText || q.options.length > 0;
        });
        if (questions.length === 0) return null;
        return { title, sourceUrl: window.location.href, questions };
      }
    }, category);
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    return null;
  }
}

async function scrapeAllTests(browser) {
  console.log('🚀 Starting scrape of all exercise tests...');
  const failedUrls = [];

  for (const level of LEVELS) {
    for (const category of TEST_CATEGORIES) {
      let exerciseNum = 1, consecutiveFailures = 0;
      const collectionName = `${category}-test`;
      console.log(`\n--- Scraping Level: ${level.toUpperCase()}, Category: ${collectionName} ---`);
      while (consecutiveFailures < 3) {
        const docId = `exercise-${exerciseNum}`;
        const docRef = db.collection('jlpt').doc(level).collection(collectionName).doc(docId);

        const urlFormats = [
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${exerciseNum}/`,
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${String(exerciseNum).padStart(2, '0')}/`
        ];

        let quizData = null;
        const page = await browser.newPage();
        const triedUrls = [];

        for (const url of urlFormats) {
          console.log(`Attempting to scrape: ${url}`);
          triedUrls.push(url);
          quizData = await scrapeTestPage(page, url, category);
          if (quizData) break;
        }

        if (quizData) {
          consecutiveFailures = 0;
          console.log(`\n--- WOULD SAVE TO: ${docRef.path} ---`);
          console.log(JSON.stringify(quizData, null, 2));
          console.log(`--- END OF DATA ---`);
        } else {
          consecutiveFailures++;
          const currentUrl = triedUrls.join(' OR ');
          console.log(`- No valid quiz data found at [${currentUrl}] (Failure ${consecutiveFailures}/3).`);
          if (consecutiveFailures === 3) {
            console.log(`❌ Giving up on: ${currentUrl}`);
            failedUrls.push(currentUrl);
          }
        }

        await page.close();
        exerciseNum++;
      }
    }
  }

  console.log('✅ Finished scraping all exercise tests.');
  if (failedUrls.length > 0) {
    console.log('\n📌 SUMMARY: The following URLs failed to be scraped:');
    failedUrls.forEach((u) => console.log(' - ' + u));
  } else {
    console.log('\n🎉 All URLs scraped successfully (no permanent failures).');
  }
}

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
      detailLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.entry.clearfix p a'))
          .filter(a => a.href.includes('/flashcard/'))
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

async function main() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  await scrapeAllTests(browser);
  await scrapeVocabularyLists(browser);
  await scrapeGrammarLists(browser);
  await browser.close();
  console.log('\n🎉 Full scrape process completed!');
}

main().catch(console.error);