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
console.log('Firestore initialized successfully. Database writes are enabled.');

async function scrapeTestPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    return await page.evaluate((currentCategory) => {
      const content = document.querySelector('div.entry.clearfix');
      if (!content) return null;
      const title = document.title.split('|')[0].trim();
      let passages = [], questions = [], answers = {}, vocab = [];
      let parsingMode = 'questions';
      const allParagraphs = Array.from(content.querySelectorAll('p'));

      // --- FIX 2: REWRITTEN PARSER FOR READING TESTS ---
      if (currentCategory === 'reading') {
        let currentPassage = null;
        let currentQuestion = null;
        let mode = 'seeking'; 
        let questionCounter = 1;

        const commitQuestion = () => {
          if (currentQuestion && currentPassage) {
            currentQuestion.questionText = currentQuestion.questionText.replace(/「しつもん」/g, '').trim();
            if (currentQuestion.questionText || currentQuestion.options.length > 0) {
              currentPassage.questions.push(currentQuestion);
            }
          }
          currentQuestion = null;
        };

        const commitPassage = () => {
          commitQuestion();
          if (currentPassage) {
            passages.push(currentPassage);
          }
          currentPassage = null;
        };
        
        const allNodes = Array.from(content.childNodes);

        for (const node of allNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;

          const el = node;
          const text = el.innerText?.trim();
          const strongText = el.querySelector('strong')?.innerText?.trim() || '';

          if (strongText.startsWith('Reading Passage')) {
            commitPassage();
            currentPassage = { passageTitle: strongText, passageImage: '', passageText: '', questions: [] };
            mode = 'passage';
            continue;
          } else if (strongText.includes('Answer Key')) {
            mode = 'answers';
          } else if (strongText.includes('New words')) {
            mode = 'vocab';
          }

          if (mode === 'passage' || mode === 'question' || mode === 'options') {
            if (el.tagName === 'FIGURE') {
              if (currentQuestion) {
                currentQuestion.questionImage = el.querySelector('img')?.src || '';
              } else if (currentPassage) {
                currentPassage.passageImage = el.querySelector('img')?.src || '';
              }
            } else if (el.tagName === 'P') {
              const isQuestionMarker = text.includes('しつもん') || /「\d+」には、なにをいれますか/.test(text);
              if (isQuestionMarker) {
                commitQuestion();
                currentQuestion = { questionNumber: questionCounter++, questionText: text, options: [], correctOption: null };
                mode = 'options';
              } else if (mode === 'options' && currentQuestion) {
                const optionsFromP = el.innerHTML.split('<br>').map(part => {
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = part;
                  tempDiv.querySelectorAll('input').forEach(i => i.remove());
                  return tempDiv.textContent.trim();
                }).filter(Boolean);
                currentQuestion.options.push(...optionsFromP);
              } else if (mode === 'passage' && currentPassage) {
                currentPassage.passageText += text + '\n';
              }
            }
          } else if (mode === 'answers') {
            const answerText = el.innerText.trim();
            const answerMatches = [...answerText.matchAll(/Question\s*(\d+):\s*(\d+)/gi)];
            for (const match of answerMatches) {
              const questionNum = parseInt(match[1], 10);
              const answerIndex = parseInt(match[2], 10) - 1;
              answers[questionNum] = answerIndex;
            }
          } else if (mode === 'vocab') {
            // --- FIX 3: CORRECT VOCABULARY PARSING ---
            const lines = el.innerText.trim().split('\n');
            for (const line of lines) {
              if (line.includes(':')) {
                const parts = line.split(/:(.*)/s);
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
                if (japanese && english) {
                  vocab.push({ japanese, romaji, english });
                }
              }
            }
          }
        }
        commitPassage();

        let questionIndex = 1;
        passages.forEach(passage => {
          passage.passageText = passage.passageText.trim();
          passage.questions.forEach(q => {
            if (answers[questionIndex] !== undefined) {
              const correctIndex = answers[questionIndex];
              if (correctIndex >= 0 && correctIndex < q.options.length) {
                q.correctOption = { index: correctIndex, text: q.options[correctIndex] };
              }
            }
            q.questionNumber = questionIndex;
            questionIndex++;
          });
        });
        if (passages.length === 0 || passages.every(p => p.questions.length === 0)) return null;
        return { title, sourceUrl: window.location.href, passages, vocab };
      
      } else {
        // --- RESTORED: This is the original, working logic for non-reading categories ---
        let currentQuestion = null;
        let expectedQuestionNumber = 1;
        const commitCurrentQuestion = () => {
          if (currentQuestion) {
            currentQuestion.questionText = currentQuestion.questionText
              .replace(/^\d+\.\s*/, '').replace(/「しつもん」/g, '').trim();
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
          if (parsingMode === 'vocab') {
            const lines = p.innerText.trim().split('\n');
            for (const line of lines) {
              if (line.includes(':')) {
                const parts = line.split(/:(.*)/s);
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
                if (japanese && english) {
                  vocab.push({ japanese, romaji, english });
                }
              }
            }
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
                  ? parseInt(inputName.match(/quest(\d+)/i)[1])
                  : expectedQuestionNumber;
              }
              currentQuestion = {
                questionNumber, questionText: potentialQuestionText,
                options: parts.slice(1), correctOption: null, inputName: inputName
              };
              expectedQuestionNumber = Math.max(expectedQuestionNumber, questionNumber + 1);
            }
          } else {
            commitCurrentQuestion();
          }
        });
        commitCurrentQuestion();
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
        questions.forEach(q => {
          if (answers[q.questionNumber] !== undefined) {
            const correctIndex = answers[q.questionNumber];
            if (correctIndex >= 0 && correctIndex < q.options.length) {
              q.correctOption = { index: correctIndex, text: q.options[correctIndex] || '' };
            }
          }
        });
        questions = questions.filter(q => q.questionText || q.options.length > 0);
        if (questions.length === 0) return null;
        const result = { title, sourceUrl: window.location.href, questions };
        if (vocab.length > 0) result.vocab = vocab;
        return result;
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
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          console.log(`- Document ${docRef.path} already exists. Skipping.`);
          exerciseNum++;
          consecutiveFailures = 0;
          continue;
        }

        const urlStrings = [
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${exerciseNum}/`,
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${String(exerciseNum).padStart(2, '0')}/`,
          `${BASE_URL}jlpt-${level}-${category}-${exerciseNum}/`,
          `${BASE_URL}jlpt-${level}-${category}-exercise-${exerciseNum}/`
        ];
        const urlFormats = [...new Set(urlStrings)];
        let quizData = null;
        const page = await browser.newPage();
        const triedUrls = [];

        for (const url of urlFormats) {
          triedUrls.push(url);
          quizData = await scrapeTestPage(page, url, category);
          if (quizData) {
            console.log(`✅ Successfully scraped data from: ${url}`);
            break;
          }
        }

        if (quizData) {
          consecutiveFailures = 0;
          try {
            await docRef.set(quizData);
            console.log(`✅ Successfully saved data to ${docRef.path}`);
          } catch (error) {
            console.error(`🔥 Failed to save data to ${docRef.path}:`, error);
          }
        } else {
          consecutiveFailures++;
          const currentUrl = triedUrls[triedUrls.length - 1];
          console.log(`- No valid quiz data found at [${currentUrl}] (Failure ${consecutiveFailures}/3).`);
          if (consecutiveFailures === 3) {
            console.log(`❌ Giving up on exercise number ${exerciseNum} for ${level} ${category}.`);
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
    console.log('\n📌 SUMMARY: The following URL patterns failed after 3 attempts:');
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
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      console.log(`- Vocabulary list ${docRef.path} already exists. Skipping.`);
      continue;
    }
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
        try {
          await docRef.set(dataToSave);
          console.log(`✅ Successfully saved vocabulary list to ${docRef.path}`);
        } catch (error) {
          console.error(`🔥 Failed to save data to ${docRef.path}:`, error);
        }
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
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        console.log(`- Grammar point ${docRef.path} already exists. Skipping.`);
        continue;
      }

      const detailPage = await browser.newPage();
      console.log(`Scraping detail: ${link.title}`);
      const grammarData = await scrapeGrammarDetailPage(detailPage, link.url);

      if (grammarData && grammarData.examples.length > 0) {
        try {
          await docRef.set(grammarData);
          console.log(`✅ Successfully saved grammar point to ${docRef.path}`);
        } catch (error) {
          console.error(`🔥 Failed to save data to ${docRef.path}:`, error);
        }
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

