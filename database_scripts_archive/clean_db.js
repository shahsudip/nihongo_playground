import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function cleanDB() {
  try {
    console.log("Deleting story_135 from topic_01...");
    await db.collection('books').doc('tango_n1').collection('topics').doc('topic_01').collection('stories').doc('story_135').delete();
    console.log("Successfully cleaned DB!");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
cleanDB();
