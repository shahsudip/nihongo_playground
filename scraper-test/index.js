const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

console.log('JLPT Quiz Scraper started with Stealth Mode.');

// Ensure your FIREBASE_SERVICE_ACCOUNT environment variable is set correctly
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const LEVELS = ['n5', 'n4'];
const TEST_CATEGORIES = ['grammar', 'vocabulary', 'kanji', 'reading'];
const BASE_URL = 'https://japanesetest4you.com/';

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
console.log('Firestore initialized successfully. Database writes are enabled.');

// ===================== SCRAPE TEST PAGE =====================
async function scrapeTestPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    return await page.evaluate((currentCategory) => {
      const content = document.querySelector('div.entry.clearfix');
      if (!content) return null;
      const title = document.title.split('|')[0].trim();
      let passages = [], questions = [], answers = {}, vocab = [];

      const parseVocabLine = (line) => {
        if (line && line.includes(':')) {
          const parts = line.split(/:(.*)/s);
          if (parts.length < 2) return null;
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
            return { japanese, romaji, english };
          }
        }
        return null;
      };

      // ----------- READING CATEGORY -----------
      if (currentCategory === 'reading') {
        let currentPassage = null;
        let currentQuestion = null;
        let mode = 'seeking';
        let globalQuestionCounter = 1;

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
          if (currentPassage) passages.push(currentPassage);
          currentPassage = null;
        };

        const allNodes = Array.from(content.childNodes);

        for (let i = 0; i < allNodes.length; i++) {
          const node = allNodes[i];
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
            commitPassage();
            mode = 'answers';
          } else if (strongText.includes('New words')) {
            commitPassage();
            mode = 'vocab';
          }

          if (mode === 'passage' || mode === 'question' || mode === 'options') {
            if (el.tagName === 'FIGURE') {
              if (currentQuestion) currentQuestion.questionImage = el.querySelector('img')?.src || '';
              else if (currentPassage) currentPassage.passageImage = el.querySelector('img')?.src || '';
            } else if (el.tagName === 'P') {
              const isQuestionMarker = text.includes('しつもん') || /「\d+」には、なにをいれますか/.test(text);
              const hasRadioButtons = !!el.querySelector('input[type="radio"]');

              if (isQuestionMarker && !hasRadioButtons) {
                commitQuestion();
                currentQuestion = { questionNumber: globalQuestionCounter++, questionText: text, options: [], correctOption: null };
                mode = 'options';
              } else if (hasRadioButtons || (mode === 'options' && currentQuestion)) {
                if (!currentQuestion) {
                  commitQuestion();
                  currentQuestion = { questionNumber: globalQuestionCounter++, questionText: " ", options: [], correctOption: null };
                }
                const optionsFromP = el.innerHTML.split('<br>').map(part => {
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = part;
                  tempDiv.querySelectorAll('input').forEach(i => i.remove());
                  return tempDiv.textContent.trim();
                }).filter(Boolean);

                if (optionsFromP.length > 0 && optionsFromP[0].includes('しつもん')) {
                  currentQuestion.questionText = optionsFromP[0];
                  currentQuestion.options.push(...optionsFromP.slice(1));
                } else {
                  if (currentQuestion.questionText.trim() === "") {
                    let prev = el.previousElementSibling;
                    while (prev && (prev.tagName !== 'P' || !prev.innerText.includes('しつもん'))) prev = prev.previousElementSibling;
                    if (prev) currentQuestion.questionText = prev.innerText.trim();
                  }
                  currentQuestion.options.push(...optionsFromP);
                }
                mode = 'options';
              } else if (mode === 'passage' && currentPassage) {
                currentPassage.passageText += text + '\n';
              }
            }
          } else if (mode === 'answers' && el.tagName === 'P') {
            const lines = el.innerHTML.split('<br>').map(line => {
              const temp = document.createElement('div'); temp.innerHTML = line;
              return temp.textContent.trim();
            });
            lines.forEach(line => {
              const match = line.match(/Question\s*(\d+):\s*(.*)/);
              if (match) {
                const qNum = parseInt(match[1], 10);
                let answerText = match[2].trim();
                if (answerText.includes('=>')) answerText = answerText.split('=>')[1].replace(/<[^>]*>/g, '').trim();
                answers[qNum] = answerText;
              }
            });
          } else if (mode === 'vocab' && el.tagName === 'P') {
            const lines = el.innerHTML.split('<br>').map(line => {
              const tempDiv = document.createElement('div'); tempDiv.innerHTML = line;
              return tempDiv.textContent.trim();
            }).filter(Boolean);
            for (const line of lines) {
              const vocabItem = parseVocabLine(line);
              if (vocabItem) vocab.push(vocabItem);
            }
          }
        }
        commitPassage();

        // attach correct options
        passages.forEach(p => {
          p.passageText = p.passageText.trim();
          p.questions.forEach(q => {
            const correctTextOrIndex = answers[q.questionNumber];
            if (correctTextOrIndex !== undefined) {
              let correctIndex = q.options.findIndex(opt => opt === correctTextOrIndex);
              if (correctIndex === -1) {
                const potentialIndex = parseInt(correctTextOrIndex, 10) - 1;
                if (!isNaN(potentialIndex) && potentialIndex >= 0 && potentialIndex < q.options.length) correctIndex = potentialIndex;
              }
              if (correctIndex !== -1) q.correctOption = { index: correctIndex, text: q.options[correctIndex] };
            }
          });
        });

        if (passages.every(p => !p.passageText.trim() && p.questions.length === 0) && vocab.length === 0) return null;
        const result = { title, sourceUrl: window.location.href, passages };
        if (vocab.length > 0) result.vocab = vocab;
        return result;
      }

      // ----------- NON-READING CATEGORIES -----------
      let parsingMode = 'questions';
      let currentQuestion = null;
      let expectedQuestionNumber = 1;

      const commitCurrentQuestion = () => {
        if (currentQuestion) {
          currentQuestion.questionText = currentQuestion.questionText.replace(/^\d+\.\s*/, '').replace(/「しつもん」/g, '').trim();
          if (currentQuestion.questionText || currentQuestion.options.length > 0) {
            delete currentQuestion.inputName;
            questions.push(currentQuestion);
          }
          currentQuestion = null;
        }
      };

      const allParagraphs = content.querySelectorAll('p');
      allParagraphs.forEach(p => {
        const strongText = p.querySelector('strong')?.innerText?.trim() || '';
        if (strongText.includes('Answer Key') || strongText.includes('New words')) {
          commitCurrentQuestion();
          parsingMode = strongText.includes('Answer Key') ? 'answers' : 'vocab';
          return;
        }
        if (parsingMode === 'vocab') {
          const lines = p.innerHTML.split('<br>').map(line => {
            const tempDiv = document.createElement('div'); tempDiv.innerHTML = line;
            return tempDiv.textContent.trim();
          }).filter(Boolean);
          for (const line of lines) {
            const vocabItem = parseVocabLine(line);
            if (vocabItem) vocab.push(vocabItem);
          }
          return;
        }
        if (parsingMode !== 'questions') return;

        const hasRadio = p.querySelector('input[type="radio"]');
        if (hasRadio) {
          const inputName = hasRadio.getAttribute('name');
          const parts = p.innerHTML.split('<br>').map(part => {
            const tempEl = document.createElement('div'); tempEl.innerHTML = part;
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
            if (!questionNumber) questionNumber = inputName && inputName.match(/quest(\d+)/i) ? parseInt(inputName.match(/quest(\d+)/i)[1]) : expectedQuestionNumber;
            currentQuestion = { questionNumber, questionText: potentialQuestionText, options: parts.slice(1), correctOption: null, inputName };
            expectedQuestionNumber = Math.max(expectedQuestionNumber, questionNumber + 1);
          }
        } else commitCurrentQuestion();
      });
      commitCurrentQuestion();

      // Map answers
      const answerKeyNode = Array.from(allParagraphs).find(p => p.querySelector('strong')?.innerText.trim().startsWith('Answer Key'));
      if(answerKeyNode){
        const answerText = answerKeyNode.innerText.trim();
        const regex = /Question\s*(\d+):\s*(\d+)/gi;
        let match;
        while ((match = regex.exec(answerText)) !== null) {
          answers[parseInt(match[1], 10)] = parseInt(match[2], 10) - 1;
        }
      }

      questions.forEach(q => {
        if (answers[q.questionNumber] !== undefined) {
          const correctIndex = answers[q.questionNumber];
          if (correctIndex >= 0 && correctIndex < q.options.length) q.correctOption = { index: correctIndex, text: q.options[correctIndex] };
        }
      });

      questions = questions.filter(q => q.questionText || q.options.length > 0);
      if (questions.length === 0 && vocab.length === 0) return null;

      const result = { title, sourceUrl: window.location.href, questions };
      if (vocab.length > 0) result.vocab = vocab;
      return result;
    }, category);
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    return null;
  }
}

// ===================== SCRAPE ALL TESTS =====================
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
          `${BASE_URL}jlpt-${level}-${category}-exercise-${exerciseNum}/`,
          `${BASE_URL}jlpt-${level}-${category}-${String(exerciseNum).padStart(2, '0')}/`,
          `${BASE_URL}jlpt-${level}-${category}-${exerciseNum}/`
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

        // DEBUG for Exercises 12 & 13
        if ([12, 13].includes(exerciseNum)) {
          console.log(`--- DEBUG LOG FOR ${docId} ---`);
          console.log(JSON.stringify(quizData, null, 2));
          console.log(`--- END DEBUG LOG FOR ${docId} ---`);
          await page.close();
          exerciseNum++;
          consecutiveFailures = 0;
          continue;
        }

        if (quizData) {
          consecutiveFailures = 0;
          try { await docRef.set(quizData); console.log(`✅ Successfully saved data to ${docRef.path}`); }
          catch (error) { console.error(`🔥 Failed to save data to ${docRef.path}:`, error); }
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
    failedUrls.forEach(u => console.log(' - ' + u));
  } else console.log('\n🎉 All URLs scraped successfully (no permanent failures).');
}

// ===================== SCRAPE VOCAB LISTS =====================
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
          if (romajiMatch) { romaji = romajiMatch[1].trim(); japanese = japaneseAndRomaji.replace(/\(.*\)/, '').trim(); }
          else japanese = japaneseAndRomaji;
          words.push({ japanese, romaji, english });
        }
        return words;
      });
      if (vocabList.length > 0) {
        const dataToSave = { title: `JLPT ${level.toUpperCase()} Vocabulary List`, words: vocabList };
        try { await docRef.set(dataToSave); console.log(`✅ Successfully saved vocabulary list to ${docRef.path}`); }
        catch (error) { console.error(`🔥 Failed to save data to ${docRef.path}:`, error); }
      } else console.log(`- No vocabulary data found for ${level}.`);
    } catch (error) { console.error(`Failed to scrape ${url}:`, error.message); }
    await page.close();
  }
}

// ===================== MAIN EXECUTION ===================== ii[] 
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    await scrapeAllTests(browser);
    await scrapeVocabularyLists(browser);
  } catch (error) {
    console.error('Unexpected error during scraping:', error);
  } finally {
    await browser.close();
    console.log('🔚 Puppeteer browser closed. Scraper finished.');
  }
})();

