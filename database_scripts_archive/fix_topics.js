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

async function fixTopics() {
  try {
    const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
    console.log(`Found ${files.length} JSON files to process.`);

    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(RAW_DIR, file), 'utf8'));
      if (!data.is_story) continue;

      const storyId = `story_${file.replace('.json', '')}`;
      const imgNum = parseInt(file.replace('.json', ''));
      
      const topicMatch = data.title ? data.title.match(/Topic\s*(\d+)/i) : null;
      let tNum = 1;
      if (topicMatch) {
        tNum = parseInt(topicMatch[1]);
      } else if (imgNum >= 24 && imgNum <= 33) { tNum = 2; }
      else if (imgNum >= 34 && imgNum <= 44) { tNum = 3; }
      else if (imgNum >= 45 && imgNum <= 55) { tNum = 4; }
      
      const topicId = `topic_${tNum.toString().padStart(2, '0')}`;
      const topicTitle = data.title || `Topic ${tNum}`;

      delete data.is_story;
      
      // Delete from topic_01 if it doesn't belong there
      if (topicId !== 'topic_01') {
        console.log(`Deleting ${storyId} from topic_01...`);
        await db.collection('books').doc('tango_n1').collection('topics').doc('topic_01').collection('stories').doc(storyId).delete();
      }

      // Ensure topic doc exists
      await db.collection('books').doc('tango_n1').collection('topics').doc(topicId).set({
        id: topicId,
        title: topicTitle
      }, { merge: true });
      
      console.log(`Pushing ${storyId} to ${topicId}...`);
      await db.collection('books').doc('tango_n1')
              .collection('topics').doc(topicId)
              .collection('stories').doc(storyId)
              .set(data, { merge: true });
    }

    console.log('Successfully fixed and re-pushed all topics to Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error pushing to Firebase:', error);
    process.exit(1);
  }
}

fixTopics();
