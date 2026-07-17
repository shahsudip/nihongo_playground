const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, '..', 'scraper-test', 'service-account.json');
const serviceAccount = require(serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

async function pushPerfect16() {
  const jsonPath = path.join(__dirname, 'grammar_16_perfect.json');
  const chapterData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const chapterDocRef = db.collection('books').doc('nihongo-power-drill-n3').collection('chapters').doc('grammar-16');
  
  // We overwrite completely
  await chapterDocRef.set(chapterData);
  console.log(`Successfully uploaded perfect ${chapterData.id} to Firestore!`);

  // Also update power_drill_data.json locally so the local DB is in sync
  const mainDbPath = path.join(__dirname, 'power_drill_data.json');
  const mainDb = JSON.parse(fs.readFileSync(mainDbPath, 'utf8'));
  
  const existingIdx = mainDb.chapters.findIndex(c => c.id === 'grammar-16');
  if (existingIdx !== -1) {
    mainDb.chapters[existingIdx] = chapterData;
  } else {
    mainDb.chapters.push(chapterData);
  }
  
  fs.writeFileSync(mainDbPath, JSON.stringify(mainDb, null, 2), 'utf8');
  console.log('Successfully updated local power_drill_data.json');
}

pushPerfect16();
