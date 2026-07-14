const fs = require('fs');

const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');
const lines = text.split('\n');

const idxStart = lines.findIndex(l => l.includes('TEST 10 Starts  here'));
const idxEnd = lines.findIndex(l => l.includes('TEST 10 ENDS HERE'));

const set10Lines = lines.slice(idxStart, idxEnd);
const set10Text = set10Lines.join('\n');

function parseQuestions(sectionText) {
    const questions = [];
    const qMatches = Array.from(sectionText.matchAll(/(?:^|\n)(\d+)\.\s+([\s\S]*?)(?=(?:\n\d+\.\s+)|\n\*\*✅ Correct Answer List|\n\*\*第10回 文法 Answer List|\n### \*\*文法\*\*|$)/g));
    
    for (let m of qMatches) {
        let qNum = parseInt(m[1]);
        let block = m[2].trim();
        
        let optionsMatch = block.match(/(?:^|\n)\s*1\.\s+([\s\S]*)/);
        let qText = block;
        let optionsStr = "";
        if (optionsMatch) {
            qText = block.substring(0, optionsMatch.index).trim();
            optionsStr = optionsMatch[1].trim();
        }
        
        let options = [];
        if (optionsStr) {
            let optParts = optionsStr.split(/(?:\s+|　+)[234]\.\s+/);
            if (optParts.length === 4) {
                options = optParts.map(o => o.trim());
            } else {
                options = optionsStr.split(/\s+/).map(o => o.trim()).filter(o => o);
            }
        }
        
        questions.push({
            id: qNum,
            questionText: qText,
            options: options,
            correctIndex: 0
        });
    }
    return questions;
}

const grammarStartIdx = set10Lines.findIndex(l => l.includes('### **文法**') || l.includes('文法・読解') || l.includes('**問題1** 次の文の（　　）に入れるのに最もよいものを'));

// If standard header isn't found, find the grammar section differently. Let's find Answer List for vocab.
let grammarStart = grammarStartIdx;
if(grammarStartIdx === -1){
    const vocabAnsIdx = set10Lines.findIndex(l => l.includes('Correct Answer List') && l.includes('1–35'));
    grammarStart = vocabAnsIdx !== -1 ? vocabAnsIdx + 50 : 200; // rough fallback
}

const vocabText = set10Lines.slice(0, grammarStart).join('\n');
const grammarText = set10Lines.slice(grammarStart).join('\n');

const vocabQuestions = parseQuestions(vocabText).slice(0, 35);
const grammarQuestions = parseQuestions(grammarText).slice(0, 23);

// Try mapping Answer Keys
function mapAnswers(questions, answerText) {
    const lines = answerText.split('\n');
    for (let l of lines) {
        const m = l.match(/^(\d+)\.\s+\*?\*?(\d)\*?\*?/);
        if (m) {
            let qId = parseInt(m[1]);
            let ans = parseInt(m[2]);
            let q = questions.find(q => q.id === qId);
            if (q) {
                q.correctIndex = ans - 1; // 0-indexed
            }
        }
    }
}

const vocabAnsStart = set10Lines.findIndex(l => l.includes('Correct Answer List') && l.includes('1–35'));
if (vocabAnsStart !== -1) {
    mapAnswers(vocabQuestions, set10Lines.slice(vocabAnsStart, vocabAnsStart+100).join('\n'));
}

const grammarAnsStart = set10Lines.findIndex(l => l.includes('第10回 文法 Answer List') || (l.includes('文法 Answer List') && l.includes('1-23')));
if (grammarAnsStart !== -1) {
    mapAnswers(grammarQuestions, set10Lines.slice(grammarAnsStart, grammarAnsStart+100).join('\n'));
}

console.log("Vocab Questions found: " + vocabQuestions.length);
console.log("Grammar Questions found: " + grammarQuestions.length);

fs.writeFileSync('set10_debug.json', JSON.stringify({vocab: vocabQuestions, grammar: grammarQuestions}, null, 2));

// Inject into 15_sets_practice_question.js
let template = fs.readFileSync('15_sets_practice_question.js', 'utf8');
const jsonVocab = JSON.stringify(vocabQuestions, null, 2);
template = template.replace(
  /questions: \[\] \/\/ Paste your 35 vocabulary\/kanji questions here/,
  `questions: ${jsonVocab.split('\n').join('\n        ')}`
);

const jsonGrammar = JSON.stringify(grammarQuestions, null, 2);
template = template.replace(
  /questions: \[\] \/\/ Paste your 23 grammar\/reading questions here/,
  `questions: ${jsonGrammar.split('\n').join('\n        ')}`
);

fs.writeFileSync('15_sets_practice_question.js', template);
console.log("Injected Set 10 locally into 15_sets_practice_question.js");
