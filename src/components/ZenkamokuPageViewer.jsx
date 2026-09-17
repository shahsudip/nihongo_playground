import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  // Persistent answers state
  const [savedAnswers, setSavedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Derive current bookId
  const currentBookId = window.location.pathname.includes('zenkamoku-n2')
    ? 'zenkamoku-n2-best-workbook'
    : 'zenkamoku-n3-best-workbook';
  const historyDocId = currentUser ? `${currentBookId}-${chapterId}` : null;
  const storageKey = currentUser ? `zenkamoku-progress-${currentUser.uid}-${historyDocId}` : null;

  // Load progress on mount/chapter change
  useEffect(() => {
    if (storageKey) {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setSavedAnswers(JSON.parse(cached));
      } else {
        setSavedAnswers({});
      }
    }
  }, [storageKey]);

  // Check if it was already submitted in Firestore
  useEffect(() => {
    if (currentUser && historyDocId) {
      const checkHistory = async () => {
        const ref = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
        const snap = await getDoc(ref);
        setIsSubmitted(snap.exists());
      };
      checkHistory();
    }
  }, [currentUser, historyDocId]);

  const handleAnswer = (qIdx, optText, isCorrect) => {
    setSavedAnswers(prev => {
      const next = { ...prev, [qIdx]: { text: optText, isCorrect } };
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const submitChapter = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      const historyRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
      const correctCount = Object.values(savedAnswers).filter(a => a.isCorrect).length;
      
      const record = {
        quizId: historyDocId,
        bookId: currentBookId,
        chapterId,
        title: (chapter.weekTitle || '') + ' ' + (chapter.dayTitle || ''),
        type: 'book',
        timestamp: new Date().toISOString(),
        score: correctCount,
        total: questions.length,
        answered: Object.keys(savedAnswers).length,
        status: 'completed'
      };

      await setDoc(historyRef, record, { merge: true });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to save score:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const resetChapter = async () => {
    if (!window.confirm('Are you sure you want to reset your progress? This will delete your score from your profile and clear all answers on this page.')) return;
    
    setSavedAnswers({});
    setIsSubmitted(false);
    if (storageKey) localStorage.removeItem(storageKey);
    
    if (currentUser && historyDocId) {
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId));
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

  // Flattened questions array
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let chapterData = null;

        // Fallback to local import first for speed/safety
        try {
          const { sampleBooks } = await import('../data/book_data.jsx');
          const localBook = sampleBooks.find(b => b.id === currentBookId);
          if (localBook) {
            const localChap = localBook.chapters?.find(c => c.id === chapterId);
            if (localChap) chapterData = localChap;
          }
        } catch (e) {
          console.warn("Local load failed", e);
        }

        // Firestore fetch if not in local memory
        if (!chapterData) {
          const docRef = doc(db, 'books', currentBookId, 'chapters', chapterId);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            chapterData = snap.data();
          }
        }

        if (chapterData) {
          setIsSubmitted(false);
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
        setLoading(false);
      }
    };
    fetchData();
  }, [chapterId, currentBookId]);

  const renderContent = () => {
    if (loading) return <div className="pt-32"><LoadingSpinner /></div>;
    if (!chapter) return <div className="text-center py-20 text-gray-500 dark:text-gray-400 font-bold text-xl">This chapter has not been extracted yet. Select a different Week/Day.</div>;

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
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <span className="text-2xl mr-2">📅</span>
                <span className="border-b-2 border-black dark:border-white w-10 inline-block mx-1"></span>
                <span className="text-lg">月</span>
                <span className="border-b-2 border-black dark:border-white w-10 inline-block mx-1"></span>
                <span className="text-lg">日</span>
              </div>
            </div>
          </div>
          
          {chapter.sectionTitle && (
            <div className="px-6 mt-4">
              <div className="inline-block border-2 border-black dark:border-white px-4 py-1 font-bold text-lg md:text-xl rounded-sm">
                {chapter.sectionTitle} {chapter.sectionTitleEn ? <span className="font-normal ml-2 text-base">{chapter.sectionTitleEn}</span> : ''}
              </div>
            </div>
          )}
        </div>

        {/* CONTENT AREA */}
        <div className="px-6 md:px-12 pb-12">
          {chapter.instruction && (
            <p className="text-lg mb-6 leading-relaxed font-medium">
              {chapter.instruction}
            </p>
          )}

          {chapter.listeningInstruction && (
            <p className="text-lg mb-8 leading-relaxed font-medium">
              {chapter.listeningInstruction}
            </p>
          )}

          {chapter.sections ? (
            chapter.sections.map((sec, secIdx) => (
              <div key={secIdx} className="mb-12">
                {sec.title && (
                  <h3 className="text-xl font-bold mb-3 border-b-2 border-black dark:border-white pb-1 inline-block">
                    {sec.title} {sec.titleEn ? <span className="font-normal text-sm ml-2 text-gray-600 dark:text-gray-400">{sec.titleEn}</span> : ''}
                  </h3>
                )}

                {sec.instruction && (
                  <p className="text-lg mb-6 leading-relaxed font-medium">
                    {sec.instruction}
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

                {sec.passage && (
                  <div className="mb-8 p-6 bg-amber-50/40 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 rounded-lg text-lg leading-relaxed">
                    {sec.passageTitle && (
                      <h4 className="text-center font-bold text-xl mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
                        {sec.passageTitle}
                      </h4>
                    )}
                    <div className="whitespace-pre-line font-serif leading-loose">
                      {sec.passage}
                    </div>
                    {sec.passageNote && (
                      <div className="mt-4 pt-3 border-t border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-400">
                        {sec.passageNote}
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
                      savedOption={savedAnswers[`${secIdx}-${qIdx}`]?.text}
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
                  savedOption={savedAnswers[`flat-${qIdx}`]?.text}
                />
              ))}
            </div>
          )}

          {/* Submit/Reset Button */}
          {questions.length > 0 && (
            <div className="mt-16 flex flex-col items-center justify-center border-t border-gray-300 dark:border-gray-700 pt-8 pb-12">
              {!isSubmitted ? (
                <button
                  onClick={submitChapter}
                  disabled={isSaving}
                  className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-lg rounded shadow hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Finish Chapter & Save Score'}
                </button>
              ) : (
                <div className="text-center w-full max-w-sm">
                  <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Chapter Completed!</h3>
                  <p className="text-xl font-medium mb-6">Score: {Object.values(savedAnswers).filter(a => a.isCorrect).length} / {questions.length} Points</p>
                  <button
                    onClick={resetChapter}
                    className="w-full px-6 py-2 border-2 border-red-500 text-red-600 dark:text-red-400 font-bold rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Reset Score & Progress
                  </button>
                </div>
              )}
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
            onClick={() => navigate(`/books/${currentBookId}`)}
            className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors pb-1"
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

function QuestionBlock({ q, qIdx, onAnswer, savedOption }) {
  const [showScript, setShowScript] = useState(false);
  const selectedOption = savedOption || null;
  const correctOptionText = q.correctOption
    ? typeof q.correctOption === 'object'
      ? q.correctOption.text
      : q.correctOption
    : null;

  return (
    <div className="flex flex-col gap-4 text-lg md:text-xl border-b border-gray-200 dark:border-gray-800 pb-10 last:border-0">
      <div className="flex items-start gap-4">
        <div className="shrink-0 border border-black dark:border-white w-8 h-8 flex items-center justify-center font-bold text-lg">
          {q.number || ''}
        </div>
        <div className="flex-1">
          {q.trackId && (
            <div className="inline-flex items-center gap-1 font-bold mr-4">
              <span>🎵</span> {q.trackId}
            </div>
          )}
          {(q.stem || q.questionText) && (
            <span
              className="leading-loose"
              dangerouslySetInnerHTML={{ __html: q.stem || q.questionText }}
            />
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
                className="px-3 py-1.5 text-sm font-bold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
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

      {q.options && q.options.length > 0 && (
        <div className="ml-12 flex flex-col gap-2 mt-2">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {q.options.map((opt, optIdx) => {
              const optText = typeof opt === 'object' ? opt.text : opt;
              let btnClass =
                'px-4 py-2 border rounded cursor-pointer transition-colors whitespace-nowrap text-left ';
              if (selectedOption === null) {
                btnClass +=
                  'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 bg-white dark:bg-gray-800';
              } else {
                const isThisCorrect = optText === correctOptionText;
                if (isThisCorrect) {
                  btnClass +=
                    'bg-emerald-100 border-emerald-500 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-400 dark:border-emerald-500 shadow-sm font-bold';
                } else if (optText === selectedOption && !isThisCorrect) {
                  btnClass +=
                    'bg-red-100 border-red-500 text-red-900 dark:bg-red-900/50 dark:text-red-400 dark:border-red-500 shadow-sm';
                } else {
                  btnClass +=
                    'border-gray-200 opacity-50 dark:border-gray-700 bg-white dark:bg-gray-800';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => {
                    if (onAnswer) {
                      const isCorrect = optText === correctOptionText;
                      onAnswer(qIdx, optText, isCorrect);
                    }
                  }}
                  disabled={selectedOption !== null}
                  className={btnClass}
                >
                  <span dangerouslySetInnerHTML={{ __html: optText }} />
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div
              className={`mt-4 p-4 rounded text-base border shadow-sm ${
                selectedOption === correctOptionText
                  ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800'
                  : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
              }`}
            >
              <div className="font-bold mb-2 text-lg">
                {selectedOption === correctOptionText ? '✅ Correct' : '❌ Incorrect'}
              </div>
              <div className="text-gray-800 dark:text-gray-200">
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
      )}
    </div>
  );
}
