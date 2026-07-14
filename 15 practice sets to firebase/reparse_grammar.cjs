const fs = require('fs');

function parseGrammarForSet(filename, startMarker, endMarker) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const text = fs.readFileSync('15_sets_new_extracted.txt', 'utf8');

    const idx1 = text.indexOf(startMarker);
    const idx2 = text.indexOf(endMarker, idx1);
    const setLines = text.substring(idx1, idx2).split('\n');

    const grammarStartIdx = setLines.findIndex(l => l.includes('### **文法**') || l.includes('文法・読解'));
    const grammarText = setLines.slice(grammarStartIdx).join('\n');

    // Parse Questions 1-18 normally
    const questions = [];
    const qMatches = Array.from(grammarText.matchAll(/(?:^|\n)(\d+)\.\s+([\s\S]*?)(?=(?:\n\d+\.\s+)|\n\*\*問題3\*\*|\n\*\*19\*\*|$)/g));
    
    for (let m of qMatches) {
        let qNum = parseInt(m[1]);
        if (qNum > 18) continue; // safety

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
        
        questions.push({
            id: qNum,
            questionText: qText,
            options: options,
            correctIndex: 0, // will map later
            sectionType: "grammar-reading"
        });
    }

    // Now extract passage and Q19-23
    const passageMatch = grammarText.match(/\*\*問題3\*\*([\s\S]*?)(?=\n\*\*19\*\*)/);
    let passageText = "";
    if (passageMatch) {
        passageText = passageMatch[0].trim();
        // Remove the "**問題3** instruction" line from the passage if we want, or keep it.
        // Actually, let's keep the instruction separate.
        let lines = passageText.split('\n');
        let instruction = lines[0].replace(/\*\*/g, '').trim();
        passageText = lines.slice(1).join('\n').trim();
        
        // Parse Q19-23
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
                // Try splitting inline
                optParts = optionsStr.split(/(?:\s+|　)[1234]\.\s+/).filter(o => o.trim());
                options = optParts.map(o => o.trim());
            }
            
            questions.push({
                id: qNum,
                questionText: `（　${qNum}　）の中に入る最もよいものを、一つえらびなさい。`, // Placeholder question text because the question is IN the passage!
                passageText: passageText,
                instruction: instruction,
                options: options,
                correctIndex: 0,
                sectionType: "grammar-reading"
            });
        }
    }

    // Map Answers
    const ansStart = setLines.findIndex(l => l.includes('文法 Answer List') || l.includes('**問題1** (読み方)'));
    const ansText = setLines.slice(ansStart, ansStart+150).join('\n');
    const lines = ansText.split('\n');
    for (let l of lines) {
        // match "19. **2**" or "19. 2" or "19. 2 (解けて)"
        const m = l.match(/^(\d+)\.\s+\*?\*?(\d)\*?\*?/);
        if (m) {
            let qId = parseInt(m[1]);
            let ans = parseInt(m[2]);
            let q = questions.find(q => q.id === qId);
            if (q) {
                q.correctIndex = ans - 1;
            }
        }
    }

    // Map instructions to Q1-18 (from data.grammar if they existed, or we can just run inject logic)
    // We already have instruction injection logic, but let's just do it directly
    let currentInstruction = "";
    for (let l of setLines.slice(grammarStartIdx)) {
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

    data.grammar = questions;
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

parseGrammarForSet('./set9_debug.json', 'TEST 9 STarts HERE', 'TEST 9 ENDS HERE');
parseGrammarForSet('./set10_debug.json', 'TEST 10 Starts  here', 'TEST 10 ENDS HERE');
console.log("Grammar reparsed successfully!");
