const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require('./scraper-test/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function check() {
  const doc = await db.collection('books').doc('nihongo-power-drill-n3').collection('chapters').doc('vocab-24').get();
  if (!doc.exists) {
    console.log('Document not found');
  } else {
    const data = doc.data();
    console.log(Object.keys(data));
  }
  process.exit(0);
}

check();
