import { useState, useEffect, useCallback } from "react";
import { db } from "../firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function useJlptSrsQuiz(quizId, level, category) {
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

  // Fetches and initializes the deck. This part is correct.
  useEffect(() => {
    if (!quizId || !level || !category) return;
    const fetchAndInitialize = async () => {
      setIsLoading(true);
      try {
        const docPath = `jlpt/${level}/${category}-test/${quizId}`;
        const quizDoc = await getDoc(doc(db, docPath));
        if (quizDoc.exists()) {
          const questions = quizDoc.data().questions || [];
          const initializedDeck = questions.map((item, index) => ({
            ...item,
            id: index,
            answer: item.correctOption.text,
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
        }
      } catch (err) {
        console.error("Error fetching JLPT quiz:", err);
      }
    };
    fetchAndInitialize();
  }, [quizId, level, category]);

  // Selects the next card to display
  const selectNextCard = useCallback(() => {
    let nextCardId = -1;
    let newLearningQueue = [...learningQueue];
    let newUnseenQueue = [...unseenQueue];

    if (newLearningQueue.length > 0) {
      nextCardId = newLearningQueue.shift();
    } else if (newUnseenQueue.length > 0) {
      nextCardId = newUnseenQueue.shift();
      // --- FIX 1: The logic for setting isFirstPassComplete is REMOVED from here ---
    } else if (masteredCount < deck.length) {
      const reviewQueue = deck.filter((card) => !card.isMastered).map((card) => card.id);
      if (reviewQueue.length > 0) {
        newLearningQueue = shuffleArray(reviewQueue);
        nextCardId = newLearningQueue.shift();
      }
    }

    if (nextCardId !== -1) {
      const nextCard = deck.find((c) => c.id === nextCardId);
      setCurrentCard(nextCard);
      setLearningQueue(newLearningQueue);
      setUnseenQueue(newUnseenQueue);
    } else {
      setCurrentCard(null);
    }
  }, [deck, learningQueue, unseenQueue, masteredCount]);

  // Handles the user's answer
  const handleAnswer = (isCorrect) => {
    const cardId = currentCard.id;
    if (isCorrect) {
      setTotalCorrect((prev) => prev + 1);
    } else {
      setTotalIncorrect((prev) => prev + 1);
    }

    const updatedDeck = deck.map((card) => {
      if (card.id === cardId) {
        const newStreak = isCorrect ? card.correctStreak + 1 : 0;
        const isNowMastered = newStreak >= 2;
        if (isNowMastered && !card.isMastered) {
          setMasteredCount((prev) => prev + 1);
        }
        return { ...card, correctStreak: newStreak, isMastered: isNowMastered };
      }
      return card;
    });

    setDeck(updatedDeck);

    if (!isCorrect) {
      setLearningQueue((prev) => shuffleArray([...prev, cardId]));
    }

    selectNextCard();
  };

  // Starts the quiz once the deck is ready
  useEffect(() => {
    if (deck.length > 0 && !currentCard) {
      selectNextCard();
      setIsLoading(false);
    }
  }, [deck, currentCard, selectNextCard]);

  // --- FIX 2: This new useEffect reliably detects when the first pass is complete ---
  useEffect(() => {
    // This condition is met only after loading is done and the user has answered the last "unseen" card.
    if (!isLoading && deck.length > 0 && unseenQueue.length === 0 && !isFirstPassComplete) {
      setFirstPassStats({
        score: totalCorrect,
        total: totalCorrect + totalIncorrect,
      });
      setIsFirstPassComplete(true); // This will now correctly trigger your modal
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

