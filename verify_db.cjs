const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const sa = require('./scraper-test/service-account.json');

initializeApp({credential: cert(sa)});
const db = getFirestore();

const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
const collections = ['kanjilist', 'grammarlist', 'vocablist'];

async function check() {
  console.log("Starting DB Verification...");
  let allGood = true;
  for (const lvl of levels) {
    for (const col of collections) {
      try {
        const snap = await db.collection('JLPT-matome').doc(lvl).collection(col).count().get();
        const count = snap.data().count;
        console.log(`${lvl} ${col}: ${count} items`);
        if (count === 0 && lvl !== 'N1') { // N1 might still be running
           console.log(`WARNING: ${lvl} ${col} is empty!`);
           allGood = false;
        }
      } catch (e) {
        console.log(`Error checking ${lvl} ${col}:`, e.message);
        allGood = false;
      }
    }
  }
  console.log("Verification Complete. All Good?", allGood);
  process.exit(0);
}
check();
