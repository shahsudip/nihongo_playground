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

async function wipeAll() {
  try {
    for (let i = 1; i <= 14; i++) {
      const topicId = `topic_${i.toString().padStart(2, '0')}`;
      const storiesRef = db.collection('books').doc('tango_n1').collection('topics').doc(topicId).collection('stories');
      const snap = await storiesRef.get();
      if (!snap.empty) {
        let batch = db.batch();
        snap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log(`Wiped ${topicId}`);
      }
    }
    console.log("Successfully wiped all old stories!");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
wipeAll();
