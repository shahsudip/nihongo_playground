import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function getVocabInstruction(qId) {
    if (qId >= 1 && qId <= 8) return '問題1 ______ のことばの読み方として最もよいものを、1・2・3・4から一つえらびなさい。';
    if (qId >= 9 && qId <= 14) return '問題2 ______ のことばを漢字で書くとき、最もよいものを1・2・3・4から一つえらびなさい。';
    if (qId >= 15 && qId <= 25) return '問題3 (　　) に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。';
    if (qId >= 26 && qId <= 30) return '問題4 ______ に意味が最も近いものを、1・2・3・4から一つえらびなさい。';
    if (qId >= 31 && qId <= 35) return '問題5 次のことばの使い方として最もよいものを、一つえらびなさい。';
    return '';
}

function getGrammarInstruction(qId) {
    if (qId >= 1 && qId <= 13) return '問題1 次の文の（　　）に入れるのに最もよいものを、一つえらびなさい。';
    if (qId >= 14 && qId <= 18) return '問題2 次の文の ______★______ に入る最もよいものを、1・2・3・4から一つえらびなさい。';
    if (qId >= 19 && qId <= 23) return '問題3 つぎの文章を読んで 19 から 23 の中に入る最もよいものを、1・2・3・4から一つえらびなさい。';
    return '';
}

async function fixHeaders() {
    console.log('Fetching from Firebase...');
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();

    // Iterate over sets 1-8 (indices 0 to 7)
    for (let i = 0; i < 8; i++) {
        let s = data.sets[i];
        
        // Fix Vocab instructions
        s.sections['vocabulary-kanji'].questions.forEach((q, idx) => {
            // q.id might be global, so we use local 1-based index based on position
            let localId = idx + 1;
            let instr = getVocabInstruction(localId);
            if (instr) q.instruction = instr;
        });

        // Fix Grammar instructions
        s.sections['grammar-reading'].questions.forEach((q, idx) => {
            let localId = idx + 1;
            let instr = getGrammarInstruction(localId);
            if (instr) q.instruction = instr;
        });
    }
    
    console.log('Pushing to Firebase...');
    await docRef.set(data);
    console.log('SUCCESS! Standard headers applied to Sets 1-8.');
    process.exit(0);
}

fixHeaders();
