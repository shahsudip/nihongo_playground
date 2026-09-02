import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './header_component.jsx';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import defaultWeek1Day1 from '../data/somatome_week1_day1.json';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

// Eagerly load all local Somatome JSON files in data/somatome/
const localChapterModules = import.meta.glob('../data/somatome/*.json', { eager: true });

export const SOU_MATOME_N3_CHAPTERS = [
  // Week 1
  { id: 'week1-day1', title: 'Week 1 - Day 1: 案内① (Notices 1)' },
  { id: 'week1-day2', title: 'Week 1 - Day 2: 案内② (Notices 2)' },
  { id: 'week1-day3', title: 'Week 1 - Day 3: 案内③ (Notices 3)' },
  { id: 'week1-day4', title: 'Week 1 - Day 4: 案内④ (Notices 4)' },
  { id: 'week1-day5', title: 'Week 1 - Day 5: 案内⑤ (Letters/Mails)' },
  { id: 'week1-day6', title: 'Week 1 - Day 6: 案内⑥ (Tables/Charts)' },
  { id: 'week1-day7', title: 'Week 1 - Day 7: 実戦問題 (Review 1)' },
  // Week 2
  { id: 'week2-day1', title: 'Week 2 - Day 1: 掲示① (Signs 1)' },
  { id: 'week2-day2', title: 'Week 2 - Day 2: 掲示② (Signs 2)' },
  { id: 'week2-day3', title: 'Week 2 - Day 3: 広告① (Advertisements 1)' },
  { id: 'week2-day4', title: 'Week 2 - Day 4: 広告② (Advertisements 2)' },
  { id: 'week2-day5', title: 'Week 2 - Day 5: 説明書 (Instructions)' },
  { id: 'week2-day6', title: 'Week 2 - Day 6: グラフ・表 (Charts)' },
  { id: 'week2-day7', title: 'Week 2 - Day 7: 実戦問題 (Review 2)' },
  // Week 3
  { id: 'week3-day1', title: 'Week 3 - Day 1: メール① (Emails 1)' },
  { id: 'week3-day2', title: 'Week 3 - Day 2: メール② (Emails 2)' },
  { id: 'week3-day3', title: 'Week 3 - Day 3: 手紙・はがき① (Letters 1)' },
  { id: 'week3-day4', title: 'Week 3 - Day 4: 手紙・はがき② (Letters 2)' },
  { id: 'week3-day5', title: 'Week 3 - Day 5: 手紙・はがき③ (Letters 3)' },
  { id: 'week3-day6', title: 'Week 3 - Day 6: FAX・ビジネス (Business Letters)' },
  { id: 'week3-day7', title: 'Week 3 - Day 7: 実戦問題 (Review 3)' },
  // Week 4
  { id: 'week4-day1', title: 'Week 4 - Day 1: 短文① (Short Passages 1)' },
  { id: 'week4-day2', title: 'Week 4 - Day 2: 短文② (Short Passages 2)' },
  { id: 'week4-day3', title: 'Week 4 - Day 3: 短文③ (Short Passages 3)' },
  { id: 'week4-day4', title: 'Week 4 - Day 4: 短文④ (Short Passages 4)' },
  { id: 'week4-day5', title: 'Week 4 - Day 5: 短文⑤ (Short Passages 5)' },
  { id: 'week4-day6', title: 'Week 4 - Day 6: 短文⑥ (Short Passages 6)' },
  { id: 'week4-day7', title: 'Week 4 - Day 7: 実戦問題 (Review 4)' },
  // Week 5
  { id: 'week5-day1', title: 'Week 5 - Day 1: 中文① (Medium Passages 1)' },
  { id: 'week5-day2', title: 'Week 5 - Day 2: 中文② (Medium Passages 2)' },
  { id: 'week5-day3', title: 'Week 5 - Day 3: 中文③ (Medium Passages 3)' },
  { id: 'week5-day4', title: 'Week 5 - Day 4: 中文④ (Medium Passages 4)' },
  { id: 'week5-day5', title: 'Week 5 - Day 5: 中文⑤ (Medium Passages 5)' },
  { id: 'week5-day6', title: 'Week 5 - Day 6: 中文⑥ (Medium Passages 6)' },
  { id: 'week5-day7', title: 'Week 5 - Day 7: 実戦問題 (Review 5)' },
  // Week 6
  { id: 'week6-day1', title: 'Week 6 - Day 1: 長文・情報検索① (Long Passages 1)' },
  { id: 'week6-day2', title: 'Week 6 - Day 2: 長文・情報検索② (Long Passages 2)' },
  { id: 'week6-day3', title: 'Week 6 - Day 3: 長文・情報検索③ (Long Passages 3)' },
  { id: 'week6-day4', title: 'Week 6 - Day 4: 長文・情報検索④ (Long Passages 4)' },
  { id: 'week6-day5', title: 'Week 6 - Day 5: 長文・情報検索⑤ (Long Passages 5)' },
  { id: 'week6-day6', title: 'Week 6 - Day 6: 長文・情報検索⑥ (Long Passages 6)' },
  { id: 'week6-day7', title: 'Week 6 - Day 7: 模擬試験 (Final Mock Exam)' },
];

const SomatomeN3Book = () => {
  const { chapterId = 'week1-day1' } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  // Renshuu state
  const [renshuuClicked, setRenshuuClicked] = useState([]);
  const [renshuuRevealed, setRenshuuRevealed] = useState(false);

  // Mondai state
  const [mondaiAnswers, setMondaiAnswers] = useState({});
  const [mondaiRevealed, setMondaiRevealed] = useState({});

  const [startX, setStartX] = useState(null);

  const allChapters = SOU_MATOME_N3_CHAPTERS;
  const currentChapterIndex = allChapters.findIndex(c => c.id === chapterId);
  const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : null;

  // Reset interactive states and load chapter data when chapterId changes
  useEffect(() => {
    setCurrentPage(0);
    setRenshuuClicked([]);
    setRenshuuRevealed(false);
    setMondaiAnswers({});
    setMondaiRevealed({});
    setLoading(true);
    setError(null);

    const loadChapter = async () => {
      try {
        // 1. Check local glob imports first
        const matchedKey = Object.keys(localChapterModules).find(k => k.endsWith(`/${chapterId}.json`));
        if (matchedKey && localChapterModules[matchedKey]) {
          const mod = localChapterModules[matchedKey];
          setData(mod.default || mod);
          setLoading(false);
          return;
        }

        // 2. Check fallback to defaultWeek1Day1
        if (chapterId === 'week1-day1' && defaultWeek1Day1) {
          setData(defaultWeek1Day1);
          setLoading(false);
          return;
        }

        // 3. Try fetching from Firestore
        try {
          const chapterDocRef = doc(db, 'books', 'sou-matome-n3-reading', 'chapters', chapterId);
          const snap = await getDoc(chapterDocRef);
          if (snap.exists()) {
            setData(snap.data());
            setLoading(false);
            return;
          }
        } catch (fsErr) {
          console.warn("Firestore chapter fetch failed, falling back:", fsErr);
        }

        // 4. Fallback: not ready
        setData(null);
        setError(`Chapter content for "${chapterId}" is currently in preparation.`);
      } catch (err) {
        console.error("Error loading chapter:", err);
        setError(err.message || "Failed to load chapter content.");
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [chapterId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setCurrentPage(p => Math.min(totalPages - 1, p + 1));
      if (e.key === 'ArrowLeft') setCurrentPage(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  // Renshuu logic
  const handleRenshuuClick = (idx) => {
    if (renshuuRevealed || !data?.practice?.correct_answers) return;
    
    const isCorrect = data.practice.correct_answers.includes(idx);
    
    if (!isCorrect) {
      // Clicked wrong: instantly reveal all
      setRenshuuClicked(prev => [...prev, idx]);
      setRenshuuRevealed(true);
    } else {
      // Clicked correct
      const newClicked = [...renshuuClicked, idx];
      setRenshuuClicked(newClicked);
      
      // If found all correct answers, reveal
      const correctFound = newClicked.filter(c => data.practice.correct_answers.includes(c));
      if (correctFound.length === data.practice.correct_answers.length) {
        setRenshuuRevealed(true);
      }
    }
  };

  // Mondai logic
  const handleMondaiClick = (qId, optionIndex) => {
    if (mondaiRevealed[qId]) return;
    
    setMondaiAnswers(prev => ({ ...prev, [qId]: optionIndex + 1 }));
    setMondaiRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const handleDragStart = (e) => {
    setStartX(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  };

  const handleDragEnd = (e) => {
    if (startX === null) return;
    const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;
    
    if (diff > 50 && currentPage < totalPages - 1) {
      setCurrentPage(p => p + 1);
    } else if (diff < -50 && currentPage > 0) {
      setCurrentPage(p => p - 1);
    }
    setStartX(null);
  };

  const navigateToChapter = (id) => {
    if (id) {
      navigate(`/books/sou-matome-n3-reading/chapters/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-8 pt-4 flex flex-col items-center">
        <div className="w-full max-w-[850px] px-4 mb-4 z-10">
          <Header 
            title="Somatome PDF Viewer" 
            onBack={() => navigate('/books/sou-matome-n3-reading')} 
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-[850px] min-h-[400px]">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading chapter content...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-8 pt-4 flex flex-col items-center">
        <div className="w-full max-w-[850px] px-4 mb-4 z-10">
          <Header 
            title="Somatome PDF Viewer" 
            onBack={() => navigate('/books/sou-matome-n3-reading')} 
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-[850px] min-h-[400px] text-center border border-gray-200 dark:border-gray-700">
          <div className="text-5xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Chapter In Preparation</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
            {error || `Content for chapter "${chapterId}" is being prepared. Check back soon or try Week 1 Day 1.`}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              onClick={() => navigateToChapter('week1-day1')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition"
            >
              Go to Week 1 Day 1
            </button>
            <button 
              onClick={() => navigate('/books/sou-matome-n3-reading')}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg shadow transition"
            >
              Back to Book Index
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 pb-6 pt-4 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-[850px] px-4 mb-3 z-10">
        <Header 
          title={`Somatome PDF Viewer - ${data.title || 'JLPT N3 Reading'}`} 
          onBack={() => navigate('/books/sou-matome-n3-reading')} 
        />
        
        {/* Navigation & Chapter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-900 text-white px-4 py-2.5 mt-2 rounded-xl shadow-md text-sm font-medium border border-gray-700">
          
          {/* Chapter Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="chapter-select" className="text-gray-300 text-xs uppercase font-bold tracking-wider hidden sm:inline">
              Chapter:
            </label>
            <select
              id="chapter-select"
              value={chapterId}
              onChange={(e) => navigateToChapter(e.target.value)}
              className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold py-1.5 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {allChapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.title}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Prev / Next Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => prevChapter && navigateToChapter(prevChapter.id)}
              disabled={!prevChapter}
              title={prevChapter ? `Go to ${prevChapter.title}` : 'No previous chapter'}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                prevChapter 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' 
                  : 'bg-gray-800/40 text-gray-500 border border-gray-800 cursor-not-allowed'
              }`}
            >
              <span>&larr;</span>
              <span className="hidden sm:inline">Prev Day</span>
            </button>

            <button 
              onClick={() => nextChapter && navigateToChapter(nextChapter.id)}
              disabled={!nextChapter}
              title={nextChapter ? `Go to ${nextChapter.title}` : 'No next chapter'}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                nextChapter 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                  : 'bg-gray-800/40 text-gray-500 border border-gray-800 cursor-not-allowed'
              }`}
            >
              <span className="hidden sm:inline">Next Day</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* PDF Page Viewer Toolbar */}
        <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 mt-2 rounded-xl shadow text-sm font-bold border border-gray-700">
          <button 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} 
            disabled={currentPage === 0}
            className={`px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition ${currentPage === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            &larr; Page 1 (れんしゅう)
          </button>
          
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded cursor-pointer ${currentPage === 0 ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`} onClick={() => setCurrentPage(0)}>
              P.1 れんしゅう
            </span>
            <span className="text-gray-500">|</span>
            <span className={`px-2 py-0.5 rounded cursor-pointer ${currentPage === 1 ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`} onClick={() => setCurrentPage(1)}>
              P.2 もんだい
            </span>
          </div>

          <button 
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))} 
            disabled={currentPage === totalPages - 1}
            className={`px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition ${currentPage === totalPages - 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Page 2 (もんだい) &rarr;
          </button>
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
        
        {/* Slider Track */}
        <div 
          className="flex w-full h-full transition-transform duration-300 ease-in-out" 
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          
          {/* ================= PAGE 1: LESSON & RENSHUU ================= */}
          <div className="w-full h-full flex-shrink-0 p-4 md:p-8 overflow-y-auto pb-8">
            {/* Header Section */}
            <div className="bg-black text-white rounded-t-xl p-4 flex justify-between items-end mb-5">
              <div className="flex flex-col">
                <span className="text-xl font-bold">第{data.week}週</span>
                <span className="text-3xl font-black">{data.day}日目</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">{data.theme}</div>
                <div className="text-2xl font-black mt-1">{data.title}</div>
              </div>
            </div>

            {/* Learning Focus */}
            {data.learning_focus && (
              <div className="mb-5">
                <h2 className="text-xl font-bold text-black mb-2 border-b-2 border-black pb-2 inline-block">
                  ✿ {data.learning_focus.title}
                </h2>
                {data.learning_focus.subtitle && (
                  <p className="text-sm text-gray-700 mb-4 font-bold">{data.learning_focus.subtitle}</p>
                )}
                
                {data.learning_focus.comic && (
                  <div className="flex flex-col md:flex-row items-center gap-4 border-2 border-gray-200 p-4 rounded-lg bg-gray-50">
                    <div className="flex-1 space-y-2 relative">
                        {data.learning_focus.comic.text1 && (
                          <div className="bg-white text-black p-3 rounded-2xl rounded-tl-none border border-gray-400 font-bold shadow-sm">
                            {data.learning_focus.comic.text1}
                          </div>
                        )}
                        {data.learning_focus.comic.text2 && (
                          <div className="bg-white text-black p-3 rounded-2xl rounded-tr-none border border-gray-400 ml-8 font-bold shadow-sm">
                            {data.learning_focus.comic.text2}
                          </div>
                        )}
                        {data.learning_focus.comic.sign && (
                          <div className="text-center mt-2 font-black text-black border-2 border-black p-1 bg-white inline-block shadow">
                            {data.learning_focus.comic.sign}
                          </div>
                        )}
                    </div>
                    {data.learning_focus.comic.note && (
                      <div className="flex-1 font-bold text-lg text-black">
                          ★ {data.learning_focus.comic.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Vocabulary Table */}
            {data.vocabulary && data.vocabulary.length > 0 && (
              <div className="border-2 border-black mb-5">
                <div className="bg-gray-200 border-b-2 border-black py-2 px-4 font-bold text-black">
                  よく使われる表現
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {data.vocabulary.map((v, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-300 py-2">
                      <div className="flex flex-col">
                        {v.reading && <span className="text-xs text-gray-600 font-bold">{v.reading}</span>}
                        <span className="font-bold text-black">{v.word}</span>
                      </div>
                      <span className="text-black text-sm self-end">{v.meaning}</span>
                    </div>
                  ))}
                </div>
                {data.grammar_notes && data.grammar_notes.length > 0 && (
                  <div className="bg-gray-100 p-3 text-sm text-black border-t-2 border-black font-bold space-y-1">
                    {data.grammar_notes.map((note, i) => <div key={i}>{note}</div>)}
                  </div>
                )}
              </div>
            )}

            {/* Practice / Renshuu */}
            {data.practice && (
              <div className="border-b-2 border-dashed border-gray-400 pb-4">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-black text-white px-4 py-1 rounded-full font-bold">れんしゅう</span>
                    <span className="font-bold text-black">{data.practice.instruction}</span>
                </div>
                
                {data.practice.conversation && data.practice.conversation.length > 0 && (
                  <div className="bg-gray-100 p-4 rounded-sm border border-gray-300 mb-4 font-medium leading-relaxed">
                    {data.practice.conversation.map((line, i) => (
                      <div key={i} className="mb-2">
                        <span className="font-bold mr-2 text-black">{line.speaker}:</span>
                        <span className="text-black">{line.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {data.practice.options && (
                  <div className="space-y-2">
                    {data.practice.options.map((opt, i) => {
                      const optNumber = i + 1;
                      const isCorrectAnswer = (data.practice.correct_answers || []).includes(optNumber);
                      
                      const isChecked = renshuuClicked.includes(optNumber) || (renshuuRevealed && isCorrectAnswer);
                      
                      let boxStyle = "border-gray-400";
                      let textStyle = "text-black group-hover:font-bold";
                      let explainBlock = null;

                      if (renshuuRevealed || renshuuClicked.includes(optNumber)) {
                        if (isCorrectAnswer && isChecked) {
                          boxStyle = "border-green-600 bg-green-50";
                          textStyle = "text-green-700 font-bold";
                          if (renshuuRevealed && data.practice.options_explanation?.[optNumber]) {
                            explainBlock = (
                              <div className="ml-8 mt-1 text-sm text-green-700 bg-green-100 p-2 rounded">
                                {data.practice.options_explanation[optNumber]}
                              </div>
                            );
                          }
                        } else if (!isCorrectAnswer && renshuuClicked.includes(optNumber)) {
                          boxStyle = "border-red-600 bg-red-50";
                          textStyle = "text-red-700 line-through opacity-70";
                          if (data.practice.options_explanation?.[optNumber]) {
                            explainBlock = (
                              <div className="ml-8 mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">
                                {data.practice.options_explanation[optNumber]}
                              </div>
                            );
                          }
                        }
                      }

                      return (
                        <div key={i} className="flex flex-col">
                          <label 
                            onClick={() => handleRenshuuClick(optNumber)} 
                            className={`flex items-start gap-3 p-2 -ml-2 rounded transition-colors ${!renshuuRevealed ? 'cursor-pointer hover:bg-gray-100' : ''} ${boxStyle !== 'border-gray-400' ? boxStyle : ''}`}
                          >
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                readOnly
                                className="mt-1 w-5 h-5 accent-black pointer-events-none" 
                              />
                              <span className={textStyle}>
                                {opt} 
                                {boxStyle.includes('green') && " ✅"}
                                {boxStyle.includes('red') && " ❌"}
                              </span>
                          </label>
                          {explainBlock}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
          </div>

          {/* ================= PAGE 2: MONDAI / QUESTIONS ================= */}
          <div className="w-full h-full flex-shrink-0 p-4 md:p-8 overflow-y-auto pb-8">
            {data.mondai && (
              <>
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-black text-white px-4 py-1 rounded-full font-bold">もんだい</span>
                    <span className="font-bold text-black">{data.mondai.instruction}</span>
                </div>

                {/* The Notice Box */}
                {data.mondai.notice && (
                  <div className="border-4 border-black p-4 rounded-sm mb-4 bg-white">
                    {data.mondai.notice.title && (
                      <>
                        <h3 className="text-2xl font-black text-center mb-2 tracking-widest">{data.mondai.notice.title.split(' ')[0]}</h3>
                        <h4 className="text-xl font-bold text-center mb-4">{data.mondai.notice.title.split(' ').slice(1).join(' ')}</h4>
                      </>
                    )}
                    
                    {data.mondai.notice.sections && (
                      <table className="w-full border-collapse border-2 border-black mb-4">
                        <tbody>
                          {data.mondai.notice.sections.map((sec, i) => (
                            <React.Fragment key={i}>
                              {(sec.rows || []).map((row, j) => (
                                <tr key={j}>
                                  {j === 0 && (
                                    <td rowSpan={sec.rows.length} className="border-2 border-black bg-gray-200 font-bold p-3 w-1/4 text-center">
                                      {sec.header}
                                    </td>
                                  )}
                                  <td className="border-2 border-black p-3 w-1/4 bg-gray-100 whitespace-pre-wrap font-bold text-center">
                                    {row.label}
                                  </td>
                                  <td className="border-2 border-black p-3 whitespace-pre-wrap">
                                    {row.value}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    )}
                    
                    {data.mondai.notice.footer && (
                      <p className="text-sm font-bold text-black">
                        {data.mondai.notice.footer}
                      </p>
                    )}
                  </div>
                )}
                
                {data.mondai.notice_vocab && data.mondai.notice_vocab.length > 0 && (
                  <div className="text-sm text-gray-800 flex flex-wrap gap-4 mb-5 pb-4 border-b-2 border-black font-bold">
                    {data.mondai.notice_vocab.map((v, i) => (
                      <span key={i}>{v.word}: {v.meaning}</span>
                    ))}
                  </div>
                )}

                {/* Mondai Questions */}
                {data.mondai.questions && (
                  <div className="space-y-6 mb-5">
                    {data.mondai.questions.map((q, qIdx) => {
                      const isRevealed = mondaiRevealed[q.id];
                      const selectedOpt = mondaiAnswers[q.id];

                      return (
                        <div key={q.id || qIdx} className="border-b pb-4 last:border-b-0">
                          <h4 className="font-bold text-lg mb-4">{q.id} {q.text}</h4>
                          <div className="space-y-2 mb-3">
                            {(q.options || []).map((opt, oIdx) => {
                              const optNum = oIdx + 1;
                              let optStyle = "border-gray-300 text-black";
                              
                              if (isRevealed) {
                                if (optNum === q.correct_answer) {
                                  optStyle = "bg-green-100 border-green-600 text-green-800 font-bold";
                                } else if (optNum === selectedOpt && selectedOpt !== q.correct_answer) {
                                  optStyle = "bg-red-100 border-red-600 text-red-800 line-through opacity-60";
                                } else {
                                  optStyle = "border-gray-200 text-gray-400";
                                }
                              } else {
                                optStyle += " hover:border-black hover:bg-gray-50 cursor-pointer";
                              }

                              return (
                                <div 
                                  key={oIdx}
                                  onClick={() => handleMondaiClick(q.id, oIdx)}
                                  className={`p-3 border-2 rounded-sm transition-colors ${optStyle}`}
                                >
                                  {opt}
                                  {isRevealed && optNum === q.correct_answer && " ✅"}
                                  {isRevealed && optNum === selectedOpt && selectedOpt !== q.correct_answer && " ❌"}
                                </div>
                              );
                            })}
                          </div>
                          
                          {isRevealed && (
                            <div className="mt-2 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-black shadow-sm text-sm">
                              <span className="font-bold text-yellow-700 block mb-1">解説 (Explanation):</span>
                              {q.explanation || "No explanation available."}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            
          </div>

        </div>

        {/* Next/Prev Click Zones Overlay */}
        {currentPage > 0 && (
          <div onClick={() => setCurrentPage(p => p - 1)} className="absolute left-0 top-0 bottom-0 w-16 hover:bg-black/5 cursor-pointer flex items-center justify-center transition-colors">
            <span className="text-4xl opacity-30">&lsaquo;</span>
          </div>
        )}
        {currentPage < totalPages - 1 && (
          <div onClick={() => setCurrentPage(p => p + 1)} className="absolute right-0 top-0 bottom-0 w-16 hover:bg-black/5 cursor-pointer flex items-center justify-center transition-colors">
            <span className="text-4xl opacity-30">&rsaquo;</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SomatomeN3Book;
