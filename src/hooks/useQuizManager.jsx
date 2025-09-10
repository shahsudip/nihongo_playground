import { useState, useEffect, useMemo } from 'react';
import { quizData as staticQuizData } from '../data/quiz_data.js';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, onSnapshot, query } from 'firebase/firestore';

export const useQuizManager = () => {
  const { currentUser } = useAuth();
  const [customQuizzes, setCustomQuizzes] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This effect sets up real-time listeners to your Firestore database.
  useEffect(() => {
    if (!currentUser) {
      setCustomQuizzes([]);
      setHistory([]);
      setIsLoading(false);
      return;
    }

    // Listener for the user's custom quizzes
    const customQuizzesRef = collection(db, 'users', currentUser.uid, 'customQuizzes');
    const unsubscribeCustomQuizzes = onSnapshot(customQuizzesRef, (snapshot) => {
      const quizzesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomQuizzes(quizzesData);
      setIsLoading(false);
    });

    // Listener for the user's quiz history
    const historyRef = collection(db, 'users', currentUser.uid, 'quizHistory');
    const unsubscribeHistory = onSnapshot(historyRef, (snapshot) => {
      const historyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(historyData);
      setIsLoading(false);
    });

    // Cleanup listeners when the component unmounts or the user logs out
    return () => {
      unsubscribeCustomQuizzes();
      unsubscribeHistory();
    };
  }, [currentUser]);

  // This hook processes and unifies all data whenever the Firestore data changes.
  const allQuizzes = useMemo(() => {
    const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const deduplicatedHistory = [];
    const seenQuizIds = new Set();
    for (const item of sortedHistory) {
      if (item.quizId && !seenQuizIds.has(item.quizId)) {
        deduplicatedHistory.push(item);
        seenQuizIds.add(item.quizId);
      }
    }
    const completedQuizMap = new Map();
    deduplicatedHistory.forEach(item => {
      completedQuizMap.set(item.quizId, { score: item.score, total: item.total, fullRecord: item });
    });

    const unifiedQuizzes = [];

    // Process static (N-level) quizzes
    Object.keys(staticQuizData).forEach(level => {
      Object.keys(staticQuizData[level]).forEach(category => {
        Object.keys(staticQuizData[level][category]).forEach(difficulty => {
          const uniqueId = `${level}-${category}-${difficulty}`;
          let status = 'unattended';
          let latestResult = null;
          if (completedQuizMap.has(uniqueId)) {
            const result = completedQuizMap.get(uniqueId);
            status = result.score === result.total ? 'mastered' : 'incomplete';
            latestResult = result.fullRecord;
          }
          unifiedQuizzes.push({
            uniqueId, type: 'standard', title: staticQuizData[level][category][difficulty].title,
            level, category, difficulty, status, latestResult,
            quiz_content: staticQuizData[level][category][difficulty].quiz_content,
          });
        });
      });
    });

    // Process custom quizzes
    customQuizzes.forEach(quiz => {
      const uniqueId = quiz.id;
      const status = quiz.status || 'unattended'; // The status is stored directly on the document
      let latestResult = null;
      if (completedQuizMap.has(uniqueId)) {
        latestResult = completedQuizMap.get(uniqueId).fullRecord;
      }
      unifiedQuizzes.push({
        uniqueId, type: 'custom', title: quiz.title,
        level: quiz.id, category: quiz.tag, difficulty: null, status, latestResult,
        createdAt: quiz.createdAt,
        quiz_content: quiz.quiz_content,
      });
    });

    return unifiedQuizzes;
  }, [customQuizzes, history]);

  return { allQuizzes, isLoading };
};

