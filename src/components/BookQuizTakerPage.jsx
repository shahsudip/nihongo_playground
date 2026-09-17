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
import { ExitConfirmModal } from './ui/ExitConfirmModal';

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
  const [showExitModal, setShowExitModal] = useState(false);

  // Warn user if trying to close browser/tab with active answers
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const count = Object.keys(answers).length;
      if (count > 0 && count < questions.length) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers, questions.length]);

  // Fetch chapter content
  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        setError(null);

        let chapterData = null;

        // Try to load from local book_data.jsx first to get the absolute latest edits
        try {
          const { sampleBooks } = await import('../data/book_data.jsx');
          const localBook = sampleBooks.find(b => b.id === bookId);
          if (localBook) {
            setBookTitle(localBook.title);
            const localChap = localBook.chapters?.find(c => c.id === chapterId);
            if (localChap) {
              chapterData = localChap;
            }
          }
        } catch (e) {
          console.warn("Failed to load local data:", e);
        }

        // Fallback to Firestore if not found locally
        if (!chapterData) {
          const bookDocRef = doc(db, 'books', bookId);
          const bookSnap = await getDoc(bookDocRef);
          if (bookSnap.exists()) {
            setBookTitle(bookSnap.data().title || bookId);
          }

          const docRef = doc(db, 'books', bookId, 'chapters', chapterId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            chapterData = docSnap.data();
          }
        }

        if (!chapterData) {
          setError("Chapter quiz not found.");
          setLoading(false);
          return;
        }

        setChapter(chapterData);

        // Flatten questions
        const flattened = [];
        let gIndex = 0;
        
        const sectionsOrPassages = chapterData.sections || chapterData.passages;
        if (sectionsOrPassages && sectionsOrPassages.length > 0) {
          sectionsOrPassages.forEach((passage, passageIdx) => {
            passage.questions?.forEach((q, qIdx) => {
              
              // Generate Japanese title for Mondai if title is missing
              let generatedTitle = passage.title;
              if (!generatedTitle) {
                if (passage.id && passage.id.includes('mondai-')) {
                  const mNum = passage.id.split('-').pop();
                  generatedTitle = `問題${mNum}`;
                } else {
                  generatedTitle = `問題${passageIdx + 1}`;
                }
              }

              flattened.push({
                ...q,
                questionText: q.questionText || q.text || q.question || "",
                id: q.id || `${passageIdx}-${qIdx}`, // preserve original id if it exists
                passageIndex: passageIdx,
                passageText: passage.passageText || passage.passage || "",
                passageLayout: passage.passageLayout || "",
                imageSrc: passage.imageSrc || "",
                passageTitle: generatedTitle,
                mondaiHeader: passage.mondaiHeader || passage.instruction || "",
                passageNotes: passage.passageNotes || "",
                globalQIndex: gIndex++
              });
            });
          });
        } else if (chapterData.questions && chapterData.questions.length > 0) {
          chapterData.questions.forEach((q, qIdx) => {
            flattened.push({
              ...q,
              questionText: q.questionText || q.text || q.question || "",
              id: `direct-${qIdx}`,
              passageIndex: 0,
              passageText: "",
              passageLayout: "",
              imageSrc: "",
              passageTitle: "",
              mondaiHeader: "",
              passageNotes: "",
              globalQIndex: gIndex++
            });
          });
        }

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

  // Save progress on exit/completion
  const saveProgress = useCallback(async (isFinal = false) => {
    if (!currentUser || !chapter || questions.length === 0) return;

    const answeredCount = Object.keys(answers).length;
    if (answeredCount === 0) return; // Don't save empty attempt

    try {
      let correctCount = 0;
      Object.keys(answers).forEach(qId => {
        const q = questions.find(qu => qu.id === qId);
        if (q) {
          const correctText = q.correctOption ? q.correctOption.text : (typeof q.options[q.correctIndex] === 'object' ? q.options[q.correctIndex].text : q.options[q.correctIndex]);
          if (answers[qId] === correctText) {
            correctCount++;
          }
        }
      });

      const isAllAnswered = answeredCount === questions.length;
      const accuracy = questions.length > 0 ? (correctCount / questions.length) : 0;
      
      let status = 'incomplete';
      if (isAllAnswered || isFinal) {
        if (accuracy >= 0.8 && correctCount > 0) {
          status = 'mastered';
        } else if (isAllAnswered) {
          status = 'completed';
        }
      }

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
        answered: answeredCount,
        status
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

  const handleAttemptExit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount > 0 && answeredCount < questions.length) {
      setShowExitModal(true);
    } else {
      navigate(`/books/${bookId}`);
    }
  };

  const handleConfirmExit = () => {
    saveProgress(false);
    setShowExitModal(false);
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
    if (q) {
      const correctText = q.correctOption ? q.correctOption.text : (typeof q.options[q.correctIndex] === 'object' ? q.options[q.correctIndex].text : q.options[q.correctIndex]);
      if (answers[qId] === correctText) {
        correctCount++;
      }
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
        <button
          type="button"
          onClick={handleAttemptExit}
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4 inline-block bg-transparent border-0 p-0 cursor-pointer"
        >
          &larr; Exit Quiz
        </button>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1">
            {bookId === 'zenkamoku-n3-best-workbook' && chapter.weekTitle ? (
              <div className="flex flex-col gap-2 w-full max-w-2xl mb-2">
                <div className="flex items-stretch shadow-sm">
                   <div className="bg-[#1f2937] text-white px-4 py-2 font-bold text-lg rounded-l-md flex items-center justify-center border-r border-[#374151]">
                     {chapter.weekTitle}
                   </div>
                   <div className="bg-[#e5e7eb] dark:bg-[#d1d5db] text-black px-4 py-2 font-bold text-lg flex-1 flex items-center justify-between">
                     <span>{chapter.dayTitle}</span>
                     <div className="flex items-center gap-1">
                       <span className="text-xl">📅</span>
                       <span className="border-b border-black w-8 inline-block mx-1"></span>
                       <span className="text-sm">月</span>
                       <span className="border-b border-black w-8 inline-block mx-1"></span>
                       <span className="text-sm">日</span>
                     </div>
                   </div>
                </div>
                {chapter.sectionTitle && (
                  <div className="inline-flex self-start border-2 border-black dark:border-white px-3 py-1 font-bold bg-white dark:bg-[#111827] text-black dark:text-white rounded-sm mt-1 shadow-sm">
                    {chapter.sectionTitle} {chapter.sectionTitleEn ? ` ${chapter.sectionTitleEn}` : ''}
                  </div>
                )}
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold">{bookTitle}</h1>
                <p className="text-sm text-[var(--color-text-muted)]">{chapter.title}</p>
              </>
            )}
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

      {/* Main Content Area */}
      <div className="flex flex-col">
        
        {/* Passage Container */}
        <div className="w-full mb-6">
          {currentQ.passageTitle && currentQ.passageTitle !== chapter.title && (currentQ.mondaiHeader || currentQ.passageTitle) && (
            <div className="mb-4 px-4 py-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
              <p className="text-base font-bold text-[var(--color-text-primary)] japanese-text flex items-start gap-3">
                <span className="whitespace-nowrap">{currentQ.passageTitle.replace(/^第\d+部\s*/, '')}</span>
                {currentQ.mondaiHeader && (
                  <span 
                    className="text-sm pt-0.5 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: currentQ.mondaiHeader.replace(/^問題\d+\s*/, '') }}
                  />
                )}
              </p>
            </div>
          )}
          
          {(currentQ.passageText || currentQ.imageSrc || currentQ.passageNotes) && (
            <div className="space-y-4">
              {(currentQ.passageText || currentQ.imageSrc) && (
                <div className="px-4 py-3 relative bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)] japanese-text text-base md:text-lg text-[var(--color-text-primary)]">
                  {currentQ.imageSrc && (
                    <div className="text-center mb-3">
                      <img src={currentQ.imageSrc} alt="Passage" className="max-w-full h-auto rounded-lg mx-auto" />
                    </div>
                  )}
                  {currentQ.passageText && (
                    currentQ.passageLayout === 'html' || (currentQ.passageTitle && currentQ.passageTitle.match(/問題(52|53|54|55|58)/)) ? (
                      <div dangerouslySetInnerHTML={{ __html: currentQ.passageText }} />
                    ) : (
                      <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: currentQ.passageText }} />
                    )
                  )}
                </div>
              )}
              {currentQ.passageNotes && (
                <div className="px-4 py-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] japanese-text leading-loose" dangerouslySetInnerHTML={{ __html: currentQ.passageNotes }} />
              )}
            </div>
          )}
        </div>

        {/* Question Card */}
        <div className="w-full">
          <Card className="scroll-mt-20">

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold bg-[var(--color-primary)]">
              {currentIndex + 1}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">{currentIndex + 1} of {totalQuestions}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-medium japanese-text leading-relaxed" dangerouslySetInnerHTML={{ __html: (currentQ.questionText || currentQ.stem || '').replace(/^(問い|問\d+)/, '<span class="text-[var(--color-primary)] font-bold">$&</span>').replace(/ (A「|B「|A：|B：|男：|女：|男の人：|女の人：|店員：|客：|Ａ「|Ｂ「|Ａ：|Ｂ：)/g, '<br />$1') }}></h2>
          {/* Audio Player Support for Listening Questions */}
          {currentQ.audioSrc && (
            <div className="mt-4 p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] flex items-center justify-center">
              <audio controls controlsList="nodownload" className="w-full max-w-md" key={currentQ.audioSrc}>
                <source src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${currentQ.audioSrc}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          {/* Image Support directly on Question level */}
          {currentQ.imageSrc && !currentQ.passageText && (
            <div className="mt-4 p-4 text-center bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
              <img src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${currentQ.imageSrc}`} alt="Question illustration" className="max-w-full h-auto rounded-lg mx-auto" />
            </div>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, optIdx) => {
            const optText = typeof opt === 'object' && opt !== null ? opt.text : opt;
            const cleanOpt = optText ? optText.replace(/\*\*/g, '') : '';
            return (
              <OptionButton 
                key={optIdx}
                text={cleanOpt}
                index={optIdx}
                isSelected={selectedAnswer === optText}
                isCorrect={currentQ.correctOption ? currentQ.correctOption.text === optText : currentQ.correctIndex === optIdx}
                feedbackMode={feedbackMode}
                onClick={() => handleOptionSelect(currentQ.id, optText)}
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
      </div> {/* closes Question Card container */}
      </div> {/* closes Main Content Area */}

      {/* Question Navigator Component */}
      <QuestionNavigator 
        questions={questions}
        answers={answers}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        feedbackMode={feedbackMode}
        checkIsCorrect={(q, ans) => {
          const correctText = q.correctOption ? q.correctOption.text : q.options[q.correctIndex];
          return ans[q.id] === correctText;
        }}
      />

      {/* Exit Confirmation Modal */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default BookQuizTakerPage;

// Triggering Vite HMR

// Triggering Vite HMR for layout fix

// Triggering Vite HMR for layout fix 2

// Triggering Vite HMR for exact layout clone

// Triggering Vite HMR after removing line numbers

// Triggering Vite HMR for Mondai 16

// Triggering Vite HMR after Mondai 16 bold underline fix

// Triggering Vite HMR after furigana injection

// Triggering Vite HMR for Mondai 17 update

// Triggering Vite HMR after backporting furigana

// Triggering Vite HMR after Mondai 17 question furigana

// Triggering Vite HMR for Mondai 18 furigana

// Triggering Vite HMR for Mondai 19 rebuild

// Triggering Vite HMR for Mondai 19 underline fix
