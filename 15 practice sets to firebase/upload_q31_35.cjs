const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function upload() {
    const data = JSON.parse(fs.readFileSync('fixed_q31_35.json', 'utf8'));
    
    // Also overwrite local JS file
    fs.writeFileSync('src/data/practice_sets_data.js', `export const practiceSetsBook = ${JSON.stringify(data, null, 2)};\n`);
    
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log("Successfully uploaded fixed_q31_35.json to Firebase and updated local file!");
    process.exit(0);
}

upload().catch(console.error);
