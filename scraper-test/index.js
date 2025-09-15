// index.js
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB'; // Example: Google News Tech section

async function scrapeData() {
  try {
    // Fetch HTML of the page
    const { data } = await axios.get(url);
    // Load HTML into cheerio
    const $ = cheerio.load(data);

    // Select the elements you want to scrape
    const articles = [];
    $('a.gPFEn').each((index, element) => {
      if (articles.length < 5) { // Limit to 5 for the test
        const title = $(element).text();
        articles.push({ title });
      }
    });

    console.log('Scraped Articles:', articles);
    return articles;
  } catch (error) {
    console.error('Error scraping data:', error);
  }
}

scrapeData();