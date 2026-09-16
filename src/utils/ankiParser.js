// src/utils/ankiParser.js
import { getAssetUrl } from './ankiDecksCatalog';

/**
 * Converts Anki-style bracket notation (e.g., "私[わたし]は 日本[にほん]に 行[い]きます" or "負う[おう]")
 * into HTML <ruby> tags: "<ruby>私<rt>わたし</rt></ruby>は <ruby>日本<rt>にほん</rt></ruby>に <ruby>行<rt>い</rt></ruby>きます"
 */
export function ankiFuriganaToRuby(text) {
  if (!text) return '';
  let clean = text
    .replace(/\[sound:[^\]]+\]/gi, '')
    .replace(/\{[A-Z0-9_\s-]+\}/gi, '')
    .trim();

  // Convert legacy FONT COLOR tags to bold highlighting
  clean = clean.replace(/<font\s+color=[^>]+>([\s\S]*?)<\/font>/gi, '<b>$1</b>');

  // 1. Handle parenthesis style: 漢字（かんじ） or 漢字(かんじ)
  clean = clean.replace(/([一-龯々ヶ\u3040-\u309F\u30A0-\u30FF]+)[（(]([\u3040-\u309F\u30A0-\u30FF]+)[）)]/g, '<ruby>$1<rt>$2</rt></ruby>');

  // 2. Handle standard and extended Anki bracket notation:
  clean = clean.replace(/([^\s\[\]<>()（）]+)\[([^\]]+)\]/g, '<ruby>$1<rt>$2</rt></ruby>');

  return clean;
}

/**
 * Builds clean <ruby>Kanji<rt>Reading</rt></ruby> markup ensuring the base Kanji
 * is never lost or replaced by plain kana, and furigana is placed directly on top.
 */
export function buildRubyFurigana(expression, readingOrFurigana) {
  const expr = stripAnkiHtml(expression || '').trim();
  const rawReading = (readingOrFurigana || '').trim();

  if (!expr) return '';
  if (!rawReading) return expr;

  // 1. If reading already has bracket or parenthesis markup (e.g. "相[あい] 手[て]" or "負[お]う")
  if (/\[.+\]|[（(].+[）)]/.test(rawReading)) {
    return ankiFuriganaToRuby(rawReading);
  }

  // 2. If expression has no Kanji, no ruby furigana needed
  const hasKanji = /[一-龯々ヶ]/.test(expr);
  if (!hasKanji) {
    return expr;
  }

  const cleanReading = stripAnkiHtml(rawReading);
  if (!cleanReading || cleanReading === expr) {
    return expr;
  }

  // 3. Handle Kanji prefix + Kana suffix okurigana (e.g. "食べる", reading "たべる")
  const okuriganaMatch = expr.match(/^([一-龯々ヶ]+)([\u3040-\u309F\u30A0-\u30FF]+)$/);
  if (okuriganaMatch) {
    const kanjiPart = okuriganaMatch[1];
    const kanaSuffix = okuriganaMatch[2];
    if (cleanReading.endsWith(kanaSuffix) && cleanReading.length > kanaSuffix.length) {
      const kanjiReading = cleanReading.slice(0, -kanaSuffix.length);
      return `<ruby>${kanjiPart}<rt>${kanjiReading}</rt></ruby>${kanaSuffix}`;
    }
  }

  // 4. Wrap entire Kanji expression with reading on top
  return `<ruby>${expr}<rt>${cleanReading}</rt></ruby>`;
}

/**
 * Strips HTML tags, ruby rt furigana, and Anki sound/bracket/metadata tags to get clean plain text
 */
export function stripAnkiHtml(html) {
  if (!html) return '';
  return html
    .replace(/\[sound:[^\]]+\]/gi, '')
    .replace(/<rt>.*?<\/rt>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[[^\]]+\]/g, '')
    .replace(/\{[A-Z0-9_\s-]+\}/gi, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts concise plain English meanings from a complex Yomitan glossary HTML string
 */
export function extractConciseYomitanMeaning(html) {
  if (!html) return '';
  if (!html.includes('<') && !html.includes('>')) return html;

  // Search for <li> inside <ul data-sc-content="glossary">
  const match = html.match(/<ul[^>]*data-sc-content=["']glossary["'][^>]*>([\s\S]*?)<\/ul>/i);
  if (match) {
    const items = [...match[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map(m => stripAnkiHtml(m[1]))
      .filter(Boolean);
    if (items.length > 0) return items.slice(0, 3).join(', ');
  }

  // Fallback: strip HTML and clean metadata words
  const plain = stripAnkiHtml(html);
  const clean = plain
    .replace(/(?:1-dan|transitive|intransitive|noun|Ichidan verb|martial arts|sum[oō]|forms|JMdict|Tatoeba)\b/gi, '')
    .replace(/[①②③④⑤⑥⑦⑧⑨⑩＊•]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return clean.length > 90 ? clean.slice(0, 90) + '...' : clean;
}

function buildCardFields(card) {
  if (card.fields && Array.isArray(card.fields) && card.fields.length > 0) return card.fields;
  const excluded = new Set(['id', 'deckId', 'layoutType', 'fsrsCard', 'fields', 'rawFields']);
  return Object.entries(card)
    .filter(([k, v]) => !excluded.has(k) && v !== null && v !== undefined && typeof v !== 'object')
    .map(([k, v]) => ({
      name: k.charAt(0).toUpperCase() + k.slice(1),
      raw: String(v || ''),
      html: String(v || ''),
      plain: stripAnkiHtml(String(v || ''))
    }));
}

/**
 * Normalizes different deck JSON formats into a standard AnkiCard object
 */
export function normalizeAnkiCard(card, deckId = 'custom') {
  if (!card) return null;
  const fields = buildCardFields(card);

  // 1. Shin Kanzen N3 Grammar format
  if (card.frontSentence || card.grammarPattern || deckId === 'shin-kanzen-n3-grammar') {
    const lessonNum = card.lessonNumber || (card.lessonInfo ? parseInt(card.lessonInfo.replace(/[^\d]/g, '') || '1', 10) : (card.deckName ? parseInt(card.deckName.replace(/[^\d]/g, '') || '1', 10) : 1));
    const lessonInfo = card.lessonInfo || `Lesson ${String(lessonNum).padStart(2, '0')}`;
    
    return {
      id: `${deckId}-${card.id || card.noteId || Math.random().toString(36).substr(2, 9)}`,
      deckId,
      layoutType: 'grammar',
      level: card.level || 'N3',
      expression: card.grammarPattern || card.frontSentence || '',
      furigana: '',
      meaning: card.translation || card.grammarExplanation || '',
      frontSentence: card.frontSentence || '',
      backSentence: card.backSentence ? ankiFuriganaToRuby(card.backSentence) : '',
      backSentencePlain: stripAnkiHtml(card.backSentence || ''),
      grammarPattern: card.grammarPattern || '',
      lessonInfo: lessonInfo,
      lessonNumber: lessonNum,
      translation: card.translation || '',
      richGrammarFormation: card.richGrammarFormation || '',
      grammarExplanation: card.grammarExplanation || '',
      additionalNotes: card.additionalNotes || card.styleNotes || '',
      detailedExplanation: card.detailedExplanation || '',
      audio: card.audioFile ? getAssetUrl(`anki_decks/audio/${card.audioFile}`) : null,
      fields: fields,
      tags: card.tags || []
    };
  }

  // 2. Anime sentence mining format
  if (card.picture || card.sentenceReading || card.wordReading || deckId === 'anime-sentence-mining') {
    let rawPic = card.picture || card.image || '';
    let imgSrc = null;
    if (rawPic) {
      const match = rawPic.match(/src=["']([^"']+)["']/i);
      const fn = match ? match[1] : rawPic;
      imgSrc = getAssetUrl(`anki_decks/anime_media/${fn}`);
    }

    const extractSound = (val) => {
      if (!val) return null;
      const m = String(val).match(/\[sound:([^\]]+)\]/i);
      const fn = m ? m[1] : val;
      return getAssetUrl(`anki_decks/audio/${fn}`);
    };

    const sentenceAudio = extractSound(card.sentenceAudio);
    const wordAudio = extractSound(card.wordAudio);
    const mainAudio = sentenceAudio || wordAudio || extractSound(card.audio);

    const rawDef = card.primaryDefinition || card.meaning || '';
    const conciseMeaning = extractConciseYomitanMeaning(rawDef) || stripAnkiHtml(card.englishSentence || '');
    const wordExpr = card.word ? stripAnkiHtml(card.word) : stripAnkiHtml(card.sentence || '');

    return {
      id: `${deckId}-${card.id || card.noteId || Math.random().toString(36).substr(2, 9)}`,
      deckId,
      layoutType: 'anime',
      level: card.level || 'N3',
      expression: wordExpr,
      furigana: buildRubyFurigana(wordExpr, card.wordReading) || (card.sentenceReading ? ankiFuriganaToRuby(card.sentenceReading) : ''),
      conciseMeaning: conciseMeaning,
      meaning: rawDef || card.englishSentence || '',
      primaryDefinition: rawDef,
      sentence: card.sentenceReading ? ankiFuriganaToRuby(card.sentenceReading) : (card.sentence ? ankiFuriganaToRuby(card.sentence) : ''),
      sentencePlain: stripAnkiHtml(card.sentence || card.sentenceReading || ''),
      sentenceEng: card.englishSentence || card.translation || '',
      audio: mainAudio,
      sentenceAudio: sentenceAudio,
      wordAudio: wordAudio,
      image: imgSrc,
      extraDefinitions: card.extraDefinitions || card.secondaryDefinition || '',
      comment: card.comment || card.myPersonalDefinition || '',
      fields: fields,
      tags: card.tags || []
    };
  }

  // 3. Ankidrone Essentials & Core 10k format
  if (card.vocabKanji || card.sentKanji || deckId === 'ankidrone-essentials' || deckId === 'core-10k') {
    let cleanImage = null;
    if (card.image) {
      const match = card.image.match(/src=["']([^"']+)["']/i);
      cleanImage = match ? match[1] : card.image;
    }

    const extractSound = (val) => {
      if (!val) return null;
      const m = String(val).match(/\[sound:([^\]]+)\]/i);
      const fn = m ? m[1] : val;
      return getAssetUrl(`anki_decks/audio/${fn}`);
    };

    const sentenceAudio = extractSound(card.sentAudio || card.sentenceAudio);
    const wordAudio = extractSound(card.vocabAudio || card.wordAudio);
    const mainAudio = wordAudio || sentenceAudio || extractSound(card.audio);

    let level = card.level || (card.tags && card.tags[0]?.includes('N') ? card.tags[0] : 'All');
    if (deckId === 'core-10k') {
      const idx = typeof card.id === 'number' ? card.id : 1;
      if (idx <= 2000) level = 'Core 2k';
      else if (idx <= 4000) level = 'Core 4k';
      else if (idx <= 6000) level = 'Core 6k';
      else if (idx <= 8000) level = 'Core 8k';
      else level = 'Core 10k';
    }

    const sentences = [];
    if (card.sentKanji || card.sentence) {
      sentences.push({
        ja: card.sentKanji ? ankiFuriganaToRuby(card.sentFurigana || card.sentKanji) : ankiFuriganaToRuby(card.sentence),
        jaPlain: stripAnkiHtml(card.sentKanji || card.sentFurigana || card.sentence),
        en: card.sentEng || card.sentenceEng || '',
        audio: sentenceAudio
      });
    }
    for (let i = 2; i <= 5; i++) {
      const sJa = card[`sentKanji${i}`] || card[`sentFurigana${i}`] || card[`sentence${i}`] || card[`example${i}`];
      if (sJa) {
        sentences.push({
          ja: ankiFuriganaToRuby(card[`sentFurigana${i}`] || sJa),
          jaPlain: stripAnkiHtml(sJa),
          en: card[`sentEng${i}`] || card[`sentenceEng${i}`] || card[`sentenceMeaning${i}`] || card[`exampleEng${i}`] || '',
          audio: extractSound(card[`sentAudio${i}`] || card[`sentenceAudio${i}`])
        });
      }
    }

    const vocabExpr = card.vocabKanji ? stripAnkiHtml(card.vocabKanji) : stripAnkiHtml(card.vocabFurigana || '');

    return {
      id: `${deckId}-${card.id || card.cardId || card.noteId || Math.random().toString(36).substr(2, 9)}`,
      deckId,
      layoutType: 'sentence_vocab',
      level: level,
      expression: vocabExpr,
      furigana: buildRubyFurigana(vocabExpr, card.vocabFurigana),
      meaning: card.vocabDef || card.sentEng || '',
      pitchPattern: card.vocabPitchPattern || '',
      pitchNum: card.vocabPitchNum || '',
      netflixFreq: card.netflixFreq || card.netfilxFreq || '',
      sentence: card.sentKanji ? ankiFuriganaToRuby(card.sentFurigana || card.sentKanji) : '',
      sentenceKanji: card.sentKanji || card.sentence || '',
      sentencePlain: stripAnkiHtml(card.sentKanji || card.sentFurigana || ''),
      sentenceEng: card.sentEng || '',
      sentences: sentences,
      audio: mainAudio,
      sentenceAudio: sentenceAudio,
      wordAudio: wordAudio,
      image: cleanImage ? getAssetUrl(`anki_decks/anime_media/${cleanImage}`) : null,
      notes: card.notes 
        ? card.notes
            .replace(/JLPT\s+Tango\s+N\d+\s+item\s+\d+\s*(?:<br\/?>|\n)*/gi, '')
            .replace(/\n/g, '<br/>')
            .replace(/^<br\/?>+|<br\/?>+$/gi, '')
            .trim() 
        : '',
      fields: fields,
      tags: card.tags || []
    };
  }

  // 4. Tango N3, Shin Kanzen Vocab & Speed Master format
  if (card.expression || card.vocabMeaning || card.reading) {
    let meaning = card.meaning || card.vocabMeaning || '';
    let reading = card.reading || '';

    const isReadingEnglish = /^[a-zA-Z\s,;'"-./()]+$/.test(reading.trim());
    const isMeaningKana = /^[\u3040-\u309F\u30A0-\u30FF\s]+$/.test(meaning.trim());

    if (isReadingEnglish && isMeaningKana) {
      const tmp = meaning;
      meaning = reading;
      reading = tmp;
    }

    let cleanAudio = card.audio;
    if (cleanAudio) {
      const m = cleanAudio.match(/\[sound:([^\]]+)\]/i);
      cleanAudio = m ? m[1] : cleanAudio;
    }

    const sentences = [];
    const rawSent = card.sentence || card.sentKanji || '';
    if (rawSent) {
      // Check if sentence has multi-example blocks separated by <br><br> or double newlines
      const blocks = rawSent.split(/(?:<br\s*\/?>\s*){2,}|\n\n+/gi).map(b => b.trim()).filter(Boolean);
      if (blocks.length > 1) {
        blocks.forEach((block, bIdx) => {
          const lines = block.split(/<br\s*\/?>|\n/gi).map(l => l.trim()).filter(Boolean);
          const jaLine = lines[0] || '';
          const enLine = lines.slice(1).join(' ');
          sentences.push({
            ja: ankiFuriganaToRuby(jaLine),
            jaPlain: stripAnkiHtml(jaLine),
            en: stripAnkiHtml(enLine).replace(/\{[A-Z0-9_\s-]+\}/gi, '').trim(),
            audio: bIdx === 0 && cleanAudio ? getAssetUrl(`anki_decks/audio/${cleanAudio}`) : null
          });
        });
      } else {
        sentences.push({
          ja: ankiFuriganaToRuby(rawSent),
          jaPlain: stripAnkiHtml(rawSent),
          en: card.sentenceMeaning || card.sentenceEng || card.sentEng || '',
          audio: cleanAudio ? getAssetUrl(`anki_decks/audio/${cleanAudio}`) : null
        });
      }
    }
    for (let i = 2; i <= 5; i++) {
      const sJa = card[`sentence${i}`] || card[`sentKanji${i}`] || card[`sentFurigana${i}`] || card[`example${i}`];
      if (sJa) {
        sentences.push({
          ja: ankiFuriganaToRuby(card[`sentFurigana${i}`] || sJa),
          jaPlain: stripAnkiHtml(sJa),
          en: card[`sentenceMeaning${i}`] || card[`sentenceEng${i}`] || card[`sentEng${i}`] || card[`exampleEng${i}`] || '',
          audio: null
        });
      }
    }

    const vocabExpr = card.expression ? stripAnkiHtml(card.expression) : '';

    return {
      id: `${deckId}-${card.id || card.noteId || Math.random().toString(36).substr(2, 9)}`,
      deckId,
      layoutType: 'vocab',
      level: card.tags?.find(t => t.startsWith('N')) || 'N3',
      expression: vocabExpr,
      furigana: buildRubyFurigana(vocabExpr, reading),
      meaning: meaning,
      sentence: card.sentence ? ankiFuriganaToRuby(card.sentence) : '',
      sentencePlain: stripAnkiHtml(card.sentence || ''),
      sentenceEng: card.sentenceMeaning || '',
      sentences: sentences,
      audio: cleanAudio ? getAssetUrl(`anki_decks/audio/${cleanAudio}`) : null,
      image: card.image ? getAssetUrl(`anki_decks/anime_media/${card.image}`) : null,
      notes: card.notes || '',
      fields: fields,
      tags: card.tags || []
    };
  }

  // Generic fallback
  const fallbackExpr = stripAnkiHtml(card.front || card.word || card.japanese || '');
  return {
    id: `${deckId}-${card.id || Math.random().toString(36).substr(2, 9)}`,
    deckId,
    layoutType: 'vocab',
    level: card.level || 'All',
    expression: fallbackExpr,
    furigana: buildRubyFurigana(fallbackExpr, card.furigana || card.reading || ''),
    meaning: card.back || card.meaning || card.english || '',
    sentence: card.sentence ? ankiFuriganaToRuby(card.sentence) : '',
    sentencePlain: stripAnkiHtml(card.sentence || ''),
    sentenceEng: card.sentenceEng || '',
    audio: null,
    image: null,
    notes: '',
    fields: fields,
    tags: []
  };
}
