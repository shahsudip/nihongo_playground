const cheerio = require('cheerio');

async function check() {
  const res = await fetch('https://growwithkitty.com/jlpt/n3/grammar/lesson-2');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const headers = [];
  $('h1, h2, h3, h4').each((i, el) => {
    headers.push($(el).prop('tagName') + ': ' + $(el).text().trim().substring(0, 50));
  });
  console.log(headers);
}
check();
