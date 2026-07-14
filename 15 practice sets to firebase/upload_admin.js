import { readFileSync } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { practiceSetsBook } from './src/data/practice_sets_data.js';

// Initialize Firebase Admin using the service account key
const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function uploadData() {
  try {
    console.log("Starting secure admin upload...");
    
    // Delete the old one from 'practiceBooks'
    const oldDocRef = db.collection('practiceBooks').doc(practiceSetsBook.id);
    await oldDocRef.delete();
    console.log("Deleted old document from 'practiceBooks'.");
    
    // Write to 'books'
    const docRef = db.collection('books').doc(practiceSetsBook.id);
    await docRef.set(practiceSetsBook);
    
    console.log("Successfully pushed practiceSetsBook to 'books/jlpt-n3-practice-sets'!");
    process.exit(0);
  } catch (error) {
    console.error("Error writing document: ", error);
    process.exit(1);
  }
}

uploadData();
