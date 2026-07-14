const fs = require('fs');
const path = require('path');

const inputPath = 'D:\\sudip_software\\nihongo_playground\\extracted_text.txt';
const outputPath = 'D:\\sudip_software\\nihongo_playground\\src\\data\\practice_sets_data.js';

const lines = fs.readFileSync(inputPath, 'utf-8').split(/\r?\n/);

let questions = [];
let currentQuestion = null;
let currentType = 'moji'; // default
let currentId = null;
let currentQuestionText = '';
let currentOptions = [];

// Track seen IDs to skip duplicates
let seenIds = new Set();

const typeRegex = /\[(Moji|Goi|Bunpou)\]/i;
const questionStartRegex1 = /^(\d+)\s+(.+)$/; // e.g. "1 郵便局の近くに..."
const questionStartRegex2 = /^(\d+)\s*$/; // Just the number on a line

let i = 0;
while (i < lines.length) {
    let line = lines[i].trim();
    if (!line) {
        i++;
        continue;
    }

    let typeMatch = line.match(typeRegex);
    if (typeMatch) {
        currentType = typeMatch[1].toLowerCase();
        // remove the tag from line if it's there
        line = line.replace(typeRegex, '').trim();
        if (!line) {
            i++;
            continue;
        }
    }

    // Try to parse question start
    let match1 = line.match(questionStartRegex1);
    let isQStart = false;
    let qId = null;
    let qText = '';

    if (match1) {
        // e.g. "1 option1" vs "1 Question text"
        // Need to be careful. Let's see if the number matches the next expected question roughly, or just assume it's a question if options haven't been filled yet? No, some options start with "1 ".
        // But usually options are "1 option 2 option" or on new lines.
        // If we're looking for the next question, and the number is not an option number.
        let num = parseInt(match1[1], 10);
        // It's a question start if it's a reasonably large number or we have 4 options or no current question.
        if (currentQuestion == null || currentOptions.length >= 2) {
             isQStart = true;
             qId = num;
             qText = match1[2];
        } else if (num === 1 || num === 2 || num === 3 || num === 4) {
             // likely an option
        } else {
             isQStart = true;
             qId = num;
             qText = match1[2];
        }
    }

    if (!isQStart) {
        let match2 = line.match(questionStartRegex2);
        if (match2) {
            let num = parseInt(match2[1], 10);
            if (currentQuestion == null || currentOptions.length >= 2) {
                 isQStart = true;
                 qId = num;
                 i++;
                 while(i < lines.length && !lines[i].trim()) i++;
                 if (i < lines.length) qText = lines[i].trim();
            }
        }
    }

    if (isQStart) {
        if (currentQuestion && !seenIds.has(currentQuestion.id)) {
            questions.push(currentQuestion);
            seenIds.add(currentQuestion.id);
        }
        currentQuestion = {
            id: qId,
            questionText: qText,
            options: [],
            correctIndex: -1,
            type: currentType
        };
        currentOptions = [];
    } else {
        if (currentQuestion) {
            // parse options
            // options might be like "1 option1  2 option2  3 option3  4 option4"
            // or one per line
            // or "1 option1"
            let optMatch = line.match(/^([1-4])\s+(.+)$/);
            if (optMatch) {
                currentOptions.push(optMatch[2]);
            } else if (/^[1-4]\s*$/.test(line)) {
                // just number
                i++;
                while(i < lines.length && !lines[i].trim()) i++;
                if (i < lines.length) currentOptions.push(lines[i].trim());
            } else {
                // If the line contains multiple options "1 ... 2 ... 3 ... 4 ..."
                let multiOptRegex = /1\s+(.+?)\s+2\s+(.+?)\s+3\s+(.+?)\s+4\s+(.+)/;
                let multiMatch = line.match(multiOptRegex);
                if (multiMatch) {
                    currentOptions.push(multiMatch[1]);
                    currentOptions.push(multiMatch[2]);
                    currentOptions.push(multiMatch[3]);
                    currentOptions.push(multiMatch[4]);
                } else {
                    // Try parsing "1... 2..." or "3... 4..."
                    let twoOptRegex1 = /1\s+(.+?)\s+2\s+(.+)/;
                    let twoOptRegex2 = /3\s+(.+?)\s+4\s+(.+)/;
                    if (twoOptRegex1.test(line)) {
                        let m = line.match(twoOptRegex1);
                        currentOptions.push(m[1]);
                        currentOptions.push(m[2]);
                    } else if (twoOptRegex2.test(line)) {
                        let m = line.match(twoOptRegex2);
                        currentOptions.push(m[1]);
                        currentOptions.push(m[2]);
                    } else {
                         // Maybe append to question text if options are empty
                         if (currentOptions.length === 0) {
                             currentQuestion.questionText += '\n' + line;
                         } else {
                             // append to last option
                             if (currentOptions.length > 0) {
                                 currentOptions[currentOptions.length - 1] += ' ' + line;
                             }
                         }
                    }
                }
            }
            currentQuestion.options = currentOptions;
        }
    }
    i++;
}
if (currentQuestion && !seenIds.has(currentQuestion.id)) {
    questions.push(currentQuestion);
}

// Clean options
questions.forEach(q => {
    q.options = q.options.map(o => o.trim());
});

// Infer missing types (heuristics)
questions.forEach(q => {
    if (!q.type) {
        if (q.questionText.includes('意味') || q.questionText.includes('使い方')) {
            q.type = 'goi';
        } else if (q.questionText.includes('読み方') || q.questionText.includes('漢字')) {
            q.type = 'moji';
        } else if (q.questionText.includes('____') || q.questionText.includes('……')) {
            q.type = 'bunpou';
        } else {
            q.type = 'bunpou'; // default fallback
        }
    }
});

// Sort questions by ID to help grouping
questions.sort((a, b) => a.id - b.id);

// Remove duplicates by ID (if any remain due to sorting/parsing glitches)
let uniqueQuestions = [];
let lastId = -1;
questions.forEach(q => {
    if (q.id !== lastId) {
        uniqueQuestions.push(q);
        lastId = q.id;
    }
});
questions = uniqueQuestions;

// Grouping
const setRanges = [
    { id: 'set-1', title: 'Set 1', desc: 'Questions 1-30', end: 30 },
    { id: 'set-2', title: 'Set 2', desc: 'Questions 31-60', end: 60 },
    { id: 'set-3', title: 'Set 3', desc: 'Questions 61-90', end: 90 },
    { id: 'set-4', title: 'Set 4', desc: 'Questions 91-125', end: 125 },
    { id: 'set-5', title: 'Set 5', desc: 'Questions 126-165', end: 165 },
    { id: 'set-6', title: 'Set 6', desc: 'Questions 166-200', end: 200 },
    { id: 'set-7', title: 'Set 7', desc: 'Questions 201-240', end: 240 },
    { id: 'set-8', title: 'Set 8', desc: 'Questions 241-280', end: 280 },
    { id: 'set-9', title: 'Set 9', desc: 'Questions 281-310', end: 310 },
    { id: 'set-10', title: 'Set 10', desc: 'Questions 311-340', end: 340 },
    { id: 'set-11', title: 'Set 11', desc: 'Questions 341-375', end: 375 },
    { id: 'set-12', title: 'Set 12', desc: 'Questions 376-420', end: 420 },
    { id: 'set-13', title: 'Set 13', desc: 'Questions 421-450', end: 450 },
    { id: 'set-14', title: 'Set 14', desc: 'Questions 451-480', end: 480 },
    { id: 'set-15', title: 'Set 15', desc: 'Questions 481-500', end: 500 }
];

let sets = [];
let qIndex = 0;

for (let r of setRanges) {
    let currentSet = {
        id: r.id,
        title: r.title,
        description: r.desc,
        sections: {
            kanji: { title: '文字 · Kanji', titleJa: '漢字の読み・書き', questions: [] },
            vocabulary: { title: '語彙 · Vocabulary', titleJa: '語彙', questions: [] },
            grammar: { title: '文法 · Grammar', titleJa: '文法', questions: [] }
        }
    };

    while (qIndex < questions.length && questions[qIndex].id <= r.end) {
        let q = questions[qIndex];
        if (q.type === 'moji') {
            currentSet.sections.kanji.questions.push(q);
        } else if (q.type === 'goi') {
            currentSet.sections.vocabulary.questions.push(q);
        } else {
            currentSet.sections.grammar.questions.push(q);
        }
        qIndex++;
    }
    sets.push(currentSet);
}

const finalData = `// src/data/practice_sets_data.js

export const practiceSetsBook = {
  id: 'jlpt-n3-practice-sets',
  title: 'JLPT N3 Practice Sets',
  description: '15 sets of JLPT N3 practice questions covering Kanji, Vocabulary, and Grammar.',
  level: 'N3',
  category: 'Mixed Practice',
  totalQuestions: 500,
  sets: ${JSON.stringify(sets, null, 2)}
};
`;

fs.writeFileSync(outputPath, finalData);
console.log('Successfully generated practice_sets_data.js with ' + questions.length + ' unique questions.');
