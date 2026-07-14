const fs = require('fs');

const rawFiles = ['set11_raw.txt', 'set12_raw.txt', 'set13_raw.txt', 'set14_raw.txt', 'set15_raw.txt'];

for (let file of rawFiles) {
    if (fs.existsSync(file)) {
        let rawText = fs.readFileSync(file, 'utf8');
        let gStart = rawText.indexOf('### **文法**');
        if (gStart === -1) gStart = rawText.indexOf('**文法**');
        if (gStart !== -1) {
            let gText = rawText.substring(gStart);
            let passageMatch = gText.match(/\*\*問題3\*\*[^\n]*\n([\s\S]*?)(?=\n\s*\*\*\s*19\s*\*\*|\n\s*19\s*)/);
            if (!passageMatch) passageMatch = gText.match(/問題3[^\n]*\n([\s\S]*?)(?=\n\s*\*\*\s*19\s*\*\*|\n\s*19\s*)/);
            
            if (passageMatch) {
                let passageText = passageMatch[1].trim();
                passageText = passageText.replace(/^[^\n]*えらびなさい。?\s*\n*/, '');
                console.log(`\n--- ${file} ---`);
                console.log(passageText.substring(0, 100));
            } else {
                console.log(`\n--- ${file} --- NO MATCH`);
            }
        }
    }
}
