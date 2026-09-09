// src/components/TangoChapterList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TANGO_TOPIC_DATA = {
  tango_n3: [
    { id: 'topic_01', num: 1, title: 'Topic 1: 食事', titleEn: 'Food & Dining', stories: 27, words: 84 },
    { id: 'topic_02', num: 2, title: 'Topic 2: 買い物', titleEn: 'Shopping & Goods', stories: 26, words: 59 },
    { id: 'topic_03', num: 3, title: 'Topic 3: ファッション', titleEn: 'Fashion & Style', stories: 15, words: 38 },
    { id: 'topic_04', num: 4, title: 'Topic 4: 家', titleEn: 'Home & Living', stories: 20, words: 57 },
    { id: 'topic_05', num: 5, title: 'Topic 5: まち', titleEn: 'Town & Facilities', stories: 30, words: 105 },
    { id: 'topic_06', num: 6, title: 'Topic 6: 交通', titleEn: 'Transit & Transportation', stories: 19, words: 61 },
    { id: 'topic_07', num: 7, title: 'Topic 7: 休暇', titleEn: 'Leisure & Vacations', stories: 9, words: 35 },
    { id: 'topic_08', num: 8, title: 'Topic 8: 自然・環境', titleEn: 'Nature & Climate', stories: 23, words: 70 },
    { id: 'topic_09', num: 9, title: 'Topic 9: 動物', titleEn: 'Animals & Pets', stories: 18, words: 69 },
    { id: 'topic_10', num: 10, title: 'Topic 10: 学校・教育', titleEn: 'School & Studies', stories: 13, words: 92 },
    { id: 'topic_11', num: 11, title: 'Topic 11: 仕事', titleEn: 'Work & Office', stories: 16, words: 91 },
    { id: 'topic_12', num: 12, title: 'Topic 12: 旅行', titleEn: 'Travel & Sightseeing', stories: 30, words: 151 }
  ],
  tango_n2: [
    { id: 'topic_01', num: 1, title: 'Topic 1: 食事', titleEn: 'Food & Dining', stories: 17 },
    { id: 'topic_02', num: 2, title: 'Topic 2: 家事', titleEn: 'Housework & Living', stories: 19 },
    { id: 'topic_03', num: 3, title: 'Topic 3: 買い物', titleEn: 'Shopping', stories: 12 },
    { id: 'topic_04', num: 4, title: 'Topic 4: ファッション', titleEn: 'Fashion', stories: 22 },
    { id: 'topic_05', num: 5, title: 'Topic 5: テクノロジー', titleEn: 'Technology', stories: 12 },
    { id: 'topic_06', num: 6, title: 'Topic 6: 流行', titleEn: 'Trends & Pop Culture', stories: 27 },
    { id: 'topic_07', num: 7, title: 'Topic 7: 趣味', titleEn: 'Hobbies & Interests', stories: 17 },
    { id: 'topic_08', num: 8, title: 'Topic 8: 人付き合い', titleEn: 'Relationships', stories: 19 },
    { id: 'topic_09', num: 9, title: 'Topic 9: 年中行事', titleEn: 'Annual Events', stories: 7 },
    { id: 'topic_10', num: 10, title: 'Topic 10: スポーツ', titleEn: 'Sports & Fitness', stories: 23 },
    { id: 'topic_11', num: 11, title: 'Topic 11: 動物', titleEn: 'Animals', stories: 17 },
    { id: 'topic_12', num: 12, title: 'Topic 12: 住', titleEn: 'Housing', stories: 15 },
    { id: 'topic_13', num: 13, title: 'Topic 13: 町', titleEn: 'Town & Urban Life', stories: 15 },
    { id: 'topic_14', num: 14, title: 'Topic 14: 天気', titleEn: 'Weather & Climate', stories: 22 },
    { id: 'topic_15', num: 15, title: 'Topic 15: 旅行', titleEn: 'Travel & Vacations', stories: 25 },
    { id: 'topic_16', num: 16, title: 'Topic 16: 学校', titleEn: 'School & Academia', stories: 27 },
    { id: 'topic_17', num: 17, title: 'Topic 17: 仕事', titleEn: 'Work & Employment', stories: 23 },
    { id: 'topic_18', num: 18, title: 'Topic 18: 人生', titleEn: 'Human Life & Society', stories: 20 },
    { id: 'topic_19', num: 19, title: 'Topic 19: 健康', titleEn: 'Health & Medical', stories: 16 },
    { id: 'topic_20', num: 20, title: 'Topic 20: マナー', titleEn: 'Etiquette & Manners', stories: 18 },
    { id: 'topic_21', num: 21, title: 'Topic 21: 社会', titleEn: 'Society & Economy', stories: 23 },
    { id: 'topic_22', num: 22, title: 'Topic 22: 政治', titleEn: 'Politics & Law', stories: 15 },
    { id: 'topic_23', num: 23, title: 'Topic 23: 環境・科学', titleEn: 'Environment & Science', stories: 25 }
  ],
  tango_n1: Array.from({ length: 27 }, (_, i) => ({
    id: `topic_${String(i + 1).padStart(2, '0')}`,
    num: i + 1,
    title: `Topic ${i + 1}`,
    titleEn: `Topic ${i + 1} Advanced Vocabulary`,
    stories: 18
  }))
};

const TangoChapterList = ({ book }) => {
  const bookId = book?.id || 'tango_n3';
  const topics = TANGO_TOPIC_DATA[bookId] || TANGO_TOPIC_DATA.tango_n3;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
          📚 Topics Overview ({topics.length} Units)
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          Interactive Reader & Active Drill
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/tango-reading/${bookId}/chapters/${topic.id}`}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-emerald-500 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Unit {topic.num}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                  {topic.stories} Stories
                </span>
              </div>

              <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {topic.title}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                {topic.titleEn}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-medium">
              <span>{topic.words ? `${topic.words} target words` : 'Situational dialogues'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform inline-block">
                Start Study &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TangoChapterList;
