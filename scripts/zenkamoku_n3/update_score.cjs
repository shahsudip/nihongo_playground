const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');

const serviceAccount = require(path.join(__dirname, '..', '..', 'scraper-test', 'service-account.json'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function fix() {
  const usersSnap = await db.collection('users').get();
  let updated = false;
  for (const userDoc of usersSnap.docs) {
    const historyRef = db.collection('users').doc(userDoc.id).collection('quizHistory').doc('zenkamoku-n3-best-workbook-w01-d01');
    const historySnap = await historyRef.get();
    
    if (historySnap.exists) {
      const data = historySnap.data();
      console.log(`Found history for user ${userDoc.id}. Current score: ${data.score}/${data.total}`);
      
      await historyRef.update({
        score: 11,
        total: 14,
        answered: 14
      });
      console.log('Successfully updated score to 11/14.');
      updated = true;
    }
  }
  
  if (!updated) {
    console.log("No matching quiz history found to update.");
  }
}

fix();
