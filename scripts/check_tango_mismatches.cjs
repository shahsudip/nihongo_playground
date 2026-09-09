const fs = require('fs');
const path = require('path');

const dirs = [
  'src/data/tango_n3_raw',
  'src/data/tango_n2_raw',
  'src/data/tango_n1_raw'
];

let totalIssues = 0;

for (const dir of dirs) {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) continue;
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.json'));
  for (const f of files) {
    const filePath = path.join(fullDir, f);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.japanese_text || !data.annotated_words) continue;

    const uMatches = [];
    const regex = /<u>(.*?)<\/u>/g;
    let m;
    while ((m = regex.exec(data.japanese_text)) !== null) {
      const cleanU = m[1].replace(/<[^>]+>/g, '').trim();
      uMatches.push(cleanU);
    }

    const words = data.annotated_words;
    
    if (uMatches.length !== words.length) {
      console.log(`[${dir}/${f}] Count mismatch: ${uMatches.length} <u> tags vs ${words.length} annotated words`);
      console.log('   U tags:', uMatches);
      console.log('   Words:', words.map(w => w.kanji));
      totalIssues++;
      continue;
    }

    for (let i = 0; i < uMatches.length; i++) {
      const uWord = uMatches[i];
      const aWord = words[i].kanji ? words[i].kanji.replace(/［する］|\[する\]|（.*?）|\(.*?\)|↔|=/g, '').trim() : '';
      if (!uWord.includes(aWord) && !aWord.includes(uWord)) {
        console.log(`[${dir}/${f}] Item ${i} mismatch: <u> was '${uWord}', annotated_words[${i}] was '${words[i].kanji}' (en: ${words[i].meaning_en})`);
        totalIssues++;
      }
    }
  }
}

console.log(`Total issues found: ${totalIssues}`);
