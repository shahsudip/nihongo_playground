import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  getDethiN3Index,
  getDethiN3Test,
  getDethiN3History,
  saveDethiN3Record,
} from '../utils/dethitiengnhat_n3_service.js';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/dethitiengnhat_hallmark.css';

const PART_CATEGORIES = [
  {
    partId: 1,
    key: 'vocab',
    categoryTitle: 'Letters and Vocabulary (文字語彙)',
    cellPrefix: 'Letters and Vocabulary Test N3',
    shortLabel: 'Part 1: 文字・語彙',
  },
  {
    partId: 3,
    key: 'grammar_reading',
    categoryTitle: 'Grammar (文法), Reading Comprehension (読解)',
    cellPrefix: 'Grammar & Reading Test N3',
    shortLabel: 'Part 3: 文法・読解',
  },
  {
    partId: 4,
    key: 'listening',
    categoryTitle: 'Listening (聴解)',
    cellPrefix: 'Listening (聴解) Test N3',
    shortLabel: 'Part 4: 聴解',
  },
];

function formatTestLabel(testItem) {
  const code = String(testItem?.testNumber || '');
  if (/^20\d{4}$/.test(code)) {
    const y = code.slice(0, 4);
    const m = code.slice(4, 6);
    return `${y}/${m} Official Exam (${y}年${Number(m)}月)`;
  }
  return `Test Number ${code}`;
}

function speakJapanese(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const cleanText = String(text || '')
    .replace(/<[^>]+>/g, '')
    .replace(/^\d+[\.\)]\s*/, '')
    .trim();
  if (!cleanText) return;
  const utter = new SpeechSynthesisUtterance(cleanText);
  utter.lang = 'ja-JP';
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}

const DethiTiengNhatN3Page = () => {
  const { testNumber: paramTestNum, partId: paramPartId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [indexData, setIndexData] = useState(null);
  const [history, setHistory] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(true);
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'MOCK' | 'PAST'

  const [activeTestData, setActiveTestData] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [openScripts, setOpenScripts] = useState({});

  const activeTestCode = paramTestNum ? String(paramTestNum) : null;
  const activePartId = paramPartId ? Number(paramPartId) : 1;

  // Load index & history
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoadingIndex(true);
      try {
        const [idx, hist] = await Promise.all([
          getDethiN3Index(),
          getDethiN3History(currentUser),
        ]);
        if (mounted) {
          setIndexData(idx);
          setHistory(hist || {});
        }
      } finally {
        if (mounted) setLoadingIndex(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [currentUser]);

  // Load individual test when a testNumber is selected in URL
  useEffect(() => {
    if (!activeTestCode) {
      setActiveTestData(null);
      return;
    }
    let mounted = true;
    async function loadTest() {
      setLoadingTest(true);
      setSelectedAnswers({});
      setIsChecked(false);
      setOpenScripts({});
      try {
        const data = await getDethiN3Test(activeTestCode);
        if (mounted) {
          setActiveTestData(data);
          // Restore saved attempt history if available
          const qid = `dttn-n3-${activeTestCode}-${activePartId}`;
          const savedRecord = history[qid];
          if (savedRecord?.selectedAnswers && Object.keys(savedRecord.selectedAnswers).length > 0) {
            setSelectedAnswers(savedRecord.selectedAnswers);
            if (activePartId === 1 || activePartId === 3) {
              const opened = {};
              Object.keys(savedRecord.selectedAnswers).forEach(k => {
                opened[k] = true;
              });
              setOpenScripts(opened);
            }
          }
        }
      } finally {
        if (mounted) setLoadingTest(false);
      }
    }
    loadTest();
    return () => {
      mounted = false;
    };
  }, [activeTestCode, activePartId, history]);

  const tests = useMemo(() => indexData?.tests || [], [indexData]);

  const filteredTests = useMemo(() => {
    if (filterMode === 'MOCK') {
      return tests.filter(t => t.categoryType !== 'past_exam' && !/^20\d{4}$/.test(String(t.testNumber)));
    }
    if (filterMode === 'PAST') {
      return tests.filter(t => t.categoryType === 'past_exam' || /^20\d{4}$/.test(String(t.testNumber)));
    }
    return tests;
  }, [tests, filterMode]);

  const totalQuestionsAcrossAll = useMemo(
    () => tests.reduce((acc, t) => acc + (t.totalQuestions || 0), 0),
    [tests]
  );

  const totalSectionPapers = useMemo(
    () => tests.reduce((acc, t) => acc + (t.sections?.length || 0), 0),
    [tests]
  );

  const currentSection = useMemo(() => {
    if (!activeTestData?.sections) return null;
    return (
      activeTestData.sections.find(s => Number(s.partId) === activePartId) ||
      activeTestData.sections[0] ||
      null
    );
  }, [activeTestData, activePartId]);

  const isInstantMode = currentSection?.partId === 1 || currentSection?.partId === 3;

  // Calculate score in real time (for instant feedback and check result)
  const scoreSummary = useMemo(() => {
    if (!currentSection) return { earnedPoints: 0, maxPoints: 0, correctCount: 0, totalCount: 0, answeredCount: 0 };
    const questions = currentSection.questions || [];
    let earnedPoints = 0;
    let maxPoints = 0;
    let correctCount = 0;
    let answeredCount = 0;

    questions.forEach(q => {
      const qKey = `q_${q.number}`;
      const pts = Number(q.points) || 1;
      maxPoints += pts;
      const chosenIdx = selectedAnswers[qKey];
      if (chosenIdx !== undefined) {
        answeredCount += 1;
        if (chosenIdx === q.correct - 1) {
          earnedPoints += pts;
          correctCount += 1;
        }
      }
    });

    return {
      earnedPoints,
      maxPoints,
      correctCount,
      totalCount: questions.length,
      answeredCount,
    };
  }, [currentSection, selectedAnswers]);

  const handleSelectOption = useCallback(
    (qKey, optIndex) => {
      if (isChecked && !isInstantMode) return;
      if (isInstantMode && selectedAnswers[qKey] !== undefined) return;

      const newAnswers = {
        ...selectedAnswers,
        [qKey]: optIndex,
      };
      setSelectedAnswers(newAnswers);

      if (isInstantMode) {
        // Automatically reveal explanation for answered item
        setOpenScripts(prev => ({ ...prev, [qKey]: true }));

        // Automatically persist score and attempt state
        if (activeTestCode && currentSection) {
          const questions = currentSection.questions || [];
          let earnedPoints = 0;
          let maxPoints = 0;
          let correctCount = 0;
          let answeredCount = 0;

          questions.forEach(q => {
            const key = `q_${q.number}`;
            const pts = Number(q.points) || 1;
            maxPoints += pts;
            const chosenIdx = newAnswers[key];
            if (chosenIdx !== undefined) {
              answeredCount += 1;
              if (chosenIdx === q.correct - 1) {
                earnedPoints += pts;
                correctCount += 1;
              }
            }
          });

          const qid = `dttn-n3-${activeTestCode}-${currentSection.partId}`;
          const record = {
            id: qid,
            quizId: qid,
            testNumber: activeTestCode,
            partId: currentSection.partId,
            sectionKey: currentSection.id,
            score: correctCount,
            total: questions.length,
            answeredCount,
            earnedPoints,
            maxPoints,
            selectedAnswers: newAnswers,
            status: answeredCount === questions.length ? 'completed' : 'in_progress',
            updatedAt: new Date().toISOString(),
          };

          setHistory(prev => ({ ...prev, [qid]: record }));
          saveDethiN3Record(currentUser, record);
        }
      }
    },
    [isChecked, isInstantMode, selectedAnswers, activeTestCode, currentSection, currentUser]
  );

  const handleCheckResult = async () => {
    setIsChecked(true);
    if (!activeTestCode || !currentSection) return;

    const qid = `dttn-n3-${activeTestCode}-${currentSection.partId}`;
    const record = {
      id: qid,
      quizId: qid,
      testNumber: activeTestCode,
      partId: currentSection.partId,
      sectionKey: currentSection.id,
      score: scoreSummary.correctCount,
      total: scoreSummary.totalCount,
      answeredCount: scoreSummary.answeredCount,
      earnedPoints: scoreSummary.earnedPoints,
      maxPoints: scoreSummary.maxPoints,
      selectedAnswers,
      status: 'completed',
      completedAt: new Date().toISOString(),
    };

    setHistory(prev => ({ ...prev, [qid]: record }));
    await saveDethiN3Record(currentUser, record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetSheet = async () => {
    setSelectedAnswers({});
    setIsChecked(false);
    setOpenScripts({});

    if (activeTestCode && currentSection) {
      const qid = `dttn-n3-${activeTestCode}-${currentSection.partId}`;
      const record = {
        id: qid,
        quizId: qid,
        testNumber: activeTestCode,
        partId: currentSection.partId,
        sectionKey: currentSection.id,
        score: 0,
        total: currentSection.questions?.length || 0,
        answeredCount: 0,
        earnedPoints: 0,
        maxPoints: scoreSummary.maxPoints,
        selectedAnswers: {},
        status: 'reset',
        updatedAt: new Date().toISOString(),
      };
      setHistory(prev => ({ ...prev, [qid]: record }));
      await saveDethiN3Record(currentUser, record);
    }
  };

  if (loadingIndex) {
    return (
      <div className="dttn-hallmark-page">
        <div className="dttn-hallmark-container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
          <LoadingSpinner />
          <p style={{ marginTop: '1rem', color: 'var(--dttn-text-muted)' }}>
            Loading JLPT N3 Tests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dttn-hallmark-page">
      <div className="dttn-hallmark-container">
        {/* Top Bar */}
        <header className="dttn-top-bar">
          <div className="dttn-brand-group">
            {activeTestCode ? (
              <button
                type="button"
                onClick={() => navigate('/dethitiengnhat/n3')}
                className="dttn-back-link"
              >
                Back to N3 Test Directory
              </button>
            ) : (
              <Link to="/levels/n3" className="dttn-back-link">
                Back to N3 Study Tracks
              </Link>
            )}
          </div>

          <div className="dttn-brand-group">
            <Link to="/levels/n3/past-questions" className="dttn-back-link">
              Official N3 Past Exams
            </Link>
            <Link to="/levels/n3/practice-tests" className="dttn-back-link">
              Full Timed Simulator
            </Link>
          </div>
        </header>

        {/* VIEW 1: Directory of all 47 N3 Tests (18 Mock + 29 Official Past) */}
        {!activeTestCode && (
          <>
            <section className="dttn-hero">
              <div>
                <h1 className="dttn-hero-title">JLPT N3 Practice & Past Tests</h1>
                <p className="dttn-hero-subtitle">
                  Forty-seven complete N3 exam sets (18 mock tests and 29 official 2010–2025 sessions) with audio and reading passages.
                </p>
                <div className="dttn-hero-actions">
                  <button
                    type="button"
                    onClick={() => navigate('/dethitiengnhat/n3/32/1')}
                    className="dttn-primary-btn"
                  >
                    Start Mock Test 32
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/dethitiengnhat/n3/202507/1')}
                    className="dttn-secondary-btn"
                  >
                    Open 2025/07 Past Exam
                  </button>
                </div>
              </div>

              {/* Signature Card */}
              <div className="dttn-signature-card">
                <div className="dttn-signature-header">
                  <span>dethitiengnhat.com Complete N3 Archive</span>
                  <span>Synced to DB & JSON</span>
                </div>
                <div className="dttn-signature-stats">
                  <div className="dttn-stat-box">
                    <div className="dttn-stat-value">{tests.length}</div>
                    <div className="dttn-stat-label">N3 test sets</div>
                  </div>
                  <div className="dttn-stat-box">
                    <div className="dttn-stat-value">{totalSectionPapers}</div>
                    <div className="dttn-stat-label">Section papers</div>
                  </div>
                  <div className="dttn-stat-box">
                    <div className="dttn-stat-value">{totalQuestionsAcrossAll}</div>
                    <div className="dttn-stat-label">Total questions</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter Bar: All 47 Sets vs 18 Mock Sets vs 29 Historical Sessions */}
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setFilterMode('ALL')}
                className={`dttn-part-tab ${filterMode === 'ALL' ? 'is-active' : ''}`}
              >
                All N3 Tests ({tests.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('MOCK')}
                className={`dttn-part-tab ${filterMode === 'MOCK' ? 'is-active' : ''}`}
              >
                Mock Tests #1–#32 (18)
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('PAST')}
                className={`dttn-part-tab ${filterMode === 'PAST' ? 'is-active' : ''}`}
              >
                Official Past Exams 2010–2025 (29)
              </button>
            </div>

            {/* 3 Classic Sections matching dethitiengnhat.com/en/jlpt/N3 */}
            {PART_CATEGORIES.map(cat => {
              const availableTests = filteredTests.filter(t =>
                (t.sections || []).some(s => Number(s.partId) === cat.partId && s.questionCount > 0)
              );

              return (
                <section key={cat.partId} className="dttn-section-block">
                  <div className="dttn-category-banner">
                    <h2 className="dttn-category-title">{cat.categoryTitle}</h2>
                    <span className="dttn-category-count">{availableTests.length} tests</span>
                  </div>

                  <div className="dttn-list-dethi">
                    {availableTests.map(t => {
                      const secInfo = t.sections.find(s => Number(s.partId) === cat.partId);
                      const qid = `dttn-n3-${t.testNumber}-${cat.partId}`;
                      const rec = history[qid];
                      const isDone = Boolean(rec);

                      return (
                        <Link
                          key={qid}
                          to={`/dethitiengnhat/n3/${t.testNumber}/${cat.partId}`}
                          className={`dttn-cell-card ${isDone ? 'is-completed' : ''}`}
                        >
                          <div className="dttn-cell-title">
                            {cat.cellPrefix} — {formatTestLabel(t)}
                          </div>
                          <div className="dttn-cell-meta">
                            <span>{secInfo?.questionCount || 0} questions</span>
                            {isDone ? (
                              <span>
                                Score: {rec.score}/{rec.total}
                              </span>
                            ) : (
                              <span>{secInfo?.durationMinutes || 30} min</span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </>
        )}

        {/* VIEW 2: Classic Inline Exam Sheet (Test Number + Part Switcher + Check Result) */}
        {activeTestCode && (
          <div className="dttn-exam-wrapper">
            {loadingTest || !activeTestData ? (
              <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                <LoadingSpinner />
                <p style={{ marginTop: '1rem', color: 'var(--dttn-text-muted)' }}>
                  Loading JLPT N3 Test {activeTestCode}...
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                      {activeTestData.title || `JLPT N3 — ${formatTestLabel(activeTestData)}`}
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: 'var(--dttn-text-muted)', margin: '0.25rem 0 0 0' }}>
                      {currentSection?.enTitle || currentSection?.title} ({currentSection?.questionCount || 0} questions)
                    </p>
                  </div>

                  {/* Quick Test Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label htmlFor="dttn-test-select" style={{ fontSize: '0.875rem', color: 'var(--dttn-text-muted)' }}>
                      Switch test:
                    </label>
                    <select
                      id="dttn-test-select"
                      value={activeTestCode}
                      onChange={e => navigate(`/dethitiengnhat/n3/${e.target.value}/${activePartId}`)}
                      className="dttn-back-link"
                    >
                      {tests.map(t => (
                        <option key={t.testNumber} value={t.testNumber}>
                          {formatTestLabel(t)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="dttn-exam-sheet">
                  {/* Top Control Bar (.chuyen_trang) */}
                  <div className="dttn-chuyen-trang">
                    <div className="dttn-part-tabs">
                      {PART_CATEGORIES.map(part => {
                        const hasPart = (activeTestData.sections || []).some(
                          s => Number(s.partId) === part.partId && s.questionCount > 0
                        );
                        if (!hasPart) return null;
                        const isActive = Number(currentSection?.partId) === part.partId;
                        return (
                          <button
                            key={part.partId}
                            type="button"
                            onClick={() => navigate(`/dethitiengnhat/n3/${activeTestCode}/${part.partId}`)}
                            className={`dttn-part-tab ${isActive ? 'is-active' : ''}`}
                          >
                            {part.shortLabel}
                          </button>
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      {isInstantMode ? (
                        <>
                          <div
                            className="dttn-instant-score-badge"
                            style={{
                              padding: '0.45rem 0.9rem',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              backgroundColor: 'var(--dttn-bg-correct, #ecfdf5)',
                              color: 'var(--dttn-text-correct, #065f46)',
                              border: '1px solid var(--dttn-border-correct, #10b981)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                            }}
                          >
                            <span>
                              Score: {scoreSummary.correctCount} / {scoreSummary.answeredCount} Correct ({scoreSummary.earnedPoints} pts)
                            </span>
                            <span style={{ opacity: 0.5 }}>•</span>
                            <span>
                              Progress: {scoreSummary.answeredCount} / {scoreSummary.totalCount}
                            </span>
                          </div>
                          {scoreSummary.answeredCount > 0 && (
                            <button
                              type="button"
                              onClick={handleResetSheet}
                              className="dttn-secondary-btn"
                              style={{ padding: '0.45rem 0.9rem', fontSize: '0.875rem' }}
                            >
                              Reset Section
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          {isChecked && (
                            <button
                              type="button"
                              onClick={handleResetSheet}
                              className="dttn-secondary-btn"
                              style={{ padding: '0.45rem 0.9rem', fontSize: '0.875rem' }}
                            >
                              Retry Section
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={handleCheckResult}
                            className="dttn-check-btn"
                          >
                            Check result
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Score Banner when Checked (for non-instant listening mode) */}
                  {!isInstantMode && isChecked && (
                    <div className="dttn-score-banner">
                      <div className="dttn-score-headline">
                        Result: {scoreSummary.correctCount} / {scoreSummary.totalCount} Correct ({scoreSummary.earnedPoints} / {scoreSummary.maxPoints} pts)
                      </div>
                      <div className="dttn-score-detail">
                        Correct answers are highlighted in green and reference scripts are shown below each item.
                      </div>
                    </div>
                  )}

                  {/* Render Content Blocks in exact sequential exam order */}
                  <div>
                    {(currentSection?.contentBlocks || []).map((block, bIdx) => {
                      if (block.type === 'section-header') {
                        return (
                          <div key={`hdr_${bIdx}`} className="dttn-big-item">
                            {block.text}
                          </div>
                        );
                      }

                      if (block.type === 'audio' && block.src) {
                        return (
                          <div key={`aud_${bIdx}`} className="dttn-audio-box">
                            <iframe
                              src={block.src}
                              width="100%"
                              height="110"
                              allow="autoplay"
                              title={`Listening Audio ${bIdx}`}
                              style={{ border: 'none', display: 'block' }}
                            />
                          </div>
                        );
                      }

                      if (block.type === 'passage' && block.htmlContent) {
                        return (
                          <div
                            key={`pas_${bIdx}`}
                            className="dttn-passage-box"
                            dangerouslySetInnerHTML={{ __html: block.htmlContent }}
                          />
                        );
                      }

                      if (block.type === 'question') {
                        const qNum = block.questionNumber;
                        const qKey = `q_${qNum}`;
                        const userChoice = selectedAnswers[qKey];
                        const correctIdx = block.correctOption?.index ?? 0;
                        const options = block.options || [];

                        return (
                          <div key={`q_${bIdx}_${qNum}`} className="dttn-question-item">
                            <div className="dttn-question-header">
                              <div
                                className="dttn-question-stem"
                                dangerouslySetInnerHTML={{
                                  __html: block.questionHtml || block.questionText || `${qNum}番`,
                                }}
                              />
                              {currentSection.partId !== 4 && (
                                <button
                                  type="button"
                                  onClick={() => speakJapanese(block.questionText)}
                                  className="dttn-tts-btn"
                                  title="Read in Japanese"
                                >
                                  Read in Japanese
                                </button>
                              )}
                            </div>

                            {block.imageUrl && (
                              <img
                                src={block.imageUrl}
                                alt={`Question ${qNum}`}
                                className="dttn-question-img"
                                loading="lazy"
                              />
                            )}

                            <div className="dttn-options-grid">
                              {options.map((optText, optIdx) => {
                                const isSelected = userChoice === optIdx;
                                const isRight = optIdx === correctIdx;

                                let stateClass = '';
                                if (isInstantMode && userChoice !== undefined) {
                                  if (isRight) {
                                    stateClass = 'is-correct-answer';
                                  } else if (isSelected) {
                                    stateClass = 'is-wrong-selected';
                                  }
                                } else if (isChecked) {
                                  if (isRight) stateClass = 'is-correct-answer';
                                  else if (isSelected && !isRight) stateClass = 'is-wrong-selected';
                                } else if (isSelected) {
                                  stateClass = 'is-selected';
                                }

                                return (
                                  <label
                                    key={optIdx}
                                    className={`dttn-option-label ${stateClass}`}
                                  >
                                    <input
                                      type="radio"
                                      name={`dttn_${activeTestCode}_${currentSection.partId}_${qNum}`}
                                      checked={isSelected}
                                      onChange={() => handleSelectOption(qKey, optIdx)}
                                      disabled={isInstantMode ? userChoice !== undefined : isChecked}
                                    />
                                    <span>{optText}</span>
                                  </label>
                                );
                              })}
                            </div>

                            {/* Explanation / Reference Box */}
                            {((isInstantMode && userChoice !== undefined) || isChecked || openScripts[qKey] || block.explanationHtml || block.transcript) && (
                              <div style={{ marginTop: '0.75rem' }}>
                                {!isInstantMode && !isChecked && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenScripts(prev => ({
                                        ...prev,
                                        [qKey]: !prev[qKey],
                                      }))
                                    }
                                    className="dttn-tts-btn"
                                  >
                                    {openScripts[qKey]
                                      ? 'Hide Script / Reference'
                                      : 'Show Script / Reference'}
                                  </button>
                                )}

                                {((isInstantMode && userChoice !== undefined) || isChecked || openScripts[qKey]) && (
                                  <div
                                    className="dttn-gt-box"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        block.explanationHtml ||
                                        block.transcript ||
                                        `<div style="display:flex;flex-direction:column;gap:0.35rem;">
                                           <div style="font-weight:700;color:var(--dttn-text-correct,#059669);">
                                             ✓ 正解: ${options[correctIdx] || block.correctOption?.text || `Option ${correctIdx + 1}`}
                                           </div>
                                           <div style="font-size:0.875rem;color:var(--dttn-text-muted,#4b5563);">
                                             The correct answer is Option ${correctIdx + 1}.
                                           </div>
                                         </div>`,
                                    }}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>

                  {/* Bottom Control Bar */}
                  <div className="dttn-chuyen-trang" style={{ borderTop: '1px solid var(--dttn-border-subtle)', borderBottom: 'none' }}>
                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="dttn-back-link"
                    >
                      Back to Top
                    </button>
                    {isInstantMode ? (
                      scoreSummary.answeredCount > 0 && (
                        <button
                          type="button"
                          onClick={handleResetSheet}
                          className="dttn-secondary-btn"
                        >
                          Reset Section
                        </button>
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={handleCheckResult}
                        className="dttn-check-btn"
                      >
                        Check result
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DethiTiengNhatN3Page;
