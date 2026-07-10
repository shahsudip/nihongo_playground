import React, { useState, useEffect, useCallback } from 'react';
import '../assets/shinkanzen_quiz.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { OptionButton } from './ui/OptionButton';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { QuestionNavigator } from './ui/QuestionNavigator';

/* ─────────────────────────────────────────────
   Shinkanzen Master – dedicated reading quiz UI
   Wide passage rectangle (left) + Q panel (right)
   Passage expands to full-screen on click
───────────────────────────────────────────── */

const ShinkanzenQuizPage = () => {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [chapter, setChapter]       = useState(null);
  const [bookTitle, setBookTitle]   = useState('');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [questions, setQuestions]   = useState([]);
  const [answers, setAnswers]       = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate');
  const [passageExpanded, setPassageExpanded] = useState(false);

  // ── fetch ─────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        let chapterData = null;

        try {
          const { sampleBooks } = await import('../data/book_data.jsx');
          const localBook = sampleBooks.find(b => b.id === bookId);
          if (localBook) {
            setBookTitle(localBook.title);
            const localChap = localBook.chapters?.find(c => c.id === chapterId);
            if (localChap) chapterData = localChap;
          }
        } catch (e) { console.warn('local load failed', e); }

        if (!chapterData) {
          const bookSnap = await getDoc(doc(db, 'books', bookId));
          if (bookSnap.exists()) setBookTitle(bookSnap.data().title || bookId);
          const chapSnap = await getDoc(doc(db, 'books', bookId, 'chapters', chapterId));
          if (chapSnap.exists()) chapterData = chapSnap.data();
        }

        if (!chapterData) { setError('Chapter not found.'); setLoading(false); return; }

        setChapter(chapterData);

        // flatten questions
        const flat = [];
        chapterData.passages?.forEach((passage, pi) => {
          passage.questions?.forEach((q, qi) => {
            flat.push({
              ...q,
              id: `${pi}-${qi}`,
              passageIndex: pi,
              passageText:   passage.passageText  || '',
              passageLayout: passage.passageLayout || '',
              imageSrc:      passage.imageSrc     || '',
              passageTitle:  passage.title        || 'Passage',
              mondaiHeader:  passage.mondaiHeader || '',
              passageNotes:  passage.passageNotes || '',
            });
          });
        });

        setQuestions(flat);
        setCurrentIndex(0);
        setAnswers({});
      } catch (err) {
        setError('Failed to load: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bookId, chapterId]);

  // ── save progress ──────────────────────────────
  const saveProgress = useCallback(async (isFinal = false) => {
    if (!currentUser || !chapter) return;
    try {
      let correct = 0;
      Object.keys(answers).forEach(id => {
        const q = questions.find(qu => qu.id === id);
        if (q && answers[id] === q.correctOption.text) correct++;
      });
      await setDoc(
        doc(db, 'users', currentUser.uid, 'quizHistory', `${bookId}-${chapterId}`),
        {
          quizId: `${bookId}-${chapterId}`, bookId, chapterId,
          title: chapter.title, type: 'book',
          timestamp: new Date().toISOString(),
          score: correct, total: questions.length,
          status: isFinal ? 'mastered' : 'incomplete',
        },
        { merge: true }
      );
    } catch (err) { console.error(err); }
  }, [bookId, chapterId, currentUser, chapter, answers, questions]);

  useEffect(() => () => { saveProgress(false); }, [saveProgress]);

  const handleFinish = () => { saveProgress(true); navigate(`/books/${bookId}`); };

  // ── guards ─────────────────────────────────────
  if (loading) return <LoadingSpinner />;
  if (error)   return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>{error}</div>;
  if (!chapter || questions.length === 0)
    return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>No questions available.</div>;

  // ── state helpers ──────────────────────────────
  const total          = questions.length;
  const answeredCount  = Object.keys(answers).length;
  const progressPct    = Math.round((answeredCount / total) * 100);
  let   correctCount   = 0;
  Object.keys(answers).forEach(id => {
    const q = questions.find(qu => qu.id === id);
    if (q && answers[id] === q.correctOption.text) correctCount++;
  });

  const currentQ      = questions[currentIndex];
  const selectedAnswer = answers[currentQ.id];
  const samePassage   = (i) => questions[i]?.passageIndex === currentQ.passageIndex;

  const handleOption = (qId, opt) => {
    setAnswers(prev => ({ ...prev, [qId]: opt }));
    if (feedbackMode === 'At End') {
      setTimeout(() => { if (currentIndex < total - 1) setCurrentIndex(i => i + 1); }, 300);
    }
  };

  // ── passage renderer ───────────────────────────
  const PassageContent = ({ className = '' }) => (
    <div className={`shinkan-passage-inner ${className}`}>
      {/* mondai header strip */}
      {(currentQ.passageTitle || currentQ.mondaiHeader) && (
        <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mb-4 text-gray-800 dark:text-gray-100 font-medium">
          {currentQ.passageTitle && currentQ.passageTitle !== chapter?.title && (
            <span className="font-bold mr-2">{currentQ.passageTitle.replace(/^第\d+部\s*/, '')}</span>
          )}
          {currentQ.mondaiHeader ? currentQ.mondaiHeader.replace(/^問題\d+\s*/, '') : ''}
        </div>
      )}

      {/* passage text */}
      {currentQ.passageText && (
        <div className="shinkan-passage-body">
          {currentQ.passageLayout === 'html'
            ? <div dangerouslySetInnerHTML={{ __html: currentQ.passageText }} />
            : <div className="whitespace-pre-wrap leading-loose" dangerouslySetInnerHTML={{ __html: currentQ.passageText }} />
          }
        </div>
      )}

      {/* image */}
      {currentQ.imageSrc && (
        <div className="text-center mt-4">
          <img src={currentQ.imageSrc} alt="Passage" className="max-w-full h-auto rounded-lg mx-auto" />
        </div>
      )}

      {/* notes / footnotes */}
      {currentQ.passageNotes && (
        <div
          className="shinkan-passage-notes"
          dangerouslySetInnerHTML={{ __html: currentQ.passageNotes }}
        />
      )}
    </div>
  );

  return (
    <>
      {/* ── Full-screen expanded passage modal ─────── */}
      {passageExpanded && (
        <div className="shinkan-modal-overlay" onClick={() => setPassageExpanded(false)}>
          <div className="shinkan-modal-box" onClick={e => e.stopPropagation()}>
            <button className="shinkan-modal-close" onClick={() => setPassageExpanded(false)}>✕ 閉じる</button>
            <div className="shinkan-modal-scroll">
              <PassageContent />
            </div>
          </div>
        </div>
      )}

      {/* ── Main layout ────────────────────────────── */}
      <div className="shinkan-root">

        {/* ── Top bar ──────────────────────────────── */}
        <div className="shinkan-topbar">
          <div className="shinkan-topbar-left">
            <Link to={`/books/${bookId}`} className="shinkan-back-link">← Exit Quiz</Link>
            <div>
              <h1 className="shinkan-book-title">{bookTitle}</h1>
              <p className="shinkan-chapter-title">{chapter.title}</p>
            </div>
          </div>

          <div className="shinkan-topbar-right">
            {/* feedback toggle */}
            <div className="shinkan-feedback-toggle">
              <span className="shinkan-toggle-label">Feedback:</span>
              {['Immediate', 'At End'].map(m => (
                <button
                  key={m}
                  className={`shinkan-toggle-btn ${feedbackMode === m ? 'active' : ''}`}
                  onClick={() => setFeedbackMode(m)}
                >{m}</button>
              ))}
            </div>

            <div className="shinkan-score-display">
              <span>{answeredCount}/{total} answered</span>
              {feedbackMode === 'Immediate' && <span className="shinkan-correct">{correctCount} correct</span>}
            </div>
          </div>
        </div>

        {/* ── Progress bar ─────────────────────────── */}
        <div className="shinkan-progress-wrap">
          <ProgressBar progressPercent={progressPct} />
        </div>

        {/* ── Two-column body ───────────────────────── */}
        <div className="shinkan-body">

          {/* LEFT — Passage panel */}
          <div className="shinkan-passage-panel">
            <div className="shinkan-passage-panel-header">
              <span className="shinkan-passage-label">📖 Passage</span>
              <button
                className="shinkan-expand-btn"
                title="Expand passage"
                onClick={() => setPassageExpanded(true)}
              >
                ⤢ Expand
              </button>
            </div>
            <div className="shinkan-passage-scroll">
              <PassageContent />
            </div>
          </div>

          {/* RIGHT — Question panel */}
          <div className="shinkan-question-panel">
            {/* question number + text */}
            <div className="shinkan-q-header">
              <span className="shinkan-q-badge">{currentIndex + 1}</span>
              <span className="shinkan-q-counter">{currentIndex + 1} / {total}</span>
            </div>

            <h2
              className="shinkan-q-text japanese-text"
              dangerouslySetInnerHTML={{
                __html: currentQ.questionText.replace(
                  /^(問い|問\d+)/,
                  '<span class="shinkan-q-num">$&</span>'
                )
              }}
            />

            {/* options */}
            <div className="shinkan-options">
              {currentQ.options.map((opt, i) => (
                <OptionButton
                  key={i}
                  text={opt.replace(/\*\*/g, '')}
                  index={i}
                  isSelected={selectedAnswer === opt}
                  isCorrect={currentQ.correctOption.text === opt}
                  feedbackMode={feedbackMode}
                  onClick={() => handleOption(currentQ.id, opt)}
                  disabled={feedbackMode === 'Immediate' && selectedAnswer !== undefined}
                />
              ))}
            </div>

            {/* explanation */}
            {feedbackMode === 'Immediate' && selectedAnswer && currentQ.explanation && (
              <div className={`shinkan-explanation ${selectedAnswer === currentQ.correctOption.text ? 'correct' : 'wrong'}`}>
                <span className="shinkan-exp-icon">
                  {selectedAnswer === currentQ.correctOption.text ? '✓' : '✗'}
                </span>
                <span className="japanese-text">{currentQ.explanation}</span>
              </div>
            )}

            {/* nav buttons */}
            <div className="shinkan-nav">
              <Button variant="outline" onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0}>
                ← Prev
              </Button>
              {currentIndex === total - 1 ? (
                <Button variant="primary" onClick={handleFinish} className="bg-gradient-to-r from-emerald-500 to-teal-600">
                  Finish Chapter
                </Button>
              ) : (
                <Button variant="primary" onClick={() => setCurrentIndex(i => Math.min(total - 1, i + 1))}>
                  Next →
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ── Question navigator ─────────────────── */}
        <div className="shinkan-navigator">
          <QuestionNavigator
            questions={questions}
            answers={answers}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            feedbackMode={feedbackMode}
            checkIsCorrect={(q, ans) => ans[q.id] === q.correctOption.text}
          />
        </div>
      </div>
    </>
  );
};

export default ShinkanzenQuizPage;
