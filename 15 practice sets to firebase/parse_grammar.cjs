const fs = require('fs');
const text = fs.readFileSync('test1_part2.txt', 'utf8');

const qs = [];
let lines = text.split('\n').map(l => l.trim()).filter(l => l);

let currentQ = null;

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    
    if (l.includes('Answer List') || l.includes('Pure list')) {
        break;
    }
    
    let optM = l.match(/^1\.\s+(.+?)[　\s]+2\.\s+(.+?)[　\s]+3\.\s+(.+?)[　\s]+4\.\s+(.+?)/);
    
    let m = null;
    if (!optM) {
        let possibleQ = l.match(/^(\d+)\.\s+(.*)/);
        if (possibleQ) {
            let qNum = parseInt(possibleQ[1]);
            if (qNum > 4 || (currentQ === null && qNum === 1) || (currentQ && currentQ.options.length === 4)) {
                m = possibleQ;
            }
        }
        if (!m) {
            m = l.match(/^\*\*(\d+)\*\*/);
        }
    }
    
    if (m && !l.includes('a.')) {
        if (currentQ && currentQ.options.length > 0) {
            qs.push(currentQ);
        }
        currentQ = {
            id: qs.length + 1,
            questionText: m[2] ? m[2] : "",
            options: [],
            correctIndex: -1
        };
        if (!m[2] && i + 1 < lines.length && lines[i+1].match(/^[1234]\.\s+/)) {
            currentQ.questionText = "（　　）";
        }
    } else if (currentQ) {
        if (optM) {
            currentQ.options.push(optM[1], optM[2], optM[3], optM[4]);
        } else if (l.match(/^[1234]\.\s+/)) {
            currentQ.options.push(l.replace(/^[1234]\.\s+/, ''));
        } else if (currentQ.options.length === 0 && !l.includes('Answer List') && !l.includes('問題') && !l.includes('---')) {
            currentQ.questionText += "\n" + l;
        }
    }
}
if (currentQ && currentQ.options.length > 0) {
    qs.push(currentQ);
}

// Map answers
const gAns = [3,3,2,4,4,1,1,3,4,2,4,3,1, 3,4,4,3,3, 4,2,2,3,4];
for (let i = 0; i < qs.length; i++) {
    if (i < gAns.length) {
        qs[i].correctIndex = gAns[i] - 1;
    }
}

for (let q of qs) {
    q.questionText = q.questionText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

fs.writeFileSync('parsed_grammar.json', JSON.stringify(qs, null, 2));
console.log(`Parsed ${qs.length} questions.`);
