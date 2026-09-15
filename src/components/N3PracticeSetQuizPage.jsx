import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext.jsx';

// Reusable UI Components
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { OptionButton } from './ui/OptionButton';
import { QuestionNavigator } from './ui/QuestionNavigator';
import { ExitConfirmModal } from './ui/ExitConfirmModal';

const N3PracticeSetQuizPage = () => {
  const { setId, sectionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate');
  const [isFinished, setIsFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);

  const [currentSet, setCurrentSet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Warn user if trying to close browser/tab with active answers
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const count = Object.keys(answers).length;
      if (count > 0 && !isFinished) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers, isFinished]);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (timerActive && !isFinished) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isFinished]);

  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, 'books', 'jlpt-n3-practice-sets');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const bookData = docSnap.data();
          const set = bookData.sets.find(s => s.id === setId);
          setCurrentSet(set);
        } else {
          console.error("No such document!");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [setId]);

  const sectionsToShow = useMemo(() => {
    if (sectionId === 'vocabulary-kanji') return ['vocabulary-kanji'];
    if (sectionId === 'grammar') return ['grammar-reading'];
    return ['vocabulary-kanji', 'grammar-reading'];
  }, [sectionId]);

  const pageTitle = useMemo(() => {
    if (sectionId === 'vocabulary-kanji') return 'Vocabulary & Kanji';
    if (sectionId === 'grammar') return 'Grammar & Reading';
    return 'Full Practice';
  }, [sectionId]);

  const questions = useMemo(() => {
    if (!currentSet) return [];
    const qs = [];
    sectionsToShow.forEach(sec => {
      const secData = currentSet.sections[sec];
      if (secData && secData.questions) {
        secData.questions.forEach(q => {
          qs.push({ ...q, sectionType: sec });
        });
      }
    });
    return qs;
  }, [currentSet, sectionsToShow]);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const correctCount = useMemo(() => {
    let count = 0;
    Object.keys(answers).forEach(qId => {
      const q = questions.find(qu => qu.id.toString() === qId.toString());
      if (q && answers[qId] === q.correctIndex) {
        count++;
      }
    });
    return count;
  }, [answers, questions]);

  const overallPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Save Progress to Firestore
  const saveQuizHistory = useCallback(async () => {
    if (!currentUser || !currentSet || totalQuestions === 0) return;
    try {
      const historyDocId = `jlpt-n3-practice-sets-${setId}${sectionId ? `-${sectionId}` : ''}`;
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);

      const record = {
        quizId: historyDocId,
        bookId: 'jlpt-n3-practice-sets',
        setId: setId,
        sectionId: sectionId || 'full',
        title: `JLPT N3 直前対策 — ${currentSet.title || `Set ${setId}`} (${pageTitle})`,
        level: 'N3',
        category: 'Chokuzen Taisaku',
        type: 'book',
        score: correctCount,
        total: totalQuestions,
        answered: answeredCount,
        percentage: overallPercent,
        status: (answeredCount === totalQuestions && overallPercent >= 80 && correctCount > 0) ? 'mastered' : (answeredCount === totalQuestions) ? 'completed' : 'incomplete',
        timeElapsed: timerSeconds,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      await setDoc(historyDocRef, record, { merge: true });
      console.log('Successfully saved N3 quiz history to Firestore:', historyDocId);
    } catch (err) {
      console.error("Error saving N3 practice set progress:", err);
    }
  }, [currentUser, currentSet, totalQuestions, answeredCount, setId, sectionId, pageTitle, correctCount, overallPercent, timerSeconds]);

  // Trigger save on completion
  useEffect(() => {
    if (isFinished) {
      saveQuizHistory();
    }
  }, [isFinished, saveQuizHistory]);

  const handleAttemptExit = () => {
    if (answeredCount > 0 && !isFinished) {
      setShowExitModal(true);
    } else {
      navigate(`/practice-sets/${setId}`);
    }
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    navigate(`/practice-sets/${setId}`);
  };

  if (loading) return <div className="text-white p-20 text-center">Loading N3 Quiz Data...</div>;
  if (!currentSet) return <div className="text-white p-20 text-center">Set not found in Firebase.</div>;
  if (totalQuestions === 0) return <div className="text-white p-20 text-center">No questions available.</div>;

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    
    if (feedbackMode === 'At End') {
      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }, 300);
    }
  };

  const handleNext = () => currentIndex < totalQuestions - 1 && setCurrentIndex(currentIndex + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const handleFinish = () => {
    setIsFinished(true);
  };

  // Completion View
  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in pt-[100px]">
        <div className="mb-6">
          <Link to={`/practice-sets/${setId}`} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4 inline-block">
            &larr; Back to Set Details
          </Link>
        </div>

        <Card className="text-center p-8 sm:p-12 shadow-2xl border border-[var(--color-border)]">
          <div className="text-5xl mb-4 animate-bounce">🏆</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Practice Completed!</h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            N3 {currentSet.title} &bull; {pageTitle}
          </p>

          <div className="inline-block p-6 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] mb-8">
            <div className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary)]">
              {correctCount} / {totalQuestions}
            </div>
            <div className="text-sm font-semibold text-[var(--color-text-muted)] mt-1">
              {overallPercent}% Score
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
            <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              <div className="text-xs text-[var(--color-text-muted)] font-bold mb-1">Time Elapsed</div>
              <div className="text-lg font-extrabold">{formatTime(timerSeconds)}</div>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              <div className="text-xs text-[var(--color-text-muted)] font-bold mb-1">Pass Status</div>
              <div className={`text-lg font-extrabold ${overallPercent >= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {overallPercent >= 60 ? 'PASSED 🎖️' : 'REVIEW NEEDED'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setAnswers({});
                setCurrentIndex(0);
                setIsFinished(false);
                setTimerSeconds(0);
              }}
            >
              🔄 Retake Test
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsFinished(false);
                setFeedbackMode('Immediate');
                setCurrentIndex(0);
              }}
            >
              📝 Review Answers
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/practice-sets/${setId}`)}
            >
              &larr; Back to Set
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
            >
              👤 View in Profile
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedIdx = answers[currentQ.id];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in pt-[100px]">
      
      {/* Top Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleAttemptExit}
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4 inline-block bg-transparent border-0 p-0 cursor-pointer"
        >
          &larr; Exit Quiz
        </button>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold">N3 {currentSet.title}</h1>
            <p className="text-sm text-[var(--color-text-muted)]">{pageTitle} &bull; ⏱️ {formatTime(timerSeconds)}</p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-muted)] mr-1">Feedback:</span>
              <button 
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${feedbackMode === 'Immediate' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                onClick={() => setFeedbackMode('Immediate')}
              >
                Immediate
              </button>
              <button 
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${feedbackMode === 'At End' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                onClick={() => setFeedbackMode('At End')}
              >
                At End
              </button>
            </div>
            
            <div className="text-right text-sm">
              <div className="text-[var(--color-text-secondary)]">{answeredCount} / {totalQuestions} answered</div>
              {feedbackMode === 'Immediate' && (
                <div className="text-[var(--color-success-light)]">{correctCount} correct</div>
              )}
            </div>

            {answeredCount > 0 && (
              <button
                onClick={handleFinish}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                Submit Test 🏆
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar Component */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-[var(--color-text-secondary)]">Progress: {answeredCount}/{totalQuestions}</span>
          {feedbackMode === 'Immediate' && (
             <span className="text-[var(--color-success-light)]">&#10003; {correctCount} correct</span>
          )}
        </div>
        <ProgressBar progressPercent={progressPercent} />
      </div>

      {/* Main Question Card Component */}
      <Card className="scroll-mt-20">
        <div className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold text-[var(--color-accent)] tracking-wider uppercase">
                Question {currentIndex + 1}
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">{currentIndex + 1} of {totalQuestions}</span>
            </div>
            {currentQ.instruction && (
              <div className="mb-4 text-md text-[var(--color-text-secondary)] border-l-4 border-[var(--color-accent)] pl-3 py-1 bg-[var(--color-bg-secondary)] rounded-r-md japanese-text" dangerouslySetInnerHTML={{ __html: currentQ.instruction }}></div>
            )}
            
            {!currentQ.passageText && (
              <div className="mb-4 flex items-center">
                <span className="bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Question {currentIndex + 1}
                </span>
              </div>
            )}

            {currentQ.passageText && (
              <div className="mb-6 p-4 md:p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-inner max-h-[300px] overflow-y-auto custom-scrollbar">
                <div className="text-base md:text-lg text-[var(--color-text)] japanese-text leading-loose whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: currentQ.passageText }}></div>
              </div>
            )}
            
            {currentQ.passageText && (
              <div className="mb-4 flex items-center">
                <span className="bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Question {currentIndex + 1}
                </span>
              </div>
            )}
          <h2 className="text-xl md:text-2xl font-medium japanese-text leading-relaxed" dangerouslySetInnerHTML={{ __html: (() => {
            let html = currentQ.questionText;
            const instr = currentQ.instruction || '';
            const isMondai1 = instr.includes('問題1') && currentQ.sectionType === 'vocabulary-kanji';
            const isMondai2 = instr.includes('問題2') && currentQ.sectionType === 'vocabulary-kanji';
            if (isMondai1) {
              html = html
                .replace(/<rp[^>]*>[\s\S]*?<\/rp>/gi, '')
                .replace(/<rt[^>]*>[\s\S]*?<\/rt>/gi, '')
                .replace(/<\/?ruby[^>]*>/gi, '');
            } else if (isMondai2) {
              html = html.replace(/<ruby[^>]*>[\s\S]*?<rt[^>]*>([\s\S]*?)<\/rt>[\s\S]*?<\/ruby>/gi, '$1');
            }
            return html.replace(/ (A「|B「|A：|B：|男：|女：|男の人：|女の人：|店員：|客：|Ａ「|Ｂ「|Ａ：|Ｂ：)/g, '<br />$1');
          })() }}></h2>
        </div>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, optIdx) => {
            const instr = currentQ.instruction || '';
            const isMondai2 = instr.includes('問題2') && currentQ.sectionType === 'vocabulary-kanji';
            const displayOpt = isMondai2
              ? opt
                  .replace(/<rp[^>]*>[\s\S]*?<\/rp>/gi, '')
                  .replace(/<rt[^>]*>[\s\S]*?<\/rt>/gi, '')
                  .replace(/<\/?ruby[^>]*>/gi, '')
              : opt;
            return (
            <OptionButton 
              key={optIdx}
              text={displayOpt}
              index={optIdx}
              isSelected={selectedIdx === optIdx}
              isCorrect={currentQ.correctIndex !== -1 ? currentQ.correctIndex === optIdx : null}
              feedbackMode={feedbackMode}
              onClick={() => handleOptionSelect(currentQ.id, optIdx)}
              disabled={feedbackMode === 'Immediate' && selectedIdx !== undefined}
            />
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)] mt-8">
          <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
            &larr; Previous
          </Button>

          {currentIndex < totalQuestions - 1 ? (
            <Button variant="primary" onClick={handleNext}>
              Next &rarr;
            </Button>
          ) : (
            <Button variant="primary" onClick={handleFinish} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
              Finish Quiz 🏆
            </Button>
          )}
        </div>
      </Card>

      {/* Question Navigator Component */}
      <QuestionNavigator 
        questions={questions}
        answers={answers}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        feedbackMode={feedbackMode}
      />

      {/* Exit Confirmation Modal */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
        answeredCount={Object.keys(answers).length}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default N3PracticeSetQuizPage;
