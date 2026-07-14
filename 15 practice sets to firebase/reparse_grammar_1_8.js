import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function parseGrammar(txt, setIndex) {
    let gStart = txt.indexOf('文法');
    if (gStart === -1) gStart = 0;
    let grammarTxt = txt.substring(gStart);
    
    let qs = [];
    // Match either [1] or 1.
    let regex = /(?:^|\n)(?:\[(\d+)\]|(\d+)\.\s+)([\s\S]*?)(?=(?:\n\[\d+\]|\n\d+\.\s+)|\n問題|\nTEST|\nAnswer|解答|$)/g;
    let qMatches = Array.from(grammarTxt.matchAll(regex));
    
    for (let m of qMatches) {
        let qNumStr = m[1] || m[2];
        if (!qNumStr) continue;
        let qNum = parseInt(qNumStr);
        let block = m[3].trim();
        
        let qText = block;
        let optionsStr = "";
        
        // Find options. Options start with "1 " or "1. " on a new line or at start
        let optionsMatch = block.match(/(?:^|\n)\s*1[\.\s]\s*([\s\S]*)/);
        if (optionsMatch) {
            qText = block.substring(0, optionsMatch.index).trim();
            optionsStr = block.substring(optionsMatch.index).trim();
        }
        
        // Fix qText if it accidentally caught some extra prefix (like a star or problem number leftover)
        qText = qText.replace(/\*\*/g, '').trim();
        
        let options = [];
        if (optionsStr) {
            let optRaw = optionsStr.replace(/\*\*/g, '@@');
            let matches = [...optRaw.matchAll(/(?:^|\n)\s*[1234][\.\s]\s*([\s\S]*?)(?=(?:\n\s*[1234][\.\s])|$)/g)];
            if (matches.length > 0) {
                options = matches.map(m => m[1].replace(/@@/g, '').replace(/[\r\n]+/g, ' ').replace(/<[^>]*>/g, '').trim());
            } else {
                options = [optionsStr.replace(/\*\*/g, '').replace(/@@/g, '').replace(/[\r\n]+/g, ' ').replace(/<[^>]*>/g, '').trim()];
            }
        }
        
        qs.push({
            id: qNum,
            questionText: qText,
            options: options
        });
    }
    
    // Extract passage
    let passageMatch = grammarTxt.match(/問題\s*3[^\n]*\n([\s\S]*?)(?=\n\s*(?:\[\s*19\s*\]|19\.\s)\s*\n)/);
    let passageText = passageMatch ? passageMatch[1].trim() : null;
    
    // Hardcode Set 6 passage because it's missing in the text
    if (setIndex === 5) {
        passageText = `「初めての銭湯」
ピエール・マルタン
あなたは、日本のお風呂といえば何を考えますか。温泉でしょうか、露天風呂でしょうか。いろいろありますが、私の場合は「銭湯」です。
私の故郷には、毎日お風呂に入るという習慣はありません。[ 19 ]、日本へ来たばかりのときは、日本人が毎日お風呂に入るということを知って、とても驚きました。
家にお風呂がある人は、家にお風呂に毎日入りますし、家にお風呂がない場合も、毎日のように家の近所にある「銭湯」に行きます。[ 20 ]習慣を持っている民族は、広い世界の中でもあまりないと思います。
初めて銭湯に行ったときに、驚いたことがたくさんありました。[ 21-a ]、建物がお寺や神社のようなとても古い建物だったこと。第二に、入口が「男湯」と「女湯」に分かれていたこと。第三に、ほかの人の前で服を全部脱いでお風呂に入らなければならなかったこと。[ 21-b ]、お風呂のお湯の温度がとても高かったことです。
しかし、今では日本の銭湯にも[ 22 ]。なにも気にせずに熱いお湯にゆっくり入れるようになりました。私もかなり「日本人」に近づいてきたという[ 23 ]。`;
    }
    
    // For Set 1-8, grammar questions are usually 23 questions, but they might be labelled 1-23 or 36-58.
    // Let's just return the first 23 questions!
    let grammarQs = qs.slice(0, 23);
    
    if (passageText) {
        grammarQs.forEach((q, idx) => {
            if (idx >= 18 && idx <= 22) { // the 19th to 23rd questions
                q.passageText = passageText;
            }
        });
    }
    
    return grammarQs;
}

async function run() {
    console.log('Fetching from Firebase...');
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();

    for (let i = 0; i < 8; i++) {
        console.log(`Reparsing Set ${i + 1}...`);
        let txt = readFileSync(`set${i + 1}_raw.txt`, 'utf8');
        let newGrammarQs = parseGrammar(txt, i);
        
        let s = data.sets[i];
        let oldGrammarQs = s.sections['grammar-reading'].questions;
        
        if (newGrammarQs.length === 23 && oldGrammarQs.length === 23) {
            for (let j = 0; j < 23; j++) {
                // Merge the TEXT fields only
                oldGrammarQs[j].questionText = newGrammarQs[j].questionText;
                // Only replace options if we parsed them correctly
                if (newGrammarQs[j].options.length === 4) {
                    oldGrammarQs[j].options = newGrammarQs[j].options;
                }
                if (newGrammarQs[j].passageText) {
                    oldGrammarQs[j].passageText = newGrammarQs[j].passageText;
                } else if (j >= 18 && j <= 22) {
                    // if no passage found, but we expect one, log a warning
                    console.log(`Warning: Set ${i + 1} Q${j + 1} missing passage`);
                }
            }
        } else {
            console.log(`Length mismatch Set ${i + 1}! New: ${newGrammarQs.length}, Old: ${oldGrammarQs.length}`);
        }
    }
    
    console.log('Pushing to Firebase...');
    await docRef.set(data);
    console.log('SUCCESS!');
    process.exit(0);
}
run();
