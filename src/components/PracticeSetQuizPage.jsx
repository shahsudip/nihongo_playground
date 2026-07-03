import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

const PracticeSetQuizPage = () => {
  const { setId, sectionId } = useParams();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate'); // 'Immediate' or 'At End'

  const [currentSet, setCurrentSet] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Determine which sections to show based on URL
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

  // Flatten the questions for the selected section(s)
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

  if (loading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading Quiz Data...</div>;

  if (!currentSet) {
    return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Set not found in Firebase.</div>;
  }

  const totalQuestions = questions.length;
  
  if (totalQuestions === 0) {
    return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>No questions available in this section.</div>;
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Calculate correct answers if we want to show it immediately
  let correctCount = 0;
  Object.keys(answers).forEach(qId => {
    const q = questions.find(qu => qu.id.toString() === qId.toString());
    if (q && answers[qId] === q.correctIndex) {
      correctCount++;
    }
  });

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    
    // Auto advance if immediate feedback is off or we just want to speed up
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
  const selectedIdx = answers[currentQ.id];

  // Derive title from question text or section type if needed
  const instructionText = currentQ.sectionType === 'vocabulary-kanji' 
    ? "___のことばの読み方として最もよいものを、1・2・3・4から一つえらびなさい。"
    : "次の文の（　　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。";

  return (
    <div className="quiz-page-wrapper animate-fade-in">
      
      {/* Top Controls */}
      <div className="mb-6">
        <Link to={`/practice-sets/${setId}`} className="quiz-exit-link">
          &larr; Exit Quiz
        </Link>
        
        <div className="quiz-header-top">
          <div>
            <h1 className="quiz-title">N3 {currentSet.title}</h1>
            <p className="quiz-subtitle">{pageTitle}</p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="quiz-feedback-box">
              <span className="quiz-feedback-label">Feedback:</span>
              <button 
                className={`quiz-feedback-btn ${feedbackMode === 'Immediate' ? 'active' : ''}`}
                onClick={() => setFeedbackMode('Immediate')}
              >
                Immediate
              </button>
              <button 
                className={`quiz-feedback-btn ${feedbackMode === 'At End' ? 'active' : ''}`}
                onClick={() => setFeedbackMode('At End')}
              >
                At End
              </button>
            </div>
            
            <div className="quiz-stats-box">
              <div className="quiz-stats-answered">{answeredCount} / {totalQuestions} answered</div>
              {feedbackMode === 'Immediate' && (
                <div className="quiz-stats-correct">{correctCount} correct</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress-section">
        <div className="quiz-progress-text-row">
          <span className="quiz-stats-answered">Progress: {answeredCount}/{totalQuestions}</span>
          {feedbackMode === 'Immediate' && (
             <span className="quiz-stats-correct">&#10003; {correctCount} correct</span>
          )}
        </div>
        <div className="quiz-progress-bar-bg">
          <div className="quiz-progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="quiz-question-card scroll-mt-20">
        <div className="quiz-instruction-box">
          <p className="quiz-instruction-text">問題 {instructionText}</p>
        </div>
        
        <div className="mb-6">
          <div className="quiz-q-header">
            <span className={`quiz-q-number-badge ${currentQ.sectionType}`}>
              {currentIndex + 1}
            </span>
            <span className="quiz-q-counter">{currentIndex + 1} of {totalQuestions}</span>
          </div>
          <h2 className="quiz-q-text" dangerouslySetInnerHTML={{ __html: currentQ.questionText }}></h2>
        </div>

        <div className="quiz-options-container">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedIdx === optIdx;
            
            let btnClass = "";
            if (isSelected) {
              btnClass = "selected";
              if (feedbackMode === 'Immediate' && currentQ.correctIndex !== -1) {
                  if (currentQ.correctIndex === optIdx) {
                    btnClass = "correct";
                  } else {
                    btnClass = "wrong";
                  }
              }
            } else if (feedbackMode === 'Immediate' && selectedIdx !== undefined && currentQ.correctIndex === optIdx && currentQ.correctIndex !== -1) {
              btnClass = "correct";
            }

            return (
              <button 
                key={optIdx}
                className={`quiz-opt-btn ${btnClass}`}
                onClick={() => handleOptionSelect(currentQ.id, optIdx)}
                disabled={feedbackMode === 'Immediate' && selectedIdx !== undefined}
              >
                <div className="quiz-opt-circle"></div>
                <span className="quiz-opt-number">{optIdx + 1})</span>
                <span className="quiz-opt-text-inner">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="quiz-nav-buttons pb-32">
          <button 
            className="quiz-btn quiz-btn-outline" 
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &larr; Previous
          </button>
          <button 
            className="quiz-btn quiz-btn-primary" 
            onClick={handleNext}
            disabled={currentIndex === totalQuestions - 1}
          >
            Next &rarr;
          </button>
        </div>
      </div>

      {/* Question Navigator (Fixed at Bottom) */}
      <div className="quiz-navigator-box quiz-navigator-fixed">
        <div className="flex justify-between items-center mb-2">
          <p className="quiz-navigator-title m-0">Question Navigator</p>
          <span className="text-xs text-gray-400">{answeredCount}/{totalQuestions} Answered</span>
        </div>
        <div className="quiz-navigator-grid">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const hasAnswered = answers[q.id] !== undefined;
            
            let squareClass = "";
            if (isCurrent) squareClass = "current";
            else if (hasAnswered) {
              if (feedbackMode === 'Immediate' && q.correctIndex !== -1) {
                if (answers[q.id] === q.correctIndex) squareClass = "correct";
                else squareClass = "wrong";
              } else {
                squareClass = "answered";
              }
            }

            return (
              <button
                key={q.id}
                className={`quiz-nav-square ${squareClass}`}
                onClick={() => setCurrentIndex(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default PracticeSetQuizPage;
