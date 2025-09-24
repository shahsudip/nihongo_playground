import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import ReadingQuizScreen from "../components/ReadingQuizScreen.jsx";
import LoadingSpinner from "../utils/loading_spinner.jsx";

// Reusable Modal Components
const CompletionModal = ({ score, total, onContinue }) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>Quiz Complete!</h2>
            <p className="modal-score-text">Your Final Score:</p>
            <div className="modal-score-display">{score} / {total}</div>
            <button onClick={onContinue} className="action-button next-level">
                Back to Exercises
            </button>
        </div>
    </div>
);

const ReadingQuizPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const { quizId, level, category, type = 'jlpt' } = state || {};
    const historyDocId = quizId && level && category ? `${level}-${category}-${quizId}` : null;

    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });
    const quizStateRef = useRef({});
    const isQuizCompletedRef = useRef(false);

    // Effect to save incomplete state when user leaves the page
    useEffect(() => {
        return () => {
            if (isQuizCompletedRef.current || !historyDocId || !currentUser) return;
            const saveIncompleteState = async () => {
                try {
                    const historyDocRef = doc(db, "users", currentUser.uid, "quizHistory", historyDocId);
                    const partialResult = {
                        ...(quizStateRef.current || {}),
                        quizId, timestamp: new Date().toISOString(), status: "incomplete",
                        level, category, type
                    };
                    await setDoc(historyDocRef, partialResult, { merge: true });
                } catch (err) {
                    console.error("Failed to save incomplete reading quiz state:", err);
                }
            };
            saveIncompleteState();
        };
    }, [historyDocId, currentUser, level, category, type, quizId]);

    const onQuizComplete = async (finalStats) => {
        isQuizCompletedRef.current = true;
        if (!currentUser || !historyDocId) return;

        try {
            const historyDocRef = doc(db, "users", currentUser.uid, "quizHistory", historyDocId);
            const finalResult = {
                ...finalStats, quizId, level, category, type,
                timestamp: new Date().toISOString(),
                status: finalStats.mastered === finalStats.total && finalStats.total > 0 ? "mastered" : "incomplete",
            };
            await setDoc(historyDocRef, finalResult, { merge: true });
            setFinalScore({ score: finalStats.score, total: finalStats.total });
            setShowCompletionModal(true);
        } catch (err) {
            console.error("Error saving final reading quiz result:", err);
        }
    };

    const handleEndQuizEarly = async (stats) => {
        isQuizCompletedRef.current = true;
        if (!currentUser || !historyDocId) return;
        try {
            const historyDocRef = doc(db, "users", currentUser.uid, "quizHistory", historyDocId);
            const partialResult = {
                ...stats, quizId, level, category, type,
                timestamp: new Date().toISOString(), status: "incomplete",
            };
            await setDoc(historyDocRef, partialResult, { merge: true });
            navigate(-1); // Go back to exercise list
        } catch (err) {
            console.error("Error saving incomplete reading result:", err);
        }
    };

    const handleModalContinue = () => {
        setShowCompletionModal(false);
        navigate(-1); // Go back to the exercise list page
    };

    if (!state) return <LoadingSpinner />;

    return (
        <>
            <ReadingQuizScreen
                quizState={state}
                onComplete={onQuizComplete}
                onEndQuizEarly={handleEndQuizEarly}
                quizStateRef={quizStateRef}
            />
            {showCompletionModal && (
                <CompletionModal
                    score={finalScore.score}
                    total={finalScore.total}
                    onContinue={handleModalContinue}
                />
            )}
        </>
    );
};

export default ReadingQuizPage;