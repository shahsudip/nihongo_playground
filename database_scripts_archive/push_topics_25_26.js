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

const TOPICS_TO_PUSH = [
  { topicId: 'topic_25', title: 'Topic 25', titleKey: 'Topic 25' },
  { topicId: 'topic_26', title: 'Topic 26', titleKey: 'Topic 26' },
];

async function pushTopics() {
  try {
    const allFiles = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
    const allStories = [];
    for (const file of allFiles) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(RAW_DIR, file), 'utf8'));
        allStories.push({ file, data });
      } catch (e) {
        console.warn(`  ⚠️  Skipping ${file}: parse error`);
      }
    }

    let totalPushed = 0;

    for (const { topicId, title, titleKey } of TOPICS_TO_PUSH) {
      console.log(`\n📦 Processing ${topicId} (${titleKey})...`);

      await db.collection('books').doc(BOOK_ID)
              .collection('topics').doc(topicId)
              .set({ id: topicId, title }, { merge: true });
      console.log(`  ✅ Topic doc set: ${topicId}`);

      const topicFiles = allStories
        .filter(({ data }) => data.title === titleKey)
        .sort((a, b) => (a.data.story_number || 0) - (b.data.story_number || 0));

      console.log(`  Found ${topicFiles.length} stories to push.`);

      for (const { file, data } of topicFiles) {
        const storyData = { ...data };
        delete storyData.is_story;
        const storyId = `story_${file.replace('.json', '')}`;

        await db.collection('books').doc(BOOK_ID)
                .collection('topics').doc(topicId)
                .collection('stories').doc(storyId)
                .set(storyData, { merge: true });

        console.log(`    pushed ${file} -> ${storyId} (story #${storyData.story_number})`);
        totalPushed++;
      }
    }

    console.log(`\n✅ Done! Total stories pushed: ${totalPushed}`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

pushTopics();
