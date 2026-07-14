const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function audit() {
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();
    fs.writeFileSync('current_firebase_dump.json', JSON.stringify(data, null, 2));
    console.log(`Saved ${data.sets.length} sets to current_firebase_dump.json`);
    process.exit(0);
}

audit();
