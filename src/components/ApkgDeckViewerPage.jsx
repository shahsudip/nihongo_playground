// src/components/ApkgDeckViewerPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoadedApkgDeck } from '../utils/apkgReader';
import { stripAnkiHtml } from '../utils/ankiParser';
import RawFieldsTable from './RawFieldsTable';
import ThemeToggle from './ThemeToggle.jsx';

const SpeakerIcon = ({ onClick }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
    className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-emerald-600 dark:hover:bg-indigo-600 hover:text-white text-[var(--color-text-primary)] transition-all cursor-pointer shadow-sm"
    title="Play Audio"
  >
    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  </button>
);

const AudioControlsGroup = ({ card, onPlaySentence, onPlayWord, onPlayDefault }) => {
  if (card?.sentenceAudio && card?.wordAudio) {
    return (
      <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlaySentence();
          }}
          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-indigo-950/50 hover:bg-emerald-600 dark:hover:bg-indigo-600 hover:text-white text-emerald-700 dark:text-indigo-300 border border-emerald-200 dark:border-indigo-800 text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          title="Play Sentence Audio (Hotkey: S or R)"
        >
          <span>🔊</span> Sentence <span className="text-[10px] opacity-75 font-mono">(S)</span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlayWord();
          }}
          className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-purple-950/50 hover:bg-teal-600 dark:hover:bg-purple-600 hover:text-white text-teal-700 dark:text-purple-300 border border-teal-200 dark:border-purple-800 text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          title="Play Word Audio (Hotkey: W)"
        >
          <span>🗣️</span> Word <span className="text-[10px] opacity-75 font-mono">(W)</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onPlayDefault();
      }}
      className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-emerald-600 dark:hover:bg-indigo-600 hover:text-white text-[var(--color-text-primary)] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm text-xs font-bold"
      title="Listen Audio (Hotkey: R)"
    >
      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </svg>
      <span className="text-[10px] opacity-75 font-mono">(R)</span>
    </button>
  );
};

const playAudioOrTTS = (audioUrl, japaneseText) => {
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(() => speakTTS(japaneseText));
  } else {
    speakTTS(japaneseText);
  }
};

const speakTTS = (text) => {
  if (!window.speechSynthesis || !text) return;
  const clean = stripAnkiHtml(text);
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ApkgDeckViewerPage = () => {
  const navigate = useNavigate();
  const deck = getLoadedApkgDeck();

  const [activeTab, setActiveTab] = useState('card'); // 'card', 'fields', 'explorer'
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);

  // Jump to index input state
  const [jumpInput, setJumpInput] = useState('1');

  // Search filter for Card Explorer
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (!deck || !deck.cards || deck.cards.length === 0) return;
    setCards(deck.cards);
    setCurrentIndex(0);
    setJumpInput('1');
  }, [deck]);

  useEffect(() => {
    setJumpInput(String(currentIndex + 1));
  }, [currentIndex]);

  const handleShuffleToggle = () => {
    if (!deck?.cards) return;
    if (!isShuffled) {
      setCards(shuffle(deck.cards));
      setIsShuffled(true);
      setCurrentIndex(0);
      setIsFlipped(false);
    } else {
      setCards(deck.cards);
      setIsShuffled(false);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
    if (cards[currentIndex]) {
      playAudioOrTTS(cards[currentIndex].audio, cards[currentIndex].expression);
    }
  }, [cards, currentIndex]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop back to first card
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= cards.length) {
      setCurrentIndex(num - 1);
      setIsFlipped(false);
    } else {
      setJumpInput(String(currentIndex + 1));
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight' || e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'r' || e.key === 'R' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (cards[currentIndex]) {
          playAudioOrTTS(
            cards[currentIndex].sentenceAudio || cards[currentIndex].audio,
            cards[currentIndex].sentencePlain || cards[currentIndex].expression
          );
        }
      } else if (e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        if (cards[currentIndex]) {
          playAudioOrTTS(
            cards[currentIndex].wordAudio || cards[currentIndex].audio,
            cards[currentIndex].expression
          );
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setShowFurigana(p => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleFlip, handleNext, handlePrev, cards, currentIndex]);

  // If no deck is loaded
  if (!deck || cards.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-8 rounded-3xl max-w-md w-full text-center shadow-xl">
          <div className="text-5xl mb-4">🎴</div>
          <h2 className="text-2xl font-black mb-2">No APKG Deck Loaded</h2>
          <p className="text-xs text-[var(--color-text-muted)] mb-6">
            Please select and open a .apkg deck file from the Anki Decks page.
          </p>
          <button
            onClick={() => navigate('/anki-decks')}
            className="w-full py-3 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow hover:opacity-95 transition-all text-sm"
          >
            ← Open Anki Decks
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  const filteredExplorerCards = cards.filter(c => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      (c.expression && c.expression.toLowerCase().includes(q)) ||
      (c.meaning && c.meaning.toLowerCase().includes(q)) ||
      (c.sentencePlain && c.sentencePlain.toLowerCase().includes(q)) ||
      (c.rawFields && c.rawFields.some(f => f && f.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto py-2 px-4 flex flex-col items-center select-none text-[var(--color-text-primary)]">
      {/* Top Header Controls Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 mb-3 pb-2 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
          <button
            onClick={() => navigate('/anki-decks')}
            className="px-3 py-1.5 border border-black/20 dark:border-white/20 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold transition-all"
          >
            ← All Decks
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-black truncate max-w-xs sm:max-w-md text-gray-900 dark:text-white">
              {deck.deckTitle}
            </h1>
            <span className="text-[11px] text-[var(--color-text-muted)] font-semibold">
              {cards.length} Cards in Deck
            </span>
          </div>
        </div>

        {/* View Mode Tabs (Card, All Fields, Explorer) */}
        <div className="flex items-center gap-1.5 bg-[#ede3ce] dark:bg-zinc-800 p-1 rounded-xl border border-[#decfae] dark:border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-3 py-1 rounded-lg font-black transition-all ${
              activeTab === 'card'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }`}
          >
            🎴 Card Flip
          </button>
          <button
            onClick={() => setActiveTab('fields')}
            className={`px-3 py-1 rounded-lg font-black transition-all ${
              activeTab === 'fields'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }`}
          >
            📋 Raw Fields ({currentCard?.rawFields ? currentCard.rawFields.length : 0})
          </button>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-3 py-1 rounded-lg font-black transition-all ${
              activeTab === 'explorer'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
            }`}
          >
            🔍 All Cards
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'card' && (
        <div className="w-full">
          {/* Card Controls Bar */}
          <div className="w-full flex items-center justify-between text-xs mb-2 font-semibold">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-50 dark:bg-indigo-950/40 text-emerald-700 dark:text-indigo-300 rounded-lg text-xs font-black border border-emerald-500/20 dark:border-indigo-500/20">
                Word {currentIndex + 1} of {cards.length}
              </span>
              {currentCard?.archetype && (
                <span className="px-2.5 py-1 bg-[#ede3ce] dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                  {currentCard.archetype}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFurigana(prev => !prev)}
                className={`px-3 py-1 rounded-lg font-bold border transition-all ${
                  showFurigana
                    ? 'bg-emerald-50 dark:bg-indigo-950/40 text-emerald-700 dark:text-indigo-400 border-emerald-300 dark:border-indigo-500/30'
                    : 'bg-[#ede3ce] dark:bg-zinc-800 text-gray-700 dark:text-gray-400 border-transparent'
                }`}
                title="Toggle Furigana (Hotkey: F)"
              >
                ふりがな {showFurigana ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setIsShuffled(prev => !prev)}
                className={`px-3 py-1 rounded-lg font-bold border border-transparent transition-all ${
                  isShuffled
                    ? 'bg-teal-100 dark:bg-purple-950/40 text-teal-800 dark:text-purple-300 border-teal-400/40'
                    : 'hover:text-emerald-600 dark:hover:text-purple-400'
                }`}
                title="Shuffle Deck Order"
              >
                🔀 {isShuffled ? 'Shuffled' : 'Sequential'}
              </button>

              <ThemeToggle compact={true} />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#decfae] dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-purple-500 dark:via-indigo-500 dark:to-purple-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Interactive 3D Flip Flashcard - Full Size Adaptive */}
          <div className="w-full [perspective:1200px] mb-3">
            <div
              onClick={handleFlip}
              className="w-full grid [grid-template-areas:'stack'] cursor-pointer relative select-none transition-transform duration-500 ease-out [transform-style:preserve-3d]"
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ======================================================== */}
              {/* FRONT FACE                                               */}
              {/* ======================================================== */}
              <div className="[grid-area:stack] w-full min-h-[360px] sm:min-h-[380px] rounded-2xl p-6 sm:p-8 border-2 border-[#decfae] dark:border-white/10 bg-[#fcf9f2] dark:bg-zinc-900 shadow-xl flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(0deg)] hover:border-[#cbbe9f] dark:hover:border-white/25 transition-colors">
                {/* Top Indicator */}
                <div className="flex items-center justify-between w-full">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-indigo-950/40 text-emerald-700 dark:text-indigo-300 text-[11px] font-extrabold uppercase">
                    Front Face (Prompt)
                  </span>
                </div>

                {/* Front Content */}
                <div className="text-center my-auto py-4 space-y-4">
                  {/* Media Image / Anime Screenshot if present */}
                  {currentCard.image && (
                    <div className="max-w-[440px] max-h-[250px] mx-auto rounded-xl overflow-hidden shadow border border-black/10 dark:border-white/10">
                      <img
                        src={currentCard.image}
                        alt="Card media"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Japanese Expression / Headword */}
                  <div className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight ${!showFurigana ? 'hide-furigana' : ''}`}>
                    <span dangerouslySetInnerHTML={{ __html: currentCard.furigana || currentCard.expression }} />
                  </div>

                  {/* Front Context Sentence */}
                  {currentCard.sentencePlain && (
                    <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic px-4 leading-relaxed">
                      "{currentCard.sentencePlain}"
                    </div>
                  )}
                </div>

                <div />
              </div>

              {/* ======================================================== */}
              {/* BACK FACE                                                */}
              {/* ======================================================== */}
              <div className="[grid-area:stack] w-full min-h-[360px] sm:min-h-[380px] rounded-2xl p-6 sm:p-8 border-2 border-emerald-500/40 dark:border-indigo-500/40 bg-gradient-to-br from-[#fcf9f2] to-[#ede3ce] dark:from-zinc-900 dark:to-indigo-950/40 shadow-xl flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] transition-colors">
                {/* Top Indicator */}
                <div className="flex items-center justify-between w-full">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-indigo-950/40 text-emerald-700 dark:text-indigo-300 text-[11px] font-extrabold uppercase">
                    Back Face (Answer)
                  </span>
                </div>

                {/* Back Content */}
                <div className="text-center my-auto py-4 space-y-4">
                  {/* Media Image if present */}
                  {currentCard.image && (
                    <div className="max-w-[440px] max-h-[250px] mx-auto rounded-xl overflow-hidden shadow border border-black/10 dark:border-white/10">
                      <img
                        src={currentCard.image}
                        alt="Card media"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Target Expression */}
                  <div className="inline-flex items-center justify-center gap-2">
                    <span className={`text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-700 dark:text-indigo-400 ${!showFurigana ? 'hide-furigana' : ''}`}>
                      <span dangerouslySetInnerHTML={{ __html: currentCard.furigana || currentCard.expression }} />
                    </span>
                    {currentCard.wordAudio && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudioOrTTS(currentCard.wordAudio, currentCard.expression);
                        }}
                        className="p-1.5 rounded-full bg-teal-100 dark:bg-purple-950/60 hover:bg-teal-600 dark:hover:bg-purple-600 hover:text-white text-teal-800 dark:text-purple-300 border border-teal-300 dark:border-purple-800 transition-all cursor-pointer shadow-sm"
                        title="Play Word Audio (Hotkey: W)"
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* English Definition / Meaning */}
                  {currentCard.conciseMeaning ? (
                    <div className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                      {currentCard.conciseMeaning}
                    </div>
                  ) : !currentCard.meaning?.includes('<') ? (
                    <div className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                      {currentCard.meaning}
                    </div>
                  ) : null}

                  {/* Context Sentences with Ruby Furigana */}
                  {currentCard.sentences && currentCard.sentences.length > 0 ? (
                    <div className={`grid gap-2.5 max-w-3xl mx-auto text-left ${currentCard.sentences.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                      {currentCard.sentences.map((st, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-indigo-950/30 border border-emerald-200/50 dark:border-indigo-900/50 space-y-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-indigo-400">
                                📖 Example {currentCard.sentences.length > 1 ? `#${sIdx + 1}` : ''}
                              </span>
                              {st.audio && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playAudioOrTTS(st.audio, st.jaPlain);
                                  }}
                                  className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-indigo-900/60 hover:bg-emerald-600 dark:hover:bg-indigo-600 hover:text-white text-emerald-800 dark:text-indigo-300 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-0.5"
                                  title="Play audio for this sentence"
                                >
                                  <span>🔊</span> Listen
                                </button>
                              )}
                            </div>
                            <div
                              className={`tsc-sentence font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-snug ${!showFurigana ? 'hide-furigana' : ''}`}
                              dangerouslySetInnerHTML={{ __html: st.ja }}
                            />
                          </div>
                          {st.en && (
                            <div
                              className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 italic pt-1 border-t border-black/5 dark:border-white/5"
                              dangerouslySetInnerHTML={{ __html: st.en }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : currentCard.sentence ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-indigo-950/30 text-left text-xs sm:text-sm border border-emerald-200/50 dark:border-indigo-900/50 space-y-1.5 max-w-2xl mx-auto leading-relaxed">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-indigo-400">
                          {currentCard.layoutType === 'anime' ? '🎬 Anime Dialogue' : '📖 Context Sentence'}
                        </span>
                        {currentCard.sentenceAudio && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudioOrTTS(currentCard.sentenceAudio, currentCard.sentencePlain || currentCard.expression);
                            }}
                            className="px-2 py-0.5 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white text-[11px] font-bold shadow-sm flex items-center gap-1 transition-all cursor-pointer"
                            title="Play Sentence Audio (Hotkey: S or R)"
                          >
                            <span>🔊 Sentence</span>
                            <span className="text-[10px] opacity-75 font-mono">(S)</span>
                          </button>
                        )}
                      </div>
                      <div className={`tsc-sentence font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-relaxed ${!showFurigana ? 'hide-furigana' : ''}`}>
                        <span dangerouslySetInnerHTML={{ __html: currentCard.sentence }} />
                      </div>
                      {currentCard.sentenceEng && (
                        <div
                          className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic pt-0.5"
                          dangerouslySetInnerHTML={{ __html: currentCard.sentenceEng }}
                        />
                      )}
                    </div>
                  ) : null}

                  {/* Yomitan Rich Glossary Definition */}
                  {(currentCard.primaryDefinition || (currentCard.meaning && currentCard.meaning.includes('<'))) && (
                    <div className="p-4 rounded-xl bg-[#fcf9f2] dark:bg-zinc-900 border border-[#decfae] dark:border-white/10 shadow-sm space-y-2 text-left max-w-2xl mx-auto">
                      <div className="text-xs font-black uppercase text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                        <span>📖</span> Dictionary Definition
                      </div>
                      <div
                        className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed yomitan-breakdown select-text"
                        dangerouslySetInnerHTML={{ __html: currentCard.primaryDefinition || currentCard.meaning }}
                      />
                    </div>
                  )}

                  {/* Tags */}
                  {currentCard.tags && currentCard.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                      {currentCard.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-0.5 rounded-full bg-[#ede3ce] dark:bg-white/10 text-xs font-bold text-gray-700 dark:text-gray-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div />
              </div>
            </div>
          </div>

          {/* Reader Navigation Controls */}
          <div className="w-full flex items-center justify-between gap-3 mt-3">
            <button
              onClick={handlePrev}
              className="flex-1 py-2.5 border border-black/20 dark:border-white/20 font-bold rounded-xl hover:bg-[#ede3ce] dark:hover:bg-purple-950/40 dark:hover:border-purple-500/40 transition-all text-xs flex items-center justify-center gap-1 text-gray-800 dark:text-white"
            >
              ← Prev (<kbd className="font-mono text-[10px]">K</kbd> / <kbd className="font-mono text-[10px]">←</kbd>)
            </button>
            <button
              onClick={handleFlip}
              className="px-6 py-2.5 bg-emerald-50 dark:bg-purple-950/40 text-emerald-700 dark:text-purple-300 font-bold rounded-xl border border-emerald-500/30 dark:border-purple-500/30 hover:bg-emerald-100 dark:hover:bg-purple-900/60 transition-all text-xs"
            >
              {isFlipped ? 'Hide Answer' : 'Show Answer'} (<kbd className="font-mono text-[10px]">Space</kbd>)
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl shadow transition-all text-xs flex items-center justify-center gap-1"
            >
              Next → (<kbd className="font-mono text-[10px]">J</kbd> / <kbd className="font-mono text-[10px]">→</kbd>)
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: All Fields Inspector (Complete SQLite Data)       */}
      {/* ========================================================= */}
      {activeTab === 'fields' && (
        <RawFieldsTable
          card={currentCard}
          currentIndex={currentIndex}
          totalCards={cards.length}
          onPrev={handlePrev}
          onNext={handleNext}
          mediaMap={deck?.mediaMap || {}}
        />
      )}

      {/* ========================================================= */}
      {/* MODE 3: Card Explorer / Full Deck Directory               */}
      {/* ========================================================= */}
      {activeTab === 'explorer' && (
        <div className="w-full animate-fade-in">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search words, meanings, dialogue sentences, or fields..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#decfae] dark:border-white/10 bg-[#fcf9f2] dark:bg-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-indigo-500 shadow-sm text-gray-900 dark:text-white"
            />
          </div>

          <div className="text-xs text-gray-700 dark:text-gray-300 font-bold mb-3 px-1">
            Showing {filteredExplorerCards.length} of {cards.length} cards
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredExplorerCards.map((c, idx) => (
              <div
                key={c.id || idx}
                className="bg-[#fcf9f2] dark:bg-zinc-900 border border-[#decfae] dark:border-white/10 rounded-xl p-4 shadow-sm hover:border-emerald-500/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {c.image && (
                    <div className="mb-2 h-28 rounded-lg overflow-hidden border border-[#decfae] dark:border-white/10">
                      <img src={c.image} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-lg font-black text-emerald-700 dark:text-indigo-400">
                      {c.expression}
                    </span>
                    <SpeakerIcon onClick={() => playAudioOrTTS(c.audio, c.expression)} />
                  </div>

                  {c.furigana && (
                    <div
                      className="text-xs text-gray-600 dark:text-gray-400 font-bold mb-1.5"
                      dangerouslySetInnerHTML={{ __html: c.furigana }}
                    />
                  )}

                  <div className="text-xs font-bold text-gray-900 dark:text-white mb-1.5">
                    {c.meaning}
                  </div>

                  {c.sentencePlain && (
                    <div className="text-[11px] text-gray-700 dark:text-gray-300 italic line-clamp-2">
                      "{c.sentencePlain}"
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    const foundIdx = cards.findIndex(card => card.id === c.id);
                    if (foundIdx !== -1) {
                      setCurrentIndex(foundIdx);
                      setActiveTab('card');
                    }
                  }}
                  className="mt-3 w-full py-1.5 border border-emerald-500/30 dark:border-indigo-500/30 hover:bg-emerald-50 dark:hover:bg-indigo-950/40 text-emerald-700 dark:text-indigo-300 rounded-lg text-xs font-bold transition-all"
                >
                  Open in Card View →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApkgDeckViewerPage;
