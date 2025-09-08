import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quiz_data.jsx';
import { useSrsQuiz } from '../logic/quiz_logic_hook.jsx';





import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quizData.js';
import { useSrsQuiz } from '../hooks/useSrsQuiz.js';

// --- Sub-Components (No changes needed here) ---
const ScoreCounter = ({ correct, incorrect, mastered, total, unseen }) => (
    <div className="score-counter-container">
        <div className="score-item unseen">New: <span>{unseen}</span></div>
        <div className="score-item correct">Correct: <span>{correct}</span></div>
        <div className="score-item incorrect">Incorrect: <span>{incorrect}</span></div>
        <div className="score-item mastered">Mastered: <span>{mastered} / {total}</span></div>
    </div>
);

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


// --- The Quiz View Sub-Component ---
// This component now focuses only on the quiz and calls functions from its parent to handle events.
const Quiz = ({ quizContent, quizTitle, quizType, onComplete, onEndQuizEarly }) => {
    const [showFirstPassModal, setShowFirstPassModal] = useState(false);
    const quizState = useSrsQuiz(quizContent, quizType);
    const { currentCard, currentOptions, handleAnswer, acknowledgeFirstPass, isComplete, isLoading, isFirstPassComplete, hasAcknowledgedFirstPass, firstPassStats } = quizState;
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        if (isFirstPassComplete && !hasAcknowledgedFirstPass) {
            setShowFirstPassModal(true);
        }
        if (isComplete) {
            onComplete(quizState.totalCorrect, quizState.totalCorrect + quizState.totalIncorrect);
        }
    }, [isFirstPassComplete, hasAcknowledgedFirstPass, isComplete, onComplete, quizState.totalCorrect, quizState.totalIncorrect]);

    const handleContinueReview = () => {
        setShowFirstPassModal(false);
        acknowledgeFirstPass();
    };
    
    const handleOptionClick = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
        const isCorrect = option === currentCard.answer;
        setTimeout(() => {
            handleAnswer(isCorrect);
            setIsAnswered(false);
            setSelectedOption(null);
        }, 1000);
    };

    if (isLoading) return <div className="loading-text">Loading Quiz...</div>;
    if (isComplete || !currentCard) return <div className="loading-text">Quiz Complete! Navigating...</div>;

    return (
        <>
            <div className="quiz-card">
                <h1 className="quiz-title">{quizTitle}</h1>
                <ScoreCounter {...quizState} unseen={quizState.unseenCount} />
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
                        return (
                            <button key={index} onClick={() => handleOptionClick(option)} className={buttonClass} disabled={isAnswered}>
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
            {showFirstPassModal && <FirstPassModal score={firstPassStats.score} total={firstPassStats.total} onContinueReview={handleContinueReview} onEndQuiz={() => onEndQuizEarly(firstPassStats)} />}
        </>
    );
};


// --- Main Page Component ---
// This component now handles ALL navigation logic.
const QuizPage = () => {
    const { level, category } = useParams();
    const navigate = useNavigate();
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [unlockedDifficulty, setUnlockedDifficulty] = useState('easy');
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });
    const difficulties = ['easy', 'medium', 'hard'];
    const difficultyMap = { easy: 1, medium: 2, hard: 3 };

    useEffect(() => {
        const storageKey = `quiz-progress-${level}-${category}`;
        const savedProgress = localStorage.getItem(storageKey);
        if (savedProgress) setUnlockedDifficulty(savedProgress);
    }, [level, category]);

    const onQuizComplete = (finalScoreValue, totalAttempts) => {
        const storageKey = `quiz-progress-${level}-${category}`;
        if (selectedDifficulty === 'easy' && unlockedDifficulty === 'easy') {
            localStorage.setItem(storageKey, 'medium');
        } else if (selectedDifficulty === 'medium' && unlockedDifficulty === 'medium') {
            localStorage.setItem(storageKey, 'hard');
        }
        const newResult = { id: Date.now(), level, category, difficulty: selectedDifficulty, score: finalScoreValue, total: totalAttempts, timestamp: new Date().toISOString() };
        const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
        history.push(newResult);
        localStorage.setItem('quizHistory', JSON.stringify(history));
        setFinalScore({ score: finalScoreValue, total: totalAttempts });
        setShowCompletionModal(true);
    };

    const handleModalContinue = () => {
        setShowCompletionModal(false);
        navigate('/profile');
    };

    // --- NEW: Centralized handler for ending the quiz early ---
    const handleEndQuizEarly = (stats) => {
        navigate('/results', {
            state: {
                score: stats.score,
                total: stats.total,
                level: level,
                category: category,
                completedDifficulty: selectedDifficulty,
            },
        });
    };

    const renderDifficultySelection = () => {
        const categoryData = quizData[level]?.[category];
        if (!categoryData) {
            return (
                <div className="quiz-card">
                    <h1>Content for "{category}" not found!</h1>
                    <button onClick={() => navigate('/levels')} className="back-to-levels-button">&larr; Back to Categories</button>
                </div>
            );
        }
        const unlockedLevelNum = difficultyMap[unlockedDifficulty];
        return (
            <div className="difficulty-selection-container">
                <h1 className="difficulty-title">{level.toUpperCase()} - {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                <div className="difficulty-grid">
                    {difficulties.map(difficulty => {
                        const currentLevelNum = difficultyMap[difficulty];
                        const isLocked = currentLevelNum > unlockedLevelNum;
                        const hasContent = categoryData[difficulty]?.quiz_content?.length > 0;
                        return (
                            <button key={difficulty} className={`difficulty-button ${isLocked || !hasContent ? 'locked' : ''}`} disabled={isLocked || !hasContent} onClick={() => setSelectedDifficulty(difficulty)} title={!hasContent ? "No questions for this difficulty yet" : ""}>
                                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                {(isLocked || !hasContent) && <span className="lock-icon">?</span>}
                            </button>
                        );
                    })}
                </div>
                <button onClick={() => navigate('/levels')} className="back-to-levels-button">&larr; Back to Categories</button>
            </div>
        );
    };

    const renderQuiz = () => {
        const quizContent = quizData[level]?.[category]?.[selectedDifficulty]?.quiz_content;
        const quizTitle = quizData[level]?.[category]?.[selectedDifficulty]?.title;
        return <Quiz quizContent={quizContent} quizTitle={quizTitle} quizType={category} onComplete={onQuizComplete} onEndQuizEarly={handleEndQuizEarly} />;
    };

    return (
        <div className="quiz-container">
            {!selectedDifficulty ? renderDifficultySelection() : renderQuiz()}
            {showCompletionModal && <CompletionModal score={finalScore.score} total={finalScore.total} onContinue={handleModalContinue} />}
        </div>
    );
};

export default QuizPage;