import { useState, useEffect } from 'react';
import { quizData as staticQuizData } from '../data/quizData.js';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const useQuizManager = () => {
  const { currentUser } = useAuth();
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This function now fetches all data from Firestore
    const fetchAllData = async () => {
      if (!currentUser) {
        setAllQuizzes([]); // No user, no data
        setIsLoading(false);
        return;
      }

      try {
        // 1. Fetch user's custom quizzes from Firestore
        const customQuizzesRef = collection(db, 'users', currentUser.uid, 'customQuizzes');
        const customQuizzesSnapshot = await getDocs(customQuizzesRef);
        const customQuizzes = customQuizzesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 2. Fetch user's quiz history from Firestore
        const historyRef = collection(db, 'users', currentUser.uid, 'quizHistory');
        const historySnapshot = await getDocs(historyRef);
        const history = historySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // 3. De-duplicate the history to get only the latest result for each quiz
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

        // 4. Process and unify all quizzes into a single list
        const unifiedQuizzes = [];
        Object.keys(staticQuizData).forEach(level => {
          Object.keys(staticQuizData[level]).forEach(category => {
            Object.keys(staticQuizData[level][category]).forEach(difficulty => {
              const uniqueId = `${level}-${category}-${difficulty}`;
              const quizData = staticQuizData[level][category][difficulty];
              let status = 'unattended';
              let latestResult = null;
              if (completedQuizMap.has(uniqueId)) {
                const result = completedQuizMap.get(uniqueId);
                status = result.score === result.total ? 'mastered' : 'incomplete';
                latestResult = result.fullRecord;
              }
              unifiedQuizzes.push({
                uniqueId, type: 'standard', title: quizData.title,
                level, category, difficulty, status, latestResult,
                quiz_content: quizData.quiz_content,
              });
            });
          });
        });

        customQuizzes.forEach(quiz => {
          const uniqueId = quiz.id;
          let status = 'unattended';
          let latestResult = null;
          if (completedQuizMap.has(uniqueId)) {
            const result = completedQuizMap.get(uniqueId);
            status = result.score === result.total ? 'mastered' : 'incomplete';
            latestResult = result.fullRecord;
          }
          unifiedQuizzes.push({
            uniqueId, type: 'custom', title: quiz.title,
            level: quiz.id, category: quiz.tag, difficulty: null, status, latestResult,
            createdAt: quiz.createdAt,
            quiz_content: quiz.quiz_content,
          });
        });

        setAllQuizzes(unifiedQuizzes);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [currentUser]); // Re-run this logic if the user logs in or out

  return { allQuizzes, isLoading };
};
