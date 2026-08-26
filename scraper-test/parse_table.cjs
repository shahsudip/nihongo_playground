const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('n5_vocab_list.html', 'utf8');
const $ = cheerio.load(html);

const rows = [];
$('table tbody tr').each((i, el) => {
  const tds = $(el).find('td');
  if(tds.length >= 4) {
    rows.push({
      kanji: $(tds[0]).text().trim(),
      hiragana: $(tds[1]).text().trim(),
      romaji: $(tds[2]).text().trim(),
      meaning: $(tds[3]).text().trim()
    });
  }
});

console.log('Rows found:', rows.length);
if(rows.length > 0) {
    console.log("First row:", rows[0]);
    console.log("Last row:", rows[rows.length - 1]);
}
