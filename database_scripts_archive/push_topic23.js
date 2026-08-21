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
const BOOK_ID = 'tango_n1';
const TOPIC_ID = 'topic_23';
const TOPIC_TITLE = 'Topic 23: 産業';

async function pushTopic23() {
  try {
    // 1. Ensure the topic metadata doc exists (used for topic title in the reader)
    await db.collection('books').doc(BOOK_ID)
            .collection('topics').doc(TOPIC_ID)
            .set({ id: TOPIC_ID, title: TOPIC_TITLE }, { merge: true });
    console.log(`Topic doc ${TOPIC_ID} set.`);

    // 2. Collect only the Topic 23 story files (title === "Topic 23")
    const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
    const topicFiles = [];
    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(RAW_DIR, file), 'utf8'));
      if (data.title === 'Topic 23') {
        topicFiles.push({ file, data });
      }
    }
    topicFiles.sort((a, b) => (a.data.story_number || 0) - (b.data.story_number || 0));
    console.log(`Found ${topicFiles.length} Topic 23 story files to push.`);

    // 3. Push each story to books/tango_n1/topics/topic_23/stories/{storyId}
    for (const { file, data } of topicFiles) {
      delete data.is_story;
      const storyId = `story_${file.replace('.json', '')}`;
      await db.collection('books').doc(BOOK_ID)
              .collection('topics').doc(TOPIC_ID)
              .collection('stories').doc(storyId)
              .set(data, { merge: true });
      console.log(`  pushed ${file} -> ${storyId} (story_number ${data.story_number})`);
    }

    console.log('Successfully pushed Topic 23 stories to Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error pushing Topic 23 to Firebase:', error);
    process.exit(1);
  }
}

pushTopic23();
