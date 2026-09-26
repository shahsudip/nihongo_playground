const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

async function run() {
  const docId = '138_1';
  const topicId = 'topic_09';

  await db.collection('books').doc('tango_n3')
    .collection('topics').doc(topicId)
    .collection('stories').doc(docId)
    .delete();
    
  // Delete local file
  const localPath = path.join(__dirname, 'src', 'data', 'tango_n3_raw', `${docId}.json`);
  if (fs.existsSync(localPath)) {
    fs.unlinkSync(localPath);
  }
  
  console.log(`Deleted ${docId} from Firebase and locally!`);
}

run().catch(console.error);
