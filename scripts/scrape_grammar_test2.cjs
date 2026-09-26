const cheerio = require('cheerio');

async function check() {
  const res = await fetch('https://growwithkitty.com/jlpt/n3/grammar/lesson-2');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  let points = [];
  $('.point').each((i, el) => {
    points.push({
      title: $(el).find('h2, h3').text().trim(),
      meaning: $(el).find('.meaning, .en, [lang="en"]').text().trim().substring(0, 50)
    });
  });
  
  if (points.length === 0) {
    // try different selector
    $('section[id]').each((i, el) => {
      points.push({
        id: $(el).attr('id'),
        title: $(el).find('h2, h3').text().trim().replace(/\n/g, ''),
      });
    });
  }
  console.log(points);
}
check();
