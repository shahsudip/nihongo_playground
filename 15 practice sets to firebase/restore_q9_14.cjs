const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function restore() {
    const currentData = JSON.parse(fs.readFileSync('src/data/practice_sets_data.js', 'utf8').replace('export const practiceSetsBook = ', '').replace(/;\s*$/, ''));
    const sourceData = JSON.parse(fs.readFileSync('fixed_firebase_dump.json', 'utf8'));

    let restoredCount = 0;

    for (let i = 0; i < 15; i++) {
        if (!currentData.sets[i] || !sourceData.sets[i]) continue;
        const currentVocab = currentData.sets[i].sections['vocabulary-kanji'].questions;
        const sourceVocab = sourceData.sets[i].sections['vocabulary-kanji'].questions;
        
        for (let j = 8; j < 14; j++) {
            let curQ = currentVocab[j];
            let srcQ = sourceVocab[j];
            
            if (curQ && srcQ) {
                let rtMatch = srcQ.questionText.match(/<ruby>.*?<rt>(.*?)<\/rt><\/ruby>/);
                if (rtMatch) {
                    let hiragana = rtMatch[1];
                    curQ.questionText = curQ.questionText.replace(/<u>.*?<\/u>/, `<u>${hiragana}</u>`);
                    restoredCount++;
                } else {
                    let uMatch = srcQ.questionText.match(/<u>(.*?)<\/u>/);
                    if (uMatch && !uMatch[1].includes('<ruby>')) {
                        let text = uMatch[1];
                        curQ.questionText = curQ.questionText.replace(/<u>.*?<\/u>/, `<u>${text}</u>`);
                    }
                }
            }
        }
    }

    fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(currentData, null, 2)};\n`);
    await db.collection('books').doc('jlpt-n3-practice-sets').set(currentData);
    console.log(`Successfully restored ${restoredCount} Q9-14 questions and pushed to Firebase!`);
    process.exit(0);
}

restore().catch(console.error);
