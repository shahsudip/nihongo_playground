const fetch = require('node-fetch');

async function run() {
  const r = await fetch('https://www.jlptmatome.com/japanese-kanji/%E6%97%A5-nichi-meaning');
  const text = await r.text();
  const start = text.indexOf('<div class="space-y-4">');
  const snippet = text.substring(start, start + 8000);
  console.log(snippet);
}
run();
