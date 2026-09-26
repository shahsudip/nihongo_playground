const cheerio = require('cheerio');
async function check() {
  const res = await fetch('https://growwithkitty.com/jlpt/n3/grammar/lesson-2');
  const html = await res.text();
  const $ = cheerio.load(html);
  $('main a').each((i, el) => {
    console.log($(el).attr('href'));
  });
}
check();
