import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function removeSet16() {
    console.log('Fetching from Firebase...');
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();

    console.log('Total sets:', data.sets.length);
    if (data.sets.length > 15) {
        data.sets = data.sets.slice(0, 15);
        console.log('Removing sets beyond 15...');
        await docRef.set(data);
        console.log('SUCCESS: Array resized to 15 sets.');
    } else {
        console.log('No extra sets to remove.');
    }
    process.exit(0);
}

removeSet16();
