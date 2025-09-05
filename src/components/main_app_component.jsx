import React from 'react';
import { N4_VOCAB } from './data/n4Vocab';
import { useQuizLogic } from './logic/quiz_logic_hook.jsx';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import QuizCard from './components/QuizCard';
import CompletionScreen from './components/CompletionScreen';
import './assets/global_style.css';

// --- APP LAYER ---
// This component assembles all the UI components and orchestrates the app.
// It is responsible for the overall layout and conditional rendering.

export default function App() {
    const { 
        vocabList, 
        currentCard, 
        options, 
        isAnswered, 
        lastAnswerCorrect,
        masteredCount, 
        handleOptionSelect, 
        handleNext, 
        initializeQuiz 
    } = useQuizLogic(N4_VOCAB);
    
    const isComplete = masteredCount === vocabList.length && vocabList.length > 0;

    return (
        <div className="app-container">
            <Header />
            {isComplete ? (
                <CompletionScreen onRestart={initializeQuiz} />
            ) : (
                <div className="quiz-area">
                    {currentCard && (
                        <>
                            <ProgressBar mastered={masteredCount} total={vocabList.length} />
                            <QuizCard 
                                card={currentCard}
                                options={options}
                                isAnswered={isAnswered}
                                onOptionSelect={handleOptionSelect}
                                isCorrect={lastAnswerCorrect}
                            />
                            <div className="next-button-container">
                                {isAnswered && (
                                    <button onClick={handleNext} className="next-button">
                                        Next
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
