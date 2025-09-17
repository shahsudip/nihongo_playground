// src/components/quiz_screen.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSrsQuiz } from '../hooks/quiz_logic_hook.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

// --- UI Subcomponents (ScoreCounter, Modals) can remain here or be moved to separate files ---
// ... (ScoreCounter, CompletionModal, FirstPassModal code is unchanged) ...
const ScoreCounter = ({ score = 0, totalIncorrect = 0, mastered = 0, numberOfQuestions = 0, unseen = 0 }) => (
  <div className="score-counter-container">
    <div className="score-item unseen">New: <span>{unseen}</span></div>
    <div className="score-item correct">Score: <span>{score}</span></div>
    <div className="score-item incorrect">Incorrect: <span>{totalIncorrect}</span></div>
    <div className="score-item mastered">Mastered: <span>{mastered} / {numberOfQuestions}</span></div>
  </div>
);
const CompletionModal = ({ score = 0, total = 0, onContinue }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Quiz Complete!</h2>
      <p className="modal-score-text">Your Final Score:</p>
      <div className="modal-score-display">{score} / {total}</div>
      <button onClick={onContinue} className="action-button next-level">View Profile & Save Score &rarr;</button>
    </div>
  </div>
);
const FirstPassModal = ({ score = 0, total = 0, onContinueReview, onEndQuiz }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>First Round Complete!</h2>
      <p className="modal-score-text">Current Score:</p>
      <div className="modal-score-display">{score} / {total}</div>
      <p className="modal-description">Continue to the review round to master the words.</p>
      <div className="modal-actions">
        <button onClick={onEndQuiz} className="action-button home">End Quiz</button>
        <button onClick={onContinueReview} className="action-button next-level">Continue Review</button>
      </div>
    </div>
  </div>
);


// --- Generic Quiz UI Component ---
const Quiz = ({ quizContent, quizTitle, onComplete, onEndQuizEarly, quizStateRef }) => {
  const [showFirstPassModal, setShowFirstPassModal] = useState(false);
  const quizState = useSrsQuiz(quizContent);
  const {
    currentCard, handleAnswer, acknowledgeFirstPass, isComplete, isLoading,
    isFirstPassComplete, hasAcknowledgedFirstPass, firstPassStats,
    totalCorrect: score, totalIncorrect, masteredCount,
    deckSize: numberOfQuestions, unseenCount,
  } = quizState || {};

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (quizStateRef) {
      quizStateRef.current = { score, total: numberOfQuestions, totalIncorrect, mastered: masteredCount, unseen: unseenCount, numberOfQuestions };
    }
  }, [score, totalIncorrect, masteredCount, unseenCount, numberOfQuestions, quizStateRef]);

  useEffect(() => {
    if (isFirstPassComplete && !hasAcknowledgedFirstPass) setShowFirstPassModal(true);
    if (isComplete) onComplete({ score, total: numberOfQuestions, ...quizStateRef.current });
  }, [isFirstPassComplete, hasAcknowledgedFirstPass, isComplete, onComplete, score, numberOfQuestions]);

  const handleContinueReview = () => {
    setShowFirstPassModal(false);
    acknowledgeFirstPass?.();
  };

  const handleOptionClick = (option) => {
    if (isAnswered || !currentCard) return;
    setSelectedOption(option);
    setIsAnswered(true);
    setTimeout(() => {
      handleAnswer?.(option === currentCard.answer);
      setIsAnswered(false);
      setSelectedOption(null);
    }, 800);
  };

  if (isLoading) return <LoadingSpinner />;
  if (!currentCard && !isComplete) return <div className="quiz-card"><p>Loading quiz...</p></div>;
  if (!currentCard && isComplete) return null; // Let the onComplete handler show the final modal

  return (
    <>
      <div className="quiz-card">
        <h1 className="quiz-title">{quizTitle}</h1>
        <ScoreCounter score={score} totalIncorrect={totalIncorrect} mastered={masteredCount} numberOfQuestions={numberOfQuestions} unseen={unseenCount} />
        <h2 className="question-text">{currentCard.questionText}</h2>
        <div className="options-grid">
          {currentCard.options.map((option, idx) => {
            const isCorrectAnswer = option === currentCard.answer;
            const isSelected = selectedOption === option;
            let buttonClass = 'option-button';
            if (isAnswered) {
              if (isCorrectAnswer) buttonClass += ' correct';
              else if (isSelected) buttonClass += ' incorrect';
            }
            return (
              <button key={idx} onClick={() => handleOptionClick(option)} className={buttonClass} disabled={isAnswered}>
                {option}
              </button>
            );
          })}
        </div>
      </div>
      {showFirstPassModal && (
        <FirstPassModal
          score={firstPassStats?.score ?? 0}
          total={firstPassStats?.total ?? 0}
          onContinueReview={handleContinueReview}
          onEndQuiz={() => onEndQuizEarly(firstPassStats)}
        />
      )}
    </>
  );
};

// --- Data Transformation Logic ---
const transformDataForQuiz = (rawData, quizMode, category) => {
  if (!rawData) return null;

  const title = rawData.title || 'Quiz';
  let quizContent = [];

  try {
    if (quizMode === 'jlpt') {
      quizContent = rawData.questions.map(q => ({
        questionText: q.questionText,
        options: q.options,
        answer: q.correctOption.text,
      }));
    } else if (quizMode === 'standard' || quizMode === 'custom') {
      const allItems = rawData.quiz_content || [];
      if (category === 'vocabulary') {
        quizContent = allItems.map(item => ({
          questionText: item.meaning,
          answer: item.hiragana,
          options: [
            item.hiragana,
            ...shuffleArray(allItems.filter(i => i.hiragana !== item.hiragana).map(i => i.hiragana)).slice(0, 3)
          ]
        }));
      } else { // Handles Kanji and other similar types
        quizContent = allItems.map(item => ({
          questionText: item.kanji || item.hiragana,
          answer: `${item.hiragana} (${item.meaning})`,
          options: [
            `${item.hiragana} (${item.meaning})`,
            ...shuffleArray(allItems.filter(i => i.hiragana !== item.hiragana).map(i => `${i.hiragana} (${i.meaning})`)).slice(0, 3)
          ]
        }));
      }
    }
  } catch (error) {
    console.error("Error transforming data:", error, { rawData, quizMode, category });
    return null;
  }

  return { title, quizContent };
};

// --- Main Page Component ---
const QuizPage = () => {
  const { quizMode, level, category, itemId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });
  const quizStateRef = useRef({});
  const isQuizCompletedRef = useRef(false);

  useEffect(() => {
    if (!currentUser) return;
    const fetchAndPrepareData = async () => {
      setLoading(true);
      let docPath = '';
      if (quizMode === 'jlpt') {
        docPath = `jlpt/${level}/${category}-test/${itemId}`;
      } else if (quizMode === 'custom') {
        docPath = `users/${currentUser.uid}/customQuizzes/${itemId}`;
      } else { // Assumes 'standard'
        // This is a placeholder path, as standard quizzes are fetched via query.
        // You would typically fetch the specific doc based on level, category, and difficulty (itemId).
        // This logic will need to be adapted if standard quizzes are in a single doc.
        // For this example, we assume they are separate docs for simplicity.
        console.error("Standard quiz fetching needs to be implemented based on your DB structure.");
        // A potential query would be: query(collection(db, 'quizzes'), where('level','==',level), where('category','==',category), where('difficulty','==',itemId))
        // For now, let's assume a direct path for consistency.
        docPath = `quizzes/${level}-${category}-${itemId}`; // Example path
      }

      try {
        const quizDocSnap = await getDoc(doc(db, docPath));
        if (quizDocSnap.exists()) {
          const preparedQuiz = transformDataForQuiz(quizDocSnap.data(), quizMode, category);
          setQuiz(preparedQuiz);
        } else {
          setQuiz(null);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndPrepareData();

    return () => {
      if (isQuizCompletedRef.current || !quizStateRef.current.numberOfQuestions) return;
      saveQuizState({ ...quizStateRef.current, status: 'incomplete' });
    };
  }, [quizMode, level, category, itemId, currentUser]);

  const saveQuizState = async (statsToSave) => {
    if (!currentUser || !quiz) return;
    const quizId = `${quizMode}-${level}-${category}-${itemId}`;
    const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
    
    const result = {
      ...statsToSave, quizId, title: quiz.title, level, category,
      difficulty: quizMode === 'standard' ? itemId : quizMode,
      timestamp: new Date().toISOString(),
    };
    await setDoc(historyDocRef, result, { merge: true });
  };

  const onQuizComplete = async (finalStats) => {
    isQuizCompletedRef.current = true;
    setFinalScore({ score: finalStats.score, total: finalStats.total });
    await saveQuizState({ ...finalStats, status: 'mastered' });
    setShowCompletionModal(true);
  };

  const handleEndQuizEarly = async (stats) => {
    isQuizCompletedRef.current = true;
    await saveQuizState({ ...stats, status: 'incomplete' });
    navigate('/profile');
  };

  const handleModalContinue = () => navigate('/profile');

  if (loading) return <LoadingSpinner />;

  if (!quiz) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h1>Quiz Not Found</h1>
          <p>This content could not be loaded.</p>
          <button onClick={() => navigate(-1)} className="action-button">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <Quiz
        quizContent={quiz.quizContent}
        quizTitle={quiz.title}
        onComplete={onQuizComplete}
        onEndQuizEarly={handleEndQuizEarly}
        quizStateRef={quizStateRef}
      />
      {showCompletionModal && <CompletionModal score={finalScore.score} total={finalScore.total} onContinue={handleModalContinue} />}
    </div>
  );
};

export default QuizPage;