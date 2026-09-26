const cheerio = require('cheerio');

async function check() {
  const res = await fetch('https://growwithkitty.com/jlpt/n3/grammar/lesson-2');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  $('main a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('/n3/g/')) {
      console.log(href);
      console.log($(el).text().replace(/\s+/g, ' ').trim());
    }
  });
}
check();
