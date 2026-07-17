import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

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
