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

async function deleteOldReviews() {
  const chaptersColRef = db.collection('books').doc('nihongo-power-drill-n3').collection('chapters');
  
  const oldIds = [
    'vocab-5-review-1',
    'vocab-10-review-2',
    'vocab-15-review-3',
    'vocab-20-review-4',
    'vocab-25-review-5'
  ];

  for (const id of oldIds) {
    try {
      await chaptersColRef.doc(id).delete();
      console.log(`Deleted old duplicate review: ${id}`);
    } catch (err) {
      console.error(`Error deleting ${id}:`, err);
    }
  }
}

deleteOldReviews();
