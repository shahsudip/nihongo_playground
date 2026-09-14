const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'scraper-test', 'service-account.json'), 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function revert() {
    const data = JSON.parse(fs.readFileSync('current_firebase_dump.json', 'utf8'));
    await db.collection('books').doc('jlpt-n3-practice-sets').set(data);
    console.log("✅ REVERTED: Restored original current_firebase_dump.json to Firebase!");
    process.exit(0);
}

revert().catch(console.error);
