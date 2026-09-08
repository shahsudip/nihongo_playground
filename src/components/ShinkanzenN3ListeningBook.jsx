import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../utils/loading_spinner.jsx';

// Eagerly load all local Shinkanzen Listening JSON files
const localChapterModules = import.meta.glob('../data/shinkanzen_listening/*.json', { eager: true });

export const SHINKANZEN_N3_LISTENING_CHAPTERS = Object.keys(localChapterModules)
  .map(filePath => {
    const data = localChapterModules[filePath].default || localChapterModules[filePath];
    return {
      id: data.chapterId,
      part: data.part,
      title: `Part ${data.part} - ${data.title}`,
      mondaiNumber: data.mondaiNumber,
    };
  })
  .sort((a, b) => a.mondaiNumber - b.mondaiNumber);

const PART_TITLES = {
  1: '第1部：課題理解',
  2: '第2部：ポイント理解',
  3: '第3部：概要理解',
  4: '第4部：発話表現・即時応答',
  5: '模擬試験'
};

const ShinkanzenN3ListeningBook = () => {
  const { chapterId = 'mondai-1' } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [startX, setStartX] = useState(null);

  // Audio & Mode State
  const [mode, setMode] = useState('study'); // 'study' or 'exam'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [currentAudioDuration, setCurrentAudioDuration] = useState(0);
  const [activeAudioSrc, setActiveAudioSrc] = useState(null);
  const [showScript, setShowScript] = useState(false);
  const [playCount, setPlayCount] = useState({}); // Track how many times an audio has been played (for exam mode limit)

  const audioRef = useRef(null);

  const allChapters = SHINKANZEN_N3_LISTENING_CHAPTERS;
  const currentChapterIndex = allChapters.findIndex(c => c.id === chapterId);
  const currentChapter = allChapters[currentChapterIndex];
  const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : null;
  const currentPart = currentChapter?.part || 1;
  const partChapters = allChapters.filter(ch => ch.part === currentPart);
  const partNumbers = [...new Set(allChapters.map(ch => ch.part))].sort((a, b) => a - b);

  useEffect(() => {
    setCurrentPage(0);
    setAnswers({});
    setRevealed({});
    setLoading(true);
    setError(null);
    setActiveAudioSrc(null);
    setShowScript(false);

    try {
      const matchedKey = Object.keys(localChapterModules).find(k => k.endsWith(`/${chapterId}.json`));
      if (matchedKey && localChapterModules[matchedKey]) {
        const mod = localChapterModules[matchedKey];
        setData(mod.default || mod);
      } else {
        setData(null);
        setError(`Content for "${chapterId}" is currently in preparation.`);
      }
    } catch (err) {
      setError(err.message || "Failed to load chapter content.");
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => setCurrentAudioTime(audio.currentTime);
    const handleDurationChange = () => setCurrentAudioDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [activeAudioSrc]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setCurrentPage(p => Math.min(totalPages - 1, p + 1));
      if (e.key === 'ArrowLeft') setCurrentPage(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  const handleDragStart = (e) => setStartX(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  const handleDragEnd = (e) => {
    if (startX === null) return;
    const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;
    
    // Ignore drag if dragging over scrub bar or audio controls to prevent accidental flipping
    if (e.target.closest('.audio-control-area')) return;

    if (diff > 50 && currentPage < totalPages - 1) setCurrentPage(p => p + 1);
    else if (diff < -50 && currentPage > 0) setCurrentPage(p => p - 1);
    setStartX(null);
  };

  const playAudio = (src, trackId) => {
    // Exam mode check: if played once, prevent re-playing
    if (mode === 'exam' && playCount[trackId]) {
      alert("Exam Mode: You can only listen to the audio once!");
      return;
    }

    if (activeAudioSrc !== src) {
      setActiveAudioSrc(src);
      setPlayCount(prev => ({ ...prev, [trackId]: (prev[trackId] || 0) + 1 }));
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.error(e));
        }
      }, 100);
    } else {
      if (audioRef.current) {
        if (isPlaying) audioRef.current.pause();
        else {
          audioRef.current.play().catch(e => console.error(e));
          setPlayCount(prev => ({ ...prev, [trackId]: (prev[trackId] || 0) + 1 }));
        }
      }
    }
  };

  const handleScrub = (e) => {
    if (mode === 'exam') return; // Scrubbing disabled in exam mode
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentAudioTime(newTime);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const navigateToChapter = (id) => {
    if (id) navigate(`/books/shinkanzen-master-n3-listening/chapters/${id}`);
  };

  const resolvePublicUrl = (path) => {
    if (!path) return path;
    if (path.startsWith('http')) return path;
    // Prepend Vite's BASE_URL (e.g. /nihongo_playground/) so assets resolve correctly on GitHub Pages
    return path.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : import.meta.env.BASE_URL + path;
  };

  if (loading) return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-8 pt-4 flex flex-col items-center"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 pb-6 pt-4 flex flex-col items-center overflow-hidden">
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={resolvePublicUrl(activeAudioSrc)} />

      <div className="w-full max-w-[850px] px-4 mb-2 z-20 relative">
        <Link to="/books/shinkanzen-master-n3-listening" className="text-sm font-semibold text-blue-500 hover:underline mb-2 inline-block">
          &larr; Back to Chapters
        </Link>
        
        {/* Navigation & Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-900 text-white px-4 py-3 mt-2 rounded-xl shadow-md text-sm border border-gray-700">
          
          {/* Chapter Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={currentPart}
              onChange={(e) => {
                const targetPart = parseInt(e.target.value);
                const firstInPart = allChapters.find(ch => ch.part === targetPart);
                if (firstInPart) navigateToChapter(firstInPart.id);
              }}
              className="bg-gray-800 text-white py-1.5 px-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500"
            >
              {partNumbers.map(pn => <option key={pn} value={pn}>第{pn}部</option>)}
            </select>
            <select
              value={chapterId}
              onChange={(e) => navigateToChapter(e.target.value)}
              className="bg-gray-800 text-white py-1.5 px-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 max-w-[120px] truncate"
            >
              {partChapters.map(ch => <option key={ch.id} value={ch.id}>{ch.title.split('- ')[1]}</option>)}
            </select>
          </div>

          {/* Global Mode Toggle */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-600 w-full sm:w-auto justify-center">
            <button 
              onClick={() => setMode('study')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'study' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Study Mode
            </button>
            <button 
              onClick={() => setMode('exam')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'exam' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Exam Mode (Strict)
            </button>
          </div>
        </div>

        {/* Global Audio Player Bar */}
        <div className="bg-gray-800 text-white px-5 py-4 mt-2 rounded-xl shadow-lg border border-gray-700 flex flex-col gap-3 audio-control-area">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  if(activeAudioSrc) playAudio(activeAudioSrc, 'current-track');
                }}
                disabled={!activeAudioSrc}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${!activeAudioSrc ? 'bg-gray-700 text-gray-500' : isPlaying ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white shadow-md'}`}
              >
                {isPlaying ? <span className="text-sm font-bold">||</span> : <span className="text-sm ml-1 font-bold">▶</span>}
              </button>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{activeAudioSrc ? 'Now Playing' : 'Select a track on the page'}</span>
                <span className="text-xs text-gray-400">{activeAudioSrc ? activeAudioSrc.split('/').pop() : 'No audio loaded'}</span>
              </div>
            </div>
            <div className="text-xs font-mono bg-gray-900 px-3 py-1.5 rounded-md border border-gray-700">
              {formatTime(currentAudioTime)} / {formatTime(currentAudioDuration)}
            </div>
          </div>
          
          {/* Scrub Bar */}
          <input 
            type="range" 
            min="0" 
            max={currentAudioDuration || 0} 
            value={currentAudioTime} 
            onChange={handleScrub}
            disabled={!activeAudioSrc || mode === 'exam'}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${mode === 'exam' ? 'bg-gray-700 opacity-50' : 'bg-gray-600 accent-blue-500'}`}
          />
          {mode === 'exam' && <span className="text-[10px] text-red-400 font-medium text-center">Audio seeking is disabled in Exam Mode</span>}
        </div>
      </div>
      
      {/* A4 Paper Viewport */}
      <div 
        className="relative bg-white text-black shadow-2xl border-2 border-gray-400 dark:border-gray-700 w-full max-w-[850px] h-[85vh] min-h-[800px] overflow-hidden flex select-none rounded-xl mt-2 z-10"
        onMouseDown={handleDragStart} 
        onMouseUp={handleDragEnd} 
        onTouchStart={handleDragStart} 
        onTouchEnd={handleDragEnd}
      >
        <div className="flex w-full h-full transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
          
          {/* ================= PAGE 1: SCANNED BOOK PAGE WITH HOTSPOTS ================= */}
          <div className="w-full h-full flex-shrink-0 relative bg-gray-100 overflow-y-auto overflow-x-hidden flex justify-center">
            {data?.imageSrc && (
              <div className="relative inline-block h-max shadow-md">
                <img src={resolvePublicUrl(data.imageSrc)} alt="Scanned Page" className="max-w-full h-auto object-contain" />
                
                {/* Interactive Audio Hotspots */}
                {data.hotspots?.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    onClick={() => playAudio(hotspot.audioSrc, hotspot.trackId)}
                    className="absolute bg-blue-500/30 hover:bg-blue-500/60 border-2 border-blue-600 rounded-md transition-all flex items-center justify-center group shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    style={{ 
                      top: `${hotspot.y}%`, 
                      left: `${hotspot.x}%`, 
                      width: `${hotspot.width}%`, 
                      height: `${hotspot.height}%` 
                    }}
                    title={`Play ${hotspot.label}`}
                  >
                    <div className="hidden group-hover:flex bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded absolute -top-8 whitespace-nowrap">
                      ▶ Play Audio
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur pointer-events-none">
              Swipe Left for Quiz ➜
            </div>
          </div>
          
          {/* ================= PAGE 2: QUIZ & REAL-TIME SCRIPT ================= */}
          <div className="w-full h-full flex-shrink-0 p-4 md:p-8 overflow-y-auto pb-20">
            <div className="bg-blue-800 text-white rounded-t-xl p-4 flex justify-between items-end mb-5 shadow">
              <div className="flex flex-col">
                <span className="text-sm font-bold opacity-80">{PART_TITLES[data?.part]}</span>
                <span className="text-2xl font-black">{data?.title}</span>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6 mb-8">
              {data?.questions?.map((q, qIdx) => {
                const qKey = `q-${qIdx}`;
                const userAnswer = answers[qKey];
                const isRevealed = revealed[qKey];
                const correctIdx = q.correctOption?.index;

                return (
                  <div key={qIdx} className="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm">
                    <div className="mb-4">
                      <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full mr-2">Q{qIdx + 1}</span>
                      <span className="text-gray-900 font-bold text-base" dangerouslySetInnerHTML={{ __html: q.questionText }} />
                    </div>

                    <div className="space-y-2">
                      {q.options?.map((opt, optIdx) => {
                        let optClass = 'bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer text-black';
                        if (isRevealed) {
                          if (optIdx === correctIdx) optClass = 'bg-green-100 border-2 border-green-600 text-green-800 font-bold';
                          else if (userAnswer === optIdx + 1) optClass = 'bg-red-100 border-2 border-red-600 text-red-700 line-through';
                          else optClass = 'bg-gray-100 border border-gray-200 text-gray-400';
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              if(isRevealed) return;
                              setAnswers(prev => ({ ...prev, [qKey]: optIdx + 1 }));
                              setRevealed(prev => ({ ...prev, [qKey]: true }));
                            }}
                            disabled={isRevealed}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium ${optClass}`}
                            dangerouslySetInnerHTML={{ __html: opt }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Real-time Script Reveal */}
            <div className="border-t-2 border-dashed border-gray-300 pt-6">
              {!showScript ? (
                <button 
                  onClick={() => setShowScript(true)}
                  className="w-full py-4 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-xl font-bold text-gray-700 transition flex items-center justify-center gap-2"
                >
                  <span>📝</span> Reveal Audio Script (Transcript)
                </button>
              ) : (
                <div className="bg-blue-50 rounded-xl border-2 border-blue-200 overflow-hidden shadow-sm">
                  <div className="bg-blue-100 px-4 py-3 border-b border-blue-200 flex justify-between items-center">
                    <span className="font-bold text-blue-900 flex items-center gap-2">
                      <span className="animate-pulse text-red-500">●</span> Live Transcript (Karaoke)
                    </span>
                    <button onClick={() => setShowScript(false)} className="text-blue-700 hover:text-blue-900 text-xs font-bold px-2 py-1 bg-white rounded border border-blue-300 shadow-sm">Hide</button>
                  </div>
                  <div className="p-5 max-h-[300px] overflow-y-auto space-y-3 audio-control-area">
                    {data?.transcript?.map((line, i) => {
                      const isPast = currentAudioTime >= line.time;
                      const nextLineTime = data.transcript[i + 1]?.time || Infinity;
                      const isActive = isPast && currentAudioTime < nextLineTime;

                      return (
                        <div 
                          key={i} 
                          className={`p-2 rounded transition-all duration-300 cursor-pointer hover:bg-blue-100 ${isActive ? 'bg-yellow-200 shadow font-bold text-black border-l-4 border-yellow-500' : isPast ? 'text-gray-800' : 'text-gray-400'}`}
                          onClick={() => {
                            if (audioRef.current && mode !== 'exam') {
                              audioRef.current.currentTime = line.time;
                              audioRef.current.play();
                            }
                          }}
                        >
                          {line.speaker && <span className="font-bold text-blue-800 mr-2 bg-blue-100 px-2 py-0.5 rounded text-xs">{line.speaker}</span>}
                          <span className="text-base">{line.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
              <button 
                onClick={() => prevChapter && navigateToChapter(prevChapter.id)}
                disabled={!prevChapter}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${prevChapter ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                &larr; Prev
              </button>
              <button 
                onClick={() => nextChapter && navigateToChapter(nextChapter.id)}
                disabled={!nextChapter}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${nextChapter ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Next &rarr;
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShinkanzenN3ListeningBook;
