const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeQuiz() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Navigating to URL...");
  await page.goto('https://www.jlptpracticetest.com/n3/201007/vocabulary', { waitUntil: 'networkidle0' });
  
  // Wait for the first question to render
  await page.waitForSelector('button[data-testid^="question-option-"]', { timeout: 15000 });
  
  console.log("Page loaded. Starting extraction...");
  
  const questions = [];
  let hasNext = true;
  let qIndex = 1;

  while (hasNext) {
    console.log(`Extracting question ${qIndex}...`);
    
    // Get question text
    const questionText = await page.evaluate(() => {
      const qTitle = document.querySelector('h2.text-xl');
      return qTitle ? qTitle.innerText.trim() : '';
    });
    
    // Click option 1 to reveal the answers
    await page.click('button[data-testid="question-option-1"]');
    await new Promise(r => setTimeout(r, 500)); // wait for animation
    
    const optionsData = [];
    for (let i = 1; i <= 4; i++) {
      const optionSelector = `button[data-testid="question-option-${i}"]`;
      const optionExists = await page.$(optionSelector);
      if (!optionExists) continue;
      
      const optionText = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return '';
        const span = el.querySelector('span.flex-1');
        if (span) {
           const clone = span.cloneNode(true);
           const prefix = clone.querySelector('span');
           if (prefix) clone.removeChild(prefix);
           return clone.innerText.trim();
        }
        return el.innerText.trim();
      }, optionSelector);
      
      const btnHTML = await page.evaluate((sel) => document.querySelector(sel).outerHTML, optionSelector);
      // emerald-500 is typically used for correct answers in their tailwind config
      const isCorrect = btnHTML.includes('emerald') || btnHTML.includes('success');
      
      optionsData.push({ text: optionText, isCorrect });
    }
    
    questions.push({
      question: questionText,
      options: optionsData
    });
    
    // Go to next question
    const nextBtn = await page.$('button[data-testid="question-next"]');
    if (nextBtn) {
      const isDisabled = await page.evaluate(el => el.disabled, nextBtn);
      if (!isDisabled) {
        await nextBtn.click();
        await new Promise(r => setTimeout(r, 500));
        qIndex++;
      } else {
        hasNext = false;
      }
    } else {
      hasNext = false;
    }
  }
  
  fs.writeFileSync('jlpt_n3_201007_vocab.json', JSON.stringify(questions, null, 2));
  console.log("Saved extracted questions to jlpt_n3_201007_vocab.json!");
  
  await browser.close();
}

scrapeQuiz().catch(console.error);
