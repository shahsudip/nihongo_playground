const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

let serviceAccount;
const serviceAccountPath = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
if (fs.existsSync(serviceAccountPath)) {
  serviceAccount = require(serviceAccountPath);
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

const jsonPath = path.join(__dirname, 'power_drill_grammar_data.json');
const book = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

async function uploadSpecific() {
  const targetIds = ['grammar-24', 'grammar-25', 'grammar-26'];
  const chaptersColRef = db.collection('books').doc(book.id).collection('chapters');
  
  for (const chapter of book.chapters) {
    if (targetIds.includes(chapter.id)) {
      console.log(`Uploading ${chapter.id}...`);
      await chaptersColRef.doc(chapter.id).set(chapter, { merge: true });
    }
  }
  console.log('Successfully pushed grammar 24, 25, 26!');
}

uploadSpecific();
