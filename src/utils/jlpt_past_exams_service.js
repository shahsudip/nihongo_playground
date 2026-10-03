import { db } from '../firebaseConfig.js';
import { doc, getDoc, collection, getDocs, setDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'jlpt_past_exams';

/** Helper to timeout a promise */
const withTimeout = (promise, ms = 1500) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);

/**
 * Fetch past exams index for a specific level (e.g. 'N3', 'N2', etc.)
 * Priority: Firestore index doc -> local public JSON fallback.
 */
export async function getPastExamsIndex(level = 'N3') {
  const normLevel = (level || 'N3').toLowerCase();
  const upperLevel = normLevel.toUpperCase();

  // Helper to load local public index
  const fetchLocalIndex = async () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const resp = await fetch(`${cleanBase}data/jlpt_past_exams/${normLevel}/_index.json`);
    if (resp.ok) return await resp.json();
    throw new Error(`Local index for ${normLevel} not found`);
  };

  // 1. Try Firestore `jlpt_past_exams/{level}_index`
  try {
    const indexRef = doc(db, COLLECTION_NAME, `${normLevel}_index`);
    const snap = await withTimeout(getDoc(indexRef), 1500);
    if (snap?.exists && snap.exists() && Array.isArray(snap.data()?.exams)) {
      return snap.data();
    }
  } catch (err) {
    // Firestore timed out or network error; fall back to local JSON
  }

  // 2. Fall back to local public JSON
  try {
    return await fetchLocalIndex();
  } catch (err) {
    console.error(`[jlpt_past_exams_service] Failed to fetch index for ${upperLevel}:`, err);
    return { level: upperLevel, totalExams: 0, exams: [] };
  }
}

/**
 * Fetch a single past exam document by ID (e.g. 'n3_past_2024_12')
 * Priority: Firestore `jlpt_past_exams/{examId}` -> local public JSON `data/jlpt_past_exams/{level}/{examId}.json`.
 */
export async function getPastExamById(examId, level = 'N3') {
  if (!examId) return null;
  const normId = examId.toLowerCase();
  const normLevel = (level || 'N3').toLowerCase();

  // Helper to load local public JSON
  const fetchLocalExam = async () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const resp = await fetch(`${cleanBase}data/jlpt_past_exams/${normLevel}/${normId}.json`);
    if (resp.ok) return await resp.json();
    throw new Error(`Local exam file ${normId}.json not found`);
  };

  // 1. Try Firestore
  try {
    const docRef = doc(db, COLLECTION_NAME, normId);
    const snap = await withTimeout(getDoc(docRef), 1500);
    if (snap?.exists && snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    // Firestore timed out or error; fall back to local
  }

  // 2. Fall back to local public JSON
  try {
    return await fetchLocalExam();
  } catch (err) {
    console.error(`[jlpt_past_exams_service] Failed to fetch exam '${normId}':`, err);
  }

  return null;
}

/**
 * Load user history for Past JLPT Exams (from Firestore & LocalStorage)
 */
export async function getPastExamHistory(currentUser) {
  const historyMap = {};

  // 1. LocalStorage
  try {
    const local = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    if (Array.isArray(local)) {
      local.forEach(item => {
        const qid = item.quizId || item.id;
        if (qid && (qid.startsWith('jlpt-past-') || qid.includes('past_'))) {
          historyMap[qid] = item;
        }
      });
    }
  } catch (e) {
    console.warn('[jlpt_past_exams_service] Could not read local quizHistory:', e);
  }

  // 2. Firestore if user is authenticated
  if (currentUser?.uid) {
    try {
      const historyColRef = collection(db, 'users', currentUser.uid, 'quizHistory');
      const snap = await getDocs(historyColRef);
      snap.forEach(d => {
        const data = d.data();
        const qid = data.quizId || d.id;
        if (qid && (qid.startsWith('jlpt-past-') || qid.includes('past_'))) {
          historyMap[qid] = { ...historyMap[qid], ...data };
        }
      });
    } catch (e) {
      console.warn('[jlpt_past_exams_service] Could not read Firestore quizHistory:', e.message);
    }
  }

  return historyMap;
}

/**
 * Save user past exam attempt to Firestore & LocalStorage
 */
export async function savePastExamRecord(currentUser, record) {
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
    console.warn('[jlpt_past_exams_service] Could not save to localStorage:', e);
  }

  // 2. Firestore
  if (currentUser?.uid) {
    try {
      const docRef = doc(db, 'users', currentUser.uid, 'quizHistory', qid);
      await setDoc(docRef, record, { merge: true });
    } catch (e) {
      console.warn('[jlpt_past_exams_service] Could not save to Firestore:', e.message);
    }
  }
}

export default {
  getPastExamsIndex,
  getPastExamById,
  getPastExamHistory,
  savePastExamRecord,
};
