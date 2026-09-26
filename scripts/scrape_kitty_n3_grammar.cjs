const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE_URL = "https://growwithkitty.com";
const GRAMMAR_INDEX_URL = "https://growwithkitty.com/jlpt/n3/grammar";

async function scrapeGrammar() {
  console.log('Starting Grammar Scraper...');
  let grammarPoints = [];
  
  const indexRes = await fetch(GRAMMAR_INDEX_URL);
  const indexHtml = await indexRes.text();
  const $index = cheerio.load(indexHtml);
  
  const lessons = [];
  $index('.gp-roadmap .stop.upcoming, .gp-roadmap .stop.current').each((i, el) => {
    const slug = $index(el).attr('data-slug');
    if (slug) lessons.push(`/jlpt/n3/grammar/${slug}`);
  });
  
  console.log(`Found ${lessons.length} lessons. Extracting points...`);
  
  for (const lessonPath of lessons) {
    const lessonUrl = BASE_URL + lessonPath;
    console.log(`Fetching ${lessonUrl}...`);
    try {
      const res = await fetch(lessonUrl);
      const html = await res.text();
      const $ = cheerio.load(html);
      
      const pointLinks = [];
      $('main a').each((i, el) => {
        const href = $(el).attr('href');
        // e.g. /jlpt/n3/grammar/lesson-2/chau
        if (href && href.startsWith(lessonPath + '/')) {
          pointLinks.push(href);
        }
      });
      
      // On the lesson page, they also have a list of grammar points right there (e.g. 1 〜ちゃう・じゃう).
      // We can extract basic info directly from the lesson page to save requests, 
      // or we can just save the list of links for a deeper scrape later.
      
      $('li, .row, a').each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href');
        if (href && href.startsWith(lessonPath + '/')) {
          // Attempt to extract title/meaning if structured
          // text usually looks like "1 〜ちゃう・じゃう ~chau / ~jau casual 〜てしまう →"
          // We just store the raw text for now, along with the link.
          grammarPoints.push({
            lesson: lessonPath.split('/').pop(),
            url: BASE_URL + href,
            title: $(el).find('h2, h3, .col-ja, strong, span.text-lg').text().trim() || text.replace(/\s+/g, ' '),
          });
        }
      });
      
      // Remove duplicates by url
      grammarPoints = grammarPoints.filter((v, i, a) => a.findIndex(t => (t.url === v.url)) === i);
      
    } catch (e) {
      console.error(e);
    }
    
    await new Promise(r => setTimeout(r, 100)); // polite delay
  }
  
  const outputPath = path.join(__dirname, '../scratch/n3_kitty_grammar.json');
  fs.writeFileSync(outputPath, JSON.stringify(grammarPoints, null, 2));
  console.log(`Successfully scraped ${grammarPoints.length} grammar points! Saved to scratch/n3_kitty_grammar.json`);
}

scrapeGrammar();
