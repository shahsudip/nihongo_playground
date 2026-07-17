import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const dataPath = path.join(__dirname, 'nihongo power drill', 'power_drill_grammar_data.json');

async function pushData() {
  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const bookData = JSON.parse(rawData);
    console.log(`Pushing ${bookData.id} to Firestore...`);
    await db.collection('books').doc(bookData.id).set(bookData, { merge: true });
    console.log('Successfully pushed to Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error pushing to Firebase:', error);
    process.exit(1);
  }
}

pushData();
