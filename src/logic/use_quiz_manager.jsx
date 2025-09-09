import { useState, useEffect } from 'react';
import { quizData as staticQuizData } from '../data/quiz_data.jsx';

export const useQuizManager = () => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes')) || [];
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];

    // --- NEW: De-duplication Logic ---
    // 1. Sort the entire history by date, most recent first.
    const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // 2. Create a clean, de-duplicated list containing only the most recent attempt for each quiz.
    const deduplicatedHistory = [];
    const seenQuizIds = new Set();
    for (const item of sortedHistory) {
      if (item.quizId && !seenQuizIds.has(item.quizId)) {
        deduplicatedHistory.push(item);
        seenQuizIds.add(item.quizId);
      }
    }
    
    // 3. Create the score map from the clean, de-duplicated history.
    const completedQuizMap = new Map();
    deduplicatedHistory.forEach(item => {
        completedQuizMap.set(item.quizId, { 
            score: item.score, 
            total: item.total, 
            // Also store the full history item for later use
            fullRecord: item 
        });
    });

    const unifiedQuizzes = [];

    // Process static quizzes
    Object.keys(staticQuizData).forEach(level => {
      Object.keys(staticQuizData[level]).forEach(category => {
        Object.keys(staticQuizData[level][category]).forEach(difficulty => {
          const uniqueId = `${level}-${category}-${difficulty}`;
          const quizData = staticQuizData[level][category][difficulty];
          
          let status = 'unattended';
          let latestResult = null;
          if (completedQuizMap.has(uniqueId)) {
            const result = completedQuizMap.get(uniqueId);
            status = result.score === result.total ||result.score>=result.total ? 'mastered' : 'incomplete';
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

    // Process custom quizzes
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
        quiz_content: quiz.quiz_content,
      });
    });

    setAllQuizzes(unifiedQuizzes);
    setIsLoading(false);
  }, []);

  return { allQuizzes, isLoading };
};