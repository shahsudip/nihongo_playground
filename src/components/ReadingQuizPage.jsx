import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { db } from "../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import ReadingQuizScreen from "./ReadingQuizScreen.jsx";
import LoadingSpinner from "../utils/loading_spinner.jsx";
import { Card } from "./ui/Card.jsx";
import { Button } from "./ui/Button.jsx";
import { Badge } from "./ui/Badge.jsx";

// Modern 2026 Sleek Completion Dialog
const ReadingCompletionModal = ({ score, total, mastered, onContinue, onRetry }) => {
  const { theme } = useTheme();
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isMastered = mastered >= total && total > 0;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all animate-scale-up"
        style={{
          backgroundColor: theme === 'light' ? '#fcf9f2' : theme === 'sepia' ? '#f5ede0' : '#0f172a',
          borderColor: theme === 'light' ? '#decfae' : theme === 'sepia' ? '#cbbe9f' : '#1e293b',
          color: theme === 'light' || theme === 'sepia' ? '#1f2937' : '#f8fafc'
        }}
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 text-4xl shadow-inner border border-emerald-500/20">
            {isMastered ? "🏆" : percentage >= 70 ? "🎉" : "📚"}
          </div>

          <div>
            <Badge variant={isMastered ? "success" : percentage >= 70 ? "primary" : "warning"} className="mb-2 uppercase tracking-widest text-[11px] font-black">
              {isMastered ? "Mastery Achieved" : "Reading Session Finished"}
            </Badge>
            <h2 className="text-2xl font-black tracking-tight">
              {isMastered ? "完璧です！ All Mastered!" : "お疲れ様でした！ Good Job!"}
            </h2>
            <p className="text-xs opacity-75 mt-1 font-medium">
              読解セッションの集計結果 (Reading Results)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-3">
            <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-60 block">Accuracy</span>
              <span className="text-2xl font-black text-emerald-500">{percentage}%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-60 block">Score</span>
              <span className="text-2xl font-black">
                {score} <span className="text-sm font-semibold opacity-60">/ {total}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Button
              variant="primary"
              className="w-full py-3 text-sm font-black justify-center shadow-lg shadow-emerald-500/20 rounded-xl"
              onClick={onContinue}
            >
              Back to Exercises (一覧に戻る) &rarr;
            </Button>
            {onRetry && (
              <Button
                variant="outline"
                className="w-full py-2.5 text-xs font-bold justify-center rounded-xl"
                onClick={onRetry}
              >
                Retry Drill (もう一度練習)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReadingQuizPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { quizId, level, category, type = 'jlpt' } = state || {};
  const historyDocId = quizId && level && category ? `${level}-${category}-${quizId}` : null;

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [finalStats, setFinalStats] = useState({ score: 0, total: 0, mastered: 0 });
  const quizStateRef = useRef({});
  const isQuizCompletedRef = useRef(false);

  // Save incomplete state when user leaves the page before finishing
  useEffect(() => {
    return () => {
      if (isQuizCompletedRef.current || !historyDocId || !currentUser) return;
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
            type,
          };
          await setDoc(historyDocRef, partialResult, { merge: true });
        } catch (err) {
          console.error("Failed to save incomplete reading quiz state:", err);
        }
      };
      saveIncompleteState();
    };
  }, [historyDocId, currentUser, level, category, type, quizId]);

  const onQuizComplete = async (stats) => {
    isQuizCompletedRef.current = true;
    const isMastered = stats.mastered === stats.total && stats.total > 0;
    setFinalStats({ score: stats.score, total: stats.total, mastered: stats.mastered });

    if (currentUser && historyDocId) {
      try {
        const historyDocRef = doc(db, "users", currentUser.uid, "quizHistory", historyDocId);
        const finalResult = {
          ...stats,
          quizId,
          level,
          category,
          type,
          timestamp: new Date().toISOString(),
          status: isMastered ? "mastered" : "incomplete",
        };
        await setDoc(historyDocRef, finalResult, { merge: true });
      } catch (err) {
        console.error("Error saving final reading quiz result:", err);
      }
    }
    setShowCompletionModal(true);
  };

  const handleEndQuizEarly = async (stats) => {
    isQuizCompletedRef.current = true;
    if (currentUser && historyDocId) {
      try {
        const historyDocRef = doc(db, "users", currentUser.uid, "quizHistory", historyDocId);
        const partialResult = {
          ...(stats || {}),
          quizId,
          level,
          category,
          type,
          timestamp: new Date().toISOString(),
          status: "incomplete",
        };
        await setDoc(historyDocRef, partialResult, { merge: true });
      } catch (err) {
        console.error("Error saving incomplete reading result:", err);
      }
    }
    navigate(-1);
  };

  const handleModalContinue = () => {
    setShowCompletionModal(false);
    navigate(-1);
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
        <ReadingCompletionModal
          score={finalStats.score}
          total={finalStats.total}
          mastered={finalStats.mastered}
          onContinue={handleModalContinue}
        />
      )}
    </>
  );
};

export default ReadingQuizPage;
