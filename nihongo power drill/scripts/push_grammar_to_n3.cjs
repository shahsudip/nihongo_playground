const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
const serviceAccount = require(serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

async function pushToN3() {
  const chaptersColRef = db.collection('books').doc('nihongo-power-drill-n3').collection('chapters');

  // Read the grammar data
  const jsonPath = path.join(__dirname, 'power_drill_grammar_data.json');
  const grammarBook = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const args = process.argv.slice(2);
  const targetChapters = args.length > 0 ? args : null;

  for (const chapter of grammarBook.chapters) {
    if (targetChapters && !targetChapters.includes(chapter.id)) {
      continue;
    }

    if (chapter.id.startsWith('grammar-') || chapter.id.startsWith('grammar-training-')) {
      const chapterDocRef = chaptersColRef.doc(chapter.id);
      
      // Clean up old document to remove old schema completely
      await chapterDocRef.delete();
      
      // Upload new chapter
      await chapterDocRef.set(chapter);
      console.log(`Uploaded ${chapter.id} to nihongo-power-drill-n3`);
    }
  }

  if (targetChapters) {
    console.log(`Successfully pushed selected grammar drills: ${targetChapters.join(', ')}`);
  } else {
    console.log("Successfully pushed all grammar drills to nihongo-power-drill-n3.");
  }
}

pushToN3();
