// src/components/ShinkanzenChapterList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SHINKANZEN_READING_PARTS = [
  { num: 1, title: '第1部：基礎力をつけよう', titleEn: 'Building Basic Competence', firstMondai: 'part-1', mondaiCount: 13 },
  { num: 2, title: '第2部：いろいろな文章を読もう', titleEn: 'Reading Various Text Types', firstMondai: 'mondai-14', mondaiCount: 7 },
  { num: 3, title: '第3部：内容理解（長文）', titleEn: 'Long Passage Comprehension', firstMondai: 'mondai-21', mondaiCount: 8 },
  { num: 4, title: '第4部：情報検索', titleEn: 'Information Retrieval', firstMondai: 'mondai-29', mondaiCount: 17 },
];

const SHINKANZEN_LISTENING_PARTS = [
  { num: 1, title: '第1部：課題理解', titleEn: 'Task-Based Comprehension', firstMondai: 'mondai-1', count: 15 },
  { num: 2, title: '第2部：ポイント理解', titleEn: 'Comprehension of Key Points', firstMondai: 'mondai-16', count: 15 },
  { num: 3, title: '第3部：概要理解', titleEn: 'Comprehension of General Outline', firstMondai: 'mondai-31', count: 10 },
  { num: 4, title: '第4部：発話表現・即時応答', titleEn: 'Verbal Expressions / Quick Response', firstMondai: 'mondai-41', count: 30 },
  { num: 5, title: '模擬試験', titleEn: 'Mock Exam', firstMondai: 'mondai-71', count: 28 },
];

const ShinkanzenChapterList = ({ book }) => {
  const isListening = book?.id?.includes('listening');
  const parts = isListening ? SHINKANZEN_LISTENING_PARTS : SHINKANZEN_READING_PARTS;
  const isAmber = !isListening;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {parts.map((part) => (
        <Link
          key={part.num}
          to={`/books/${book.id}/chapters/${part.firstMondai}`}
          className={`bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-between ${
            isAmber ? 'hover:border-amber-500' : 'hover:border-blue-500'
          }`}
        >
          <div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
              {part.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              {part.titleEn}
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1.5 font-medium">
              <span>{isListening ? `${part.count} 問題` : `${part.mondaiCount} 問題`}</span>
              <span>Part {part.num}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isAmber ? 'bg-amber-600' : 'bg-blue-600'
                }`}
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShinkanzenChapterList;
