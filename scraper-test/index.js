const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

console.log('JLPT Quiz Scraper started with Stealth Mode.');

// Ensure your FIREBASE_SERVICE_ACCOUNT environment variable is set correctly
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const LEVELS = ['n5'];
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
      let expectedQuestionNumber = 1;

      const allParagraphs = Array.from(content.querySelectorAll('p'));

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

      if (currentCategory === 'reading') {
        const hasRadioButtons = !!content.querySelector('input[type="radio"]');

        if (hasRadioButtons) {
            // --- PARSING LOGIC FOR PAGES WITH RADIO BUTTONS (e.g., Exercise 12) ---
            let currentPassage = null;
            let currentQuestionInPassage = null;
            let readingContentMode = 'passage';

            const commitCurrentQuestionInPassage = () => {
              if (currentQuestionInPassage && currentPassage) {
                currentQuestionInPassage.questionText = currentQuestionInPassage.questionText
                  .replace(/^\d+\.\s*/, '').replace(/「しつもん」/g, '').trim();
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
                readingContentMode = 'passage';
                return;
              }
              if (el.tagName === 'P' && (strongText.includes('New words') || strongText.includes('Answer Key'))) {
                commitCurrentQuestionInPassage();
                readingContentMode = strongText.includes('New words') ? 'vocab' : 'answers';
                return;
              }

              if (readingContentMode === 'vocab' && el.tagName === 'P') {
                if (el.innerHTML.includes('<br>')) {
                    const lines = el.innerHTML.split('<br>').map(line => {
                        const tempEl = document.createElement('div');
                        tempEl.innerHTML = line;
                        return tempEl.textContent.trim();
                    }).filter(Boolean);
                    lines.forEach(line => {
                        const vocabItem = parseVocabLine(line);
                        if (vocabItem) vocab.push(vocabItem);
                    });
                } else {
                    const text = el.innerText.trim();
                    const vocabItem = parseVocabLine(text);
                    if (vocabItem) vocab.push(vocabItem);
                }
              } else if (readingContentMode === 'passage' && currentPassage) {
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
                  
                  let questionText = '';
                  let options = [];
                  
                  if ((parts[0] || '').includes('しつもん')) {
                      questionText = parts[0];
                      options = parts.slice(1);
                  } else {
                      let previousNode = el.previousElementSibling;
                      while (previousNode && (previousNode.tagName !== 'P' || !previousNode.innerText.includes('しつもん'))) {
                          previousNode = previousNode.previousElementSibling;
                      }
                      if (previousNode && previousNode.innerText.includes('しつもん')) {
                          questionText = previousNode.innerText.trim();
                          options = parts;
                      } else {
                          questionText = "Error: Question text not found";
                          options = parts;
                      }
                  }

                  const startsWithNumber = /^\d+\./.test(questionText);
                  const isContinuation = currentQuestionInPassage && currentQuestionInPassage.inputName === inputName && !startsWithNumber;
                  
                  if (isContinuation) {
                    currentQuestionInPassage.options.push(...options);
                  } else {
                    commitCurrentQuestionInPassage();
                    let qNumMatch = questionText.match(/^(\d+)\./);
                    let qNumFromName = inputName && inputName.match(/quest(\d+)/i);
                    let questionNumber = qNumMatch ? parseInt(qNumMatch[1],10) : (qNumFromName ? parseInt(qNumFromName[1], 10) + 1 : expectedQuestionNumber);
                    
                    currentQuestionInPassage = {
                      questionNumber,
                      questionText: questionText,
                      options: options,
                      correctOption: null,
                      inputName: inputName
                    };
                    expectedQuestionNumber = Math.max(expectedQuestionNumber, questionNumber + 1);
                  }
                } else {
                  commitCurrentQuestionInPassage();
                  if (el.tagName === 'FIGURE') {
                    currentPassage.passageImage = el.querySelector('img')?.src || '';
                  } else if (el.tagName === 'P' && !el.innerText.includes('しつもん') && el.innerText.trim()) {
                    currentPassage.passageText += el.innerText.trim() + '\n';
                  }
                }
              }
            });
            commitCurrentQuestionInPassage();
            if (currentPassage) passages.push(currentPassage);
        } else {
            // --- PARSING LOGIC FOR PAGES WITHOUT RADIO BUTTONS (e.g., Exercise 13) ---
            let currentPassage = null;
            let contentMode = 'passage';
            let questionCounter = 0;
            const childNodes = Array.from(content.childNodes);

            const answerKeyNode = childNodes.find(node => node.nodeType === Node.ELEMENT_NODE && node.textContent.includes('Answer Key:'));
            if (answerKeyNode) {
                const answerLines = answerKeyNode.innerHTML.split('<br>').map(line => {
                    const temp = document.createElement('div');
                    temp.innerHTML = line;
                    return temp.textContent.trim();
                });
                answerLines.forEach(line => {
                    const match = line.match(/Question\s*(\d+):\s*(.*)/); // Capture text answer
                    if (match) {
                        let answerText = match[2].trim();
                        if (answerText.includes('=>')) {
                           answerText = answerText.split('=>')[1].replace(/<[^>]*>/g, '').trim();
                        }
                        answers[parseInt(match[1], 10)] = answerText;
                    }
                });
            }

            for (let i = 0; i < childNodes.length; i++) {
                const node = childNodes[i];
                if (node.nodeType !== Node.ELEMENT_NODE) continue;

                const strongText = node.querySelector('strong')?.innerText?.trim() || '';

                if (strongText.startsWith('Reading Passage')) {
                    if (currentPassage) passages.push(currentPassage);
                    currentPassage = { passageTitle: strongText, passageImage: '', passageText: '', questions: [] };
                    contentMode = 'passage';
                    continue;
                }
                if (strongText.includes('New words')) {
                    contentMode = 'vocab';
                    continue;
                }
                if (strongText.includes('Answer Key')) {
                    contentMode = 'answers';
                    continue;
                }

                if (contentMode === 'passage' && currentPassage) {
                    if (node.tagName === 'FIGURE') {
                        currentPassage.passageImage = node.querySelector('img')?.src || '';
                    } else if (node.tagName === 'P') {
                        const text = node.innerText.trim();
                        const html = node.innerHTML;
                        const isQuestion = text.includes('には、なにをいれますか。') || text.includes('「しつもん」');

                        if (isQuestion) {
                            questionCounter++;
                            let questionText = '';
                            let options = [];
                            
                            const lines = html.split('<br>').map(line => {
                                const temp = document.createElement('div'); temp.innerHTML = line; return temp.textContent.trim();
                            }).filter(Boolean);

                            if (lines.length > 1) {
                                questionText = lines[0];
                                options = lines.slice(1);
                            } else {
                                questionText = text;
                                const nextNode = childNodes[i + 1];
                                if (nextNode && nextNode.nodeType === Node.ELEMENT_NODE && nextNode.tagName === 'P' && !nextNode.querySelector('strong')) {
                                    options = nextNode.innerHTML.split('<br>').map(line => {
                                        const temp = document.createElement('div'); temp.innerHTML = line; return temp.textContent.trim();
                                    }).filter(Boolean);
                                    i++;
                                }
                            }
                            
                            currentPassage.questions.push({
                                questionNumber: questionCounter,
                                questionText: questionText.replace(/「しつもん」/g, '').trim(),
                                options: options,
                                correctOption: null
                            });
                        } else {
                            currentPassage.passageText += text + '\n';
                        }
                    }
                } else if (contentMode === 'vocab' && node.tagName === 'P') {
                    if (node.innerHTML.includes('<br>')) {
                        const lines = node.innerHTML.split('<br>').map(line => {
                            const tempEl = document.createElement('div'); tempEl.innerHTML = line; return tempEl.textContent.trim();
                        }).filter(Boolean);
                        lines.forEach(line => {
                           const vocabItem = parseVocabLine(line);
                           if(vocabItem) vocab.push(vocabItem);
                        });
                    } else {
                        const text = node.innerText.trim();
                        const vocabItem = parseVocabLine(text);
                        if (vocabItem) vocab.push(vocabItem);
                    }
                }
            }
            if (currentPassage) passages.push(currentPassage);
        }
      } else {
        // --- PARSING LOGIC FOR NON-READING CATEGORIES (No Changes) ---
        let currentQuestion = null;
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
            if (p.innerHTML.includes('<br>')) {
                const lines = p.innerHTML.split('<br>').map(line => {
                    const tempEl = document.createElement('div'); tempEl.innerHTML = line; return tempEl.textContent.trim();
                }).filter(Boolean);
                lines.forEach(line => {
                    const vocabItem = parseVocabLine(line);
                    if (vocabItem) vocab.push(vocabItem);
                });
            } else {
                const text = p.innerText.trim();
                const vocabItem = parseVocabLine(text);
                if (vocabItem) vocab.push(vocabItem);
            }
            return;
          }
          if (parsingMode !== 'questions') return;
          const hasRadio = p.querySelector('input[type="radio"]');
          if(hasRadio){
             const inputName = hasRadio.getAttribute('name');
             const innerHTML = p.innerHTML;
             const parts = innerHTML.split('<br>').map(part => {
                const tempEl = document.createElement('div');
                tempEl.innerHTML = part;
                tempEl.querySelectorAll('input').forEach(input => input.remove());
                return tempEl.textContent.trim();
             }).filter(Boolean);
             if (parts.length === 0) return;
             
             let potentialQuestionText = parts[0] || '';
             const startsWithNumber = /^\d+\./.test(potentialQuestionText);

             if (!startsWithNumber && !potentialQuestionText.includes('しつもん')) {
                 let previousNode = p.previousElementSibling;
                 while (previousNode && (previousNode.tagName !== 'P' || !previousNode.innerText.includes('しつもん'))) {
                    previousNode = previousNode.previousElementSibling;
                 }
                 if(previousNode && previousNode.innerText.includes('しつもん')){
                    potentialQuestionText = previousNode.innerText.trim();
                 }
             }

             const isContinuation = currentQuestion && currentQuestion.inputName === inputName && !startsWithNumber;
             if (isContinuation) {
               currentQuestion.options.push(...parts);
             } else {
               commitCurrentQuestion();
               let questionNumber = parseInt(potentialQuestionText.match(/^(\d+)\./)?.[1], 10);
               if (!questionNumber) {
                 questionNumber = inputName && inputName.match(/quest(\d+)/i) ? parseInt(inputName.match(/quest(\d+)/i)[1], 10) + 1 : expectedQuestionNumber;
               }
               currentQuestion = {
                 questionNumber,
                 questionText: potentialQuestionText,
                 options: parts.slice(potentialQuestionText.includes('しつもん') ? 1 : 0),
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

      // --- UNIVERSAL ANSWER LINKING ---
      const answerKeyNodeFromP = allParagraphs.find(p => p.querySelector('strong')?.innerText.trim() === 'Answer Key:');
      if (answerKeyNodeFromP) {
          const answerHtml = answerKeyNodeFromP.innerHTML;
          const lines = answerHtml.split('<br>').map(line => {
              const temp = document.createElement('div');
              temp.innerHTML = line;
              return temp.textContent.trim();
          });
          lines.forEach(line => {
              const match = line.match(/Question\s*(\d+):\s*(.*)/);
              if (match) {
                  const qNum = parseInt(match[1], 10);
                  let answerText = match[2].trim();
                   if (answerText.includes('=>')) {
                       answerText = answerText.split('=>')[1].replace(/<[^>]*>/g, '').trim();
                   }
                  answers[qNum] = answerText;
              }
          });
      }
      
      if (currentCategory === 'reading') {
        passages.forEach(passage => {
          passage.passageText = passage.passageText.trim();
          passage.questions.forEach(q => {
            const correctText = answers[q.questionNumber];
            if (correctText !== undefined) {
              const correctIndex = q.options.findIndex(opt => opt === correctText);
              if (correctIndex !== -1) {
                q.correctOption = { index: correctIndex, text: correctText };
              } else {
                const potentialIndex = parseInt(correctText, 10) - 1;
                if (!isNaN(potentialIndex) && potentialIndex >= 0 && potentialIndex < q.options.length) {
                     q.correctOption = { index: potentialIndex, text: q.options[potentialIndex] };
                }
              }
            }
          });
        });
        
        if (passages.every(p => !p.passageText.trim() && p.questions.length === 0) && vocab.length === 0) return null;

        const result = { title, sourceUrl: window.location.href, passages };
        if (vocab.length > 0) result.vocab = vocab;
        return result;
      } else {
        questions = questions.filter(q => {
          if (answers[q.questionNumber] !== undefined) {
            const correctText = answers[q.questionNumber];
            if (correctText !== undefined) {
              const correctIndex = q.options.findIndex(opt => opt === correctText);
              if (correctIndex !== -1) {
                q.correctOption = { index: correctIndex, text: correctText };
              } else {
                const potentialIndex = parseInt(correctText, 10) - 1;
                if (!isNaN(potentialIndex) && potentialIndex >= 0 && potentialIndex < q.options.length) {
                     q.correctOption = { index: potentialIndex, text: q.options[potentialIndex] };
                }
              } 
            }
          }
          return q.questionText || q.options.length > 0;
        });
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
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${String(exerciseNum).padStart(2, '0')}/`
        ];
        const urlFormats = [...new Set(urlStrings)];

        let quizData = null;
        const page = await browser.newPage();
        const triedUrls = [];

        for (const url of urlFormats) {
          console.log(`Attempting to scrape: ${url}`);
          triedUrls.push(url);
          quizData = await scrapeTestPage(page, url, category);
          if (quizData) break;
        }

        if (exerciseNum === 12 || exerciseNum === 13) {
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
          try {
            await docRef.set(quizData);
            console.log(`✅ Successfully saved data to ${docRef.path}`);
          } catch (error) {
            console.error(`🔥 Failed to save data to ${docRef.path}:`, error);
          }
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

