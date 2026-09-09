// src/components/TangoReadingPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { db } from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import '../assets/tango_reading.css';

// Eagerly load all local Tango raw JSON modules
const tangoN3Modules = import.meta.glob('../data/tango_n3_raw/*.json', { eager: true });
const tangoN2Modules = import.meta.glob('../data/tango_n2_raw/*.json', { eager: true });
const tangoN1Modules = import.meta.glob('../data/tango_n1_raw/*.json', { eager: true });

// Standard topic metadata for Tango series
const TANGO_TOPIC_NAMES = {
  tango_n3: [
    { id: 'topic_01', num: 1, title: 'Topic 1: 食事 (Food & Dining)', en: 'Food & Dining' },
    { id: 'topic_02', num: 2, title: 'Topic 2: 買い物 (Shopping & Goods)', en: 'Shopping & Goods' },
    { id: 'topic_03', num: 3, title: 'Topic 3: ファッション (Fashion & Clothing)', en: 'Fashion & Style' },
    { id: 'topic_04', num: 4, title: 'Topic 4: 家 (Home & Living)', en: 'Home & Housing' },
    { id: 'topic_05', num: 5, title: 'Topic 5: まち (Town & Facilities)', en: 'Town & Neighborhood' },
    { id: 'topic_06', num: 6, title: 'Topic 6: 交通 (Transit & Transportation)', en: 'Transit & Commute' },
    { id: 'topic_07', num: 7, title: 'Topic 7: 休暇 (Leisure & Vacations)', en: 'Leisure & Holidays' },
    { id: 'topic_08', num: 8, title: 'Topic 8: 自然・環境 (Nature & Weather)', en: 'Nature & Climate' },
    { id: 'topic_09', num: 9, title: 'Topic 9: 動物 (Animals & Pets)', en: 'Animals & Ecology' },
    { id: 'topic_10', num: 10, title: 'Topic 10: 学校・教育 (School & Studies)', en: 'School & Education' },
    { id: 'topic_11', num: 11, title: 'Topic 11: 仕事 (Work & Office)', en: 'Work & Employment' },
    { id: 'topic_12', num: 12, title: 'Topic 12: 旅行 (Travel & Sightseeing)', en: 'Travel & Journeys' }
  ],
  tango_n2: [
    { id: 'topic_01', num: 1, title: 'Topic 1: 食事 (Food & Dining)', en: 'Food & Dining' },
    { id: 'topic_02', num: 2, title: 'Topic 2: 家事 (Housework & Living)', en: 'Housework & Living' },
    { id: 'topic_03', num: 3, title: 'Topic 3: 買い物 (Shopping)', en: 'Shopping' },
    { id: 'topic_04', num: 4, title: 'Topic 4: ファッション (Fashion)', en: 'Fashion' },
    { id: 'topic_05', num: 5, title: 'Topic 5: テクノロジー (Technology)', en: 'Technology' },
    { id: 'topic_06', num: 6, title: 'Topic 6: 流行 (Trends & Pop Culture)', en: 'Trends & Pop Culture' },
    { id: 'topic_07', num: 7, title: 'Topic 7: 趣味 (Hobbies & Interests)', en: 'Hobbies & Interests' },
    { id: 'topic_08', num: 8, title: 'Topic 8: 人付き合い (Relationships)', en: 'Relationships' },
    { id: 'topic_09', num: 9, title: 'Topic 9: 年中行事 (Annual Events)', en: 'Annual Events' },
    { id: 'topic_10', num: 10, title: 'Topic 10: スポーツ (Sports & Fitness)', en: 'Sports & Fitness' },
    { id: 'topic_11', num: 11, title: 'Topic 11: 動物 (Animals)', en: 'Animals' },
    { id: 'topic_12', num: 12, title: 'Topic 12: 住 (Housing)', en: 'Housing' },
    { id: 'topic_13', num: 13, title: 'Topic 13: 町 (Town & Urban Life)', en: 'Town & Urban Life' },
    { id: 'topic_14', num: 14, title: 'Topic 14: 天気 (Weather & Climate)', en: 'Weather & Climate' },
    { id: 'topic_15', num: 15, title: 'Topic 15: 旅行 (Travel & Vacations)', en: 'Travel & Vacations' },
    { id: 'topic_16', num: 16, title: 'Topic 16: 学校 (School & Academia)', en: 'School & Academia' },
    { id: 'topic_17', num: 17, title: 'Topic 17: 仕事 (Work & Employment)', en: 'Work & Employment' },
    { id: 'topic_18', num: 18, title: 'Topic 18: 人生 (Life & Society)', en: 'Life & Society' },
    { id: 'topic_19', num: 19, title: 'Topic 19: 健康 (Health & Medical)', en: 'Health & Medical' },
    { id: 'topic_20', num: 20, title: 'Topic 20: マナー (Manners & Etiquette)', en: 'Manners & Etiquette' },
    { id: 'topic_21', num: 21, title: 'Topic 21: 社会 (Society & Economy)', en: 'Society & Economy' },
    { id: 'topic_22', num: 22, title: 'Topic 22: 政治 (Politics & Law)', en: 'Politics & Law' },
    { id: 'topic_23', num: 23, title: 'Topic 23: 環境・科学 (Environment & Science)', en: 'Environment & Science' }
  ],
  tango_n1: Array.from({ length: 27 }, (_, i) => ({
    id: `topic_${String(i + 1).padStart(2, '0')}`,
    num: i + 1,
    title: `Topic ${i + 1}`,
    en: `Topic ${i + 1} Advanced Vocabulary`
  }))
};

export default function TangoReadingPage() {
  const { bookId = 'tango_n3', chapterId = 'topic_01' } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Study Mode State: 'reader' | 'drill' | 'flashcards' | 'quiz' | 'glossary'
  const [studyMode, setStudyMode] = useState('reader');

  // Display Preferences
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('tango_font_size') || 'normal');
  const [furiganaMode, setFuriganaMode] = useState('all'); // 'all' | 'target-only' | 'none'
  const [showTranslation, setShowTranslation] = useState(false);

  // Audio / TTS State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate] = useState(1.0);

  // Story & Flashcard Navigation
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Word Inspector Modal (Reader Mode)
  const [inspectedWord, setInspectedWord] = useState(null);

  // Mastery Tracking (stored in localStorage per book)
  const [masteredWords, setMasteredWords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`tango_mastery_${bookId}`)) || {};
    } catch {
      return {};
    }
  });

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Loading & Error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Persist font size
  useEffect(() => {
    localStorage.setItem('tango_font_size', fontSize);
  }, [fontSize]);

  // Persist mastery state
  useEffect(() => {
    try {
      localStorage.setItem(`tango_mastery_${bookId}`, JSON.stringify(masteredWords));
    } catch (e) {
      console.error("Failed to persist mastery:", e);
    }
  }, [masteredWords, bookId]);

  // Load Stories from Local Modules and Sync with Firestore
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setShowTranslation(false);
    setCurrentStoryIndex(0);
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setQuizAnswers({});
    setQuizSubmitted(false);

    try {
      let activeModules = tangoN3Modules;
      if (bookId === 'tango_n2') activeModules = tangoN2Modules;
      else if (bookId === 'tango_n1') activeModules = tangoN1Modules;

      // Extract topic number from chapterId (e.g. topic_01 -> 1)
      const topicMatch = chapterId.match(/topic_(\d+)/i) || chapterId.match(/(\d+)/);
      const targetTopicNum = topicMatch ? parseInt(topicMatch[1], 10) : 1;

      const loadedStories = [];
      Object.keys(activeModules).forEach(key => {
        const mod = activeModules[key].default || activeModules[key];
        if (!mod) return;

        // Check if file belongs to target topic
        const title = mod.title || '';
        const titleMatch = title.match(/Topic\s*(\d+)/i);
        const storyTopicNum = titleMatch ? parseInt(titleMatch[1], 10) : 1;

        if (storyTopicNum === targetTopicNum) {
          loadedStories.push({
            id: key.replace(/.*\/([^/]+)\.json$/, '$1'),
            ...mod
          });
        }
      });

      // Sort stories naturally (by story_number or page_story)
      loadedStories.sort((a, b) => {
        if (a.story_number !== undefined && b.story_number !== undefined && a.story_number !== b.story_number) {
          return a.story_number - b.story_number;
        }
        return (a.page_story || a.id).localeCompare(b.page_story || b.id, undefined, { numeric: true });
      });

      if (loadedStories.length > 0 && isMounted) {
        setStories(loadedStories);
        setLoading(false);
      }
    } catch (err) {
      console.warn("Local Tango loading error:", err);
    }

    // Also query Firestore for the latest live stories
    const fetchFromFirestore = async () => {
      try {
        const storiesColRef = collection(db, 'books', bookId, 'topics', chapterId, 'stories');
        const snap = await getDocs(storiesColRef);
        if (!snap.empty && isMounted) {
          const remoteStories = [];
          snap.forEach(docSnap => {
            remoteStories.push({ id: docSnap.id, ...docSnap.data() });
          });

          remoteStories.sort((a, b) => {
            if (a.story_number !== undefined && b.story_number !== undefined && a.story_number !== b.story_number) {
              return a.story_number - b.story_number;
            }
            return (a.page_story || a.id).localeCompare(b.page_story || b.id, undefined, { numeric: true });
          });

          if (remoteStories.length > 0) {
            setStories(remoteStories);
          }
        }
      } catch (e) {
        console.warn("Firestore Tango stories fetch skipped/fallback:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFromFirestore();

    return () => {
      isMounted = false;
    };
  }, [bookId, chapterId]);

  // Current Story & All Target Words in Topic
  const currentStory = stories[currentStoryIndex] || null;

  const allTopicWords = useMemo(() => {
    const list = [];
    const seen = new Set();
    stories.forEach(story => {
      (story.annotated_words || []).forEach(w => {
        const key = w.word_id || w.kanji;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            ...w,
            storyJapanese: story.japanese_text,
            storyEnglish: story.english_translation
          });
        }
      });
    });
    return list;
  }, [stories]);

  // Generate In-Context Sentence Quiz Questions
  useEffect(() => {
    if (allTopicWords.length === 0) return;
    const questions = [];

    stories.forEach((story) => {
      if (!story.annotated_words || story.annotated_words.length === 0) return;

      story.annotated_words.forEach((targetWord) => {
        const cleanSentence = (story.japanese_text || '')
          .replace(/<rt>.*?<\/rt>/g, '')
          .replace(/<u>/g, '')
          .replace(/<\/u>/g, '')
          .replace(/<[^>]+>/g, ' ');

        // Create fill-in-the-blank prompt
        const wordRegex = new RegExp(targetWord.kanji, 'g');
        const clozePrompt = cleanSentence.replace(wordRegex, '【 _____ 】');

        // Distractors from other words in same topic
        const otherWords = allTopicWords
          .filter(w => w.kanji !== targetWord.kanji)
          .map(w => w.kanji);

        // Shuffle distractors
        const shuffledDistractors = [...new Set(otherWords)].sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [targetWord.kanji, ...shuffledDistractors].sort(() => 0.5 - Math.random());

        questions.push({
          id: `q_${targetWord.word_id || targetWord.kanji}`,
          targetWord,
          prompt: clozePrompt,
          english: story.english_translation,
          correct: targetWord.kanji,
          options
        });
      });
    });

    setQuizQuestions(questions.slice(0, 15)); // 15 focused questions per topic drill
  }, [allTopicWords, stories]);

  // Native Web Speech API for TTS Audio
  const playJapaneseAudio = (text) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/<rt>.*?<\/rt>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/^[A-Z]：/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = speechRate;

    // Pick natural Japanese voice if available
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP');
    if (jaVoice) utterance.voice = jaVoice;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n') {
        if (studyMode === 'flashcards') {
          handleNextCard();
        } else if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'p') {
        if (studyMode === 'flashcards') {
          handlePrevCard();
        } else if (currentStoryIndex > 0) {
          setCurrentStoryIndex(prev => prev - 1);
        }
      } else if (e.key === ' ' && !e.target.closest('button')) {
        e.preventDefault();
        if (studyMode === 'flashcards') {
          setIsCardFlipped(f => !f);
        } else if (currentStory) {
          playJapaneseAudio(currentStory.japanese_text);
        }
      } else if (e.key.toLowerCase() === 'f') {
        setFuriganaMode(prev => (prev === 'all' ? 'target-only' : prev === 'target-only' ? 'none' : 'all'));
      } else if (e.key.toLowerCase() === 't') {
        setShowTranslation(t => !t);
      } else if (e.key === 'Escape') {
        setInspectedWord(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [studyMode, currentStoryIndex, currentCardIndex, stories, currentStory]);

  // Flashcard Handlers
  const handleNextCard = () => {
    setIsCardFlipped(false);
    setCurrentCardIndex(prev => (prev + 1) % allTopicWords.length);
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setCurrentCardIndex(prev => (prev - 1 + allTopicWords.length) % allTopicWords.length);
  };

  const toggleWordMastery = (wordKey) => {
    setMasteredWords(prev => ({
      ...prev,
      [wordKey]: !prev[wordKey]
    }));
  };

  // Extract concise single sentence example for flashcard
  const getCardExampleLine = (card) => {
    if (!card?.storyJapanese) return '';
    const lines = card.storyJapanese.split(/<br\s*\/?>/i);
    const searchWord = (card.kanji || '').replace(/［する］|\[する\]|（|）|～/g, '');
    
    // Find line that contains the word
    const matching = lines.find(l => {
      const plain = l.replace(/<[^>]+>/g, '');
      return plain.includes(searchWord) || l.includes(card.kanji);
    });

    const targetLine = matching || lines[0] || '';
    return targetLine.replace(/^([A-Z]|男|女|店員|先生|客|[０-９0-9]+)[：:]\s*/, '');
  };

  // Render Annotated Japanese Dialogue with Interactive Word Chips
  const renderAnnotatedStory = (story) => {
    if (!story?.japanese_text) return null;
    let text = story.japanese_text;

    if (story.annotated_words && story.annotated_words.length > 0) {
      let wordIdx = 0;
      text = text.replace(/<u>(.*?)<\/u>/g, (match, p1) => {
        if (wordIdx < story.annotated_words.length) {
          const word = story.annotated_words[wordIdx];
          const wIndex = wordIdx;
          wordIdx++;

          let displayKanji = p1;
          if (!p1.includes('<ruby>') && word.furigana) {
            displayKanji = `<ruby class="target-ruby">${p1}<rt>${word.furigana}</rt></ruby>`;
          }

          const wordKey = word.word_id || word.kanji;
          const isMastered = !!masteredWords[wordKey];

          return `<span class="tango-target-word group ${isMastered ? 'mastered' : ''}" data-word-idx="${wIndex}" title="${studyMode === 'drill' ? (isMastered ? 'Mastered (Tap to unmark)' : 'Tap to mark as Mastered') : 'Tap to inspect word'}"><span class="word-kanji">${displayKanji}</span>${isMastered ? '<span class="mastered-badge">✓</span>' : ''}<span class="word-sub-meaning">${word.meaning_en || ''}</span></span>`;
        }
        return match;
      });
    }

    // Split dialogues by line breaks (<br>)
    const lines = text.split(/<br\s*\/?>/i);

    return (
      <div 
        className="space-y-4"
        onClick={(e) => {
          const chip = e.target.closest('.tango-target-word');
          if (chip && chip.dataset.wordIdx !== undefined) {
            const idx = parseInt(chip.dataset.wordIdx, 10);
            const word = story.annotated_words?.[idx];
            if (word) {
              if (studyMode === 'drill') {
                // In Active Drill mode: directly toggle word mastery
                const wordKey = word.word_id || word.kanji;
                toggleWordMastery(wordKey);
              } else {
                // In Story Reader mode: open word inspector modal
                setInspectedWord(word);
              }
            }
          }
        }}
      >
        {lines.map((line, lIdx) => {
          // Detect speaker prefixes (A:, B:, 1:, 男:, 女:, etc.)
          const speakerMatch = line.match(/^([A-Z]|男|女|店員|先生|客|[０-９0-9]+)[：:]\s*/);
          const speaker = speakerMatch ? speakerMatch[1] : null;
          const dialogueContent = speakerMatch ? line.substring(speakerMatch[0].length) : line;

          return (
            <div key={lIdx} className="tango-dialogue-line flex items-baseline">
              {speaker ? (
                <>
                  <span className="tango-speaker-badge shrink-0">{speaker}</span>
                  <div 
                    className="flex-1"
                    dangerouslySetInnerHTML={{ __html: dialogueContent }} 
                  />
                </>
              ) : (
                <div 
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: dialogueContent }} 
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Get Topic Title from Static List or First Story
  const topicMeta = TANGO_TOPIC_NAMES[bookId]?.find(t => t.id === chapterId) || {
    title: currentStory?.title || chapterId.toUpperCase(),
    en: 'Topic Study'
  };

  return (
    <div className={`tango-page-container theme-${theme} font-size-${fontSize} mode-${studyMode} ${furiganaMode === 'none' ? 'furigana-none' : furiganaMode === 'target-only' ? 'furigana-target-only' : ''}`}>
      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* Top Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-sm">
          <nav className="flex items-center gap-2 text-sm text-[var(--tango-text-muted)]">
            <Link to="/books" className="hover:text-[var(--tango-primary)] font-medium">Books</Link>
            <span>/</span>
            <Link to={`/books/${bookId}`} className="hover:text-[var(--tango-primary)] font-medium uppercase">{bookId.replace('_', ' ')}</Link>
            <span>/</span>
            <span className="font-bold text-[var(--tango-text-primary)]">{topicMeta.title}</span>
          </nav>

          {/* Quick Mastery Count Badge */}
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--tango-text-secondary)]">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              Mastered: {Object.values(masteredWords).filter(Boolean).length} / {allTopicWords.length} words
            </span>
          </div>
        </div>

        {/* Header Banner */}
        <div className="tango-header-banner">
          <div className="flex items-center gap-3">
            <span className="tango-badge">{bookId.toUpperCase().replace('_', ' ')}</span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{topicMeta.title}</span>
              </h1>
              <p className="text-xs md:text-sm text-emerald-100 opacity-90 mt-0.5">
                {stories.length} Situational Dialogues • {allTopicWords.length} Target Words
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="tango-pill-info">
              Story {currentStoryIndex + 1} / {stories.length}
            </span>
          </div>
        </div>

        {/* Study Mode Navigation Tabs */}
        <div className="tango-mode-nav">
          <button
            onClick={() => setStudyMode('reader')}
            className={`tango-mode-btn ${studyMode === 'reader' ? 'active' : ''}`}
          >
            📖 ストーリー (Story Reader)
          </button>
          <button
            onClick={() => {
              setStudyMode('drill');
              setFuriganaMode('none'); // Automatically toggle furigana to Off for Active Drill
            }}
            className={`tango-mode-btn ${studyMode === 'drill' ? 'active' : ''}`}
          >
            ⚡ アクティブ・ドリル (Active Drill)
          </button>
          <button
            onClick={() => setStudyMode('flashcards')}
            className={`tango-mode-btn ${studyMode === 'flashcards' ? 'active' : ''}`}
          >
            🃏 単語カード (Flashcards)
          </button>
          <button
            onClick={() => setStudyMode('quiz')}
            className={`tango-mode-btn ${studyMode === 'quiz' ? 'active' : ''}`}
          >
            🎯 クイズ (Sentence Quiz)
          </button>
          <button
            onClick={() => setStudyMode('glossary')}
            className={`tango-mode-btn ${studyMode === 'glossary' ? 'active' : ''}`}
          >
            📑 単語一覧 ({allTopicWords.length})
          </button>
        </div>

        {/* Preferences Toolbar */}
        <div className="tango-toolbar">
          {/* Topic & Story Selectors */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--tango-text-muted)]">Topic:</span>
              <select
                value={chapterId}
                onChange={(e) => navigate(`/tango-reading/${bookId}/chapters/${e.target.value}`)}
                className="tango-select"
              >
                {(TANGO_TOPIC_NAMES[bookId] || []).map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>

            {stories.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--tango-text-muted)]">Story:</span>
                <select
                  value={currentStoryIndex}
                  onChange={(e) => setCurrentStoryIndex(parseInt(e.target.value, 10))}
                  className="tango-select font-bold"
                >
                  {stories.map((s, idx) => {
                    const wordsInStory = s.annotated_words || [];
                    const isAllMastered = wordsInStory.length > 0 && wordsInStory.every(w => masteredWords[w.word_id || w.kanji]);
                    return (
                      <option key={idx} value={idx}>
                        Story {idx + 1} / {stories.length} {wordsInStory.length > 0 ? `(${wordsInStory.length} words)` : ''} {isAllMastered ? '✓' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>

          {/* Reader Preferences & Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Furigana Mode Toggle: All / Target Only / Off */}
            <div className="tango-btn-group">
              <button
                onClick={() => setFuriganaMode('all')}
                className={furiganaMode === 'all' ? 'active' : ''}
                title="All Furigana"
              >
                All Furigana
              </button>
              <button
                onClick={() => setFuriganaMode('target-only')}
                className={furiganaMode === 'target-only' ? 'active' : ''}
                title="Target Words Only"
              >
                Target Only
              </button>
              <button
                onClick={() => setFuriganaMode('none')}
                className={furiganaMode === 'none' ? 'active' : ''}
                title="No Furigana"
              >
                Off
              </button>
            </div>

            {/* Font Size Selector */}
            <div className="tango-btn-group">
              <button
                onClick={() => setFontSize('small')}
                className={fontSize === 'small' ? 'active' : ''}
                title="Small Font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('normal')}
                className={fontSize === 'normal' ? 'active' : ''}
                title="Standard Font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={fontSize === 'large' ? 'active' : ''}
                title="Large Font"
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading ? (
          <div className="py-20 text-center">
            <LoadingSpinner />
            <p className="text-sm text-[var(--tango-text-muted)] mt-3 font-medium">Loading vocabulary stories...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200">
            <p className="text-amber-800 dark:text-amber-200 font-bold">{error}</p>
          </div>
        ) : (
          <div>

            {/* =========================================================
                MODE 1 & 2: STORY READER & ACTIVE DRILL
               ========================================================= */}
            {(studyMode === 'reader' || studyMode === 'drill') && currentStory && (
              <div className="space-y-4">

                {/* Main Story Dialogue Canvas (Clean passage box with NO hide/reveal buttons on top) */}
                <div className="tango-story-canvas">
                  
                  {/* Dialogue Top Action Bar */}
                  <div className="flex items-center justify-between border-b border-[var(--tango-border)] pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playJapaneseAudio(currentStory.japanese_text)}
                        className={`tango-audio-btn ${isPlayingAudio ? 'playing' : ''}`}
                        title="Listen to full dialogue (Space)"
                      >
                        🔊
                      </button>
                      <span className="text-xs font-bold text-[var(--tango-text-secondary)]">
                        {isPlayingAudio ? 'Playing Audio...' : 'Dialogue Audio'}
                      </span>
                    </div>

                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="text-xs font-bold text-[var(--tango-primary)] hover:underline cursor-pointer"
                    >
                      {showTranslation ? 'Hide Translation ▲' : 'Show English Translation ▼'}
                    </button>
                  </div>

                  {/* Japanese Story Dialogue Text */}
                  {renderAnnotatedStory(currentStory)}

                  {/* Expandable English Translation */}
                  {showTranslation && (
                    <div className="mt-6 pt-4 border-t border-[var(--tango-border)] animate-fadeIn">
                      <p className="text-sm md:text-base text-[var(--tango-text-secondary)] leading-relaxed italic">
                        {currentStory.english_translation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Story Navigation Arrows & Mode Tip */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={currentStoryIndex === 0}
                    onClick={() => {
                      setCurrentStoryIndex(prev => Math.max(0, prev - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-[var(--tango-card-bg)] hover:bg-[var(--tango-card-alt)] border border-[var(--tango-border)] text-sm font-bold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                  >
                    &larr; Previous Story
                  </button>

                  <span className="text-xs font-bold text-[var(--tango-text-muted)] text-center">
                    {studyMode === 'drill' 
                      ? '⚡ Active Drill: Tap any target word to mark / unmark as Mastered' 
                      : 'Tip: Tap any target word to inspect reading & definition'}
                  </span>

                  <button
                    disabled={currentStoryIndex === stories.length - 1}
                    onClick={() => {
                      setCurrentStoryIndex(prev => Math.min(stories.length - 1, prev + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-[var(--tango-card-bg)] hover:bg-[var(--tango-card-alt)] border border-[var(--tango-border)] text-sm font-bold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                  >
                    Next Story &rarr;
                  </button>
                </div>

                {/* Story Navigator Pills */}
                <div className="mt-8 pt-6 border-t border-[var(--tango-border)]">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-[var(--tango-text-muted)] uppercase tracking-wider">
                      Story Navigator
                    </p>
                    <span className="text-xs font-bold text-[var(--tango-text-secondary)]">
                      {currentStoryIndex + 1} / {stories.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {stories.map((s, idx) => {
                      const isCurrent = currentStoryIndex === idx;
                      const wordsInStory = s.annotated_words || [];
                      const isAllMastered = wordsInStory.length > 0 && wordsInStory.every(w => masteredWords[w.word_id || w.kanji]);

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentStoryIndex(idx);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[var(--tango-primary)] text-white shadow-md scale-105'
                              : isAllMastered
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                              : 'bg-[var(--tango-card-bg)] text-[var(--tango-text-secondary)] border border-[var(--tango-border)] hover:border-[var(--tango-primary)] hover:text-[var(--tango-primary)]'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* =========================================================
                MODE 3: 3D FLASHCARDS & ACTIVE RECALL
               ========================================================= */}
            {studyMode === 'flashcards' && allTopicWords.length > 0 && (
              <div className="space-y-6">
                {(() => {
                  const card = allTopicWords[currentCardIndex];
                  const isMastered = !!masteredWords[card.word_id || card.kanji];

                  return (
                    <div className="tango-flashcard-stage">
                      <div
                        className={`tango-flashcard ${isCardFlipped ? 'flipped' : ''}`}
                        onClick={() => setIsCardFlipped(!isCardFlipped)}
                      >
                        {/* Front of Flashcard */}
                        <div className="tango-flashcard-front">
                          <div className="flex items-center justify-between w-full text-xs font-bold text-[var(--tango-text-muted)]">
                            <span>#{card.word_number || (currentCardIndex + 1)}</span>
                            <span className="text-[var(--tango-primary)]">Card {currentCardIndex + 1} / {allTopicWords.length}</span>
                          </div>

                          <div className="my-auto">
                            <h2 className="tango-card-word">{card.kanji}</h2>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playJapaneseAudio(card.kanji);
                              }}
                              className="tango-audio-btn mx-auto mt-2"
                              title="Listen"
                            >
                              🔊
                            </button>
                          </div>

                          <div className="w-full text-center">
                            <span className="text-xs font-bold text-[var(--tango-text-muted)]">
                              Click card or press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">Space</kbd> to flip
                            </span>
                          </div>
                        </div>

                        {/* Back of Flashcard */}
                        <div className="tango-flashcard-back">
                          <div className="flex items-center justify-between w-full text-xs font-bold text-[var(--tango-text-muted)]">
                            <span className="tango-card-reading">{card.furigana || card.kanji}</span>
                            <span>#{card.word_number || (currentCardIndex + 1)}</span>
                          </div>

                          <div className="my-auto w-full">
                            <h3 className="tango-card-meaning">{card.meaning_en}</h3>
                            {(() => {
                              const exampleSentence = getCardExampleLine(card);
                              return exampleSentence ? (
                                <div className="tango-card-sentence mt-3">
                                  <div 
                                    dangerouslySetInnerHTML={{ __html: exampleSentence }}
                                    className="font-medium text-sm md:text-base leading-relaxed"
                                  />
                                </div>
                              ) : null;
                            })()}
                          </div>

                          <div className="flex items-center gap-3 w-full justify-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWordMastery(card.word_id || card.kanji);
                              }}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                isMastered 
                                  ? 'bg-emerald-600 text-white shadow' 
                                  : 'bg-[var(--tango-card-alt)] hover:bg-[var(--tango-border)] text-[var(--tango-text-primary)]'
                              }`}
                            >
                              {isMastered ? '✓ Mastered' : 'Mark as Mastered'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Flashcard Action Buttons */}
                      <div className="flex items-center justify-between mt-6">
                        <button
                          onClick={handlePrevCard}
                          className="px-5 py-2.5 bg-[var(--tango-card-bg)] hover:bg-[var(--tango-card-alt)] border border-[var(--tango-border)] text-sm font-bold rounded-xl cursor-pointer"
                        >
                          &larr; Prev Card
                        </button>

                        <button
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow transition cursor-pointer"
                        >
                          🔄 Flip Card (Space)
                        </button>

                        <button
                          onClick={handleNextCard}
                          className="px-5 py-2.5 bg-[var(--tango-card-bg)] hover:bg-[var(--tango-card-alt)] border border-[var(--tango-border)] text-sm font-bold rounded-xl cursor-pointer"
                        >
                          Next Card &rarr;
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* =========================================================
                MODE 4: IN-CONTEXT SENTENCE QUIZ
               ========================================================= */}
            {studyMode === 'quiz' && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between border-b border-[var(--tango-border)] pb-2">
                  <h3 className="font-bold text-lg text-[var(--tango-text-primary)]">
                    🎯 Sentence Context Quiz ({quizQuestions.length} Questions)
                  </h3>
                  {quizSubmitted && (
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="text-xs font-bold text-[var(--tango-primary)] hover:underline"
                    >
                      ↺ Retake Quiz
                    </button>
                  )}
                </div>

                {quizQuestions.map((q, qIdx) => {
                  const userAns = quizAnswers[q.id];
                  const isAnswered = !!userAns;

                  return (
                    <div key={q.id} className="tango-quiz-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[var(--tango-text-muted)]">Q{qIdx + 1}</span>
                        <span className="text-xs font-semibold text-[var(--tango-primary)]">{q.targetWord.meaning_en}</span>
                      </div>

                      <p className="text-base md:text-lg font-bold text-[var(--tango-text-primary)] mb-3 leading-relaxed">
                        {q.prompt}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          let optClass = '';
                          if (quizSubmitted || isAnswered) {
                            if (opt === q.correct) optClass = 'correct font-bold';
                            else if (userAns === opt) optClass = 'wrong';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isAnswered}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt }))}
                              className={`tango-quiz-option ${optClass}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && opt === q.correct && <span className="text-xs font-bold text-emerald-600">✓ 正解</span>}
                              {isAnswered && userAns === opt && opt !== q.correct && <span className="text-xs font-bold text-red-500">✗ 不正解</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Submit Quiz Bar */}
                {!quizSubmitted && Object.keys(quizAnswers).length > 0 && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-base shadow-md cursor-pointer"
                    >
                      採点する (Submit Quiz) ✓
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================
                MODE 5: TOPIC VOCABULARY GLOSSARY
               ========================================================= */}
            {studyMode === 'glossary' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="tango-glossary-table">
                    <thead>
                      <tr>
                        <th style={{ width: '60px' }}>#</th>
                        <th style={{ width: '200px' }}>Word / Kanji</th>
                        <th style={{ width: '160px' }}>Furigana</th>
                        <th>English Meaning</th>
                        <th style={{ width: '80px', textAlign: 'center' }}>Audio</th>
                        <th style={{ width: '100px', textAlign: 'center' }}>Mastery</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTopicWords.map((w, idx) => {
                        const isMastered = !!masteredWords[w.word_id || w.kanji];
                        return (
                          <tr key={idx}>
                            <td className="font-mono text-xs text-[var(--tango-text-muted)]">
                              {w.word_number || (idx + 1)}
                            </td>
                            <td className="font-bold text-base">
                              {w.kanji}
                            </td>
                            <td className="text-[var(--tango-primary)] font-medium">
                              {w.furigana || '—'}
                            </td>
                            <td className="text-[var(--tango-text-secondary)]">
                              {w.meaning_en}
                            </td>
                            <td className="text-center">
                              <button
                                onClick={() => playJapaneseAudio(w.kanji)}
                                className="tango-audio-btn mx-auto"
                                title="Listen"
                              >
                                🔊
                              </button>
                            </td>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                checked={isMastered}
                                onChange={() => toggleWordMastery(w.word_id || w.kanji)}
                                className="w-5 h-5 accent-emerald-600 cursor-pointer rounded"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Word Inspector Modal (Reader Mode only: displays Kanji, Furigana/Hiragana, English Meaning, Audio — NO mastered button) */}
      {inspectedWord && (
        <div className="tango-modal-overlay" onClick={() => setInspectedWord(null)}>
          <div className="tango-modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--tango-border)] mb-4">
              <span className="text-xs font-bold text-[var(--tango-text-muted)]">
                Word Detail #{inspectedWord.word_number || ''}
              </span>
              <button
                onClick={() => setInspectedWord(null)}
                className="px-2.5 py-1 bg-[var(--tango-card-alt)] hover:bg-[var(--tango-border)] text-xs font-bold rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-center my-4">
              <h2 className="text-3xl font-black text-[var(--tango-text-primary)]">{inspectedWord.kanji}</h2>
              {inspectedWord.furigana && (
                <p className="text-lg font-bold text-[var(--tango-primary)] mt-1">{inspectedWord.furigana}</p>
              )}
              <p className="text-base font-semibold text-[var(--tango-text-secondary)] mt-2">{inspectedWord.meaning_en}</p>

              <button
                onClick={() => playJapaneseAudio(inspectedWord.kanji)}
                className="tango-audio-btn mx-auto mt-4 w-10 h-10 text-base"
                title="Listen to pronunciation"
              >
                🔊
              </button>
            </div>

            <div className="flex justify-center pt-3 border-t border-[var(--tango-border)]">
              <button
                onClick={() => setInspectedWord(null)}
                className="px-6 py-2 bg-[var(--tango-primary)] hover:opacity-90 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
