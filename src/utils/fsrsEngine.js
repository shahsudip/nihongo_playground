// src/utils/fsrsEngine.js
import { fsrs, createEmptyCard, Rating, State, generatorParameters } from 'ts-fsrs';
import { doc, getDoc, setDoc, collection, getDocs, query, where, orderBy, limit, addDoc } from 'firebase/firestore';

// Default FSRS instance with 90% desired retention
export const defaultParams = generatorParameters({
  request_retention: 0.90,
  maximum_interval: 36500,
  enable_fuzz: true,
});

export const scheduler = fsrs(defaultParams);

export { Rating, State, createEmptyCard };

/**
 * Convert a future Date or timestamp into a compact human-friendly interval string (e.g. "10m", "1d", "4d", "2mo")
 */
export function formatInterval(dueDate, now = new Date()) {
  if (!dueDate) return 'now';
  const target = dueDate instanceof Date ? dueDate : new Date(dueDate);
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return '< 1m';

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMin < 1) return '< 1m';
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 30) return `${diffDays}d`;
  if (diffMonths < 12) return `${(diffDays / 30).toFixed(1)}mo`;
  return `${(diffDays / 365).toFixed(1)}y`;
}

/**
 * Get previews for all 4 ratings (Again, Hard, Good, Easy) for a card
 */
export function getSchedulingPreviews(card, now = new Date()) {
  const c = card?.due ? card : createEmptyCard(now);
  const repeatRecord = scheduler.repeat(c, now);

  const previews = {};
  const ratings = [
    { rating: Rating.Again, label: 'Again', color: '#EF4444', desc: 'Forgot' },
    { rating: Rating.Hard, label: 'Hard', color: '#F59E0B', desc: 'Struggled' },
    { rating: Rating.Good, label: 'Good', color: '#10B981', desc: 'Recalled' },
    { rating: Rating.Easy, label: 'Easy', color: '#3B82F6', desc: 'Effortless' }
  ];

  for (const { rating, label, color, desc } of ratings) {
    const item = repeatRecord[rating];
    previews[rating] = {
      rating,
      label,
      color,
      desc,
      interval: formatInterval(item.card.due, now),
      nextCard: item.card,
      log: item.log
    };
  }

  return previews;
}

/**
 * Execute a review for a card
 */
export function applyReview(card, rating, now = new Date()) {
  const c = card?.due ? card : createEmptyCard(now);
  return scheduler.next(c, now, rating);
}

/**
 * Normalize an FSRS card object to a plain Firestore-safe serializable object
 */
export function serializeCard(card, extraData = {}) {
  return {
    due: card.due instanceof Date ? card.due.toISOString() : (card.due || new Date().toISOString()),
    stability: Number(card.stability || 0),
    difficulty: Number(card.difficulty || 0),
    elapsed_days: Number(card.elapsed_days || 0),
    scheduled_days: Number(card.scheduled_days || 0),
    reps: Number(card.reps || 0),
    lapses: Number(card.lapses || 0),
    state: Number(card.state || State.New),
    last_review: card.last_review instanceof Date ? card.last_review.toISOString() : (card.last_review || null),
    updatedAt: new Date().toISOString(),
    ...extraData
  };
}

/**
 * Hydrate a stored Firestore plain object back into FSRS-compatible card object with Date instances
 */
export function hydrateCard(data) {
  if (!data) return createEmptyCard();
  return {
    due: data.due ? new Date(data.due) : new Date(),
    stability: Number(data.stability || 0),
    difficulty: Number(data.difficulty || 0),
    elapsed_days: Number(data.elapsed_days || 0),
    scheduled_days: Number(data.scheduled_days || 0),
    reps: Number(data.reps || 0),
    lapses: Number(data.lapses || 0),
    state: Number(data.state || State.New),
    last_review: data.last_review ? new Date(data.last_review) : undefined,
  };
}

/**
 * Save user SRS review result to Firestore
 */
export async function saveCardReviewToDB(db, userId, cardId, cardMetadata, fsrsResult) {
  if (!db || !userId || !cardId) return;

  const cardRef = doc(db, 'users', userId, 'srsCards', cardId);
  const serialized = serializeCard(fsrsResult.card, {
    cardId,
    level: cardMetadata?.level || 'N5',
    category: cardMetadata?.category || 'vocabulary',
    front: cardMetadata?.front || '',
    back: cardMetadata?.back || '',
    hiragana: cardMetadata?.hiragana || '',
    romaji: cardMetadata?.romaji || '',
    lastRating: fsrsResult.log?.rating || Rating.Good,
    lastReviewTimestamp: new Date().toISOString()
  });

  // Save updated card state
  await setDoc(cardRef, serialized, { merge: true });

  // Add review log entry in subcollection for analytics and retraining
  try {
    const logsRef = collection(db, 'users', userId, 'srsReviews');
    await addDoc(logsRef, {
      cardId,
      rating: fsrsResult.log?.rating || Rating.Good,
      state: fsrsResult.log?.state || State.New,
      due: serialized.due,
      stability: serialized.stability,
      difficulty: serialized.difficulty,
      elapsed_days: serialized.elapsed_days,
      reviewTimestamp: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Could not write review log:', err);
  }

  return serialized;
}

/**
 * Fetch all SRS cards for a user (optionally filtered by level and category)
 */
export async function fetchUserSRSCards(db, userId, level = null, category = null) {
  if (!db || !userId) return [];
  try {
    const cardsRef = collection(db, 'users', userId, 'srsCards');
    let q = query(cardsRef);

    if (level && category) {
      q = query(cardsRef, where('level', '==', level.toUpperCase()), where('category', '==', category));
    } else if (level) {
      q = query(cardsRef, where('level', '==', level.toUpperCase()));
    } else if (category) {
      q = query(cardsRef, where('category', '==', category));
    }

    const snap = await getDocs(q);
    const result = [];
    snap.forEach(docSnap => {
      result.push({ id: docSnap.id, ...docSnap.data() });
    });
    return result;
  } catch (err) {
    console.error('Error fetching SRS cards:', err);
    return [];
  }
}

/**
 * Compute SRS queue summary stats from an array of SRS card records
 */
export function calculateSRSStats(srsCards = []) {
  const now = new Date();
  let dueCount = 0;
  let learningCount = 0;
  let matureCount = 0; // stability >= 21 days
  let youngCount = 0;  // in review but stability < 21
  let totalReviews = 0;
  let totalLapses = 0;
  let avgStability = 0;
  let avgDifficulty = 0;

  srsCards.forEach(c => {
    const dueDate = new Date(c.due || 0);
    if (dueDate <= now) dueCount++;
    if (c.state === State.Learning || c.state === State.Relearning) {
      learningCount++;
    } else if (c.state === State.Review) {
      if ((c.stability || 0) >= 21) {
        matureCount++;
      } else {
        youngCount++;
      }
    }
    totalReviews += (c.reps || 0);
    totalLapses += (c.lapses || 0);
    avgStability += (c.stability || 0);
    avgDifficulty += (c.difficulty || 0);
  });

  const totalCards = srsCards.length;
  const retentionRate = totalReviews > 0 ? (((totalReviews - totalLapses) / totalReviews) * 100).toFixed(1) : '100.0';

  return {
    totalCards,
    dueCount,
    learningCount,
    matureCount,
    youngCount,
    totalReviews,
    totalLapses,
    retentionRate,
    avgStability: totalCards > 0 ? (avgStability / totalCards).toFixed(1) : '0.0',
    avgDifficulty: totalCards > 0 ? (avgDifficulty / totalCards).toFixed(1) : '0.0',
  };
}
