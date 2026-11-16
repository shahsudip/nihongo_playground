import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs, setDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'dethitiengnhat_n3';
const LEGACY_COLLECTION = 'practice-test';

const withTimeout = (promise, ms = 1500) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);

/**
 * Fetch the index of all scraped dethitiengnhat N3 tests.
 * Priority: local public JSON (instant & offline-resilient) -> Firestore `dethitiengnhat_n3/_index`.
 */
export async function getDethiN3Index() {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // 1. Try local JSON first for instant UI render
  try {
    const resp = await fetch(`${cleanBase}data/dethitiengnhat_n3/_index.json`);
    if (resp.ok) {
      const data = await resp.json();
      if (data && Array.isArray(data.tests) && data.tests.length > 0) {
        return data;
      }
    }
  } catch (_) {}

  try {
    const resp2 = await fetch('/data/dethitiengnhat_n3/_index.json');
    if (resp2.ok) {
      const data2 = await resp2.json();
      if (data2 && Array.isArray(data2.tests) && data2.tests.length > 0) {
        return data2;
      }
    }
  } catch (_) {}

  // 2. Fallback to Firestore `dethitiengnhat_n3/{test_sets, past_questions}/exams`
  try {
    const [tsSnap, pqSnap] = await withTimeout(
      Promise.all([
        getDocs(collection(db, COLLECTION_NAME, 'test_sets', 'exams')),
        getDocs(collection(db, COLLECTION_NAME, 'past_questions', 'exams')),
      ]),
      2500
    );
    const toMeta = (d, fallbackType) => {
      const data = d.data() || {};
      const sections = Array.isArray(data.sections)
        ? data.sections.map(s => ({
            id: s.id,
            partId: s.partId,
            categoryId: s.categoryId,
            title: s.title,
            enTitle: s.enTitle,
            durationMinutes: s.durationMinutes,
            questionCount: s.questionCount ?? (Array.isArray(s.questions) ? s.questions.length : 0),
          }))
        : [];
      return {
        id: data.id || d.id,
        testId: data.testId || d.id,
        testNumber: data.testNumber,
        categoryType: data.categoryType || fallbackType,
        year: data.year,
        month: data.month,
        level: data.level || 'N3',
        title: data.title,
        japaneseTitle: data.japaneseTitle,
        shortName: data.shortName,
        sourceUrl: data.sourceUrl,
        totalQuestions: data.totalQuestions,
        totalMinutes: data.totalMinutes,
        hasListening: data.hasListening,
        sections,
      };
    };
    const mockTests = tsSnap.docs.map(d => toMeta(d, 'mock_test'));
    const pastExams = pqSnap.docs.map(d => toMeta(d, 'past_exam'));
    const tests = [...mockTests, ...pastExams];
    if (tests.length > 0) {
      return {
        level: 'N3',
        totalTests: tests.length,
        mockTestsCount: mockTests.length,
        pastExamsCount: pastExams.length,
        tests,
      };
    }
  } catch (_) {}

  return { level: 'N3', totalTests: 0, tests: [] };
}

export function ensureJlptScoring(testData) {
  if (!testData || !Array.isArray(testData.sections)) return testData;

  const getQuestionWeight = (partId, mondai) => {
    const m = Number(mondai) || 1;
    const p = Number(partId);
    if (p === 1) { // Letters & Vocabulary (文字・語彙)
      if (m === 1) return 1.0;
      if (m === 2) return 1.0;
      if (m === 3) return 1.3;
      if (m === 4) return 1.8;
      return 2.8;
    }
    if (p === 3) { // Grammar & Reading (文法・読解)
      if (m === 1) return 1.0;
      if (m === 2) return 1.1;
      if (m === 3) return 1.4;
      if (m === 4) return 2.1;
      if (m === 5) return 2.6;
      if (m === 6) return 2.9;
      return 2.5;
    }
    if (p === 4) { // Listening (聴解)
      if (m === 1) return 2.2;
      if (m === 2) return 2.2;
      if (m === 3) return 2.5;
      if (m === 4) return 1.4;
      return 1.8;
    }
    return 1.0;
  };

  testData.sections.forEach(section => {
    const questions = section.questions || [];
    if (questions.length === 0) return;

    // Check if points are already distributed to 60
    const currentSum = Math.round(questions.reduce((sum, q) => sum + (Number(q.points) || 1), 0));
    if (currentSum !== 60 || !questions[0]?.points || (questions.length > 1 && questions.every(q => q.points === 1))) {
      const weights = questions.map(q => getQuestionWeight(section.partId, q.mondai));
      const totalW = weights.reduce((a, b) => a + b, 0);
      const rawPts = weights.map(w => Math.round((w / totalW) * 60 * 10) / 10);
      const sum = rawPts.reduce((a, b) => a + b, 0);
      const diff = Math.round((60 - sum) * 10) / 10;
      rawPts[rawPts.length - 1] = Math.round((rawPts[rawPts.length - 1] + diff) * 10) / 10;

      questions.forEach((q, idx) => {
        q.points = rawPts[idx];
      });

      const qBlocks = (section.contentBlocks || []).filter(b => b.type === 'question');
      qBlocks.forEach((b, idx) => {
        b.points = rawPts[idx];
      });
    }

    section.maxPoints = 60;
    section.minPassPoints = 19;
  });

  testData.officialScoreMax = 180;
  testData.officialPassMark = 95;
  return testData;
}

/**
 * Fetch a full N3 test document by testNumber (e.g., 32) or testId ('dttn_n3_test_32').
 * Priority: local public JSON -> Firestore `dethitiengnhat_n3/{test_sets|past_questions}/exams/{testId}` -> Firestore `practice-test/n3/{categoryId}/N3-{num}-{part}`.
 */
export async function getDethiN3Test(testNumberOrId) {
  const numMatch = String(testNumberOrId).match(/(\d+)$/);
  const testCode = numMatch ? numMatch[1] : String(testNumberOrId);
  const testId = `dttn_n3_test_${testCode}`;

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // 1. Local JSON in public/data/dethitiengnhat_n3/{testId}.json
  try {
    const resp = await fetch(`${cleanBase}data/dethitiengnhat_n3/${testId}.json`);
    if (resp.ok) {
      const data = await resp.json();
      return ensureJlptScoring(data);
    }
  } catch (_) {}

  try {
    const resp2 = await fetch(`/data/dethitiengnhat_n3/${testId}.json`);
    if (resp2.ok) {
      const data2 = await resp2.json();
      return ensureJlptScoring(data2);
    }
  } catch (_) {}

  // 2. Firestore `dethitiengnhat_n3/{test_sets|past_questions}/exams/{testId}`
  const primaryBucket = /^\d{6}$/.test(testCode) ? 'past_questions' : 'test_sets';
  const secondaryBucket = primaryBucket === 'past_questions' ? 'test_sets' : 'past_questions';
  for (const bucket of [primaryBucket, secondaryBucket]) {
    try {
      const ref = doc(db, COLLECTION_NAME, bucket, 'exams', testId);
      const snap = await withTimeout(getDoc(ref), 1800);
      if (snap?.exists && snap.exists()) {
        return ensureJlptScoring(snap.data());
      }
    } catch (_) {}
  }

  // 3. Legacy Firestore `practice-test/n3/{categoryId}/N3-${testCode}-${partId}`
  try {
    const partConfigs = [
      { partId: 1, key: 'vocab', categoryId: 'vocabulary-test', title: '言語知識（文字・語彙）' },
      { partId: 3, key: 'grammar_reading', categoryId: 'grammar-test', title: '言語知識（文法）・読解' },
      { partId: 4, key: 'listening', categoryId: 'listening-test', title: '聴解' },
    ];
    const sections = [];
    for (const p of partConfigs) {
      const pRef = doc(db, LEGACY_COLLECTION, 'n3', p.categoryId, `N3-${testCode}-${p.partId}`);
      const pSnap = await withTimeout(getDoc(pRef), 1500);
      if (pSnap?.exists && pSnap.exists()) {
        const pData = pSnap.data();
        sections.push({
          id: p.key,
          partId: p.partId,
          categoryId: p.categoryId,
          title: p.title,
          contentBlocks: pData.contentBlocks || [],
          questions: [],
        });
      }
    }
    if (sections.length > 0) {
      return ensureJlptScoring({
        id: testId,
        testId,
        testNumber: testCode,
        level: 'N3',
        title: `JLPT N3 Practice Test #${testCode}`,
        sections,
      });
    }
  } catch (_) {}

  return null;
}

/**
 * Load user attempt history for dethitiengnhat N3 tests
 */
export async function getDethiN3History(currentUser) {
  const historyMap = {};

  try {
    const local = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    if (Array.isArray(local)) {
      local.forEach(item => {
        const qid = item.quizId || item.id;
        if (qid && qid.startsWith('dttn-n3-')) {
          historyMap[qid] = item;
        }
      });
    }
  } catch (_) {}

  if (currentUser?.uid) {
    try {
      const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
      const snap = await withTimeout(getDocs(historyColRef), 1800);
      snap.forEach(d => {
        const data = d.data();
        const qid = data.quizId || d.id;
        if (qid && qid.startsWith('dttn-n3-')) {
          historyMap[qid] = { ...historyMap[qid], ...data };
        }
      });
    } catch (_) {}
  }

  return historyMap;
}

/**
 * Save user attempt record to LocalStorage & Firestore
 */
export async function saveDethiN3Record(currentUser, record) {
  const qid = record?.quizId;
  if (!qid) return;

  try {
    const local = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const idx = local.findIndex(h => (h.quizId || h.id) === qid);
    if (idx >= 0) {
      local[idx] = { ...local[idx], ...record };
    } else {
      local.unshift(record);
    }
    localStorage.setItem('quizHistory', JSON.stringify(local));
  } catch (_) {}

  if (currentUser?.uid) {
    try {
      const docRef = doc(db, 'users', currentUser.uid, 'quizHistory', qid);
      await setDoc(docRef, record, { merge: true });
    } catch (_) {}
  }
}
