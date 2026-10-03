import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import fallbackMeta from '../data/jlpt_mock_tests_meta.json';

const COLLECTION_NAME = 'jlpt_practice_tests';

/** Helper to timeout a promise */
const withTimeout = (promise, ms = 1200) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);

/**
 * Fetch list of tests for a specific level (e.g. 'N5', 'N4', 'N3', 'N2', 'N1')
 * Immediately provides bundled metadata and updates from Firestore if available.
 */
export async function getTestsForLevel(level) {
  const normLevel = (level || '').toUpperCase();
  let allTests = fallbackMeta;

  try {
    const indexRef = doc(db, COLLECTION_NAME, '_index');
    const snap = await withTimeout(getDoc(indexRef), 1200);
    if (snap?.exists && snap.exists() && Array.isArray(snap.data()?.tests)) {
      allTests = snap.data().tests;
    }
  } catch (err) {
    // Graceful fallback to bundled metadata
  }

  return allTests.filter(t => (t.level || '').toUpperCase() === normLevel);
}

/**
 * Fetch a single full test by ID (e.g. 'n5_test_1', 'n3_test_2')
 * First queries Firestore `jlpt_practice_tests/{testId}`, falling back to local public JSON.
 */
export async function getTestById(testId) {
  if (!testId) return null;
  const normId = testId.toLowerCase();

  // Helper to load public json
  const fetchLocal = async () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const resp = await fetch(`${cleanBase}data/jlpt_mock_tests/${normId}.json`);
    if (resp.ok) return await resp.json();
    throw new Error('Local fetch failed');
  };

  // Try Firestore with 1.5s timeout, then local fallback
  try {
    const docRef = doc(db, COLLECTION_NAME, normId);
    const snap = await withTimeout(getDoc(docRef), 1500);
    if (snap?.exists && snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    // Firestore timed out or network error; fall back to local
  }

  try {
    return await fetchLocal();
  } catch (err) {
    console.error(`[jlpt_practice_tests_service] Failed to fetch test '${normId}':`, err);
  }

  return null;
}

/**
 * Load user quiz history for JLPT Practice Tests (from Firestore & LocalStorage)
 */
export async function getPracticeTestHistory(currentUser) {
  const historyMap = {};

  // 1. LocalStorage
  try {
    const local = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    if (Array.isArray(local)) {
      local.forEach(item => {
        const qid = item.quizId || item.id;
        if (qid && qid.startsWith('jlpt-mock-')) {
          historyMap[qid] = item;
        }
      });
    }
  } catch (e) {
    console.warn('[jlpt_practice_tests_service] Could not read local quizHistory:', e);
  }

  // 2. Firestore if user logged in
  if (currentUser?.uid) {
    try {
      const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
      const snap = await getDocs(historyColRef);
      snap.forEach(d => {
        const data = d.data();
        const qid = data.quizId || d.id;
        if (qid && qid.startsWith('jlpt-mock-')) {
          historyMap[qid] = { ...historyMap[qid], ...data };
        }
      });
    } catch (e) {
      console.warn('[jlpt_practice_tests_service] Could not read Firestore quizHistory:', e.message);
    }
  }

  return historyMap;
}

/**
 * Save user quiz record to Firestore and LocalStorage
 */
export async function savePracticeTestRecord(currentUser, record) {
  const qid = record.quizId;
  if (!qid) return;

  // 1. LocalStorage
  try {
    const local = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const idx = local.findIndex(h => (h.quizId || h.id) === qid);
    if (idx >= 0) {
      local[idx] = { ...local[idx], ...record };
    } else {
      local.unshift(record);
    }
    localStorage.setItem('quizHistory', JSON.stringify(local));
  } catch (e) {
    console.warn('[jlpt_practice_tests_service] Could not save to localStorage:', e);
  }

  // 2. Firestore
  if (currentUser?.uid) {
    try {
      const docRef = doc(db, 'users', currentUser.uid, 'quizHistory', qid);
      await setDoc(docRef, record, { merge: true });
    } catch (e) {
      console.warn('[jlpt_practice_tests_service] Could not save to Firestore:', e.message);
    }
  }
}
