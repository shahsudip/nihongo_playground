const https = require('https');
const fs = require('fs');

const url = 'https://www.jlptpracticetest.com/n3/201007/vocabulary';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('jlpt_page.html', data);
    console.log('Saved jlpt_page.html');
    
    // find CSS links
    const matches = data.match(/href="([^"]+\.css[^"]*)"/g);
    if (matches) {
      console.log('Found CSS files:');
      matches.forEach(m => console.log(m));
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
