const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE_URL = "https://growwithkitty.com";
const START_URL = "https://growwithkitty.com/jlpt/n3/vocabulary";

async function scrapeVocab() {
  console.log('Starting Deep Scraper...');
  let allVocab = [];
  let visited = new Set();
  let queue = [];

  // 1. Fetch main index to get all theme pages
  console.log('Fetching main index...');
  const indexRes = await fetch(START_URL);
  const indexHtml = await indexRes.text();
  let $ = cheerio.load(indexHtml);
  
  // Find all theme links (Days 1-10, Days 11-20, etc.)
  // On the overview page, they are in the search results or we can just seed them manually
  const themes = [
    "/jlpt/n3/days-1-10",
    "/jlpt/n3/days-11-20",
    "/jlpt/n3/days-21-30",
    "/jlpt/n3/days-31-40",
    "/jlpt/n3/days-41-50",
    "/jlpt/n3/days-51-60",
    "/jlpt/n3/days-61-70",
    "/jlpt/n3/days-71-80",
    "/jlpt/n3/days-81-90",
    "/jlpt/n3/days-91-100",
    "/jlpt/n3/days-101-108"
  ];
  
  // 2. Fetch each theme page and find its subpages (Days 1, 2, 3...)
  for (const theme of themes) {
    queue.push(BASE_URL + theme);
  }

  // 3. Process queue
  while (queue.length > 0) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    
    console.log(`Scraping: ${url}`);
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $page = cheerio.load(html);
      
      // Enqueue all day subpages from this theme
      $page('.vparts-row a.vpart').each((_, el) => {
        const href = $page(el).attr('href');
        if (href) {
          const fullUrl = BASE_URL + href;
          if (!visited.has(fullUrl) && !queue.includes(fullUrl)) {
            queue.push(fullUrl);
          }
        }
      });
      
      // Parse list items
      $page('li.row').each((_, el) => {
        const row = $page(el);
        const id = row.attr('data-id');
        
        // Extract Kanji, Kana, Romaji
        const kana = row.find('.col-ja span.block').text().trim();
        const kanji = row.find('.col-ja span.text-lang-ja').text().trim();
        const romaji = row.find('.col-ja span.ml-2').text().trim();
        
        // Extract English and Nepali
        const english = row.find('.col-en').text().trim();
        const nepali = row.find('.col-ne').text().trim();
        
        // Audio link
        const audioPath = row.find('button.audio').attr('data-audio');
        const audioUrl = audioPath ? `https://growwithkitty.com${audioPath}` : null;
        
        // Detail page link
        const detailHref = row.find('a').attr('href');
        const detailUrl = detailHref ? `https://growwithkitty.com${detailHref}` : null;
        
        // Ensure no duplicates
        if (!allVocab.find(v => v.id === id)) {
          allVocab.push({
            id,
            page_url: url,
            kanji: kanji || kana,
            kana,
            romaji,
            english,
            nepali,
            audioUrl,
            detailUrl
          });
        }
      });
      
    } catch (e) {
      console.error('Error fetching', url, e);
    }
    
    // Add small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 100));
  }
  
  const outputPath = path.join(__dirname, '../scratch/n3_kitty_vocab.json');
  fs.writeFileSync(outputPath, JSON.stringify(allVocab, null, 2));
  console.log(`Successfully scraped ${allVocab.length} words! Saved to scratch/n3_kitty_vocab.json`);
}

scrapeVocab();
