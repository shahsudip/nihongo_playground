const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('C:/Users/sah_sudip_kumar/.gemini/antigravity-cli/brain/bee179f3-e058-48f8-9992-e1675846dd6f/.system_generated/steps/230/content.md', 'utf8');
const $ = cheerio.load(html);

// We need to see the structure of a grammar point.
// Let's just output the HTML of the first article or section.
let blocks = [];
$('article, section, .point, .grammar-point, [id^="n3-"]').each((i, el) => {
  if (i < 3) blocks.push($(el).html().substring(0, 500));
});
console.log(blocks);
