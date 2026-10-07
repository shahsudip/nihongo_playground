const normalizeEscapedMarkdown = (value = '') => value.replace(/\\_/g, '_');

const stripOuterEmphasis = (value = '') => value
  .trim()
  .replace(/^\*{1,2}(?=\S)/, '')
  .replace(/(?<=\S)\*{1,2}$/, '')
  .trim();

const readAttribute = (tag, attribute) => {
  const match = tag.match(new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] || '';
};

export const parseQuestionPresentation = (question = {}) => {
  const normalizedContext = normalizeEscapedMarkdown(question.context || '');
  const imageTag = normalizedContext.match(/<img\b[^>]*\/?\s*>/i)?.[0] || '';
  const contextWithoutImage = normalizedContext
    .replace(/<br\s*\/?\s*>\s*<img\b[^>]*\/?\s*>/gi, '')
    .replace(/<img\b[^>]*\/?\s*>/gi, '')
    .replace(/<br\s*\/?\s*>/gi, '\n');

  return {
    context: stripOuterEmphasis(contextWithoutImage),
    questionText: stripOuterEmphasis(normalizeEscapedMarkdown(question.questionText || '')),
    illustrationSrc: question.illustrationSrc || normalizeEscapedMarkdown(readAttribute(imageTag, 'src')),
    illustrationAlt: question.illustrationAlt || readAttribute(imageTag, 'alt') || 'Question illustration',
  };
};
