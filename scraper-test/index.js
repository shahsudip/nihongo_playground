const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());
console.log('JLPT Quiz Scraper started with Stealth Mode.');

// Firebase initialization
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
console.log('Firestore initialized successfully. Database writes are enabled.');

const LEVELS = ['n5', 'n4']; // extend as needed
const TEST_CATEGORIES = ['grammar', 'vocabulary', 'kanji', 'reading'];
const BASE_URL = 'https://japanesetest4you.com/';

async function scrapeTestPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    return await page.evaluate((currentCategory) => {
      const content = document.querySelector('div.entry.clearfix');
      if (!content) return null;

      const title = document.title.split('|')[0].trim();
      let passages = [],
        questions = [],
        answers = {},
        vocab = [];

      const parseVocabLine = (line) => {
        if (line && line.includes(':')) {
          const parts = line.split(/:(.*)/s);
          if (parts.length < 2) return null;
          const japaneseAndRomaji = parts[0].trim();
          const english = parts[1].trim();
          let japanese = '',
            romaji = '';
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

      // ------------------ READING CATEGORY ------------------
      if (currentCategory === 'reading') {
        let currentPassage = null;
        let currentQuestion = null;
        let mode = 'seeking';
        let globalQuestionCounter = 1;

        const commitQuestion = () => {
          if (currentQuestion && currentPassage) {
            currentQuestion.questionText = currentQuestion.questionText
              .replace(/「しつもん」/g, '')
              .trim();
            if (
              currentQuestion.questionText &&
              (currentQuestion.questionText.trim() !== '' ||
                currentQuestion.options.length > 0)
            ) {
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
            currentPassage = {
              passageTitle: strongText,
              passageImage: '',
              passageText: '',
              questions: [],
            };
            mode = 'passage';
            continue;
          } else if (strongText.includes('Answer Key')) {
            commitPassage();
            mode = 'answers';
          } else if (strongText.includes('New words')) {
            commitPassage();
            mode = 'vocab';
          }

          // ---- passage/questions/options ----
          if (mode === 'passage' || mode === 'question' || mode === 'options') {
            if (el.tagName === 'FIGURE') {
              if (currentQuestion) {
                currentQuestion.questionImage = el.querySelector('img')?.src || '';
              } else if (currentPassage) {
                currentPassage.passageImage = el.querySelector('img')?.src || '';
              }
            } else if (el.tagName === 'P') {
              const isQuestionMarker =
                text.includes('しつもん') || /「\d+」には、なにをいれますか/.test(text);
              const hasRadioButtons = !!el.querySelector('input[type="radio"]');

              // ✅ FIX: prevent appending questions into passage text
              if (isQuestionMarker && !hasRadioButtons) {
                commitQuestion();
                currentQuestion = {
                  questionNumber: globalQuestionCounter++,
                  questionText: text,
                  options: [],
                  correctOption: null,
                };
                mode = 'options';
              } else if (
                hasRadioButtons ||
                (mode === 'options' && currentQuestion)
              ) {
                if (!currentQuestion) {
                  commitQuestion();
                  currentQuestion = {
                    questionNumber: globalQuestionCounter++,
                    questionText: ' ',
                    options: [],
                    correctOption: null,
                  };
                }

                const optionsFromP = el.innerHTML
                  .split('<br>')
                  .map((part) => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = part;
                    tempDiv.querySelectorAll('input').forEach((i) => i.remove());
                    return tempDiv.textContent.trim();
                  })
                  .filter(Boolean);

                if (
                  optionsFromP.length > 0 &&
                  optionsFromP[0].includes('しつもん')
                ) {
                  currentQuestion.questionText = optionsFromP[0];
                  currentQuestion.options.push(...optionsFromP.slice(1));
                } else {
                  if (currentQuestion.questionText.trim() === '') {
                    let previousNode = el.previousElementSibling;
                    while (
                      previousNode &&
                      (previousNode.tagName !== 'P' ||
                        !previousNode.innerText.includes('しつもん'))
                    ) {
                      previousNode = previousNode.previousElementSibling;
                    }
                    if (previousNode) {
                      currentQuestion.questionText = previousNode.innerText.trim();
                    }
                  }
                  currentQuestion.options.push(...optionsFromP);
                }
                mode = 'options';
              } else if (mode === 'passage' && currentPassage) {
                if (!/^「\d+」には/.test(text) && !text.includes('しつもん')) {
                  currentPassage.passageText += text + '\n';
                }
              }
            }
          }
          // ---- answers ----
          else if (mode === 'answers' && el.tagName === 'P') {
            const answerHtml = el.innerHTML;
            const lines = answerHtml
              .split('<br>')
              .map((line) => {
                const temp = document.createElement('div');
                temp.innerHTML = line;
                return temp.textContent.trim();
              });

            lines.forEach((line) => {
              const match = line.match(/Question\s*(\d+):\s*(.*)/);
              if (match) {
                const qNum = parseInt(match[1], 10);
                let rawAnswer = match[2].trim();

                // ✅ FIX: support numeric only or => text
                let correctIndex = null;
                let correctText = null;

                if (rawAnswer.includes('=>')) {
                  const parts = rawAnswer.split('=>');
                  const numPart = parts[0].trim();
                  correctIndex = parseInt(numPart, 10) - 1;
                  correctText = parts[1].replace(/<[^>]*>/g, '').trim();
                } else if (/^\d+$/.test(rawAnswer)) {
                  correctIndex = parseInt(rawAnswer, 10) - 1;
                }

                answers[qNum] = {
                  index: correctIndex,
                  text: correctText,
                };
              }
            });
          }
          // ---- vocab ----
          else if (mode === 'vocab' && el.tagName === 'P') {
            const lines = el.innerHTML
              .split('<br>')
              .map((line) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = line;
                return tempDiv.textContent.trim();
              })
              .filter(Boolean);

            for (const line of lines) {
              const vocabItem = parseVocabLine(line);
              if (vocabItem) vocab.push(vocabItem);
            }
          }
        }
        commitPassage();

        // attach answers
        passages.forEach((passage) => {
          passage.passageText = passage.passageText.trim();
          passage.questions.forEach((q) => {
            const ans = answers[q.questionNumber];
            if (ans && ans.index !== null) {
              if (ans.index >= 0 && ans.index < q.options.length) {
                q.correctOption = {
                  index: ans.index,
                  text: ans.text || q.options[ans.index],
                };
              }
            }
          });
        });

        if (
          passages.every(
            (p) => !p.passageText.trim() && p.questions.length === 0
          ) &&
          vocab.length === 0
        )
          return null;

        const result = {
          title,
          sourceUrl: window.location.href,
          passages,
        };
        if (vocab.length > 0) result.vocab = vocab;
        return result;
      }

      // ------------------ NON-READING CATEGORIES ------------------
      let currentQuestion = null;
      let globalQuestionCounter = 1;
      const allNodes = Array.from(content.childNodes);
      for (let i = 0; i < allNodes.length; i++) {
        const node = allNodes[i];
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        const el = node;
        const text = el.innerText?.trim();

        if (el.tagName === 'P' && text) {
          if (
            text.includes('Question') ||
            text.includes('もんだい') ||
            text.includes('問題')
          ) {
            if (currentQuestion) {
              questions.push(currentQuestion);
              currentQuestion = null;
            }
            currentQuestion = {
              questionNumber: globalQuestionCounter++,
              questionText: text,
              options: [],
              correctOption: null,
            };
          } else if (text.match(/^\d+\.\s+/)) {
            if (!currentQuestion) {
              currentQuestion = {
                questionNumber: globalQuestionCounter++,
                questionText: '',
                options: [],
                correctOption: null,
              };
            }
            currentQuestion.options.push(text);
          } else if (text.startsWith('Answer Key')) {
            if (currentQuestion) {
              questions.push(currentQuestion);
              currentQuestion = null;
            }
            const answerLines = el.innerHTML
              .split('<br>')
              .map((line) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = line;
                return tempDiv.textContent.trim();
              });
            answerLines.forEach((line) => {
              const match = line.match(/Question\s*(\d+):\s*(\d+)/);
              if (match) {
                const qNum = parseInt(match[1], 10);
                const ansIndex = parseInt(match[2], 10) - 1;
                answers[qNum] = { index: ansIndex };
              }
            });
          }
        }
      }
      if (currentQuestion) {
        questions.push(currentQuestion);
      }

      questions.forEach((q) => {
        const ans = answers[q.questionNumber];
        if (ans && ans.index !== null && ans.index < q.options.length) {
          q.correctOption = {
            index: ans.index,
            text: q.options[ans.index],
          };
        }
      });

      if (questions.length === 0) return null;
      return {
        title,
        sourceUrl: window.location.href,
        questions,
      };
    }, category);
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    return null;
  }
}

// ---------------- scrape orchestrators ----------------
async function scrapeAllTests() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const level of LEVELS) {
    for (const category of TEST_CATEGORIES) {
      const listUrl = `${BASE_URL}jlpt-${level}-${category}-practice-test/`;
      console.log(`Scraping list page: ${listUrl}`);

      try {
        await page.goto(listUrl, { waitUntil: 'networkidle0', timeout: 60000 });
        const links = await page.$$eval('a', (as) =>
          as.map((a) => a.href).filter((href) => href.includes('/jlpt-'))
        );

        console.log(`Found ${links.length} test links for ${level} ${category}`);

        for (const link of links) {
          console.log(`Scraping test page: ${link}`);
          const result = await scrapeTestPage(page, link, category);
          if (result) {
            const docRef = db
              .collection('jlpt_tests')
              .doc(`${level}_${category}_${Date.now()}`);
            await docRef.set({
              level,
              category,
              ...result,
              createdAt: new Date(),
            });
            console.log(`Saved: ${result.title}`);
          }
        }
      } catch (err) {
        console.error(`Failed to scrape ${listUrl}: ${err.message}`);
      }
    }
  }

  await browser.close();
}

async function scrapeVocabularyLists() {
  // implement if needed
}

async function scrapeGrammarLists() {
  // implement if needed
}

async function main() {
  console.log('Starting full scrape...');
  await scrapeAllTests();
  console.log('Scrape finished.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
});
