const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('../scraper-test/service-account.json', 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function resetShinkanzen() {
  const usersSnap = await db.collection('users').get();
  let count = 0;
  
  for (const userDoc of usersSnap.docs) {
    const historyCol = db.collection('users').doc(userDoc.id).collection('quizHistory');
    const historySnap = await historyCol.get();
    
    for (const doc of historySnap.docs) {
      if (doc.id.startsWith('shinkanzen-master')) {
        await doc.ref.delete();
        count++;
      }
    }
  }
  console.log(`Deleted ${count} Shinkanzen history records!`);
  process.exit(0);
}

resetShinkanzen();
