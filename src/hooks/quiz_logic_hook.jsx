// src/hooks/quiz_logic_hook.jsx

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

// Spaced Repetition Quiz Hook - Universal Version
export const useSrsQuiz = (cardList) => {
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

  // Initialize or reset the entire quiz state with the provided list of cards
  const initializeDeck = useCallback(() => {
    if (!cardList || cardList.length === 0) {
      setIsLoading(false);
      return;
    }
    const initializedDeck = cardList.map((item, index) => ({
      ...item,
      id: index,
      correctStreak: 0,
      isMastered: false,
    }));
    setDeck(initializedDeck);
    setUnseenQueue(shuffleArray([...Array(initializedDeck.length).keys()]));
    setLearningQueue([]);
    setMasteredCount(0);
    setTotalCorrect(0);
    setTotalIncorrect(0);
    setCurrentCard(null);
    setIsFirstPassComplete(false);
    setHasAcknowledgedFirstPass(false);
    setFirstPassStats({ score: 0, total: 0 });
  }, [cardList]);

  // Core SRS logic to select the next card to display
  const selectNextCard = useCallback(() => {
    let nextCardId = -1;
    let newLearningQueue = [...learningQueue];
    let newUnseenQueue = [...unseenQueue];

    // Priority 1: Review incorrect cards from the learning queue
    if (newLearningQueue.length > 0) {
      nextCardId = newLearningQueue.shift();
    } 
    // Priority 2: Show new, unseen cards
    else if (newUnseenQueue.length > 0) {
      nextCardId = newUnseenQueue.shift();
      // Check if this is the last unseen card, marking the end of the first round
      if (newUnseenQueue.length === 0 && deck.length > 0 && !isFirstPassComplete) {
        setFirstPassStats({ score: totalCorrect, total: totalCorrect + totalIncorrect });
        setIsFirstPassComplete(true);
      }
    } 
    // Priority 3: If no new cards, create a review session of non-mastered cards
    else if (masteredCount < deck.length) {
      const reviewPool = deck.filter((card) => !card.isMastered).map((card) => card.id);
      if (reviewPool.length > 0) {
        newLearningQueue = shuffleArray(reviewPool);
        nextCardId = newLearningQueue.shift();
      }
    }

    if (nextCardId !== -1) {
      const nextCard = deck.find((c) => c.id === nextCardId);
      setCurrentCard({ ...nextCard, options: shuffleArray(nextCard.options) });
    } else {
      // No more cards to show
      setCurrentCard(null);
    }

    setLearningQueue(newLearningQueue);
    setUnseenQueue(newUnseenQueue);
  }, [deck, learningQueue, unseenQueue, masteredCount, isFirstPassComplete, totalCorrect, totalIncorrect]);

  // Handles updating card state based on user's answer
  const handleAnswer = (isCorrect) => {
    if (!currentCard) return;
    const cardId = currentCard.id;

    if (isCorrect) {
      setTotalCorrect((prev) => prev + 1);
    } else {
      setTotalIncorrect((prev) => prev + 1);
      // If incorrect, add card back to the learning queue for immediate review
      setLearningQueue((prev) => shuffleArray([...prev, cardId]));
    }

    const updatedDeck = deck.map((card) => {
      if (card.id === cardId) {
        const newStreak = isCorrect ? card.correctStreak + 1 : 0;
        const isNowMastered = newStreak >= 2; // Mastered after 2 correct answers in a row
        if (isNowMastered && !card.isMastered) {
          setMasteredCount((prev) => prev + 1);
        }
        return { ...card, correctStreak: newStreak, isMastered: isNowMastered };
      }
      return card;
    });

    setDeck(updatedDeck);
    selectNextCard();
  };

  // Main effect to kickstart the quiz
  useEffect(() => {
    setIsLoading(true);
    initializeDeck();
  }, [cardList, initializeDeck]);

  // Effect to select the first card once the deck is ready
  useEffect(() => {
    if (deck.length > 0 && !currentCard) {
      selectNextCard();
      setIsLoading(false);
    }
  }, [deck, currentCard, selectNextCard]);

  const acknowledgeFirstPass = () => {
    setHasAcknowledgedFirstPass(true);
    selectNextCard(); // Immediately select the next card for the review round
  };

  const isComplete = masteredCount === deck.length && deck.length > 0;

  return {
    currentCard,
    masteredCount,
    totalCorrect,
    totalIncorrect,
    deckSize: deck.length,
    unseenCount: unseenQueue.length,
    handleAnswer,
    isComplete,
    isLoading,
    isFirstPassComplete,
    hasAcknowledgedFirstPass,
    acknowledgeFirstPass,
    firstPassStats,
  };
};