import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- HELPER HOOK & UTILITY COMPONENTS ---
// These are included directly in this file to prevent import/compilation errors.

/**
 * Custom hook to manage the Spaced Repetition System (SRS) logic for the quiz.
 */
function useReadingSrsQuiz(quizData) {
    const [deck, setDeck] = useState([]);
    const [unseenQueue, setUnseenQueue] = useState([]);
    const [learningQueue, setLearningQueue] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [masteredCount, setMasteredCount] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalIncorrect, setTotalIncorrect] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFirstPassComplete, setIsFirstPassComplete] = useState(false);
    const [hasAcknowledgedFirstPass, setHasAcknowledgedFirstPass] = useState(false);
    const [firstPassStats, setFirstPassStats] = useState({ score: 0, total: 0 });

    // Helper function to shuffle an array
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    useEffect(() => {
        if (!quizData || !quizData.passages) return;
        
        const flattenedQuestions = quizData.passages.flatMap((passage, passageIndex) => 
            (passage.questions || []).map((q, questionIndex) => ({
                ...q,
                passageIndex,
                originalQuestionIndex: questionIndex,
                id: `${passageIndex}-${questionIndex}`, 
            }))
        );

        const initializedDeck = flattenedQuestions.map(item => ({
            ...item,
            correctStreak: 0,
            isMastered: false,
        }));

        setDeck(initializedDeck);
        setUnseenQueue(initializedDeck.map(card => card.id)); // Ensures sequential start
        setLearningQueue([]);
        setMasteredCount(0);
        setTotalCorrect(0);
        setTotalIncorrect(0);
        setCurrentCard(null);
        setIsFirstPassComplete(false);
        setHasAcknowledgedFirstPass(false);
    }, [quizData]);

    const selectNextCard = useCallback(() => {
        let nextCardId = null;
        let newLearningQueue = [...learningQueue];
        let newUnseenQueue = [...unseenQueue];

        if (newLearningQueue.length > 0) {
            nextCardId = newLearningQueue.shift();
        } else if (newUnseenQueue.length > 0) {
            nextCardId = newUnseenQueue.shift();
        } else if (masteredCount < deck.length) {
            const reviewQueue = deck.filter(card => !card.isMastered).map(card => card.id);
            if (reviewQueue.length > 0) {
                newLearningQueue = shuffleArray(reviewQueue);
                nextCardId = newLearningQueue.shift();
            }
        }

        if (nextCardId) {
            const nextCard = deck.find(c => c.id === nextCardId);
            setCurrentCard(nextCard);
            setLearningQueue(newLearningQueue);
            setUnseenQueue(newUnseenQueue);
        } else {
            setCurrentCard(null);
        }
    }, [deck, learningQueue, unseenQueue, masteredCount]);
    
    const handleAnswer = (isCorrect) => {
        if (!currentCard) return;
        const cardId = currentCard.id;
        if (isCorrect) {
            setTotalCorrect(prev => prev + 1);
        } else {
            setTotalIncorrect(prev => prev + 1);
        }

        const updatedDeck = deck.map(card => {
            if (card.id === cardId) {
                const newStreak = isCorrect ? card.correctStreak + 1 : 0;
                const isNowMastered = newStreak >= 2;
                if (isNowMastered && !card.isMastered) {
                    setMasteredCount(prev => prev + 1);
                }
                return { ...card, correctStreak: newStreak, isMastered: isNowMastered };
            }
            return card;
        });

        setDeck(updatedDeck);

        if (!isCorrect) {
            setLearningQueue(prev => shuffleArray([...prev, cardId]));
        }

        selectNextCard();
    };
    
    useEffect(() => {
        if (deck.length > 0 && !currentCard && !isLoading) {
            selectNextCard();
        }
    }, [deck, currentCard, isLoading, selectNextCard]);

    useEffect(() => {
         if (deck.length > 0 && isLoading) {
            setIsLoading(false);
        }
    },[deck, isLoading]);

    useEffect(() => {
        if (!isLoading && deck.length > 0 && unseenQueue.length === 0 && !isFirstPassComplete) {
            setFirstPassStats({
                score: totalCorrect,
                total: totalCorrect + totalIncorrect,
            });
            setIsFirstPassComplete(true);
        }
    }, [unseenQueue.length, deck.length, isLoading, isFirstPassComplete, totalCorrect, totalIncorrect]);
    
    const acknowledgeFirstPass = () => {
        setHasAcknowledgedFirstPass(true);
    };

    const isComplete = masteredCount === deck.length && deck.length > 0;

    return {
        currentCard, masteredCount, totalCorrect, totalIncorrect,
        deckSize: deck.length, handleAnswer, isComplete, isLoading,
        isFirstPassComplete, hasAcknowledgedFirstPass, acknowledgeFirstPass,
        firstPassStats, unseenCount: unseenQueue.length,
    };
}

const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
    </div>
);

const ProgressBar = ({ mastered, total }) => {
    const progress = total > 0 ? (mastered / total) * 100 : 0;
    return (
        <div style={{ width: '100%', backgroundColor: '#e0e0de', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, backgroundColor: '#4caf50', height: '10px' }}></div>
        </div>
    );
};

/**
 * A component that takes text and a vocabulary list, highlighting matching words
 * and showing a tooltip with details on hover.
 */
const HighlightedText = ({ text, vocab }) => {
    if (!vocab || vocab.length === 0 || !text) {
        return <>{text}</>;
    }

    // Memoize the creation of the regex for performance.
    // This is the core of the highlighting logic.
    const { regex, vocabMap } = useMemo(() => {
        const map = new Map();
        const allForms = [];

        for (const entry of vocab) {
            if (entry.japanese) {
                // Add the main Japanese form (e.g., Kanji "昨日")
                allForms.push(entry.japanese);
                map.set(entry.japanese, entry);
                
                // If a Hiragana "reading" exists, add it too (e.g., "きのう")
                if (entry.reading && entry.reading !== entry.japanese) {
                    allForms.push(entry.reading);
                    map.set(entry.reading, entry);
                }
            }
        }

        if (allForms.length === 0) {
            return { regex: null, vocabMap: null };
        }

        // Sort by length descending to match longer phrases first
        const uniqueForms = [...new Set(allForms)].sort((a, b) => b.length - a.length);
        
        // Create a single regex to find all vocabulary words
        const finalRegex = new RegExp(`(${uniqueForms.join('|')})`, 'g');
        return { regex: finalRegex, vocabMap: map };
    }, [vocab]);

    if (!regex) {
        return <>{text}</>;
    }

    // Split the text into parts that are either vocab words or regular text
    const parts = text.split(regex).filter(part => part);

    return (
        <>
            {parts.map((part, index) => {
                // Look up the part in our map to see if it's a known vocab word
                const vocabEntry = vocabMap.get(part);
                
                if (vocabEntry) {
                    return (
                        <span key={index} className="highlighted-vocab">
                            {part}
                            <div className="vocab-tooltip">
                                <p><strong>English:</strong> {vocabEntry.english}</p>
                                <p><strong>Japanese:</strong> {vocabEntry.japanese}</p>
                                <p><strong>Romaji:</strong> {vocabEntry.romaji || 'N/A'}</p>
                            </div>
                        </span>
                    );
                }
                return part; // If not a vocab word, render as plain text
            })}
        </>
    );
};


// --- MAIN QUIZ COMPONENT ---
const ScoreCounter = ({ score, totalIncorrect, mastered, numberOfQuestions, unseen }) => (
    <div className="score-counter-container">
        <div className="score-item unseen">New<span>{unseen}</span></div>
        <div className="score-item correct">Correct<span>{score}</span></div>
        <div className="score-item incorrect">Incorrect<span>{totalIncorrect}</span></div>
        <div className="score-item mastered">Mastered<span>{mastered} / {numberOfQuestions}</span></div>
    </div>
);

const FirstPassModal = ({ score, total, onContinueReview, onEndQuiz }) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>First Round Complete!</h2>
            <p className="modal-score-text">Current Score:</p>
            <div className="modal-score-display">{score} / {total}</div>
            <div className="modal-actions">
                <button onClick={onEndQuiz} className="action-button home">Save & Exit</button>
                <button onClick={onContinueReview} className="action-button next-level">Continue Review</button>
            </div>
        </div>
    </div>
);

const ReadingQuizScreen = ({ quizState, onComplete, onEndQuizEarly, quizStateRef }) => {
    const { quizData, quizTitle, level } = quizState;

    const {
        currentCard, handleAnswer, acknowledgeFirstPass, isLoading,
        isFirstPassComplete, hasAcknowledgedFirstPass, firstPassStats, isComplete,
        totalCorrect: score, totalIncorrect, masteredCount, unseenCount,
        deckSize: numberOfQuestions,
    } = useReadingSrsQuiz(quizData);

    const [viewedPassageIndex, setViewedPassageIndex] = useState(null);
    const [viewedQuestionIndex, setViewedQuestionIndex] = useState(null);
    
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const viewedPassage = useMemo(() => {
        if (!quizData?.passages || viewedPassageIndex === null) return null;
        return quizData.passages[viewedPassageIndex];
    }, [quizData, viewedPassageIndex]);

    const viewedQuestion = useMemo(() => {
        if (!viewedPassage?.questions || viewedQuestionIndex === null) return null;
        return viewedPassage.questions[viewedQuestionIndex];
    }, [viewedPassage, viewedQuestionIndex]);

    useEffect(() => {
        if (currentCard) {
            setViewedPassageIndex(currentCard.passageIndex);
            setViewedQuestionIndex(currentCard.originalQuestionIndex);
        }
    }, [currentCard]);

    useEffect(() => {
        if (quizStateRef) {
            quizStateRef.current = {
                score, total: numberOfQuestions, totalIncorrect,
                mastered: masteredCount, unseen: unseenCount,
            };
        }
    }, [score, totalIncorrect, masteredCount, unseenCount, numberOfQuestions, quizStateRef]);
    
    useEffect(() => {
        if (isComplete) {
            onComplete?.({ score, total: numberOfQuestions, totalIncorrect, mastered: masteredCount, unseen: unseenCount });
        }
    }, [isComplete, score, totalIncorrect, masteredCount, unseenCount, onComplete, numberOfQuestions]);
    
    const handleOptionClick = (option) => {
        if (isAnswered || !currentCard) return;
        setSelectedOption(option);
        setIsAnswered(true);
        
        const isCorrect = currentCard.correctOption?.text === option;

        setTimeout(() => {
            handleAnswer(isCorrect);
            setIsAnswered(false);
            setSelectedOption(null);
        }, 800);
    };
    
    const handlePassageSelect = (index) => {
        setViewedPassageIndex(index);
        setViewedQuestionIndex(0);
    };

    const handleQuestionNav = (direction) => {
        if (!viewedPassage) return;
        const newIndex = viewedQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < viewedPassage.questions.length) {
            setViewedQuestionIndex(newIndex);
        }
    };
    
    if (isLoading) return <LoadingSpinner />;

    if (isFirstPassComplete && !hasAcknowledgedFirstPass) {
        return (
            <FirstPassModal
                score={firstPassStats?.score ?? 0}
                total={firstPassStats?.total ?? 0}
                onContinueReview={acknowledgeFirstPass}
                onEndQuiz={() => onEndQuizEarly(quizStateRef.current)}
            />
        );
    }
    
    if (!viewedPassage || !viewedQuestion) {
        return <div className="reading-quiz-container"><h2 className="category-title">Loading Quiz...</h2></div>;
    }

    const isSrsActiveQuestion = currentCard?.id === `${viewedPassageIndex}-${viewedQuestionIndex}`;
    const showArrows = viewedPassage?.questions?.length > 1;

    return (
        <div className="reading-quiz-container">
            <div className="quiz-header">
                <h1 className="quiz-main-title">{level?.toUpperCase()} - {quizTitle}</h1>
                <ScoreCounter score={score} totalIncorrect={totalIncorrect} mastered={masteredCount} numberOfQuestions={numberOfQuestions} unseen={unseenCount} />
                <ProgressBar mastered={masteredCount} total={numberOfQuestions} />
            </div>

            <div className="quiz-body">
                <aside className="passage-list">
                    {quizData.passages.map((passage, index) => {
                        const isCurrentlyViewed = index === viewedPassageIndex;
                        return (
                        <button 
                            key={index} 
                            className={`passage-button ${isCurrentlyViewed ? 'active' : ''}`}
                            onClick={() => handlePassageSelect(index)}
                        >
                            {passage?.title || `Passage ${index + 1}`}
                            {isCurrentlyViewed && <span className="active-question-indicator"></span>}
                        </button>
                    )})}
                </aside>

                <main className="content-area">
                    <div className="passage-content">
                        <h3 className="passage-title">{viewedPassage?.title || 'Passage'}</h3>
                        <p className="passage-text">
                            <HighlightedText text={viewedPassage?.passageText || '[Passage content is missing]'} vocab={quizData?.vocab} />
                        </p>
                    </div>

                    <div className="question-carousel">
                        {showArrows && (
                            <button 
                                className="carousel-arrow" 
                                onClick={() => handleQuestionNav(-1)}
                                disabled={viewedQuestionIndex === 0}
                            >
                                &#8249;
                            </button>
                        )}
                        
                        <div className="question-content">
                            <h2 className="question-text">
                                {viewedQuestionIndex + 1}.{' '}
                                <HighlightedText text={viewedQuestion?.questionText || '[Question content is missing]'} vocab={quizData?.vocab} />
                            </h2>
                            <div className="options-grid">
                                {viewedQuestion?.options?.map((option, index) => {
                                    const isCorrectAnswer = viewedQuestion.correctOption?.text === option;
                                    const isSelected = selectedOption === option;
                                    let buttonClass = 'option-button';

                                    if (isSrsActiveQuestion && isAnswered) {
                                        if (isCorrectAnswer) buttonClass += ' correct';
                                        else if (isSelected) buttonClass += ' incorrect';
                                    }
                                    
                                    return (
                                        <button
                                            key={index}
                                            className={buttonClass}
                                            onClick={() => handleOptionClick(option)}
                                            disabled={!isSrsActiveQuestion || isAnswered}
                                        >
                                            <HighlightedText text={option} vocab={quizData?.vocab} />
                                        </button>
                                    );
                                }) || <p>No options available for this question.</p>}
                            </div>
                        </div>

                        {showArrows && (
                            <button 
                                className="carousel-arrow" 
                                onClick={() => handleQuestionNav(1)}
                                disabled={viewedQuestionIndex === viewedPassage.questions.length - 1}
                            >
                                &#8250;
                            </button>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ReadingQuizScreen;

