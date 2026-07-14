const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function upload() {
    const data = JSON.parse(fs.readFileSync('fixed_firebase_dump.json', 'utf8'));
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log("Successfully uploaded fixed_firebase_dump.json to Firebase!");
    process.exit(0);
}

upload().catch(console.error);
