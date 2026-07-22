const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./merged_shinmon_n4_n5.json', 'utf8'));
let count = 0;

data.forEach(chap => {
  chap.passages.forEach(p => {
    p.questions.forEach(q => {
      if (JSON.stringify(q.options) === '["1","2","3","4"]') {
        count++;
        console.log(`${chap.id} -> ${q.id}: ${q.questionText}`);
      }
    });
  });
});

console.log('Bad options count (exactly 1,2,3,4):', count);
