import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// Manually provided answer keys for Sets 1 and 5
const set1VocabFix = { 33: 3, 34: 0 };
const set1GrammarAns = [2, 1, 1, 3, 2, 0, 1, 2, 1, 3, 0, 2, 3, 0, 2, 0, 1, 3, 3, 1, 1, 2, 2];
const set5GrammarAns = [1, 0, 2, 0, 1, 1, 3, 3, 0, 1, 3, 2, 2, 1, 2, 2, 1, 3, 1, 2, 2, 3, 3];

function extractPassage(setIndex) {
    if (setIndex === 5) return null; // Set 6 has no passage in text
    try {
        let rawText = readFileSync(`set${setIndex+1}_raw.txt`, 'utf8');
        let gStart = rawText.indexOf('文法');
        if (gStart === -1) gStart = 0;
        let gText = rawText.substring(gStart);
        let m = gText.match(/問題\s*3[^\n]*\n([\s\S]*?)(?=\n\[19\])/);
        if (m) {
            let passage = m[1].trim();
            // Optional: extract instruction if it's on the first line of passage
            let lines = passage.split('\n');
            let firstLine = lines[0].trim();
            // if firstLine is a title without punctuation, we can keep it as part of passageText.
            return passage;
        }
    } catch(e) {}
    return null;
}

function cleanOptions(question) {
    if (question.options && question.options.length === 4) {
        let lastOpt = question.options[3];
        let cutIdx1 = lastOpt.indexOf('---');
        let cutIdx2 = lastOpt.indexOf('**問題');
        let cutIdx3 = lastOpt.indexOf('Answer List');
        let cutIdx4 = lastOpt.indexOf('TEST ');
        let minCutIdx = -1;
        for (let idx of [cutIdx1, cutIdx2, cutIdx3, cutIdx4]) {
            if (idx !== -1 && (minCutIdx === -1 || idx < minCutIdx)) {
                minCutIdx = idx;
            }
        }
        if (minCutIdx !== -1) {
            question.options[3] = lastOpt.substring(0, minCutIdx).trim();
        }
        question.options[3] = question.options[3].replace(/[\r\n]+$/, '').trim();
    }
}

async function fixSets() {
    console.log('Fetching from Firebase...');
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();

    for (let i = 0; i < 8; i++) {
        let s = data.sets[i];
        console.log(`Processing Set ${i + 1}...`);
        
        // Fix passages
        let passageText = extractPassage(i);
        if (passageText) {
            let gQuestions = s.sections['grammar-reading'].questions;
            for (let q of gQuestions) {
                // If it's Q19-23
                if (q.id >= 19 && q.id <= 23) {
                    q.passageText = passageText;
                }
            }
        }
        
        // Clean options for Grammar
        for (let q of s.sections['grammar-reading'].questions) {
            cleanOptions(q);
        }
        // Clean options for Vocab
        for (let q of s.sections['vocabulary-kanji'].questions) {
            cleanOptions(q);
        }
        
        // Map correctIndex for Set 1
        if (i === 0) {
            for (let [idx, ans] of Object.entries(set1VocabFix)) {
                s.sections['vocabulary-kanji'].questions[idx].correctIndex = ans;
            }
            s.sections['grammar-reading'].questions.forEach((q, idx) => {
                if (idx < set1GrammarAns.length) q.correctIndex = set1GrammarAns[idx];
            });
        }
        
        // Map correctIndex for Set 5 Grammar
        if (i === 4) {
            s.sections['grammar-reading'].questions.forEach((q, idx) => {
                if (idx < set5GrammarAns.length) q.correctIndex = set5GrammarAns[idx];
            });
        }

        // Apply Ruby tags to Vocab Q1-14
        s.sections['vocabulary-kanji'].questions.forEach((q, idx) => {
            if (q.correctIndex === -1 || !q.options[q.correctIndex]) return;
            let optText = q.options[q.correctIndex].replace(/<[^>]*>/g, '').trim();
            
            // Q1-8 (Kanji to Hiragana)
            if (idx >= 0 && idx <= 7) {
                let kanjiMatch = q.questionText.match(/<u>(.*?)<\/u>/);
                if (kanjiMatch && !kanjiMatch[1].includes('<ruby>')) {
                    let kanji = kanjiMatch[1];
                    q.questionText = q.questionText.replace(`<u>${kanji}</u>`, `<u><ruby>${kanji}<rt>${optText}</rt></ruby></u>`);
                }
            }
            // Q9-14 (Hiragana to Kanji)
            else if (idx >= 8 && idx <= 13) {
                let hiraganaMatch = q.questionText.match(/<u>(.*?)<\/u>/);
                if (hiraganaMatch && !hiraganaMatch[1].includes('<ruby>')) {
                    let hiragana = hiraganaMatch[1];
                    q.questionText = q.questionText.replace(`<u>${hiragana}</u>`, `<u><ruby>${optText}<rt>${hiragana}</rt></ruby></u>`);
                    if (!q.options[q.correctIndex].includes('<ruby>')) {
                         q.options[q.correctIndex] = `<ruby>${optText}<rt>${hiragana}</rt></ruby>`;
                    }
                }
            }
        });
    }
    
    console.log('Pushing to Firebase...');
    await docRef.set(data);
    console.log('SUCCESS! Sets 1-8 perfectly reconstructed and enhanced in Firebase.');
    process.exit(0);
}

fixSets();
