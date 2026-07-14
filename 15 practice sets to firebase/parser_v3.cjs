const fs = require('fs');

const raw = fs.readFileSync('sets_extracted.txt', 'utf-8');

// Hardcode the parsing because the file structure is very specific and short.
// We will manually extract the text for Set 1 (vocab/kanji 1-35, grammar 1-23)
// and Set 2 (vocab/kanji 1-35) based on the exact known text.

const extractQuestions = (text) => {
  const questions = [];
  const lines = text.split('\n').map(l => l.trim());
  let currentQ = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Match [1] or [14] etc
    const qMatch = line.match(/^\[(\d+(?:-[ab])?)\]\s+(.*)/);
    if (qMatch) {
      if (currentQ) questions.push(currentQ);
      currentQ = {
        id: qMatch[1],
        questionText: qMatch[2],
        options: []
      };
      continue;
    }

    if (currentQ) {
      // Match options: "1 つんで"
      const optMatch = line.match(/^([1-4])\s+(.*)/);
      if (optMatch) {
        currentQ.options.push(optMatch[2]);
      } else {
        // Append to question text if it's not an option
        if (line !== '問題1' && line !== '問題2' && !line.startsWith('問題') && !line.startsWith('文法') && !line.startsWith('紙の手帳')) {
             if(currentQ.options.length === 0) {
                 currentQ.questionText += '\n' + line;
             }
        }
      }
    }
  }
  if (currentQ) questions.push(currentQ);
  return questions;
};

// Set 1 Vocab Kanji Text:
const set1VocabText = raw.substring(raw.indexOf('TEST 1'), raw.indexOf('文法\n\n問題1 次の文の'));
const set1VocabQs = extractQuestions(set1VocabText);

// Set 1 Grammar Text:
const set1GrammarText = raw.substring(raw.indexOf('文法\n\n問題1 次の文の'), raw.indexOf('Here is the complete, consolidated answer key'));
const set1GrammarQs = extractQuestions(set1GrammarText);

// Set 2 Vocab Kanji Text:
const set2VocabText = raw.substring(raw.indexOf('第2回 模擬テスト\n\n目標時間 50分'), raw.indexOf('Answer List'));
const set2VocabQs = extractQuestions(set2VocabText);

// Now map the answers!
// Set 1 Answers:
const set1VocabAnswers = [
  2,4,2,1,3,3,2,2, 3,4,3,2,4,1, 3,4,2,3,4,1,4,3,4,2,3, 4,2,3,1,4, 4,1,3,2,2
];
const set1GrammarAnswers = [
  3,2,2,4,3,1,2,3,2,4,1,3,4, // 1-13
  1,3,1,2,4, // 14-18
  4,2,2,3,3,3 // 19-23. Note: 22a and 22b both use 3 according to answer key
];

const set2VocabAnswers = [
  4,1,3,4,2,3,3,2,1,2, 4,2,3,3,2,3,1,2,3,4, 3,4,1,4,3,4,2,1,1,3, 3,4,2,4,1
];

// Combine into final object
const finalObj = {
  id: 'jlpt-n3-practice-sets',
  title: 'JLPT N3 Practice Sets',
  description: 'Practice questions covering Kanji, Vocabulary, and Grammar.',
  level: 'N3',
  category: 'Mixed Practice',
  sets: [
    {
      id: 'set-1',
      title: 'Set 1',
      sections: {
        'vocabulary-kanji': {
          title: 'Vocabulary & Kanji',
          questions: set1VocabQs.slice(0, 35).map((q, i) => ({
            id: parseInt(q.id) || (i+1),
            questionText: q.questionText,
            options: q.options,
            correctIndex: set1VocabAnswers[i] - 1
          }))
        },
        'grammar-reading': {
          title: 'Grammar & Reading',
          questions: set1GrammarQs.slice(0, 24).map((q, i) => ({
             // 22-a and 22-b are collapsed or handled. We have 24 items in grammarQs if we count 22a and 22b.
            id: q.id,
            questionText: q.questionText,
            options: q.options,
            correctIndex: set1GrammarAnswers[i] - 1
          }))
        }
      }
    },
    {
      id: 'set-2',
      title: 'Set 2',
      sections: {
        'vocabulary-kanji': {
          title: 'Vocabulary & Kanji',
          questions: set2VocabQs.slice(0, 35).map((q, i) => ({
            id: parseInt(q.id) || (i+1),
            questionText: q.questionText,
            options: q.options,
            correctIndex: set2VocabAnswers[i] - 1
          }))
        }
      }
    }
  ]
};

// Fix the 22-a / 22-b issue by just ensuring lengths match and indexes are safe:
finalObj.sets[0].sections['grammar-reading'].questions.forEach((q, i) => {
   if(q.id === '22-a') q.correctIndex = 2; // option 3 (index 2)
   if(q.id === '22-b') q.correctIndex = 2;
});

const fileContent = `export const practiceSetsBook = ${JSON.stringify(finalObj, null, 2)};`;
fs.writeFileSync('src/data/practice_sets_data.js', fileContent);
console.log('Successfully generated practice_sets_data.js with exact 2 sets and answers!');
