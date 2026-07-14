import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function parseGrammarAccurately(txt, setIndex) {
    let gStart = txt.indexOf('文法');
    if (gStart === -1) gStart = 0;
    let grammarTxt = txt.substring(gStart);
    
    // Split into Part 1 (Q1-18) and Part 2 (Passage + Q19-23)
    let p2Index = grammarTxt.search(/問題\s*3[^\n]*\n/);
    let part1 = grammarTxt.substring(0, p2Index);
    let part2 = grammarTxt.substring(p2Index); // includes 問題3...
    
    // Extract Q1-18
    let regex = /(?:^|\n)(?:\[(\d+)\]|(\d+)\.\s+)([\s\S]*?)(?=(?:\n\[\d+\]|\n\d+\.\s+)|\n問題|\nTEST|\nAnswer|解答|$)/g;
    let qs = [];
    let m1;
    while ((m1 = regex.exec(part1)) !== null) {
        let qNumStr = m1[1] || m1[2];
        let block = m1[3].trim();
        let qText = block;
        let optionsStr = "";
        let optionsMatch = block.match(/(?:^|\n)\s*1[\.\s]\s*([\s\S]*)/);
        if (optionsMatch) {
            qText = block.substring(0, optionsMatch.index).trim();
            optionsStr = block.substring(optionsMatch.index).trim();
        }
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
        qs.push({ questionText: qText, options: options });
    }
    
    // Extract passage from part2
    let passageMatch = part2.match(/問題\s*3[^\n]*\n([\s\S]*?)(?=\n\s*(?:\[\s*19\s*\]|19\.\s)\s*\n)/);
    let passageText = passageMatch ? passageMatch[1].trim() : null;
    
    // Hardcode Set 6 passage
    if (setIndex === 5) {
        passageText = `「初めての銭湯」
ピエール・マルタン
あなたは、日本のお風呂といえば何を考えますか。温泉でしょうか、露天風呂でしょうか。いろいろありますが、私の場合は「銭湯」です。
私の故郷には、毎日お風呂に入るという習慣はありません。[ 19 ]、日本へ来たばかりのときは、日本人が毎日お風呂に入るということを知って、とても驚きました。
家にお風呂がある人は、家にお風呂に毎日入りますし、家にお風呂がない場合も、毎日のように家の近所にある「銭湯」に行きます。[ 20 ]習慣を持っている民族は、広い世界の中でもあまりないと思います。
初めて銭湯に行ったときに、驚いたことがたくさんありました。[ 21-a ]、建物がお寺や神社のようなとても古い建物だったこと。第二に、入口が「男湯」と「女湯」に分かれていたこと。第三に、ほかの人の前で服を全部脱いでお風呂に入らなければならなかったこと。[ 21-b ]、お風呂のお湯の温度がとても高かったことです。
しかし、今では日本の銭湯にも[ 22 ]。なにも気にせずに熱いお湯にゆっくり入れるようになりました。私もかなり「日本人」に近づいてきたという[ 23 ]。`;
    }
    
    // Remaining text for Q19-23
    let remainingPart2 = part2;
    if (passageMatch) {
        remainingPart2 = part2.substring(passageMatch.index + passageMatch[0].length);
    }
    
    // In Set 6, there are no questions in text, just answers!
    // But for Set 1-8, let's parse the remainingPart2 exactly like part1
    let m2;
    while ((m2 = regex.exec(remainingPart2)) !== null) {
        let qNumStr = m2[1] || m2[2];
        let block = m2[3].trim();
        let qText = block;
        let optionsStr = "";
        let optionsMatch = block.match(/(?:^|\n)\s*1[\.\s]\s*([\s\S]*)/);
        if (optionsMatch) {
            qText = block.substring(0, optionsMatch.index).trim();
            optionsStr = block.substring(optionsMatch.index).trim();
        }
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
        qs.push({ questionText: qText, options: options, passageText: passageText });
    }
    
    // Fill passageText for Q19-23 if we didn't parse them because they are missing (e.g. Set 6)
    // Wait, if Set 6 is missing Q19-23, they won't be in qs! We must rely on oldGrammarQs
    return { qs, passageText };
}

async function run() {
    console.log('Fetching from Firebase...');
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();

    for (let i = 0; i < 8; i++) {
        console.log(`Reparsing Set ${i + 1}...`);
        let txt = readFileSync(`set${i + 1}_raw.txt`, 'utf8');
        let { qs, passageText } = parseGrammarAccurately(txt, i);
        
        let s = data.sets[i];
        let oldGrammarQs = s.sections['grammar-reading'].questions;
        
        // Q1-18 override
        for (let j = 0; j < 18; j++) {
            if (qs[j] && qs[j].options.length === 4) {
                oldGrammarQs[j].questionText = qs[j].questionText;
                oldGrammarQs[j].options = qs[j].options;
            }
        }
        
        // Q19-23 override
        for (let j = 18; j < 23; j++) {
            oldGrammarQs[j].passageText = passageText;
            
            // For Set 1-8, if qs has the question, use it!
            if (qs[j]) {
                // Because they are blank questions, their qText might be just ""
                oldGrammarQs[j].questionText = qs[j].questionText;
                if (qs[j].options.length === 4) {
                    oldGrammarQs[j].options = qs[j].options;
                }
            } else {
                // If it wasn't parsed (like Set 6), we just leave the existing options and questionText,
                // but for Set 6 Q19-23 the questionText should be empty since it's just a blank.
                oldGrammarQs[j].questionText = "";
            }
        }
    }
    
    console.log('Pushing to Firebase...');
    await docRef.set(data);
    console.log('SUCCESS!');
    process.exit(0);
}
run();
