const fs = require('fs');
const path = require('path');

['zenkamoku_n3', 'zenkamoku_n2', 'zenkamoku_n1'].forEach(book => {
  for (let d = 1; d <= 5; d++) {
    const file = path.join(__dirname, '..', 'src', 'data', book, `w04-d0${d}.json`);
    if (!fs.existsSync(file)) continue;
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    (json.subSections || json.sections || []).forEach(sec => {
      if (sec.type === 'text_grammar' || (sec.title && sec.title.includes('文章の文法'))) {
        (sec.questions || []).forEach(q => {
          q.stem = '';
        });
      }
    });
    fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
    console.log('Cleaned text_grammar stems in', file);
  }
});
