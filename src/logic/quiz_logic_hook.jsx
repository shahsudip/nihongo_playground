import { useState, useEffect, useCallback } from 'react';

// --- LOGIC LAYER (CUSTOM HOOK) ---
// This hook manages the entire state and logic of the SRS quiz.

// Helper function to shuffle an array
const shuffleArray = (array) => {
    // Creates a copy to avoid modifying the original array
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const useQuizLogic = (initialVocabList) => {
    const [vocabList, setVocabList] = useState([]);
    const [unseenIndices, setUnseenIndices] = useState([]);
    const [learningQueue, setLearningQueue] = useState([]);
    
    const [currentCard, setCurrentCard] = useState(null);
    const [options, setOptions] = useState([]);
    
    const [isAnswered, setIsAnswered] = useState(false);
    
    const [masteredCount, setMasteredCount] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalIncorrect, setTotalIncorrect] = useState(0);

    // Function to initialize or reset the quiz
    const initializeQuiz = useCallback(() => {
        const initialisedList = initialVocabList.map((item, index) => ({
            ...item,
            id: index,
            correctStreak: 0,
            isMastered: false,
        }));
        setVocabList(initialisedList);
        setUnseenIndices(shuffleArray([...Array(initialisedList.length).keys()]));
        setLearningQueue([]);
        setMasteredCount(0);
        setTotalCorrect(0);
        setTotalIncorrect(0);
        setCurrentCard(null); // Will be set by useEffect
        setIsAnswered(false);
    }, [initialVocabList]);

    // Function to generate multiple-choice options for the current card
    const generateOptions = useCallback((correctCard) => {
        if (!correctCard || vocabList.length === 0) return [];
        let generatedOptions = [correctCard];
        // Filter out the correct card to create a pool of incorrect options
        let availableOptions = vocabList.filter(v => v.id !== correctCard.id);
        
        // Pick 3 random incorrect options
        while (generatedOptions.length < 4 && availableOptions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableOptions.length);
            generatedOptions.push(availableOptions[randomIndex]);
            // Remove the picked option to avoid duplicates
            availableOptions.splice(randomIndex, 1);
        }
        
        return shuffleArray(generatedOptions);
    }, [vocabList]);


    // Main function to select the next card to display
    const selectNextCard = useCallback(() => {
        let nextCard = null;
        let newLearningQueue = [...learningQueue];
        let newUnseenIndices = [...unseenIndices];

        // Prioritize items in the learning queue (i.e., items answered incorrectly)
        if (newLearningQueue.length > 0) {
            const nextCardId = newLearningQueue.shift();
            nextCard = vocabList.find(v => v.id === nextCardId);
        } 
        // If the learning queue is empty, pull a new, unseen card
        else if (newUnseenIndices.length > 0) {
            const nextCardId = newUnseenIndices.shift();
            nextCard = vocabList.find(v => v.id === nextCardId);
        }
        
        // If there are still non-mastered cards but both queues are empty, refill the learning queue
        else if (masteredCount < vocabList.length && vocabList.length > 0) {
            const nonMastered = vocabList.filter(v => !v.isMastered).map(v => v.id);
            newLearningQueue = shuffleArray(nonMastered);
            if(newLearningQueue.length > 0) {
                const nextCardId = newLearningQueue.shift();
                nextCard = vocabList.find(v => v.id === nextCardId);
            }
        }

        if (nextCard) {
            setCurrentCard(nextCard);
            setOptions(generateOptions(nextCard));
            setLearningQueue(newLearningQueue);
            setUnseenIndices(newUnseenIndices);
            setIsAnswered(false);
        } else {
            setCurrentCard(null); // Quiz is complete
        }
    }, [learningQueue, unseenIndices, vocabList, masteredCount, generateOptions]);

    // Effect to start the quiz
    useEffect(() => {
        initializeQuiz();
    }, [initializeQuiz]);
    
    // Effect to load the first card after initialization
    useEffect(() => {
        if (vocabList.length > 0 && !currentCard) {
            selectNextCard();
        }
    }, [vocabList, currentCard, selectNextCard]);

    // Function to handle the user's answer
    const handleOptionSelect = (selectedOption) => {
        if (isAnswered) return;

        const isCorrect = selectedOption.id === currentCard.id;
        setIsAnswered(true);

        if (isCorrect) {
            setTotalCorrect(prev => prev + 1);
        } else {
            setTotalIncorrect(prev => prev + 1);
        }

        const updatedList = vocabList.map(item => {
            if (item.id === currentCard.id) {
                const newStreak = isCorrect ? item.correctStreak + 1 : 0;
                const isNowMastered = newStreak >= 2;

                if (isNowMastered && !item.isMastered) {
                    setMasteredCount(prev => prev + 1);
                }
                
                return { ...item, correctStreak: newStreak, isMastered: isNowMastered };
            }
            return item;
        });

        setVocabList(updatedList);
        
        if (!isCorrect) {
            // If wrong, add it to the back of the learning queue to be reviewed later
            setLearningQueue(prevQueue => shuffleArray([...prevQueue, currentCard.id]));
        }
    };
    
    return {
        currentCard,
        options,
        isAnswered,
        masteredCount,
        totalCorrect,
        totalIncorrect,
        vocabListLength: initialVocabList.length,
        handleOptionSelect,
        handleNext: selectNextCard,
        initializeQuiz,
    };
};

