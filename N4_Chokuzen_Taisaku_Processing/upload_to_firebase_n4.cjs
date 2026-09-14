const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('Service account key not found at:', serviceAccountPath);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function uploadN4Book() {
  const dumpPath = path.join(__dirname, 'n4_firebase_dump.json');
  if (!fs.existsSync(dumpPath)) {
    console.error('n4_firebase_dump.json not found at:', dumpPath);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
  console.log(`Uploading N4 Chokuzen Taisaku (${data.sets.length} sets, total ${data.sets.reduce((a, s) => a + (s.sections['vocabulary-kanji']?.questions?.length || 0) + (s.sections['grammar-reading']?.questions?.length || 0), 0)} questions) to Firestore...`);

  await db.collection('books').doc('chokuzen-taisaku-n4').set(data);
  console.log(' Successfully uploaded to Firestore: books/chokuzen-taisaku-n4');
  process.exit(0);
}

uploadN4Book().catch((err) => {
  console.error('Upload failed:', err);
  process.exit(1);
});
