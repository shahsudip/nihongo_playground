const https = require('https');
const fs = require('fs');

const url = 'https://www.jlptpracticetest.com/_next/static/chunks/244bdb8874a94bc8.css?dpl=dpl_GGypzCADbfWwU8NJs7gfCXf5kQn4';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('jlpt_page.css', data);
    console.log('Saved jlpt_page.css');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
