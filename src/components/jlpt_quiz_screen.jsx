import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import LoadingSpinner from "../utils/loading_spinner.jsx";
import JlptQuiz from "../components/JlptQuiz.jsx";

const CompletionModal = ({ score, total, onContinue }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Quiz Complete!</h2>
      <p className="modal-score-text">Your Final Score:</p>
      <div className="modal-score-display">{score} / {total}</div>
      <button onClick={onContinue} className="action-button next-level">
        View Profile & Save Score →
      </button>
    </div>
  </div>
);

const JlptQuizPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // --- CHANGE: The 'source' is now extracted from the navigation state ---
  const {
    quizId,
    quizTitle = "",
    level = "",
    category = "",
    type = 'jlpt',
    source = 'japanesetest4you' // Default to the original source if not provided
  } = state || {};

  // Use the quizId directly for the history document ID, which is more reliable.
  const historyDocId = quizId || null;

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  const quizStateRef = useRef({});
  const isQuizCompletedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (isQuizCompletedRef.current || !historyDocId  || !currentUser) return;
      const saveIncompleteState = async () => {
        try {
          const historyDocRef = doc(db, "users", currentUser.uid, "quizHistory", historyDocId);
          const partialResult = {
            ...(quizStateRef.current || {}),
            quizId,
            timestamp: new Date().toISOString(),
            status: "incomplete",
            level,
            category,
            type
          };
          await setDoc(historyDocRef, partialResult, { merge: true });
        } catch (err) {
          console.error("Failed to save incomplete JLPT quiz state:", err);
        }
      };
      saveIncompleteState();
    };
  },[historyDocId, currentUser, level, category, type, quizId]); 

  const onQuizComplete = async (finalStats) => {
    isQuizCompletedRef.current = true;
        if (!currentUser || !historyDocId) return;
    try {
      const historyDocRef = doc(db, "users", currentUser.uid, "quizHistory", historyDocId);
      const finalResult = {
        ...finalStats,
        quizId,
        level,
        category,
        type,
        timestamp: new Date().toISOString(),
        status: finalStats.mastered === finalStats.total && finalStats.total > 0 ? "mastered" : "incomplete",
      };
      await setDoc(historyDocRef, finalResult, { merge: true });
      setFinalScore({ score: finalStats.score, total: finalStats.total });
      setShowCompletionModal(true);
    } catch (err) {
      console.error("Error saving final JLPT quiz result:", err);
    }
  };

  const handleEndQuizEarly = async (stats) => {
    isQuizCompletedRef.current = true;
        if (!currentUser || !historyDocId) return;
    try {
      const historyDocRef = doc(db, "users", currentUser.uid, "quizHistory", historyDocId);
      const partialResult = {
        ...stats,
        quizId,
        level,
        category,
        type,
        timestamp: new Date().toISOString(),
        status: "incomplete",
      };
      await setDoc(historyDocRef, partialResult, { merge: true });
      navigate("/profile");
    } catch (err) {
      console.error("Error saving incomplete JLPT result:", err);
    }
  };

  const handleModalContinue = () => {
    setShowCompletionModal(false);
    navigate(-1); // Go back to the exercise list page
  };

  if (!quizId) return <LoadingSpinner />;

  return (
    <div className="quiz-container">
      <JlptQuiz
        quizId={quizId}
        quizTitle={quizTitle}
        level={level}
        category={category}
        source={source} // --- CHANGE: Pass the 'source' down as a prop ---
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
    </div>
  );
};

export default JlptQuizPage;

