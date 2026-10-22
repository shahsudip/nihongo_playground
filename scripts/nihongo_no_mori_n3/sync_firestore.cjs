const fs = require('fs');
const path = require('path');

const BOOK_ID = 'nihongo-no-mori-n3';
const DATA_DIR = path.resolve(__dirname, '..', '..', 'src', 'data', 'nihongo_no_mori_n3');
const CONFIRM_FLAG = '--confirm-upload';

const SECTION_FILES = [
  ['ch1-m1', 'ch1_mondai1_kanji_reading.json'],
  ['ch1-m2', 'ch1_mondai2_hyouki.json'],
  ['ch1-m3', 'ch1_mondai3_context.json'],
  ['ch1-m4', 'ch1_mondai4_synonyms.json'],
  ['ch1-m5', 'ch1_mondai5_usage.json'],
  ['ch2-lessons', 'ch2_grammar_lessons.json'],
  ['ch2-sec1', 'ch2_sec1_grammar_reason.json'],
  ['ch2-sec2', 'ch2_sec2_grammar_situation.json'],
  ['ch2-sec3', 'ch2_sec3_grammar_standpoint.json'],
  ['ch2-sec4', 'ch2_sec4_grammar_contrast.json'],
  ['ch2-sec5', 'ch2_sec5_grammar_degree.json'],
  ['ch3-tanbun', 'ch3_dokkai_tanbun.json'],
  ['ch3-chubun', 'ch3_dokkai_chubun.json'],
  ['ch3-chobun', 'ch3_dokkai_chobun.json'],
  ['ch3-kensaku', 'ch3_dokkai_kensaku.json'],
  ['ch4-kadai', 'ch4_sec1_kadai.json'],
  ['ch4-point', 'ch4_sec2_point.json'],
  ['ch4-gaiyou', 'ch4_sec3_gaiyou.json'],
  ['ch4-hatsuwa', 'ch4_sec4_hatsuwa.json'],
  ['ch4-sokuji', 'ch4_sec5_sokuji.json'],
];

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8'));
}

function isScoredQuestion(question) {
  return question?.questionNumber !== '例'
    && !String(question?.id || '').endsWith('-ex');
}

function getQuestions(data) {
  if (Array.isArray(data.pages)) {
    return data.pages.flatMap((page) => page.questions || []);
  }
  if (Array.isArray(data.passages)) {
    return data.passages.flatMap((passage) => (
      passage.questions || (passage.question ? [passage.question] : [])
    ));
  }
  return [];
}

function loadGeneratedData() {
  const book = readJson('book.json');
  const chapters = SECTION_FILES.map(([id, fileName]) => ({ id, data: readJson(fileName) }));
  const trackable = chapters.filter((chapter) => getQuestions(chapter.data).length > 0);
  const scoredQuestionCount = trackable.reduce((total, chapter) => (
    total + getQuestions(chapter.data).filter(isScoredQuestion).length
  ), 0);

  if (
    book.id !== BOOK_ID
    || chapters.length !== 20
    || trackable.length !== 19
    || scoredQuestionCount !== book.totalQuestions
  ) {
    throw new Error('Generated Nihongo no Mori data failed count validation.');
  }

  return { book, chapters, scoredQuestionCount };
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
  const { book, chapters, scoredQuestionCount } = loadGeneratedData();
  if (!process.argv.includes(CONFIRM_FLAG)) {
    console.log(`Dry run only: ${BOOK_ID}, ${chapters.length} content documents, ${scoredQuestionCount} scored questions.`);
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
  const { FieldValue, getFirestore } = require('firebase-admin/firestore');
  if (!getApps().length) initializeApp({ credential: cert(credential), projectId });
  const database = getFirestore();
  const batch = database.batch();
  const bookReference = database.collection('books').doc(BOOK_ID);
  batch.set(bookReference, { ...book, syncedAt: FieldValue.serverTimestamp() });
  chapters.forEach((chapter) => {
    batch.set(bookReference.collection('chapters').doc(chapter.id), chapter);
  });
  await batch.commit();
  console.log(`Uploaded ${BOOK_ID} metadata and ${chapters.length} content documents to project ${projectId}.`);
}

main().catch((error) => {
  console.error(`Sync failed: ${error.message}`);
  process.exitCode = 1;
});
