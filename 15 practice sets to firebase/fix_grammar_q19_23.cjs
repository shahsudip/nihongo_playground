const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixGrammar() {
    const data = JSON.parse(fs.readFileSync('src/data/practice_sets_data.js', 'utf8').replace('export const practiceSetsBook = ', '').replace(/;\s*$/, ''));
    
    const rawFiles = {
        10: 'set11_raw.txt',
        11: 'set12_raw.txt',
        12: 'set13_raw.txt',
        13: 'set14_raw.txt',
        14: 'set15_raw.txt'
    };

    let fixedCount = 0;

    for (let i = 10; i < 15; i++) {
        const rawText = fs.readFileSync(rawFiles[i], 'utf8');
        const grammar = data.sets[i].sections['grammar-reading'].questions;
        
        let gStart = rawText.indexOf('### **文法**');
        if (gStart === -1) gStart = rawText.indexOf('**文法**');
        if (gStart === -1) continue;
        
        let gText = rawText.substring(gStart);
        
        // Find the block from **19** to end or ---
        const gMatch = gText.match(/\*\*19\*\*[\s\S]*?(?=\n\s*(?:---|\nTEST|Answer|\n✅))/i);
        if (!gMatch) {
            console.log(`Failed to find **19** in ${rawFiles[i]}`);
            continue;
        }
        
        let block = '\n' + gMatch[0]; // prepend newline for split
        
        let chunks = block.split(/\n\*\*(19|20|21|22|23)\*\*\s*/).slice(1);
        
        if (chunks.length === 10) { // 5 numbers + 5 texts
            for (let j = 0; j < chunks.length; j += 2) {
                let qNum = parseInt(chunks[j]);
                let chunkText = chunks[j+1];
                
                let opt1 = chunkText.match(/1\.\s*(.*?)(?=\n\s*2\.)/s);
                let opt2 = chunkText.match(/2\.\s*(.*?)(?=\n\s*3\.)/s);
                let opt3 = chunkText.match(/3\.\s*(.*?)(?=\n\s*4\.)/s);
                let opt4 = chunkText.match(/4\.\s*(.*?)$/s);
                
                if (opt1 && opt2 && opt3 && opt4) {
                    let opts = [opt1[1].trim(), opt2[1].trim(), opt3[1].trim(), opt4[1].trim()];
                    let idx = qNum - 1; // 18 to 22 (Q19-23 in grammar array)
                    
                    grammar[idx].questionText = qNum.toString();
                    grammar[idx].options = opts;
                    fixedCount++;
                    console.log(`Set ${i+1} Q${qNum} options fixed.`);
                } else {
                    console.log(`Set ${i+1} Q${qNum} failed to parse options`);
                }
            }
        } else {
            console.log(`Set ${i+1} chunks length ${chunks.length} instead of 10!`);
        }
    }

    fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(data, null, 2)};\n`);
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log(`Successfully fixed ${fixedCount} Grammar Q19-23 options and pushed to Firebase!`);
    process.exit(0);
}

fixGrammar().catch(console.error);
