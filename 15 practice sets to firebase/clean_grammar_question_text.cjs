const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function cleanGrammar() {
    const data = JSON.parse(fs.readFileSync('src/data/practice_sets_data.js', 'utf8').replace('export const practiceSetsBook = ', '').replace(/;\s*$/, ''));
    
    let cleanedCount = 0;

    data.sets.forEach((set) => {
        const grammar = set.sections['grammar-reading'].questions;
        for (let i = 18; i < 23; i++) {
            if (grammar[i]) {
                if (grammar[i].questionText !== "") {
                    grammar[i].questionText = "";
                    cleanedCount++;
                }
            }
        }
    });

    fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(data, null, 2)};\n`);
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log(`Successfully cleaned ${cleanedCount} grammar questionTexts and pushed to Firebase!`);
    process.exit(0);
}

cleanGrammar().catch(console.error);
