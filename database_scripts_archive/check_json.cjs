const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./merged_shinmon_n4_n5.json', 'utf8'));
let issues = [];

data.forEach(chap => {
  chap.passages.forEach(p => {
    p.questions.forEach(q => {
      // Check if options are just "1", "2", "3", "4"
      const isBadOptions = JSON.stringify(q.options) === '["1","2","3","4"]';
      if (isBadOptions || !q.options || q.options.length < 4) {
        issues.push(`${chap.id} -> ${q.id}: ${q.questionText}`);
      }
    });
  });
});

console.log('Found ' + issues.length + ' issues:\n' + issues.join('\n'));
