// scraper/index.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const puppeteer = require('puppeteer'); // Use Puppeteer instead of axios/cheerio

console.log('Script started with Puppeteer.');

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();
  console.log('Firestore initialized successfully.');

  async function scrapeAndSave() {
    const url = 'https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB';
    console.log(`Launching browser and navigating to: ${url}`);

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully.');

    // Wait for the article links to be visible on the page
    await page.waitForSelector('article a');

    const articles = await page.evaluate(() => {
      const articlesArray = [];
      // This code runs inside the browser
      document.querySelectorAll('article a').forEach(element => {
        const title = element.innerText;
        if (title) { // Make sure the title is not empty
          articlesArray.push({ title, scrapedAt: new Date().toISOString() });
        }
      });
      return articlesArray;
    });

    await browser.close();
    console.log(`Number of articles found: ${articles.length}`);

    if (articles.length === 0) {
      console.log('No articles found even with Puppeteer. Exiting.');
      return;
    }

    const collectionRef = db.collection('scrapedArticles');
    for (const article of articles.slice(0, 10)) { // Limit to 10 to be safe
      await collectionRef.add(article);
    }
    console.log(`Successfully saved ${Math.min(10, articles.length)} articles to Firestore.`);
  }

  scrapeAndSave()
    .then(() => {
      console.log('Scrape and save process finished.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Unhandled error in scrapeAndSave:', error);
      process.exit(1);
    });

} catch (error) {
  console.error('Critical error during script initialization:', error);
  process.exit(1);
}