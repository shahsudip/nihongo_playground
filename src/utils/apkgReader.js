import JSZip from 'jszip';
import initSqlJs from 'sql.js';
import { ankiFuriganaToRuby, buildRubyFurigana, stripAnkiHtml, extractConciseYomitanMeaning } from './ankiParser';
import { getAssetUrl } from './ankiDecksCatalog';

let sqlPromise = null;

export async function getSql() {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: (file) => {
        if (file === 'sql-wasm.wasm') {
          return getAssetUrl('sql-wasm.wasm');
        }
        return `https://sql.js.org/dist/${file}`;
      }
    });
  }
  return sqlPromise;
}

/**
 * Extracts and parses a .apkg file into a full structured deck
 * @param {File | ArrayBuffer} apkgFile
 * @param {Function} onProgress (optional callback for UI progress updates)
 * @returns {Promise<{ deckTitle: string, cardCount: number, cards: Array, mediaMap: Object }>}
 */
export async function parseApkgFile(apkgFile, onProgress = () => {}) {
  onProgress(10, 'Unzipping .apkg archive...');
  const zip = new JSZip();
  const zipData = await zip.loadAsync(apkgFile);

  // 1. Parse Media Map
  onProgress(30, 'Extracting media files...');
  const mediaMap = {}; // filename -> ObjectURL
  const mediaFile = zipData.file('media');

  if (mediaFile) {
    try {
      const mediaJsonText = await mediaFile.async('text');
      const parsedMedia = JSON.parse(mediaJsonText); // { "0": "file.mp3", "1": "img.png" }

      for (const [zipIndex, realFilename] of Object.entries(parsedMedia)) {
        const fileInZip = zipData.file(zipIndex);
        if (fileInZip) {
          const blob = await fileInZip.async('blob');
          mediaMap[realFilename] = URL.createObjectURL(blob);
        }
      }
    } catch (e) {
      console.warn('Could not parse media manifest:', e);
    }
  }

  // 2. Locate SQLite DB
  onProgress(50, 'Loading collection database...');
  let dbFile = zipData.file('collection.anki21') || zipData.file('collection.anki2');

  if (!dbFile) {
    // Try to find any file named collection.*
    const matched = Object.keys(zipData.files).find(name => name.startsWith('collection.anki'));
    if (matched) dbFile = zipData.file(matched);
  }

  if (!dbFile) {
    throw new Error('Invalid .apkg format: SQLite collection database not found.');
  }

  const dbBuffer = await dbFile.async('uint8array');

  // 3. Initialize SQLite in WebAssembly
  onProgress(70, 'Querying Anki flashcards...');
  const SQL = await getSql();
  const db = new SQL.Database(dbBuffer);

  // Get Deck Title & Model field names from 'col' table
  let deckTitle = apkgFile.name ? apkgFile.name.replace(/\.apkg$/i, '') : 'Custom Anki Deck';
  const modelFieldMap = {}; // mid -> string[] (field names)
  try {
    const colRes = db.exec("SELECT decks, models FROM col LIMIT 1");
    if (colRes.length > 0 && colRes[0].values.length > 0) {
      const decksJson = JSON.parse(colRes[0].values[0][0]);
      const modelsJson = JSON.parse(colRes[0].values[0][1]);

      const firstDeckKey = Object.keys(decksJson).find(k => k !== '1');
      if (firstDeckKey && decksJson[firstDeckKey]?.name) {
        deckTitle = decksJson[firstDeckKey].name.replace(/\x1f/g, ' - ');
      }

      if (modelsJson && typeof modelsJson === 'object') {
        for (const [mid, mData] of Object.entries(modelsJson)) {
          if (mData && Array.isArray(mData.flds)) {
            modelFieldMap[mid] = mData.flds.map(f => f.name || 'Field');
          }
        }
      }
    }
  } catch (e) {
    console.warn('Could not read deck metadata from col:', e);
  }

  // Query notes & cards
  const queryRes = db.exec(`
    SELECT n.id, n.mid, n.flds, n.tags, c.id, c.ord, c.did
    FROM notes n
    JOIN cards c ON c.nid = n.id
    ORDER BY c.id ASC
  `);

  if (!queryRes || queryRes.length === 0 || !queryRes[0].values) {
    db.close();
    throw new Error('No cards found in this .apkg file.');
  }

  const rows = queryRes[0].values;
  onProgress(85, `Parsing ${rows.length} cards...`);

  // Helper to replace media filenames with blob URLs in HTML
  const resolveMediaHtml = (html) => {
    if (!html) return '';
    let resolved = String(html);

    // Replace [sound:filename.mp3] with audio-ready markup
    resolved = resolved.replace(/\[sound:([^\]]+)\]/gi, (match, filename) => {
      const cleanName = filename.trim();
      const blobUrl = mediaMap[cleanName];
      if (blobUrl) {
        return `<audio controls class="my-2 max-w-full" src="${blobUrl}"></audio>`;
      }
      return '';
    });

    // Replace src="filename.ext" with blob URL
    resolved = resolved.replace(/src=["']?([^"'>\s]+)["']?/gi, (match, srcVal) => {
      const cleanName = srcVal.trim();
      if (mediaMap[cleanName]) {
        return `src="${mediaMap[cleanName]}"`;
      }
      return match;
    });

    return resolved;
  };

  const cards = [];

  rows.forEach((row, idx) => {
    const noteId = row[0];
    const mid = String(row[1]);
    const rawFlds = String(row[2] || '').split('\x1f');
    const tagsStr = String(row[3] || '');
    const cardId = row[4];

    const fieldNames = modelFieldMap[mid] || [];

    let audioUrl = null;
    let imageUrl = null;

    // Build rich field array with names, raw values, and resolved HTML
    const fields = rawFlds.map((fldVal, fIdx) => {
      const name = fieldNames[fIdx] || `Field ${fIdx + 1}`;
      const resolvedHtml = resolveMediaHtml(fldVal);

      // Check for first audio if not found yet
      if (!audioUrl) {
        const soundMatch = fldVal.match(/\[sound:([^\]]+)\]/i);
        if (soundMatch && soundMatch[1] && mediaMap[soundMatch[1]]) {
          audioUrl = mediaMap[soundMatch[1]];
        }
      }

      // Check for first image if not found yet
      if (!imageUrl) {
        const imgMatch = fldVal.match(/<img[^>]+src=["']?([^"'>\s]+)["']?[^>]*>/i);
        if (imgMatch && imgMatch[1] && mediaMap[imgMatch[1]]) {
          imageUrl = mediaMap[imgMatch[1]];
        }
      }

      return {
        name,
        raw: fldVal,
        html: resolvedHtml,
        plain: stripAnkiHtml(fldVal)
      };
    });

    // Map fields into key-value dictionary
    const fieldDict = {};
    fields.forEach(f => {
      fieldDict[f.name] = f.raw;
    });

    // Detect archetype
    let layoutType = 'vocab';
    if (fieldDict.FrontSentence || fieldDict.GrammarPattern || fieldDict.LessonInfo) {
      layoutType = 'grammar';
    } else if (fieldDict.Picture || fieldDict.PrimaryDefinition || fieldDict.WordReading || fieldDict.SentenceReading) {
      layoutType = 'anime';
    } else if (fieldDict.SentKanji || fieldDict.VocabKanji || fieldDict.VocabDef) {
      layoutType = 'sentence_vocab';
    }

    // Identify primary expression, meaning, and sentence
    const expression = stripAnkiHtml(fieldDict.Word || fieldDict.VocabKanji || fieldDict.Expression || fieldDict.Front || rawFlds[0] || '');
    const rawReading = fieldDict.WordReading || fieldDict.VocabFurigana || fieldDict.Reading || '';
    let furiganaHtml = buildRubyFurigana(expression, rawReading);
    if (!furiganaHtml && rawFlds[1] && (rawFlds[1].includes('[') || rawFlds[1].includes('<ruby>'))) {
      furiganaHtml = ankiFuriganaToRuby(rawFlds[1]);
    }

    const extractSoundFromMedia = (val) => {
      if (!val) return null;
      const m = String(val).match(/\[sound:([^\]]+)\]/i);
      const fn = m ? m[1] : val;
      return mediaMap[fn] || null;
    };

    const sentenceAudioUrl = extractSoundFromMedia(fieldDict.SentenceAudio || fieldDict.SentAudio);
    const wordAudioUrl = extractSoundFromMedia(fieldDict.WordAudio || fieldDict.VocabAudio);
    const mainAudio = audioUrl || sentenceAudioUrl || wordAudioUrl;

    const rawMeaning = resolveMediaHtml(fieldDict.PrimaryDefinition || fieldDict.VocabDef || fieldDict.Meaning || fieldDict.Back || fieldDict.Translation || rawFlds[1] || rawFlds[2] || '');
    const conciseMeaning = extractConciseYomitanMeaning(rawMeaning) || stripAnkiHtml(fieldDict.EnglishSentence || fieldDict.SentEng || '');
    const sentence = ankiFuriganaToRuby(fieldDict.Sentence || fieldDict.SentenceReading || fieldDict.SentKanji || fieldDict.SentFurigana || fieldDict.BackSentence || rawFlds[2] || rawFlds[3] || '');
    const sentencePlain = stripAnkiHtml(sentence);
    const sentenceEng = fieldDict.EnglishSentence || fieldDict.SentEng || fieldDict.Translation || '';

    cards.push({
      id: `custom-apkg-${noteId || idx}`,
      noteId,
      cardId,
      deckId: 'custom-apkg',
      layoutType,
      expression,
      furigana: furiganaHtml,
      meaning: rawMeaning,
      conciseMeaning,
      sentence,
      sentencePlain,
      sentenceEng,
      audio: mainAudio,
      sentenceAudio: sentenceAudioUrl,
      wordAudio: wordAudioUrl,
      image: imageUrl,
      // Grammar-specific fields
      frontSentence: fieldDict.FrontSentence ? ankiFuriganaToRuby(fieldDict.FrontSentence) : '',
      backSentence: fieldDict.BackSentence ? ankiFuriganaToRuby(fieldDict.BackSentence) : '',
      grammarPattern: fieldDict.GrammarPattern || '',
      lessonInfo: fieldDict.LessonInfo || '',
      translation: fieldDict.Translation || '',
      richGrammarFormation: fieldDict.RichGrammarFormation ? ankiFuriganaToRuby(fieldDict.RichGrammarFormation) : '',
      grammarExplanation: fieldDict.GrammarExplanation || '',
      additionalNotes: fieldDict.AdditionalNotes || fieldDict.StyleNotes || '',
      detailedExplanation: fieldDict.DetailedExplanation ? resolveMediaHtml(fieldDict.DetailedExplanation) : '',
      // Anime & Yomitan specific fields
      primaryDefinition: fieldDict.PrimaryDefinition ? resolveMediaHtml(fieldDict.PrimaryDefinition) : '',
      extraDefinitions: fieldDict.ExtraDefinitions || '',
      comment: fieldDict.Comment || '',
      // Sentence vocab specific fields
      pitchPattern: fieldDict.VocabPitchPattern || fieldDict.PitchPattern || '',
      pitchNum: fieldDict.VocabPitchNum || '',
      netflixFreq: fieldDict.NetfilxFreq || fieldDict.NetflixFreq || '',
      fields: fields,
      tags: tagsStr.trim() ? tagsStr.trim().split(' ') : [],
      rawFields: rawFlds
    });
  });

  db.close();
  onProgress(100, 'Ready!');

  return {
    deckTitle,
    cardCount: cards.length,
    cards,
    mediaMap
  };
}

// In-memory store for active uploaded APKG deck
let currentLoadedApkgDeck = null;

export function setLoadedApkgDeck(deck) {
  currentLoadedApkgDeck = deck;
}

export function getLoadedApkgDeck() {
  return currentLoadedApkgDeck;
}
