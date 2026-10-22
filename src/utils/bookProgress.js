export const MASTERY_RATIO = 0.9;

export const clamp = (value, minimum, maximum) => (
  Math.min(Math.max(Number(value) || 0, minimum), maximum)
);

export const getRecordTime = (record) => {
  const value = record?.timestamp || record?.updatedAt || record?.createdAt;
  if (value && typeof value.toMillis === 'function') return value.toMillis();
  const parsed = Date.parse(value || '');
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getAnsweredCount = (record) => {
  const savedCount = Number(record?.answered || 0);
  const answerCount = Object.keys(record?.answers || {}).length;
  return Math.max(savedCount, answerCount);
};

export const selectPreferredAttempt = (currentRecord, incomingRecord) => {
  if (!currentRecord) return incomingRecord;
  if (!incomingRecord) return currentRecord;

  const currentTime = getRecordTime(currentRecord);
  const incomingTime = getRecordTime(incomingRecord);
  if (incomingTime !== currentTime) {
    return incomingTime > currentTime ? incomingRecord : currentRecord;
  }

  return getAnsweredCount(incomingRecord) >= getAnsweredCount(currentRecord)
    ? incomingRecord
    : currentRecord;
};

export const mergeHistoryMaps = (...historyMaps) => historyMaps.reduce((merged, historyMap) => {
  Object.entries(historyMap || {}).forEach(([quizId, record]) => {
    merged[quizId] = selectPreferredAttempt(merged[quizId], record);
  });
  return merged;
}, {});

const getOptionValue = (option) => (
  option && typeof option === 'object' ? option.text : option
);

const getCorrectValue = (question) => {
  if (question?.correctOption !== undefined) return getOptionValue(question.correctOption);
  if (question?.correctIndex !== undefined) return getOptionValue(question.options?.[question.correctIndex]);
  if (typeof question?.answer === 'number') return getOptionValue(question.options?.[question.answer]);
  return getOptionValue(question?.answer);
};

const isCorrectAnswer = (question, answer) => {
  if (typeof answer === 'number' && question?.correctIndex !== undefined) {
    return Number(answer) === Number(question.correctIndex);
  }

  const answerValue = getOptionValue(answer);
  const correctValue = getCorrectValue(question);
  return answerValue !== undefined
    && correctValue !== undefined
    && String(answerValue) === String(correctValue);
};

const mergeAnswersForQuestions = (questions, records) => {
  const questionIds = new Set(questions.map(question => String(question.id)));
  const sortedRecords = records
    .filter(Boolean)
    .map((record, index) => ({ record, index }))
    .sort((left, right) => (
      getRecordTime(left.record) - getRecordTime(right.record) || left.index - right.index
    ));
  const answers = {};

  sortedRecords.forEach(({ record }) => {
    Object.entries(record.answers || {}).forEach(([questionId, answer]) => {
      if (questionIds.has(String(questionId))) answers[String(questionId)] = answer;
    });
  });

  return answers;
};

export const getQuestionGroupProgress = (
  questions = [],
  { scopedRecords = [], fullRecords = [], masteryRatio = MASTERY_RATIO } = {}
) => {
  const total = questions.length;
  if (total === 0) {
    return {
      total: 0,
      answered: 0,
      score: 0,
      completionPercent: 0,
      accuracyPercent: 0,
      status: 'not-started',
      isCompleted: false,
      isMastered: false,
    };
  }

  const mergedAnswers = mergeAnswersForQuestions(questions, [...fullRecords, ...scopedRecords]);
  const answeredFromAnswers = Object.keys(mergedAnswers).length;
  const scopedAnswered = scopedRecords.reduce(
    (maximum, record) => Math.max(maximum, getAnsweredCount(record)),
    0
  );
  const answered = clamp(Math.max(answeredFromAnswers, scopedAnswered), 0, total);
  const derivedScore = Object.entries(mergedAnswers).reduce((score, [questionId, answer]) => {
    const question = questions.find(item => String(item.id) === questionId);
    return score + Number(isCorrectAnswer(question, answer));
  }, 0);
  const scopedScore = scopedRecords.reduce(
    (maximum, record) => Math.max(maximum, Number(record?.score || 0)),
    0
  );
  const score = clamp(
    answeredFromAnswers >= scopedAnswered ? derivedScore : Math.max(derivedScore, scopedScore),
    0,
    answered
  );
  const completionPercent = Math.round((answered / total) * 100);
  const accuracyPercent = answered > 0 ? Math.round((score / answered) * 100) : 0;
  const isCompleted = answered >= total;
  const isMastered = isCompleted && score / total > masteryRatio;
  const status = isMastered
    ? 'mastered'
    : isCompleted
      ? 'completed'
      : answered > 0
        ? 'in-progress'
        : 'not-started';

  return {
    total,
    answered,
    score,
    completionPercent,
    accuracyPercent,
    status,
    isCompleted,
    isMastered,
  };
};

export const summarizeProgress = (groups = [], masteryRatio = MASTERY_RATIO) => {
  const total = groups.reduce((sum, group) => sum + Number(group?.total || 0), 0);
  const answered = groups.reduce((sum, group) => sum + Number(group?.answered || 0), 0);
  const score = groups.reduce((sum, group) => sum + Number(group?.score || 0), 0);
  const completionPercent = total > 0 ? Math.round((answered / total) * 100) : 0;
  const accuracyPercent = answered > 0 ? Math.round((score / answered) * 100) : 0;
  const isCompleted = total > 0 && answered >= total;
  const isMastered = isCompleted && score / total > masteryRatio;

  return {
    total,
    answered,
    score,
    completionPercent,
    accuracyPercent,
    status: isMastered
      ? 'mastered'
      : isCompleted
        ? 'completed'
        : answered > 0
          ? 'in-progress'
          : 'not-started',
    isCompleted,
    isMastered,
  };
};

export const getRecordedProgress = (record, total, masteryRatio = MASTERY_RATIO) => {
  const normalizedTotal = Math.max(Number(total) || 0, 0);
  const answered = clamp(getAnsweredCount(record), 0, normalizedTotal);
  const score = clamp(Number(record?.score || 0), 0, answered);
  const completionPercent = normalizedTotal > 0
    ? Math.round((answered / normalizedTotal) * 100)
    : 0;
  const accuracyPercent = answered > 0 ? Math.round((score / answered) * 100) : 0;
  const isCompleted = normalizedTotal > 0 && answered >= normalizedTotal;
  const isMastered = isCompleted && score / normalizedTotal > masteryRatio;

  return {
    total: normalizedTotal,
    answered,
    score,
    completionPercent,
    accuracyPercent,
    status: isMastered
      ? 'mastered'
      : isCompleted
        ? 'completed'
        : answered > 0
          ? 'in-progress'
          : 'not-started',
    isCompleted,
    isMastered,
  };
};

export const getCombinedAttemptCount = (fullRecord, sectionRecords = [], total = 0) => {
  const records = [fullRecord, ...sectionRecords].filter(Boolean);
  const answeredQuestionIds = new Set();
  records.forEach(record => {
    Object.keys(record.answers || {}).forEach(questionId => answeredQuestionIds.add(String(questionId)));
  });

  const fullAnswered = getAnsweredCount(fullRecord);
  const sectionAnswered = sectionRecords.reduce(
    (sum, record) => sum + getAnsweredCount(record),
    0
  );

  return clamp(
    Math.max(answeredQuestionIds.size, fullAnswered, sectionAnswered),
    0,
    total
  );
};
