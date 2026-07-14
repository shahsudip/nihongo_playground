const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function cleanPassage() {
    const data = JSON.parse(fs.readFileSync('src/data/practice_sets_data.js', 'utf8').replace('export const practiceSetsBook = ', '').replace(/;\s*$/, ''));
    
    let cleanedCount = 0;

    data.sets.forEach((set) => {
        ['vocabulary-kanji', 'grammar-reading'].forEach(sec => {
            if (!set.sections[sec] || !set.sections[sec].questions) return;
            set.sections[sec].questions.forEach((q) => {
                if (q.passageText) {
                    let oldText = q.passageText;
                    // Remove trailing `---`, `**選択肢**`, or `選択肢` and any surrounding whitespace
                    q.passageText = q.passageText.replace(/(?:\s*-{3,}\s*|\s*\*\*選択肢\*\*\s*|\s*選択肢\s*)+$/g, '').trim();
                    if (oldText !== q.passageText) {
                        cleanedCount++;
                    }
                }
            });
        });
    });

    fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(data, null, 2)};\n`);
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log(`Successfully cleaned ${cleanedCount} passageTexts and pushed to Firebase!`);
    process.exit(0);
}

cleanPassage().catch(console.error);
