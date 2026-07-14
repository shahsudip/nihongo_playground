// nihongo power drill/push_power_drill.cjs
const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// 1. Initialize Firebase Admin SDK
let serviceAccount;

const serviceAccountPath = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
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
console.log('Firestore initialized successfully.');

// 2. Read the generated JSON file
const jsonPath = path.join(__dirname, 'power_drill_data.json');
if (!fs.existsSync(jsonPath)) {
  console.log('Creating a template power_drill_data.json file since it does not exist...');
  const template = {
    id: "nihongo-power-drill-n3",
    title: "Nihongo Power Drill N3",
    description: "Improve your vocabulary, kanji, and grammar for the JLPT N3 with comprehensive drills.",
    level: "N3",
    category: "Drill",
    chapters: []
  };
  fs.writeFileSync(jsonPath, JSON.stringify(template, null, 2));
  console.log(`Please ask the AI to extract questions from your screenshot and update ${jsonPath} first.`);
  process.exit(0);
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
    
    // Clean up old drill-1 if it exists
    await bookDocRef.collection('chapters').doc('drill-1').delete();

    // Write chapters subcollection
    const chaptersColRef = bookDocRef.collection('chapters');
    
    for (let i = 0; i < book.chapters.length; i++) {
      const chapter = book.chapters[i];
      console.log(`[${i + 1}/${book.chapters.length}] Uploading chapter "${chapter.id}" (${chapter.title})...`);
      
      const chapterDocRef = chaptersColRef.doc(chapter.id);
      await chapterDocRef.set({
        id: chapter.id,
        title: chapter.title,
        type: chapter.type || "questions-only",
        description: chapter.description || `${chapter.title} practice drills.`,
        passages: chapter.passages
      }, { merge: true });
    }

    console.log('\n🎉 SUCCESS: Book data uploaded and saved to Firestore!');
  } catch (err) {
    console.error('❌ Error during Firestore upload:', err);
  }
}

uploadBook();
