const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, '..', '..', 'scraper-test', 'service-account.json');
const serviceAccount = require(serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

async function pushVocab() {
  const chaptersColRef = db.collection('books').doc('nihongo-power-drill-n3').collection('chapters');

  // Read the vocab data
  const jsonPath = path.join(__dirname, '..', 'power_drill_data.json');
  const vocabBook = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const args = process.argv.slice(2);
  const targetChapters = args.length > 0 ? args : null;

  for (const chapter of vocabBook.chapters) {
    if (targetChapters && !targetChapters.includes(chapter.id)) {
      continue;
    }

    if (chapter.id.startsWith('vocab-')) {
      const chapterDocRef = chaptersColRef.doc(chapter.id);
      
      // Clean up old document to remove old schema completely
      await chapterDocRef.delete();
      
      // Upload new chapter
      await chapterDocRef.set(chapter);
      console.log(`Uploaded ${chapter.id} to nihongo-power-drill-n3`);
    }
  }

  if (targetChapters) {
    console.log(`Successfully pushed selected vocab drills: ${targetChapters.join(', ')}`);
  } else {
    console.log("Successfully pushed all vocab drills to nihongo-power-drill-n3.");
  }
}

pushVocab();
