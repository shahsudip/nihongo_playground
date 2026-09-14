import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/n4_practice_sets.css';

const N4PracticeSetQuizPage = () => {
  const { setId, sectionId } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMode, setFeedbackMode] = useState('Immediate'); // 'Immediate' or 'Exam'
  const [currentSet, setCurrentSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(1); // 0: Normal, 1: Large, 2: Extra Large
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

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
        const docRef = doc(db, 'books', 'chokuzen-taisaku-n4');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const bookData = docSnap.data();
          const set = bookData.sets.find(s => s.id === setId);
          setCurrentSet(set);
        } else {
          console.error("Book document 'chokuzen-taisaku-n4' not found in Firestore.");
        }
      } catch (err) {
        console.error('Error fetching quiz set from Firestore:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [setId]);

  const sectionsToShow = useMemo(() => {
    if (sectionId === 'grammar' || sectionId === 'grammar-reading') return ['grammar-reading'];
    if (sectionId === 'full') return ['vocabulary-kanji', 'grammar-reading'];
    return ['vocabulary-kanji'];
  }, [sectionId]);

  const questions = useMemo(() => {
    if (!currentSet) return [];
    const qs = [];
    sectionsToShow.forEach(sec => {
      if (currentSet.sections?.[sec]?.questions) {
        currentSet.sections[sec].questions.forEach(q => {
          qs.push({
            ...q,
            parentSection: sec,
            passage: q.passage || currentSet.sections[sec].passage || null
          });
        });
      }
    });
    return qs;
  }, [currentSet, sectionsToShow]);

  // Group questions by Mondai type for Section selector
  const questionGroups = useMemo(() => {
    if (!questions.length) return [];
    const groups = [];
    let currentGroup = null;

    questions.forEach((q, idx) => {
      let groupName = q.instruction || 'Questions';
      if (groupName.includes('問題1')) groupName = q.parentSection === 'vocabulary-kanji' ? '問題1: 漢字読み' : '問題1: 文法形式';
      else if (groupName.includes('問題2')) groupName = q.parentSection === 'vocabulary-kanji' ? '問題2: 表記' : '問題2: ★整序';
      else if (groupName.includes('問題3')) groupName = q.parentSection === 'vocabulary-kanji' ? '問題3: 文脈規定' : '問題3: 文章読解';
      else if (groupName.includes('問題4')) groupName = '問題4: 言い換え類義';
      else if (groupName.includes('問題5')) groupName = '問題5: 用法';

      if (!currentGroup || currentGroup.name !== groupName) {
        currentGroup = {
          id: `group-${groups.length + 1}`,
          name: groupName,
          parentSection: q.parentSection,
          indices: []
        };
        groups.push(currentGroup);
      }
      currentGroup.indices.push(idx);
    });
    return groups;
  }, [questions]);

  const [activeSection, setActiveSection] = useState('group-1');

  // Keep first section selected by default
  useEffect(() => {
    if (questionGroups.length > 0 && !questionGroups.some(g => g.id === activeSection)) {
      setActiveSection(questionGroups[0].id);
    }
  }, [questionGroups, activeSection]);

  // Automatically keep activeSection in sync when user clicks Next/Previous
  useEffect(() => {
    if (questionGroups.length > 0) {
      const activeGroup = questionGroups.find(g => g.id === activeSection);
      if (!activeGroup || !activeGroup.indices.includes(currentIndex)) {
        const found = questionGroups.find(g => g.indices.includes(currentIndex));
        if (found) setActiveSection(found.id);
      }
    }
  }, [currentIndex, questionGroups, activeSection]);

  const visibleIndices = useMemo(() => {
    const targetGroup = questionGroups.find(g => g.id === activeSection);
    return targetGroup ? targetGroup.indices : (questionGroups[0]?.indices || questions.map((_, i) => i));
  }, [questionGroups, activeSection, questions]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (optIndex) => {
    if (feedbackMode === 'Immediate' && answers[currentIndex] !== undefined) return;
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: optIndex
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.reduce((acc, q, idx) => {
    return answers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const accuracyPercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const overallPercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  // Star question renderer
  const renderStarQuestion = (text) => {
    if (!text.includes('★') && !text.includes('___')) {
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    }
    const parts = text.split('★');
    return (
      <div className="n4-star-puzzle-container">
        <div className="text-lg sm:text-xl font-bold mb-2 leading-relaxed" style={{ color: 'var(--n4-text-main)' }}>
          <span dangerouslySetInnerHTML={{ __html: parts[0] }} />
          <span className="n4-star-slot">★ 星の位置に入るもの</span>
          <span dangerouslySetInnerHTML={{ __html: parts[1] || '' }} />
        </div>
        <div className="n4-star-subnote">
          文を正しい順序に並べたとき、★に入る選択肢を1つ選んでください。
        </div>
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;

  if (!currentSet || questions.length === 0) {
    return (
      <div className="n4-practice-container text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Questions Not Found</h2>
        <p className="text-slate-400 mb-6">Could not load questions for this set from the database.</p>
        <Link to="/chokuzen-taisaku-n4" className="n4-card-btn inline-block max-w-xs">
          &larr; Back to Sets List
        </Link>
      </div>
    );
  }

  const isPassageQuestion = Boolean(currentQ.passage || currentQ.instruction?.includes('問題3'));
  const fontSizeClass = fontSizeLevel === 2 ? 'text-2xl' : fontSizeLevel === 1 ? 'text-xl' : 'text-lg';

  // Completion Screen
  if (isFinished) {
    return (
      <div className="n4-practice-container">
        <nav aria-label="Breadcrumb" className="n4-breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to="/books">Books</Link>
          <span className="separator">/</span>
          <Link to={`/chokuzen-taisaku-n4/${setId}`}>第{currentSet.id.replace(/\D/g, '')}回</Link>
          <span className="separator">/</span>
          <span className="current">Results</span>
        </nav>

        <div className="n4-results-card">
          <div className="n4-trophy-icon">🏆</div>
          <h1 className="n4-results-title">Quiz Completed!</h1>
          <p className="text-sm mb-4" style={{ color: 'var(--n4-text-sub)' }}>
            第{currentSet.id.replace(/\D/g, '')}回 &bull; {currentSet.title}
          </p>

          <div className="n4-score-circle-wrap">
            <div className="n4-score-big">{correctCount}/{questions.length}</div>
            <div className="n4-score-percent">{overallPercent}% Score</div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
            <div
              className="p-4 rounded-2xl border"
              style={{
                background: 'var(--n4-stat-box-bg)',
                borderColor: 'var(--n4-stat-box-border)'
              }}
            >
              <div className="text-xs font-bold mb-1" style={{ color: 'var(--n4-text-muted)' }}>Time Elapsed</div>
              <div className="text-lg font-extrabold" style={{ color: 'var(--n4-text-main)' }}>{formatTime(timerSeconds)}</div>
            </div>
            <div
              className="p-4 rounded-2xl border"
              style={{
                background: 'var(--n4-stat-box-bg)',
                borderColor: 'var(--n4-stat-box-border)'
              }}
            >
              <div className="text-xs font-bold mb-1" style={{ color: 'var(--n4-text-muted)' }}>Pass Status</div>
              <div className={`text-lg font-extrabold ${overallPercent >= 60 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {overallPercent >= 60 ? 'PASSED 🎖️' : 'REVIEW NEEDED'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setAnswers({});
                setCurrentIndex(0);
                setIsFinished(false);
                setTimerSeconds(0);
              }}
              className="n4-btn-secondary"
            >
              🔄 Retake Quiz
            </button>
            <button
              onClick={() => {
                setIsFinished(false);
                setFeedbackMode('Immediate');
                setCurrentIndex(0);
              }}
              className="n4-btn-primary"
            >
              📝 Review All Questions
            </button>
            <Link
              to="/chokuzen-taisaku-n4"
              className="n4-btn-secondary"
            >
              &larr; Back to Sets List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="n4-practice-container">
      {/* Quiz Top Navigation Bar */}
      <div className="n4-quiz-header">
        <div className="flex items-center gap-3">
          <Link
            to="/chokuzen-taisaku-n4"
            className="text-xs sm:text-sm font-bold flex items-center gap-1 transition-colors"
            style={{ color: 'var(--n4-text-muted)' }}
          >
            &larr; Exit
          </Link>
          <span className="opacity-40">|</span>
          <span
            className="font-extrabold text-xs sm:text-sm truncate max-w-[240px] sm:max-w-none"
            style={{ color: 'var(--n4-text-main)' }}
          >
            第{currentSet.id.replace(/\D/g, '')}回 &bull; {currentSet.title}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Mode Switcher */}
          <div className="n4-quiz-mode-pill">
            <button
              onClick={() => setFeedbackMode('Immediate')}
              className={`n4-quiz-mode-btn ${feedbackMode === 'Immediate' ? 'active' : ''}`}
            >
              Practice Mode
            </button>
            <button
              onClick={() => setFeedbackMode('Exam')}
              className={`n4-quiz-mode-btn ${feedbackMode === 'Exam' ? 'active' : ''}`}
            >
              Exam Mode
            </button>
          </div>

          {/* Font Size Zoom Controller */}
          <div
            className="hidden sm:flex items-center border rounded-xl p-1 text-xs"
            style={{
              background: 'var(--n4-stat-box-bg)',
              borderColor: 'var(--n4-border)'
            }}
          >
            <button
              onClick={() => setFontSizeLevel(0)}
              className="px-2 py-1 rounded font-bold transition-all"
              style={{
                background: fontSizeLevel === 0 ? 'var(--n4-primary)' : 'transparent',
                color: fontSizeLevel === 0 ? '#ffffff' : 'var(--n4-text-muted)'
              }}
              title="Normal Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel(1)}
              className="px-2 py-1 rounded font-bold transition-all"
              style={{
                background: fontSizeLevel === 1 ? 'var(--n4-primary)' : 'transparent',
                color: fontSizeLevel === 1 ? '#ffffff' : 'var(--n4-text-muted)'
              }}
              title="Large Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel(2)}
              className="px-2 py-1 rounded font-bold transition-all"
              style={{
                background: fontSizeLevel === 2 ? 'var(--n4-primary)' : 'transparent',
                color: fontSizeLevel === 2 ? '#ffffff' : 'var(--n4-text-muted)'
              }}
              title="Extra Large Font Size"
            >
              A+
            </button>
          </div>

          {/* Timer Capsule */}
          <div
            className="flex items-center gap-1.5 border px-3 py-1.5 rounded-xl text-xs font-mono font-bold"
            style={{
              background: 'var(--n4-stat-box-bg)',
              borderColor: 'var(--n4-border)',
              color: 'var(--n4-text-main)'
            }}
          >
            <span>⏱️</span>
            <span>{formatTime(timerSeconds)}</span>
          </div>

          {/* Answered Progress Pill */}
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-xl border"
            style={{
              background: 'var(--n4-stat-box-bg)',
              borderColor: 'var(--n4-box-white-border)',
              color: 'var(--n4-text-main)'
            }}
          >
            {answeredCount}/{questions.length} Done
          </span>
        </div>
      </div>

      {/* 🚀 DUAL DROPDOWNS: SECTION & QUESTION (SIDE-BY-SIDE IN SAME ROW) */}
      <div className="n4-dropdown-nav-card">
        <div className="n4-dropdown-group-wrap">
          {/* Dropdown 1: Section */}
          <div className="n4-select-wrapper">
            <select
              value={activeSection}
              onChange={(e) => {
                const newSection = e.target.value;
                setActiveSection(newSection);
                const targetGroup = questionGroups.find(g => g.id === newSection);
                if (targetGroup && targetGroup.indices.length > 0 && !targetGroup.indices.includes(currentIndex)) {
                  setCurrentIndex(targetGroup.indices[0]);
                }
              }}
              className="n4-nav-select"
            >
              {questionGroups.map(group => {
                const firstQ = group.indices[0] + 1;
                const lastQ = group.indices[group.indices.length - 1] + 1;
                return (
                  <option key={group.id} value={group.id}>
                    {group.name} (Q{firstQ}–Q{lastQ})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Dropdown 2: Question */}
          <div className="n4-select-wrapper">
            <select
              value={currentIndex}
              onChange={(e) => {
                const idx = parseInt(e.target.value);
                setCurrentIndex(idx);
              }}
              className="n4-nav-select"
            >
              {visibleIndices.map(idx => {
                const q = questions[idx];
                let iconTag = '';
                if (q.questionText?.includes('★')) iconTag = ' ★';
                else if (q.passage) iconTag = ' 📄';

                return (
                  <option key={idx} value={idx}>
                    Q{idx + 1}{iconTag}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Main Question Arena */}
      <div className={isPassageQuestion && currentQ.passage ? 'n4-split-arena' : ''}>
        {/* Sticky Reading Passage View (Mondai 3) */}
        {isPassageQuestion && currentQ.passage && (
          <div className="n4-passage-card">
            <div className="n4-passage-title-bar">
              <span className="text-xs uppercase font-extrabold text-amber-500 tracking-wider flex items-center gap-2">
                <span>📄</span> 読解問題の文章 (Reading Passage)
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--n4-text-muted)' }}>Q21 〜 Q25</span>
            </div>
            <div
              className={`leading-loose font-medium ${fontSizeClass}`}
              dangerouslySetInnerHTML={{ __html: currentQ.passage }}
            />
          </div>
        )}

        {/* Question Card Arena */}
        <div className="n4-arena-box">
          <div>
            {/* Instruction Type Badge */}
            {currentQ.instruction && (
              <div className="n4-instruction-badge" style={{ color: 'var(--n4-text-main)' }}>
                <span style={{ color: 'var(--n4-text-main)' }}>{currentQ.instruction}</span>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--n4-text-main)' }}>
                Question {currentIndex + 1}
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--n4-text-muted)' }}>ID: #{currentQ.id}</span>
            </div>

            {/* Question Text */}
            <div className={`n4-main-q-text ${fontSizeClass}`}>
              {currentQ.questionText?.includes('★') ? (
                renderStarQuestion(currentQ.questionText)
              ) : (
                <span dangerouslySetInnerHTML={{ __html: currentQ.questionText }} />
              )}
            </div>

            {/* Options Grid */}
            <div className="n4-options-grid">
              {currentQ.options?.map((opt, optIdx) => {
                const isSelected = answers[currentIndex] === optIdx;
                const isCorrect = currentQ.correctIndex === optIdx;
                const showFeedback = feedbackMode === 'Immediate' && answers[currentIndex] !== undefined;

                let optClass = '';
                if (showFeedback) {
                  if (isCorrect) {
                    optClass = 'correct-feedback';
                  } else if (isSelected) {
                    optClass = 'wrong-feedback';
                  } else {
                    optClass = 'faded';
                  }
                } else if (isSelected) {
                  optClass = 'selected';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={showFeedback}
                    className={`n4-option-btn ${optClass}`}
                  >
                    <span className="n4-opt-num">{optIdx + 1}</span>
                    <span className="flex-grow" dangerouslySetInnerHTML={{ __html: opt }} />
                    {showFeedback && isCorrect && <span className="text-emerald-500 text-lg font-black">✓</span>}
                    {showFeedback && isSelected && !isCorrect && <span className="text-rose-500 text-lg font-black">✗</span>}
                  </button>
                );
              })}
            </div>

            {/* Immediate Mode Explanation Card */}
            {feedbackMode === 'Immediate' && answers[currentIndex] !== undefined && (
              <div className={`n4-explanation-card ${answers[currentIndex] === currentQ.correctIndex ? 'correct' : 'wrong'}`}>
                <span className="text-xl">
                  {answers[currentIndex] === currentQ.correctIndex ? '🎉' : '💡'}
                </span>
                <div>
                  <div className="font-extrabold mb-0.5">
                    {answers[currentIndex] === currentQ.correctIndex ? '正解 (Correct!)' : '不正解 (Incorrect)'}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>正しい答え: <strong>{currentQ.correctIndex + 1}.</strong></span>
                    <span className="font-bold" dangerouslySetInnerHTML={{ __html: currentQ.options[currentQ.correctIndex] }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div className="n4-action-bar">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="n4-btn-secondary"
            >
              &larr; Previous
            </button>

            <span className="text-xs font-mono hidden sm:inline" style={{ color: 'var(--n4-text-muted)' }}>
              Accuracy: {accuracyPercent}% ({correctCount}/{answeredCount})
            </span>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="n4-btn-primary"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                onClick={() => setIsFinished(true)}
                className="n4-btn-finish"
              >
                Finish Quiz 🏆
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default N4PracticeSetQuizPage;
