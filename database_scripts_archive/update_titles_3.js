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

const titles = {
  "topic_18": "Topic 18: 仕事",
  "topic_19": "Topic 19: 人生"
};

async function update() {
  try {
    for (const [id, title] of Object.entries(titles)) {
      await db.collection('books').doc('tango_n1').collection('topics').doc(id).set({
        id: id,
        title: title
      }, { merge: true });
      console.log(`Updated ${id} to ${title}`);
    }
    console.log("Titles for 18, 19 updated successfully!");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
update();
