import { useState, useEffect, useCallback } from "react";

// Helper function to shuffle an array
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export function useReadingSrsQuiz(quizData) {
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

    // Initialize the deck from the hierarchical quizData
    useEffect(() => {
        if (!quizData || !quizData.passages) return;
        
        // Flatten the data: create a single deck of cards from all passages
        const flattenedQuestions = quizData.passages.flatMap((passage, passageIndex) => 
            (passage.questions || []).map((q, questionIndex) => ({
                ...q,
                // Add references back to the original passage and question
                passageIndex,
                originalQuestionIndex: questionIndex,
                // Unique ID for the card
                id: `${passageIndex}-${questionIndex}`, 
            }))
        );

        const initializedDeck = flattenedQuestions.map(item => ({
            ...item,
            correctStreak: 0,
            isMastered: false,
        }));

        setDeck(initializedDeck);
        
        // --- FIX: Do NOT shuffle the initial queue ---
        // By removing shuffleArray(), the questions will be presented in the
        // order they appear in the data (0-0, 0-1, 1-0, etc.).
        setUnseenQueue(initializedDeck.map(card => card.id));

        setLearningQueue([]);
        setMasteredCount(0);
        setTotalCorrect(0);
        setTotalIncorrect(0);
        setCurrentCard(null);
        setIsFirstPassComplete(false);
        setHasAcknowledgedFirstPass(false);
    }, [quizData]);

    // This logic is mostly the same as your original hook
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
            setCurrentCard(deck.find(c => c.id === nextCardId));
            setLearningQueue(newLearningQueue);
            setUnseenQueue(newUnseenQueue);
        } else {
            setCurrentCard(null);
        }
    }, [deck, learningQueue, unseenQueue, masteredCount]);
    
    // Handle user's answer (same as original hook)
    const handleAnswer = (isCorrect) => {
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
            // Shuffling incorrect answers back into the learning queue is correct SRS behavior
            setLearningQueue(prev => shuffleArray([...prev, cardId]));
        }

        selectNextCard();
    };
    
    // Start quiz once deck is ready
    useEffect(() => {
        if (deck.length > 0 && !currentCard) {
            selectNextCard();
            setIsLoading(false);
        }
    }, [deck, currentCard, selectNextCard]);

    // Detect when the first pass is complete
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

