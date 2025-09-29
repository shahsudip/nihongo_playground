import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import { useSrsQuiz } from '../hooks/quiz_logic_hook.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { formatDateTime } from '../utils/formatters.jsx';
import LoadingSpinner from '../utils/loading_spinner.jsx';

// -------------------------
// Small UI subcomponents
// -------------------------
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

// -------------------------
// Quiz component (uses useSrsQuiz)
// -------------------------
const Quiz = ({ quizContent = [], quizTitle = '', quizType = 'kanji', onComplete = () => {}, onEndQuizEarly = () => {}, quizStateRef = null }) => {
  const [showFirstPassModal, setShowFirstPassModal] = useState(false);
  const quizState = useSrsQuiz(quizContent, quizType);

  const {
    currentCard,
    handleAnswer,
    acknowledgeFirstPass,
    isComplete,
    isLoading,
    isFirstPassComplete,
    hasAcknowledgedFirstPass,
    firstPassStats,
    totalCorrect: score = 0,
    totalIncorrect = 0, // Using totalIncorrect directly
    masteredCount = 0,
    deckSize: numberOfQuestions = 0,
    unseenCount = 0,
  } = quizState || {};

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (quizStateRef) {
      const total = score + totalIncorrect || numberOfQuestions;
      quizStateRef.current = { score, total, totalIncorrect, mastered: masteredCount, unseen: unseenCount, numberOfQuestions };
    }
  }, [score, totalIncorrect, masteredCount, unseenCount, numberOfQuestions, quizStateRef]);

  useEffect(() => {
    if (isFirstPassComplete && !hasAcknowledgedFirstPass) {
      setShowFirstPassModal(true);
    }
    if (isComplete) {
      onComplete({ score, total: score + totalIncorrect, totalIncorrect, mastered: masteredCount, unseen: unseenCount });
    }
  }, [isFirstPassComplete, hasAcknowledgedFirstPass, isComplete, onComplete, score, totalIncorrect, masteredCount, unseenCount]);

  const handleContinueReview = () => {
    setShowFirstPassModal(false);
    acknowledgeFirstPass && acknowledgeFirstPass();
  };

  const handleOptionClick = (option) => {
    if (isAnswered || !currentCard) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const isCorrect = option === currentCard.answer;
    setTimeout(() => {
      handleAnswer && handleAnswer(isCorrect);
      setIsAnswered(false);
      setSelectedOption(null);
    }, 800);
  };

  if (isLoading) return <LoadingSpinner />;
  if (!currentCard) {
    return <div className="quiz-card"><p>No card available.</p></div>;
  }

  const options = Array.isArray(currentCard.options) ? currentCard.options : [];

  return (
    <>
      <div className="quiz-card">
        <h1 className="quiz-title">{quizTitle}</h1>
        <ScoreCounter score={score} totalIncorrect={totalIncorrect} mastered={masteredCount} numberOfQuestions={numberOfQuestions} unseen={unseenCount} />
        <h2 className="question-text">{currentCard.questionText}</h2>

        <div className="options-grid">
          {options.map((option, idx) => {
            const isCorrectAnswer = option === currentCard.answer;
            const isSelected = selectedOption === option;
            let buttonClass = 'option-button';
            if (isAnswered) {
              if (isCorrectAnswer) buttonClass += ' correct';
              else if (isSelected) buttonClass += ' incorrect';
            }
            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className={buttonClass}
                disabled={isAnswered}
              >
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

// -------------------------
// QuizPage (main screen)
// -------------------------
const transformQuizContent = (rawContent = []) => {
  if (!Array.isArray(rawContent)) return [];
  return rawContent.map((item) => ({
    kanji: item.kanji ?? null,
    hiragana: item.hiragana ?? '',
    meaning: item.meaning ?? '',
  }));
};

const QuizPage = () => {
  const { level, category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, isAdmin } = useAuth();

  const standardLevels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const isCustomQuiz = level && !standardLevels.includes(level);

  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [unlockedDifficulty, setUnlockedDifficulty] = useState('easy');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });
  const [quizData, setQuizData] = useState({});
  const [customQuizData, setCustomQuizData] = useState(null);
  const [quizHistory, setQuizHistory] = useState({});

  const quizStateRef = useRef({});
  const isQuizCompletedRef = useRef(false);

  const difficulties = ['easy', 'medium', 'hard'];
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };

  useEffect(() => {
    if (!currentUser) {
      setLoading(true);
      return;
    }
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        if (location.state?.type === 'custom' || isCustomQuiz) {
          const quizDocRef = doc(db, 'users', currentUser.uid, 'customQuizzes', quizId);;
          const quizDocSnap = await getDoc(quizDocRef);
          if (quizDocSnap.exists()) {
            setCustomQuizData({ id: quizDocSnap.id, ...quizDocSnap.data() });
            setSelectedDifficulty('custom');
          } else {
            console.error("Custom quiz not found!");
            setCustomQuizData(null);
          }
        } else {
          const progressDocRef = doc(db, 'users', currentUser.uid, 'quizProgress', `${level}-${category}`);
          const progressSnap = await getDoc(progressDocRef);
          if (progressSnap.exists()) setUnlockedDifficulty(progressSnap.data().unlocked);

          const quizContentQuery = query(collection(db, 'quizzes'), where('level', '==', level), where('category', '==', category));
          const contentSnapshot = await getDocs(quizContentQuery);
          const fetchedQuizzes = {};
          contentSnapshot.forEach(docSnap => {
            const data = docSnap.data();
            if (data && data.difficulty) fetchedQuizzes[data.difficulty] = data;
          });
          setQuizData(fetchedQuizzes);

          const historyQuery = query(collection(db, 'users', currentUser.uid, 'quizHistory'), where('level', '==', level), where('category', '==', category));
          const historySnapshot = await getDocs(historyQuery);
          const fetchedHistory = {};
          historySnapshot.forEach(docSnap => {
            const data = docSnap.data();
            if (data && data.difficulty) fetchedHistory[data.difficulty] = data;
          });
          setQuizHistory(fetchedHistory);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [currentUser, level, category, isCustomQuiz]);

  useEffect(() => {
    return () => {
      if (isQuizCompletedRef.current || !selectedDifficulty || !currentUser) return;
      const saveIncompleteState = async () => {
        try {
          const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
          const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
          const partialResult = { ...(quizStateRef.current || {}), timestamp: new Date().toISOString(), status: 'incomplete' };
          await setDoc(historyDocRef, partialResult, { merge: true });
        } catch (err) {
          console.error("Failed to save incomplete quiz state:", err);
        }
      };
      saveIncompleteState();
    };
  }, [selectedDifficulty, currentUser, level, category, isCustomQuiz]);

  const handleDifficultySelect = async (difficulty) => {
    if (!currentUser) return;
    const quizId = `${level}-${category}-${difficulty}`;
    const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
    isQuizCompletedRef.current = false;
    quizStateRef.current = {};
    const baseRecord = { quizId, title: quizData[difficulty]?.title || "Quiz", level, category, difficulty, timestamp: new Date().toISOString(), status: 'incomplete' };
    if (!quizHistory[difficulty]) {
      const newRecord = { ...baseRecord, score: 0, total: quizData[difficulty]?.quiz_content?.length || 1, totalIncorrect: 0, mastered: 0, unseen: 0 };
      await setDoc(historyDocRef, newRecord);
    } else {
      await setDoc(historyDocRef, baseRecord, { merge: true });
    }
    setSelectedDifficulty(difficulty);
  };

  const onQuizComplete = async (finalStats) => {
    isQuizCompletedRef.current = true;
    if (!currentUser) return;
    try {
      if (!isCustomQuiz) {
        const progressDocRef = doc(db, 'users', currentUser.uid, 'quizProgress', `${level}-${category}`);
        if (selectedDifficulty === 'easy' && unlockedDifficulty === 'easy') await setDoc(progressDocRef, { unlocked: 'medium' });
        else if (selectedDifficulty === 'medium' && unlockedDifficulty === 'medium') await setDoc(progressDocRef, { unlocked: 'hard' });
      }

      const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
      const finalResult = { ...finalStats, timestamp: new Date().toISOString(), status: 'mastered' };

      if (isCustomQuiz && customQuizData) {
        finalResult.quizId = level;
        finalResult.title = customQuizData.title;
        finalResult.level = 'custom';
        finalResult.category = category;
        finalResult.difficulty = 'custom';
      }

      await setDoc(historyDocRef, finalResult, { merge: true });
      setFinalScore({ score: finalStats.score, total: finalStats.total });
      setShowCompletionModal(true);
    } catch (err) {
      console.error("Error saving final quiz result:", err);
    }
  };

  const handleEndQuizEarly = async (stats) => {
    isQuizCompletedRef.current = true;
    if (!currentUser) return;
    try {
      const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
      const partialResult = { 
        score: stats?.score ?? 0, 
        total: stats?.total ?? 0,
        totalIncorrect: (stats?.total ?? 0) - (stats?.score ?? 0),
        mastered: stats?.mastered ?? 0,
        unseen: stats?.unseen ?? 0,
        timestamp: new Date().toISOString(), 
        status: 'incomplete',
      };
      await setDoc(historyDocRef, partialResult, { merge: true });
      navigate('/profile');
    } catch (err) {
      console.error("Error saving incomplete result:", err);
    }
  };

  const handleModalContinue = () => {
    setShowCompletionModal(false);
    navigate('/profile');
  };

  const renderDifficultySelection = () => {
    const unlockedLevelNum = difficultyMap[unlockedDifficulty] || 1;
    return (
  <div className="difficulty-selection-container">
    <h1 className="difficulty-title">{String(level).toUpperCase()} - {String(category).charAt(0).toUpperCase() + String(category).slice(1)}</h1>
    <div className="difficulty-grid">
      {difficulties.map(difficulty => {
        const history = quizHistory[difficulty];
        const currentLevelNum = difficultyMap[difficulty];
        const isLocked = !isAdmin && currentLevelNum > unlockedLevelNum;
        const hasContent = Boolean(quizData[difficulty]?.quiz_content?.length);
        
        // --- NEW: Check if the quiz is mastered ---
        const isMastered = history && history.mastered === history.total && history.total > 0;

        return (
          <button
            key={difficulty}
            // --- MODIFIED: Add 'mastered' class and disable if mastered ---
            className={`difficulty-button ${isLocked || !hasContent ? 'locked' : ''} ${isMastered ? 'mastered' : ''}`}
            disabled={isLocked || !hasContent || isMastered}
            onClick={() => handleDifficultySelect(difficulty)}
          >
            {history ? (
              // --- NEW: Check for mastered state first ---
              isMastered ? (
                <>
                  <span className="difficulty-status-badge status-badge status-mastered">
                    Mastered ✨
                  </span>
                  <div className="difficulty-main">
                    <span className="difficulty-main-text">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
                    <span className="difficulty-score">{`${history.mastered}/${history.numberOfQuestions}`}</span>
                  </div>
                  <div className="difficulty-timestamp">
                    {formatDateTime(history.timestamp)}
                  </div>
                </>
              ) : (
                // --- This is the original "in-progress" view ---
                <>
                  <span className={`difficulty-status-badge status-badge status-${history.status}`}>{history.status}</span>
                  <div className="difficulty-main">
                    <span className="difficulty-main-text">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
                    <span className="difficulty-score">{`${history.score}/${history.total}`}</span>
                  </div>
                  <div className="difficulty-timestamp">
                    {formatDateTime(history.timestamp)}
                  </div>
                </>
              )
            ) : isLocked ? (
              <div className="difficulty-main">
                <span className="difficulty-main-text">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
              </div>
            ) : (
              <div className="difficulty-main">
                <span className="difficulty-main-text">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Start</span>
              </div>
            )}
            {isLocked && <span className="lock-icon">🔒</span>}
          </button>
        );
      })}
    </div>
  </div>
);
  };

  const renderQuiz = () => {
    let rawContent = [];
    let quizTitle = '';

    if (isCustomQuiz) {
      if (!customQuizData) {
        return (
          <div className="quiz-card">
            <h1>Custom Quiz Not Found</h1>
            <p>This quiz may have been deleted or the link is incorrect.</p>
          </div>
        );
      }
      quizTitle = customQuizData.title || 'Custom Quiz';
      rawContent = Array.isArray(customQuizData.quiz_content) ? customQuizData.quiz_content : [];
    } else {
      const standardQuiz = quizData[selectedDifficulty];
      if (!standardQuiz) {
        return <LoadingSpinner />;
      }
      quizTitle = standardQuiz.title || `${level}-${category}`;
      rawContent = Array.isArray(standardQuiz.quiz_content) ? standardQuiz.quiz_content : [];
    }

    const quizContent = transformQuizContent(rawContent);

    return (
      <Quiz
        quizContent={quizContent}
        quizTitle={quizTitle}
        quizType={category}
        onComplete={onQuizComplete}
        onEndQuizEarly={handleEndQuizEarly}
        quizStateRef={quizStateRef}
      />
    );
  };

  if (loading || !currentUser) return <LoadingSpinner />;

  return (
    <div className="quiz-container">
      {isCustomQuiz ? (
        renderQuiz()
      ) : (
        !selectedDifficulty ? renderDifficultySelection() : renderQuiz()
      )}
      {showCompletionModal && <CompletionModal score={finalScore.score} total={finalScore.total} onContinue={handleModalContinue} />}
    </div>
  );
};

export default QuizPage;