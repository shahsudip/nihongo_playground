import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/shinkanzen_book.css';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

// Eagerly load all local Shinkanzen JSON files in data/shinkanzen_reading/
const localChapterModules = import.meta.glob('../data/shinkanzen_reading/*.json', { eager: true });

// Dynamically generate the chapter list from the eager-loaded JSON files
const SHINKANZEN_N3_CHAPTERS = Object.keys(localChapterModules)
  .map(filePath => {
    const data = localChapterModules[filePath].default || localChapterModules[filePath];
    const rawId = data.chapterId || data.id || filePath.split('/').pop().replace('.json', '');
    const id = String(rawId);

    let mondaiNumber = data.mondaiNumber;
    if (typeof mondaiNumber !== 'number') {
      const match = id.match(/\d+/);
      mondaiNumber = match ? parseInt(match[0]) : 1;
    }
    
    let part = 1;
    if (typeof data.part === 'number' && data.part >= 1 && data.part <= 4) {
      part = data.part;
    } else if (typeof data.part === 'string') {
      const match = data.part.match(/\d+/);
      part = match ? parseInt(match[0]) : 1;
    } else {
      // Automatic part assignment based on official textbook structure
      if (mondaiNumber >= 29) {
        part = 4; // 実戦問題 (29-64)
      } else if (mondaiNumber >= 21) {
        part = 3; // 情報検索 (21-28)
      } else if (mondaiNumber >= 14) {
        part = 2; // いろいろな文章を読もう (14-20)
      } else {
        part = 1; // 基礎力をつけよう (1-13)
      }
    }

    return {
      id: id,
      part: part,
      title: data.title ? (part ? `Part ${part} - ${data.title}` : data.title) : `Part ${part}`,
      mondaiNumber: mondaiNumber,
    };
  })
  .sort((a, b) => a.mondaiNumber - b.mondaiNumber);

const PART_TITLES = {
  1: '第1部：基礎力をつけよう',
  2: '第2部：いろいろな文章を読もう',
  3: '第3部：情報検索',
  4: '第4部：実戦問題',
};

const PART_TITLES_EN = {
  1: 'Building Basic Competence',
  2: 'Reading Various Text Types',
  3: 'Information Retrieval',
  4: 'Practice Tests',
};

const GENRE_TRANSLATIONS = {
  '説明文': 'Explanatory texts',
  '指示文': 'Instruction texts',
  'エッセイ': 'Essays',
  '手紙': 'Letters',
  '広告': 'Advertisements',
  '案内': 'Information / Notices',
  'パンフレット': 'Pamphlets',
  'メニュー': 'Menus',
  '請求書': 'Invoices / Bills',
  '保証書': 'Warranty cards',
  '映画情報': 'Film information',
  'メール': 'E-mail',
  'メールマガジン': 'E-mail magazines',
  'グラフ': 'Graphic material / Charts',
  'お知らせ': 'Notices',
  '利用案内': 'User guides'
};

const ShinkanzenN3ReadingBook = () => {
  const { chapterId = 'part-1' } = useParams();
  const navigate = useNavigate();

  // Redirect Firebase 'part-X' IDs to the correct 'mondai-Y' IDs (except part-1 which is now merged)
  useEffect(() => {
    if (chapterId.startsWith('part-')) {
      const partNum = parseInt(chapterId.replace('part-', ''));
      if (partNum === 1) return; // Do not redirect part-1, it is merged

      let targetMondai = null;
      if (partNum === 2) targetMondai = 'mondai-14';
      if (partNum === 3) targetMondai = 'mondai-21';
      if (partNum === 4) targetMondai = 'mondai-29';
      
      if (targetMondai) {
        navigate(`/books/shinkanzen-master-n3-reading/chapters/${targetMondai}`, { replace: true });
      }
    } else if (chapterId === 'mondai-1') {
      navigate(`/books/shinkanzen-master-n3-reading/chapters/part-1`, { replace: true });
    }
  }, [chapterId, navigate]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  // Answer state for questions
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  // Per-passage active question index (for multi-question passages)
  const [questionIndices, setQuestionIndices] = useState({});

  const [startX, setStartX] = useState(null);

  const targetId = (chapterId === 'mondai-1' || chapterId === 'part-1') ? 'part-1' : chapterId;
  const allChapters = SHINKANZEN_N3_CHAPTERS;
  const currentChapterIndex = allChapters.findIndex(c => c.id === targetId || (targetId === 'part-1' && (c.id === 'part-1' || c.id === 'mondai-1')));
  const currentChapter = allChapters[currentChapterIndex];
  const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : null;

  // Derive current part from chapterId
  const currentPart = currentChapter?.part || 1;

  // Filter dropdown to only show mondai from the current part
  const partChapters = allChapters.filter(ch => ch.part === currentPart);

  // All available part numbers (derived from loaded chapters)
  const partNumbers = [...new Set(allChapters.map(ch => ch.part))].sort((a, b) => a - b);

  // Reset states and load data when chapterId changes
  useEffect(() => {
    setCurrentPage(0);
    setAnswers({});
    setRevealed({});
    setQuestionIndices({});
    setLoading(true);
    setError(null);

    const loadChapter = async () => {
      try {
        const resolvedId = (chapterId === 'mondai-1' || chapterId === 'part-1') ? 'part-1' : chapterId;
        const chapter = allChapters.find(c => c.id === resolvedId || (resolvedId === 'part-1' && (c.id === 'part-1' || c.id === 'mondai-1')));

        // 1. Check local JSON files first
        const matchedKey = Object.keys(localChapterModules).find(k => k.endsWith(`/${resolvedId}.json`));
        if (matchedKey && localChapterModules[matchedKey]) {
          const mod = localChapterModules[matchedKey];
          setData(mod.default || mod);
          setLoading(false);
          return;
        }

        if (!chapter) {
          setError(`Chapter "${chapterId}" not found.`);
          setLoading(false);
          return;
        }

        // 2. Try fetching from Firebase — use the parent chapter and extract specific passage
        const { firebaseChapter, passageIndex } = chapter;
        
        let chapterData = firebaseCache[firebaseChapter];
        if (!chapterData) {
          try {
            const chapterDocRef = doc(db, 'books', 'shinkanzen-master-n3-reading', 'chapters', firebaseChapter);
            const snap = await getDoc(chapterDocRef);
            if (snap.exists()) {
              chapterData = snap.data();
              firebaseCache[firebaseChapter] = chapterData;
            }
          } catch (fsErr) {
            console.warn("Firestore chapter fetch failed:", fsErr);
          }
        }

        if (chapterData && chapterData.passages && chapterData.passages[passageIndex]) {
          const passage = chapterData.passages[passageIndex];
          // Build mondai-level data from the passage
          setData({
            bookId: 'shinkanzen-master-n3-reading',
            chapterId: chapterId,
            part: chapter.part,
            partTitle: PART_TITLES[chapter.part],
            partTitleEn: PART_TITLES_EN[chapter.part],
            mondaiNumber: parseInt(chapterId.replace('mondai-', '')),
            title: passage.title || `問題${chapterId.replace('mondai-', '')}`,
            mondaiHeader: passage.mondaiHeader || '',
            passageText: passage.passageText || '',
            passageLayout: passage.passageLayout || '',
            passageNotes: passage.passageNotes || '',
            imageSrc: passage.imageSrc || '',
            questions: passage.questions || [],
          });
          setLoading(false);
          return;
        }

        // 3. Not found
        setData(null);
        setError(`Content for "${chapterId}" is currently in preparation.`);
      } catch (err) {
        console.error("Error loading chapter:", err);
        setError(err.message || "Failed to load chapter content.");
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [chapterId]);

  // Normalize data to always have a passages array
  const passagesList = data?.passages ? data.passages : (data ? [data] : []);
  const totalPages = passagesList.length || 2; // default to 2 to prevent undefined errors before load

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setCurrentPage(p => Math.min(totalPages - 1, p + 1));
      if (e.key === 'ArrowLeft') setCurrentPage(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  // Question answer logic
  const handleOptionClick = (qIdx, optionIndex) => {
    const qKey = `q-${qIdx}`;
    if (revealed[qKey]) return;
    
    setAnswers(prev => ({ ...prev, [qKey]: optionIndex + 1 }));
    setRevealed(prev => ({ ...prev, [qKey]: true }));
  };

  const handleDragStart = (e) => {
    setStartX(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  };

  const handleDragEnd = (e) => {
    if (startX === null) return;
    const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;
    
    if (diff > 50) {
      if (currentPage < totalPages - 1) {
        setCurrentPage(p => p + 1);
      } else if (nextChapter) {
        navigateToChapter(nextChapter.id);
      }
    } else if (diff < -50) {
      if (currentPage > 0) {
        setCurrentPage(p => p - 1);
      } else if (prevChapter) {
        navigateToChapter(prevChapter.id);
      }
    }
    setStartX(null);
  };

  const navigateToChapter = (id) => {
    if (id) {
      navigate(`/books/shinkanzen-master-n3-reading/chapters/${id}`);
    }
  };

  // ── Loading State ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-8 pt-24 md:pt-28 flex flex-col items-center">
        <div className="w-full max-w-[850px] px-4 mb-2 z-10">
          <Link to="/books/shinkanzen-master-n3-reading" className="text-sm font-semibold text-blue-500 hover:underline inline-block">&larr; Back to Chapters</Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-[850px] min-h-[400px]">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading chapter content...</p>
        </div>
      </div>
    );
  }

  // ── No Data State ──
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-8 pt-24 md:pt-28 flex flex-col items-center">
        <div className="w-full max-w-[850px] px-4 mb-2 z-10">
          <Link to="/books/shinkanzen-master-n3-reading" className="text-sm font-semibold text-blue-500 hover:underline inline-block">&larr; Back to Chapters</Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-[850px] min-h-[400px] text-center border border-gray-200 dark:border-gray-700">
          <div className="text-5xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Chapter In Preparation</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
            {error || `Content for "${chapterId}" is being prepared. Check back soon.`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              onClick={() => navigateToChapter('mondai-1')}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow transition"
            >
              Go to 問題1
            </button>
            <button 
              onClick={() => navigate('/books/shinkanzen-master-n3-reading')}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg shadow transition"
            >
              Back to Book Index
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Render ──
  const renderPassageText = (passage) => {
    if (!passage.passageText) return null;
    return (
      <div className="mb-5">
        {passage.passageLayout === 'html' ? (
          <div 
            className="prose prose-lg max-w-none leading-relaxed text-gray-900 bg-gray-50 p-5 rounded-lg border border-gray-200 shinkanzen-passage-html"
            dangerouslySetInnerHTML={{ __html: passage.passageText }} 
          />
        ) : (
          <div 
            className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-base leading-[2] text-gray-900 whitespace-pre-wrap font-medium"
            dangerouslySetInnerHTML={{ __html: passage.passageText }}
          />
        )}
      </div>
    );
  };

  const renderQuestions = (passage, passageIdx) => {
    if (!passage.questions || passage.questions.length === 0) return null;

    const qCount = passage.questions.length;
    const currentQIdx = questionIndices[passageIdx] ?? 0;
    const q = passage.questions[currentQIdx];
    const qKey = `p${passageIdx}-q${currentQIdx}`;
    const userAnswer = answers[qKey];
    const isRevealed = revealed[qKey];
    const correctIdx = typeof q.correct === 'number' 
      ? q.correct - 1 
      : (typeof q.correctAnswer === 'string' || typeof q.correctAnswer === 'number')
        ? parseInt(q.correctAnswer) - 1
        : q.correctOption?.index;

    const goToQ = (idx) =>
      setQuestionIndices(prev => ({ ...prev, [passageIdx]: idx }));

    return (
      <div>
        {/* ── Question navigation bar (only when multiple questions) ── */}
        {qCount > 1 && (
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-dashed border-gray-400">
            <button
              onClick={() => goToQ(Math.max(0, currentQIdx - 1))}
              disabled={currentQIdx === 0}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-lg font-bold transition"
            >
              ‹
            </button>
            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
              問い {currentQIdx + 1} <span className="text-gray-300 mx-1">/</span> {qCount}
            </span>
            <button
              onClick={() => goToQ(Math.min(qCount - 1, currentQIdx + 1))}
              disabled={currentQIdx === qCount - 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-lg font-bold transition"
            >
              ›
            </button>
          </div>
        )}

        {/* ── Active question ── */}
        <div>
          <div className="shinkanzen-question-text flex items-start">
            <span className="shinkanzen-question-badge flex-shrink-0 mt-0.5">
              問い{qCount > 1 ? currentQIdx + 1 : ''}
            </span>
            <span
              className="pt-0.5 font-bold"
              dangerouslySetInnerHTML={{ __html: (q.questionText || q.question || '').replace(/^(問い|問\d+)\s*/, '') }}
            />
          </div>

          <div className="shinkanzen-options-list">
            {q.options?.map((opt, optIdx) => {
              let optClass = 'shinkanzen-option-btn';
              if (isRevealed) {
                if (optIdx === correctIdx) optClass += ' selected-correct';
                else if (userAnswer === optIdx + 1) optClass += ' selected-wrong';
                else optClass += ' unselected';
              }
              return (
                <button
                  key={optIdx}
                  onClick={() => {
                    if (isRevealed) return;
                    setAnswers(prev => ({ ...prev, [qKey]: optIdx + 1 }));
                    setRevealed(prev => ({ ...prev, [qKey]: true }));
                  }}
                  disabled={isRevealed}
                  className={optClass}
                >
                  <span className="font-bold mr-2">{optIdx + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: opt }} />
                </button>
              );
            })}
          </div>

          {isRevealed && q.explanation && (
            <div className="shinkanzen-notes mt-4">
              <div className="shinkanzen-notes-title">解説</div>
              <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: q.explanation }} />
            </div>
          )}
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 pb-6 pt-24 md:pt-28 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-[850px] px-4 mb-2 z-10">
        <Link to="/books/shinkanzen-master-n3-reading" className="text-sm font-semibold text-blue-500 hover:underline mb-2 inline-block">
          &larr; Back to Chapters
        </Link>
        
        {/* Navigation & Chapter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-900 text-white px-4 py-2 mt-1 rounded-xl shadow-md text-sm font-medium border border-gray-700">
          
          <div className="flex items-center gap-2">
            <select
              value={currentPart}
              onChange={(e) => {
                const targetPart = parseInt(e.target.value);
                const firstInPart = allChapters.find(ch => ch.part === targetPart);
                if (firstInPart) navigateToChapter(firstInPart.id);
              }}
              className="bg-gray-800 text-white py-1 px-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-amber-500"
            >
              {partNumbers.map(pn => (
                <option key={pn} value={pn}>{PART_TITLES[pn] || `第${pn}部`}</option>
              ))}
            </select>
            
            {partChapters.length > 1 && (
              <select
                value={chapterId}
                onChange={(e) => navigateToChapter(e.target.value)}
                className="bg-gray-800 text-white py-1 px-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-amber-500 max-w-[150px] truncate"
              >
                {partChapters.map(ch => <option key={ch.id} value={ch.id}>問題{ch.mondaiNumber}</option>)}
              </select>
            )}

            {totalPages > 1 && (
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                className="bg-gray-800 text-white py-1 px-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-amber-500 font-bold"
              >
                {Array.from({ length: totalPages }).map((_, i) => (
                  <option key={i} value={i}>
                    問題 {(data.id === 'part-1' || data.chapterId === 'part-1') ? i + 1 : (data.mondaiNumber || currentChapter?.mondaiNumber || i + 1)}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
      
      {/* A4 Paper Viewport */}
      <div 
        className="relative bg-white text-black shadow-2xl border-2 border-gray-400 dark:border-gray-700 w-full max-w-[850px] h-[85vh] min-h-[800px] overflow-hidden flex select-none rounded-xl"
        onMouseDown={handleDragStart} 
        onMouseUp={handleDragEnd} 
        onTouchStart={handleDragStart} 
        onTouchEnd={handleDragEnd}
      >
        
        <div 
          className="flex w-full h-full transition-transform duration-300 ease-in-out shinkanzen-page" 
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {passagesList.map((passage, idx) => {
            const isPart1 = data.id === 'part-1' || data.chapterId === 'part-1';
            const displayMondaiNum = isPart1 ? idx + 1 : (data.mondaiNumber || currentChapter?.mondaiNumber || idx + 1);
            return (
              <div key={idx} className="w-full h-full flex-shrink-0 flex flex-col overflow-hidden">

                {/* ── TOP: Passage area (scrollable) ── */}
                <div className="flex-1 min-h-0 overflow-y-auto p-3 md:p-6 pb-1">

                  <div className="shinkanzen-part-header">
                    <div className="shinkanzen-part-banner">
                      <div className="flex items-center">
                        <div className="shinkanzen-registration-marks">
                          <div className="shinkanzen-reg-bar"></div>
                          <div className="shinkanzen-reg-bar"></div>
                          <div className="shinkanzen-reg-bar"></div>
                          <div className="shinkanzen-reg-bar"></div>
                        </div>

                        {currentPart === 4 ? (
                          <div className="shinkanzen-part4-left">
                            <span>
                              {passage.sectionHeader?.category || 
                               (displayMondaiNum <= 32 ? "内容理解（短文）" : 
                                displayMondaiNum <= 42 ? "内容理解（中文）" : 
                                displayMondaiNum <= 52 ? "内容理解（長文）" : "情報検索")}
                            </span>
                          </div>
                        ) : (
                          <div className="shinkanzen-white-pill">
                            {passage.sectionHeader?.number && (
                              <div className="shinkanzen-pill-num-box">
                                {passage.sectionHeader.number}
                              </div>
                            )}
                            <span className="shinkanzen-pill-title">
                              {passage.sectionHeader?.japanese || data.partTitle || PART_TITLES[currentPart] || "基礎力をつけよう"}
                            </span>
                            {(passage.sectionHeader?.english || data.partTitleEn || PART_TITLES_EN[currentPart]) && (
                              <span className="shinkanzen-pill-en">
                                {passage.sectionHeader?.english || data.partTitleEn || PART_TITLES_EN[currentPart]}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {currentPart === 4 && (() => {
                        const rawGenre = passage.genre || data.genre || passage.sectionHeader?.type || passage.sectionHeader?.japanese || '';
                        const cleanGenre = rawGenre.replace(/^[［\[\s]+|[］\]\s]+$/g, '') || (displayMondaiNum === 31 ? '指示文' : '説明文');
                        const rawGenreEn = passage.genreEn || data.genreEn || passage.sectionHeader?.typeEnglish || passage.sectionHeader?.english || GENRE_TRANSLATIONS[cleanGenre] || '';
                        return (
                          <div className="shinkanzen-part4-right-pill">
                            <span>
                              [{cleanGenre}]
                            </span>
                            {rawGenreEn && (
                              <span className="text-gray-600 font-medium ml-1">
                                {rawGenreEn}
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {passage.preReadingPrompt && (
                    <div className="mb-2 mt-3">
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0 w-[100px] h-[36px] flex items-center justify-center">
                          <svg viewBox="0 0 120 40" className="absolute inset-0 w-full h-full text-black" fill="white" stroke="currentColor" strokeWidth="2">
                            <path d="M60 36 C 30 36, 10 32, 2 16 L 2 4 C 10 12, 30 16, 60 16 Z" />
                            <path d="M60 36 C 90 36, 110 32, 118 16 L 118 4 C 110 12, 90 16, 60 16 Z" />
                            <line x1="60" y1="16" x2="60" y2="36" />
                            <path d="M2 16 C 10 24, 30 28, 60 28 C 90 28, 110 24, 118 16" strokeWidth="1" fill="none" />
                            <path d="M2 10 C 10 18, 30 22, 60 22 C 90 22, 110 18, 118 10" strokeWidth="1" fill="none" />
                          </svg>
                          <span className="relative z-10 text-[0.85rem] font-black tracking-widest mt-3">読む前に</span>
                        </div>
                        <div 
                          className="text-[1rem] font-bold text-gray-900 pt-2 tracking-wide"
                          dangerouslySetInnerHTML={{ __html: passage.preReadingPrompt }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="shinkanzen-mondai-header flex items-center gap-3 mt-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <svg viewBox="0 0 36 36" className="w-6 h-6 text-gray-800" fill="currentColor">
                        <path d="M18 1 L22 4 L27 2 L28 7 L33 8 L32 13 L36 17 L33 21 L35 26 L30 28 L29 33 L24 32 L20 36 L16 32 L11 33 L10 28 L5 26 L7 21 L4 17 L8 13 L7 8 L12 7 L13 2 L18 4 Z" fill="#6b7280" opacity="0.3"/>
                        <circle cx="18" cy="19" r="9" fill="white" stroke="#374151" strokeWidth="2" />
                        <path d="M18 14 L18 19 L21 19" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                        <path d="M15 6 L21 6 M18 6 L18 9" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-xl font-black text-gray-900 tracking-tight">
                        問題{displayMondaiNum}
                      </span>
                    </div>
                    <span 
                      className="text-[1.02rem] font-bold text-gray-800 leading-relaxed pt-0.5"
                      dangerouslySetInnerHTML={{ 
                        __html: (passage.mondaiHeader || passage.instruction || "つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。").replace(/^問題\s*\d+\s*/, '') 
                      }}
                    />
                  </div>

                  <div className="shinkanzen-passage-body">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: (passage.passageText || passage.passage || '').replace(
                          /src=["'](\/(?:shinkanzen_pages\/)?[^"']+)["']/g, 
                          (match, p1) => `src="${import.meta.env.BASE_URL.replace(/\/$/, '')}${p1.startsWith('/') ? p1 : '/' + p1}"`
                        ) 
                      }} 
                    />
                  </div>

                  {/* Passage Source Citation */}
                  {passage.source && (
                    <div 
                      className="text-right text-xs text-gray-600 mt-2 mb-2 font-sans"
                      dangerouslySetInnerHTML={{ __html: passage.source }}
                    />
                  )}

                  {/* Footnotes / 注 */}
                  {passage.footnotes && passage.footnotes.length > 0 ? (
                    <div className="shinkanzen-footnotes">
                      {passage.footnotes.map((fn, fIdx) => (
                        <div key={fIdx} className="shinkanzen-footnote-item flex items-baseline">
                          <span 
                            className="font-bold text-gray-900 mr-1 shrink-0"
                            dangerouslySetInnerHTML={{ __html: `${fn.term || fn.word}：` }}
                          />
                          <span dangerouslySetInnerHTML={{ __html: fn.definition || fn.meaning }} />
                        </div>
                      ))}
                    </div>
                  ) : passage.passageNotes ? (
                    <div className="shinkanzen-footnotes" dangerouslySetInnerHTML={{ __html: passage.passageNotes }} />
                  ) : null}

                  {/* 語句・表現 (Vocabulary / Expressions) */}
                  {(() => {
                    const rawVocab = passage.vocabulary || data.vocabulary || (Array.isArray(passage.notes) ? passage.notes.filter(n => !(n.term?.startsWith('（注') || n.term?.startsWith('(注') || n.word?.startsWith('（注') || n.word?.startsWith('(注'))) : null) || (Array.isArray(data.notes) ? data.notes.filter(n => !(n.term?.startsWith('（注') || n.term?.startsWith('(注') || n.word?.startsWith('（注') || n.word?.startsWith('(注'))) : null);
                    if (!rawVocab || rawVocab.length === 0) return null;
                    return (
                      <div className="shinkanzen-vocab-box">
                        <div className="shinkanzen-vocab-badge">語句・表現</div>
                        <div className="shinkanzen-vocab-grid">
                          {rawVocab.map((item, vIdx) => {
                            const wordText = item.term || item.word;
                            const readingText = item.reading;
                            const defText = item.definition || item.meaning;
                            return (
                              <div key={vIdx} className="shinkanzen-vocab-item">
                                <div className="shinkanzen-vocab-term">
                                  {wordText && String(wordText).includes('<ruby>') ? (
                                    <span dangerouslySetInnerHTML={{ __html: wordText }} />
                                  ) : readingText && readingText !== wordText ? (
                                    <ruby>{wordText}<rt>{readingText}</rt></ruby>
                                  ) : (
                                    <span dangerouslySetInnerHTML={{ __html: wordText }} />
                                  )}
                                </div>
                                <div className="shinkanzen-vocab-def" dangerouslySetInnerHTML={{ __html: defText }} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* ── BOTTOM: Question panel (fixed height based on content, not scrollable) ── */}
                <div className="shrink-0 border-t-2 border-dashed border-gray-400 bg-gray-50/50 p-3 md:p-5 relative z-20">
                  <div className="shinkanzen-question-container">
                    {renderQuestions(passage, idx)}
                  </div>
                </div>


              </div>

            );
          })}
        </div>

        {/* Left/Right click zones for page flipping */}
        <>
          <div 
            className="absolute left-0 top-0 h-full w-10 cursor-pointer z-10 hover:bg-black/5 flex flex-col justify-start pt-[30vh] items-center group"
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(p => Math.max(0, p - 1));
              } else if (prevChapter) {
                navigateToChapter(prevChapter.id);
              }
            }}
          >
            {(currentPage > 0 || prevChapter) && (
              <span className="text-gray-400 group-hover:text-gray-600 text-2xl font-bold select-none">&lsaquo;</span>
            )}
          </div>
          <div 
            className="absolute right-0 top-0 h-full w-10 cursor-pointer z-10 hover:bg-black/5 flex flex-col justify-start pt-[30vh] items-center group"
            onClick={() => {
              if (currentPage < totalPages - 1) {
                setCurrentPage(p => Math.min(totalPages - 1, p + 1));
              } else if (nextChapter) {
                navigateToChapter(nextChapter.id);
              }
            }}
          >
            {(currentPage < totalPages - 1 || nextChapter) && (
              <span className="text-gray-400 group-hover:text-gray-600 text-2xl font-bold select-none">&rsaquo;</span>
            )}
          </div>
        </>
      </div>

    </div>
  );
};

export default ShinkanzenN3ReadingBook;
