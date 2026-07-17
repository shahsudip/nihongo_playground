const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const serviceAccountPath = 'D:\\sudip_software\\nihongo_playground\\scraper-test\\service-account.json';
const serviceAccount = require(serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function deleteExtraBook() {
  const bookRef = db.collection('books').doc('nihongo-power-drill-n3-grammar');
  const chaptersRef = bookRef.collection('chapters');
  
  const chapters = await chaptersRef.get();
  const batch = db.batch();
  
  chapters.forEach(doc => {
    batch.delete(doc.ref);
  });
  
  batch.delete(bookRef);
  
  await batch.commit();
  console.log("Completely deleted the extra grammar book and all its chapters from Firebase.");
  process.exit(0);
}

deleteExtraBook().catch(console.error);
