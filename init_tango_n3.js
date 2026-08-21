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

async function initTangoN3() {
  try {
    const bookMeta = {
      id: "tango_n3",
      title: "Best Tango N3 Goukaku 2100",
      description: "Reading comprehension and vocabulary for N3",
      level: "N3",
      category: "Vocabulary & Reading",
      type: "reading"
    };
    await db.collection('books').doc('tango_n3').set(bookMeta, { merge: true });
    console.log('Successfully created tango_n3 book in Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

initTangoN3();
