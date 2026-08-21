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

async function checkAll() {
  try {
    const booksSnap = await db.collection('books').get();
    for (const book of booksSnap.docs) {
      console.log(`\nBook: ${book.id}`);
      
      const chaptersSnap = await db.collection('books').doc(book.id).collection('chapters').get();
      console.log(`  - chapters: ${chaptersSnap.size}`);
      
      const topicsSnap = await db.collection('books').doc(book.id).collection('topics').get();
      console.log(`  - topics: ${topicsSnap.size}`);
    }
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

checkAll();
