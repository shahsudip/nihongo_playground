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

async function cleanAndPush() {
  const chaptersColRef = db.collection('books').doc('nihongo-power-drill-n3').collection('chapters');

  // 1. Delete the bad "grammar-drill-X" documents
  for (let i = 16; i <= 23; i++) {
    await chaptersColRef.doc(`grammar-drill-${i}`).delete();
    console.log(`Deleted grammar-drill-${i}`);
  }

  // 2. Read local data
  const jsonPath = path.join(__dirname, 'power_drill_data.json');
  const book = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 3. Overwrite grammar-16 through 23 WITHOUT merge
  for (const chapter of book.chapters) {
    if (chapter.id.startsWith('grammar-') && !chapter.id.startsWith('grammar-training-')) {
      const num = parseInt(chapter.id.split('-')[1]);
      if (num >= 16 && num <= 23) {
        // Delete the old one completely to remove 'mondai_1', 'mondai_2', etc.
        await chaptersColRef.doc(chapter.id).delete();
        console.log(`Deleted dirty ${chapter.id}`);
        
        // Write the fresh clean version
        await chaptersColRef.doc(chapter.id).set(chapter);
        console.log(`Uploaded clean ${chapter.id}`);
      }
    }
  }

  console.log("Cleanup and push finished successfully.");
}

cleanAndPush();
