/**
 * jlptRubyParser.js
 * 
 * Authentic Japanese Ruby & Underline Parser for JLPT Mock Exams.
 * Converts bracketed furigana attached to Kanji into standard HTML <ruby> tags,
 * placing the furigana reading directly on TOP of the base Kanji.
 * Preserves fill-in blanks like （　　）, ( 1 ), and authentic underlines <u>...</u>.
 */

const KANJI_REGEX_STR = '[一-龯々〆ヶ\\u3400-\\u4dbf]';
const KANA_REGEX_STR = '[\\u3040-\\u309F\\u30A0-\\u30FF]';

// Kanji followed by kana in full-width （ ） or half-width ( )
const FURIGANA_PAREN_REGEX = new RegExp(
  `(${KANJI_REGEX_STR}+)[（(](${KANA_REGEX_STR}+)[）)]`,
  'g'
);

// Kanji followed by kana in square brackets [ ]
const FURIGANA_BRACKET_REGEX = new RegExp(
  `(${KANJI_REGEX_STR}+)\\[(${KANA_REGEX_STR}+)\\]`,
  'g'
);

/**
 * Transforms bracketed Japanese text into authentic HTML <ruby> markup.
 * Example:
 *   "留学生（りゅうがくせい）が書いた作文（さくぶん）"
 *   -> "<ruby>留学生<rt>りゅうがくせい</rt></ruby>が書いた<ruby>作文<rt>さくぶん</rt></ruby>"
 *
 *   "一人​暮（ぐ）らし"
 *   -> "一人<ruby>暮<rt>ぐ</rt></ruby>らし"
 *
 *   "夫からの（　　）を感じて"
 *   -> "夫からの（　　）を感じて" (blanks are preserved untouched)
 *
 *   "<u>三（みっ）つに　しました</u>"
 *   -> "<u><ruby>三<rt>みっ</rt></ruby>つに　しました</u>" (underlines preserved)
 *
 * @param {string} text Raw or HTML text
 * @returns {string} Text formatted with <ruby> and <u> tags
 */
export function formatJlptRuby(text) {
  if (!text || typeof text !== 'string') return text || '';

  let res = text;

  // 1. Convert any legacy {{...}} into <u>...</u> if present
  res = res.replace(/\{\{([\s\S]*?)\}\}/g, '<u>$1</u>');

  // 2. Convert Kanji with parentheses furigana: 漢字（かんじ） or 漢字(かんじ)
  res = res.replace(FURIGANA_PAREN_REGEX, (match, kanji, kana) => {
    return `<ruby>${kanji}<rt>${kana}</rt></ruby>`;
  });

  // 3. Convert Kanji with bracket furigana: 漢字[かんじ]
  res = res.replace(FURIGANA_BRACKET_REGEX, (match, kanji, kana) => {
    return `<ruby>${kanji}<rt>${kana}</rt></ruby>`;
  });

  // 4. Clean zero-width space boundaries used by scrapers/parsers
  res = res.replace(/[\u200B\u200C]/g, '');

  return res;
}

export default formatJlptRuby;
