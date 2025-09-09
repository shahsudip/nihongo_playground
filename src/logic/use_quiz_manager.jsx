import { useState, useEffect } from 'react';
import { quizData as staticQuizData } from '../data/quiz_data.jsx';

export const useQuizManager = () => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Load all data sources from localStorage and the static file
    const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes')) || [];
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];

    // 2. Create a map of completed quiz scores for quick lookup.
    // This stores the BEST score for each unique quiz.
    const completedQuizMap = new Map();
    history.forEach(item => {
      const quizId = item.quizId;
      if (!completedQuizMap.has(quizId) || item.score > completedQuizMap.get(quizId).score) {
        completedQuizMap.set(quizId, { score: item.score, total: item.total });
      }
    });

    const unifiedQuizzes = [];

    // 3. Process all static (N-level) quizzes
    Object.keys(staticQuizData).forEach(level => {
      Object.keys(staticQuizData[level]).forEach(category => {
        Object.keys(staticQuizData[level][category]).forEach(difficulty => {
          const uniqueId = `${level}-${category}-${difficulty}`;
          const quizData = staticQuizData[level][category][difficulty];
          
          let status = 'unattended'; // Default status
          if (completedQuizMap.has(uniqueId)) {
            const result = completedQuizMap.get(uniqueId);
            status = result.score === result.total ? 'mastered' : 'incomplete';
          }

          unifiedQuizzes.push({
            uniqueId, type: 'standard', title: quizData.title,
            level, category, difficulty, status,
            quiz_content: quizData.quiz_content,
          });
        });
      });
    });

    // 4. Process all user-created custom quizzes
    customQuizzes.forEach(quiz => {
      const uniqueId = quiz.id;
      let status = 'unattended';
      if (completedQuizMap.has(uniqueId)) {
        const result = completedQuizMap.get(uniqueId);
        status = result.score === result.total ? 'mastered' : 'incomplete';
      }

      unifiedQuizzes.push({
        uniqueId, type: 'custom', title: quiz.title,
        level: quiz.id, // The 'level' for routing is the unique ID itself
        category: quiz.tag, difficulty: null, status, 
        quiz_content: quiz.quiz_content,
      });
    });

    setAllQuizzes(unifiedQuizzes);
    setIsLoading(false);
  }, []);

  return { allQuizzes, isLoading };
};