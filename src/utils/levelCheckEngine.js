// src/utils/levelCheckEngine.js
// Omni-Source Random Question Harvester & Diagnostic Engine for "Check Your Level"
// Pulls random questions EVERY time across:
// 1. All Digitized Books (Zenkamoku N1/N2/N3, Shin Kanzen Reading/Listening, Speed Master, Sou Matome, Nihongo no Mori, First Time N3 Kanji, Chokuzen Taisaku N3/N4, Shin 500 Mon, Power Drill, Tango N1/N2/N3)
// 2. Official JLPT Past Exam Papers (public/data/jlpt_past_exams/{level}/*.json)
// 3. Full JLPT Mock Tests (public/data/jlpt_mock_tests/{level}_test_*.json)
// 4. Static & Firestore Vocabulary/Kanji/Grammar Lists (quizData, n2/n3_kitty_vocab, JLPT-matome/{level}/kanjilist|vocablist|grammarlist)

import { db } from '../firebaseConfig.js';
import { collection, getDocs, doc, getDoc, query, limit } from 'firebase/firestore';
import { quizData } from '../data/quiz_data.jsx';
import { practiceSetsBook } from '../data/practice_sets_data.js';
import pastExamsMeta from '../data/jlpt_past_exams_meta.json';
import mockTestsMeta from '../data/jlpt_mock_tests_meta.json';

// Eagerly glob local book chapters
const zenkamokuN1Modules = import.meta.glob('../data/zenkamoku_n1/*.json', { eager: true });
const zenkamokuN2Modules = import.meta.glob('../data/zenkamoku_n2/*.json', { eager: true });
const zenkamokuN3Modules = import.meta.glob('../data/zenkamoku_n3/*.json', { eager: true });
const shinkanzenReadingModules = import.meta.glob('../data/shinkanzen_reading/*.json', { eager: true });
const speedMasterReadingModules = import.meta.glob('../data/speed_master_n3_reading/*.json', { eager: true });
const somatomeReadingModules = import.meta.glob('../data/somatome/*.json', { eager: true });
const nihongoNoMoriModules = import.meta.glob('../data/nihongo_no_mori_n3/*.json', { eager: true });
const firstTimeKanjiModules = import.meta.glob('../data/first_time_n3_350_kanji/chapter-*.json', { eager: true });
const passN3Within20DaysModules = import.meta.glob('../data/pass_n3_within_20_days/chapter-*.json', { eager: true });
const tangoN1Modules = import.meta.glob('../data/tango_n1_raw/*.json', { eager: true });
const tangoN2Modules = import.meta.glob('../data/tango_n2_raw/*.json', { eager: true });
const tangoN3Modules = import.meta.glob('../data/tango_n3_raw/*.json', { eager: true });
const kittyVocabLoaders = import.meta.glob('../data/*_kitty_vocab.json');

const SEEN_STORAGE_KEY = 'nihongo_level_check_seen_ids';
const MAX_SEEN_HISTORY = 300;

/**
 * Cryptographically strong or Math.random Fisher-Yates shuffle
 */
export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Resolve asset URL under Vite BASE_URL
 */
export function resolveAssetUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Strip leading option numbers like "1. " or "1　" so UI renders clean option buttons
 */
function cleanOptionText(opt) {
  if (opt === null || opt === undefined) return '';
  if (typeof opt === 'object') {
    const raw = opt.text || opt.label || '';
    return String(raw).replace(/^[1-4][.．、\s　]+/, '').trim();
  }
  return String(opt).replace(/^[1-4][.．、\s　]+/, '').trim();
}

/**
 * Normalize 1-based correct answer index (1..4) from any schema variant
 */
function resolveOneBasedCorrect(q, rawOptions = []) {
  if (!q) return 1;
  // Explicit 1-based 'correct' or 'correct_answer'
  if (typeof q.correct === 'number' && q.correct >= 1 && q.correct <= 4) {
    return q.correct;
  }
  if (typeof q.correct_answer === 'number' && q.correct_answer >= 1 && q.correct_answer <= 4) {
    return q.correct_answer;
  }
  // 0-based 'correctIndex'
  if (typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4) {
    return q.correctIndex + 1;
  }
  // Object correctOption: { index: 0, text: '...' }
  if (q.correctOption && typeof q.correctOption === 'object' && typeof q.correctOption.index === 'number') {
    return q.correctOption.index + 1;
  }
  // Match string correctOption against options
  if (typeof q.correctOption === 'string' && q.correctOption.trim()) {
    const targetClean = cleanOptionText(q.correctOption);
    const idx = rawOptions.findIndex(o => cleanOptionText(o) === targetClean || String(o).trim() === q.correctOption.trim());
    if (idx !== -1) return idx + 1;
  }
  return 1;
}

/**
 * Recently seen IDs tracker so every test feels freshly randomized
 */
function getSeenQuestionIds() {
  try {
    const raw = JSON.parse(localStorage.getItem(SEEN_STORAGE_KEY) || '[]');
    return new Set(Array.isArray(raw) ? raw : []);
  } catch {
    return new Set();
  }
}

export function markQuestionsAsSeen(questions = []) {
  try {
    const raw = JSON.parse(localStorage.getItem(SEEN_STORAGE_KEY) || '[]');
    const list = Array.isArray(raw) ? raw : [];
    const next = [...list, ...questions.map(q => q.id).filter(Boolean)].slice(-MAX_SEEN_HISTORY);
    localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Pick N random items from pool, prioritizing unseen items and balancing across distinct source books/exams
 */
function pickBalancedRandom(pool = [], count = 1, seenIds = new Set()) {
  if (!pool.length || count <= 0) return [];
  const unseen = pool.filter(item => !seenIds.has(item.id));
  const workingPool = unseen.length >= count ? unseen : pool;

  // Group by sourceLabel so we pick from diverse sources (e.g. Past Exam + Zenkamoku + Static List + Tango)
  const bySource = {};
  workingPool.forEach(item => {
    const src = item.sourceType || item.sourceLabel || 'general';
    if (!bySource[src]) bySource[src] = [];
    bySource[src].push(item);
  });

  const sourceKeys = shuffleArray(Object.keys(bySource));
  sourceKeys.forEach(k => {
    bySource[k] = shuffleArray(bySource[k]);
  });

  const picked = [];
  const pickedIds = new Set();
  let round = 0;

  while (picked.length < count) {
    let addedInRound = false;
    for (const k of sourceKeys) {
      if (picked.length >= count) break;
      const candidate = bySource[k][round];
      if (candidate && !pickedIds.has(candidate.id)) {
        picked.push(candidate);
        pickedIds.add(candidate.id);
        addedInRound = true;
      }
    }
    if (!addedInRound) break;
    round++;
  }

  // If still short, fill from remaining shuffled pool
  if (picked.length < count) {
    for (const item of shuffleArray(workingPool)) {
      if (picked.length >= count) break;
      if (!pickedIds.has(item.id)) {
        picked.push(item);
        pickedIds.add(item.id);
      }
    }
  }

  return shuffleArray(picked);
}

/**
 * 1. Harvest from Zenkamoku N1 / N2 / N3 local JSON files
 */
function harvestZenkamokuForLevel(level) {
  const normLevel = (level || 'N3').toUpperCase();
  const modulesMap = {
    N1: zenkamokuN1Modules,
    N2: zenkamokuN2Modules,
    N3: zenkamokuN3Modules,
  };
  const modules = modulesMap[normLevel];
  if (!modules) return { kanji: [], vocab: [], grammar: [], reading: [] };

  const kanji = [];
  const vocab = [];
  const grammar = [];
  const reading = [];

  // Randomly sample up to 20 chapter files per call for speed and variety
  const keys = shuffleArray(Object.keys(modules).filter(k => !k.endsWith('/book.json'))).slice(0, 22);

  keys.forEach(key => {
    const data = modules[key]?.default || modules[key];
    if (!data || !Array.isArray(data.sections)) return;
    const chapId = data.chapterId || key.split('/').pop().replace('.json', '');

    data.sections.forEach((sec, sIdx) => {
      const sType = (sec.type || '').toLowerCase();
      const sTitle = sec.title || '';

      // Direct questions in section (Kanji, Vocab, Grammar)
      if (Array.isArray(sec.questions)) {
        sec.questions.forEach((q, qIdx) => {
          const opts = (q.options || []).map(cleanOptionText);
          if (opts.length !== 4 || !q.stem) return;
          const correct = resolveOneBasedCorrect(q, q.options);

          let cat = 'vocab';
          let typeLabel = sTitle || '語彙';
          if (sType.includes('kanji') || sType.includes('orthography') || sTitle.includes('漢字') || sTitle.includes('表記')) {
            cat = 'kanji';
            typeLabel = sTitle || '漢字・表記';
          } else if (sType.includes('grammar') || sType.includes('sentence') || sTitle.includes('文法')) {
            cat = 'grammar';
            typeLabel = sTitle || '文法';
          }

          const item = {
            id: `zen-${normLevel}-${chapId}-s${sIdx}-q${qIdx}`,
            level: normLevel,
            category: cat,
            typeLabel,
            instructions: sec.instruction || '',
            stem: q.stem,
            context: sec.passage || q.passage || '',
            options: opts,
            correct,
            explanation: q.explanation || '',
            sourceType: 'book_zenkamoku',
            sourceLabel: `📘 全科目攻略 ${normLevel} (${chapId.toUpperCase()})`,
            sourceRoute: `/books/zenkamoku-${normLevel.toLowerCase()}-best-workbook/chapters/${chapId}`,
          };

          if (cat === 'kanji') kanji.push(item);
          else if (cat === 'grammar') grammar.push(item);
          else vocab.push(item);
        });
      }

      // Passages in section (Reading / Text Grammar)
      if (Array.isArray(sec.passages)) {
        sec.passages.forEach((p, pIdx) => {
          const passageHtml = p.text || p.passage || p.passageText || '';
          if (!passageHtml || sType.includes('text_grammar')) return;
          (p.questions || []).forEach((q, qIdx) => {
            const opts = (q.options || []).map(cleanOptionText);
            if (opts.length !== 4 || !(q.stem || q.questionText)) return;
            reading.push({
              id: `zen-${normLevel}-${chapId}-p${pIdx}-q${qIdx}`,
              level: normLevel,
              category: 'reading',
              typeLabel: sTitle || '読解',
              instructions: sec.instruction || '次の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。',
              stem: q.stem || q.questionText,
              context: passageHtml,
              options: opts,
              correct: resolveOneBasedCorrect(q, q.options),
              explanation: q.explanation || '',
              sourceType: 'book_zenkamoku_reading',
              sourceLabel: `📘 全科目攻略 ${normLevel} 読解 (${chapId.toUpperCase()})`,
              sourceRoute: `/books/zenkamoku-${normLevel.toLowerCase()}-best-workbook/chapters/${chapId}`,
            });
          });
        });
      }
    });
  });

  return { kanji, vocab, grammar, reading };
}

/**
 * 2. Harvest from Tango N1 / N2 / N3 Raw Story & Annotated Vocabulary JSONs
 */
function harvestTangoForLevel(level) {
  const normLevel = (level || 'N3').toUpperCase();
  const modulesMap = {
    N1: tangoN1Modules,
    N2: tangoN2Modules,
    N3: tangoN3Modules,
  };
  const modules = modulesMap[normLevel];
  if (!modules) return { kanji: [], vocab: [] };

  const allWords = [];
  const keys = shuffleArray(Object.keys(modules)).slice(0, 35);

  keys.forEach(key => {
    const data = modules[key]?.default || modules[key];
    if (!data || !Array.isArray(data.annotated_words)) return;
    data.annotated_words.forEach(w => {
      if (w.kanji && w.meaning_en) {
        allWords.push({
          ...w,
          storyTitle: data.title || 'Tango Story',
          storyText: data.japanese_text || '',
        });
      }
    });
  });

  const kanji = [];
  const vocab = [];
  if (allWords.length < 8) return { kanji, vocab };

  const shuffledWords = shuffleArray(allWords).slice(0, 20);
  shuffledWords.forEach((target, idx) => {
    const cleanKanji = target.kanji.replace(/［.*］/g, '').trim();
    // If word has furigana different from kanji, we can create a Kanji Reading question
    if (target.furigana && target.furigana !== cleanKanji && idx % 2 === 0) {
      const distractors = shuffleArray(
        allWords.filter(w => w.furigana && w.furigana !== target.furigana && w.furigana !== w.kanji)
      )
        .slice(0, 3)
        .map(w => w.furigana);

      if (distractors.length === 3) {
        const opts = shuffleArray([target.furigana, ...distractors]);
        const correct = opts.indexOf(target.furigana) + 1;
        kanji.push({
          id: `tango-kanji-${normLevel}-${target.word_id || idx}`,
          level: normLevel,
          category: 'kanji',
          typeLabel: '漢字読み (Tango)',
          instructions: '＿＿のことばの読み方として最もよいものを、１・２・３・４から一つ選びなさい。',
          stem: `「<u>${cleanKanji}</u>」の正しい読み方はどれですか。`,
          options: opts,
          correct,
          explanation: `<b>【正解】${target.furigana}</b><br/>${cleanKanji}（${target.furigana}）：${target.meaning_en}`,
          sourceType: 'book_tango',
          sourceLabel: `📗 はじめての日本語能力試験 ${normLevel} 単語 (${target.storyTitle})`,
          sourceRoute: `/tango-reading/tango_${normLevel.toLowerCase()}/chapters/topic_01`,
        });
      }
    }

    // Also create a Vocabulary Meaning question
    const meaningDistractors = shuffleArray(
      allWords.filter(w => w.meaning_en && w.meaning_en !== target.meaning_en)
    )
      .slice(0, 3)
      .map(w => w.meaning_en);

    if (meaningDistractors.length === 3) {
      const opts = shuffleArray([target.meaning_en, ...meaningDistractors]);
      const correct = opts.indexOf(target.meaning_en) + 1;
      vocab.push({
        id: `tango-vocab-${normLevel}-${target.word_id || idx}`,
        level: normLevel,
        category: 'vocab',
        typeLabel: '語彙意味 (Tango)',
        instructions: '次の言葉の意味として最もよいものを、１・２・３・４から一つ選びなさい。',
        stem: `「<b>${cleanKanji}</b>」${target.furigana ? `（${target.furigana}）` : ''}の意味はどれですか。`,
        options: opts,
        correct,
        explanation: `<b>【正解】${target.meaning_en}</b><br/>${cleanKanji}${target.furigana ? `（${target.furigana}）` : ''} ＝ ${target.meaning_en}`,
        sourceType: 'book_tango',
        sourceLabel: `📗 はじめての日本語能力試験 ${normLevel} 単語 (${target.storyTitle})`,
        sourceRoute: `/tango-reading/tango_${normLevel.toLowerCase()}/chapters/topic_01`,
      });
    }
  });

  return { kanji, vocab };
}

/**
 * 3. Harvest from N3 Special Books (Shin Kanzen Reading, Speed Master Reading, Sou Matome, Nihongo no Mori, First Time 350 Kanji, Chokuzen Taisaku N3)
 */
function harvestN3SpecialBooks() {
  const kanji = [];
  const vocab = [];
  const grammar = [];
  const reading = [];
  const listening = [];

  // A. First Time JLPT N3 350 Kanji
  Object.keys(firstTimeKanjiModules).forEach(key => {
    const data = firstTimeKanjiModules[key]?.default || firstTimeKanjiModules[key];
    const chapId = data?.id || key.split('/').pop().replace('.json', '');
    (data?.sections || []).forEach(sec => {
      (sec.questions || []).forEach(q => {
        const opts = (q.options || []).map(cleanOptionText);
        if (opts.length !== 4 || !(q.stem || q.questionText)) return;
        kanji.push({
          id: `ftkanji-${chapId}-${q.id}`,
          level: 'N3',
          category: 'kanji',
          typeLabel: sec.title || '漢字読み・表記',
          instructions: sec.instruction || '下線部の言葉の読み方・漢字として最もよいものを一つ選びなさい。',
          stem: q.stem || q.questionText,
          options: opts,
          correct: resolveOneBasedCorrect(q, q.options),
          explanation: q.explanation || '',
          sourceType: 'book_first_time_kanji',
          sourceLabel: `📕 はじめてのJLPT N3 漢字350 (${chapId.toUpperCase()})`,
          sourceRoute: `/books/first-time-jlpt-n3-350-kanji/chapters/${chapId}`,
        });
      });
    });
  });

  // B. Nihongo no Mori N3 (Kanji, Vocab, Grammar, Reading, Listening)
  Object.keys(nihongoNoMoriModules).filter(k => !k.endsWith('/book.json')).forEach(key => {
    const data = nihongoNoMoriModules[key]?.default || nihongoNoMoriModules[key];
    if (!data) return;
    const fileName = key.split('/').pop();

    // Moji / Goi / Grammar pages
    if (Array.isArray(data.pages)) {
      data.pages.forEach((pg, pIdx) => {
        (pg.questions || []).forEach((q, qIdx) => {
          const opts = (q.options || []).map(cleanOptionText);
          if (opts.length < 3) return;

          // Listening chapters (Chapter 4)
          if (data.chapter === 4 || fileName.startsWith('ch4_')) {
            const rawAudio = q.audioUrl || data.groupAudio || '';
            if (!rawAudio) return;
            const scriptStr = Array.isArray(q.script)
              ? q.script.map(line => `${line.speaker ? `<b>${line.speaker}：</b>` : ''}${line.text || line}`).join('<br/>')
              : (q.script || '');
            listening.push({
              id: `mori-lis-${fileName}-p${pIdx}-q${q.id || qIdx}`,
              level: 'N3',
              category: 'listening',
              typeLabel: data.sectionTitle || '聴解',
              instructions: data.instruction || '音声を聞いて、最もよいものを一つ選びなさい。',
              stem: q.stem || q.situation || '音声を聞いて答えを選んでください。',
              context: q.situation && q.situation !== q.stem ? q.situation : '',
              audioUrl: resolveAssetUrl(rawAudio),
              script: scriptStr,
              options: opts,
              correct: resolveOneBasedCorrect(q, q.options),
              explanation: q.explanation || '',
              sourceType: 'book_nihongo_no_mori',
              sourceLabel: `🌲 日本語の森 N3 (${data.sectionTitle || '聴解'})`,
              sourceRoute: '/books/nihongo-no-mori-n3',
            });
            return;
          }

          if (opts.length !== 4 || !q.stem) return;
          let cat = 'vocab';
          if (fileName.includes('mondai1') || fileName.includes('mondai2')) cat = 'kanji';
          else if (fileName.startsWith('ch2_')) cat = 'grammar';

          const item = {
            id: `mori-${fileName}-p${pIdx}-q${q.id || qIdx}`,
            level: 'N3',
            category: cat,
            typeLabel: data.sectionTitle || (cat === 'kanji' ? '漢字・表記' : cat === 'grammar' ? '文法' : '語彙'),
            instructions: data.instruction || '',
            stem: q.stem,
            options: opts,
            correct: resolveOneBasedCorrect(q, q.options),
            explanation: q.explanation || '',
            sourceType: 'book_nihongo_no_mori',
            sourceLabel: `🌲 日本語の森 N3 (${data.sectionTitle || ''})`,
            sourceRoute: '/books/nihongo-no-mori-n3',
          };
          if (cat === 'kanji') kanji.push(item);
          else if (cat === 'grammar') grammar.push(item);
          else vocab.push(item);
        });
      });
    }

    // Dokkai passages (Chapter 3)
    if (Array.isArray(data.passages)) {
      data.passages.forEach((p, pIdx) => {
        const qList = p.questions || (p.question ? [p.question] : []);
        qList.forEach((q, qIdx) => {
          const opts = (q.options || []).map(cleanOptionText);
          if (opts.length !== 4 || !p.passageText) return;
          reading.push({
            id: `mori-dokkai-${fileName}-p${pIdx}-q${qIdx}`,
            level: 'N3',
            category: 'reading',
            typeLabel: data.sectionTitle || '読解',
            instructions: data.instruction || '次の文章を読んで、後の問いに対する答えとして最もよいものを一つ選びなさい。',
            stem: q.stem || q.questionText,
            context: p.passageText,
            options: opts,
            correct: resolveOneBasedCorrect(q, q.options),
            explanation: q.explanation || '',
            sourceType: 'book_nihongo_no_mori',
            sourceLabel: `🌲 日本語の森 N3 (${data.sectionTitle || '読解'})`,
            sourceRoute: '/books/nihongo-no-mori-n3',
          });
        });
      });
    }
  });

  // C. Chokuzen Taisaku N3 (15 Practice Sets)
  if (practiceSetsBook?.sets) {
    shuffleArray(practiceSetsBook.sets).slice(0, 6).forEach(set => {
      const vkQuestions = set.sections?.['vocabulary-kanji']?.questions || [];
      vkQuestions.forEach((q, idx) => {
        const opts = (q.options || []).map(cleanOptionText);
        if (opts.length !== 4 || !q.questionText) return;
        const isKanji = (q.instruction || '').includes('読み方') || (q.instruction || '').includes('漢字');
        const cat = isKanji ? 'kanji' : 'vocab';
        const item = {
          id: `chokuzen-n3-${set.id}-vk-${q.id || idx}`,
          level: 'N3',
          category: cat,
          typeLabel: isKanji ? '漢字・表記' : '語彙',
          instructions: q.instruction || '',
          stem: q.questionText,
          options: opts,
          correct: resolveOneBasedCorrect(q, q.options),
          explanation: q.explanation || '',
          sourceType: 'book_chokuzen_n3',
          sourceLabel: `⚡ 直前対策 N3 (${set.title})`,
          sourceRoute: `/practice-sets/${set.id}`,
        };
        if (cat === 'kanji') kanji.push(item);
        else vocab.push(item);
      });

      const grQuestions = set.sections?.['grammar-reading']?.questions || set.sections?.grammar?.questions || [];
      grQuestions.forEach((q, idx) => {
        const opts = (q.options || []).map(cleanOptionText);
        if (opts.length !== 4 || !q.questionText) return;
        grammar.push({
          id: `chokuzen-n3-${set.id}-gr-${q.id || idx}`,
          level: 'N3',
          category: 'grammar',
          typeLabel: '文法',
          instructions: q.instruction || '',
          stem: q.questionText,
          context: q.passage || '',
          options: opts,
          correct: resolveOneBasedCorrect(q, q.options),
          explanation: q.explanation || '',
          sourceType: 'book_chokuzen_n3',
          sourceLabel: `⚡ 直前対策 N3 (${set.title})`,
          sourceRoute: `/practice-sets/${set.id}`,
        });
      });
    });
  }

  // D. Speed Master N3 Reading (Short & Medium Passages)
  shuffleArray(Object.keys(speedMasterReadingModules).filter(k => !k.endsWith('/book.json'))).slice(0, 12).forEach(key => {
    const data = speedMasterReadingModules[key]?.default || speedMasterReadingModules[key];
    if (!data || !data.passageText || !Array.isArray(data.questions)) return;
    const q = data.questions[0];
    if (!q) return;
    const opts = (q.options || []).map(cleanOptionText);
    if (opts.length !== 4) return;
    reading.push({
      id: `speedmaster-n3-${data.id}-q1`,
      level: 'N3',
      category: 'reading',
      typeLabel: data.section || '読解（短文・中文）',
      instructions: data.instruction || 'つぎの文章を読んで、質問に答えなさい。',
      stem: q.questionText || q.stem,
      context: data.passageText,
      options: opts,
      correct: resolveOneBasedCorrect(q, q.options),
      explanation: q.explanation || '',
      sourceType: 'book_speed_master',
      sourceLabel: `⚡ スピードマスター N3 読解 (${data.title})`,
      sourceRoute: `/books/speed-master-n3-reading/chapters/${data.id}`,
    });
  });

  // E. Shin Kanzen Master N3 Reading
  shuffleArray(Object.keys(shinkanzenReadingModules).filter(k => !k.endsWith('/book.json'))).slice(0, 12).forEach(key => {
    const data = shinkanzenReadingModules[key]?.default || shinkanzenReadingModules[key];
    if (!data) return;
    if (Array.isArray(data.passages)) {
      data.passages.forEach((p, idx) => {
        const q = p.questions?.[0];
        if (!q || !p.passageText) return;
        const opts = (q.options || []).map(cleanOptionText);
        if (opts.length !== 4) return;
        reading.push({
          id: `shinkanzen-n3-p1-${idx}`,
          level: 'N3',
          category: 'reading',
          typeLabel: '新完全マスター読解',
          instructions: '次の文章を読んで、後の問いに対する答えとして最もよいものを一つ選びなさい。',
          stem: q.questionText || q.stem,
          context: p.passageText,
          options: opts,
          correct: resolveOneBasedCorrect(q, q.options),
          explanation: q.explanation || '',
          sourceType: 'book_shinkanzen',
          sourceLabel: `👑 新完全マスター N3 読解 (${p.title || '短文'})`,
          sourceRoute: '/books/shinkanzen-master-n3-reading/chapters/part-1',
        });
      });
    } else if (data.passageText && Array.isArray(data.questions) && data.questions[0]) {
      const q = data.questions[0];
      const opts = (q.options || []).map(cleanOptionText);
      if (opts.length !== 4) return;
      reading.push({
        id: `shinkanzen-n3-${data.chapterId || data.id}`,
        level: 'N3',
        category: 'reading',
        typeLabel: '新完全マスター読解',
        instructions: data.mondaiHeader || '次の文章を読んで、後の問いに対する答えとして最もよいものを一つ選びなさい。',
        stem: q.questionText || q.stem,
        context: data.passageText,
        options: opts,
        correct: resolveOneBasedCorrect(q, q.options),
        explanation: q.explanation || '',
        sourceType: 'book_shinkanzen',
        sourceLabel: `👑 新完全マスター N3 読解 (${data.title || ''})`,
        sourceRoute: `/books/shinkanzen-master-n3-reading/chapters/${data.chapterId || data.id}`,
      });
    }
  });

  // F. Sou Matome N3 Reading
  shuffleArray(Object.keys(somatomeReadingModules).filter(k => !k.endsWith('/book.json'))).slice(0, 10).forEach(key => {
    const data = somatomeReadingModules[key]?.default || somatomeReadingModules[key];
    if (!data) return;
    const chapId = key.split('/').pop().replace('.json', '');
    const m = data.mondai;
    const noticeHtml = m?.notice?.html || m?.passage || '';
    const q = m?.questions?.[0];
    if (noticeHtml && q && Array.isArray(q.options) && q.options.length === 4) {
      reading.push({
        id: `somatome-n3-${chapId}-q1`,
        level: 'N3',
        category: 'reading',
        typeLabel: '総まとめ読解',
        instructions: m.instruction || '次の案内を見て、後の問いに答えなさい。',
        stem: q.question || q.questionText || q.stem,
        context: noticeHtml,
        options: q.options.map(cleanOptionText),
        correct: resolveOneBasedCorrect(q, q.options),
        explanation: q.explanation || '',
        sourceType: 'book_somatome',
        sourceLabel: `📙 日本語総まとめ N3 読解 (${chapId})`,
        sourceRoute: `/books/sou-matome-n3-reading/chapters/${chapId}`,
      });
    }
  });

  // G. Pass N3 Within 20 Days (Kanji mondai 1-2, Vocab mondai 3-5, Grammar mondai 6-7, Passage mondai 8)
  shuffleArray(Object.keys(passN3Within20DaysModules)).slice(0, 10).forEach(key => {
    const data = passN3Within20DaysModules[key]?.default || passN3Within20DaysModules[key];
    if (!data || !Array.isArray(data.sections)) return;
    const chapId = data.id || key.split('/').pop().replace('.json', '');
    const chapTitle = data.title || chapId.toUpperCase();

    data.sections.forEach(sec => {
      const mNum = Number(sec.number) || 0;
      const sType = (sec.type || '').toLowerCase();
      const passageContext = sec.passageText || sec.passage || '';

      (sec.questions || []).forEach((q, qIdx) => {
        const opts = (q.options || []).map(cleanOptionText);
        if (opts.length !== 4) return;
        const rawStem = q.stem || q.questionText || '';
        if (!rawStem && !passageContext) return;

        let cat = 'vocab';
        if (mNum === 1 || mNum === 2 || sType.includes('kanji')) {
          cat = 'kanji';
        } else if (mNum === 6 || mNum === 7 || sType.includes('grammar') || sType.includes('ordering')) {
          cat = 'grammar';
        } else if (mNum === 8 || (sType.includes('passage') && passageContext)) {
          cat = 'reading';
        }

        const formattedStem =
          mNum === 8 && /^\d+$/.test(String(rawStem).trim())
            ? `文章中の <u>　${String(rawStem).trim()}　</u> に入る最もよいものはどれですか。`
            : rawStem;

        const item = {
          id: `pass20-n3-${chapId}-${q.id || `m${mNum}-q${qIdx}`}`,
          level: 'N3',
          category: cat,
          typeLabel: sec.title || (cat === 'kanji' ? '漢字・表記' : cat === 'grammar' ? '文法' : cat === 'reading' ? '文章の文法・読解' : '語彙'),
          instructions: sec.instructionHtml || sec.instruction || '',
          stem: formattedStem,
          context: passageContext,
          options: opts,
          correct: resolveOneBasedCorrect(q, q.options),
          explanation: q.explanation || '',
          sourceType: 'book_pass_n3_20_days',
          sourceLabel: `🗓️ Pass N3 Within 20 Days (${chapTitle})`,
          sourceRoute: `/books/pass-n3-within-20-days/chapters/${chapId}`,
        };

        if (cat === 'kanji') kanji.push(item);
        else if (cat === 'grammar') grammar.push(item);
        else if (cat === 'reading') reading.push(item);
        else vocab.push(item);
      });
    });
  });

  return { kanji, vocab, grammar, reading, listening };
}

/**
 * 4. Harvest from Past Exam Papers & Full Mock Tests (public/data/jlpt_past_exams & jlpt_mock_tests)
 */
async function harvestExamsForLevel(level) {
  const normLevel = (level || 'N3').toUpperCase();
  const lowerLevel = normLevel.toLowerCase();

  const kanji = [];
  const vocab = [];
  const grammar = [];
  const reading = [];
  const listening = [];

  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  // Pick 2 random Past Exams for this level
  const levelPastExams = shuffleArray(
    pastExamsMeta.filter(e => (e.level || '').toUpperCase() === normLevel)
  ).slice(0, 2);

  // Pick 2 random Mock Tests for this level
  const levelMockTests = shuffleArray(
    mockTestsMeta.filter(t => (t.level || '').toUpperCase() === normLevel)
  ).slice(0, 2);

  const fetchPromises = [
    ...levelPastExams.map(async exam => {
      try {
        const res = await fetch(`${baseUrl}/data/jlpt_past_exams/${lowerLevel}/${exam.id}.json`);
        if (res.ok) {
          const json = await res.json();
          return { data: json, isPast: true, meta: exam };
        }
      } catch (_) {}
      return null;
    }),
    ...levelMockTests.map(async mock => {
      try {
        const res = await fetch(`${baseUrl}/data/jlpt_mock_tests/${mock.id}.json`);
        if (res.ok) {
          const json = await res.json();
          return { data: json, isPast: false, meta: mock };
        }
      } catch (_) {}
      return null;
    }),
  ];

  const loadedExams = (await Promise.all(fetchPromises)).filter(Boolean);

  loadedExams.forEach(({ data, isPast }) => {
    const examTitle = data.title || data.japaneseTitle || data.id;
    const sourceBadge = isPast ? `🏛️ 過去問 ${data.sessionName || examTitle}` : `📝 模擬試験 ${examTitle}`;
    const sourceRoute = isPast
      ? `/levels/${lowerLevel}/past-questions/${data.id}`
      : `/levels/${lowerLevel}/practice-tests/${data.id}`;

    (data.sections || []).forEach(sec => {
      const secId = (sec.id || '').toLowerCase();
      (sec.questions || []).forEach(q => {
        const opts = (q.options || []).map(cleanOptionText);
        if (opts.length < 3) return;
        const correct = resolveOneBasedCorrect(q, q.options);

        // Extract explanation string
        let explanation = q.explanation || '';
        if (!explanation && Array.isArray(q.explanations)) {
          const nonEmpty = q.explanations
            .map((ex, i) => (ex ? `<b>選択肢${i + 1}:</b> ${ex}` : ''))
            .filter(Boolean);
          explanation = nonEmpty.join('<br/>');
        }

        // Listening section
        if (secId.includes('listening') || secId.includes('choukai')) {
          if (!q.audioUrl) return;
          listening.push({
            id: `${data.id}-${q.id}`,
            level: normLevel,
            category: 'listening',
            typeLabel: q.typeLabel || '聴解',
            instructions: q.instructions || '音声を聞いて、最もよいものを一つ選びなさい。',
            stem: q.stem || '音声を聞いて、正しい答えを選んでください。',
            context: q.context || '',
            imageUrl: q.imageUrl || '',
            audioUrl: q.audioUrl,
            script: q.script || '',
            options: opts,
            correct,
            explanation,
            sourceType: isPast ? 'past_exam' : 'mock_test',
            sourceLabel: sourceBadge,
            sourceRoute,
          });
          return;
        }

        if (opts.length !== 4) return;

        // Classify written questions into kanji / vocab / grammar / reading
        const tLabel = q.typeLabel || '';
        const qType = q.type || '';
        let cat = 'vocab';

        if (
          q.context &&
          q.context.trim().length > 40 &&
          (secId.includes('reading') || secId.includes('dokkai') || tLabel.includes('内容理解') || tLabel.includes('情報検索') || tLabel.includes('統合理解') || tLabel.includes('主張理解'))
        ) {
          cat = 'reading';
        } else if (
          qType.includes('kanji') ||
          qType.includes('orthography') ||
          tLabel.includes('漢字') ||
          tLabel.includes('表記') ||
          (q.mondai === 1 && secId === 'vocab') ||
          (q.mondai === 2 && secId === 'vocab')
        ) {
          cat = 'kanji';
        } else if (
          secId.includes('grammar') ||
          tLabel.includes('文法') ||
          (secId === 'gengo_chisiki' && q.mondai >= 5)
        ) {
          cat = 'grammar';
        } else if (secId.includes('dokkai') && q.context) {
          cat = 'reading';
        }

        if (!q.stem && !q.blankLabel) return;

        const item = {
          id: `${data.id}-${q.id}`,
          level: normLevel,
          category: cat,
          typeLabel: tLabel || (cat === 'kanji' ? '漢字・表記' : cat === 'grammar' ? '文法' : cat === 'reading' ? '読解' : '語彙'),
          instructions: q.instructions || '',
          stem: q.stem || (q.blankLabel ? `文章中の <u>　${q.blankLabel}　</u> に入るものはどれか。` : ''),
          context: q.context || '',
          imageUrl: q.imageUrl || '',
          options: opts,
          correct,
          explanation,
          sourceType: isPast ? 'past_exam' : 'mock_test',
          sourceLabel: sourceBadge,
          sourceRoute,
        };

        if (cat === 'kanji') kanji.push(item);
        else if (cat === 'grammar') grammar.push(item);
        else if (cat === 'reading') reading.push(item);
        else vocab.push(item);
      });
    });
  });

  return { kanji, vocab, grammar, reading, listening };
}

/**
 * 5. Harvest from Static & Firestore Lists (quiz_data.jsx, kitty_vocab, JLPT-matome Kanji/Vocab/Grammar lists, Firestore Books)
 */
async function harvestStaticListsAndFirestoreBooks(level) {
  const normLevel = (level || 'N3').toUpperCase();
  const lowerLevel = normLevel.toLowerCase();

  const kanji = [];
  const vocab = [];
  const grammar = [];

  // A. Local quiz_data.jsx (N5/N4/N3/N2 static vocabulary lists)
  const levelQuizData = quizData[lowerLevel]?.vocabulary;
  if (levelQuizData) {
    const allStaticWords = [
      ...(levelQuizData.easy?.quiz_content || []),
      ...(levelQuizData.medium?.quiz_content || []),
      ...(levelQuizData.hard?.quiz_content || []),
    ].filter(w => w.hiragana && w.meaning);

    if (allStaticWords.length >= 8) {
      shuffleArray(allStaticWords).slice(0, 6).forEach((word, idx) => {
        const distractors = shuffleArray(
          allStaticWords.filter(w => w.meaning !== word.meaning)
        )
          .slice(0, 3)
          .map(w => w.meaning);
        if (distractors.length === 3) {
          const opts = shuffleArray([word.meaning, ...distractors]);
          vocab.push({
            id: `static-quizdata-${normLevel}-${idx}-${word.hiragana}`,
            level: normLevel,
            category: 'vocab',
            typeLabel: '語彙リスト (Static List)',
            instructions: '次の言葉の意味として最もよいものを、１・２・３・４から一つ選びなさい。',
            stem: `「<b>${word.kanji || word.hiragana}</b>」${word.kanji ? `（${word.hiragana}）` : ''}の意味はどれですか。`,
            options: opts,
            correct: opts.indexOf(word.meaning) + 1,
            explanation: `<b>【正解】${word.meaning}</b><br/>${word.kanji || word.hiragana} ＝ ${word.meaning}`,
            sourceType: 'static_list',
            sourceLabel: `📖 ${normLevel} 語彙リスト (Static Word Bank)`,
            sourceRoute: `/levels/${lowerLevel}/vocabulary-list`,
          });
        }
      });
    }
  }

  // A2. Dynamic N2 / N3 Kitty Vocabulary Banks (n2_kitty_vocab.json / n3_kitty_vocab.json) for rich offline coverage
  if (normLevel === 'N2' || normLevel === 'N3') {
    const kittyLoaderKey = `../data/${lowerLevel}_kitty_vocab.json`;
    const loader = kittyVocabLoaders[kittyLoaderKey];
    if (loader) {
      try {
        const mod = await loader();
        const kittyWords = (mod?.default || mod || []).filter(w => (w.kanji || w.kana) && w.english);
        if (kittyWords.length >= 12) {
          shuffleArray(kittyWords).slice(0, 8).forEach((w, idx) => {
            // 1. Vocabulary Meaning question
            const meaningDistractors = shuffleArray(
              kittyWords.filter(other => other.english && other.english !== w.english)
            )
              .slice(0, 3)
              .map(other => other.english);

            if (meaningDistractors.length === 3) {
              const opts = shuffleArray([w.english, ...meaningDistractors]);
              vocab.push({
                id: `kitty-vocab-${normLevel}-${w.id || idx}`,
                level: normLevel,
                category: 'vocab',
                typeLabel: '語彙リスト (Vocabulary Bank)',
                instructions: '次の言葉の意味として最もよいものを、１・２・３・４から一つ選びなさい。',
                stem: `「<b>${w.kanji || w.kana}</b>」${w.kanji && w.kana && w.kanji !== w.kana ? `（${w.kana}）` : ''}の意味はどれですか。`,
                options: opts,
                correct: opts.indexOf(w.english) + 1,
                explanation: `<b>【正解】${w.english}</b><br/>${w.kanji || w.kana}${w.kana ? `（${w.kana}）` : ''} ＝ ${w.english}`,
                sourceType: 'static_kitty_vocab',
                sourceLabel: `📖 ${normLevel} 語彙マスターバンク (${w.theme_name_ja || w.theme_name || 'Static Vocab'})`,
                sourceRoute: `/levels/${lowerLevel}/vocabulary-list`,
              });
            }

            // 2. Kanji Reading question (for half of the sampled words that have distinct kanji & kana)
            if (idx % 2 === 0 && w.kanji && w.kana && w.kanji !== w.kana) {
              const kanaDistractors = shuffleArray(
                kittyWords.filter(other => other.kana && other.kana !== w.kana && other.kana !== other.kanji)
              )
                .slice(0, 3)
                .map(other => other.kana);

              if (kanaDistractors.length === 3) {
                const kOpts = shuffleArray([w.kana, ...kanaDistractors]);
                kanji.push({
                  id: `kitty-kanji-${normLevel}-${w.id || idx}`,
                  level: normLevel,
                  category: 'kanji',
                  typeLabel: '漢字読み (Kanji Reading)',
                  instructions: '＿＿のことばの読み方として最もよいものを、１・２・３・４から一つ選びなさい。',
                  stem: `「<u>${w.kanji}</u>」の正しい読み方はどれですか。`,
                  options: kOpts,
                  correct: kOpts.indexOf(w.kana) + 1,
                  explanation: `<b>【正解】${w.kana}</b><br/>${w.kanji}（${w.kana}）：${w.english}`,
                  sourceType: 'static_kitty_vocab',
                  sourceLabel: `🈯 ${normLevel} 漢字・語彙バンク (${w.theme_name_ja || w.theme_name || 'Static Kanji'})`,
                  sourceRoute: `/levels/${lowerLevel}/vocabulary-list`,
                });
              }
            }
          });
        }
      } catch (_) {
        // Ignore dynamic import error
      }
    }
  }

  // B. Firestore JLPT-matome Kanji List, Vocab List, Grammar List + Firestore Books (Shin 500 Mon / Chokuzen N4)
  try {
    const timeout = (p, ms = 1400) =>
      Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);

    const [kanjiSnap, vocabSnap, grammarSnap] = await Promise.all([
      timeout(getDocs(query(collection(db, 'JLPT-matome', normLevel, 'kanjilist'), limit(40)))).catch(() => null),
      timeout(getDocs(query(collection(db, 'JLPT-matome', normLevel, 'vocablist'), limit(40)))).catch(() => null),
      timeout(getDocs(query(collection(db, 'JLPT-matome', normLevel, 'grammarlist'), limit(40)))).catch(() => null),
    ]);

    // Convert Kanji List items into 4-option questions
    if (kanjiSnap && !kanjiSnap.empty) {
      const kList = [];
      kanjiSnap.forEach(d => kList.push({ id: d.id, ...d.data() }));
      const validK = kList.filter(k => k.kanji && (k.meaning || k.onyomi || k.kunyomi));
      if (validK.length >= 6) {
        shuffleArray(validK).slice(0, 5).forEach((k, idx) => {
          const targetMeaning = k.meaning || k.onyomi || k.kunyomi;
          const distractors = shuffleArray(
            validK.filter(other => (other.meaning || other.onyomi || other.kunyomi) !== targetMeaning)
          )
            .slice(0, 3)
            .map(other => other.meaning || other.onyomi || other.kunyomi);
          if (distractors.length === 3) {
            const opts = shuffleArray([targetMeaning, ...distractors]);
            kanji.push({
              id: `matome-kanji-${normLevel}-${k.id || idx}`,
              level: normLevel,
              category: 'kanji',
              typeLabel: '漢字リスト',
              instructions: '次の漢字の意味・読み方として最もよいものを、１・２・３・４から一つ選びなさい。',
              stem: `漢字「<b>${k.kanji}</b>」${k.onyomi || k.kunyomi ? `（${[k.onyomi, k.kunyomi].filter(Boolean).join('・')}）` : ''}の意味はどれですか。`,
              options: opts,
              correct: opts.indexOf(targetMeaning) + 1,
              explanation: `<b>【正解】${targetMeaning}</b><br/>【漢字】${k.kanji} — 音読み: ${k.onyomi || '-'} / 訓読み: ${k.kunyomi || '-'} / 意味: ${k.meaning || '-'}`,
              sourceType: 'static_kanji_list',
              sourceLabel: `🈯 ${normLevel} 漢字リスト (Kanji List)`,
              sourceRoute: `/levels/${lowerLevel}/kanji-list`,
            });
          }
        });
      }
    }

    // Convert Vocab List items into 4-option questions
    if (vocabSnap && !vocabSnap.empty) {
      const vList = [];
      vocabSnap.forEach(d => vList.push({ id: d.id, ...d.data() }));
      const validV = vList.filter(v => (v.word || v.kanji) && v.meaning);
      if (validV.length >= 6) {
        shuffleArray(validV).slice(0, 5).forEach((v, idx) => {
          const wordLabel = v.word || v.kanji;
          const readingLabel = v.reading || v.hiragana || '';
          const distractors = shuffleArray(validV.filter(other => other.meaning !== v.meaning))
            .slice(0, 3)
            .map(other => other.meaning);
          if (distractors.length === 3) {
            const opts = shuffleArray([v.meaning, ...distractors]);
            vocab.push({
              id: `matome-vocab-${normLevel}-${v.id || idx}`,
              level: normLevel,
              category: 'vocab',
              typeLabel: '語彙リスト',
              instructions: '次の言葉の意味として最もよいものを、１・２・３・４から一つ選びなさい。',
              stem: `「<b>${wordLabel}</b>」${readingLabel && readingLabel !== wordLabel ? `（${readingLabel}）` : ''}の意味として最もよいものはどれですか。`,
              options: opts,
              correct: opts.indexOf(v.meaning) + 1,
              explanation: `<b>【正解】${v.meaning}</b><br/>${wordLabel}${readingLabel ? `（${readingLabel}）` : ''}：${v.meaning}`,
              sourceType: 'static_vocab_list',
              sourceLabel: `📖 ${normLevel} 語彙リスト (Vocabulary List)`,
              sourceRoute: `/levels/${lowerLevel}/vocabulary-list`,
            });
          }
        });
      }
    }

    // Convert Grammar List items into 4-option questions
    if (grammarSnap && !grammarSnap.empty) {
      const gList = [];
      grammarSnap.forEach(d => gList.push({ id: d.id, ...d.data() }));
      const validG = gList.filter(g => g.title && (g.meaning || g.definition));
      if (validG.length >= 6) {
        shuffleArray(validG).slice(0, 5).forEach((g, idx) => {
          const targetMeaning = g.meaning || g.definition;
          const distractors = shuffleArray(
            validG.filter(other => (other.meaning || other.definition) !== targetMeaning)
          )
            .slice(0, 3)
            .map(other => other.meaning || other.definition);
          if (distractors.length === 3) {
            const opts = shuffleArray([targetMeaning, ...distractors]);
            grammar.push({
              id: `matome-grammar-${normLevel}-${g.id || idx}`,
              level: normLevel,
              category: 'grammar',
              typeLabel: '文法リスト',
              instructions: '次の文型・文法表現の意味として最もよいものを、１・２・３・４から一つ選びなさい。',
              stem: `文法「<b>${g.title}</b>」の意味・用法として最も適切なものはどれですか。`,
              context: g.how_to_use ? `【接続・形】${g.how_to_use}` : '',
              options: opts,
              correct: opts.indexOf(targetMeaning) + 1,
              explanation: `<b>【正解】${targetMeaning}</b><br/><b>${g.title}</b>：${g.definition || g.meaning || ''}`,
              sourceType: 'static_grammar_list',
              sourceLabel: `📜 ${normLevel} 文法リスト (Grammar List)`,
              sourceRoute: `/levels/${lowerLevel}/grammar-list`,
            });
          }
        });
      }
    }

    // Also pull from Chokuzen Taisaku N4 in Firestore when testing N4
    if (normLevel === 'N4') {
      const n4Snap = await timeout(getDoc(doc(db, 'books', 'chokuzen-taisaku-n4')), 1400).catch(() => null);
      if (n4Snap && n4Snap.exists()) {
        const sets = n4Snap.data()?.sets || [];
        shuffleArray(sets).slice(0, 3).forEach(s => {
          (s.sections?.['vocabulary-kanji']?.questions || []).forEach((q, idx) => {
            const opts = (q.options || []).map(cleanOptionText);
            if (opts.length !== 4 || !q.questionText) return;
            const isK = (q.instruction || '').includes('読み') || (q.instruction || '').includes('漢字');
            const targetArr = isK ? kanji : vocab;
            targetArr.push({
              id: `chokuzen-n4-${s.id}-vk-${idx}`,
              level: 'N4',
              category: isK ? 'kanji' : 'vocab',
              typeLabel: isK ? '漢字・表記' : '語彙',
              instructions: q.instruction || '',
              stem: q.questionText,
              options: opts,
              correct: resolveOneBasedCorrect(q, q.options),
              explanation: q.explanation || '',
              sourceType: 'book_chokuzen_n4',
              sourceLabel: `⚡ 直前対策 N4 (${s.title || s.id})`,
              sourceRoute: `/chokuzen-taisaku-n4/${s.id}`,
            });
          });
          (s.sections?.['grammar-reading']?.questions || []).forEach((q, idx) => {
            const opts = (q.options || []).map(cleanOptionText);
            if (opts.length !== 4 || !q.questionText) return;
            grammar.push({
              id: `chokuzen-n4-${s.id}-gr-${idx}`,
              level: 'N4',
              category: 'grammar',
              typeLabel: '文法',
              instructions: q.instruction || '',
              stem: q.questionText,
              context: q.passage || '',
              options: opts,
              correct: resolveOneBasedCorrect(q, q.options),
              explanation: q.explanation || '',
              sourceType: 'book_chokuzen_n4',
              sourceLabel: `⚡ 直前対策 N4 (${s.title || s.id})`,
              sourceRoute: `/chokuzen-taisaku-n4/${s.id}`,
            });
          });
        });
      }
    }
  } catch (_) {
    // Graceful offline fallback
  }

  return { kanji, vocab, grammar };
}

/**
 * Collects the full multi-source pool for a single level ('N5'..'N1')
 */
export async function gatherMultiSourcePoolForLevel(level = 'N3') {
  const normLevel = (level || 'N3').toUpperCase();

  // Run synchronous & async harvesters in parallel
  const [examPools, listPools] = await Promise.all([
    harvestExamsForLevel(normLevel),
    harvestStaticListsAndFirestoreBooks(normLevel),
  ]);

  const zenPools = harvestZenkamokuForLevel(normLevel);
  const tangoPools = harvestTangoForLevel(normLevel);
  const n3Special = normLevel === 'N3'
    ? harvestN3SpecialBooks()
    : { kanji: [], vocab: [], grammar: [], reading: [], listening: [] };

  return {
    kanji: [
      ...zenPools.kanji,
      ...tangoPools.kanji,
      ...n3Special.kanji,
      ...examPools.kanji,
      ...listPools.kanji,
    ],
    vocab: [
      ...zenPools.vocab,
      ...tangoPools.vocab,
      ...n3Special.vocab,
      ...examPools.vocab,
      ...listPools.vocab,
    ],
    grammar: [
      ...zenPools.grammar,
      ...n3Special.grammar,
      ...examPools.grammar,
      ...listPools.grammar,
    ],
    reading: [
      ...zenPools.reading,
      ...n3Special.reading,
      ...examPools.reading,
    ],
    listening: [
      ...n3Special.listening,
      ...examPools.listening,
    ],
  };
}

/**
 * Generates a fresh 20-Question Assessment:
 * - Q1..Q4:   4 Kanji questions
 * - Q5..Q8:   4 Vocabulary questions
 * - Q9..Q14:  6 Grammar questions
 * - Q15..Q18: 4 Reading Comprehension questions
 * - Q19..Q20: 2 Listening Comprehension questions with audio
 *
 * @param {string} mode - 'ALL' (All-Levels Placement N5->N1) or 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
 */
export async function generateRandom20QuestionTest(mode = 'ALL') {
  const seenIds = getSeenQuestionIds();
  const normMode = (mode || 'ALL').toUpperCase();

  if (normMode !== 'ALL') {
    const pool = await gatherMultiSourcePoolForLevel(normMode);

    const qKanji = pickBalancedRandom(pool.kanji, 4, seenIds);
    const qVocab = pickBalancedRandom(pool.vocab, 4, seenIds);
    const qGrammar = pickBalancedRandom(pool.grammar, 6, seenIds);
    const qReading = pickBalancedRandom(pool.reading, 4, seenIds);
    const qListening = pickBalancedRandom(pool.listening, 2, seenIds);

    const combined = [
      ...qKanji,
      ...qVocab,
      ...qGrammar,
      ...qReading,
      ...qListening,
    ].map((q, idx) => ({
      ...q,
      questionNumber: idx + 1,
    }));

    return combined;
  }

  // ALL-LEVELS PLACEMENT MODE (N5 -> N1)
  // Gathers random questions across all 5 levels so we can diagnose the user's true JLPT level
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const poolsByLevel = {};
  await Promise.all(
    levels.map(async lvl => {
      poolsByLevel[lvl] = await gatherMultiSourcePoolForLevel(lvl);
    })
  );

  // Pick 4 Kanji (spanning N5, N4, N3, N2/N1)
  const qKanji = [
    ...pickBalancedRandom(poolsByLevel.N5.kanji, 1, seenIds),
    ...pickBalancedRandom(poolsByLevel.N4.kanji, 1, seenIds),
    ...pickBalancedRandom(poolsByLevel.N3.kanji, 1, seenIds),
    ...pickBalancedRandom([...poolsByLevel.N2.kanji, ...poolsByLevel.N1.kanji], 1, seenIds),
  ];

  // Pick 4 Vocab (spanning N5, N4, N3, N2/N1)
  const qVocab = [
    ...pickBalancedRandom(poolsByLevel.N5.vocab, 1, seenIds),
    ...pickBalancedRandom(poolsByLevel.N4.vocab, 1, seenIds),
    ...pickBalancedRandom(poolsByLevel.N3.vocab, 1, seenIds),
    ...pickBalancedRandom([...poolsByLevel.N2.vocab, ...poolsByLevel.N1.vocab], 1, seenIds),
  ];

  // Pick 6 Grammar (1 N5, 1 N4, 2 N3, 1 N2, 1 N1)
  const qGrammar = [
    ...pickBalancedRandom(poolsByLevel.N5.grammar, 1, seenIds),
    ...pickBalancedRandom(poolsByLevel.N4.grammar, 1, seenIds),
    ...pickBalancedRandom(poolsByLevel.N3.grammar, 2, seenIds),
    ...pickBalancedRandom(poolsByLevel.N2.grammar, 1, seenIds),
    ...pickBalancedRandom(poolsByLevel.N1.grammar, 1, seenIds),
  ];

  // Pick 4 Reading (1 N5/N4, 2 N3, 1 N2/N1)
  const qReading = [
    ...pickBalancedRandom([...poolsByLevel.N5.reading, ...poolsByLevel.N4.reading], 1, seenIds),
    ...pickBalancedRandom(poolsByLevel.N3.reading, 2, seenIds),
    ...pickBalancedRandom([...poolsByLevel.N2.reading, ...poolsByLevel.N1.reading], 1, seenIds),
  ];

  // Pick 2 Listening with audio at the end (1 N4/N3, 1 N3/N2)
  const qListening = [
    ...pickBalancedRandom([...poolsByLevel.N4.listening, ...poolsByLevel.N3.listening], 1, seenIds),
    ...pickBalancedRandom([...poolsByLevel.N3.listening, ...poolsByLevel.N2.listening], 1, seenIds),
  ];

  return [
    ...qKanji,
    ...qVocab,
    ...qGrammar,
    ...qReading,
    ...qListening,
  ].map((q, idx) => ({
    ...q,
    questionNumber: idx + 1,
  }));
}

/**
 * Evaluates the 20-question assessment and produces a full diagnostic report
 */
export function evaluateLevelCheckResult(questions = [], answers = {}, mode = 'ALL', elapsedSeconds = 0) {
  const categoryMeta = {
    kanji:     { id: 'kanji',     label: '漢字・表記 (Kanji)',       icon: '🈁', correct: 0, total: 0 },
    vocab:     { id: 'vocab',     label: '語彙 (Vocabulary)',        icon: '📖', correct: 0, total: 0 },
    grammar:   { id: 'grammar',   label: '文法 (Grammar)',           icon: '⛩️', correct: 0, total: 0 },
    reading:   { id: 'reading',   label: '読解 (Reading)',           icon: '📜', correct: 0, total: 0 },
    listening: { id: 'listening', label: '聴解 (Listening Audio)',   icon: '🎧', correct: 0, total: 0 },
  };

  const levelWeights = { N5: 1, N4: 1.4, N3: 1.9, N2: 2.5, N1: 3.2 };
  let weightedEarned = 0;
  let weightedMax = 0;
  let totalCorrect = 0;
  const sourceStats = {};

  questions.forEach(q => {
    const cat = categoryMeta[q.category] ? q.category : 'vocab';
    categoryMeta[cat].total += 1;

    const w = levelWeights[q.level] || 1.5;
    weightedMax += w;

    const userAns = answers[q.id];
    const isCorrect = userAns !== undefined && userAns !== 'skip' && userAns === q.correct;
    if (isCorrect) {
      totalCorrect += 1;
      categoryMeta[cat].correct += 1;
      weightedEarned += w;
    }

    const srcKey = q.sourceLabel || 'General';
    if (!sourceStats[srcKey]) {
      sourceStats[srcKey] = { label: srcKey, route: q.sourceRoute, total: 0, correct: 0, level: q.level };
    }
    sourceStats[srcKey].total += 1;
    if (isCorrect) sourceStats[srcKey].correct += 1;
  });

  const totalQuestions = questions.length || 20;
  const accuracyPercent = Math.round((totalCorrect / totalQuestions) * 100);
  const weightedRatio = weightedMax > 0 ? weightedEarned / weightedMax : 0;
  const scaledScore180 = Math.round((totalCorrect / totalQuestions) * 180);

  let diagnosedLevel = 'N5';
  let readinessTitle = '';
  let readinessDesc = '';

  const normMode = (mode || 'ALL').toUpperCase();
  if (normMode === 'ALL') {
    if (weightedRatio >= 0.80 && accuracyPercent >= 80) {
      diagnosedLevel = 'N1';
      readinessTitle = 'JLPT N1 (Advanced Mastery Track)';
      readinessDesc = 'Outstanding! You handled upper-intermediate and advanced kanji, grammar, reading, and listening with high accuracy.';
    } else if (weightedRatio >= 0.63) {
      diagnosedLevel = 'N2';
      readinessTitle = 'JLPT N2 (Upper-Intermediate Track)';
      readinessDesc = 'Strong performance across N3 and N2 items. You are ready to focus on N2 textbooks and past exams.';
    } else if (weightedRatio >= 0.45) {
      diagnosedLevel = 'N3';
      readinessTitle = 'JLPT N3 (Intermediate Bridge Track)';
      readinessDesc = 'You have a solid foundation in basic Japanese and are right in the N3 zone. Focus on N3 grammar, reading sprints, and vocabulary.';
    } else if (weightedRatio >= 0.26) {
      diagnosedLevel = 'N4';
      readinessTitle = 'JLPT N4 (Elementary Track)';
      readinessDesc = 'You know foundational expressions and basic kanji. Strengthening N4 grammar and Chokuzen Taisaku sets will prepare you for N3.';
    } else {
      diagnosedLevel = 'N5';
      readinessTitle = 'JLPT N5 (Beginner Foundation Track)';
      readinessDesc = 'Start with N5 Kanji, Vocabulary lists, and Shin Nihongo 500 Mon N4-N5 to build a rock-solid foundation.';
    }
  } else {
    diagnosedLevel = normMode;
    if (accuracyPercent >= 80) {
      readinessTitle = `${normMode} Mastery — Exam Ready! (合格圏内)`;
      readinessDesc = `You scored ${accuracyPercent}% (${scaledScore180}/180 scaled) across randomized ${normMode} books, past papers, and static lists. You are ready to challenge the next level!`;
    } else if (accuracyPercent >= 55) {
      readinessTitle = `${normMode} Borderline / Passing Range (あと一歩で安定合格)`;
      readinessDesc = `You scored ${accuracyPercent}% (${scaledScore180}/180 scaled). You are in the passing zone for ${normMode}, but reviewing your weakest section below will lock in your pass.`;
    } else {
      readinessTitle = `${normMode} In Progress — Needs Reinforcement (基礎固めが必要)`;
      readinessDesc = `You scored ${accuracyPercent}% (${scaledScore180}/180 scaled). Focus on the recommended ${normMode} textbooks and vocabulary lists below before taking the full exam.`;
    }
  }

  const categoryBreakdown = Object.values(categoryMeta).map(c => ({
    ...c,
    percent: c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0,
  }));

  return {
    mode: normMode,
    diagnosedLevel,
    readinessTitle,
    readinessDesc,
    totalCorrect,
    totalQuestions,
    accuracyPercent,
    scaledScore180,
    elapsedSeconds,
    categoryBreakdown,
    sourceBreakdown: Object.values(sourceStats),
  };
}
