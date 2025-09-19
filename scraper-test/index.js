const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

console.log('JLPT Quiz Scraper started with Stealth Mode.');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const TEST_CATEGORIES = ['grammar', 'vocabulary', 'kanji', 'reading'];
const BASE_URL = 'https://japanesetest4you.com/';

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
console.log('Firestore initialized successfully. Database writes are enabled.');

// ---- Utility helpers for more robust parsing ----
function cleanText(s) {
  return (s || '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractJapaneseAndRomaji(japaneseAndRomaji) {
  // Attempt to extract romaji inside parentheses, otherwise romaji empty.
  const romajiMatch = japaneseAndRomaji.match(/\(([^)]+)\)/);
  let romaji = '';
  let japanese = japaneseAndRomaji;
  if (romajiMatch) {
    romaji = cleanText(romajiMatch[1]);
    japanese = japaneseAndRomaji.replace(/\([^)]*\)/g, '').trim();
  }
  japanese = cleanText(japanese);
  return { japanese, romaji };
}

function splitVocabLinesFromParagraphHTML(html) {
  // Split on <br> tags first, then on semicolons, then on newlines.
  return html
    .split(/<br\s*\/?>|；|;|\n/gi)
    .map(s => s.trim())
    .filter(Boolean);
}

function parseVocabParagraph(p) {
  // p is an element in page.evaluate; to be used in-browser context.
  // This helper will be implemented inside page.evaluate as a string; we provide a hosted version below.
}

function normalizeOptionText(s) {
  return cleanText(s).replace(/^[-\d\.\)\s]+/, '').trim();
}

// ---- Main page scraping function ----
async function scrapeTestPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    return await page.evaluate((currentCategory) => {
      // in-browser helpers
      const cleanText = (s) => (s || '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();

      const extractJapaneseAndRomaji = (japaneseAndRomaji) => {
        const romajiMatch = japaneseAndRomaji.match(/\(([^)]+)\)/);
        let romaji = '';
        let japanese = japaneseAndRomaji;
        if (romajiMatch) {
          romaji = cleanText(romajiMatch[1]);
          japanese = japaneseAndRomaji.replace(/\([^)]*\)/g, '').trim();
        }
        japanese = cleanText(japanese);
        return { japanese, romaji };
      };

      const splitVocabLinesFromParagraphHTML = (html) => {
        return html
          .split(/<br\s*\/?>|；|;|\n/gi)
          .map(s => s.trim())
          .filter(Boolean);
      };

      const normalizeOptionText = (s) => cleanText(s).replace(/^[-\d\.\)\s]+/, '').trim();

      const content = document.querySelector('div.entry.clearfix');
      if (!content) return null;
      const title = document.title.split('|')[0].trim();

      if (currentCategory === 'reading') {
        // Reading-specific parsing (passages, questions, vocab)
        const passages = [];
        let currentPassage = null;
        let currentQuestion = null;
        let mode = 'seeking'; // 'passage', 'options', 'answers', 'vocab'

        const commitQuestion = () => {
          if (currentQuestion && currentPassage) {
            currentQuestion.questionText = (currentQuestion.questionText || '').replace(/「しつもん」/g, '').trim();
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

        const allNodes = Array.from(content.childNodes || []);

        // We'll collect answer key lines to map after parsing questions
        const answerLines = [];
        let vocabLines = [];

        for (const node of allNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          const el = node;
          const text = cleanText(el.innerText || '');
          const strongText = el.querySelector('strong')?.innerText?.trim() || '';

          // Detect section headings
          if (strongText.startsWith('Reading Passage') || strongText.startsWith('Reading Passage:') || strongText.match(/^Reading\s*Passage/i)) {
            commitPassage();
            currentPassage = { passageTitle: strongText || text.substring(0, 80), passageImage: '', passageText: '', questions: [] };
            mode = 'passage';
            continue;
          }

          if (strongText.includes('Answer Key')) {
            mode = 'answers';
            continue;
          }

          if (strongText.includes('New words') || strongText.includes('New Words')) {
            mode = 'vocab';
            continue;
          }

          // FIGURE handling
          if (el.tagName === 'FIGURE') {
            if (currentQuestion) {
              currentQuestion.questionImage = el.querySelector('img')?.src || '';
            } else if (currentPassage) {
              currentPassage.passageImage = el.querySelector('img')?.src || '';
            }
            continue;
          }

          if (mode === 'passage' || mode === 'options' || mode === 'seeking') {
            if (el.tagName === 'P') {
              // If paragraph contains a question marker like 「１」
              const questionMarker = text.match(/「(\d+|しつもん)」/);
              if (questionMarker) {
                // start a new question
                commitQuestion();
                currentQuestion = { questionNumber: null, questionText: text, options: [], correctOption: null, questionImage: '' };
                mode = 'options';
                continue;
              }

              // If paragraph appears to contain option lines (no input elements but short items)
              const html = el.innerHTML || '';
              const hasInputs = el.querySelector('input') !== null;

              if (mode === 'options' && currentQuestion) {
                // First try to parse <br>-separated options
                const brParts = html.split(/<br\s*\/?>/i).map(s => (s || '').replace(/<[^>]*>/g, '')).map(s => s.trim()).filter(Boolean);
                if (brParts.length >= 2) {
                  // If the first part looks like the question line (contains the question or number), drop it as questionText
                  const possibleQuestionLine = brParts[0] || '';
                  const rest = brParts.slice(1);
                  // If rest likely options, use them
                  if (rest.length >= 2) {
                    const opts = rest.map(normalizeOptionText).filter(Boolean);
                    currentQuestion.options.push(...opts);
                    continue;
                  }
                }

                // If there are radio/input elements, use them
                if (hasInputs) {
                  const parts = html.split('<br>').map(part => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = part;
                    tempDiv.querySelectorAll('input').forEach(i => i.remove());
                    return tempDiv.textContent.trim();
                  }).filter(Boolean);
                  // If parts include question text at index0, options afterwards
                  if (parts.length >= 2) {
                    const opts = parts.slice(1).map(normalizeOptionText).filter(Boolean);
                    currentQuestion.options.push(...opts);
                    continue;
                  }
                }

                // Otherwise, try to split plain text into candidate options by punctuation / wide-space / commas
                const candidateTokens = text.split(/[\u3000,、\/;]|\s{2,}|\|/).map(s => s.trim()).filter(Boolean);
                // Accept candidateTokens as options only if there are between 2 and 6 short pieces
                const shortTokens = candidateTokens.filter(t => t.length > 0 && t.length < 40);
                if (shortTokens.length >= 2 && shortTokens.length <= 6) {
                  currentQuestion.options.push(...shortTokens.map(normalizeOptionText));
                  continue;
                }

                // If none of the above and mode is options, maybe this paragraph is continuation of question text
                currentQuestion.questionText += '\n' + text;
                continue;
              }

              // If mode is passage, append to passage text
              if (mode === 'passage' && currentPassage) {
                currentPassage.passageText += (text ? text + '\n' : '');
                continue;
              }

              // Otherwise, try to detect case where question and 4 options are in separate paragraphs
              // Example: paragraph with question number, next paragraph has options one-per-line without <br>
              // We handle this by allowing the 'seeking' mode to turn into 'options' when a following short-line paragraph appears
              if (mode === 'seeking' && currentPassage) {
                // no-op; keep accumulating passage until a question marker appears
                currentPassage.passageText += (text ? text + '\n' : '');
                continue;
              }

            }

            // If we reach here and node was not P or did not match, continue parsing
          }

          if (mode === 'answers') {
            // Collect answer lines to process after parsing
            if (el.tagName === 'P' || el.tagName === 'DIV' || el.tagName === 'LI') {
              const atext = cleanText(el.innerText || '');
              if (atext) answerLines.push(atext);
            }
            continue;
          }

          if (mode === 'vocab') {
            // Collect vocab lines — keep innerHTML so we can split on <br>
            if (el.tagName === 'P' || el.tagName === 'DIV' || el.tagName === 'LI') {
              const html = el.innerHTML || '';
              vocabLines.push(html);
            }
            continue;
          }

        } // end for allNodes

        // Post-process vocabLines into structured vocab items
        const vocab = [];
        for (const html of vocabLines) {
          const lines = splitVocabLinesFromParagraphHTML(html);
          for (const line of lines) {
            const trimmed = line.replace(/^New words?:?/i, '').trim();
            if (!trimmed) continue;
            // Expect format: Japanese (romaji): English
            const colonIndex = trimmed.indexOf(':');
            if (colonIndex === -1) continue;
            const japaneseAndRomaji = trim = trimmed.substring(0, colonIndex).trim();
            const english = trimmed.substring(colonIndex + 1).trim();
            if (!english) continue;
            // Some lines have multiple Japanese items separated by commas — split them
            const japParts = japaneseAndRomaji.split(/\s*[,、]\s*/).map(s => s.trim()).filter(Boolean);
            for (const japPart of japParts) {
              const { japanese, romaji } = extractJapaneseAndRomaji(japPart);
              vocab.push({ japanese, romaji, english: cleanText(english) });
            }
          }
        }

        // Post-process answerLines to map questionNum -> answerIndex
        const answers = {};
        for (const line of answerLines) {
          // Many sites format answers like: Question 1: 3  OR 1. 3  OR Answer: 1->C  OR 1) B
          let m = line.match(/Question\s*(\d+)\s*[:\)]\s*(\d+)/i);
          if (m) {
            answers[parseInt(m[1], 10)] = parseInt(m[2], 10) - 1;
            continue;
          }
          m = line.match(/^(\d+)\s*[:\.\)]\s*([A-Da-d])\b/);
          if (m) {
            const letter = m[2].toUpperCase();
            answers[parseInt(m[1], 10)] = (letter.charCodeAt(0) - 'A'.charCodeAt(0));
            continue;
          }
          // find all occurrences like "1: 3"
          const all = [...line.matchAll(/(\d+)\s*[:\)]\s*(\d+)/g)];
          for (const mm of all) {
            answers[parseInt(mm[1], 10)] = parseInt(mm[2], 10) - 1;
          }
        }

        // Assign question numbers sequentially across passages starting at 1
        let questionIndex = 1;
        // But many pages already number questions; we attempt to use existing numbering if present
        for (const node of passages) { /* safety, not used */ }

        // Build final passages array by iterating over previously built passages (we constructed them into 'passages' var)
        // Note: we used 'passages' push during parsing; now attach answers
        let globalQNum = 1;
        for (const passage of passages) {
          passage.passageText = (passage.passageText || '').trim();
          passage.questions.forEach(q => {
            // If q.questionNumber is null, assign sequential
            if (!q.questionNumber) q.questionNumber = globalQNum;
            // If answers contain explicit mapping for this globalQNum, use it
            if (answers[globalQNum] !== undefined) {
              const idx = answers[globalQNum];
              if (idx >= 0 && idx < (q.options || []).length) {
                q.correctOption = { index: idx, text: q.options[idx] };
              }
            }
            globalQNum++;
          });
        }

        // If we accumulated no passages but there is at least some vocab, return vocab-only
        if (passages.length === 0 && vocab.length === 0) return null;

        return { title, sourceUrl: window.location.href, passages, vocab };

      } else {
        // --- Non-reading categories parsing (grammar / vocabulary / kanji) ---
        let questions = [];
        let currentQuestion = null;
        let expectedQuestionNumber = 1;
        let parsingMode = 'questions'; // or 'answers' or 'vocab'
        const answers = {};
        const vocab = [];

        const commitCurrentQuestion = () => {
          if (currentQuestion) {
            currentQuestion.questionText = (currentQuestion.questionText || '').replace(/^\d+\.\s*/, '').replace(/『しつもん』/g, '').replace(/「しつもん」/g, '').trim();
            if (currentQuestion.questionText || (currentQuestion.options && currentQuestion.options.length > 0)) {
              delete currentQuestion.inputName;
              questions.push(currentQuestion);
            }
            currentQuestion = null;
          }
        };

        const allParagraphs = Array.from(content.querySelectorAll('p'));

        for (const p of allParagraphs) {
          const strongText = p.querySelector('strong')?.innerText?.trim() || '';
          if (strongText.includes('Answer Key') || strongText.includes('New words')) {
            commitCurrentQuestion();
            parsingMode = strongText.includes('Answer Key') ? 'answers' : 'vocab';
            continue;
          }

          if (parsingMode === 'vocab') {
            const html = p.innerHTML || '';
            const lines = splitVocabLinesFromParagraphHTML(html);
            for (const line of lines) {
              const text = line.replace(/^New words?:?/i, '').trim();
              if (!text) continue;
              if (!text.includes(':')) continue;
              const parts = text.split(/:(.*)/s);
              if (parts.length < 2) continue;
              const japaneseAndRomaji = parts[0].trim();
              const english = parts[1].trim();
              const japParts = japaneseAndRomaji.split(/\s*[,、]\s*/).map(s => s.trim()).filter(Boolean);
              for (const japPart of japParts) {
                const romajiMatch = japPart.match(/\(([^)]+)\)/);
                let romaji = '';
                let japanese = japPart;
                if (romajiMatch) {
                  romaji = romajiMatch[1].trim();
                  japanese = japPart.replace(/\([^)]*\)/g, '').trim();
                }
                vocab.push({ japanese: japanese, romaji: romaji, english: cleanText(english) });
              }
            }
            continue;
          }

          if (parsingMode !== 'questions') continue;

          const hasRadio = p.querySelector('input[type="radio"]') !== null;
          if (hasRadio) {
            const inputName = p.querySelector('input[type="radio"]').getAttribute('name');
            const innerHTML = p.innerHTML;
            const parts = innerHTML.split('<br>').map(part => {
              const tempEl = document.createElement('div');
              tempEl.innerHTML = part;
              tempEl.querySelectorAll('input').forEach(input => input.remove());
              return tempEl.textContent.trim();
            }).filter(Boolean);

            if (parts.length === 0) continue;
            const potentialQuestionText = parts[0] || '';
            const startsWithNumber = /^\d+\./.test(potentialQuestionText);
            const isContinuation = currentQuestion && currentQuestion.inputName === inputName && !startsWithNumber;
            if (isContinuation) {
              currentQuestion.options.push(...parts.map(normalizeOptionText));
            } else {
              commitCurrentQuestion();
              let questionNumber = parseInt(potentialQuestionText.match(/^(\d+)\./)?.[1], 10);
              if (!questionNumber) {
                questionNumber = inputName && inputName.match(/quest(\d+)/i)
                  ? parseInt(inputName.match(/quest(\d+)/i)[1], 10)
                  : expectedQuestionNumber;
              }
              currentQuestion = {
                questionNumber,
                questionText: potentialQuestionText,
                options: parts.slice(1).map(normalizeOptionText),
                correctOption: null,
                inputName: inputName
              };
              expectedQuestionNumber = Math.max(expectedQuestionNumber, questionNumber + 1);
            }
          } else {
            // Some question formats do not use radio inputs.
            // If paragraph starts with a number like '13.' treat it as new question
            const text = p.innerText.trim();
            const match = text.match(/^(\d+)\.\s*(.*)/);
            if (match) {
              commitCurrentQuestion();
              const qnum = parseInt(match[1], 10);
              const qtext = match[2] || '';
              currentQuestion = { questionNumber: qnum, questionText: qtext, options: [], correctOption: null };
            } else {
              // Not a numbered line — may be continuation of current question or simply a paragraph break
              commitCurrentQuestion();
            }
          }
        }

        // Final commit
        commitCurrentQuestion();

        // Parse Answer Key paragraphs
        let parsingAnswers = false;
        for (const p of allParagraphs) {
          const strongText = p.querySelector('strong')?.innerText?.trim() || '';
          if (strongText.includes('Answer Key')) {
            parsingAnswers = true;
            continue;
          }
          if (!parsingAnswers) continue;
          const text = p.innerText.trim();
          const regex = /Question\s*(\d+):\s*(\d+)/gi;
          let match;
          while ((match = regex.exec(text)) !== null) {
            const questionNum = parseInt(match[1], 10);
            const answerIndex = parseInt(match[2], 10) - 1;
            answers[questionNum] = answerIndex;
          }
          // also handle lines like '1. 3' or '1) 3'
          const allMatches = [...text.matchAll(/(\d+)[\)\.]\s*(\d+)/g)];
          for (const mm of allMatches) {
            answers[parseInt(mm[1], 10)] = parseInt(mm[2], 10) - 1;
          }
        }

        // attach answers to questions where possible
        questions.forEach(q => {
          if (answers[q.questionNumber] !== undefined) {
            const idx = answers[q.questionNumber];
            if (idx >= 0 && idx < q.options.length) {
              q.correctOption = { index: idx, text: q.options[idx] || '' };
            }
          }
        });

        const result = { title, sourceUrl: window.location.href };
        if (questions.length > 0) result.questions = questions;
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
          const currentUrl = triedUrls[triedUrls.length -1];
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
        const cleanText = (s) => (s || '').replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
        const splitVocabLinesFromParagraphHTML = (html) => html.split(/<br\s*\/?>|；|;|\n/gi).map(s => s.trim()).filter(Boolean);
        const paragraphs = Array.from(document.querySelectorAll('div.entry.clearfix p'));
        const words = [];
        for (const p of paragraphs) {
          const html = p.innerHTML || '';
          const lines = splitVocabLinesFromParagraphHTML(html);
          for (const line of lines) {
            if (!line || !line.includes(':')) continue;
            const parts = line.split(/:(.*)/s);
            if (parts.length < 2) continue;
            const japaneseAndRomaji = parts[0].trim();
            const english = parts[1].trim();
            const japParts = japaneseAndRomaji.split(/\s*[,、]\s*/).map(s => s.trim()).filter(Boolean);
            for (const japPart of japParts) {
              const romajiMatch = japPart.match(/\(([^)]+)\)/);
              let romaji = '';
              let japanese = japPart;
              if (romajiMatch) {
                romaji = romajiMatch[1].trim();
                japanese = japPart.replace(/\([^)]*\)/g, '').trim();
              }
              words.push({ japanese: cleanText(japanese), romaji: cleanText(romaji), english: cleanText(english) });
            }
          }
        }
        return words;
      });

      if (vocabList.length > 0) {
        const dataToSave = { title: `JLPT ${level.toUpperCase()} Vocabulary List`, words: vocabList };
        try {
          await docRef.set(dataToSave);
          console.log(`✅ Successfully saved vocabulary list to ${docRef.path}`);
        } catch (error) {
          console.error(`🔥 Failed to save data to ${docRef.path}:`, error.message);
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
            examples.push({ japanese: lines[0] || '', english: lines[1] || '', romaji: lines[2] || '' });
          }
        }
      }

      return { title, meaning: meaning.trim(), formation: formation.trim(), examples, sourceUrl: window.location.href };
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
          console.error(`🔥 Failed to save data to ${docRef.path}:`, error.message);
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
