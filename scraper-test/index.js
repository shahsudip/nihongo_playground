// scraper/index.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const axios = require('axios');
const cheerio = require('cheerio');

console.log('Script started.');

try {
  // Initialize Firebase using the secret from GitHub Actions
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  initializeApp({
    credential: cert(serviceAccount)
  });
  const db = getFirestore();
  console.log('Firestore initialized successfully.'); // <-- ADDED LOG

  async function scrapeAndSave() {
    const url = 'https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB';
    console.log(`Fetching data from: ${url}`); // <-- ADDED LOG
    
    // Fetch HTML of the page
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      }
    });
    console.log('Successfully fetched HTML data.'); // <-- ADDED LOG
    
    // Load HTML into cheerio
    const $ = cheerio.load(data);

    const articles = [];
    // The selector for Google News articles often changes. We are checking for a common, more modern one.
    $('a[href*="./articles/"]').each((index, element) => {
      const title = $(element).text();
      // Make sure the title is not empty
      if (title) {
        articles.push({ title, scrapedAt: new Date() });
      }
    });

    console.log(`Number of articles found: ${articles.length}`); // <-- CRITICAL LOG

    if (articles.length === 0) {
      console.log('No articles found. The website structure may have changed. Exiting.');
      return; // Exit if no articles are found
    }

    // Save to Firestore
    const collectionRef = db.collection('scrapedArticles');
    console.log('Preparing to write articles to Firestore...'); // <-- ADDED LOG
    for (const article of articles) {
      await collectionRef.add(article);
      console.log(`- Wrote: ${article.title}`); // <-- ADDED LOG
    }
    console.log(`Successfully saved ${articles.length} articles to Firestore.`);
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