import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../utils/loading_spinner.jsx';

import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { useAuth } from '../context/AuthContext';

export default function ZenkamokuPageViewer() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [stateLoaded, setStateLoaded] = useState(false);

  // Persistent answers state
  const [savedAnswers, setSavedAnswers] = useState({});
  const [attemptDate, setAttemptDate] = useState(null);

  // Derive current bookId
  const location = useLocation();
  const currentBookId = location.pathname.includes('zenkamoku-n1')
    ? 'zenkamoku-n1-best-workbook'
    : location.pathname.includes('zenkamoku-n2')
    ? 'zenkamoku-n2-best-workbook'
    : 'zenkamoku-n3-best-workbook';
  const historyDocId = `${currentBookId}-${chapterId}`;
  const storageKey = currentUser
    ? `zenkamoku-progress-${currentUser.uid}-${historyDocId}`
    : `zenkamoku-progress-guest-${historyDocId}`;

  // Load progress on mount/chapter change from both localStorage and Firestore
  useEffect(() => {
    let isMounted = true;

    const loadState = async () => {
      let answersToSet = {};
      let loadedTimestamp = null;

      // 1. Check localStorage first
      if (storageKey) {
        try {
          const cached = localStorage.getItem(storageKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed && typeof parsed === 'object') {
              const localAns = parsed.answers || parsed;
              if (localAns && typeof localAns === 'object' && Object.keys(localAns).length > 0) {
                answersToSet = localAns;
              }
              if (parsed.timestamp) {
                loadedTimestamp = parsed.timestamp;
              }
            }
          }
        } catch (e) {
          console.warn("Could not read local Zenkamoku cache:", e);
        }
      }

      // Also check global quizHistory localStorage cache
      try {
        const localHist = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        const entry = localHist.find(h => (h.quizId || h.id) === historyDocId);
        if (entry) {
          if (entry.answers && Object.keys(entry.answers).length >= Object.keys(answersToSet).length) {
            answersToSet = entry.answers;
          }
          if (entry.timestamp && !loadedTimestamp) {
            loadedTimestamp = entry.timestamp;
          }
        }
      } catch (e) {
        console.warn("Could not read local quizHistory:", e);
      }

      // 2. Check Firestore record
      if (currentUser && historyDocId) {
        try {
          const ref = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            if (data.answers && typeof data.answers === 'object' && Object.keys(data.answers).length > 0) {
              if (Object.keys(data.answers).length >= Object.keys(answersToSet).length) {
                answersToSet = data.answers;
                if (data.timestamp) {
                  loadedTimestamp = data.timestamp;
                }
              }
            }
          }
        } catch (err) {
          console.warn("Could not read Firestore Zenkamoku history:", err);
        }
      }

      if (isMounted) {
        setSavedAnswers(answersToSet);
        if (loadedTimestamp) {
          setAttemptDate(new Date(loadedTimestamp));
        } else {
          setAttemptDate(new Date());
        }
      }
      setStateLoaded(true);
    };

    loadState();

    return () => {
      isMounted = false;
    };
  }, [currentUser, historyDocId, storageKey]);

  const handleAnswer = (qIdx, optText, isCorrect) => {
    const nowIso = new Date().toISOString();
    setAttemptDate(new Date(nowIso));

    setSavedAnswers(prev => {
      const next = { ...prev, [qIdx]: { text: optText, isCorrect } };
      
      // 1. Immediately cache in localStorage
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, JSON.stringify({
            answers: next,
            timestamp: nowIso
          }));
        } catch (e) {
          console.warn("Could not save to localStorage:", e);
        }
      }

      const totalCount = questions.length;
      const correctCount = Object.values(next).filter(a => a && a.isCorrect).length;
      const answeredCount = Object.keys(next).length;
      const isAllAttempted = answeredCount === totalCount && totalCount > 0;
      const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      
      const level = currentBookId.includes('n1') ? 'N1' : currentBookId.includes('n2') ? 'N2' : 'N3';
      const status = isAllAttempted ? (pct >= 80 && correctCount > 0 ? 'mastered' : 'completed') : 'incomplete';

      const record = {
        quizId: historyDocId,
        id: historyDocId,
        bookId: currentBookId,
        chapterId,
        title: `${chapter?.weekTitle || `第${currentWeek}週`} ${chapter?.dayTitle || `${currentDay}日目`}`,
        level,
        category: 'Dokkai & Grammar',
        type: 'book',
        timestamp: nowIso,
        score: correctCount,
        total: totalCount,
        answered: answeredCount,
        answers: next,
        status
      };

      // 2. Also sync to global localStorage quizHistory array so Profile Review Activity immediately displays it
      try {
        const localHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        const existingIdx = localHistory.findIndex(h => (h.quizId || h.id) === historyDocId);
        if (existingIdx >= 0) {
          localHistory[existingIdx] = { ...localHistory[existingIdx], ...record };
        } else {
          localHistory.unshift(record);
        }
        localStorage.setItem('quizHistory', JSON.stringify(localHistory));
      } catch (e) {
        console.warn("Could not update local quizHistory:", e);
      }

      // 3. Auto-sync to Firestore so answers and score are preserved in user's profile
      if (currentUser && historyDocId && totalCount > 0) {
        const historyRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
        setDoc(historyRef, record, { merge: true }).catch(err => console.warn("Background answer sync error:", err));
      }

      return next;
    });
  };

  const resetChapter = async () => {
    if (!window.confirm('Are you sure you want to reset your progress? This will clear your score and answers so you can retake every question from scratch.')) return;
    
    setSavedAnswers({});
    const nowIso = new Date().toISOString();
    setAttemptDate(new Date(nowIso));

    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.warn(e);
      }
    }

    try {
      const localHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      const filtered = localHistory.filter(h => (h.quizId || h.id) !== historyDocId);
      localStorage.setItem('quizHistory', JSON.stringify(filtered));
    } catch (e) {
      console.warn(e);
    }
    
    if (currentUser && historyDocId) {
      try {
        const historyRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
        await deleteDoc(historyRef);
      } catch (err) {
        console.error('Failed to reset history in db:', err);
      }
    }
  };

  // Extract week and day from chapterId (e.g. w01-d01)
  const currentWeekMatch = chapterId?.match(/w(\d+)/);
  const currentDayMatch = chapterId?.match(/d(\d+)/);
  const currentWeek = currentWeekMatch ? parseInt(currentWeekMatch[1], 10) : 1;
  const currentDay = currentDayMatch ? parseInt(currentDayMatch[1], 10) : 1;

  const handleWeekChange = (e) => {
    const newW = String(e.target.value).padStart(2, '0');
    const currentD = String(currentDay).padStart(2, '0');
    navigate(`/books/${currentBookId}/chapters/w${newW}-d${currentD}`);
  };

  const handleDayChange = (e) => {
    const currentW = String(currentWeek).padStart(2, '0');
    const newD = String(e.target.value).padStart(2, '0');
    navigate(`/books/${currentBookId}/chapters/w${currentW}-d${newD}`);
  };


  useEffect(() => {
    setLoading(true);
    setDataLoaded(false);
    setStateLoaded(false);
  }, [chapterId]);

  // Flattened questions array
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch from Firestore database
        let chapterData = null;
        try {
          const chapterRef = doc(db, 'books', currentBookId, 'chapters', chapterId);
          const chapterSnap = await getDoc(chapterRef);
          if (chapterSnap.exists()) {
            chapterData = chapterSnap.data();
          }
        } catch (dbErr) {
          console.warn('Firestore load error, checking local fallback:', dbErr);
        }

        // 2. Fallback to local bundle if Firestore has network failure
        if (!chapterData) {
          try {
            if (currentBookId.includes('n1')) {
              chapterData = (await import(`../data/zenkamoku_n1/${chapterId}.json`)).default;
            } else if (currentBookId.includes('n2')) {
              chapterData = (await import(`../data/zenkamoku_n2/${chapterId}.json`)).default;
            } else {
              chapterData = (await import(`../data/zenkamoku_n3/${chapterId}.json`)).default;
            }
          } catch(e) { console.error('Failed to load local JSON', e); }
        }

        if (chapterData) {
          setChapter(chapterData);

          // Flatten questions
          let flatQs = [];
          if (chapterData.sections) {
            chapterData.sections.forEach(sec => {
              if (sec.questions) flatQs.push(...sec.questions);
            });
          } else if (chapterData.questions) {
            flatQs = chapterData.questions;
          }
          setQuestions(flatQs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setDataLoaded(true);
      }
    };
    fetchData();
  }, [chapterId, currentBookId]);


  useEffect(() => {
    if (dataLoaded && stateLoaded) {
      setLoading(false);
    }
  }, [dataLoaded, stateLoaded]);

  const renderContent = () => {
    if (loading) return <div className="pt-32"><LoadingSpinner /></div>;
    if (!chapter) return <div className="text-center py-20 text-gray-500 dark:text-gray-400 font-bold text-xl">This chapter has not been extracted yet. Select a different Week/Day.</div>;

    const activeDate = attemptDate || new Date();
    const displayMonth = activeDate.getMonth() + 1;
    const displayDay = activeDate.getDate();

    return (
      <>
        {/* AUTHENTIC HEADER */}
        <div className="flex flex-col w-full mb-8">
          <div className="flex items-stretch w-full">
            <div className="bg-[#1f2937] text-white px-6 py-3 font-bold text-2xl md:text-3xl flex items-center justify-center border-r border-[#374151]">
              {chapter.weekTitle || "第" + currentWeek + "週"}
            </div>
            <div className="bg-[#e5e7eb] dark:bg-[#374151] text-black dark:text-white px-6 py-3 font-bold text-2xl md:text-3xl flex-1 flex items-center justify-between">
              <span>{chapter.dayTitle || currentDay + "日目"}</span>
              <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 text-lg md:text-xl font-medium select-none">
                <span className="text-2xl mr-1">📅</span>
                <span className="font-bold text-xl md:text-2xl text-blue-600 dark:text-blue-400 border-b-2 border-black dark:border-white min-w-[2.2rem] text-center inline-block pb-0.5">
                  {displayMonth}
                </span>
                <span className="text-base md:text-lg">月</span>
                <span className="font-bold text-xl md:text-2xl text-blue-600 dark:text-blue-400 border-b-2 border-black dark:border-white min-w-[2.2rem] text-center inline-block pb-0.5 ml-1">
                  {displayDay}
                </span>
                <span className="text-base md:text-lg">日</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="px-6 md:px-12 pb-12">
          {chapter.instruction && (
            <p className="text-lg mb-6 leading-relaxed font-medium">
              <span dangerouslySetInnerHTML={{ __html: chapter.instruction }} />
            </p>
          )}

          {chapter.listeningInstruction && (
            <p className="text-lg mb-8 leading-relaxed font-medium">
              <span dangerouslySetInnerHTML={{ __html: chapter.listeningInstruction }} />
            </p>
          )}

          {(chapter.sections || chapter.subSections) ? (
            (chapter.sections || chapter.subSections).map((sec, secIdx) => (
              <div key={secIdx} className="mb-12">
                {sec.title && (
                  <h3 className="text-xl font-bold mb-3 border-b-2 border-black dark:border-white pb-1 inline-block">
                    <span dangerouslySetInnerHTML={{ __html: sec.title }} /> {sec.titleEn ? <span className="font-normal text-sm ml-2 text-gray-600 dark:text-gray-400">{sec.titleEn}</span> : ''}
                  </h3>
                )}

                {sec.instruction && (
                  <p className="text-lg mb-6 leading-relaxed font-medium">
                    <span dangerouslySetInnerHTML={{ __html: sec.instruction }} />
                  </p>
                )}

                {sec.imageSrc && (
                  <div className="mb-6">
                    <img
                      src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${sec.imageSrc}`}
                      alt="Passage Illustration"
                      className="max-w-2xl w-full h-auto border rounded shadow-sm"
                    />
                  </div>
                )}

                {sec.passageIntro && (
                  <p className="mb-4 text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: sec.passageIntro }} />
                  </p>
                )}

                {sec.passage && (
                  <div className="mb-8 text-lg leading-relaxed">
                    {sec.passageTitle && (
                      <h4 className="text-center font-bold text-xl mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
                        <span dangerouslySetInnerHTML={{ __html: sec.passageTitle }} />
                      </h4>
                    )}
                    {sec.passage.trim().startsWith('<') ? (
                      <div className="font-serif leading-loose" dangerouslySetInnerHTML={{ __html: sec.passage }} />
                    ) : (
                      <div className="p-6 bg-amber-50/40 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 rounded-lg whitespace-pre-line font-serif leading-loose" dangerouslySetInnerHTML={{ __html: sec.passage }} />
                    )}
                    {sec.passageNote && (
                      <div className="mt-4 pt-3 border-t border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-400">
                        <span dangerouslySetInnerHTML={{ __html: sec.passageNote }} />
                      </div>
                    )}
                  </div>
                )}

                
                <div className="space-y-8">
                  {sec.questions?.map((q, qIdx) => (
                    <QuestionBlock
                      key={`${secIdx}-${qIdx}`}
                      q={q}
                      qIdx={`${secIdx}-${qIdx}`}
                      onAnswer={handleAnswer}
                      savedOption={savedAnswers[`${secIdx}-${qIdx}`]}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-12">
              {questions.map((q, qIdx) => (
                <QuestionBlock
                  key={`flat-${qIdx}`}
                  q={q}
                  qIdx={`flat-${qIdx}`}
                  onAnswer={handleAnswer}
                  savedOption={savedAnswers[`flat-${qIdx}`]}
                />
              ))}
            </div>
          )}

          {/* Live Score & Retake Card (Only shown if at least one question has been answered) */}
          {questions.length > 0 && Object.keys(savedAnswers).length > 0 && (
            <div className="mt-16 flex flex-col items-center justify-center border-t border-gray-300 dark:border-gray-700 pt-8 pb-12">
              <div className="text-center w-full max-w-md bg-white dark:bg-[#1e293b] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                {(() => {
                  const answeredCount = Object.keys(savedAnswers).length;
                  const calculatedScore = Object.values(savedAnswers).filter(a => a && a.isCorrect).length;
                  const finalScore = calculatedScore;
                  const totalCount = questions.length;
                  const pct = totalCount > 0 ? Math.round((finalScore / totalCount) * 100) : 0;
                  const isAllAttempted = answeredCount === totalCount && totalCount > 0;

                  let statusLabel = '⏳ Unfinished';
                  let statusBadgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700';

                  if (isAllAttempted) {
                    if (pct >= 80 && finalScore > 0) {
                      statusLabel = '🏆 Mastered';
                      statusBadgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-400';
                    } else {
                      statusLabel = '📝 Completed';
                      statusBadgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-400';
                    }
                  }

                  return (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center gap-2.5 flex-wrap">
                        <span className="text-base font-semibold text-gray-800 dark:text-gray-200">
                          Score: <strong className="text-lg font-bold text-gray-900 dark:text-white">{finalScore} / {totalCount}</strong> ({pct}%)
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusBadgeClass}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                  <button
                    onClick={resetChapter}
                    className="px-5 py-2 border-2 border-red-500 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer text-sm flex items-center gap-1.5"
                  >
                    <span>🔄</span>
                    <span>Reset Score &amp; Retake</span>
                  </button>
                  {(() => {
                    const nextChap = currentDay < 5
                      ? `w${String(currentWeek).padStart(2, '0')}-d${String(currentDay + 1).padStart(2, '0')}`
                      : currentWeek < 12
                      ? `w${String(currentWeek + 1).padStart(2, '0')}-d01`
                      : null;

                    return nextChap ? (
                      <button
                        onClick={() => navigate(`/books/${currentBookId}/chapters/${nextChap}`)}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer text-sm flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Next Day &rarr;</span>
                      </button>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#0f172a] text-black dark:text-white pt-24 pb-20 px-4 md:px-8 font-serif">
      <div className="w-full bg-white dark:bg-[#1e293b] shadow-xl min-h-[80vh] relative">
        <div className="absolute -top-12 left-0 w-full flex justify-between items-end">
          <button
            onClick={() => navigate('/books')}
            className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors pb-1 cursor-pointer"
          >
            ← Exit Book
          </button>
          <div className="flex gap-2 pb-1">
            <select
              value={currentWeek}
              onChange={handleWeekChange}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-black dark:text-white shadow-sm cursor-pointer outline-none hover:border-gray-400 focus:border-black transition-colors"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  第{i + 1}週
                </option>
              ))}
            </select>
            <select
              value={currentDay}
              onChange={handleDayChange}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-black dark:text-white shadow-sm cursor-pointer outline-none hover:border-gray-400 focus:border-black transition-colors"
            >
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}日目
                </option>
              ))}
            </select>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

function SentenceCompositionStem({ q, placedMap }) {
  const stem = q.stem || q.questionText || '';
  const hasPlaced = placedMap && Object.keys(placedMap).length > 0;

  // Till user selects options, UI remains identical to previous authentic UI
  if (!hasPlaced || !q.correctOrder) {
    return <span className="leading-loose" dangerouslySetInnerHTML={{ __html: stem }} />;
  }

  const match = stem.match(/^(.*?)(?:(?:＿＿＿|＿＿|<u>\s*★\s*<\/u>|★|\s)+)([^＿★]*)$/);
  if (!match) {
    return <span className="leading-loose" dangerouslySetInnerHTML={{ __html: stem }} />;
  }

  const prefix = match[1].trim();
  const suffix = match[2].trim();

  return (
    <span className="leading-loose text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
      {prefix && <span dangerouslySetInnerHTML={{ __html: prefix }} />}{' '}
      {[1, 2, 3, 4].map((slotNum) => {
        const isStar = slotNum === q.starPosition;
        const placedText = placedMap[slotNum];

        if (placedText) {
          if (isStar) {
            return (
              <span
                key={slotNum}
                className="inline-block px-1.5 py-0.5 mx-1 font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 rounded border-b-2 border-amber-500 animate-fade-in"
              >
                ★ <span dangerouslySetInnerHTML={{ __html: placedText }} />
              </span>
            );
          }
          return (
            <span
              key={slotNum}
              className="inline-block px-1.5 py-0.5 mx-1 font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/30 rounded border-b-2 border-indigo-500 animate-fade-in"
            >
              <span dangerouslySetInnerHTML={{ __html: placedText }} />
            </span>
          );
        }

        if (isStar) {
          return (
            <span key={slotNum} className="mx-1 text-amber-500 font-bold">
              <u>　★　</u>
            </span>
          );
        }

        return (
          <span key={slotNum} className="mx-1 text-gray-400 dark:text-gray-500 select-none">
            ＿＿＿
          </span>
        );
      })}{' '}
      {suffix && <span dangerouslySetInnerHTML={{ __html: suffix }} />}
    </span>
  );
}

function QuestionBlock({ q, qIdx, onAnswer, savedOption }) {
  const [showScript, setShowScript] = useState(false);
  const selectedOption = savedOption
    ? (typeof savedOption === 'object' && savedOption !== null ? savedOption.text : savedOption)
    : null;
  const correctOptionText = q.correctOption
    ? typeof q.correctOption === 'object'
      ? q.correctOption.text
      : q.correctOption
    : null;

  const [placedMap, setPlacedMap] = useState(() => {
    if (selectedOption && q.correctOrder) {
      const initialMap = {};
      q.correctOrder.forEach((optNum, slotIdx) => {
        const opt = q.options[optNum - 1];
        const optText = typeof opt === 'object' ? opt.text : opt;
        initialMap[slotIdx + 1] = optText.replace(/^\d+\.\s*/, '');
      });
      return initialMap;
    }
    return {};
  });

  useEffect(() => {
    if (selectedOption && q.correctOrder) {
      const fullMap = {};
      q.correctOrder.forEach((optNum, slotIdx) => {
        const opt = q.options[optNum - 1];
        const optText = typeof opt === 'object' ? opt.text : opt;
        fullMap[slotIdx + 1] = optText.replace(/^\d+\.\s*/, '');
      });
      setPlacedMap(fullMap);
    } else if (!selectedOption) {
      setPlacedMap({});
    }
  }, [selectedOption, q]);

  const handleOptionSelect = (opt, optIdx) => {
    const optText = typeof opt === 'object' ? opt.text : opt;
    const isThisCorrect = optText === correctOptionText;
    const optNum = optIdx + 1;

    if (q.correctOrder) {
      const cleanText = optText.replace(/^\d+\.\s*/, '');
      const slotNum = q.correctOrder.indexOf(optNum) + 1;

      if (isThisCorrect) {
        const fullMap = {};
        q.correctOrder.forEach((n, idx) => {
          const o = q.options[n - 1];
          const t = typeof o === 'object' ? o.text : o;
          fullMap[idx + 1] = t.replace(/^\d+\.\s*/, '');
        });
        setPlacedMap(fullMap);
      } else {
        setPlacedMap(prev => ({
          ...prev,
          [slotNum]: cleanText
        }));
      }
    }

    if (onAnswer) {
      onAnswer(qIdx, optText, isThisCorrect);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-lg md:text-xl border-b border-gray-200 dark:border-gray-800 pb-10 last:border-0">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div className="border border-black dark:border-white w-8 h-8 flex items-center justify-center font-bold text-lg">
            {q.number || ''}
          </div>
        </div>
        <div className="flex-1">
          {q.trackId && (
            <div className="inline-flex items-center gap-1 font-bold mr-4">
              <span>🎵</span> {q.trackId}
            </div>
          )}
          {q.correctOrder ? (
            <SentenceCompositionStem q={q} placedMap={placedMap} />
          ) : (
            (q.stem || q.questionText) && (
              <span
                className="leading-loose"
                dangerouslySetInnerHTML={{ __html: q.stem || q.questionText }}
              />
            )
          )}
          {q.audioSrc && (
            <div className="mt-3 mb-2 flex items-center gap-4 flex-wrap">
              <audio
                controls
                controlsList="nodownload"
                className="h-10 w-full max-w-sm"
              >
                <source
                  src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${q.audioSrc}`}
                  type="audio/mpeg"
                />
              </audio>
              <button
                onClick={() => setShowScript(!showScript)}
                className="px-3 py-1.5 text-sm font-bold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors cursor-pointer"
              >
                {showScript ? 'Hide Script' : '📄 Show Script'}
              </button>
            </div>
          )}
          {showScript && (
            <div className="mt-2 mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded text-base leading-relaxed">
              {q.script || q.transcript ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: q.script || q.transcript,
                  }}
                />
              ) : (
                <span className="text-gray-500 italic">
                  Script not yet available in database.
                </span>
              )}
            </div>
          )}
          {q.imageSrc && (
            <div className="mt-4 inline-block">
              <img
                src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${q.imageSrc}`}
                alt="Illustration"
                className="max-w-md h-auto"
              />
            </div>
          )}
        </div>
      </div>

      {q.options && q.options.length > 0 && (() => {
        const hasLongOptions = q.options.some(opt => {
          const text = typeof opt === 'object' ? opt.text : opt;
          return String(text || '').length > 25;
        });
        const gridClass = hasLongOptions ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4';
        return (
        <div className="ml-0 sm:ml-12 flex flex-col gap-2 mt-3 w-full">
          <div className={`grid ${gridClass} gap-3 md:gap-4 w-full`}>
            {q.options.map((opt, optIdx) => {
              const optText = typeof opt === 'object' ? opt.text : opt;
              const isThisCorrect = optText === correctOptionText;
              const isSelected = optText === selectedOption;

              let btnClass =
                'w-full px-4 py-3 border-2 rounded-xl cursor-pointer transition-all text-left text-base flex items-center justify-start ';
              if (selectedOption === null) {
                btnClass +=
                  'border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm';
              } else {
                if (isThisCorrect) {
                  btnClass +=
                    'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500 shadow-sm font-semibold';
                } else if (isSelected && !isThisCorrect) {
                  btnClass +=
                    'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-500 shadow-sm font-semibold';
                } else {
                  btnClass +=
                    'border-gray-200 opacity-50 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionSelect(opt, optIdx)}
                  disabled={selectedOption !== null}
                  className={btnClass}
                >
                  <span
                    className="w-full text-left leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: optText }}
                  />
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div
              className={`mt-5 p-4.5 md:p-5 rounded-2xl text-base border-2 shadow-sm transition-all animate-fade-in ${
                selectedOption === correctOptionText
                  ? 'bg-emerald-50/90 border-emerald-500/40 dark:bg-emerald-950/30 dark:border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
                  : 'bg-rose-50/90 border-rose-500/40 dark:bg-rose-950/30 dark:border-rose-500/40 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center gap-2 font-black mb-2.5 text-xs uppercase tracking-wider">
                <span className="text-base">{selectedOption === correctOptionText ? '✅' : '❌'}</span>
                <span className={selectedOption === correctOptionText ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}>
                  {selectedOption === correctOptionText ? '正解 • Correct Answer Explanation' : '解説 • Incorrect Answer Explanation'}
                </span>
              </div>
              <div className="text-gray-900 dark:text-gray-100 leading-relaxed font-medium text-sm md:text-base">
                {q.explanation || q.kaisetsu ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: q.explanation || q.kaisetsu,
                    }}
                  />
                ) : (
                  <span className="italic text-gray-500 text-sm">
                    No detailed explanation available for this question.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )})()}
    </div>
  );
}
