import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSrsQuiz } from '../hooks/quiz_logic_hook.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

// --- Sub-Component: ScoreCounter (Updated Labels and Props) ---
const ScoreCounter = ({ score, attempts, mastered, numberOfQuestions, unseen }) => (
  <div className="score-counter-container">
    <div className="score-item unseen">New: <span>{unseen}</span></div>
    <div className="score-item correct">Score: <span>{score}</span></div>
    <div className="score-item incorrect">Attempts: <span>{attempts}</span></div>
    <div className="score-item mastered">Mastered: <span>{mastered} / {numberOfQuestions}</span></div>
  </div>
);

// --- Sub-Component: CompletionModal ---
const CompletionModal = ({ score, total, onContinue }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Quiz Complete!</h2>
      <p className="modal-score-text">Your Final Score:</p>
      <div className="modal-score-display">{score} / {total}</div>
      <button onClick={onContinue} className="action-button next-level">View Profile & Save Score &rarr;</button>
    </div>
  </div>
);

// --- Sub-Component: FirstPassModal ---
const FirstPassModal = ({ score, total, onContinueReview, onEndQuiz }) => (
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

// --- Sub-Component: The Quiz View ---
const Quiz = ({ quizContent, quizTitle, quizType, onComplete, onEndQuizEarly, quizStateRef }) => {
  const [showFirstPassModal, setShowFirstPassModal] = useState(false);
  const quizState = useSrsQuiz(quizContent, quizType);
  const { currentCard, currentOptions, handleAnswer, acknowledgeFirstPass, isComplete, isLoading, isFirstPassComplete, hasAcknowledgedFirstPass, firstPassStats, totalCorrect: score, totalIncorrect: attempts, masteredCount, deckSize: numberOfQuestions, unseenCount } = quizState;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (quizStateRef) {
      quizStateRef.current = { score, total: score + attempts || numberOfQuestions, attempts, mastered: masteredCount, unseen: unseenCount, numberOfQuestions };
    }
  }, [score, attempts, masteredCount, unseenCount, numberOfQuestions, quizStateRef]);

  useEffect(() => {
    if (isFirstPassComplete && !hasAcknowledgedFirstPass) setShowFirstPassModal(true);
    if (isComplete) {
      onComplete({ score, total: score + attempts, attempts, mastered: masteredCount, unseen: unseenCount });
    }
  }, [isFirstPassComplete, hasAcknowledgedFirstPass, isComplete, onComplete, score, attempts, masteredCount, unseenCount]);

  const handleContinueReview = () => {
    setShowFirstPassModal(false);
    acknowledgeFirstPass();
  };

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const isCorrect = option === currentCard.answer;
    setTimeout(() => { handleAnswer(isCorrect); setIsAnswered(false); setSelectedOption(null); }, 1000);
  };

  if (isLoading) return <div className="loading-text">Loading Quiz...</div>;
  if (isComplete || !currentCard) return <div className="loading-text">Quiz Complete! Navigating...</div>;

  return (
    <>
      <div className="quiz-card">
        <h1 className="quiz-title">{quizTitle}</h1>
        <ScoreCounter score={score} attempts={attempts} mastered={masteredCount} numberOfQuestions={numberOfQuestions} unseen={unseenCount} />
        <h2 className="question-text">{currentCard.questionText}</h2>
        <div className="options-grid">
          {currentOptions.map((option, index) => {
            const isCorrectAnswer = option === currentCard.answer;
            const isSelected = selectedOption === option;
            let buttonClass = 'option-button';
            if (isAnswered) {
              if (isCorrectAnswer) buttonClass += ' correct';
              else if (isSelected) buttonClass += ' incorrect';
            }
            return <button key={index} onClick={() => handleOptionClick(option)} className={buttonClass} disabled={isAnswered}>{option}</button>;
          })}
        </div>
      </div>
      {showFirstPassModal && <FirstPassModal score={firstPassStats.score} total={firstPassStats.total} onContinueReview={handleContinueReview} onEndQuiz={() => onEndQuizEarly(firstPassStats)} />}
    </>
  );
};

// --- Main Page Component ---
const QuizPage = () => {
  const { level, category } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isCustomQuiz = level.startsWith('custom-');

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
    if (!currentUser) return;
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        if (isCustomQuiz) {
          const quizDocRef = doc(db, 'users', currentUser.uid, 'customQuizzes', level);
          const quizDocSnap = await getDoc(quizDocRef);
          if (quizDocSnap.exists()) {
            setCustomQuizData({ id: quizDocSnap.id, ...quizDocSnap.data() });
            // For custom quizzes, we go straight to the quiz
            setSelectedDifficulty('custom'); 
          } else {
            console.error("Custom quiz not found!");
          }
        } else {
          // Standard quiz fetching logic
          const progressDocRef = doc(db, 'users', currentUser.uid, 'quizProgress', `${level}-${category}`);
          const progressSnap = await getDoc(progressDocRef);
          if (progressSnap.exists()) setUnlockedDifficulty(progressSnap.data().unlocked);

          const quizContentQuery = query(collection(db, 'quizzes'), where('level', '==', level), where('category', '==', category));
          const contentSnapshot = await getDocs(quizContentQuery);
          const fetchedQuizzes = {};
          contentSnapshot.forEach(doc => { fetchedQuizzes[doc.data().difficulty] = doc.data(); });
          setQuizData(fetchedQuizzes);
          
          const historyQuery = query(collection(db, 'users', currentUser.uid, 'quizHistory'), where('level', '==', level), where('category', '==', category));
          const historySnapshot = await getDocs(historyQuery);
          const fetchedHistory = {};
          historySnapshot.forEach(doc => { fetchedHistory[doc.data().difficulty] = doc.data(); });
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
        const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
        const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
        
        const partialResult = { ...quizStateRef.current, timestamp: new Date().toISOString(), status: 'incomplete' };
        console.log(`User interrupted quiz. Saving state...`);
        await setDoc(historyDocRef, partialResult, { merge: true });
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
      const newRecord = { ...baseRecord, score: 0, total: quizData[difficulty]?.quiz_content?.length || 1, attempts: 0, mastered: 0, unseen: 0 };
      await setDoc(historyDocRef, newRecord);
    } else {
      await setDoc(historyDocRef, baseRecord, { merge: true });
    }
    setSelectedDifficulty(difficulty);
  };
  
  const onQuizComplete = async (finalStats) => {
    isQuizCompletedRef.current = true;
    if (!currentUser) return;
    
    // Unlock logic only applies to standard quizzes
    if (!isCustomQuiz) {
        const progressDocRef = doc(db, 'users', currentUser.uid, 'quizProgress', `${level}-${category}`);
        if (selectedDifficulty === 'easy' && unlockedDifficulty === 'easy') await setDoc(progressDocRef, { unlocked: 'medium' });
        else if (selectedDifficulty === 'medium' && unlockedDifficulty === 'medium') await setDoc(progressDocRef, { unlocked: 'hard' });
    }

    const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
    const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
    const finalResult = { ...finalStats, timestamp: new Date().toISOString(), status: 'completed' };
    
    // For a custom quiz, ensure the base details are included on completion
    if (isCustomQuiz) {
        finalResult.quizId = level;
        finalResult.title = customQuizData.title;
        finalResult.level = 'custom';
        finalResult.category = category;
        finalResult.difficulty = 'custom';
    }
    
    await setDoc(historyDocRef, finalResult, { merge: true });
    setFinalScore({ score: finalStats.score, total: finalStats.total });
    setShowCompletionModal(true);
  };
  
  const handleEndQuizEarly = async (stats) => {
    isQuizCompletedRef.current = true;
    if (!currentUser) return;

    const quizId = isCustomQuiz ? level : `${level}-${category}-${selectedDifficulty}`;
    const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', quizId);
    const partialResult = { score: stats.score, total: stats.total, attempts: stats.total - stats.score, timestamp: new Date().toISOString(), status: 'incomplete' };
    
    await setDoc(historyDocRef, partialResult, { merge: true });
    navigate('/profile');
  };

  const handleModalContinue = () => {
    setShowCompletionModal(false);
    navigate('/profile');
  };

  const renderDifficultySelection = () => {
    // This function will not be rendered for custom quizzes
    const unlockedLevelNum = difficultyMap[unlockedDifficulty];
    return (
      <div className="difficulty-selection-container">
        <h1 className="difficulty-title">{level.toUpperCase()} - {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <div className="difficulty-grid">
          {difficulties.map(difficulty => {
            const history = quizHistory[difficulty];
            const currentLevelNum = difficultyMap[difficulty];
            const buttonText = history ? 'Retry' : 'Start';
            const isLocked = currentLevelNum > unlockedLevelNum;
            const hasContent = quizData[difficulty]?.quiz_content?.length > 0;
            return (
              <button key={difficulty} className={`difficulty-button ${isLocked || !hasContent ? 'locked' : ''}`} disabled={isLocked || !hasContent} onClick={() => handleDifficultySelect(difficulty)}>
                <span className="difficulty-main-text">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
                <span className="difficulty-action-text">{buttonText}</span>
                {history && <span className={`difficulty-status-badge status-${history.status}`}>{history.status === 'completed' ? `✓ ${history.score}/${history.total}` : `Paused: ${history.score}/${history.total}`}</span>}
                {isLocked && <span className="lock-icon">🔒</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderQuiz = () => {
    let quizContent, quizTitle, quizType;

    if (isCustomQuiz) {
        if (!customQuizData) return <h1>Custom Quiz Not Found!</h1>;
        
        quizTitle = customQuizData.title;
        quizType = category;

        // --- DYNAMIC QUIZ GENERATION LOGIC ---
        const rawContent = customQuizData.quiz_content || [];
        if (category === 'kanji') {
            // Kanji Quiz: Question is Kanji, Answer is Meaning
            quizContent = rawContent.map(item => ({
                questionText: item.kanji,
                answer: item.meaning
            }));
        } else { // Default to 'vocabulary'
            // Vocabulary Quiz: Question is Meaning, Answer is Hiragana
            quizContent = rawContent.map(item => ({
                questionText: item.meaning,
                answer: item.hiragana
            }));
        }
    } else {
        const standardQuiz = quizData[selectedDifficulty];
        if (!standardQuiz) return <h1>Quiz Content Not Found!</h1>;
        quizContent = standardQuiz.quiz_content;
        quizTitle = standardQuiz.title;
        quizType = category;
    }
    return <Quiz quizContent={quizContent} quizTitle={quizTitle} quizType={quizType} onComplete={onQuizComplete} onEndQuizEarly={handleEndQuizEarly} quizStateRef={quizStateRef} />;
  };

  if (loading) return <div className="loading-text">Loading Quiz Data...</div>;
  if (!currentUser) return <div className="loading-text">Please log in to play a quiz.</div>;

  return (
    <div className="quiz-container">
      {(!selectedDifficulty) ? renderDifficultySelection() : renderQuiz()}
      {showCompletionModal && <CompletionModal score={finalScore.score} total={finalScore.total} onContinue={handleModalContinue} />}
    </div>
  );
};

export default QuizPage;