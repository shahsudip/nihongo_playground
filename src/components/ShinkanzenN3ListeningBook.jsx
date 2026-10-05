import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { getDownloadURL, ref } from 'firebase/storage';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/shinkanzen_book.css';
import { functions, storage } from '../firebaseConfig.js';
import { useAuth } from '../context/AuthContext';

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
      order: data.order ?? data.mondaiNumber,
    };
  })
  .sort((a, b) => {
    if (a.part !== b.part) return a.part - b.part;
    return (a.order ?? a.mondaiNumber) - (b.order ?? b.mondaiNumber);
  });

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
  'skill-1': 'Ⅰ 音声の特徴に慣れる (Speech Characteristics)',
  'skill-2': 'Ⅱ 「発話表現」のスキルを学ぶ (Utterance Expressions)',
  'skill-3': 'Ⅲ 「即時応答」のスキルを学ぶ (Immediate Response)',
  'skill-4': 'Ⅳ 「課題理解」のスキルを学ぶ (Task Comprehension)',
  'skill-5': 'Ⅴ 「ポイント理解」のスキルを学ぶ (Point Comprehension)',
  'skill-6': 'Ⅵ 「概要理解」のスキルを学ぶ (General Comprehension)',
};

/**
 * Authentic Headphone Earphone Badge matching Shin Kanzen Master physical textbook:
 * Headband arc, two earpads, dotted halo, with Disc Letter (e.g. A) on top and Track No (e.g. 01) below.
 */
const HeadphoneBadge = ({ trackCode = "A-01", isPlaying = false, onClick, title }) => {
  let letter = "A";
  let num = "01";
  if (trackCode) {
    const clean = String(trackCode).replace(/[\[\]]/g, '').trim();
    const parts = clean.split(/[-_\s]+/);
    if (parts.length >= 2) {
      letter = parts[0];
      num = parts[1];
    } else if (clean.length > 1) {
      letter = clean.charAt(0);
      num = clean.slice(1);
    }
  }

  return (
    <button
      onClick={onClick}
      type="button"
      title={title || `Play Track ${trackCode}`}
      className={`shinkanzen-earphone-badge inline-flex flex-col items-center justify-center p-0.5 rounded-full group cursor-pointer transition-transform ${
        isPlaying ? 'scale-105' : 'hover:scale-105'
      }`}
    >
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-emerald-500/25 dark:bg-purple-400/35 animate-ping pointer-events-none" />
        )}
        <svg viewBox="0 0 60 60" className="w-11 h-11 sm:w-12 sm:h-12 text-[#1e293b] dark:text-slate-200 transition-colors">
          {/* Subtle dotted halo circle like the original book print */}
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="1.5, 2.5"
            opacity="0.35"
          />
          {/* Headband arch */}
          <path
            d="M 17 33 C 17 17, 43 17, 43 33"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Left earphone pad */}
          <ellipse
            cx="16"
            cy="35"
            rx="4"
            ry="7"
            fill="currentColor"
          />
          {/* Right earphone pad */}
          <ellipse
            cx="44"
            cy="35"
            rx="4"
            ry="7"
            fill="currentColor"
          />
          {/* Disc Letter (e.g. A) */}
          <text
            x="30"
            y="26"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="900"
            fontFamily="'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif"
            fill="currentColor"
            letterSpacing="0.5"
          >
            {letter}
          </text>
          {/* Track Number (e.g. 01) */}
          <text
            x="30"
            y="41"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fontFamily="'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif"
            fill="currentColor"
            letterSpacing="0.5"
          >
            {num}
          </text>
        </svg>
      </div>
    </button>
  );
};

const ShinkanzenN3ListeningBook = () => {
  const { chapterId = 'mondai-1' } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User state — SCRIPT IS CLOSED BY DEFAULT
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showScript, setShowScript] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoState, setVideoState] = useState({ status: 'idle', url: null, message: null });

  // Audio State
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
    setShowScript(false);
    setShowVideo(false);
    setVideoState({ status: 'idle', url: null, message: null });

    try {
      const matchedKey = Object.keys(localChapterModules).find(k => k.endsWith(`/${chapterId}.json`));
      if (matchedKey && localChapterModules[matchedKey]) {
        const mod = localChapterModules[matchedKey];
        const loadedData = mod.default || mod;
        setData(loadedData);

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

  const loadVideoStatus = useCallback(async () => {
    const getListeningVideo = httpsCallable(functions, 'getListeningVideo');
    const result = await getListeningVideo({ chapterId });
    const video = result.data;
    if (video.status === 'completed' && video.storagePath) {
      const url = await getDownloadURL(ref(storage, video.storagePath));
      setVideoState({ status: 'completed', url, message: null });
      return true;
    }
    setVideoState({ status: video.status || 'queued', url: null, message: video.error || null });
    return false;
  }, [chapterId]);

  const handleGenerateVideo = async () => {
    if (!currentUser) {
      setShowVideo(true);
      setVideoState({ status: 'error', url: null, message: 'Please sign in before generating a video.' });
      return;
    }
    setShowVideo(true);
    setVideoState({ status: 'checking', url: null, message: null });
    try {
      if (await loadVideoStatus()) return;
      const generateListeningVideo = httpsCallable(functions, 'generateListeningVideo');
      const transcript = (data.transcript || []).map(line => `${line.speaker ? `${line.speaker}: ` : ''}${line.text || ''}`).join('\n');
      const result = await generateListeningVideo({ chapterId, transcript });
      setVideoState({ status: result.data.status || 'queued', url: null, message: result.data.error || null });
    } catch (err) {
      console.error('Video generation request failed:', err);
      setVideoState({ status: 'error', url: null, message: err.message || 'Could not start video generation.' });
    }
  };

  useEffect(() => {
    if (!showVideo || !['queued', 'in_progress', 'checking'].includes(videoState.status)) return undefined;
    const timer = window.setInterval(() => loadVideoStatus().catch(err => console.error('Video status check failed:', err)), 8000);
    return () => window.clearInterval(timer);
  }, [showVideo, videoState.status, loadVideoStatus]);

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

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        setPlayCount(prev => ({ ...prev, [chapterId]: (prev[chapterId] || 0) + 1 }));
      }).catch(err => console.error("Audio playback error:", err));
    }
  };

  const handleScrub = (e) => {
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
      <div className="min-h-[50vh] bg-[var(--color-bg-primary)] py-12 flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="text-xs text-[var(--color-text-muted)] mt-4">Loading Shin Kanzen Master Listening...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[50vh] bg-[var(--color-bg-primary)] py-12 px-4 flex flex-col items-center">
        <div className="max-w-md w-full bg-[var(--color-bg-secondary)] border border-red-500/30 rounded-2xl p-6 text-center">
          <p className="text-red-500 font-bold mb-3">⚠️ Chapter Error</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">{error || "Chapter not found"}</p>
          <Link to="/books/shinkanzen-master-n3-listening" className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-bold transition shadow-sm">
            Back to Book Index
          </Link>
        </div>
      </div>
    );
  }

  const switchTrack = (audioSrc) => {
    if (!audioSrc) return;
    setActiveAudioSrc(audioSrc);
    if (audioRef.current) {
      audioRef.current.src = resolvePublicUrl(audioSrc);
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error(e));
    }
  };

  const currentTrackObj = data.hotspots?.find(h => h.audioSrc === activeAudioSrc) || data.hotspots?.[0];
  const currentTrackLabel = currentTrackObj?.label || 'Audio Track';
  const currentTrackCode = currentTrackObj?.trackCode || currentTrackObj?.label?.match(/\[(.*?)\]/)?.[1] || 'A-01';
  const activeTranscriptLine = [...(data.transcript || [])]
    .reverse()
    .find(line => (!line.trackSrc || line.trackSrc === activeAudioSrc) && currentAudioTime >= line.time);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pb-16 pt-3 sm:pt-4 transition-colors font-sans">
      
      {/* Hidden Native Audio Element */}
      <audio 
        ref={audioRef} 
        src={resolvePublicUrl(activeAudioSrc)} 
        playsInline 
        preload="auto" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 shinkanzen-page">
        
        {/* Top Controls & Breadcrumbs Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Link 
              to="/books/shinkanzen-master-n3-listening" 
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-purple-400 transition flex items-center gap-1.5 bg-slate-200/60 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700"
            >
              &larr; Book Index
            </Link>
          </div>

          {/* Chapter Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={chapterId}
              onChange={(e) => navigateToChapter(e.target.value)}
              className="bg-white dark:bg-slate-800 text-[var(--color-text-primary)] text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 shadow-sm"
            >
              {partChapters.map(ch => (
                <option key={ch.id} value={ch.id}>
                  {ch.rawTitle} — {MONDAI_NAMES[ch.id] || ch.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= AUTHENTIC SHIN KANZEN PART BANNER ================= */}
        <div className="shinkanzen-part-header mb-5">
          <div className="shinkanzen-part-banner">
            <div className="flex items-center">
              <div className="shinkanzen-registration-marks">
                <div className="shinkanzen-reg-bar"></div>
                <div className="shinkanzen-reg-bar"></div>
                <div className="shinkanzen-reg-bar"></div>
                <div className="shinkanzen-reg-bar"></div>
              </div>
              <div className="shinkanzen-white-pill">
                <div className="shinkanzen-pill-num-box">
                  {data.mondaiNumber || data.part || 1}
                </div>
                <span className="shinkanzen-pill-title">
                  {data.partTitle || PART_TITLES[data.part] || '第1部：問題紹介'}
                </span>
                {data.partTitleEn && (
                  <span className="shinkanzen-pill-en">
                    {data.partTitleEn}
                  </span>
                )}
              </div>
            </div>

            {/* Diamond registration pattern on right */}
            <div className="hidden sm:flex items-center text-slate-400 opacity-60 text-xs font-mono tracking-widest">
              ◇◇◇
            </div>
          </div>
        </div>

        {/* ================= AUTHENTIC MONDAI HEADER & OVERVIEW ================= */}
        <div className="shinkanzen-listening-paper rounded-xl p-5 sm:p-6 mb-6">
          <div className="shinkanzen-mondai-header">
            <div className="shinkanzen-mondai-badge">
              {data.title}：{MONDAI_NAMES[chapterId] || data.partTitle}
            </div>
          </div>

          <div className="space-y-3 font-serif">
            <p 
              className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 m-0"
              dangerouslySetInnerHTML={{ __html: data.mondaiHeader }}
            />
            {data.mondaiHeaderEn && (
              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 italic m-0 border-t border-dashed border-slate-200 dark:border-slate-700/60 pt-2 font-sans">
                {data.mondaiHeaderEn}
              </p>
            )}
          </div>
        </div>

        {/* ================= OPTIONAL STANDALONE ILLUSTRATION (non-Mondai 4) ================= */}
        {data.illustrationSrc && chapterId !== 'mondai-4' && (
          <div className="shinkanzen-listening-paper rounded-xl p-4 sm:p-5 mb-6 text-center">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-emerald-700 dark:text-purple-400 uppercase tracking-wider">
                🖼️ Problem Scene Illustration (イラスト)
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                矢印（→）の人の発話に注意
              </span>
            </div>
            <div className="flex justify-center p-2 bg-white dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800">
              <img 
                src={resolvePublicUrl(data.illustrationSrc)} 
                alt="Problem Illustration" 
                className="max-h-72 object-contain drop-shadow-sm"
              />
            </div>
          </div>
        )}

        {/* ================= AUTHENTIC QUESTION SHEET (問題用紙) ================= */}
        {chapterId === 'mondai-5' ? (
          /* ================= MONDAI 5: AUTHENTIC COMBINED (1) & (2) NUMBER BOX SHEET ================= */
          <div className="shinkanzen-listening-paper rounded-xl p-5 sm:p-7 mb-8 transition-all">
            {/* Header: ☆ 例題 5 + A-05 Earphone Badge */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-200 dark:border-stone-700/60">
              <div className="flex items-center gap-3">
                <div className="shinkanzen-reidai-star-badge text-xl font-bold flex items-baseline gap-1.5">
                  <span className="text-xl">☆</span>
                  <ruby className="text-lg font-bold">
                    例題<rt className="text-[10px] font-normal">れいだい</rt>
                  </ruby>
                  <span className="text-xl font-black ml-0.5">5</span>
                </div>

                <HeadphoneBadge
                  trackCode={data.hotspots?.[0]?.trackCode || "A-05"}
                  isPlaying={isPlaying && activeAudioSrc === data.hotspots?.[0]?.audioSrc}
                  onClick={() => {
                    const hs = data.hotspots?.[0];
                    if (hs?.audioSrc) {
                      if (activeAudioSrc === hs.audioSrc && isPlaying) {
                        audioRef.current?.pause();
                      } else {
                        switchTrack(hs.audioSrc);
                      }
                    }
                  }}
                  title="Play Audio Track A-05"
                />
              </div>

              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 font-sans">
                問題用紙
              </span>
            </div>

            {/* Authentic Direction Text */}
            {data.instruction && (
              <div 
                className="shinkanzen-listening-instruction mb-5"
                dangerouslySetInnerHTML={{ __html: data.instruction }}
              />
            )}

            {/* Questions (1) & (2) as authentic number boxes */}
            <div className="space-y-6">
              {data.questions?.map((q, qIdx) => {
                const qKey = `q-${qIdx}`;
                const userAnswer = answers[qKey];
                const isRevealed = revealed[qKey];
                const correctIdx = q.correctOption?.index;

                return (
                  <div key={qIdx} className="pb-5 border-b last:border-b-0 border-stone-200 dark:border-stone-700/60">
                    <div className="shinkanzen-number-box-wrapper">
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-200 w-8">
                        ({q.subNumber || qIdx + 1})
                      </span>

                      <div className="shinkanzen-number-box-grid">
                        {q.options?.map((optText, optIdx) => {
                          const isSelected = userAnswer === optIdx + 1;
                          const isCorrect = optIdx === correctIdx;

                          let cellClass = "shinkanzen-number-box-cell ";
                          if (isRevealed) {
                            if (isCorrect) cellClass += "correct";
                            else if (isSelected && !isCorrect) cellClass += "wrong";
                            else cellClass += "dimmed";
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => {
                                if (isRevealed) return;
                                setAnswers(prev => ({ ...prev, [qKey]: optIdx + 1 }));
                                setRevealed(prev => ({ ...prev, [qKey]: true }));
                              }}
                              disabled={isRevealed}
                              className={cellClass}
                              title={`Option ${optIdx + 1}`}
                            >
                              {optIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Explanation and spoken options on reveal */}
                    {isRevealed && (q.explanation || q.questionText) && (
                      <div className="mt-5 p-4 sm:p-5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/80 dark:bg-slate-900/60 shadow-xs space-y-3.5 animate-fadeIn">
                        {/* Header: Answer Badge & Explanation Title */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-200 dark:border-stone-700/70">
                          <div className="flex items-center gap-2">
                            <span className="shinkanzen-kotae-badge">
                              答え {correctIdx + 1}
                            </span>
                            <span className="text-xs font-bold text-stone-600 dark:text-stone-300 font-sans tracking-wide">
                              正解の理由・解説
                            </span>
                          </div>
                          {userAnswer && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              userAnswer === correctIdx + 1
                                ? 'text-emerald-700 dark:text-purple-300 bg-emerald-500/10 dark:bg-purple-500/20'
                                : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                            }`}>
                              {userAnswer === correctIdx + 1 ? '✓ 正解' : `あなたの選択: ${userAnswer}`}
                            </span>
                          )}
                        </div>

                        {/* Spoken Question */}
                        {q.questionText && (
                          <div className="p-3 bg-white dark:bg-slate-800/90 rounded-lg border border-stone-200 dark:border-stone-700">
                            <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 mb-1 font-sans uppercase tracking-wider">
                              【質問】
                            </div>
                            <div 
                              className="text-sm sm:text-base font-serif font-bold text-slate-800 dark:text-slate-100 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: q.questionText }}
                            />
                          </div>
                        )}

                        {/* Spoken Options */}
                        {q.spokenOptions && q.spokenOptions.length > 0 && (
                          <div className="p-3 bg-white dark:bg-slate-800/90 rounded-lg border border-stone-200 dark:border-stone-700">
                            <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 mb-1.5 font-sans uppercase tracking-wider">
                              【音声の選択肢】
                            </div>
                            <div className="space-y-1.5 text-xs sm:text-sm font-serif">
                              {q.spokenOptions.map((sOpt, sIdx) => {
                                const isOptCorrect = sIdx === correctIdx;
                                return (
                                  <div 
                                    key={sIdx} 
                                    className={`flex items-baseline justify-between p-1.5 rounded transition ${
                                      isOptCorrect 
                                        ? 'bg-emerald-500/10 dark:bg-purple-500/15 text-emerald-900 dark:text-purple-200 font-bold border border-emerald-500/20 dark:border-purple-500/30' 
                                        : 'text-stone-700 dark:text-stone-300'
                                    }`}
                                  >
                                    <span dangerouslySetInnerHTML={{ __html: sOpt }} />
                                    {isOptCorrect && (
                                      <span className="text-xs font-sans text-emerald-700 dark:text-purple-300 shrink-0 ml-2">✓ 正解</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Japanese Explanation */}
                        {q.explanation && (
                          <div className="space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-serif pt-0.5">
                            <div 
                              dangerouslySetInnerHTML={{ 
                                __html: q.explanation.replace(/^<b>【正解】\d+<\/b><br\/?>/, '') 
                              }} 
                            />
                          </div>
                        )}

                        {/* English Explanation */}
                        {q.explanationEn && (
                          <div className="pt-2 border-t border-stone-200/80 dark:border-stone-700/60 space-y-1">
                            <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 font-sans uppercase tracking-wider">
                              【English Explanation】
                            </div>
                            <div 
                              className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans"
                              dangerouslySetInnerHTML={{ __html: q.explanationEn }} 
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ================= STANDARD / MONDAI 1-4 QUESTION SHEET ================= */
          <div className="space-y-6 mb-8">
            {data.questions?.map((q, qIdx) => {
              const qKey = `q-${qIdx}`;
              const userAnswer = answers[qKey];
              const isRevealed = revealed[qKey];
              const correctIdx = q.correctOption?.index;
              const targetTrackCode = q.trackCode || currentTrackCode || `A-0${qIdx + 1}`;
              const questionAudioSrc = q.audioSrc || data.hotspots?.find(h => h.trackId === q.trackId)?.audioSrc || currentTrackObj?.audioSrc;
              const isNumberBoxOnly = q.optionsOnlyNumbers || chapterId === 'mondai-4' || q.options?.every(o => /^\d+$/.test(String(o).trim()));

              return (
                <div 
                  key={qIdx} 
                  className="shinkanzen-listening-paper rounded-xl p-5 sm:p-7 transition-all"
                >
                  {/* Authentic Question Header: Reidai Star + Earphone Badge */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-200 dark:border-stone-700/60">
                    <div className="flex items-center gap-3">
                      <div className="shinkanzen-reidai-star-badge text-xl font-bold flex items-baseline gap-1.5">
                        <span className="text-xl">☆</span>
                        <ruby className="text-lg font-bold">
                          例題<rt className="text-[10px] font-normal">れいだい</rt>
                        </ruby>
                        <span className="text-xl font-black ml-0.5">
                          {data.questions.length > 1 ? `${data.mondaiNumber || ''} (${qIdx + 1})` : (data.mondaiNumber || qIdx + 1)}
                        </span>
                      </div>

                      {/* Headphone Earphone Badge matching scanned book layout */}
                      <HeadphoneBadge
                        trackCode={targetTrackCode}
                        isPlaying={isPlaying && activeAudioSrc === questionAudioSrc}
                        onClick={() => {
                          if (questionAudioSrc) {
                            if (activeAudioSrc === questionAudioSrc && isPlaying) {
                              audioRef.current?.pause();
                            } else {
                              switchTrack(questionAudioSrc);
                            }
                          }
                        }}
                        title={`Play Audio Track ${targetTrackCode}`}
                      />
                    </div>

                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 font-sans">
                      問題用紙
                    </span>
                  </div>

                  {/* Question-Specific Illustration if not Mondai 4 */}
                  {q.illustrationSrc && chapterId !== 'mondai-4' && (
                    <div className="mb-4 p-3 bg-white dark:bg-slate-900 rounded-lg border border-stone-200 dark:border-stone-700 text-center">
                      <img 
                        src={resolvePublicUrl(q.illustrationSrc)} 
                        alt="Question Illustration" 
                        className="max-h-56 mx-auto object-contain drop-shadow-sm rounded-lg"
                      />
                    </div>
                  )}

                  {/* Authentic Direction Text (この問題では...) */}
                  {(q.instruction || data.instruction) && (
                    <div 
                      className="shinkanzen-listening-instruction"
                      dangerouslySetInnerHTML={{ __html: q.instruction || data.instruction }}
                    />
                  )}

                  {/* OPTIONS RENDERING */}
                  {isNumberBoxOnly ? (
                    /* NUMBER BOX FOR MONDAI 4 & NUMERIC OPTIONS (No text, only numbers in a box) */
                    <div>
                      <div className="shinkanzen-number-box-wrapper">
                        <div className="shinkanzen-number-box-grid">
                          {q.options?.map((optText, optIdx) => {
                            const isSelected = userAnswer === optIdx + 1;
                            const isCorrect = optIdx === correctIdx;

                            let cellClass = "shinkanzen-number-box-cell ";
                            if (isRevealed) {
                              if (isCorrect) cellClass += "correct";
                              else if (isSelected && !isCorrect) cellClass += "wrong";
                              else cellClass += "dimmed";
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => {
                                  if (isRevealed) return;
                                  setAnswers(prev => ({ ...prev, [qKey]: optIdx + 1 }));
                                  setRevealed(prev => ({ ...prev, [qKey]: true }));
                                }}
                                disabled={isRevealed}
                                className={cellClass}
                                title={`Option ${optIdx + 1}`}
                              >
                                {optIdx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mondai 4 Scene Illustration placed right below the number box */}
                      {(chapterId === 'mondai-4' && (q.illustrationSrc || data.illustrationSrc)) && (
                        <div className="my-5 p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-xl border border-stone-200 dark:border-stone-700 text-center">
                          <img 
                            src={resolvePublicUrl(q.illustrationSrc || data.illustrationSrc)} 
                            alt="Problem Scene Illustration" 
                            className="max-h-72 mx-auto object-contain drop-shadow-sm rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    /* STANDARD OPTION ROWS (Mondai 1, 2, 3) */
                    <div className="shinkanzen-listening-options">
                      {q.options?.map((optText, optIdx) => {
                        const isSelected = userAnswer === optIdx + 1;
                        const isCorrect = optIdx === correctIdx;

                        let optClass = "shinkanzen-listening-option-row";
                        if (isRevealed) {
                          if (isCorrect) optClass += " correct";
                          else if (isSelected && !isCorrect) optClass += " wrong";
                          else optClass += " dimmed";
                        }

                        // Format option text cleanly (strip leading digits like "1. ")
                        const cleanOptText = optText.replace(/^\d+[\.\s　]*/, '');

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
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-baseline gap-3">
                                <span className="font-bold shrink-0 text-base">{optIdx + 1}</span>
                                <span dangerouslySetInnerHTML={{ __html: cleanOptText }} />
                              </div>
                              {isRevealed && isCorrect && (
                                <span className="text-emerald-700 dark:text-purple-300 font-bold text-xs shrink-0 bg-emerald-500/10 dark:bg-purple-500/20 px-2 py-0.5 rounded border border-emerald-500/20 dark:border-purple-500/30">
                                  ✓ 正解
                                </span>
                              )}
                              {isRevealed && isSelected && !isCorrect && (
                                <span className="text-rose-700 dark:text-rose-400 font-bold text-xs shrink-0 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                  ✗ 不正解
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Authentic Kaisetsu / Explanation (Shown after selection) */}
                  {isRevealed && (q.explanation || q.questionText) && (
                    <div className="mt-5 p-4 sm:p-5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/80 dark:bg-slate-900/60 shadow-xs space-y-3.5 animate-fadeIn">
                      {/* Header: Answer Badge & Explanation Title */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-200 dark:border-stone-700/70">
                        <div className="flex items-center gap-2">
                          <span className="shinkanzen-kotae-badge">
                            答え {correctIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-stone-600 dark:text-stone-300 font-sans tracking-wide">
                            正解の理由・解説
                          </span>
                        </div>
                        {userAnswer && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            userAnswer === correctIdx + 1
                              ? 'text-emerald-700 dark:text-purple-300 bg-emerald-500/10 dark:bg-purple-500/20'
                              : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                          }`}>
                            {userAnswer === correctIdx + 1 ? '✓ 正解' : `あなたの選択: ${userAnswer}`}
                          </span>
                        )}
                      </div>

                      {/* Spoken Question */}
                      {q.questionText && (
                        <div className="p-3 bg-white dark:bg-slate-800/90 rounded-lg border border-stone-200 dark:border-stone-700">
                          <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 mb-1 font-sans uppercase tracking-wider">
                            【質問】
                          </div>
                          <div 
                            className="text-sm sm:text-base font-serif font-bold text-slate-800 dark:text-slate-100 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: q.questionText }}
                          />
                        </div>
                      )}

                      {/* Spoken Options (For Mondai 4 or numeric options) */}
                      {q.spokenOptions && q.spokenOptions.length > 0 && (
                        <div className="p-3 bg-white dark:bg-slate-800/90 rounded-lg border border-stone-200 dark:border-stone-700">
                          <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 mb-1.5 font-sans uppercase tracking-wider">
                            【音声の選択肢】
                          </div>
                          <div className="space-y-1.5 text-xs sm:text-sm font-serif">
                            {q.spokenOptions.map((sOpt, sIdx) => {
                              const isOptCorrect = sIdx === correctIdx;
                              return (
                                <div 
                                  key={sIdx} 
                                  className={`flex items-baseline justify-between p-1.5 rounded transition ${
                                    isOptCorrect 
                                      ? 'bg-emerald-500/10 dark:bg-purple-500/15 text-emerald-900 dark:text-purple-200 font-bold border border-emerald-500/20 dark:border-purple-500/30' 
                                      : 'text-stone-700 dark:text-stone-300'
                                  }`}
                                >
                                  <span dangerouslySetInnerHTML={{ __html: sOpt }} />
                                  {isOptCorrect && (
                                    <span className="text-xs font-sans text-emerald-700 dark:text-purple-300 shrink-0 ml-2">✓ 正解</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Japanese Explanation */}
                      {q.explanation && (
                        <div className="space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-serif pt-0.5">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: q.explanation.replace(/^<b>【正解】\d+<\/b><br\/?>/, '') 
                            }} 
                          />
                        </div>
                      )}

                      {/* English Explanation */}
                      {q.explanationEn && (
                        <div className="pt-2 border-t border-stone-200/80 dark:border-stone-700/60 space-y-1">
                          <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 font-sans uppercase tracking-wider">
                            【English Explanation】
                          </div>
                          <div 
                            className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans"
                            dangerouslySetInnerHTML={{ __html: q.explanationEn }} 
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================= AUTHENTIC SCRIPT (スクリプト) DRAWER ================= */}
        <div className="shinkanzen-listening-paper rounded-xl overflow-hidden mb-8">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-stone-200 dark:border-stone-700/60">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold">📜</span>
              <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 m-0">
                スクリプト (Script)
              </h3>
            </div>
            
            <button 
              onClick={() => setShowScript(!showScript)} 
              className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1 border border-stone-300 dark:border-stone-700 cursor-pointer"
            >
              {showScript ? 'Hide Script ▲' : 'Show Script ▼'}
            </button>
          </div>

          {showScript && (
            <div className="p-5 sm:p-7 space-y-3.5 bg-stone-50/60 dark:bg-slate-900/40">
              {data.transcript?.map((line, idx) => (
                <div key={idx} className="flex items-baseline gap-3 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
                  {line.speaker && (
                    <span className={`shrink-0 font-bold text-xs sm:text-sm px-2 py-0.5 rounded ${getSpeakerBadgeStyle(line.speaker)}`}>
                      {line.speaker}
                    </span>
                  )}
                  <div 
                    className="font-serif leading-loose flex-1 text-slate-800 dark:text-slate-100"
                    dangerouslySetInnerHTML={{ __html: line.text }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= BOTTOM PAGINATION & NAVIGATION ================= */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-stone-700/80">
          <button
            onClick={() => prevChapter && navigateToChapter(prevChapter.id)}
            disabled={!prevChapter}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              prevChapter
                ? 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500 dark:hover:border-purple-500 hover:shadow-sm cursor-pointer'
                : 'opacity-40 bg-slate-100 dark:bg-slate-900 text-slate-400 cursor-not-allowed border border-transparent'
            }`}
          >
            &larr; Previous Section
          </button>

          <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
            Section {currentChapterIndex + 1} of {allChapters.length}
          </span>

          <button
            onClick={() => nextChapter && navigateToChapter(nextChapter.id)}
            disabled={!nextChapter}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              nextChapter
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white shadow-md shadow-emerald-600/15 dark:shadow-purple-600/15 cursor-pointer active:scale-95'
                : 'opacity-40 bg-slate-100 dark:bg-slate-900 text-slate-400 cursor-not-allowed'
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
