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
    cellPrefix: 'Letters and Vocabulary Test N3 Test Number',
    shortLabel: 'Part 1: 文字・語彙',
  },
  {
    partId: 3,
    key: 'grammar_reading',
    categoryTitle: 'Grammar (文法), Reading Comprehension (読解)',
    cellPrefix: 'Grammar Level N3 Test Number',
    shortLabel: 'Part 3: 文法・読解',
  },
  {
    partId: 4,
    key: 'listening',
    categoryTitle: 'Listening (聴解)',
    cellPrefix: 'Listening (聴解) Test N3 Test Number',
    shortLabel: 'Part 4: 聴解',
  },
];

function speakJapanese(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const cleanText = String(text || '')
    .replace(/<[^>]+>/g, '')
    .replace(/^\d+\.\s*/, '')
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

  const [activeTestData, setActiveTestData] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [openScripts, setOpenScripts] = useState({});

  const activeTestNum = paramTestNum ? Number(paramTestNum) : null;
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
    if (!activeTestNum) {
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
        const data = await getDethiN3Test(activeTestNum);
        if (mounted) {
          setActiveTestData(data);
        }
      } finally {
        if (mounted) setLoadingTest(false);
      }
    }
    loadTest();
    return () => {
      mounted = false;
    };
  }, [activeTestNum, activePartId]);

  const tests = useMemo(() => indexData?.tests || [], [indexData]);

  const totalQuestionsAcrossAll = useMemo(
    () => tests.reduce((acc, t) => acc + (t.totalQuestions || 0), 0),
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

  const handleSelectOption = useCallback(
    (qKey, optIndex) => {
      if (isChecked) return;
      setSelectedAnswers(prev => ({
        ...prev,
        [qKey]: optIndex,
      }));
    },
    [isChecked]
  );

  // Calculate score when Saiten() / Check result is clicked
  const scoreSummary = useMemo(() => {
    if (!currentSection) return { earnedPoints: 0, maxPoints: 0, correctCount: 0, totalCount: 0 };
    const questions = currentSection.questions || [];
    let earnedPoints = 0;
    let maxPoints = 0;
    let correctCount = 0;

    questions.forEach(q => {
      const qKey = `q_${q.number}`;
      const pts = Number(q.points) || 1;
      maxPoints += pts;
      const chosenIdx = selectedAnswers[qKey];
      if (chosenIdx !== undefined && chosenIdx === q.correct - 1) {
        earnedPoints += pts;
        correctCount += 1;
      }
    });

    return {
      earnedPoints,
      maxPoints,
      correctCount,
      totalCount: questions.length,
    };
  }, [currentSection, selectedAnswers]);

  const handleCheckResult = async () => {
    setIsChecked(true);
    if (!activeTestNum || !currentSection) return;

    const qid = `dttn-n3-${activeTestNum}-${currentSection.partId}`;
    const record = {
      id: qid,
      quizId: qid,
      testNumber: activeTestNum,
      partId: currentSection.partId,
      sectionKey: currentSection.id,
      score: scoreSummary.correctCount,
      total: scoreSummary.totalCount,
      earnedPoints: scoreSummary.earnedPoints,
      maxPoints: scoreSummary.maxPoints,
      status: 'completed',
      completedAt: new Date().toISOString(),
    };

    setHistory(prev => ({ ...prev, [qid]: record }));
    await saveDethiN3Record(currentUser, record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetSheet = () => {
    setSelectedAnswers({});
    setIsChecked(false);
  };

  if (loadingIndex) {
    return (
      <div className="dttn-hallmark-page">
        <div className="dttn-hallmark-container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
          <LoadingSpinner />
          <p style={{ marginTop: '1rem', color: 'var(--dttn-text-muted)' }}>
            Loading JLPT N3 Mock Tests...
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
            {activeTestNum ? (
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

        {/* VIEW 1: Directory of all 18 N3 Tests grouped into 3 classic sections */}
        {!activeTestNum && (
          <>
            <section className="dttn-hero">
              <div>
                <h1 className="dttn-hero-title">JLPT N3 Practice Tests</h1>
                <p className="dttn-hero-subtitle">
                  Eighteen complete N3 mock exams with instant grading, audio tracks, and reading passages.
                </p>
                <div className="dttn-hero-actions">
                  <button
                    type="button"
                    onClick={() => navigate('/dethitiengnhat/n3/32/1')}
                    className="dttn-primary-btn"
                  >
                    Start Test Number 32
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/dethitiengnhat/n3/1/1')}
                    className="dttn-secondary-btn"
                  >
                    Open Test Number 1
                  </button>
                </div>
              </div>

              {/* Signature Card */}
              <div className="dttn-signature-card">
                <div className="dttn-signature-header">
                  <span>dethitiengnhat.com N3 Archive</span>
                  <span>Synced to DB & JSON</span>
                </div>
                <div className="dttn-signature-stats">
                  <div className="dttn-stat-box">
                    <div className="dttn-stat-value">{tests.length}</div>
                    <div className="dttn-stat-label">N3 test sets</div>
                  </div>
                  <div className="dttn-stat-box">
                    <div className="dttn-stat-value">53</div>
                    <div className="dttn-stat-label">Section papers</div>
                  </div>
                  <div className="dttn-stat-box">
                    <div className="dttn-stat-value">{totalQuestionsAcrossAll}</div>
                    <div className="dttn-stat-label">Total questions</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3 Classic Sections matching dethitiengnhat.com/en/jlpt/N3 */}
            {PART_CATEGORIES.map(cat => {
              const availableTests = tests.filter(t =>
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
                            {cat.cellPrefix} {t.testNumber}
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
        {activeTestNum && (
          <div className="dttn-exam-wrapper">
            {loadingTest || !activeTestData ? (
              <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                <LoadingSpinner />
                <p style={{ marginTop: '1rem', color: 'var(--dttn-text-muted)' }}>
                  Loading JLPT N3 Test #{activeTestNum}...
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                      JLPT Mock Test N3 — Test #{activeTestNum}
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: 'var(--dttn-text-muted)', margin: '0.25rem 0 0 0' }}>
                      {currentSection?.enTitle || currentSection?.title} ({currentSection?.questionCount || 0} questions)
                    </p>
                  </div>

                  {/* Quick Test Number Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label htmlFor="dttn-test-select" style={{ fontSize: '0.875rem', color: 'var(--dttn-text-muted)' }}>
                      Switch test:
                    </label>
                    <select
                      id="dttn-test-select"
                      value={activeTestNum}
                      onChange={e => navigate(`/dethitiengnhat/n3/${e.target.value}/${activePartId}`)}
                      className="dttn-back-link"
                    >
                      {tests.map(t => (
                        <option key={t.testNumber} value={t.testNumber}>
                          Test Number {t.testNumber}
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
                            onClick={() => navigate(`/dethitiengnhat/n3/${activeTestNum}/${part.partId}`)}
                            className={`dttn-part-tab ${isActive ? 'is-active' : ''}`}
                          >
                            {part.shortLabel}
                          </button>
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
                    </div>
                  </div>

                  {/* Score Banner when Checked */}
                  {isChecked && (
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
                                if (isChecked) {
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
                                      name={`dttn_${activeTestNum}_${currentSection.partId}_${qNum}`}
                                      checked={isSelected}
                                      onChange={() => handleSelectOption(qKey, optIdx)}
                                      disabled={isChecked}
                                    />
                                    <span>{optText}</span>
                                  </label>
                                );
                              })}
                            </div>

                            {(block.explanationHtml || block.transcript) && (
                              <div style={{ marginTop: '0.75rem' }}>
                                {!isChecked && (
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

                                {(isChecked || openScripts[qKey]) && (
                                  <div
                                    className="dttn-gt-box"
                                    dangerouslySetInnerHTML={{
                                      __html: block.explanationHtml || block.transcript,
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
                    <button
                      type="button"
                      onClick={handleCheckResult}
                      className="dttn-check-btn"
                    >
                      Check result
                    </button>
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
