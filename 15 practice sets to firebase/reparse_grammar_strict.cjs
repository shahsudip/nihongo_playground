const fs = require('fs');

function parseGrammarForSet(filename, startMarker, endMarker, isSet10) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');

    const idx1 = text.indexOf(startMarker);
    const idx2 = text.indexOf(endMarker, idx1);
    const setLines = text.substring(idx1, idx2).split('\n');

    const grammarStartIdx = setLines.findIndex(l => l.includes('### **文法**') || l.includes('文法・読解'));
    
    // Find where the grammar questions END (either an Answer List at the bottom, or end of file)
    // In Set 9, Answer list is at the bottom: "文法 Answer List"
    // In Set 10, Answer list is at the TOP (so it's not after grammarStartIdx)
    let grammarEndIdx = setLines.findIndex((l, i) => i > grammarStartIdx && (l.includes('Answer List') || l.includes('correct answers')));
    if (grammarEndIdx === -1) grammarEndIdx = setLines.length;

    const grammarText = setLines.slice(grammarStartIdx, grammarEndIdx).join('\n');

    const questions = [];
    
    // Parse Q1-18 only from before 問題3
    const passageStartIdx = grammarText.indexOf('**問題3**');
    const q1To18Text = passageStartIdx !== -1 ? grammarText.substring(0, passageStartIdx) : grammarText;
    
    const qMatches = Array.from(q1To18Text.matchAll(/(?:^|\n)(\d+)\.\s+([\s\S]*?)(?=(?:\n\d+\.\s+)|$)/g));
    
    for (let m of qMatches) {
        let qNum = parseInt(m[1]);
        if (qNum > 18) continue;

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
            let optParts = optionsStr.split(/(?:\s+|　)[234]\.\s+/);
            if (optParts.length === 4) {
                options = optParts.map(o => o.trim());
            } else {
                options = optionsStr.split(/\s+/).map(o => o.trim()).filter(o => o);
            }
        }
        
        if (!questions.find(q => q.id === qNum)) {
            questions.push({
                id: qNum,
                questionText: qText,
                options: options,
                correctIndex: 0,
                sectionType: "grammar-reading"
            });
        }
    }

    // Now extract passage and Q19-23
    const passageMatch = grammarText.match(/\*\*問題3\*\*([\s\S]*?)(?=\n\*\*19\*\*)/);
    let passageText = "";
    if (passageMatch) {
        passageText = passageMatch[0].trim();
        let lines = passageText.split('\n');
        let instruction = lines[0].replace(/\*\*/g, '').trim();
        passageText = lines.slice(1).join('\n').trim();
        
        const q19to23Matches = Array.from(grammarText.matchAll(/(?:^|\n)\*\*(\d+)\*\*\s*\n([\s\S]*?)(?=(?:\n\*\*(\d+)\*\*)|(?:\n---)|\n\*\*第|\nTEST|$)/g));
        
        for (let m of q19to23Matches) {
            let qNum = parseInt(m[1]);
            if (qNum < 19 || qNum > 23) continue;

            let block = m[2].trim();
            let optionsStr = block;
            
            let options = [];
            let optParts = optionsStr.split(/(?:^|\n)\s*[1234]\.\s+/).filter(o => o.trim());
            if (optParts.length === 4) {
                options = optParts.map(o => o.trim());
            } else {
                optParts = optionsStr.split(/(?:\s+|　)[1234]\.\s+/).filter(o => o.trim());
                options = optParts.map(o => o.trim());
            }
            
            if (!questions.find(q => q.id === qNum)) {
                questions.push({
                    id: qNum,
                    questionText: `（　${qNum}　）の中に入る最もよいものを、一つえらびなさい。`,
                    passageText: passageText,
                    instruction: instruction,
                    options: options,
                    correctIndex: 0,
                    sectionType: "grammar-reading"
                });
            }
        }
    }

    // Map Answers (search entire setLines for answers)
    const ansText = setLines.join('\n');
    let grammarAnsRegex;
    if (!isSet10) {
        // Set 9: **第9回 文法 Answer List (1-23)**
        const m = ansText.match(/文法 Answer List[^]*?(?=(?:TEST|$))/);
        if (m) {
            const lines = m[0].split('\n');
            for (let l of lines) {
                const am = l.match(/^(\d+)\.\s+\*?\*?(\d)\*?\*?/);
                if (am) {
                    let qId = parseInt(am[1]);
                    let ans = parseInt(am[2]);
                    let q = questions.find(q => q.id === qId);
                    if (q) q.correctIndex = ans - 1;
                }
            }
        }
    } else {
        // Set 10: ### **問題3** (文脈) which handles 15-25 (grammar ends at 23). Grammar answers start at 1 for "問題1 次の文の" Wait! 
        // In Set 10, the answer key for grammar is NOT listed as 1-23 !!
        // Wait, looking at my Set 10 snippet earlier:
        // "--- \n1. 1 \n2. 3 \n..." at the very end of the file!
        const m = ansText.match(/---\n((?:\d+\.\s+\d\s*\n)+)/);
        if (m) {
            const lines = m[1].split('\n');
            for (let l of lines) {
                const am = l.match(/^(\d+)\.\s+\*?\*?(\d)\*?\*?/);
                if (am) {
                    let qId = parseInt(am[1]);
                    let ans = parseInt(am[2]);
                    let q = questions.find(q => q.id === qId);
                    if (q) q.correctIndex = ans - 1;
                }
            }
        }
    }

    // Map instructions to Q1-18
    let currentInstruction = "";
    for (let l of grammarText.split('\n')) {
        if (l.match(/\*\*問題\d+\*\*/)) {
            currentInstruction = l.replace(/\*\*/g, '').trim();
        } else if (l.match(/^(\d+)\.\s+/)) {
            const m = l.match(/^(\d+)\.\s+/);
            const qNum = parseInt(m[1]);
            let q = questions.find(q => q.id === qNum);
            if (q && q.id <= 18) {
                q.instruction = currentInstruction;
            }
        }
    }

    questions.sort((a, b) => a.id - b.id);
    data.grammar = questions;
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

parseGrammarForSet('./set9_debug.json', 'TEST 9 STarts HERE', 'TEST 9 ENDS HERE', false);
parseGrammarForSet('./set10_debug.json', 'TEST 10 Starts  here', 'TEST 10 ENDS HERE', true);
console.log("Grammar reparsed EXACTLY 23 QUESTIONS safely!");
