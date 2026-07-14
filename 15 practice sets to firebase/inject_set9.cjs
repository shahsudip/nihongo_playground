const fs = require('fs');

const data = JSON.parse(fs.readFileSync('set9_debug.json', 'utf8'));

let template = fs.readFileSync('15_sets_practice_question.js', 'utf8');

const jsonVocab = JSON.stringify(data.vocab, null, 2);
// The template has: questions: [] // Paste your 35 vocabulary/kanji questions here
template = template.replace(
  /questions: \[\] \/\/ Paste your 35 vocabulary\/kanji questions here/,
  `questions: ${jsonVocab.split('\n').join('\n        ')}`
);

// We need to only replace the FIRST occurrence (for Set 9)
// Wait, the regex above replaces the first occurrence by default if we don't use /g!

const jsonGrammar = JSON.stringify(data.grammar, null, 2);
template = template.replace(
  /questions: \[\] \/\/ Paste your 23 grammar\/reading questions here/,
  `questions: ${jsonGrammar.split('\n').join('\n        ')}`
);

fs.writeFileSync('15_sets_practice_question.js', template);
console.log("Successfully pushed Set 9 to 15_sets_practice_question.js!");
