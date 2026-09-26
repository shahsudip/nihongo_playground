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
      title: `${data.title} ${data.partTitleEn ? `(${data.partTitleEn})` : ''}`,
      rawTitle: data.title,
      mondaiNumber: data.mondaiNumber,
    };
  })
  .sort((a, b) => a.mondaiNumber - b.mondaiNumber);

const PART_TITLES = {
  1: '第1部：問題紹介',
  2: '第2部：実力養成編',
};

const MONDAI_NAMES = {
  'mondai-1': '課題理解 (Task-Based)',
  'mondai-2': 'ポイント理解 (Key Points)',
  'mondai-3': '概要理解 (General Outline)',
  'mondai-4': '発話表現 (Utterance Expressions)',
  'mondai-5': '即時応答 (Quick Response)',
};

const ShinkanzenN3ListeningBook = () => {
  const { chapterId = 'mondai-1' } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User state — SCRIPT IS CLOSED BY DEFAULT
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showScript, setShowScript] = useState(false);

  // Audio & Mode State
  const [mode, setMode] = useState('study'); // 'study' or 'exam'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [currentAudioDuration, setCurrentAudioDuration] = useState(0);
  const [activeAudioSrc, setActiveAudioSrc] = useState(null);
  const [playCount, setPlayCount] = useState({});

  const audioRef = useRef(null);

  const allChapters = SHINKANZEN_N3_LISTENING_CHAPTERS;
  const currentChapterIndex = allChapters.findIndex(c => c.id === chapterId);
  const currentChapter = allChapters[currentChapterIndex];
  const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : null;
  const currentPart = currentChapter?.part || 1;
  const partChapters = allChapters.filter(ch => ch.part === currentPart);

  const resolvePublicUrl = (path) => {
    if (!path) return path;
    if (path.startsWith('http')) return path;
    return path.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : import.meta.env.BASE_URL + path;
  };

  useEffect(() => {
    setAnswers({});
    setRevealed({});
    setLoading(true);
    setError(null);
    setShowScript(false); // Always closed by default on chapter change

    try {
      const matchedKey = Object.keys(localChapterModules).find(k => k.endsWith(`/${chapterId}.json`));
      if (matchedKey && localChapterModules[matchedKey]) {
        const mod = localChapterModules[matchedKey];
        const loadedData = mod.default || mod;
        setData(loadedData);

        // Auto-assign first audio track from hotspots
        if (loadedData?.hotspots && loadedData.hotspots.length > 0) {
          const firstAudio = loadedData.hotspots[0].audioSrc;
          setActiveAudioSrc(firstAudio);
          if (audioRef.current) {
            audioRef.current.src = resolvePublicUrl(firstAudio);
            audioRef.current.load();
          }
        }
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

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (mode === 'exam' && playCount[chapterId] >= 1 && !isPlaying) {
      alert("Exam Mode: Audio can only be played once!");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        setPlayCount(prev => ({ ...prev, [chapterId]: (prev[chapterId] || 0) + 1 }));
      }).catch(err => console.error("Audio playback error:", err));
    }
  };

  const handleScrub = (e) => {
    if (mode === 'exam') return;
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentAudioTime(newTime);
    }
  };

  const setSpeed = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const seekToTime = (time) => {
    if (mode === 'exam') return;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play().catch(e => console.error(e));
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === null) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const navigateToChapter = (id) => {
    if (id) navigate(`/books/shinkanzen-master-n3-listening/chapters/${id}`);
  };

  const getSpeakerBadgeStyle = (speaker) => {
    if (!speaker) return 'bg-gray-500/10 text-gray-500 dark:text-gray-400 border border-gray-500/20';
    if (speaker.includes('女') || speaker.includes('女性')) return 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20';
    if (speaker.includes('男') || speaker.includes('男性')) return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
    if (speaker.includes('ナレーション') || speaker.includes('質問')) return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20';
    if (speaker.includes('指示')) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] pt-28 flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="text-xs text-[var(--color-text-muted)] mt-4">Loading Shin Kanzen Master Listening...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] pt-28 px-4 flex flex-col items-center">
        <div className="max-w-md w-full bg-[var(--color-bg-secondary)] border border-red-500/30 rounded-2xl p-6 text-center">
          <p className="text-red-500 font-bold mb-3">⚠️ Chapter Error</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">{error || "Chapter not found"}</p>
          <Link to="/books/shinkanzen-master-n3-listening" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition">
            Back to Book Index
          </Link>
        </div>
      </div>
    );
  }

  const currentTrackLabel = data.hotspots?.[0]?.label || 'Audio Track';

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pb-20 pt-20 sm:pt-24 transition-colors">
      
      {/* Hidden Native Audio Element */}
      <audio 
        ref={audioRef} 
        src={resolvePublicUrl(activeAudioSrc)} 
        playsInline 
        preload="auto" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Breadcrumb & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Link 
              to="/books/shinkanzen-master-n3-listening" 
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline transition flex items-center gap-1 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20"
            >
              &larr; Book Index
            </Link>
            <span className="text-xs text-[var(--color-text-muted)]">•</span>
            <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
              {data.partTitle || PART_TITLES[data.part]}
            </span>
          </div>

          {/* Chapter Quick-Switcher */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={chapterId}
              onChange={(e) => navigateToChapter(e.target.value)}
              className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-xs font-bold py-2 px-3.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              {partChapters.map(ch => (
                <option key={ch.id} value={ch.id}>
                  {ch.rawTitle} — {MONDAI_NAMES[ch.id] || ch.id}
                </option>
              ))}
            </select>

            {/* Mode Switcher */}
            <div className="flex bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-0.5 shadow-sm">
              <button
                onClick={() => setMode('study')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === 'study' ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Study
              </button>
              <button
                onClick={() => {
                  setMode('exam');
                  setShowScript(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === 'exam' ? 'bg-red-600 text-white shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Exam
              </button>
            </div>
          </div>
        </div>

        {/* ================= STICKY AUDIO PLAYER BAR ================= */}
        <div className="sticky top-16 z-30 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-2xl p-4 sm:p-5 shadow-lg mb-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Play Button & Track Info */}
            <div className="flex items-center gap-3.5">
              <button
                onClick={togglePlay}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all shadow-md transform active:scale-95 ${
                  isPlaying 
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/25' 
                    : 'bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30'
                }`}
                title={isPlaying ? "Pause Audio" : "Play Audio"}
              >
                {isPlaying ? (
                  <span className="text-sm tracking-tighter">❚❚</span>
                ) : (
                  <span className="text-base ml-1">▶</span>
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {currentTrackLabel}
                  </span>
                  <h3 className="text-sm font-black text-[var(--color-text-primary)] m-0 truncate max-w-[200px] sm:max-w-xs">
                    {data.title} — {MONDAI_NAMES[chapterId] || data.partTitleEn}
                  </h3>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] m-0 mt-0.5">
                  {isPlaying ? '🎧 Playing audio...' : 'Click Play to listen to the dialogue'}
                </p>
              </div>
            </div>

            {/* Audio Speed & Time Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="flex bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-0.5">
                {[0.8, 1.0, 1.2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setSpeed(speed)}
                    disabled={mode === 'exam'}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                      playbackRate === speed ? 'bg-blue-600 text-white shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              <div className="font-mono text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] px-3 py-1.5 rounded-xl">
                {formatTime(currentAudioTime)} / {formatTime(currentAudioDuration)}
              </div>
            </div>
          </div>

          {/* Precision Seek Bar */}
          <div className="mt-3.5 flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={currentAudioDuration || 100}
              step="0.1"
              value={currentAudioTime}
              onChange={handleScrub}
              disabled={mode === 'exam'}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50"
            />
          </div>
          {mode === 'exam' && (
            <p className="text-[10px] text-rose-500 font-semibold text-center mt-1.5 m-0">
              ⚠️ Exam Mode: Audio seeking is disabled. Listen carefully once!
            </p>
          )}
        </div>

        {/* ================= SECTION HEADER & STRATEGY CARD ================= */}
        <div className="bg-[var(--color-bg-secondary)] border border-blue-500/20 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
              {data.mondaiNumber}
            </span>
            <div>
              <h2 className="text-lg font-black text-[var(--color-text-primary)] m-0">
                {data.title}：{MONDAI_NAMES[chapterId] || data.partTitle}
              </h2>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                {data.partTitleEn || 'JLPT N3 Listening Strategy & Drill'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line m-0 bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border)]">
            {data.mondaiHeader}
          </p>
        </div>

        {/* ================= OPTIONAL ILLUSTRATION BOX (e.g. MONDAI 4) ================= */}
        {data.illustrationSrc && (
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-5 mb-6 text-center shadow-sm">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                🖼️ Problem Scene Illustration (イラスト)
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                Look at the arrow (矢印 →) person
              </span>
            </div>
            <div className="flex justify-center bg-transparent rounded-xl p-2">
              <img 
                src={resolvePublicUrl(data.illustrationSrc)} 
                alt="Problem Illustration" 
                className="max-h-72 object-contain drop-shadow-md"
              />
            </div>
          </div>
        )}

        {/* ================= INTERACTIVE QUESTIONS LIST ================= */}
        <div className="space-y-6 mb-8">
          {data.questions?.map((q, qIdx) => {
            const qKey = `q-${qIdx}`;
            const userAnswer = answers[qKey];
            const isRevealed = revealed[qKey] || (mode === 'exam' && false);
            const correctIdx = q.correctOption?.index;

            return (
              <div 
                key={qIdx} 
                className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-7 shadow-sm transition-all"
              >
                {/* Question Header */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--color-border)]">
                  <span className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-black text-xs shadow-sm">
                    ☆ 例題 {data.questions.length > 1 ? `（${qIdx + 1}）` : qIdx + 1}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-text-muted)]">
                    {MONDAI_NAMES[chapterId] || data.title}
                  </span>
                </div>

                {/* Authentic Printed Direction Box (この問題では...) */}
                {(q.instruction || data.instruction) && (
                  <div className="mb-4 bg-[var(--color-bg-primary)] p-3.5 rounded-xl border border-[var(--color-border)]">
                    <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider block mb-1">
                      問題の指示 (Direction)
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--color-text-primary)] font-medium leading-relaxed m-0">
                      {q.instruction || data.instruction}
                    </p>
                  </div>
                )}

                {/* Main Spoken Question & Context */}
                {q.questionText && (
                  <div className="mb-5 px-1">
                    {q.context && (
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 m-0">
                        （{q.context}）
                      </p>
                    )}
                    <h3 className="text-base sm:text-lg font-black text-[var(--color-text-primary)] leading-snug m-0 flex items-center gap-2">
                      <span className="text-blue-600 dark:text-blue-400 text-sm">❓</span>
                      <span dangerouslySetInnerHTML={{ __html: q.questionText }} />
                    </h3>
                  </div>
                )}

                {/* Choices Grid */}
                <div className="grid grid-cols-1 gap-2.5">
                  {q.options?.map((optText, optIdx) => {
                    const isSelected = userAnswer === optIdx + 1;
                    const isCorrect = optIdx === correctIdx;

                    let btnStyle = "bg-[var(--color-bg-primary)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-blue-500 hover:bg-blue-500/5";

                    if (isRevealed) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold ring-1 ring-emerald-500";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 line-through ring-1 ring-rose-500";
                      } else {
                        btnStyle = "bg-[var(--color-bg-primary)] border-[var(--color-border)] opacity-40 text-[var(--color-text-muted)]";
                      }
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
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 text-sm sm:text-base font-medium ${btnStyle}`}
                      >
                        <span dangerouslySetInnerHTML={{ __html: optText }} />
                        {isRevealed && isCorrect && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-black text-sm shrink-0">✓ 正解</span>
                        )}
                        {isRevealed && isSelected && !isCorrect && (
                          <span className="text-rose-600 dark:text-rose-400 font-black text-sm shrink-0">✗ 不正解</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Japanese Explanation */}
                {isRevealed && q.explanation && (
                  <div className="mt-5 p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[var(--color-text-primary)] text-xs sm:text-sm leading-relaxed animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2 font-bold text-amber-600 dark:text-amber-400">
                      <span>💡</span>
                      <span>問題のポイント・正解の理由 (Explanation)</span>
                    </div>
                    <div 
                      className="space-y-1 text-[var(--color-text-secondary)]"
                      dangerouslySetInnerHTML={{ __html: q.explanation }} 
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= KARAOKE LIVE SCRIPT / TRANSCRIPT DRAWER ================= */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm mb-8">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <span className="text-lg">📜</span>
              <h3 className="text-sm sm:text-base font-black text-[var(--color-text-primary)] m-0">
                音声スクリプト (Audio Transcript & Dialogue)
              </h3>
            </div>
            
            <button
              onClick={() => setShowScript(!showScript)}
              className="px-3.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              {showScript ? 'Hide Script ▲' : 'Show Dialogue Script ▼'}
            </button>
          </div>

          {showScript && (
            <div className="p-4 sm:p-6 space-y-3 bg-[var(--color-bg-primary)]/50 max-h-[480px] overflow-y-auto">
              <p className="text-[11px] text-[var(--color-text-muted)] italic mb-3">
                💡 Click any dialogue line below to seek and play audio from that exact point:
              </p>
              
              {data.transcript?.map((line, idx) => {
                const isPast = currentAudioTime >= line.time;
                const nextLineTime = data.transcript[idx + 1]?.time || Infinity;
                const isActive = isPast && currentAudioTime < nextLineTime;

                return (
                  <div
                    key={idx}
                    onClick={() => seekToTime(line.time)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all duration-200 border flex items-start gap-3 ${
                      isActive
                        ? 'bg-blue-500/15 border-blue-500 text-blue-600 dark:text-blue-300 font-bold shadow-sm ring-1 ring-blue-500 translate-x-1'
                        : isPast
                        ? 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-blue-500/60'
                        : 'bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-blue-500/40'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] border border-[var(--color-border)] shrink-0 mt-0.5">
                      {formatTime(line.time)}
                    </span>
                    
                    <div className="flex-1">
                      {line.speaker && (
                        <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded mr-2 ${getSpeakerBadgeStyle(line.speaker)}`}>
                          {line.speaker}
                        </span>
                      )}
                      <span className="text-sm sm:text-base leading-relaxed">{line.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= BOTTOM PAGINATION & NAVIGATION ================= */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-[var(--color-border)]">
          <button
            onClick={() => prevChapter && navigateToChapter(prevChapter.id)}
            disabled={!prevChapter}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              prevChapter
                ? 'bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-blue-500 hover:shadow-md'
                : 'opacity-40 bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] cursor-not-allowed'
            }`}
          >
            &larr; Previous Section
          </button>

          <span className="text-xs font-bold text-[var(--color-text-muted)]">
            Section {currentChapterIndex + 1} of {allChapters.length}
          </span>

          <button
            onClick={() => nextChapter && navigateToChapter(nextChapter.id)}
            disabled={!nextChapter}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              nextChapter
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                : 'opacity-40 bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] cursor-not-allowed'
            }`}
          >
            Next Section &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShinkanzenN3ListeningBook;
