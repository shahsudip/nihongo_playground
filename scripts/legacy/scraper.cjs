const fs = require('fs');
const cheerio = require('cheerio');

async function scrape() {
  console.log("Fetching index...");
  const indexRes = await fetch("https://english.learn-japanese-online.com/daily-conversation-0-english/");
  const indexHtml = await indexRes.text();
  const $ = cheerio.load(indexHtml);

  const links = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('daily-conversation-') && href.match(/daily-conversation-\d+/)) {
      if (!href.endsWith('0-english/')) {
        links.push(href);
      }
    }
  });

  const uniqueLinks = [...new Set(links)];
  console.log(`Found ${uniqueLinks.length} conversation links.`);

  const conversations = [];

  for (let i = 0; i < uniqueLinks.length; i++) {
    const link = uniqueLinks[i];
    console.log(`Scraping ${i+1}/${uniqueLinks.length}: ${link}`);
    
    try {
      const res = await fetch(link);
      const html = await res.text();
      const $page = cheerio.load(html);
      
      let title = $page('title').text();
      title = title.split('|')[1]?.trim() || title; 
      // Remove prefixes like "Japanese Daily Conversation: " or "Japanese Chat Conversation: "
      title = title.replace(/Japanese.*?Conversation:\s*/i, '').trim();
      
      const messages = [];
      const pTexts = [];
      $page('p').each((idx, el) => {
         const text = $page(el).text().trim();
         if (text) pTexts.push(text);
      });
      
      for (let j = 0; j < pTexts.length; j++) {
        const text = pTexts[j];
        if (text.includes(':')) {
           const match = text.match(/^([a-zA-Z\s\(\)]+):\s*(.*)/);
           if (match && j > 0) {
             const jpLine = pTexts[j-1]; // The previous text element is the Japanese text
             
             // Ensure the previous line contains Japanese characters (Hiragana, Katakana, Kanji)
             if (jpLine.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/)) {
               let sender = match[1].trim();
               if (sender.includes('Ken')) sender = 'ケン';
               else if (sender.includes('Ai')) sender = 'アイ';
               else if (sender.includes('Yume')) sender = 'ユメ';
               else if (sender.includes('Satoshi')) sender = 'サトシ';
               else if (sender.includes('Mom')) sender = 'ママ';
               else if (sender.includes('Dad')) sender = 'パパ';
               else if (sender.includes('Teacher')) sender = '先生';
               else if (sender.includes('Friend')) sender = '友達';
               else {
                 sender = sender.split(' ')[0]; // Fallback
               }
               messages.push({ sender, text: jpLine });
             }
           }
        }
      }
      
      if (messages.length > 0) {
        conversations.push({
          id: `daily_${i+1}`,
          title,
          icon: '🗣️',
          messages
        });
      }
    } catch (e) {
      console.log(`Error scraping ${link}:`, e.message);
    }
  }
  
  const deduplicated = [];
  const seenTitles = new Set();
  for (const conv of conversations) {
     if (!seenTitles.has(conv.title)) {
       seenTitles.add(conv.title);
       deduplicated.push(conv);
     }
  }

  const fileContent = `export const dailyConversations = ${JSON.stringify(deduplicated, null, 2)};\n`;
  fs.writeFileSync('src/data/daily_conversations.js', fileContent);
  console.log(`Successfully wrote ${deduplicated.length} conversations to src/data/daily_conversations.js`);
}

scrape();
