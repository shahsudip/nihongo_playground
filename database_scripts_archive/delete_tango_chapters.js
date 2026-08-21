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

async function deleteChapters() {
  try {
    console.log("Deleting 'chapters' subcollection from tango_n1...");
    
    // 1. Delete the stories subcollection inside chapters
    await db.collection('books').doc('tango_n1')
            .collection('chapters').doc('topic_01')
            .collection('stories').doc('story_1')
            .delete();
            
    // 2. Delete the topic_01 document inside chapters
    await db.collection('books').doc('tango_n1')
            .collection('chapters').doc('topic_01')
            .delete();

    console.log("Successfully deleted 'chapters' collection artifacts from tango_n1!");
    process.exit(0);
  } catch (err) {
    console.error("Error deleting chapters:", err);
    process.exit(1);
  }
}

deleteChapters();
