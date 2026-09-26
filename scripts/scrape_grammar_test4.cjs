const cheerio = require('cheerio');

async function check() {
  const res = await fetch('https://growwithkitty.com/jlpt/n3/grammar/lesson-2');
  const html = await res.text();
  console.log(html.substring(0, 1000));
  
  const $ = cheerio.load(html);
  console.log('--- main text ---');
  console.log($('main').text().replace(/\s+/g, ' ').substring(0, 1000));
}
check();
