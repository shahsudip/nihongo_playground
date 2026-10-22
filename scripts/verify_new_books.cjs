const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FIREBASE_FLAG = '--firebase';
const errors = [];
const warnings = [];

const MORI_SECTION_FILES = [
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, filePath), 'utf8'));
}

function normalize(value) {
  if (value === undefined) return { __undefined: true };
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    if (typeof value.toDate === 'function') return value.toDate().toISOString();
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, normalize(value[key])]));
  }
  return value;
}

function hash(value) {
  return crypto.createHash('sha256').update(JSON.stringify(normalize(value))).digest('hex');
}

function countTag(value, tag, closing = false) {
  const expression = closing ? new RegExp(`</${tag}>`, 'g') : new RegExp(`<${tag}(?:\\s[^>]*)?>`, 'g');
  return (String(value || '').match(expression) || []).length;
}

function inspectStrings(value, location) {
  if (typeof value === 'string') {
    ['ruby', 'rt', 'u', 'b'].forEach((tag) => {
      if (countTag(value, tag) !== countTag(value, tag, true)) {
        errors.push(`${location}: unbalanced ${tag} tag`);
      }
    });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectStrings(item, `${location}[${index}]`));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => inspectStrings(item, `${location}.${key}`));
  }
}

function isScoredQuestion(question) {
  return question?.questionNumber !== '例'
    && !String(question?.id || '').endsWith('-ex');
}

function getMoriQuestions(data) {
  if (Array.isArray(data.pages)) return data.pages.flatMap((page) => page.questions || []);
  if (Array.isArray(data.passages)) {
    return data.passages.flatMap((passage) => (
      passage.questions || (passage.question ? [passage.question] : [])
    ));
  }
  return [];
}

function validateQuestion(question, location, exactOptionCount = null) {
  if (!question.id && question.id !== 0) errors.push(`${location}: missing id`);
  if (!Array.isArray(question.options)) {
    errors.push(`${location}: missing options`);
    return;
  }
  if (exactOptionCount !== null && question.options.length !== exactOptionCount) {
    errors.push(`${location}: expected ${exactOptionCount} options, found ${question.options.length}`);
  }
  if (!String(question.explanation || '').trim()) errors.push(`${location}: missing explanation`);
  inspectStrings(question, location);
}

function validateDrillBook({ id, directory, chapterCount, sectionCount, questionCount }) {
  const base = `src/data/${directory}`;
  const book = readJson(`${base}/book.json`);
  const manifest = readJson(`${base}/manifest.json`);
  const chapters = [];
  const ids = new Set();
  let actualSections = 0;
  let actualQuestions = 0;

  for (let chapterNumber = 1; chapterNumber <= chapterCount; chapterNumber += 1) {
    const chapter = readJson(`${base}/chapter-${chapterNumber}.json`);
    chapters.push(chapter);
    const questions = (chapter.sections || []).flatMap((section) => section.questions || []);
    actualSections += chapter.sections?.length || 0;
    actualQuestions += questions.length;
    if (chapter.id !== `chapter-${chapterNumber}`) errors.push(`${id}: chapter ${chapterNumber} id mismatch`);
    if (chapter.totalQuestions !== questions.length) errors.push(`${id}/${chapter.id}: totalQuestions mismatch`);
    (chapter.sections || []).forEach((section) => {
      if (section.questionCount !== (section.questions || []).length) {
        errors.push(`${id}/${chapter.id}/${section.id}: questionCount mismatch`);
      }
      (section.questions || []).forEach((question) => {
        const location = `${id}/${chapter.id}/${section.id}/${question.id}`;
        validateQuestion(question, location, 4);
        if (ids.has(question.id)) errors.push(`${location}: duplicate question id`);
        ids.add(question.id);
        if (question.correctIndex !== question.correct - 1) errors.push(`${location}: correctIndex mismatch`);
        if (question.options?.[question.correctIndex] !== question.correctOption) errors.push(`${location}: correctOption mismatch`);
      });
    });
  }

  if (book.id !== id) errors.push(`${id}: book id mismatch`);
  if (actualSections !== sectionCount || actualQuestions !== questionCount) {
    errors.push(`${id}: expected ${sectionCount} sections and ${questionCount} questions, found ${actualSections} and ${actualQuestions}`);
  }
  if (
    book.totalChapters !== chapterCount
    || book.totalSections !== sectionCount
    || book.totalQuestions !== questionCount
  ) {
    errors.push(`${id}: book totals mismatch`);
  }
  if (
    manifest.chapterCount !== chapterCount
    || manifest.sectionCount !== sectionCount
    || manifest.questionCount !== questionCount
  ) {
    errors.push(`${id}: manifest totals mismatch`);
  }

  Object.entries(manifest.generatedFiles || {}).forEach(([fileName, expectedHash]) => {
    const actualHash = crypto.createHash('sha256')
      .update(fs.readFileSync(path.join(ROOT, base, fileName)))
      .digest('hex');
    if (actualHash !== expectedHash) errors.push(`${id}: generated hash mismatch for ${fileName}`);
  });
  if (manifest.reviewFlagCount) warnings.push(`${id}: ${manifest.reviewFlagCount} source-review flags remain`);

  return { id, metadata: book, chapters };
}

function validateMoriBook() {
  const base = 'src/data/nihongo_no_mori_n3';
  const book = readJson(`${base}/book.json`);
  const chapters = MORI_SECTION_FILES.map(([id, fileName]) => ({
    id,
    data: readJson(`${base}/${fileName}`),
  }));
  let trackableSections = 0;
  let scoredQuestions = 0;

  chapters.forEach((chapter) => {
    const questions = getMoriQuestions(chapter.data);
    if (questions.length > 0) trackableSections += 1;
    scoredQuestions += questions.filter(isScoredQuestion).length;
    const ids = new Set();
    questions.forEach((question) => {
      const location = `${book.id}/${chapter.id}/${question.id}`;
      validateQuestion(question, location);
      if (ids.has(String(question.id))) errors.push(`${location}: duplicate section-local id`);
      ids.add(String(question.id));
      if (
        !Number.isInteger(question.correct_answer)
        || question.correct_answer < 1
        || question.correct_answer > question.options.length
      ) {
        errors.push(`${location}: invalid correct_answer`);
      }
    });
  });

  if (chapters.length !== 20 || trackableSections !== 19 || scoredQuestions !== 500) {
    errors.push(`${book.id}: expected 20 content documents, 19 trackable sections, and 500 scored questions`);
  }
  if (book.totalSections !== 19 || book.totalQuestions !== 500) {
    errors.push(`${book.id}: book totals mismatch`);
  }

  return { id: book.id, metadata: book, chapters };
}

async function validateFirebase(books) {
  const credentialPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!credentialPath || !projectId) {
    throw new Error('Set GOOGLE_APPLICATION_CREDENTIALS and FIREBASE_PROJECT_ID for Firebase verification.');
  }
  const credential = JSON.parse(fs.readFileSync(path.resolve(credentialPath), 'utf8'));
  if (credential.project_id && credential.project_id !== projectId) {
    throw new Error('FIREBASE_PROJECT_ID does not match the service account project_id.');
  }
  const { cert, getApps, initializeApp } = require('firebase-admin/app');
  const { getFirestore } = require('firebase-admin/firestore');
  if (!getApps().length) initializeApp({ credential: cert(credential), projectId });
  const database = getFirestore();

  for (const book of books) {
    const reference = database.collection('books').doc(book.id);
    const [bookSnapshot, chapterSnapshot] = await Promise.all([
      reference.get(),
      reference.collection('chapters').get(),
    ]);
    if (!bookSnapshot.exists) {
      errors.push(`${book.id}: Firebase root document is missing`);
      continue;
    }
    const remoteMetadata = bookSnapshot.data();
    Object.entries(book.metadata).forEach(([key, value]) => {
      if (hash(remoteMetadata[key]) !== hash(value)) errors.push(`${book.id}: Firebase metadata mismatch at ${key}`);
    });
    const remoteChapters = new Map(chapterSnapshot.docs.map((document) => [document.id, document.data()]));
    if (remoteChapters.size !== book.chapters.length) {
      errors.push(`${book.id}: Firebase chapter count ${remoteChapters.size} does not match ${book.chapters.length}`);
    }
    book.chapters.forEach((chapter) => {
      if (!remoteChapters.has(chapter.id)) {
        errors.push(`${book.id}: Firebase chapter ${chapter.id} is missing`);
      } else if (hash(remoteChapters.get(chapter.id)) !== hash(chapter)) {
        errors.push(`${book.id}: Firebase chapter ${chapter.id} differs from local JSON`);
      }
    });
  }
}

async function main() {
  const books = [
    validateDrillBook({
      id: 'first-time-jlpt-n3-350-kanji',
      directory: 'first_time_n3_350_kanji',
      chapterCount: 7,
      sectionCount: 28,
      questionCount: 280,
    }),
    validateDrillBook({
      id: 'pass-n3-within-20-days',
      directory: 'pass_n3_within_20_days',
      chapterCount: 20,
      sectionCount: 160,
      questionCount: 1160,
    }),
    validateMoriBook(),
  ];

  if (process.argv.includes(FIREBASE_FLAG)) await validateFirebase(books);
  warnings.forEach((warning) => console.warn(`WARNING: ${warning}`));
  if (errors.length > 0) {
    errors.forEach((error) => console.error(`ERROR: ${error}`));
    throw new Error(`${errors.length} verification error(s) found.`);
  }
  console.log(`Verified ${books.length} books with 0 errors${process.argv.includes(FIREBASE_FLAG) ? ' and exact Firebase parity' : ''}.`);
}

main().catch((error) => {
  console.error(`Verification failed: ${error.message}`);
  process.exitCode = 1;
});
