const fs = require('fs');
const shin500 = JSON.parse(fs.readFileSync('scraper-test/shin500.json', 'utf8'));
const answers = JSON.parse(fs.readFileSync('shin_mon_answers.json', 'utf8'));

let globalId = 1;
for (const chapter of shin500.chapters) {
  for (const passage of chapter.passages) {
    for (const q of passage.questions) {
      if (answers[globalId] !== undefined) {
        q.correctOption = {
          index: answers[globalId],
          text: q.options[answers[globalId]]
        };
      }
      globalId++;
    }
  }
}

fs.writeFileSync('scraper-test/shin500.json', JSON.stringify(shin500, null, 2));
console.log('Updated shin500.json with correct answers!');
