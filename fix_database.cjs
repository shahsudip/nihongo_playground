const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase
const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
const serviceAccount = require(serviceAccountPath);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixDatabase() {
  const jsonPath = path.join(__dirname, 'nihongo power drill', 'power_drill_data.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  let modified = false;
  const chaptersToDelete = [];

  for (let i = 0; i < data.chapters.length; i++) {
    const ch = data.chapters[i];
    if (ch.id.startsWith('chapter-')) {
      chaptersToDelete.push(ch.id);
      ch.id = ch.id.replace('chapter-', 'grammar-');
      modified = true;
      console.log(`Renamed in JSON: ${chaptersToDelete[chaptersToDelete.length-1]} -> ${ch.id}`);
    }
  }

  if (modified) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log('Saved updated power_drill_data.json');
  } else {
    console.log('No chapter- entries found in JSON.');
  }

  // Delete from Firestore
  const chaptersRef = db.collection('books').doc('nihongo-power-drill-n3').collection('chapters');
  
  // also check firebase directly just in case
  const snapshot = await chaptersRef.get();
  const firestoreDocsToDelete = [];
  snapshot.forEach(doc => {
    if (doc.id.startsWith('chapter-')) {
      firestoreDocsToDelete.push(doc.id);
    }
  });

  for (const docId of firestoreDocsToDelete) {
    await chaptersRef.doc(docId).delete();
    console.log(`Deleted ${docId} from Firestore.`);
  }

  console.log('Database fix complete.');
}

fixDatabase().catch(console.error);
