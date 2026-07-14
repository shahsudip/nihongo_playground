import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fix() {
    const doc = await db.collection('books').doc('jlpt-n3-practice-sets').get();
    const data = doc.data();
    for (let i = 0; i < 8; i++) {
        let txt = readFileSync('set' + (i + 1) + '_raw.txt', 'utf8');
        let p2Index = txt.search(/問題\s*3[^\n]*\n/);
        let part2 = txt.substring(p2Index);
        let pm = part2.match(/問題\s*3[^\n]*\n([\s\S]*?)(?=\n\s*(?:\[\s*19\s*\]|19\.\s)\s*\n)/);
        if (!pm) continue;
        let rem = part2.substring(pm.index + pm[0].length);
        let g = data.sets[i].sections['grammar-reading'].questions;
        for (let qnum = 19; qnum <= 23; qnum++) {
            // Use literal regex logic with RegExp correctly escaped
            let qMatch = rem.match(new RegExp(`(?:^|\\r?\\n)(?:\\[${qnum}\\]|${qnum}\\.\\s+)([\\s\\S]*?)(?=(?:\\r?\\n\\[\\d+\\]|\\r?\\n\\d+\\.\\s+)|\\r?\\n問題|\\r?\\n文法|\\r?\\nTEST|\\r?\\nAnswer|解答|$)`));
            if (qMatch) {
                let block = qMatch[1].trim();
                let optionsMatch = block.match(/(?:^|\r?\n)\s*1[\.\s]\s*([\s\S]*)/);
                if (optionsMatch) {
                    let optionsStr = block.substring(optionsMatch.index).trim();
                    let optRaw = optionsStr.replace(/\*\*/g, '@@');
                    let matches = [...optRaw.matchAll(/(?:^|\r?\n)\s*[1234][\.\s]\s*([\s\S]*?)(?=(?:\r?\n\s*[1234][\.\s])|$)/g)];
                    if (matches.length === 4) {
                        g[qnum - 1].options = matches.map(m => m[1].replace(/@@/g, '').replace(/[\r\n]+/g, ' ').replace(/<[^>]*>/g, '').trim());
                        g[qnum - 1].questionText = '';
                    }
                }
            }
        }
    }
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log('Fixed Q19-23 options for Sets 1-8 permanently!');
    process.exit(0);
}
fix();
