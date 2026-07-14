const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixRuby() {
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();

    let count = 0;

    for (let i = 0; i < 15; i++) {
        const set = data.sets[i];
        if (!set) continue;
        const vocab = set.sections['vocabulary-kanji'].questions;
        
        // Strip ruby from Q1-30 (indices 0 to 29)
        for (let j = 0; j < 30; j++) {
            let q = vocab[j];
            if (q && q.questionText && q.questionText.includes('<ruby>')) {
                // <ruby>word<rt>furigana</rt></ruby> -> word
                q.questionText = q.questionText.replace(/<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/g, '$1');
                count++;
            }
            if (q && q.options) {
                for (let k = 0; k < q.options.length; k++) {
                    if (q.options[k].includes('<ruby>')) {
                        q.options[k] = q.options[k].replace(/<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/g, '$1');
                    }
                }
            }
        }
    }

    fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(data, null, 2)};\n`);
    await docRef.set(data);
    console.log(`Successfully removed ruby tags from ${count} questions across all sets and uploaded to Firebase!`);
    process.exit(0);
}

fixRuby().catch(console.error);
