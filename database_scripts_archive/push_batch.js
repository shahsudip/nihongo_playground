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

const RAW_DIR = path.join(__dirname, 'src', 'data', 'tango_n1_raw');

async function pushBatch() {
  try {
    const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
    console.log(`Found ${files.length} JSON files to push.`);

    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(RAW_DIR, file), 'utf8'));
      if (!data.is_story) continue;

      // Clean up for UI
      delete data.is_story;
      const storyId = `story_${file.replace('.json', '')}`;
      
      console.log(`Pushing ${file} as ${storyId} to topic_01...`);
      await db.collection('books').doc('tango_n1')
              .collection('topics').doc('topic_01')
              .collection('stories').doc(storyId)
              .set(data, { merge: true });
    }

    console.log('Successfully pushed all stories to Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error pushing to Firebase:', error);
    process.exit(1);
  }
}

pushBatch();
