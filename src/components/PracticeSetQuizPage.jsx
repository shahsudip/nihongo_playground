import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

// Reusable UI Components (Modern Architecture)
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { OptionButton } from './ui/OptionButton';
import { QuestionNavigator } from './ui/QuestionNavigator';

const PracticeSetQuizPage = () => {
  const { setId, sectionId } = useParams();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate');

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

  if (loading) return <div className="text-white p-20 text-center">Loading Quiz Data...</div>;
  if (!currentSet) return <div className="text-white p-20 text-center">Set not found in Firebase.</div>;

  const totalQuestions = questions.length;
  if (totalQuestions === 0) return <div className="text-white p-20 text-center">No questions available.</div>;

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  let correctCount = 0;
  Object.keys(answers).forEach(qId => {
    const q = questions.find(qu => qu.id.toString() === qId.toString());
    if (q && answers[qId] === q.correctIndex) {
      correctCount++;
    }
  });

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

  const currentQ = questions[currentIndex];
  const selectedIdx = answers[currentQ.id];

  const instructionText = currentQ.sectionType === 'vocabulary-kanji' 
    ? "___のことばの読み方として最もよいものを、1・2・3・4から一つえらびなさい。"
    : "次の文の（　　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in pt-[100px]">
      
      {/* Top Header */}
      <div className="mb-6">
        <Link to={`/practice-sets/${setId}`} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4 inline-block">
          &larr; Exit Quiz
        </Link>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold">N3 {currentSet.title}</h1>
            <p className="text-sm text-[var(--color-text-muted)]">{pageTitle}</p>
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
          <h2 className="text-xl md:text-2xl font-medium japanese-text leading-relaxed" dangerouslySetInnerHTML={{ __html: currentQ.questionText }}></h2>
        </div>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, optIdx) => (
            <OptionButton 
              key={optIdx}
              text={opt}
              index={optIdx}
              isSelected={selectedIdx === optIdx}
              isCorrect={currentQ.correctIndex !== -1 ? currentQ.correctIndex === optIdx : null}
              feedbackMode={feedbackMode}
              onClick={() => handleOptionSelect(currentQ.id, optIdx)}
              disabled={feedbackMode === 'Immediate' && selectedIdx !== undefined}
            />
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)] mt-8">
          <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
            &larr; Previous
          </Button>
          <Button variant="primary" onClick={handleNext} disabled={currentIndex === totalQuestions - 1}>
            Next &rarr;
          </Button>
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

    </div>
  );
};

export default PracticeSetQuizPage;
