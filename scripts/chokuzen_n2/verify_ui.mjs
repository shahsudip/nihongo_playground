import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const baseUrl = 'http://127.0.0.1:5174/nihongo_playground/';
const output = path.resolve('tmp_inspect/chokuzen_n2');
fs.mkdirSync(output, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
  userDataDir: path.join(output, 'browser-profile'),
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('dialog', dialog => dialog.accept());
const book = JSON.parse(fs.readFileSync('src/data/chokuzen_n2/book.json', 'utf8'));

async function navigate(route) {
  console.log(`Checking ${route}`);
  await page.goto(`${baseUrl}#${route}`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('.cn2-book', { timeout: 30000 });
}

try {
  await page.setViewport({ width: 1440, height: 1000 });
  await navigate('/n2-practice-sets');
  await page.waitForSelector('.cn2-set-card');
  await page.evaluate(() => {
    Object.keys(localStorage).filter(key => key.startsWith('chokuzen-n2:')).forEach(key => localStorage.removeItem(key));
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await page.waitForSelector('.cn2-set-card');
  assert.equal(await page.$$eval('.cn2-set-card', cards => cards.length), 15);
  await page.screenshot({ path: path.join(output, 'ui-overview.png'), fullPage: true });

  for (const set of book.sets) {
    for (const route of ['vocabulary-kanji', 'grammar']) {
      await navigate(`/n2-practice-sets/${set.id}/${route}`);
      await page.waitForSelector('.cn2-choice');
      assert.equal(await page.$$eval('.cn2-choice', choices => choices.length), 4);
      const expected = route === 'grammar' ? 33 : 1;
      assert.match(await page.$eval('#cn2-question-heading', heading => heading.textContent), new RegExp(`Question ${expected} of`));
      assert.equal(await page.$('.cn2-feedback'), null);
      assert.equal(await page.$$eval('.cn2-book img', images => images.length), 0);
      const firstQuestion = set.sections[route === 'grammar' ? 'grammar-reading' : 'vocabulary-kanji'].questions[0];
      const ready = firstQuestion.verification.ocrTextVerified === true && (firstQuestion.mondai !== 9 || firstQuestion.verification.passageTextVerified === true);
      assert.equal(await page.$eval('.cn2-choice', choice => choice.matches(':disabled')), !ready);
    }
  }

  await navigate('/n2-practice-sets/set-1/vocabulary-kanji');
  const firstQuestion = book.sets[0].sections['vocabulary-kanji'].questions[0];
  await page.click(`[aria-label="Choose printed option ${firstQuestion.correctIndex + 1}"]`);
  await page.waitForSelector('.cn2-feedback');
  assert.equal(await page.$$eval('.cn2-choice--correct', choices => choices.length), 1);
  assert.match(await page.$eval('.cn2-study-explanation', explanation => explanation.innerText), /manners and etiquette at home/);
  assert.equal(await page.$$eval('.cn2-study-explanation li', choices => choices.length), 4);
  const optionColors = await page.$$eval('.cn2-study-explanation li strong', choices => choices.map(choice => getComputedStyle(choice).color));
  assert.notEqual(optionColors[0], optionColors[firstQuestion.correctIndex]);
  assert.equal(await page.$('.cn2-feedback img'), null);
  await page.reload({ waitUntil: 'networkidle2' });
  await page.waitForSelector('.cn2-feedback');
  assert.equal(await page.$eval('.cn2-choice--correct', choice => choice.getAttribute('aria-pressed')), 'true');
  await page.screenshot({ path: path.join(output, 'ui-answered-desktop.png'), fullPage: true });
  await page.click('[aria-label^="Question 13,"]');
  await page.waitForFunction(() => document.querySelector('#cn2-question-heading')?.textContent.includes('Question 13'));
  assert.equal(await page.$$eval('.cn2-stem ruby', ruby => ruby.length), 1);
  await page.click('[aria-label^="Question 16,"]');
  await page.waitForFunction(() => document.querySelector('#cn2-question-heading')?.textContent.includes('Question 16'));
  assert.equal(await page.$$eval('.cn2-choices ruby', ruby => ruby.length), 2);

  await navigate('/n2-practice-sets/set-1/grammar');
  await page.click('[aria-label^="Question 45,"]');
  assert.match(await page.$eval('#cn2-question-heading', heading => heading.textContent), /Question 45/);
  const starQuestion = book.sets[0].sections['grammar-reading'].questions.find(question => question.number === 45);
  await page.click(`[aria-label="Choose printed option ${starQuestion.correctIndex + 1}"]`);
  await page.waitForSelector('.cn2-feedback');
  assert.doesNotMatch(await page.$eval('.cn2-feedback', feedback => feedback.innerText), /<br\s*\/?>|<b>|<u\s/);
  await page.click('[aria-label^="Question 50,"]');
  assert.equal(await page.$$eval('.cn2-question-card img', images => images.length), 0);
  assert.equal(await page.$$eval('.cn2-passage', passages => passages.length), 1);
  await page.screenshot({ path: path.join(output, 'ui-passage-desktop.png'), fullPage: true });

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await navigate('/n2-practice-sets/set-1/vocabulary-kanji');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
  await page.screenshot({ path: path.join(output, 'ui-native-text-mobile.png'), fullPage: true });
  await navigate('/n2-practice-sets/set-15/vocabulary-kanji');
  assert.equal(await page.$$eval('.cn2-book img', images => images.length), 0);
  const lastSetReady = book.sets[14].sections['vocabulary-kanji'].questions[0].verification.ocrTextVerified === true;
  if (lastSetReady) {
    assert.equal(await page.$('.cn2-notice'), null);
    assert.equal(await page.$eval('.cn2-choice', choice => choice.matches(':disabled')), false);
  } else {
    assert.match(await page.$eval('.cn2-notice', notice => notice.innerText), /being proofread/);
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
  await page.screenshot({ path: path.join(output, 'ui-quiz-mobile.png'), fullPage: true });
  await navigate('/n2-practice-sets');
  await page.waitForSelector('.cn2-set-card');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
  await page.screenshot({ path: path.join(output, 'ui-overview-mobile.png'), fullPage: true });

  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await navigate('/n2-practice-sets/set-1/grammar');
  await page.screenshot({ path: path.join(output, 'ui-quiz-dark-mobile.png'), fullPage: true });

  await navigate('/n2-practice-sets');
  assert.equal(await page.$$eval('.cn2-book img', images => images.length), 0);

  await page.evaluateOnNewDocument(() => { window.__MOCK_USER__ = { uid: 'n2-local-preview', displayName: 'Local Preview' }; });
  await navigate('/n2-practice-sets');
  await page.reload({ waitUntil: 'networkidle2' });
  await page.waitForSelector('.cn2-set-card');
  await page.evaluate(attempt => {
    localStorage.setItem('chokuzen-n2:dev:v1:n2-local-preview', JSON.stringify({ [attempt.quizId]: attempt }));
  }, {
    quizId: 'jlpt-n2-practice-sets-set-1-vocabulary-kanji',
    answers: Object.fromEntries(book.sets[0].sections['vocabulary-kanji'].questions.map(question => [question.id, question.correctIndex])),
    total: 32,
    answered: 32,
    score: 32,
    timestamp: new Date().toISOString(),
  });
  await page.goto(`${baseUrl}#/books`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('a.group\\/btn[href="#/n2-practice-sets"]');
  const coverText = await page.$eval('a.group\\/btn[href="#/n2-practice-sets"]', link => link.parentElement.parentElement.innerText);
  assert.match(coverText, /4%/);
  assert.deepEqual(errors, []);
  console.log('PASS: 15 tests, 30 section routes, text-only questions, four choices, saved answers, sentence ordering, shared passage, desktop and mobile layout.');
} catch (error) {
  console.error(JSON.stringify({ browserErrors: errors, url: page.url(), body: await page.$eval('body', body => body.innerText).catch(() => '') }));
  await page.screenshot({ path: path.join(output, 'ui-failure.png'), fullPage: true }).catch(() => {});
  throw error;
} finally {
  await browser.close();
}
