import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';

import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { OptionButton } from './ui/OptionButton';
import { QuestionNavigator } from './ui/QuestionNavigator';

const BookQuizTakerPage = () => {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [chapter, setChapter] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate'); // 'Immediate' or 'At End'

  // Fetch chapter content
  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch book title (optional, for header)
        const bookDocRef = doc(db, 'books', bookId);
        const bookSnap = await getDoc(bookDocRef);
        if (bookSnap.exists()) {
          setBookTitle(bookSnap.data().title || bookId);
        }

        // Fetch chapter from Firestore
        const docRef = doc(db, 'books', bookId, 'chapters', chapterId);
        const docSnap = await getDoc(docRef);

        let chapterData = null;
        if (docSnap.exists()) {
          chapterData = docSnap.data();
        }

        if (!chapterData) {
          setError("Chapter quiz not found.");
          setLoading(false);
          return;
        }

        setChapter(chapterData);

        // Flatten questions
        const flattened = [];
        chapterData.passages?.forEach((passage, passageIdx) => {
          passage.questions?.forEach((q, qIdx) => {
            flattened.push({
              ...q,
              id: `${passageIdx}-${qIdx}`,
              passageIndex: passageIdx,
              passageText: passage.passageText || "",
              passageLayout: passage.passageLayout || "",
              imageSrc: passage.imageSrc || "",
              passageTitle: passage.title || "Passage",
            });
          });
        });

        setQuestions(flattened);
        setCurrentIndex(0);
        setAnswers({});

      } catch (err) {
        console.error("Error loading chapter quiz:", err);
        setError("Failed to load quiz content: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [bookId, chapterId]);

  // Save progress
  const saveProgress = useCallback(async (isFinal = false) => {
    if (!currentUser || !chapter) return;

    try {
      let correctCount = 0;
      Object.keys(answers).forEach(qId => {
        const q = questions.find(qu => qu.id === qId);
        if (q && answers[qId] === q.correctOption.text) {
          correctCount++;
        }
      });

      const historyDocId = `${bookId}-${chapterId}`;
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
      
      const record = {
        quizId: historyDocId,
        bookId,
        chapterId,
        title: chapter.title,
        type: 'book',
        timestamp: new Date().toISOString(),
        score: correctCount,
        total: questions.length,
        status: isFinal ? 'mastered' : 'incomplete'
      };

      await setDoc(historyDocRef, record, { merge: true });
    } catch (err) {
      console.error("Failed to save chapter progress:", err);
    }
  }, [bookId, chapterId, currentUser, chapter, answers, questions]);

  useEffect(() => {
    return () => {
      saveProgress(false);
    };
  }, [saveProgress]);

  const handleFinish = () => {
    saveProgress(true);
    navigate(`/books/${bookId}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message" style={{ color: 'white', padding: '100px', textAlign: 'center' }}>{error}</div>;
  if (!chapter || questions.length === 0) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>No questions available.</div>;

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  let correctCount = 0;
  Object.keys(answers).forEach(qId => {
    const q = questions.find(qu => qu.id === qId);
    if (q && answers[qId] === q.correctOption.text) {
      correctCount++;
    }
  });

  const handleOptionSelect = (questionId, optionText) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionText
    }));
    
    // Auto advance if immediate feedback is off
    if (feedbackMode === 'At End') {
      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const currentQ = questions[currentIndex];
  const selectedAnswer = answers[currentQ.id];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in pt-[100px]">
      
      {/* Top Header */}
      <div className="mb-6">
        <Link to={`/books/${bookId}`} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4 inline-block">
          &larr; Exit Quiz
        </Link>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold">{bookTitle}</h1>
            <p className="text-sm text-[var(--color-text-muted)]">{chapter.title}</p>
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
        {currentQ.passageTitle && currentQ.passageTitle !== chapter.title && (
          <div className="mb-4 px-4 py-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] japanese-text">
              {currentQ.passageTitle}
            </p>
          </div>
        )}
        
        {/* Optional Passage or Image rendering */}
        {(currentQ.passageText || currentQ.imageSrc) && (
          <div className="mb-6 p-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            {currentQ.imageSrc && (
              <div className="text-center mb-3">
                <img src={currentQ.imageSrc} alt="Passage" className="max-w-full h-auto rounded-lg mx-auto" />
              </div>
            )}
            {currentQ.passageText && (
              currentQ.passageLayout === 'html' ? (
                <div dangerouslySetInnerHTML={{ __html: currentQ.passageText }} />
              ) : (
                <div className="whitespace-pre-wrap leading-relaxed">{currentQ.passageText}</div>
              )
            )}
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold bg-[var(--color-primary)]">
              {currentIndex + 1}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">{currentIndex + 1} of {totalQuestions}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-medium japanese-text leading-relaxed" dangerouslySetInnerHTML={{ __html: currentQ.questionText }}></h2>
        </div>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, optIdx) => {
            const cleanOpt = opt.replace(/\*\*/g, '');
            return (
              <OptionButton 
                key={optIdx}
                text={cleanOpt}
                index={optIdx}
                isSelected={selectedAnswer === opt}
                isCorrect={currentQ.correctOption.text === opt}
                feedbackMode={feedbackMode}
                onClick={() => handleOptionSelect(currentQ.id, opt)}
                disabled={feedbackMode === 'Immediate' && selectedAnswer !== undefined}
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)] mt-8">
          <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
            &larr; Previous
          </Button>
          
          {currentIndex === totalQuestions - 1 ? (
            <Button variant="primary" onClick={handleFinish} className="bg-gradient-to-r from-emerald-500 to-teal-600">
              Finish Chapter
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              Next &rarr;
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
        checkIsCorrect={(q, ans) => ans[q.id] === q.correctOption.text}
      />
    </div>
  );
};

export default BookQuizTakerPage;
