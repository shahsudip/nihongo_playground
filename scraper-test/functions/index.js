// functions/index.js
const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");

// We use a different region to potentially be closer to target servers
const region = "us-central1"; 
const runtimeOptions = {
  timeoutSeconds: 60, // Set timeout to 60 seconds
  memory: "256MB",    // Allocate 256MB of memory
};

exports.simpleScraper = functions
  .region(region)
  .runWith(runtimeOptions)
  .https.onRequest(async (req, res) => {
    const url = 'https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB';

    try {
      const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }); // Add User-Agent
      const $ = cheerio.load(data);
      const articles = [];
      $('a.gPFEn').each((index, element) => {
        if (articles.length < 5) {
          const title = $(element).text();
          articles.push({ title });
        }
      });

      console.log(`Successfully scraped ${articles.length} articles.`);
      res.status(200).send({ status: "success", articles: articles });
    } catch (error) {
      console.error("Error in simpleScraper function:", error.message);
      res.status(500).send({ status: "error", message: "Failed to scrape data." });
    }
  });