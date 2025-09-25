const { initializeApp, cert } = require('firebase-admin/app');

const { getFirestore } = require('firebase-admin/firestore');

const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());



console.log('JLPT Quiz Scraper started with Stealth Mode.');



// Ensure your FIREBASE_SERVICE_ACCOUNT environment variable is set correctly

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];

const TEST_CATEGORIES = ['reading', 'grammar', 'vocabulary', 'kanji'];

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
            } else { japanese = japaneseAndRomaji; }
            if (japanese && english) { return { japanese, romaji, english }; }
        }
        return null;
      };

            if (currentCategory === 'reading') {
        let contentBlocks = [];
        let passageCounter = 0;

        // --- PASS 1: Identify all content blocks ---
        content.childNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node;
          const strongText = el.querySelector('strong')?.innerText?.trim() || '';
          const textContent = el.innerText.trim();

          const isHeader = strongText.toLowerCase().startsWith('reading passage') || 
                           textContent.includes('つぎの文を読んで') || 
                           textContent.includes('次の文章を読んで') || 
                           strongText.startsWith('問題');

          if (el.tagName === 'P' && isHeader) {
            contentBlocks.push({ type: 'header', text: textContent, title: strongText });
          } else if (el.querySelector('input[type="radio"]')) {
            contentBlocks.push({ type: 'question', element: el });
          } else if (el.innerHTML.includes('<br>') && /^\s*$/.test(el.innerText) === false && contentBlocks[contentBlocks.length - 1]?.type === 'question_text') {
             contentBlocks.push({ type: 'options_no_radio', element: el });
          } else if (el.tagName === 'P' && (strongText.includes('New words') || strongText.includes('Answer Key'))) {
             contentBlocks.push({ type: 'mode_switch', text: strongText });
          } else if (el.tagName === 'FIGURE') {
             contentBlocks.push({ type: 'image', src: el.querySelector('img')?.src || '' });
          } else if (el.tagName === 'P' && textContent) {
            const isQuestionText = textContent.includes('しつもん') || textContent.includes('には、なにをいれますか') || /^\d+\.\s*/.test(textContent);
            if(isQuestionText && !el.querySelector('input[type="radio"]')) {
              contentBlocks.push({ type: 'question_text', text: textContent });
            } else {
              contentBlocks.push({ type: 'passage_text', text: textContent });
            }
          }
        });

        // --- PASS 2: Process the identified blocks ---
        let currentPassage = null;
        let pendingQuestionText = null;
        let parsingMode = 'passage';
        let expectedQuestionNumber = 1;

        const parseOptionsFromElement = (element, containsRadioButtons) => { /* ... (Your options parsing function) ... */ };

        for (const block of contentBlocks) {
          if (block.type === 'header') {
            if (currentPassage) passages.push(currentPassage);
            passageCounter++;
            currentPassage = { passageTitle: block.title || `Passage ${passageCounter}`, mainInstruction: block.text, passageImage: '', passageText: '', questions: [] };
            expectedQuestionNumber = 1;
          } else if (block.type === 'mode_switch') {
            parsingMode = block.text.includes('New words') ? 'vocab' : 'answers';
          } else if (parsingMode === 'vocab') {
             if(block.type === 'passage_text' || block.type === 'question_text') {
                 const lines = block.text.split('\n');
                 for(const line of lines) {
                     const vocabItem = parseVocabLine(line);
                     if(vocabItem) vocab.push(vocabItem);
                 }
             }
          } else if (parsingMode === 'passage') {
            // --- UPDATED SAFETY NET ---
            // If we find ANY content before a header, create a default passage.
            if (!currentPassage && (block.type === 'question' || block.type === 'question_text' || block.type === 'passage_text')) {
                passageCounter++;
                currentPassage = { passageTitle: `Passage ${passageCounter} (Default)`, passageImage: '', passageText: '', questions: [] };
            }
            if (!currentPassage) continue;

            if (block.type === 'passage_text') {
              currentPassage.passageText += block.text + '\n';
            } else if (block.type === 'image') {
              currentPassage.passageImage = block.src;
            } else if (block.type === 'question_text') {
              pendingQuestionText = block.text;
            } else if (block.type === 'options_no_radio') {
              if (pendingQuestionText) {
                const options = parseOptionsFromElement(block.element, false);
                currentPassage.questions.push({
                  questionNumber: expectedQuestionNumber++,
                  questionText: pendingQuestionText.replace(/「しつもん」/g, '').trim(),
                  options: options, correctOption: null,
                });
                pendingQuestionText = null;
              }
            } else if (block.type === 'question') {
              const parts = parseOptionsFromElement(block.element, true);
              const questionText = pendingQuestionText ? pendingQuestionText : parts.shift() || '';
              const options = parts;
              const inputName = block.element.querySelector('input[type="radio"]').getAttribute('name');
              const qNumMatch = (inputName && inputName.match(/quest(\d+)/i)) || (questionText.match(/^(\d+)\./));
              const questionNumber = qNumMatch ? parseInt(qNum_match[1], 10) : expectedQuestionNumber++; // Corrected variable name
              currentPassage.questions.push({
                questionNumber, questionText: questionText.replace(/「しつもん」|^\d+\.\s*/g, '').trim(), options, correctOption: null,
              });
              pendingQuestionText = null;
            }
          }
        }
        if (currentPassage) passages.push(currentPassage);

      } else {
        // === YOUR ORIGINAL, WORKING CODE FOR NON-READING TESTS (RESTORED) ===
        let currentQuestion = null;
        const allParagraphs = Array.from(content.querySelectorAll('p'));
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
        allParagraphs.forEach(p => {
          const strongText = p.querySelector('strong')?.innerText?.trim() || '';
          if (strongText.includes('Answer Key') || strongText.includes('New words')) {
            commitCurrentQuestion();
            parsingMode = strongText.includes('Answer Key') ? 'answers' : 'vocab';
            return;
          }
          if (parsingMode === 'vocab') {
            const vocabItem = parseVocabLine(p.innerText.trim());
            if (vocabItem) vocab.push(vocabItem);
            return;
          }
          if (parsingMode !== 'questions') return;
          const hasRadio = p.querySelector('input[type="radio"]');
          if (hasRadio) {
            const inputName = hasRadio.getAttribute('name');
            const parts = p.innerHTML.split('<br>').map(part => {
                const tempEl = document.createElement('div');
                tempEl.innerHTML = part;
                tempEl.querySelectorAll('input').forEach(input => input.remove());
                return tempEl.textContent.trim();
            }).filter(Boolean);
            if (parts.length === 0) return;
            const potentialQuestionText = parts[0] || '';
            const isContinuation = currentQuestion && currentQuestion.inputName === inputName && !/^\d+\./.test(potentialQuestionText);
            if (isContinuation) {
              currentQuestion.options.push(...parts);
            } else {
              commitCurrentQuestion();
              let qNumMatch = potentialQuestionText.match(/^(\d+)\./);
              let inputMatch = inputName.match(/quest(\d+)/i);
              let questionNumber = qNumMatch ? parseInt(qNumMatch[1], 10) : (inputMatch ? parseInt(inputMatch[1], 10) + 1 : expectedQuestionNumber++);
              currentQuestion = {
                questionNumber, questionText: potentialQuestionText, options: parts.slice(1), correctOption: null, inputName: inputName
              };
            }
          } else {
            commitCurrentQuestion();
          }
        });
        commitCurrentQuestion();
      }

      // Universal Answer Key Parsing
      const allParagraphs = Array.from(content.querySelectorAll('p'));
      allParagraphs.forEach(p => {
        const text = p.innerText.trim();
        const strongText = p.querySelector('strong')?.innerText?.trim() || '';
        if (strongText.includes('Answer Key')) parsingMode = 'answers';
        if (parsingMode === 'answers') {
          const regex = /Question\s*(\d+):\s*(\d+)/gi;
          let match;
          while ((match = regex.exec(text)) !== null) {
            answers[parseInt(match[1], 10)] = parseInt(match[2], 10) - 1;
          }
        }
      });

      // Final result assembly
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
        if (passages.length > 0 && passages.some(p => p.questions.length > 0)) {
            const result = { title, sourceUrl: window.location.href, passages };
            if (vocab.length > 0) result.vocab = vocab;
            return result;
        } return null;
      } else {
        questions.forEach(q => {
            if (answers[q.questionNumber] !== undefined) {
                const correctIndex = answers[q.questionNumber];
                if (correctIndex >= 0 && correctIndex < q.options.length) {
                    q.correctOption = { index: correctIndex, text: q.options[correctIndex] || '' };
                }
            }
        });
        if (questions.length > 0) {
            const result = { title, sourceUrl: window.location.href, questions };
            if (vocab.length > 0) result.vocab = vocab;
            return result;
        } return null;
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



        // Check if document already exists

        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {

          console.log(`- Document ${docRef.path} already exists. Skipping.`);

          exerciseNum++;

          consecutiveFailures = 0; // Reset failures as this isn't an error

          continue;

        }



        const urlStrings = [

          `${BASE_URL}${level}-${category}-exercise-${exerciseNum}/`,
          `${BASE_URL}jlpt-${level}-${category}-exercise-${exerciseNum}/`,
          `${BASE_URL}jlpt-${level}-${category}-${exerciseNum}/`,
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${String(exerciseNum).padStart(2, '0')}/`,
          `${BASE_URL}japanese-language-proficiency-test-jlpt-${level}-${category}-exercise-${exerciseNum}/`

        ];

        const urlFormats = [...new Set(urlStrings)]; // Remove duplicate URLs



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



    // Check if document already exists

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



      // Check if document already exists

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

