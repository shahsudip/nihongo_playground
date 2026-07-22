const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = require('./scraper-test/service-account.json');
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

(async () => {
  const data = JSON.parse(fs.readFileSync('./merged_shinmon_n4_n5.json', 'utf8'));
  const chaptersRef = db.collection('books').doc('shin-nihongo-500-n4-n5').collection('chapters');
  for (const chap of data) {
    await chaptersRef.doc(chap.id).set(chap, { merge: true });
  }
  console.log('Successfully updated Firestore!');
  process.exit(0);
})();
