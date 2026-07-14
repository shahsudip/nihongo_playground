import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { practiceSetsBook } from './src/data/practice_sets_data.js';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function upload() {
    await db.collection('books').doc(practiceSetsBook.id).set(practiceSetsBook);
    console.log("Successfully uploaded to Firebase!");
}

upload().catch(console.error);
