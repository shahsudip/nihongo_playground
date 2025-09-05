import { useState, useEffect, useCallback } from 'react';

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// The Custom Hook for the Spaced Repetition System
export const useSrsQuiz = (vocabularyList, quizType = 'kanji') => {
  const [deck, setDeck] = useState([]);
  const [unseenQueue, setUnseenQueue] = useState([]);
  const [learningQueue, setLearningQueue] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [masteredCount, setMasteredCount] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalIncorrect, setTotalIncorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const initializeDeck = useCallback(() => {
    const initialisedDeck = vocabularyList.map((item, index) => ({
      ...item,
      id: index,
      correctStreak: 0,
      isMastered: false,
    }));
    setDeck(initialisedDeck);
    setUnseenQueue(shuffleArray([...Array(initialisedDeck.length).keys()]));
    setLearningQueue([]);
    setMasteredCount(0);
    setTotalCorrect(0);
    setTotalIncorrect(0);
    setCurrentCard(null);
  }, [vocabularyList]);

  const selectNextCard = useCallback(() => {
    let nextCardId = -1;
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

    if (nextCardId !== -1) {
      const nextCard = deck.find(c => c.id === nextCardId);
      let questionText = '';
      const correctAnswer = nextCard.hiragana;

      if (quizType === 'vocabulary') {
        questionText = nextCard.meaning;
      } else {
        questionText = nextCard.kanji || nextCard.hiragana;
      }
      
      setCurrentCard({ ...nextCard, questionText, answer: correctAnswer });
      const distractors = shuffleArray(deck.filter(item => item.hiragana !== correctAnswer)).slice(0, 3).map(item => item.hiragana);
      setCurrentOptions(shuffleArray([correctAnswer, ...distractors]));
      setLearningQueue(newLearningQueue);
      setUnseenQueue(newUnseenQueue);
    } else {
      setCurrentCard(null);
    }
  }, [deck, learningQueue, unseenQueue, masteredCount, quizType]);

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
      setLearningQueue(prev => shuffleArray([...prev, cardId]));
    }
    selectNextCard();
  };

  useEffect(() => {
    if (vocabularyList && vocabularyList.length > 0) {
      setIsLoading(true);
      initializeDeck();
    }
  }, [vocabularyList, initializeDeck]);
  
  useEffect(() => {
    if (deck.length > 0 && !currentCard) {
      selectNextCard();
      setIsLoading(false);
    }
  }, [deck, currentCard, selectNextCard]);

  const isComplete = masteredCount === deck.length && deck.length > 0;

  return {
    currentCard,
    currentOptions,
    masteredCount,
    totalCorrect,
    totalIncorrect,
    deckSize: deck.length,
    handleAnswer,
    isComplete,
    isLoading,
  };
};