import {
  CURATED_STAR_BY_ID,
  CURATED_N3_CHOKUZEN_TRANSLATIONS,
  CURATED_STAR_BY_OPTS_KEY,
} from './starQuestionCuratedData.js';

const ORDINALS = ['first', 'second', 'third', 'fourth'];

/**
 * Strip HTML tags (replacing ruby rt with nothing so base kanji remains clean,
 * or keeping plain text) for linguistic matching.
 */
export function stripHtmlToText(str = '') {
  if (!str) return '';
  return String(str)
    .replace(/<rt[^>]*>.*?<\/rt>/gi, '')
    .replace(/<rp[^>]*>.*?<\/rp>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Safely normalize an explanation string containing literal `<br/>`, `<br>`, `\n`,
 * or inline HTML tags (`<b>`, `<u>`, `<ruby>`, `<rt>`) into clean HTML paragraphs/lines.
 */
export function formatExplanationHtml(rawText = '') {
  if (!rawText) return '';
  return String(rawText)
    .replace(/&lt;br\s*\/?&gt;/gi, '<br/>')
    .replace(/<br\s*\/?>/gi, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('<br/>');
}

/**
 * Split an explanation string on both `\n` and `<br/>` / `<br>` tags so line-by-line
 * UI renderers never display raw `<br/>` text.
 */
export function splitExplanationLines(rawText = '') {
  if (!rawText) return [];
  return String(rawText)
    .replace(/&lt;br\s*\/?&gt;/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Determine whether a question object is a JLPT Star (★) sentence-ordering question.
 */
export function isStarQuestion(q) {
  if (!q || typeof q !== 'object') return false;
  // Exclude known false-positive vocab question with (★) typo in Pass N3 Within 20 Days
  const qId = String(q.id || q.key || '');
  if (qId === 'd04-m3-q21' || qId.endsWith('-d04-m3-q21')) return false;
  if (CURATED_STAR_BY_ID[qId]) return true;
  if (Array.isArray(q.correctOrder) && q.correctOrder.length === 4) return true;
  if (Array.isArray(q.order) && q.order.length === 4) return true;

  const stem = String(q.stem || q.question || q.question_ja || q.text || q.questionText || q.prompt || '');
  if (!stem.includes('★')) return false;
  // Exclude single parenthesized （★） vocab questions unless accompanied by underscores or 4-slot markers
  if (/（★）|\(\s*★\s*\)/.test(stem) && !/[＿_]/.test(stem)) return false;

  const opts = q.options || q.choices || [];
  return Array.isArray(opts) && opts.length === 4;
}

/**
 * Normalize option text by stripping leading option numbers like "1 ", "1. ", "① ", etc.,
 * as well as trailing "correct" OCR artifacts.
 */
function cleanOptionText(opt) {
  if (opt === null || opt === undefined) return '';
  const raw = typeof opt === 'object' ? (opt.text || opt.label || '') : String(opt);
  return stripHtmlToText(raw)
    .replace(/correct$/i, '')
    .replace(/^[1-4１-４①-④][\s.)）．:：]+/, '')
    .trim();
}

/**
 * Look up curated data by 4-option signature first (collision-free across all books),
 * then by question ID (including LevelCheckPage prefixed IDs), then by N3 Chokuzen stem match.
 */
function lookupCuratedEntry(q, stemPlain, optsPlain) {
  if (optsPlain.length === 4) {
    const optsKey = optsPlain.join('|');
    if (CURATED_STAR_BY_OPTS_KEY[optsKey]) {
      return CURATED_STAR_BY_OPTS_KEY[optsKey];
    }
  }

  const qId = String(q.id || q.key || '');
  if (qId) {
    if (CURATED_STAR_BY_ID[qId]) return CURATED_STAR_BY_ID[qId];
    if (CURATED_N3_CHOKUZEN_TRANSLATIONS[qId]) return CURATED_N3_CHOKUZEN_TRANSLATIONS[qId];

    // Support LevelCheckPage prefixed IDs (e.g., pass20-n3-chapter-1-d01-m7-q49 -> d01-m7-q49)
    const passMatch = qId.match(/(d\d+-m7-q\d+)$/);
    if (passMatch && CURATED_STAR_BY_ID[passMatch[1]]) {
      return CURATED_STAR_BY_ID[passMatch[1]];
    }
    const n4Match = qId.match(/^chokuzen-n4-(set-\d+)-gr-(\d+)$/);
    if (n4Match) {
      const n4Key = `n4-${n4Match[1]}-q${Number(n4Match[2]) + 1}`;
      if (CURATED_STAR_BY_ID[n4Key]) return CURATED_STAR_BY_ID[n4Key];
    }
  }

  // Check N3 Chokuzen stem matches
  for (const [k, val] of Object.entries(CURATED_N3_CHOKUZEN_TRANSLATIONS)) {
    if (k.includes(':')) {
      const [, snippet] = k.split(':');
      if (snippet && stemPlain.includes(snippet)) {
        return val;
      }
    }
  }

  return null;
}

/**
 * Extract the 1-based correct choice index (1..4) for the ★ slot.
 */
function resolveStarChoice(q, curated, optsPlain = []) {
  if (curated?.starChoice >= 1 && curated?.starChoice <= 4) {
    return curated.starChoice;
  }
  for (const field of [q.answer, q.correct, q.correct_answer]) {
    if (typeof field === 'number' && field >= 1 && field <= 4) return field;
    if (typeof field === 'string' && /^[1-4]$/.test(field.trim())) return Number(field.trim());
  }
  if (typeof q.correctAnswer === 'number') {
    // Some schemas use 0-based (0..3) and some use 1-based (1..4)
    if (q.correctAnswer >= 0 && q.correctAnswer <= 3 && q.correctIndex === undefined && q.options) {
      const expMatch = String(q.explanation || '').match(/【(?:★\s*)?正解】\s*([1-4１-４])/);
      if (expMatch) {
        return parseInt(expMatch[1].replace(/[１-４]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)), 10);
      }
      return q.correctAnswer + 1;
    }
    if (q.correctAnswer >= 1 && q.correctAnswer <= 4) return q.correctAnswer;
  }
  if (typeof q.correctAnswer === 'string' && /^[1-4]$/.test(q.correctAnswer.trim())) {
    return Number(q.correctAnswer.trim());
  }
  if (typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex <= 3) {
    return q.correctIndex + 1;
  }
  // Match string answer/correctOption against cleaned options (e.g. Power Drill N3 grammar-20..30)
  for (const strAns of [q.correctOption, q.answer, q.correct_answer, q.correctAnswer]) {
    if (typeof strAns === 'string' && strAns.trim() && optsPlain.length === 4) {
      const cleanedAns = cleanOptionText(strAns);
      const idx = optsPlain.findIndex((o) => o === cleanedAns);
      if (idx !== -1) return idx + 1;
    }
  }
  const expMatch = String(q.explanation || '').match(/(?:【(?:★\s*)?正解】|正解[:：])\s*([1-4１-４])/);
  if (expMatch) {
    return parseInt(expMatch[1].replace(/[１-４]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)), 10);
  }
  return 1;
}

/**
 * Determine which slot (1..4, 1-indexed) holds the ★ in the question stem.
 */
function detectStarSlotInStem(stem = '', curated = null) {
  if (curated?.starSlot >= 1 && curated?.starSlot <= 4) {
    return curated.starSlot;
  }
  const s = String(stem)
    .replace(/<u[^>]*>\s*★\s*<\/u>/gi, ' __STAR__ ')
    .replace(/[＿_]+\s*★\s*[＿_]+/g, ' __STAR__ ')
    .replace(/★/g, ' __STAR__ ');

  // Match sequence of blank tokens and __STAR__
  const tokens = s.match(/(__STAR__|[＿_]{2,})/g);
  if (tokens && tokens.length >= 4) {
    const starIdx = tokens.indexOf('__STAR__');
    if (starIdx >= 0 && starIdx < 4) {
      return starIdx + 1;
    }
  }
  return 3; // Default JLPT standard is 3rd slot
}

/**
 * Clean stem and split into `{ prefix, suffix }` around the 4 blank slots.
 */
function splitStemPrefixSuffix(rawStem = '', curated = null) {
  const cleaned = stripHtmlToText(rawStem).replace(/^(?:問\s*\d+|Q\d+|\d+[\s.．)）]+)\s*/i, '');

  // Match contiguous sequence of underscores and ★
  const slotPattern = /(?:[＿_]+\s*|\s*★\s*){2,}/;
  const match = cleaned.match(slotPattern);
  let autoPrefix = cleaned;
  let autoSuffix = '';
  if (match && match.index !== undefined) {
    autoPrefix = cleaned.slice(0, match.index).replace(/[＿_]+/g, '').trim();
    autoSuffix = cleaned.slice(match.index + match[0].length).replace(/[＿_]+/g, '').trim();
  } else if (cleaned.includes('★')) {
    const [p, ...rest] = cleaned.split('★');
    autoPrefix = p.replace(/[＿_]+/g, '').trim();
    autoSuffix = rest.join('').replace(/[＿_]+/g, '').trim();
  }

  return {
    prefix: curated?.prefix !== undefined ? curated.prefix : autoPrefix,
    suffix: curated?.suffix !== undefined ? curated.suffix : autoSuffix,
  };
}

function toHalfWidthDigit(ch) {
  return String(ch).replace(/[１-４①-④]/g, (c) => {
    const code = c.charCodeAt(0);
    if (code >= 0xff11 && code <= 0xff14) return String(code - 0xff10);
    if (code >= 0x2460 && code <= 0x2463) return String(code - 0x245f);
    return c;
  });
}

function isValidOrder(arr) {
  if (!Array.isArray(arr) || arr.length !== 4) return false;
  const nums = arr.map(Number);
  return [1, 2, 3, 4].every((n) => nums.includes(n));
}

/**
 * Score how natural it is for Japanese phrase `a` to be immediately followed by `b`,
 * or at the start/end of the 4-slot sequence.
 */
function scorePairAdjacency(a, b) {
  let score = 0;
  const aTrim = a.trim();
  const bTrim = b.trim();

  // Direct fixed collocations
  const joined = aTrim + bTrim;
  const collocations = [
    /ざるを得ない/, /わけにはいかない/, /わけではない/, /わけがない/, /しかない/,
    /よりほかない/, /に違いない/, /に決まっている/, /にかかわらず/, /にもかかわらず/,
    /にとどまらず/, /のみならず/, /ばかりでなく/, /だけでなく/, /はもちろん/,
    /はおろか/, /どころか/, /どころではない/, /からといって/, /からには/, /からは/,
    /からこそ/, /からすると/, /からいうと/, /からみると/, /からみれば/, /からして/,
    /に反して/, /に対して/, /に関して/, /について/, /につれて/, /にしたがって/,
    /にともなって/, /にともない/, /に比べ/, /に比べて/, /に加えて/, /に際して/,
    /にあたって/, /にかけて/, /にわたって/, /によって/, /により/, /によれば/,
    /によると/, /における/, /において/, /にとって/, /として/, /としては/, /としても/,
    /とともに/, /とたん/, /とたんに/, /とおり/, /通りに/, /たびに/, /うちに/,
    /最中に/, /おかげで/, /せいで/, /ために/, /ため/, /ように/, /ような/, /ようだ/,
    /そうに/, /そうな/, /そうだ/, /らしい/, /みたい/, /かのよう/, /かのごとく/,
    /といったら/, /といえば/, /といっても/, /というより/, /というのは/, /ということ/,
    /というもの/, /という点/, /といった/, /とはかぎらない/, /とは限らない/,
    /ないことはない/, /ないこともない/, /ほどではない/, /くらいなら/, /ぐらいなら/,
    /ものなら/, /ものだ/, /ものではない/, /ことはない/, /ことがある/, /ことにする/,
    /ことにした/, /ことになる/, /ことになった/, /ことになっている/, /ことができる/,
    /させて/, /られて/, /ていただく/, /てくださる/, /てくれる/, /てもらう/,
    /ておく/, /ておいた/, /てみる/, /てみた/, /てしまう/, /てしまった/, /てくる/,
    /てきた/, /ていく/, /ていった/, /ている/, /ていた/, /てある/, /てほしい/,
    /たあげく/, /た末に/, /たすえに/, /た上で/, /たうえで/, /たばかり/, /たところ/,
    /たとたん/, /たまま/, /たきり/, /たばかりに/, /た結果/,
    /かのうちに/, /かどうかわからない/, /かどうか/, /かというと/, /かといえば/,
    /さえ.*ば/, /たとえ.*ても/, /いくら.*ても/, /どんなに.*ても/, /いかに.*とも/,
    /ならともかく/, /はともかく/, /はさておき/, /いざ知らず/, /じゃあるまいし/,
    /ではあるまいし/, /べからず/, /べくもない/, /べくして/, /極まりない/, /極まる/,
    /たりとも/, /が最後/, /が早いか/, /やいなや/, /そばから/, /ずにはいられない/,
    /ずにはおかない/, /ずにはすまない/, /ないではいられない/, /ないわけにはいかない/,
    /に越したことはない/, /にこしたことはない/, /までだ/, /までのことだ/,
  ];

  for (const rx of collocations) {
    if (rx.test(joined) && !rx.test(aTrim) && !rx.test(bTrim)) {
      score += 45;
    }
  }

  // Particle / grammatical suffix attachment rules
  // If b starts with a case/binding particle or auxiliary, a should be a noun or nominalized form
  if (/^(が|を|に|へ|で|と|から|まで|より|の|は|も|こそ|さえ|すら|だけ|ばかり|など|なんて|とは|には|では|への|との|からの|までの|くらい|ぐらい|ほど)/.test(bTrim)) {
    if (!/[、。がをにへでとからまでよりのはも]$/.test(aTrim)) {
      score += 18;
    } else {
      score -= 20;
    }
  }

  // Noun + の + Noun
  if (aTrim.endsWith('の') && !/^(の|が|を|に|へ|で|と|は|も|て|た|だ|です|ます)/.test(bTrim)) {
    score += 22;
  }

  // Verb te-form + auxiliary verb
  if (/[てで]$/.test(aTrim) && /^(いる|いた|います|いました|おく|おいた|おけば|みる|みた|みたら|みても|しまう|しまった|くる|きた|いく|いった|あげる|さしあげる|くれる|くれた|くれれば|くださる|くださった|もらう|もらった|もらえる|もらっても|ほしい|いただきたい|いただく|いただいた|いただけますか|から)/.test(bTrim)) {
    score += 35;
  }

  // Verb masu-stem + compound suffix (かねない, 続ける, 始める, 終わる, すぎる, やすい, にくい, づらい, っぱなし, ぬく)
  if (/^(かねない|かねる|続ける|始める|はじめた|終わる|終わった|すぎる|すぎて|やすい|にくい|づらい|っぱなし|ぬく|ながら)/.test(bTrim)) {
    score += 20;
  }

  // Relative clause / prenominal modifier (な, い, た, る, の) -> Noun
  if (/(な|い|た|る|の)$/.test(aTrim) && /^(こと|もの|ところ|とき|時|人|方|ほう|わけ|はず|つもり|予定|ため|せい|おかげ|うち|最中|たび|とおり|通り|かわり|上|うえ|一方|反面|結果|点|場合|際|折|末|あげく|かぎり|限り)/.test(bTrim)) {
    score += 25;
  }

  // Penalize comma inside a slot followed by a particle
  if (/[、，]$/.test(aTrim) && /^(が|を|に|へ|で|と|の|は|も|て|た|だ|です)/.test(bTrim)) {
    score -= 40;
  }

  return score;
}

/**
 * Extract or solve the 4-option permutation `[o1, o2, o3, o4]` (1-indexed option numbers).
 */
export function resolveQuestionOrder(q, optsPlain, starChoice, starSlot, prefix, suffix, curated) {
  // 1. Curated database
  if (curated && isValidOrder(curated.order)) {
    return curated.order.map(Number);
  }

  // 2. Explicit array or comma-separated string on question object (`correctOrder`, `order`, `correct_order`)
  if (isValidOrder(q.correctOrder)) return q.correctOrder.map(Number);
  if (isValidOrder(q.order)) return q.order.map(Number);
  if (typeof q.correct_order === 'string') {
    const parsed = q.correct_order.split(/[,\s]+/).map(Number);
    if (isValidOrder(parsed)) return parsed;
  }

  const exp = String(q.explanation || q.commentary || '');

  // 2b. Parenthesized comma-separated order in explanation: `(2, 1, 4, 3)`
  const commaOrderMatch = exp.match(/[（(]\s*([1-4])\s*,\s*([1-4])\s*,\s*([1-4])\s*,\s*([1-4])\s*[)）]/);
  if (commaOrderMatch) {
    const candidate = commaOrderMatch.slice(1, 5).map(Number);
    if (isValidOrder(candidate)) return candidate;
  }

  // 3. Bracketed numbers in explanation: `[2どちらに] [4行くか] [★ 3なやんだ] [1あげく]`
  const bracketMatches = [...exp.matchAll(/\[(?:★\s*)?([1-4１-４])[^\]]*\]/g)].map((m) =>
    Number(toHalfWidthDigit(m[1]))
  );
  if (bracketMatches.length >= 4 && isValidOrder(bracketMatches.slice(0, 4))) {
    return bracketMatches.slice(0, 4);
  }

  // 4. Parenthesized numbers after option text: `待ち合わせは(4) 午後に(2) ★して(3) いただけますか(1)` or `(１)...(２)...`
  const parenMatches = [...exp.matchAll(/[（(]([1-4１-４①-④])[)）]/g)].map((m) =>
    Number(toHalfWidthDigit(m[1]))
  );
  if (parenMatches.length >= 4 && isValidOrder(parenMatches.slice(0, 4))) {
    return parenMatches.slice(0, 4);
  }

  // 5. Arrow patterns in explanation: `-> 3 4 2 1`, `4 -> 2 -> 3 -> 1`, `3 → 4 → 2 → 1`, `4 xxx -> 2 yyy -> 3 zzz -> 1 www`
  const arrowSeqMatch = exp.match(/([1-4１-４①-④])\s*(?:->|→|⇒|➡)\s*([1-4１-４①-④])\s*(?:->|→|⇒|➡)\s*([1-4１-４①-④])\s*(?:->|→|⇒|➡)\s*([1-4１-４①-④])/);
  if (arrowSeqMatch) {
    const candidate = arrowSeqMatch.slice(1, 5).map((x) => Number(toHalfWidthDigit(x)));
    if (isValidOrder(candidate)) return candidate;
  }

  const arrowTrailingMatch = exp.match(/(?:->|→)\s*([1-4])\s+([1-4])\s+([1-4])\s+([1-4])/);
  if (arrowTrailingMatch) {
    const candidate = arrowTrailingMatch.slice(1, 5).map(Number);
    if (isValidOrder(candidate)) return candidate;
  }

  // Power Drill N2 style: `4 きっかけに -> 2 始めた -> 3 料理が -> 1 今では`
  const numberedArrowParts = [...exp.matchAll(/([1-4１-４])\s*[^\s->]*/g)];
  if (exp.includes('->') || exp.includes('→')) {
    const digits = numberedArrowParts.map((m) => Number(toHalfWidthDigit(m[1])));
    if (digits.length >= 4 && isValidOrder(digits.slice(0, 4))) {
      return digits.slice(0, 4);
    }
  }

  // 6. Mock test per-option `explanations` array: `Correct order: X -> Y -> Z -> W`
  if (Array.isArray(q.explanations)) {
    for (const item of q.explanations) {
      const txt = typeof item === 'string' ? item : (item?.text || '');
      const m = txt.match(/([1-4①-④])\s*(?:->|→)\s*([1-4①-④])\s*(?:->|→)\s*([1-4①-④])\s*(?:->|→)\s*([1-4①-④])/);
      if (m) {
        const candidate = m.slice(1, 5).map((x) => Number(toHalfWidthDigit(x)));
        if (isValidOrder(candidate)) return candidate;
      }
    }
  }

  // 7. Match option strings in order of appearance inside explanation (e.g. `(さえ)(あれば)(他には)(何も)` or full sentence in explanation)
  if (exp && optsPlain.length === 4) {
    const expPlain = stripHtmlToText(exp);
    // Check parenthesized option texts like `(さえ)(あれば)(他には)(何も)`
    const parenTextMatches = [...expPlain.matchAll(/\(([^()]+)\)/g)].map((m) => m[1].trim());
    if (parenTextMatches.length >= 4) {
      const mapped = parenTextMatches
        .map((pt) => optsPlain.findIndex((o) => o === pt) + 1)
        .filter((idx) => idx >= 1 && idx <= 4);
      if (mapped.length >= 4 && isValidOrder(mapped.slice(0, 4))) {
        return mapped.slice(0, 4);
      }
    }

    // Check if all 4 options appear in a single sentence inside explanation
    const lines = expPlain.split(/[。\n]/).filter(Boolean);
    for (const line of lines) {
      const positions = optsPlain.map((opt, i) => ({
        optNum: i + 1,
        pos: line.indexOf(opt),
      }));
      if (positions.every((p) => p.pos !== -1)) {
        positions.sort((a, b) => a.pos - b.pos);
        const candidate = positions.map((p) => p.optNum);
        if (isValidOrder(candidate) && candidate[starSlot - 1] === starChoice) {
          return candidate;
        }
      }
    }
  }

  // 8. Morphosyntactic Collocation Solver over the 6 permutations fixing `starChoice` at `starSlot`
  const others = [1, 2, 3, 4].filter((n) => n !== starChoice);
  const perms3 = [
    [others[0], others[1], others[2]],
    [others[0], others[2], others[1]],
    [others[1], others[0], others[2]],
    [others[1], others[2], others[0]],
    [others[2], others[0], others[1]],
    [others[2], others[1], others[0]],
  ];

  let bestPerm = null;
  let bestScore = -Infinity;

  for (const p of perms3) {
    const candidate = [...p];
    candidate.splice(starSlot - 1, 0, starChoice);
    const phrases = candidate.map((idx) => optsPlain[idx - 1] || '');

    let score = 0;
    if (prefix) score += scorePairAdjacency(prefix, phrases[0]);
    score += scorePairAdjacency(phrases[0], phrases[1]);
    score += scorePairAdjacency(phrases[1], phrases[2]);
    score += scorePairAdjacency(phrases[2], phrases[3]);
    if (suffix) score += scorePairAdjacency(phrases[3], suffix);

    if (score > bestScore) {
      bestScore = score;
      bestPerm = candidate;
    }
  }

  return bestPerm || [1, 2, 3, 4];
}

/**
 * Extract an English translation from curated data, `studyExplanation`, or `explanation` text.
 */
function resolveTranslation(q, curated, fullSentenceText) {
  if (curated?.translation) {
    return curated.translation;
  }
  if (q.studyExplanation?.translation) {
    return stripHtmlToText(q.studyExplanation.translation);
  }
  if (q.translation || q.translation_en || q.english) {
    return stripHtmlToText(q.translation || q.translation_en || q.english);
  }

  const exp = String(q.explanation || q.commentary || '');
  // Check 【英訳】
  const engMatch = exp.match(/【英訳】\s*([^\n<]+)/);
  if (engMatch) {
    let eng = engMatch[1].trim();
    // If it's "Order: <jp> - <en>", extract the English part
    const dashMatch = eng.match(/^Order:\s*[^-]+-\s*(.+)$/i);
    if (dashMatch) {
      eng = dashMatch[1].trim();
      eng = eng.charAt(0).toUpperCase() + eng.slice(1);
    } else if (/^Order:\s*[^\x00-\x7F]+$/i.test(eng)) {
      // Only Japanese order was in 【英訳】, ignore
      eng = '';
    }
    if (eng) return eng;
  }

  // Check Mock test explanations for English strings
  if (Array.isArray(q.explanations)) {
    for (const item of q.explanations) {
      const txt = typeof item === 'string' ? item : (item?.text || '');
      const m = txt.match(/Meaning:\s*["']?([^"'\n]+)["']?/i);
      if (m) return m[1].trim();
    }
  }

  return '';
}

/**
 * Describe why phrase `left` connects to phrase `right` in clear pedagogical English
 * for the 3-step construction guide.
 */
function describePairConnection(leftIdx, leftText, rightIdx, rightText, prefix, suffix, stepIndex, existingNotes) {
  const combined = `${leftText}${rightText}`;

  // Detect well-known JLPT grammar patterns in the combined pair
  const patternHints = [
    { rx: /たあげく/, title: 'Grammar pattern: 〜たあげく (に):', desc: `The N3 grammar pattern V-た + あげく means "after doing something for a long time (struggling or worrying), in the end...". Therefore, ${rightIdx} (${rightText}) directly follows ${leftIdx} (${leftText}).` },
    { rx: /かのうちに/, title: 'Grammar pattern: V-たか V-ないかのうちに:', desc: `The expression V-たか + V-ないかのうちに means "almost simultaneously / before even finishing...". Here ${leftIdx} (${leftText}) links to ${rightIdx} (${rightText}) to complete this pattern.` },
    { rx: /だけあって/, title: 'Grammar pattern: 〜だけあって:', desc: `The pattern N / Clause + だけあって means "precisely because / as expected of...". ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}) pair together to express this reason.` },
    { rx: /よりほかない|ほかない/, title: 'Grammar pattern: V-る + よりほかない:', desc: `The pattern V-る + よりほかない means "to have no other choice but to...". ${leftIdx} (${leftText}) connects directly to ${rightIdx} (${rightText}).` },
    { rx: /さえ.*ば|さえあれば/, title: 'Grammar pattern: 〜さえ〜ば (if only / as long as):', desc: `The conditional pattern N + さえ + V-ば means "as long as there is...". ${leftIdx} (${leftText}) attaches to ${rightIdx} (${rightText}) to state the minimum condition.` },
    { rx: /最中に/, title: 'Grammar pattern: V-ている + 最中に:', desc: `V-ている + 最中に means "right in the middle of doing...". ${leftIdx} (${leftText}) modifies ${rightIdx} (${rightText}).` },
    { rx: /たとたん|とたん/, title: 'Grammar pattern: V-た + とたん (に):', desc: `V-た + とたん means "the exact moment / instant something happened". ${leftIdx} (${leftText}) must be followed by ${rightIdx} (${rightText}).` },
    { rx: /たびに/, title: 'Grammar pattern: V-る / Nの + たびに:', desc: `The pattern V-る + たびに means "every time...". ${leftIdx} (${leftText}) connects to ${rightIdx} (${rightText}).` },
    { rx: /をはじめとする|をはじめ/, title: 'Grammar pattern: N + をはじめとする:', desc: `N + をはじめとする means "starting with N / such as N". ${leftIdx} (${leftText}) pairs with ${rightIdx} (${rightText}) to modify the following noun.` },
    { rx: /かわりに/, title: 'Grammar pattern: 〜かわりに (in exchange for / instead of):', desc: `Clause/Nの + かわりに means "in exchange for / in place of". ${leftIdx} (${leftText}) connects directly to ${rightIdx} (${rightText}).` },
    { rx: /た上で|たうえで/, title: 'Grammar pattern: V-た + 上で (after doing):', desc: `V-た + 上で means "after first doing X (as a preparatory step)". ${leftIdx} (${leftText}) precedes ${rightIdx} (${rightText}).` },
    { rx: /通りに|とおり/, title: 'Grammar pattern: V-た / V-る / Nの + 通りに:', desc: `〜通りに means "in the exact way / just as...". ${leftIdx} (${leftText}) modifies ${rightIdx} (${rightText}).` },
    { rx: /わけではない|わけがない|わけにはいかない/, title: 'Grammar pattern: 〜わけ (ではない / がない / にはいかない):', desc: `The explanatory noun わけ forms a fixed grammatical expression here, so ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}) lock together.` },
    { rx: /ばかりに/, title: 'Grammar pattern: 〜ばかりに (simply because):', desc: `Clause + ばかりに expresses a regretful reason ("simply because..."). ${leftIdx} (${leftText}) leads directly into ${rightIdx} (${rightText}).` },
    { rx: /によって|により|によれば/, title: 'Particle expression: 〜によって / 〜により / 〜によれば:', desc: `The formal particle phrase attaches to the preceding noun, pairing ${leftIdx} (${leftText}) with ${rightIdx} (${rightText}).` },
    { rx: /に関して|に対して|について|に反して|に比べて/, title: 'Compound particle: 〜に (関して / 対して / ついて / 反して / 比べて):', desc: `This compound particle phrase links the target noun to the following clause or noun, joining ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}).` },
    { rx: /における|において/, title: 'Formal particle: 〜における / 〜において (in / at):', desc: `における modifies a noun ("in/at N"), while において acts adverbially. Here ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}) form this formal phrase.` },
    { rx: /かねない/, title: 'Grammar pattern: V-ます stem + かねない (might very well):', desc: `Attaching かねない to the verb's ます-stem expresses the risk of a negative outcome ("could very well happen"), linking ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}).` },
    { rx: /ざるを得ない/, title: 'Grammar pattern: V-ない stem + ざるを得ない (cannot help doing):', desc: `This N2/N1 expression means "have no choice but to...". ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}) form this fixed construction.` },
    { rx: /に越したことはない/, title: 'Grammar pattern: 〜に越したことはない (nothing is better than):', desc: `This fixed idiom means "it is best to / nothing could be better than...". ${leftIdx} (${leftText}) connects to ${rightIdx} (${rightText}).` },
    { rx: /ものなら/, title: 'Grammar pattern: Volitional + ものなら / Potential + ものなら:', desc: `This conditional expression pairs the verb in ${leftIdx} (${leftText}) directly with ${rightIdx} (${rightText}).` },
    { rx: /ともかく/, title: 'Grammar pattern: 〜はともかく / 〜ならともかく (setting aside):', desc: `This pattern means "setting X aside, when it comes to Y...". ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}) form the opening contrast.` },
    { rx: /わりに/, title: 'Grammar pattern: 〜わりに (は) (considering / for):', desc: `〜わりに means "considering X, it is unexpectedly Y". ${leftIdx} (${leftText}) connects to ${rightIdx} (${rightText}).` },
    { rx: /一方/, title: 'Grammar pattern: V-る + 一方だ (keeps getting more and more):', desc: `V-る + 一方だ expresses a continuous one-way trend, linking ${leftIdx} (${leftText}) to ${rightIdx} (${rightText}).` },
    { rx: /からでないと/, title: 'Grammar pattern: V-て + からでないと (unless after doing):', desc: `V-てからでないと means "until after doing X, cannot Y". ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}) form this double-negative condition.` },
    { rx: /ことになっている|ことにした|ことになった/, title: 'Grammar pattern: V-る + ことに (なっている / なった / した):', desc: `The formal noun こと nominalizes the preceding verb to express a rule, schedule, or decision, joining ${leftIdx} (${leftText}) and ${rightIdx} (${rightText}).` },
    { rx: /ついでに/, title: 'Grammar pattern: V-た / V-る / Nの + ついでに (while incidentally):', desc: `〜ついでに means "taking the opportunity while doing X, also do Y". ${leftIdx} (${leftText}) links directly to ${rightIdx} (${rightText}).` },
  ];

  for (const h of patternHints) {
    if (h.rx.test(combined)) {
      return {
        title: h.title,
        body: h.desc,
      };
    }
  }

  // Generic syntactic descriptions based on endings
  if (stepIndex === 0) {
    const leadContext = prefix ? `After "${prefix}", ` : 'At the start of the blanks, ';
    if (/[をがにへでとからまでよりの]$/.test(leftText)) {
      return {
        title: `「${leftText}」+「${rightText}」:`,
        body: `${leadContext}place ${leftIdx} (${leftText}) first so its trailing particle links naturally into ${rightIdx} (${rightText}).`,
      };
    }
    return {
      title: `「${leftText}」+「${rightText}」:`,
      body: `${leadContext}combine ${leftIdx} (${leftText}) with ${rightIdx} (${rightText}) to form the opening grammatical unit.`,
    };
  }

  if (stepIndex === 1) {
    if (/[てで]$/.test(leftText)) {
      return {
        title: `Connecting the て-form 「${leftText}」 to 「${rightText}」:`,
        body: `The て-form in ${leftIdx} (${leftText}) links directly to the following verb or auxiliary expression ${rightIdx} (${rightText}).`,
      };
    }
    if (/(な|い|た|る|の)$/.test(leftText)) {
      return {
        title: `Connecting modifier 「${leftText}」 to 「${rightText}」:`,
        body: `${leftIdx} (${leftText}) grammatically modifies or feeds into ${rightIdx} (${rightText}) to build the core clause.`,
      };
    }
    return {
      title: `Connecting 「${leftText}」 to 「${rightText}」:`,
      body: `Next, ${leftIdx} (${leftText}) connects to ${rightIdx} (${rightText}) to bridge the first phrase into the main predicate.`,
    };
  }

  const tailContext = suffix ? ` so that it connects smoothly into "${suffix}"` : ' to complete the sentence';
  if ( existingNotes ) {
    return {
      title: `Completing the pattern with 「${leftText}」+「${rightText}」:`,
      body: `Finally, ${leftIdx} (${leftText}) is followed by ${rightIdx} (${rightText})${tailContext}. (${existingNotes})`,
    };
  }
  return {
    title: `Completing the clause with 「${leftText}」+「${rightText}」:`,
    body: `Finally, attach ${rightIdx} (${rightText}) after ${leftIdx} (${leftText})${tailContext}.`,
  };
}

/**
 * Build the complete Browser-Gemini-style structured breakdown for any JLPT ★ question.
 */
export function buildStarQuestionBreakdown(q) {
  if (!q) return null;

  const rawStem = String(q.stem || q.question || q.question_ja || q.text || q.questionText || q.prompt || '');
  const stemPlain = stripHtmlToText(rawStem);
  const rawOpts = q.options || q.choices || [];
  const optsPlain = rawOpts.map(cleanOptionText);

  const curated = lookupCuratedEntry(q, stemPlain, optsPlain);
  const starChoice = resolveStarChoice(q, curated, optsPlain);
  const starSlot = detectStarSlotInStem(rawStem, curated);
  const { prefix, suffix } = splitStemPrefixSuffix(rawStem, curated);
  const order = resolveQuestionOrder(q, optsPlain, starChoice, starSlot, prefix, suffix, curated);

  // Determine the actual slot where starChoice landed (or use starSlot)
  const effectiveStarSlotIdx = order.indexOf(starChoice) !== -1 ? order.indexOf(starChoice) : (starSlot - 1);
  const effectiveStarChoice = order[effectiveStarSlotIdx] || starChoice;
  const starOptionText = optsPlain[effectiveStarChoice - 1] || '';

  const slots = order.map((optNum, idx) => ({
    slotNumber: idx + 1,
    optionNumber: optNum,
    text: optsPlain[optNum - 1] || '',
    isStar: idx === effectiveStarSlotIdx,
  }));

  const fullSentenceText = `${prefix}${slots.map((s) => s.text).join('')}${suffix}`;
  const translation = resolveTranslation(q, curated, fullSentenceText);

  // Extract any existing Japanese grammar note from explanation (e.g. 【解説】 orZenkamoku grammar point)
  let existingGrammarNote = '';
  const exp = String(q.explanation || q.commentary || '');
  const kaisetsuMatch = exp.match(/【解説】\s*([^\n<]+)/);
  if (kaisetsuMatch) {
    existingGrammarNote = kaisetsuMatch[1].replace(/^★[^。]+。/, '').trim();
  } else if (q.studyExplanation?.grammarPoint) {
    existingGrammarNote = stripHtmlToText(q.studyExplanation.grammarPoint);
  }

  let steps;
  if (curated?.customSteps) {
    steps = curated.customSteps;
  } else {
    const s0 = slots[0];
    const s1 = slots[1];
    const s2 = slots[2];
    const s3 = slots[3];

    const d0 = describePairConnection(s0.optionNumber, s0.text, s1.optionNumber, s1.text, prefix, suffix, 0, '');
    const d1 = describePairConnection(s1.optionNumber, s1.text, s2.optionNumber, s2.text, prefix, suffix, 1, '');
    const d2 = describePairConnection(s2.optionNumber, s2.text, s3.optionNumber, s3.text, prefix, suffix, 2, existingGrammarNote);

    const shortPrefix = prefix.length > 24 ? `…${prefix.slice(-18)}` : prefix;
    const shortSuffix = suffix.length > 24 ? `${suffix.slice(0, 18)}…` : suffix;

    steps = [
      {
        title: d0.title,
        body: d0.body,
        resultPrefix: shortPrefix ? `${shortPrefix} ` : '',
        resultHighlight: `${s0.text}${s1.text}`,
        resultSuffix: '',
      },
      {
        title: d1.title,
        body: d1.body,
        resultPrefix: `${s0.text}`,
        resultHighlight: `${s1.text}${s2.text}`,
        resultSuffix: '',
      },
      {
        title: d2.title,
        body: d2.body,
        resultPrefix: `${s0.text}${s1.text}`,
        resultHighlight: `${s2.text}${s3.text}`,
        resultSuffix: shortSuffix ? ` ${shortSuffix}` : '',
      },
    ];
  }

  const ordinalWord = ORDINALS[effectiveStarSlotIdx] || 'third';

  return {
    starChoice: effectiveStarChoice,
    starOptionText,
    starSlot: effectiveStarSlotIdx + 1,
    ordinalWord,
    prefix,
    suffix,
    order,
    slots,
    orderArrowString: slots
      .map((s) => (s.isStar ? `${s.optionNumber} (★)` : `${s.optionNumber}`))
      .join(' → '),
    translation,
    steps,
    grammarNote: existingGrammarNote,
    summaryLine: `The ${ordinalWord} slot (★) is filled by ${effectiveStarChoice} (${starOptionText}).`,
  };
}
