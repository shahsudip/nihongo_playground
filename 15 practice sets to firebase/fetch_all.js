import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, writeFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fetchAll() {
    try {
        const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
        const docSnap = await docRef.get();
        const data = docSnap.data();
        writeFileSync('all_firebase_sets.json', JSON.stringify(data, null, 2));
        console.log('Saved all sets to all_firebase_sets.json');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
fetchAll();
