const fs = require('fs');

const raw = fs.readFileSync('test11_grammar_paste.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l);

const qs = [];
let currentQ = null;
let answers = {};
let readingPassage = "";

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];

    // Answers section at the end
    if (l.match(/^(\d+)\.\s+(\d+)$/) || l.match(/^\*\*(\d+)\.\s+(\d+)\*\*$/)) {
        let m = l.match(/^(\d+)\.\s+(\d+)$/) || l.match(/^\*\*(\d+)\.\s+(\d+)\*\*$/);
        let qNum = parseInt(m[1]);
        let ans = parseInt(m[2]) - 1;
        answers[qNum] = ans;
        continue;
    }

    if (l.includes('富士山のこと') || l.includes('土曜、日曜日に') || l.includes('私が友だちと') || l.includes('ただ、残念') || l.includes('帰ってきてから') || l.includes('張 拓')) {
        readingPassage += l + "\n";
        continue;
    }

    let optM = l.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)$/);
    if (!optM && l.match(/^1\.\s+.*2\.\s+.*3\.\s+.*4\.\s+.*/)) {
        let parts = l.split(/[1234]\.\s+/).filter(x => x.trim() !== '');
        if (parts.length === 4) optM = [l, parts[0].trim(), parts[1].trim(), parts[2].trim(), parts[3].trim()];
    }

    let m = null;
    if (!optM) {
        let possibleQ = l.match(/^(\d+)\.\s+(.*)/);
        if (possibleQ) {
            let qNum = parseInt(possibleQ[1]);
            if (qNum > 4 || (currentQ === null) || (currentQ && currentQ.options.length === 4)) {
                m = possibleQ;
            }
        }
        if (!m) m = l.match(/^\*\*(\d+)\*\*/);
    }

    if (m && !l.startsWith('問題') && !l.startsWith('**問題')) {
        if (currentQ && currentQ.options.length > 0) qs.push(currentQ);
        currentQ = {
            id: parseInt(m[1]),
            questionText: m[2] ? m[2] : "",
            options: [],
            correctIndex: -1
        };
        // For reading section questions (19-23), prepend the reading passage to the first question
        if (currentQ.id === 19 && readingPassage) {
            currentQ.questionText = readingPassage.trim() + "\n\n" + currentQ.questionText;
            readingPassage = ""; // Clear so it's not prepended again
        }
    } else if (currentQ) {
        if (optM) {
            currentQ.options.push(optM[1], optM[2], optM[3], optM[4]);
        } else if (l.match(/^[1234]\.\s+(.*)/)) {
            let om = l.match(/^[1234]\.\s+(.*)/);
            currentQ.options.push(om[1].trim());
        } else if (currentQ.options.length === 0 && !l.startsWith('問題') && !l.startsWith('**問題') && !l.includes('---') && !l.includes('Bunpo') && !l.includes('Reading')) {
            currentQ.questionText += "\n" + l;
        }
    }
}
if (currentQ && currentQ.options.length > 0) qs.push(currentQ);

function removeUnderline(text) {
    if (!text) return text;
    return text.replace(/<u>/g, '').replace(/<\/u>/g, '').replace(/\*\*/g, '');
}

for (let q of qs) {
    if (q.questionText.includes('**')) {
        q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, '<u>$1</u>');
    }
    q.questionText = removeUnderline(q.questionText);
    q.options = q.options.map(o => removeUnderline(o));
    q.sectionType = "grammar-reading";
    if (answers[q.id] !== undefined) q.correctIndex = answers[q.id];
}

console.log(`Parsed ${qs.length} Grammar questions.`);

if (qs.length === 23) {
    const dbContent = fs.readFileSync('src/data/practice_sets_data.js', 'utf8');
    const jsonStr = dbContent.replace('export const practiceSetsBook = ', '').replace(/;\s*$/, '');
    const dbData = JSON.parse(jsonStr);

    dbData.sets[10].sections['grammar-reading'].questions = qs;
    
    // Reassign IDs across all sets
    let currentId = 1;
    for (let set of dbData.sets) {
        for (let sec of ['vocabulary-kanji', 'grammar-reading', 'listening']) {
            if (set.sections[sec]) {
                for (let q of set.sections[sec].questions) {
                    q.id = currentId++;
                }
            }
        }
    }

    fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(dbData, null, 2)};\n`);
    console.log('Successfully updated Test 11 Grammar in database!');
} else {
    console.error('Failed to parse 23 questions! Found: ' + qs.length);
}
