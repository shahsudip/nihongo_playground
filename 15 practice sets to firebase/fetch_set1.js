import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, writeFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fetchSet1() {
    try {
        const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
        const docSnap = await docRef.get();
        const data = docSnap.data();
        
        // Find set index 0 (Set 1)
        const set1 = data.sets[0];
        writeFileSync('set1_firebase.json', JSON.stringify(set1, null, 2));
        console.log('Set 1 saved to set1_firebase.json');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
fetchSet1();
