const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// 1. Initialize Firebase Admin SDK
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log('Loaded service account configuration from environment variable.');
  } catch (err) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT env variable:', err.message);
  }
}

if (!serviceAccount) {
  const serviceAccountPath = path.join(__dirname, 'service-account.json');
  if (fs.existsSync(serviceAccountPath)) {
    try {
      serviceAccount = require(serviceAccountPath);
      console.log('Loaded service account configuration from service-account.json file.');
    } catch (err) {
      console.error('Error loading service-account.json file:', err.message);
    }
  }
}

if (!serviceAccount) {
  console.error('\n❌ ERROR: Firebase credentials missing!');
  console.error('Please either:');
  console.error('  1. Place your service account private key in "scraper-test/service-account.json"');
  console.error('  2. Set the FIREBASE_SERVICE_ACCOUNT environment variable to the raw JSON string.\n');
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
console.log('Firestore initialized successfully.');

// 2. Read the generated JSON file
const jsonPath = path.join(__dirname, 'shin500_n2.json');
if (!fs.existsSync(jsonPath)) {
  console.error(`❌ ERROR: Could not find shin500_n2.json at ${jsonPath}`);
  process.exit(1);
}

const book = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Loaded book "${book.title}" containing ${book.chapters.length} chapters.`);

// 3. Upload to Firestore
async function uploadBook() {
  try {
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
    });
    
    console.log('Book metadata uploaded successfully.');

    // Write chapters subcollection
    const chaptersColRef = bookDocRef.collection('chapters');
    
    for (let i = 0; i < book.chapters.length; i++) {
      const chapter = book.chapters[i];
      console.log(`[${i + 1}/${book.chapters.length}] Uploading chapter "${chapter.id}" (${chapter.title})...`);
      
      const chapterDocRef = chaptersColRef.doc(chapter.id);
      await chapterDocRef.set({
        id: chapter.id,
        title: chapter.title,
        type: chapter.type,
        description: chapter.description,
        passages: chapter.passages
      });
    }

    console.log('\n🎉 SUCCESS: All data successfully parsed, structured, and saved to Firestore!');
  } catch (err) {
    console.error('❌ Error during Firestore upload:', err);
  }
}

uploadBook();
