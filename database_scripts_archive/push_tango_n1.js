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

async function pushTangoN1() {
  try {
    console.log("Pushing Tango N1 book metadata...");
    
    // 1. Add the book to the main 'books' collection so it appears in the UI list
    const bookMeta = {
      id: "tango_n1",
      title: "Best Tango N1 Goukaku 2600",
      description: "Reading comprehension and vocabulary",
      type: "reading" // or whatever your UI expects
    };
    await db.collection('books').doc('tango_n1').set(bookMeta, { merge: true });

    // 2. Add the topic metadata so it's not a 'ghost' document
    await db.collection('books').doc('tango_n1')
            .collection('topics').doc('topic_01')
            .set({ title: "Topic 1: 食事", id: "topic_01" }, { merge: true });

    // 3. Add the story data to the subcollection
    console.log("Pushing Topic 1, Story 1 data to subcollection...");
    const storyData = JSON.parse(fs.readFileSync(path.join(__dirname, 'topic_1_story_1.json'), 'utf8'));
    
    await db.collection('books').doc('tango_n1')
            .collection('topics').doc('topic_01')
            .collection('stories').doc('story_1')
            .set(storyData, { merge: true });

    console.log('Successfully pushed new book and story to Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error pushing to Firebase:', error);
    process.exit(1);
  }
}

pushTangoN1();
