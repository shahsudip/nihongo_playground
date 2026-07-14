const fs = require('fs');

const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');
const lines = text.split('\n');

const idxStart = lines.findIndex(l => l.includes('TEST 9 STarts HERE'));
const idxEnd = lines.findIndex(l => l.includes('TEST 9 ENDS HERE'));

const set9Lines = lines.slice(idxStart, idxEnd);
const set9Text = set9Lines.join('\n');

function parseQuestions(sectionText) {
    const questions = [];
    const qMatches = Array.from(sectionText.matchAll(/(?:^|\n)(\d+)\.\s+([\s\S]*?)(?=(?:\n\d+\.\s+)|\n\*\*✅ Correct Answer List|\n\*\*第9回 文法 Answer List|\n### \*\*文法\*\*|$)/g));
    
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

const grammarStartIdx = set9Lines.findIndex(l => l.includes('### **文法**'));
const vocabText = set9Lines.slice(0, grammarStartIdx).join('\n');
const grammarText = set9Lines.slice(grammarStartIdx).join('\n');

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

const vocabAnsStart = set9Lines.findIndex(l => l.includes('Correct Answer List for 第9回 模擬テスト (All Questions 1–35)'));
if (vocabAnsStart !== -1) {
    mapAnswers(vocabQuestions, set9Lines.slice(vocabAnsStart, vocabAnsStart+100).join('\n'));
}

const grammarAnsStart = set9Lines.findIndex(l => l.includes('第9回 文法 Answer List'));
if (grammarAnsStart !== -1) {
    mapAnswers(grammarQuestions, set9Lines.slice(grammarAnsStart, grammarAnsStart+100).join('\n'));
}

console.log("Vocab Questions found: " + vocabQuestions.length);
console.log("Grammar Questions found: " + grammarQuestions.length);

const template = fs.readFileSync('15_sets_practice_question.js', 'utf8');

// We need to inject these questions into the set-9 arrays
const jsonVocab = JSON.stringify(vocabQuestions, null, 2);
const jsonGrammar = JSON.stringify(grammarQuestions, null, 2);

fs.writeFileSync('set9_debug.json', JSON.stringify({vocab: vocabQuestions, grammar: grammarQuestions}, null, 2));
