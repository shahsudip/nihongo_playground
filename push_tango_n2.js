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

async function pushTangoN2() {
  try {
    console.log("Pushing Tango N2 book metadata...");
    
    // 1. Set main book doc
    const bookMeta = {
      id: "tango_n2",
      title: "Best Tango N2 Goukaku 2500",
      description: "Reading comprehension and vocabulary for N2",
      level: "N2",
      category: "Vocabulary & Reading",
      type: "reading"
    };
    await db.collection('books').doc('tango_n2').set(bookMeta, { merge: true });

    // 2. Read all extracted story json files
    const n2Dir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
    const files = fs.readdirSync(n2Dir).filter(f => f.endsWith('.json'));

    console.log(`Found ${files.length} extracted files for N2.`);

    for (const file of files) {
      const filePath = path.join(n2Dir, file);
      const storyData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const docId = file.replace('.json', '');
      const topicTitle = storyData.title || "Topic 1";
      
      // Dynamically extract topic number from title string, e.g. "Topic 2" -> "topic_02"
      let topicId = "topic_01";
      const topicMatch = topicTitle.match(/Topic\s*(\d+)/i);
      if (topicMatch) {
        topicId = `topic_${topicMatch[1].padStart(2, '0')}`;
      }

      await db.collection('books').doc('tango_n2')
              .collection('topics').doc(topicId)
              .set({ title: topicTitle, id: topicId }, { merge: true });

      await db.collection('books').doc('tango_n2')
              .collection('topics').doc(topicId)
              .collection('stories').doc(docId)
              .set(storyData, { merge: true });

      console.log(`Pushed story ${docId} to Firebase`);
    }

    console.log('Successfully pushed available N2 stories to Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error pushing to Firebase:', error);
    process.exit(1);
  }
}

pushTangoN2();
