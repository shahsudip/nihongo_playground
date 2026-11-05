/**
 * jlptExplanationHelper.js
 * Synthesizes clear, accurate Japanese learning explanations for correct options
 * when upstream test data only provided distractor notes.
 */

export function extractTargetWordFromStem(stem = '') {
  if (!stem) return '';
  // Match <u>...</u> or {{...}} or 「...」
  const uMatch = stem.match(/<u>(.*?)<\/u>/i);
  if (uMatch && uMatch[1]) return uMatch[1].replace(/<[^>]+>/g, '').trim();
  const braceMatch = stem.match(/\{\{(.*?)\}\}/);
  if (braceMatch && braceMatch[1]) return braceMatch[1].trim();
  const quoteMatch = stem.match(/「(.*?)」/);
  if (quoteMatch && quoteMatch[1]) return quoteMatch[1].trim();
  return '';
}

export function cleanStemText(stem = '') {
  if (!stem) return '';
  return stem
    .replace(/<rt>.*?<\/rt>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{|\}\}/g, '')
    .trim();
}

/**
 * Returns a comprehensive, high-quality explanation for the correct answer
 */
export function getCorrectAnswerExplanation(q) {
  if (!q) return '';

  const correctNum = typeof q.correct === 'number' ? q.correct : 1;
  const correctIdx = correctNum - 1;
  const correctOptText = (Array.isArray(q.options) && q.options[correctIdx])
    ? (typeof q.options[correctIdx] === 'string' ? q.options[correctIdx] : q.correctOption || '')
    : (q.correctOption || '');

  // 1. If upstream already had a non-empty explanation for this specific option, use it!
  const upstreamOptionExp = q.explanations?.[correctIdx];
  if (upstreamOptionExp && upstreamOptionExp.trim().length > 0) {
    return upstreamOptionExp.trim();
  }

  // 2. If general question explanation exists, check if it's usable
  if (q.explanation && typeof q.explanation === 'string' && q.explanation.trim().length > 0) {
    return q.explanation.trim();
  }

  // 3. Synthesize based on question type
  const type = q.type || '';
  const typeLabel = q.typeLabel || '';
  const targetWord = extractTargetWordFromStem(q.stem || '');
  const cleanStem = cleanStemText(q.stem || '');

  if (type === 'kanji_reading' || typeLabel === '漢字読み') {
    if (targetWord) {
      return `「${targetWord}」の正しい読み方は「${correctOptText}」です。文中の意味：${cleanStem || '文脈に即した正しい読み方です。'}`;
    }
    return `下線部の言葉の正しい読み方は「${correctOptText}」です。`;
  }

  if (type === 'orthography' || typeLabel === '表記') {
    if (targetWord) {
      return `「${targetWord}」を正しい漢字で表記すると「${correctOptText}」になります。`;
    }
    return `下線部の言葉を漢字で書くとき、最も適切なものは「${correctOptText}」です。`;
  }

  if (type === 'context' || typeLabel === '文脈規定') {
    return `文脈に最も適する言葉は「${correctOptText}」です。文全体の自然な流れを完成させます。`;
  }

  if (type === 'paraphrase' || typeLabel === '言い換え類義') {
    if (targetWord) {
      return `「${targetWord}」と最も意味が近い表現は「${correctOptText}」です。`;
    }
    return `下線部の表現と意味が最も近いものは「${correctOptText}」です。`;
  }

  if (type === 'usage' || typeLabel === '用法') {
    if (targetWord) {
      return `「${targetWord}」の使い方が最も自然で正確な文は選択肢 ${correctNum}（${correctOptText}）です。`;
    }
    return `言葉の用法として最も自然で正確な文は選択肢 ${correctNum} です。`;
  }

  if (typeLabel.includes('文法') || type.includes('grammar')) {
    return `空欄に入る最も適切な文法表現は「${correctOptText}」です。文法規則・接続の形と文脈に正確に一致します。`;
  }

  if (typeLabel.includes('読解') || typeLabel.includes('内容理解') || type.includes('reading')) {
    return `本文の記述・筆者の主張と最も合致する答えは選択肢 ${correctNum}（${correctOptText}）です。`;
  }

  if (typeLabel.includes('聴解') || type.includes('listening')) {
    return `音声の会話内容・質問の意図に対して最も適切な応答は選択肢 ${correctNum}（${correctOptText}）です。`;
  }

  return `正解は選択肢 ${correctNum}（${correctOptText}）です。文脈および文法規則に最も適しています。`;
}

