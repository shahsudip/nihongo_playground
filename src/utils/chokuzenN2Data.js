import { getQuestionGroupProgress, summarizeProgress } from './bookProgress.js';

export const BOOK_ID = 'jlpt-n2-practice-sets';
export const BOOK_ROUTE = '/n2-practice-sets';
export const SECTIONS = [
  { id: 'vocabulary-kanji', route: 'vocabulary-kanji', title: 'Vocabulary & Kanji', label: 'WORDS & CHARACTERS', tone: 'violet' },
  { id: 'grammar-reading', route: 'grammar', title: 'Grammar', label: 'PATTERNS & CONTEXT', tone: 'blue' },
];

export const sectionFromRoute = route => SECTIONS.find(section => section.route === route || section.id === route);

export const attemptId = (setId, sectionId) => `${BOOK_ID}-${setId}-${sectionId}`;

export const storageKeyFor = userId => `chokuzen-n2:${import.meta.env?.DEV ? 'dev' : 'production'}:v1:${userId || 'guest'}`;

export const isQuestionReady = question => (
  Boolean(question?.id)
  && Array.isArray(question.options)
  && question.options.length === 4
  && Number.isInteger(question.correctIndex)
  && question.correctIndex >= 0
  && question.correctIndex < 4
  && question.correctOption === question.options[question.correctIndex]
  && question.verification?.answerKeyVerified === true
  && question.verification?.ocrTextVerified === true
  && (question.mondai !== 9 || question.verification?.passageTextVerified === true)
);

export function validAnswers(questions = [], answers = {}) {
  return Object.fromEntries(questions
    .filter(question => isQuestionReady(question)
      && Number.isInteger(answers?.[question.id])
      && answers[question.id] >= 0
      && answers[question.id] < 4)
    .map(question => [question.id, answers[question.id]]));
}

export function sectionProgress(questions = [], record) {
  const answers = validAnswers(questions, record?.answers);
  return getQuestionGroupProgress(questions, { scopedRecords: [{ answers }] });
}

export function setProgress(set, attempts) {
  return summarizeProgress(SECTIONS.map(section => sectionProgress(
    set.sections?.[section.id]?.questions || [],
    attempts[attemptId(set.id, section.id)],
  )));
}

export function makeAttempt(set, section, previous, changes = {}) {
  const questions = set.sections?.[section.id]?.questions || [];
  const answers = validAnswers(questions, changes.answers ?? previous?.answers);
  const progress = sectionProgress(questions, { answers });
  const index = Number(changes.currentIndex ?? previous?.currentIndex) || 0;
  return {
    quizId: attemptId(set.id, section.id),
    bookId: BOOK_ID,
    setId: set.id,
    sectionId: section.id,
    title: `Chokuzen Taisaku N2 - ${set.title} - ${section.title}`,
    level: 'N2',
    category: 'Chokuzen Taisaku',
    type: 'practice',
    answers,
    currentIndex: Math.max(0, Math.min(questions.length - 1, Math.floor(index))),
    currentQuestionId: questions[Math.max(0, Math.min(questions.length - 1, Math.floor(index)))]?.id || null,
    score: progress.score,
    rawCorrect: progress.score,
    total: progress.total,
    answered: progress.answered,
    completionPercent: progress.completionPercent,
    percentage: progress.accuracyPercent,
    status: progress.status,
    scoringMethod: 'raw-practice-accuracy',
    timestamp: new Date().toISOString(),
  };
}

export function mergeAttempts(current = {}, incoming = {}) {
  const merged = { ...current };
  Object.entries(incoming).forEach(([key, record]) => {
    if (!record || typeof record !== 'object' || !key.startsWith(`${BOOK_ID}-`)) return;
    const existingTime = Date.parse(merged[key]?.timestamp || '') || 0;
    const incomingTime = Date.parse(record.timestamp || '') || 0;
    if (!merged[key] || incomingTime > existingTime) merged[key] = record;
  });
  return merged;
}

export function readAttempts(storageKey) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || '{}');
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? mergeAttempts({}, saved) : {};
  } catch {
    return {};
  }
}

export function assetUrl(path) {
  if (!path || typeof path !== 'string') return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(path)) return '';
  const base = import.meta.env?.BASE_URL || '/';
  if (base !== '/' && path.startsWith(base)) return path;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
}

export function extractedText(value) {
  if (typeof value === 'string') return value;
  return typeof value?.text === 'string' ? value.text : '';
}

export function sourcePages(book) {
  const pages = Array.isArray(book.source?.pages) ? book.source.pages : [];
  const count = Math.max(Number(book.source?.pageCount) || 0, ...pages.map(page => Number(page.page) || 0));
  const pageMap = new Map(pages.map(page => [Number(page.page), page]));
  return Array.from({ length: count }, (_, index) => ({ ...pageMap.get(index + 1), page: index + 1 }));
}

export async function loadChokuzenN2Book() {
  let book;
  if (import.meta.env.DEV) {
    const localBooks = import.meta.glob('../data/chokuzen_n2/book.json');
    const loader = localBooks['../data/chokuzen_n2/book.json'];
    if (!loader) throw new Error('The local N2 book is still being prepared. Please retry when book.json is ready.');
    book = (await loader()).default;
  } else {
    const [{ db }, { collection, doc, getDoc, getDocs }] = await Promise.all([
      import('../firebaseConfig.js'),
      import('firebase/firestore'),
    ]);
    const [metadata, sets] = await Promise.all([
      getDoc(doc(db, 'books', BOOK_ID)),
      getDocs(collection(db, 'books', BOOK_ID, 'sets')),
    ]);
    if (!metadata.exists()) throw new Error('This book has not been published to the library yet.');
    book = { ...metadata.data(), sets: sets.docs.map(set => ({ ...set.data(), id: set.id })) };
  }
  if (!book || !Array.isArray(book.sets)) throw new Error('Book data is incomplete. Please try again later.');
  return {
    ...book,
    id: BOOK_ID,
    sets: [...book.sets].sort((left, right) => String(left.id).localeCompare(String(right.id), undefined, { numeric: true })),
  };
}

export async function loadCloudAttempts(userId) {
  if (import.meta.env.DEV || !userId) return {};
  const [{ db }, { collection, getDocs }] = await Promise.all([
    import('../firebaseConfig.js'),
    import('firebase/firestore'),
  ]);
  const history = await getDocs(collection(db, 'users', userId, 'quizHistory'));
  const attempts = {};
  history.docs.forEach(snapshot => {
    const record = snapshot.data();
    const key = record.quizId || snapshot.id;
    if (record.bookId === BOOK_ID && key.startsWith(`${BOOK_ID}-`)) {
      const section = sectionFromRoute(record.sectionId);
      attempts[section && record.setId ? attemptId(record.setId, section.id) : key] = record;
    }
  });
  return attempts;
}

export async function saveCloudAttempt(userId, record) {
  if (import.meta.env.DEV || !userId) return false;
  const [{ db }, { doc, setDoc }] = await Promise.all([
    import('../firebaseConfig.js'),
    import('firebase/firestore'),
  ]);
  await setDoc(doc(db, 'users', userId, 'quizHistory', record.quizId), record, {
    mergeFields: Object.keys(record),
  });
  return true;
}
