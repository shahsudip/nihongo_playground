const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteExtraChapters() {
  console.log("Connecting to Firestore to delete week 5 chapters...");
  const bookId = 'shin-nihongo-500-n2';
  
  const extraChapters = [
    'w5-d1', 'w5-d2', 'w5-d3', 'w5-d4', 'w5-d5', 'w5-d6'
  ];

  for (const chapId of extraChapters) {
    console.log(`Deleting ${chapId}...`);
    try {
      await db.collection('books').doc(bookId).collection('chapters').doc(chapId).delete();
      console.log(`Deleted ${chapId} successfully.`);
    } catch (e) {
      console.error(`Failed to delete ${chapId}:`, e);
    }
  }

  console.log("Done.");
  process.exit(0);
}

deleteExtraChapters();
