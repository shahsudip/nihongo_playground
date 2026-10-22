const fs = require('fs');
const path = require('path');

const BOOK_ID = 'pass-n3-within-20-days';
const DATA_DIR = path.resolve(__dirname, '..', '..', 'src', 'data', 'pass_n3_within_20_days');
const CONFIRM_FLAG = '--confirm-upload';

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8'));
}

function loadGeneratedData() {
  const book = readJson('book.json');
  const chapters = Array.from({ length: 20 }, (_, index) => readJson(`chapter-${index + 1}.json`));
  if (book.id !== BOOK_ID || chapters.length !== 20) {
    throw new Error('Generated book data is incomplete or has the wrong id.');
  }
  chapters.forEach((chapter, index) => {
    if (chapter.id !== `chapter-${index + 1}` || chapter.totalQuestions !== 58) {
      throw new Error(`Invalid generated chapter at position ${index + 1}.`);
    }
  });
  return { book, chapters };
}

function loadCredential() {
  const inlineCredential = process.env.FIREBASE_SERVICE_ACCOUNT;
  const credentialPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (inlineCredential) return JSON.parse(inlineCredential);
  if (credentialPath) {
    const resolved = path.resolve(credentialPath);
    if (!fs.existsSync(resolved)) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS does not point to a file.');
    }
    return JSON.parse(fs.readFileSync(resolved, 'utf8'));
  }
  throw new Error('Set FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS explicitly.');
}

async function main() {
  const { book, chapters } = loadGeneratedData();
  if (!process.argv.includes(CONFIRM_FLAG)) {
    console.log(`Dry run only: ${BOOK_ID}, ${chapters.length} chapters, ${book.totalQuestions} questions.`);
    console.log(`No network writes were made. Add ${CONFIRM_FLAG} to upload.`);
    return;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error('Set FIREBASE_PROJECT_ID explicitly before uploading.');
  const credential = loadCredential();
  if (credential.project_id && credential.project_id !== projectId) {
    throw new Error('FIREBASE_PROJECT_ID does not match the service account project_id.');
  }

  const { cert, getApps, initializeApp } = require('firebase-admin/app');
  const { getFirestore, FieldValue } = require('firebase-admin/firestore');
  if (!getApps().length) initializeApp({ credential: cert(credential), projectId });
  const database = getFirestore();
  const batch = database.batch();
  const bookReference = database.collection('books').doc(BOOK_ID);
  batch.set(bookReference, { ...book, syncedAt: FieldValue.serverTimestamp() }, { merge: true });
  chapters.forEach((chapter) => {
    batch.set(bookReference.collection('chapters').doc(chapter.id), chapter, { merge: true });
  });
  await batch.commit();
  console.log(`Uploaded ${BOOK_ID} metadata and ${chapters.length} chapters to project ${projectId}.`);
}

main().catch((error) => {
  console.error(`Sync failed: ${error.message}`);
  process.exitCode = 1;
});
