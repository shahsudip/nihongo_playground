const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

console.log('dethitiengnhat.com Scraper started with Stealth Mode.');

// --- CONFIGURATION ---
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const LEVELS = ['N1', 'N2', 'N3', 'N4', 'N5'];
const BASE_URL = 'https://dethitiengnhat.com';
// --- END CONFIGURATION ---

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();
console.log('Firestore initialized successfully. SAVING TO FIRESTORE (LIVE MODE).');

/**
 * Generates a clean, English title from the collection and slug.
 */
function generateEnglishTitle(collectionName, slug) {
  const parts = slug.split('-');
  const level = parts[0] || 'Unknown';
  const date = parts.slice(1).join('-');
  
  let category = "Test";
  if (collectionName.includes('vocabulary')) category = 'Vocabulary Test';
  if (collectionName.includes('grammar')) category = 'Grammar/Reading Test';
  if (collectionName.includes('listening')) category = 'Listening Test';
  
  return `${level.toUpperCase()} ${category} (${date})`;
}


/**
 * Scrapes all test links for a specific JLPT level.
 */
async function scrapeLevelIndexPage(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });

    return await page.evaluate((generateTitleFuncStr) => {
      const generateEnglishTitle = new Function('return ' + generateTitleFuncStr)();
      const results = {
        'vocabulary-test': [], 'grammar-test': [], 'reading-test': [],
        'kanji-test': [], 'listening-test': []
      };

      const mapCategoryToCollectionName = (categoryName) => {
        const normalizedCategory = categoryName.toLowerCase();
        if (normalizedCategory.includes('vocabulary') || normalizedCategory.includes('文字語彙')) return 'vocabulary-test';
        if (normalizedCategory.includes('grammar') || normalizedCategory.includes('文法')) return 'grammar-test';
        if (normalizedCategory.includes('listen') || normalizedCategory.includes('聴解')) return 'listening-test';
        return null;
      };

      const categoryTitles = document.querySelectorAll('.middle_content .title-item-home h3');
      categoryTitles.forEach(titleElement => {
        const categoryName = titleElement.innerText.trim();
        const collectionName = mapCategoryToCollectionName(categoryName);
        if (!collectionName) return;

        let listContainer = titleElement.closest('.title-item-home').nextElementSibling;
        while (listContainer && listContainer.nodeType !== Node.ELEMENT_NODE) {
          listContainer = listContainer.nextElementSibling;
        }

        if (listContainer && listContainer.classList.contains('list_dethi')) {
          const links = listContainer.querySelectorAll('.cell a.card-body');
          links.forEach(link => {
            const urlParts = link.href.split('/').filter(Boolean);
            const slug = urlParts.slice(-3).join('-');
            const englishTitle = generateEnglishTitle(collectionName, slug);
            results[collectionName].push({ title: englishTitle, url: link.href, slug: slug });
          });
        }
      });
      return results;
    }, generateEnglishTitle.toString());
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    return null;
  }
}

/**
 * Scrapes the actual content (headers, passages, audio, questions) of a single test page.
 */
async function scrapeTestContentPage(page, url, testTitle) {
  try {
    console.log(`      L Scraping content from: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    const quizData = await page.evaluate(() => {
      const form = document.querySelector('form[name="dttn"]');
      if (!form) return null;

      const contentBlocks = [];

      const cleanText = (el) => {
        if (!el) return "";
        return el.innerText.trim().replace(/\s+/g, ' ');
      };
      
      const getFullSrc = (el) => {
          if (!el) return "";
          return new URL(el.src, window.location.href).href;
      };

      // Loop through all child nodes of the form to preserve order
      form.childNodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        // --- 1. Find Section Headers & Audio ---
        if (node.classList.contains('big_item')) {
          const headerNodeClone = node.cloneNode(true);
          const iframeInHeader = headerNodeClone.querySelector('iframe');
          if (iframeInHeader) iframeInHeader.remove();
          
          contentBlocks.push({
            type: 'section-header',
            text: cleanText(headerNodeClone)
          });
          
          const audioIframe = node.querySelector('iframe');
          if (audioIframe) {
            contentBlocks.push({
              type: 'audio',
              src: audioIframe.src
            });
          }
        }
        
        // *** NEW: Added logic for Reading Passages ***
        else if (node.classList.contains('question_content')) {
          contentBlocks.push({
            type: 'passage',
            // We save the innerHTML to preserve formatting (<b>, <br>, etc.)
            htmlContent: node.innerHTML
          });
        }
        
        // --- 3. Find Questions & Images ---
        else if (node.classList.contains('question_list')) {
          try {
            // Check for an image *inside* the question block
            const imgEl = node.querySelector('img');
            if (imgEl) {
              contentBlocks.push({
                type: 'image',
                src: getFullSrc(imgEl)
              });
            }

            let qNumNode = node.nextElementSibling;
            while(qNumNode && (qNumNode.nodeType !== Node.ELEMENT_NODE || !qNumNode.id.startsWith('diemso'))) {
                qNumNode = qNumNode.nextElementSibling;
            }
            if (!qNumNode) return;
            const questionNumber = parseInt(qNumNode.id.replace('diemso', ''), 10);
            
            const questionText = cleanText(node);
            
            let optionsEl = qNumNode.nextElementSibling;
            while (optionsEl && !optionsEl.classList.contains('answer_2row') && !optionsEl.classList.contains('answer_1row')) {
              optionsEl = optionsEl.nextElementSibling;
            }
            if (!optionsEl) return;

            let options = Array.from(optionsEl.querySelectorAll('div.answers')).map(opt => cleanText(opt));

            let answerEl = optionsEl.nextElementSibling;
            while (answerEl && !answerEl.id.startsWith('AS')) {
              answerEl = answerEl.nextElementSibling;
            }
            if (!answerEl || answerEl.id !== `AS${questionNumber}`) return; 
            
            const correctOptionIndex = parseInt(cleanText(answerEl), 10) - 1;
            
            let transcript = null;
            
            const isEmptyOptions = options.length > 0 && options.every(opt => /^\d+\)\s*$/.test(opt.trim()));
            
            if (isEmptyOptions) {
              let gtEl = answerEl.nextElementSibling;
              while(gtEl && (gtEl.nodeType !== Node.ELEMENT_NODE || !gtEl.id.startsWith('GT'))) {
                gtEl = gtEl.nextElementSibling;
              }
              
              if (gtEl) {
                const gtText = gtEl.innerText;
                transcript = gtText;
                
                const newOptions = (gtText.match(/\d+[．.]\s.*(?=\n|$)/g) || []).map(opt => opt.trim());
                if (newOptions.length > 0) {
                  options = newOptions;
                }
              }
            }

            if (correctOptionIndex < 0 || correctOptionIndex >= options.length) return;
            
            const correctOptionText = options[correctOptionIndex] || "";
            
            const questionData = {
              type: 'question',
              questionNumber,
              questionText,
              options,
              correctOption: {
                index: correctOptionIndex,
                text: correctOptionText
              }
            };
            
            if (transcript) {
              questionData.transcript = transcript;
            }
            
            contentBlocks.push(questionData);

          } catch (e) {
            console.log(`Error parsing a question node (Number ${questionNumber || 'unknown'}): ${e.message}`);
          }
        }
      });
      
      return {
        sourceUrl: window.location.href,
        contentBlocks: contentBlocks
      };
    });
    
    if (quizData) {
      quizData.title = testTitle;
    }
    return quizData;
    
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    return null;
  }
}


// =================================================================
// SECTION 2: MAIN EXECUTION
// =================================================================

async function main() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  console.log('🚀 Starting scrape of dethitiengnhat.com...');

  for (const level of LEVELS) {
    console.log(`\n--- Scraping Level: ${level.toUpperCase()} ---`);
    const levelUrl = `${BASE_URL}/jlpt/${level}`;
    const page = await browser.newPage();
    
    try {
      const levelCategoryMap = await scrapeLevelIndexPage(page, levelUrl);

      if (!levelCategoryMap) {
        console.log(`- No data found for ${level}.`);
        await page.close();
        continue;
      }

      for (const [collectionName, tests] of Object.entries(levelCategoryMap)) {
        if (tests.length === 0) continue; 
        
        console.log(`  [+] Found ${tests.length} tests for category: ${collectionName}`);
        
        for (const testLink of tests) {
          const docId = testLink.slug;
          if (!docId) {
             console.log(`    - (SKIPPED) Invalid slug for test: ${testLink.title}`);
             continue;
          }
          
          const docRef = db.collection('practice-test').doc(level.toLowerCase()).collection(collectionName).doc(docId);
          
          console.log(`    - Test: ${testLink.title} (Saving to ID: ${docId})`);
          console.log(`      L URL: ${testLink.url}`);
          
          const testData = await scrapeTestContentPage(page, testLink.url, testLink.title);
          
          if (testData && testData.contentBlocks.length > 0) {
            try {
              await docRef.set(testData);
              console.log(`      L SUCCESS: Saved to ${docRef.path}`);
            } catch (saveError) {
              console.error(`      L FAILED to save to ${docRef.path}:`, saveError.message);
            }
          } else {
            console.log(`      L (SKIPPED) No content blocks found at: ${testLink.url}`);
          }
        }
      }

    } catch (error) {
      console.error(`Failed to scrape ${levelUrl}: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n🎉 Full scrape process completed!');
}

main().catch(console.error);