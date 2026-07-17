// nihongo power drill/push_power_drill_n2.cjs
const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// 1. Initialize Firebase Admin SDK
let serviceAccount;

const serviceAccountPath = 'D:\\sudip_software\\nihongo_playground\\scraper-test\\service-account.json';
if (fs.existsSync(serviceAccountPath)) {
  try {
    serviceAccount = require(serviceAccountPath);
    console.log('Loaded service account configuration from service-account.json.');
  } catch (err) {
    console.error('Error loading service-account.json file:', err.message);
  }
}

if (!serviceAccount) {
  console.error('\n❌ ERROR: Firebase credentials missing!');
  console.error('Please ensure your service account key is in "scraper-test/service-account.json"\n');
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });
console.log('Firestore initialized successfully.');

// 2. Read the N2 JSON file
const jsonPath = path.join(__dirname, '..', 'power_drill_n1_data.json');
if (!fs.existsSync(jsonPath)) {
  console.error(`❌ ERROR: ${jsonPath} not found!`);
  process.exit(1);
}

const book = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Loaded book "${book.title}" containing ${book.chapters ? book.chapters.length : 0} chapters.`);

// 3. Upload to Firestore
async function uploadBook() {
  try {
    if (!book.id) {
      throw new Error("Book ID is required in JSON.");
    }
    const bookId = book.id;
    console.log(`Uploading book metadata for "${bookId}"...`);

    // Write book metadata doc
    const bookDocRef = db.collection('books').doc(bookId);
    await bookDocRef.set({
      id: book.id,
      title: book.title,
      description: book.description,
      level: book.level,
      category: book.category
    }, { merge: true });

    // Write chapters subcollection
    const chaptersColRef = bookDocRef.collection('chapters');

    for (let i = 0; i < book.chapters.length; i++) {
      const chapter = book.chapters[i];
      console.log(`[${i + 1}/${book.chapters.length}] Uploading chapter "${chapter.id}" (${chapter.title})...`);

      const chapterDocRef = chaptersColRef.doc(chapter.id);
      await chapterDocRef.set(chapter);
    }

    console.log('\n🎉 SUCCESS: N2 Book data uploaded and saved to Firestore!');
  } catch (err) {
    console.error('❌ Error during Firestore upload:', err);
  }
}

uploadBook();
