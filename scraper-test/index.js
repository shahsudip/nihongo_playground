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
console.log('Firestore initialized successfully. RUNNING IN LOG-ONLY MODE.');

/**
 * Scrapes all test links for a specific JLPT level and maps them to
 * our database collection names.
 */
async function scrapeLevelIndexPage(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });

    return await page.evaluate(() => {
      const results = {
        'vocabulary-test': [],
        'grammar-test': [],
        'reading-test': [],
        'kanji-test': [],
        'listening-test': []
      };

      const mapCategoryToCollectionName = (categoryName) => {
        const normalizedCategory = categoryName.toLowerCase();
        if (normalizedCategory.includes('vocabulary') || normalizedCategory.includes('文字語彙')) {
          return 'vocabulary-test';
        }
        if (normalizedCategory.includes('grammar') || normalizedCategory.includes('文法')) {
          return 'grammar-test';
        }
        if (normalizedCategory.includes('listen') || normalizedCategory.includes('聴解')) {
          return 'listening-test';
        }
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
            const title = Array.from(link.querySelectorAll('font'))
                               .map(f => f.innerText.trim())
                               .join(' ')
                               .replace(/\s+/g, ' ')
                               .trim();

            const urlParts = link.href.split('/').filter(Boolean);
            const slug = urlParts.slice(-3).join('-'); // e.g., N3-202412-1
            
            results[collectionName].push({
              title: title || link.innerText.trim(),
              url: link.href,
              slug: slug // Use this clean slug as the doc ID
            });
          });
        }
      });

      return results;
    });
  } catch (error) {
    console.error(`Error processing URL ${url}:`, error.message);
    return null;
  }
}

/**
 * Scrapes the actual content (questions, options, answers) of a single test page.
 */
async function scrapeTestContentPage(page, url, testTitle) {
  try {
    console.log(`      L Scraping content from: ${url}`); // This log shows the URL being visited
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    const quizData = await page.evaluate(() => {
      const form = document.querySelector('form[name="dttn"]');
      if (!form) return null;

      const sections = [];
      let currentQuestions = [];
      let currentSectionHeader = "General Questions"; // Default

      // Helper to get clean inner text
      const cleanText = (el) => {
        if (!el) return "";
        // Get text, preferring the last <font> tag if it exists, otherwise innerText
        const fonts = el.querySelectorAll('font');
        let text;
        if (fonts.length > 0) {
            text = fonts[fonts.length - 1].innerText.trim();
        } else {
            text = el.innerText.trim();
        }
        return text.replace(/\s+/g, ' '); // Consolidate whitespace
      };

      form.childNodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) return; // Skip text nodes, comments

        // Check for new section header
        if (node.classList.contains('big_item')) {
          if (currentQuestions.length > 0) {
            sections.push({ sectionTitle: currentSectionHeader, questions: currentQuestions });
          }
          currentSectionHeader = cleanText(node);
          currentQuestions = [];
        } 
        // Check for a question
        else if (node.classList.contains('question_list')) {
          try {
            // 1. Get Question Number
            let qNumNode = node.nextElementSibling;
            while(qNumNode && qNumNode.nodeType !== Node.ELEMENT_NODE) {
                qNumNode = qNumNode.nextElementSibling;
            }
            if (!qNumNode || !qNumNode.id.startsWith('diemso')) return;
            const questionNumber = parseInt(qNumNode.id.replace('diemso', ''), 10);
            
            // 2. Get Question Text
            const questionText = cleanText(node);
            
            // 3. Find Options Container
            let optionsEl = qNumNode.nextElementSibling;
            while (optionsEl && !optionsEl.classList.contains('answer_2row') && !optionsEl.classList.contains('answer_1row')) {
              optionsEl = optionsEl.nextElementSibling;
            }
            if (!optionsEl) return;

            // 4. Get Options
            const options = Array.from(optionsEl.querySelectorAll('div.answers')).map(opt => cleanText(opt));

            // 5. Find Answer
            let answerEl = optionsEl.nextElementSibling;
            while (answerEl && !answerEl.id.startsWith('AS')) {
              answerEl = answerEl.nextElementSibling;
            }
            if (!answerEl || answerEl.id !== `AS${questionNumber}`) return; 
            
            const correctOptionIndex = parseInt(cleanText(answerEl), 10) - 1;
            
            if (correctOptionIndex < 0 || correctOptionIndex >= options.length) return;
            
            const correctOptionText = options[correctOptionIndex];
            
            currentQuestions.push({
              questionNumber,
              questionText,
              options,
              correctOption: {
                index: correctOptionIndex,
                text: correctOptionText
              }
            });
          } catch (e) {
            console.log('Error parsing a question node: ' + e.message);
          }
        }
      });
      
      if (currentQuestions.length > 0) {
        sections.push({ sectionTitle: currentSectionHeader, questions: currentQuestions });
      }
      
      const flatQuestions = sections.flatMap(s => s.questions);

      return {
        sourceUrl: window.location.href,
        sections: sections,
        questions: flatQuestions 
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
      // 1. Scrape the list of test links for this level
      const levelCategoryMap = await scrapeLevelIndexPage(page, levelUrl);

      if (!levelCategoryMap) {
        console.log(`- No data found for ${level}.`);
        await page.close();
        continue;
      }

      // 2. Loop through each category we found
      for (const [collectionName, tests] of Object.entries(levelCategoryMap)) {
        if (tests.length === 0) continue; 
        
        console.log(`  [+] Found ${tests.length} tests for category: ${collectionName}`);
        
        // 3. Loop through each test in that category
        for (const testLink of tests) {
          
          const docId = testLink.slug;
          if (!docId) {
             console.log(`    - (SKIPPED) Invalid slug for test: ${testLink.title}`);
             continue;
          }
          
          const docRef = db.collection('jlpt').doc(level.toLowerCase()).collection(collectionName).doc(docId);
          
          console.log(`    - Test: ${testLink.title} (Saving to ID: ${docId})`);
          // *** NEW LOG LINE ADDED HERE ***
          console.log(`      L URL: ${testLink.url}`); // This explicitly logs the URL
          
          // 4. Scrape the actual content of the test page
          const testData = await scrapeTestContentPage(page, testLink.url, testLink.title);
          
          if (testData && testData.questions.length > 0) {
            console.log(`      L (LOG-ONLY) Would save content to: ${docRef.path}`);
            console.log(JSON.stringify(testData, null, 2));
          } else {
            console.log(`      L (SKIPPED) No questions found at: ${testLink.url}`);
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