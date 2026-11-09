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

  // 2. Fallback to Firestore `dethitiengnhat_n3/_index`
  try {
    const ref = doc(db, COLLECTION_NAME, '_index');
    const snap = await withTimeout(getDoc(ref), 1800);
    if (snap?.exists && snap.exists()) {
      return snap.data();
    }
  } catch (_) {}

  return { level: 'N3', totalTests: 0, tests: [] };
}

/**
 * Fetch a full N3 test document by testNumber (e.g., 32) or testId ('dttn_n3_test_32').
 * Priority: local public JSON -> Firestore `dethitiengnhat_n3/{testId}` -> Firestore `practice-test/n3/{categoryId}/N3-{num}-{part}`.
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
    if (resp.ok) return await resp.json();
  } catch (_) {}

  try {
    const resp2 = await fetch(`/data/dethitiengnhat_n3/${testId}.json`);
    if (resp2.ok) return await resp2.json();
  } catch (_) {}

  // 2. Firestore `dethitiengnhat_n3/{testId}`
  try {
    const ref = doc(db, COLLECTION_NAME, testId);
    const snap = await withTimeout(getDoc(ref), 1800);
    if (snap?.exists && snap.exists()) {
      return snap.data();
    }
  } catch (_) {}

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
      return {
        id: testId,
        testId,
        testNumber: testCode,
        level: 'N3',
        title: `JLPT N3 Practice Test #${testCode}`,
        sections,
      };
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
