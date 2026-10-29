import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import { loadRuntimeBook } from '../dataSources/runtimeBookDataSource.js';
import {
  getRecordedProgress,
  selectPreferredAttempt,
  summarizeProgress,
} from '../utils/bookProgress.js';
import StarExplanationCard from './ui/StarExplanationCard.jsx';
import { isStarQuestion } from '../utils/starQuestionExplainer.js';

// Section & Chapter Definitions
const BOOK_PARTS_TEMPLATE = [
  {
    id: 'moji_goi',
    number: '第1部',
    title: '文字・語彙 (Moji & Goi)',
    desc: '漢字読み、表記、文脈規定、類義語、用法をマスターする。',
    icon: '🔤',
    badge: '381問全問収録',
    color: 'from-amber-500 to-orange-600',
    sections: [
      { id: 'ch1-m1', title: '問題1 漢字読み (90問)', desc: '下線部の漢字の読み方を選ぶ', totalQ: 90, type: 'quiz', data: null },
      { id: 'ch1-m2', title: '問題2 表記 (70問)', desc: 'ひらがなを正しい漢字に直す', totalQ: 70, type: 'quiz', data: null },
      { id: 'ch1-m3', title: '問題3 文脈規定 (117問)', desc: '文脈に合った語彙を選ぶ', totalQ: 117, type: 'quiz', data: null },
      { id: 'ch1-m4', title: '問題4 言い換え類義 (50問)', desc: '同じ意味のことばを選ぶ', totalQ: 50, type: 'quiz', data: null },
      { id: 'ch1-m5', title: '問題5 用法 (54問)', desc: 'ことばの正しい使い方の文を選ぶ', totalQ: 54, type: 'quiz', data: null },
    ]
  },
  {
    id: 'bunpou',
    number: '第2部',
    title: '文法 (Grammar)',
    desc: 'JLPT N3に出る重要文法110項目の意味・接続・例文と実践問題。',
    icon: '📘',
    badge: '110文法・実践問題',
    color: 'from-blue-600 to-indigo-700',
    sections: [
      { id: 'ch2-lessons', title: '文法解説 (47文法マスター)', desc: '意味・接続・例文・英語解説 (第1節〜第5節)', totalQ: 47, type: 'lesson', data: null },
      { id: 'ch2-sec1', title: '第1節 理由・原因 練習問題 (15問)', desc: '〜せい、〜おかげ、〜ため、〜によって 他', totalQ: 15, type: 'quiz', data: null },
      { id: 'ch2-sec2', title: '第2節 状況・変化 練習問題 (15問)', desc: '〜まま、〜つつ、〜つつある、〜にしたがって 他', totalQ: 15, type: 'quiz', data: null },
      { id: 'ch2-sec3', title: '第3節 立場・基準 練習問題 (15問)', desc: '〜にとって、〜に対して、〜として 他', totalQ: 15, type: 'quiz', data: null },
      { id: 'ch2-sec4', title: '第4節 逆接・否定 練習問題 (15問)', desc: '〜わりに、〜くせに、〜どころか 他', totalQ: 15, type: 'quiz', data: null },
      { id: 'ch2-sec5', title: '第5節 程度・強調・比較 練習問題 (15問)', desc: '〜ほど、〜くらい、〜ばかりか 他', totalQ: 15, type: 'quiz', data: null },
      { id: 'ch2-sec6', title: '第6節 想像・予想 (準備中)', desc: '〜にちがいない、〜はずだ、〜おそれがある 他', totalQ: 15, type: 'quiz', data: null },
    ]
  },
  {
    id: 'dokkai',
    number: '第3部',
    title: '読解 (Reading Comprehension)',
    desc: '短文・中文・長文・情報検索を正確に読み解く読解演習。',
    icon: '📖',
    badge: '短文・中文・長文・情報検索',
    color: 'from-emerald-600 to-teal-700',
    sections: [
      { id: 'ch3-tanbun', title: '問題4 内容理解 (短文 - 4問)', desc: 'お知らせ・メール・意見文 (約200字)', totalQ: 4, type: 'dokkai', data: null },
      { id: 'ch3-chubun', title: '問題5 内容理解 (中文 - 6問)', desc: '解説文・エッセイ (約400字)', totalQ: 6, type: 'dokkai', data: null },
      { id: 'ch3-chobun', title: '問題6 内容理解 (長文 - 4問)', desc: '論説文・解説 (約700字)', totalQ: 4, type: 'dokkai', data: null },
      { id: 'ch3-kensaku', title: '問題7 情報検索 (2問)', desc: 'ポスター・チラシから条件に合う情報を探す', totalQ: 2, type: 'dokkai', data: null },
    ]
  },
  {
    id: 'choukai',
    number: '第4部',
    title: '聴解 (Listening Comprehension)',
    desc: '課題理解、ポイント理解、概要理解、発話表現、即時応答の実践演習。',
    icon: '🎧',
    badge: '28問 + 5例題 (音声つき)',
    color: 'from-purple-600 to-pink-600',
    sections: [
      { id: 'ch4-kadai', title: '問題1 課題理解 (6問 + 例題)', desc: '次にするべき行動を聞き取る', totalQ: 6, type: 'quiz', data: null },
      { id: 'ch4-point', title: '問題2 ポイント理解 (6問 + 例題)', desc: 'ポイント・要点を聞き取る', totalQ: 6, type: 'quiz', data: null },
      { id: 'ch4-gaiyou', title: '問題3 概要理解 (3問 + 例題)', desc: '全体のテーマや話者の言いたいこと', totalQ: 3, type: 'quiz', data: null },
      { id: 'ch4-hatsuwa', title: '問題4 発話表現 (4問 + 例題)', desc: '状況に合った適切な一言', totalQ: 4, type: 'quiz', data: null },
      { id: 'ch4-sokuji', title: '問題5 即時応答 (9問 + 例題)', desc: '質問や挨拶に対する瞬時の返答', totalQ: 9, type: 'quiz', data: null },
    ]
  }
];

const PLANNED_SECTION_IDS = new Set(['ch2-sec6']);

const isScoredQuestion = (question) => (
  question?.questionNumber !== '例'
  && !String(question?.id || '').endsWith('-ex')
);

const isTrackableSection = (section) => (
  section?.data !== null && (section?.type === 'quiz' || section?.type === 'dokkai')
);

const getSectionQuestionCount = (section) => {
  if (!isTrackableSection(section)) return 0;
  if (section.type === 'dokkai') {
    return (section.data?.passages || []).reduce((total, passage) => {
      const questions = passage.questions || (passage.question ? [passage.question] : []);
      return total + questions.filter(isScoredQuestion).length;
    }, 0);
  }
  return (section.data?.pages || []).reduce(
    (total, page) => total + (page.questions || []).filter(isScoredQuestion).length,
    0
  );
};

export default function NihongoNoMoriN3Book() {
  const { currentUser } = useAuth();
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFurigana, setShowFurigana] = useState(true);
  const [sectionScores, setSectionScores] = useState({});
  const [bookParts, setBookParts] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    loadRuntimeBook('nihongo-no-mori-n3')
      .then((book) => {
        const contentBySection = new Map(
          (book.chapters || []).map(section => [section.id, section.data || section])
        );
        const hydratedParts = BOOK_PARTS_TEMPLATE.map(part => ({
          ...part,
          sections: part.sections.map(section => ({
            ...section,
            data: contentBySection.get(section.id) || null,
          })),
        }));
        const missingSectionIds = hydratedParts
          .flatMap(part => part.sections)
          .filter(section => !PLANNED_SECTION_IDS.has(section.id) && section.data === null)
          .map(section => section.id);
        if (missingSectionIds.length > 0) {
          throw new Error(`Missing section content: ${missingSectionIds.join(', ')}`);
        }
        if (isMounted) setBookParts(hydratedParts);
      })
      .catch((error) => {
        if (isMounted) setContentError(error.message);
      })
      .finally(() => {
        if (isMounted) setContentLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Load saved progress from localStorage and Firestore
  useEffect(() => {
    let isActive = true;

    setSectionScores({});
    const storageKey = currentUser
      ? `nihongo_no_mori_n3_scores_${currentUser.uid}`
      : `nihongo_no_mori_n3_scores_guest`;
    try {
      const local = localStorage.getItem(storageKey);
      if (local) {
        setSectionScores(JSON.parse(local));
      }
    } catch (e) {
      console.warn("Could not load local section scores", e);
    }

    if (currentUser) {
      const fetchScores = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid, 'bookProgress', 'nihongo-no-mori-n3');
          const snap = await getDoc(docRef);
          if (isActive && snap.exists() && snap.data()?.sections) {
            setSectionScores(previousScores => {
              const mergedScores = { ...previousScores };
              Object.entries(snap.data().sections).forEach(([sectionId, record]) => {
                mergedScores[sectionId] = selectPreferredAttempt(mergedScores[sectionId], record);
              });
              return mergedScores;
            });
          }
        } catch (e) {
          if (isActive) console.warn("Could not fetch remote section scores", e);
        }
      };
      fetchScores();
    }

    return () => {
      isActive = false;
    };
  }, [currentUser]);

  // Load section answers when entering a section
  useEffect(() => {
    if (!activeSectionId) {
      setUserAnswers({});
      return;
    }
    const ansKey = currentUser
      ? `nihongo_no_mori_n3_ans_${currentUser.uid}_${activeSectionId}`
      : `nihongo_no_mori_n3_ans_guest_${activeSectionId}`;
    try {
      const saved = localStorage.getItem(ansKey);
      if (saved) {
        setUserAnswers(JSON.parse(saved));
      } else {
        setUserAnswers({});
      }
    } catch {
      setUserAnswers({});
    }
  }, [activeSectionId, currentUser]);

  const selectedPart = bookParts.find(p => p.id === selectedPartId) || null;
  
  let currentSectionMeta = null;
  for (const part of bookParts) {
    const found = part.sections.find(s => s.id === activeSectionId);
    if (found) {
      currentSectionMeta = found;
      break;
    }
  }

  const sectionData = currentSectionMeta?.data || null;
  const sectionProgress = useMemo(() => {
    const progressMap = {};
    bookParts.forEach(part => {
      part.sections.forEach(section => {
        if (isTrackableSection(section)) {
          progressMap[section.id] = getRecordedProgress(
            sectionScores[section.id],
            getSectionQuestionCount(section)
          );
        }
      });
    });
    return progressMap;
  }, [bookParts, sectionScores]);
  const overallProgress = useMemo(
    () => summarizeProgress(Object.values(sectionProgress)),
    [sectionProgress]
  );
  const completedSectionCount = Object.values(sectionProgress)
    .filter(progress => progress.isCompleted).length;
  const masteredSectionCount = Object.values(sectionProgress)
    .filter(progress => progress.isMastered).length;
  const getPartProgress = (part) => summarizeProgress(
    part.sections
      .filter(isTrackableSection)
      .map(section => sectionProgress[section.id])
  );
  const selectedPartProgress = selectedPart ? getPartProgress(selectedPart) : null;

  // Save answers & score whenever user selects an option
  const handleSelectOption = async (qId, optIdx) => {
    if (userAnswers[qId] !== undefined) return;
    const newAnswers = { ...userAnswers, [qId]: optIdx + 1 };
    setUserAnswers(newAnswers);

    // Save answers locally
    if (activeSectionId) {
      const ansKey = currentUser
        ? `nihongo_no_mori_n3_ans_${currentUser.uid}_${activeSectionId}`
        : `nihongo_no_mori_n3_ans_guest_${activeSectionId}`;
      try {
        localStorage.setItem(ansKey, JSON.stringify(newAnswers));
      } catch (storageError) {
        console.warn('Could not save local section answers:', storageError);
      }

      const sectionQuestions = currentSectionMeta?.type === 'dokkai'
        ? (sectionData?.passages || []).flatMap(passage => (
            passage.questions || (passage.question ? [passage.question] : [])
          )).filter(isScoredQuestion)
        : (sectionData?.pages || []).flatMap(page => page.questions || []).filter(isScoredQuestion);
      const scoredAnswers = Object.fromEntries(
        sectionQuestions
          .filter(question => newAnswers[question.id] !== undefined)
          .map(question => [question.id, newAnswers[question.id]])
      );
      const totalQuestions = sectionQuestions.length;
      const answeredCount = Object.keys(scoredAnswers).length;
      const correctCount = sectionQuestions.reduce((total, question) => (
        total + Number(scoredAnswers[question.id] === question.correct_answer)
      ), 0);
      const completionPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
      const accuracyPercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
      const isCompleted = totalQuestions > 0 && answeredCount >= totalQuestions;
      const status = isCompleted && correctCount / totalQuestions > 0.9
        ? 'mastered'
        : isCompleted
          ? 'completed'
          : 'in-progress';

      const updatedScores = {
        ...sectionScores,
        [activeSectionId]: {
          sectionId: activeSectionId,
          score: correctCount,
          total: totalQuestions,
          answered: answeredCount,
          answers: scoredAnswers,
          percentage: accuracyPercent,
          completionPercent,
          accuracyPercent,
          status,
          updatedAt: new Date().toISOString()
        }
      };

      setSectionScores(updatedScores);

      const storageKey = currentUser
        ? `nihongo_no_mori_n3_scores_${currentUser.uid}`
        : `nihongo_no_mori_n3_scores_guest`;
      try {
        localStorage.setItem(storageKey, JSON.stringify(updatedScores));
      } catch (storageError) {
        console.warn('Could not save local section progress:', storageError);
      }

      // Sync to Firebase & quizHistory if logged in
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid, 'bookProgress', 'nihongo-no-mori-n3');
          await setDoc(docRef, { sections: updatedScores, updatedAt: new Date().toISOString() }, { merge: true });

          const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', `nihongo-no-mori-n3-${activeSectionId}`);
          await setDoc(historyDocRef, {
            quizId: `nihongo-no-mori-n3-${activeSectionId}`,
            bookId: 'nihongo-no-mori-n3',
            chapterId: activeSectionId,
            title: `日本語の森 N3: ${currentSectionMeta?.title || activeSectionId}`,
            score: correctCount,
            total: totalQuestions,
            answered: answeredCount,
            answers: scoredAnswers,
            percentage: accuracyPercent,
            completionPercent,
            accuracyPercent,
            status,
            type: 'book',
            category: selectedPart?.id || 'jlpt',
            timestamp: new Date().toISOString()
          }, { merge: true });
        } catch (e) {
          console.warn("Failed syncing to Firestore:", e);
        }
      }
    }
  };

  const handleResetSection = async (sectionId = activeSectionId) => {
    if (!window.confirm("このセクションの回答履歴をリセットして最初からやり直しますか？")) return;
    if (sectionId) {
      if (sectionId === activeSectionId) setUserAnswers({});
      const ansKey = currentUser
        ? `nihongo_no_mori_n3_ans_${currentUser.uid}_${sectionId}`
        : `nihongo_no_mori_n3_ans_guest_${sectionId}`;
      localStorage.removeItem(ansKey);

      const updatedScores = { ...sectionScores };
      delete updatedScores[sectionId];
      setSectionScores(updatedScores);
      const storageKey = currentUser
        ? `nihongo_no_mori_n3_scores_${currentUser.uid}`
        : `nihongo_no_mori_n3_scores_guest`;
      localStorage.setItem(storageKey, JSON.stringify(updatedScores));

      if (currentUser) {
        try {
          const progressRef = doc(db, 'users', currentUser.uid, 'bookProgress', 'nihongo-no-mori-n3');
          await setDoc(progressRef, {
            sections: updatedScores,
            updatedAt: new Date().toISOString(),
          });
          const historyRef = doc(db, 'users', currentUser.uid, 'quizHistory', `nihongo-no-mori-n3-${sectionId}`);
          await deleteDoc(historyRef);
        } catch (error) {
          console.warn('Could not reset remote section progress:', error);
        }
      }
    }
  };

  const renderHtml = (html) => {
    if (!html) return '';
    let processed = html;
    if (!showFurigana) {
      processed = processed.replace(/<rt>.*?<\/rt>/g, '');
    }
    return <span dangerouslySetInnerHTML={{ __html: processed }} />;
  };

  if (contentLoading) return <LoadingSpinner />;
  if (contentError) {
    return <div className="error-message" style={{ padding: '100px', textAlign: 'center' }}>Failed to load book content: {contentError}</div>;
  }

  // 1. HUB VIEW: 4 Parts
  if (!selectedPartId && !activeSectionId) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 pt-24 md:pt-28 px-4 sm:px-6 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-4 flex items-center justify-between">
          <Link to="/books" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5">
            <span>&larr;</span> <span>本棚に戻る (Back to Books)</span>
          </Link>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            完全デジタル化進行中
          </span>
        </div>

        <div className="w-full max-w-4xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-900/50 mb-8 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl font-black select-none pointer-events-none">
            N3
          </div>
          <div className="relative z-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-stretch">
            <div>
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-extrabold text-xs tracking-wider uppercase">
                <span>🌱 日本語の森 • JLPT 一冊合格シリーズ</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black mb-3 tracking-tight">
                JLPT N3 この一冊で合格する
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
                文字・語彙から文法、読解、聴解まで、合格に必要な全てのパートを網羅。学習したいパートを選んで練習問題を始めましょう。
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {bookParts.map(part => {
                  const partProgress = getPartProgress(part);
                  return (
                    <div key={part.id} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                      <div className="text-2xl mb-1">{part.icon}</div>
                      <div className="text-xs text-slate-400 font-semibold">{part.number}</div>
                      <div className="text-sm font-black text-white">{part.title.split(' ')[0]}</div>
                      <div className="text-[11px] text-emerald-400 mt-1 font-bold">
                        {partProgress.completionPercent}% complete
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm flex flex-col justify-center">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">Overall progress</span>
              <strong className="mt-2 text-4xl font-black text-white">{overallProgress.completionPercent}%</strong>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/40">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                  style={{ width: `${overallProgress.completionPercent}%` }}
                />
              </div>
              <span className="mt-2 text-xs text-slate-300">
                {overallProgress.answered}/{overallProgress.total} questions attempted
              </span>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <span className="rounded-xl border border-white/10 bg-black/20 p-2 text-[10px] text-slate-300">
                  <strong className="block text-sm text-white">{completedSectionCount}/19</strong>
                  completed
                </span>
                <span className="rounded-xl border border-white/10 bg-black/20 p-2 text-[10px] text-slate-300">
                  <strong className="block text-sm text-emerald-400">{masteredSectionCount}/19</strong>
                  mastered
                </span>
              </div>
            </aside>
          </div>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5">
          {bookParts.map(part => {
            const liveSections = part.sections.filter(s => s.data !== null);
            const partProgress = getPartProgress(part);
            const totalQuestionsLive = partProgress.total;

            return (
              <div
                key={part.id}
                onClick={() => setSelectedPartId(part.id)}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${part.color}`} />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-inner">
                      {part.icon}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {part.badge}
                    </span>
                  </div>

                  <div className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 mb-1">
                    {part.number}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {part.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {part.desc}
                  </p>
                  <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <div className="mb-2 flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500 dark:text-slate-400">Question progress</span>
                      <strong className="text-blue-600 dark:text-blue-400">{partProgress.completionPercent}%</strong>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <span
                        className={`block h-full rounded-full bg-gradient-to-r ${part.color}`}
                        style={{ width: `${partProgress.completionPercent}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{partProgress.answered}/{partProgress.total} attempted</span>
                      <span>{liveSections.length} sections available</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-400">
                    {part.sections.length} セクション収録
                    {totalQuestionsLive > 0 && (
                      <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-black">
                        ({totalQuestionsLive}項目 公開中)
                      </span>
                    )}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition flex items-center gap-1">
                    <span>選択する</span> <span>&rarr;</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. PART VIEW: Section List
  if (selectedPartId && !activeSectionId) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 pt-24 md:pt-28 px-4 sm:px-6 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedPartId(null)}
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
          >
            <span>&larr;</span> <span>パート選択に戻る (Back to 4 Parts)</span>
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{selectedPart.icon}</span>
            <div>
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase">
                {selectedPart.number}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {selectedPart.title}
              </h1>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            {selectedPart.desc}
          </p>
          {selectedPartProgress && selectedPartProgress.total > 0 && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="mb-2 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-400">Part progress</span>
                <strong className="text-blue-600 dark:text-blue-400">{selectedPartProgress.completionPercent}%</strong>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <span
                  className={`block h-full rounded-full bg-gradient-to-r ${selectedPart.color}`}
                  style={{ width: `${selectedPartProgress.completionPercent}%` }}
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{selectedPartProgress.answered}/{selectedPartProgress.total} questions attempted</span>
                {selectedPartProgress.answered > 0 && (
                  <span>{selectedPartProgress.accuracyPercent}% accuracy</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-4xl space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 px-1 mb-2">
            セクション一覧
          </div>

          {selectedPart.sections.map((sec, idx) => {
            const isAvailable = sec.data !== null;
            const progress = sectionProgress[sec.id] || null;
            const hasProgress = Boolean(progress?.answered);

            return (
              <div
                key={sec.id}
                onClick={() => {
                  if (isAvailable) {
                    setActiveSectionId(sec.id);
                    setCurrentPageIndex(0);
                  }
                }}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isAvailable
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md cursor-pointer'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                    isAvailable ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        {sec.title}
                      </h3>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isAvailable
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {isAvailable ? `${sec.totalQ}項目 プレイ可能` : '準備中'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {sec.desc}
                    </p>
                    {progress && (
                      <div className="mt-3 max-w-xl">
                        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold">
                          <span className="text-slate-500 dark:text-slate-400">
                            {progress.answered}/{progress.total} attempted
                          </span>
                          <span className={progress.isMastered ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}>
                            {progress.completionPercent}% complete
                            {hasProgress ? ` - ${progress.accuracyPercent}% accuracy` : ''}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <span
                            className={`block h-full rounded-full ${progress.isMastered ? 'bg-emerald-500' : 'bg-blue-600'}`}
                            style={{ width: `${progress.completionPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isAvailable ? (
                    <div className="flex items-center gap-2">
                      {hasProgress && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResetSection(sec.id);
                          }}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                          title="スコアをリセット"
                        >
                          リセット
                        </button>
                      )}
                      <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm">
                        <span>{hasProgress ? '続ける' : '開始する'}</span> <span>&rarr;</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                      デジタル化進行中
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3A. GRAMMAR LESSON VIEW (文法解説: 意味・接続・例文・英語解説)
  if (currentSectionMeta?.type === 'lesson') {
    const allLessons = [];
    sectionData.sections.forEach(s => {
      s.lessons.forEach(l => {
        allLessons.push({ ...l, sectionTitle: s.sectionTitle });
      });
    });

    const currentLesson = allLessons[currentPageIndex] || allLessons[0];

    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 pt-24 md:pt-28 px-4 sm:px-6 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-3 flex items-center justify-between">
          <button
            onClick={() => setActiveSectionId(null)}
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>&larr;</span> <span>文法セクション一覧に戻る</span>
          </button>
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
          >
            {showFurigana ? 'ふりがな: ON 🟢' : 'ふりがな: OFF ⚪'}
          </button>
        </div>

        {/* Lesson Navigation Header */}
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                {currentLesson.sectionTitle}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {currentLesson.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                disabled={currentPageIndex === 0}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold disabled:opacity-30"
              >
                &larr; 前項目
              </button>
              <span className="text-xs font-black text-slate-500">
                {currentPageIndex + 1} / {allLessons.length}
              </span>
              <button
                onClick={() => setCurrentPageIndex(Math.min(allLessons.length - 1, currentPageIndex + 1))}
                disabled={currentPageIndex === allLessons.length - 1}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold disabled:opacity-30"
              >
                次項目 &rarr;
              </button>
            </div>
          </div>

          {/* Grammar Quick Pills */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto py-1">
            {allLessons.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => setCurrentPageIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  currentPageIndex === idx
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {l.grammarPoint}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson Details Card */}
        <div className="w-full max-w-4xl space-y-6">
          {/* Meaning & Connection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                意味 (Meaning)
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-relaxed">
                {renderHtml(currentLesson.meaning)}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 italic">
                {currentLesson.meaningEn}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                接続 (Connection)
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mb-2 font-mono">
                {currentLesson.connection}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                {currentLesson.connectionEn}
              </div>
              {currentLesson.connectionExamples?.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase mb-1">接続例 (Examples)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentLesson.connectionExamples.map((ce, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                        {renderHtml(ce)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3 Example Sentences */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📖</span> <span>例文 (Example Sentences)</span>
            </h3>

            <div className="space-y-4">
              {currentLesson.examples.map((ex, idx) => (
                <div key={ex.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="grow">
                      <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 leading-relaxed">
                        {renderHtml(ex.sentence)}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {ex.english}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {currentLesson.notes && (
              <div className="mt-6 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-black">💡 ポイント / Usage Note: </span>
                {currentLesson.notes}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3B. DOKKAI (READING COMPREHENSION) VIEW
  if (currentSectionMeta?.type === 'dokkai') {
    const passages = sectionData?.passages || [];
    const currentPassage = passages[currentPageIndex] || passages[0];
    const passageQuestions = currentPassage?.questions || (currentPassage?.question ? [currentPassage.question] : []);

    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 pt-24 md:pt-28 px-4 sm:px-6 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-3 flex items-center justify-between">
          <button
            onClick={() => setActiveSectionId(null)}
            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>&larr;</span> <span>読解セクション一覧に戻る</span>
          </button>
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
          >
            {showFurigana ? 'ふりがな: ON 🟢' : 'ふりがな: OFF ⚪'}
          </button>
        </div>

        {/* Section Header Card */}
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                {sectionData?.chapterTitle} • {sectionData?.sectionTitle}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentPassage?.passageLabel ? `大問 ${currentPassage.passageLabel}` : '問題'} (P.{currentPageIndex + 1} / {passages.length})
              </h1>
            </div>

            {/* Passage Switcher Buttons */}
            {passages.length > 1 && (
              <div className="flex items-center gap-2">
                {passages.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentPageIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                      currentPageIndex === idx
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {p.passageLabel || `問${idx + 1}`}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3 text-sm text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-2">
            <span className="text-lg">✏️</span>
            <span>{renderHtml(sectionData?.instruction)}</span>
          </div>
        </div>

        {/* Passage Container */}
        <div className="w-full max-w-4xl space-y-6">
          {currentPassage && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              {currentPassage.preText && (
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  {renderHtml(currentPassage.preText)}
                </div>
              )}

              {/* Optional image asset for flyers / brochures */}
              {currentPassage.imageAsset && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={currentPassage.imageAsset}
                    alt="読解チラシ・ポスター"
                    className="max-w-full rounded-2xl border border-slate-300 dark:border-slate-700 shadow-md"
                  />
                </div>
              )}

              {/* Passage text body */}
              <div className="text-base sm:text-lg leading-loose font-normal whitespace-pre-line mb-6 font-serif">
                {renderHtml(currentPassage.passageText)}
              </div>

              {/* Questions List */}
              <div className="space-y-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                {passageQuestions.map((q, qIndex) => {
                  const selected = userAnswers[q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = selected === q.correct_answer;

                  return (
                    <div key={q.id} className="pt-4 first:pt-0">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                          {q.questionNumber || qIndex + 1}
                        </span>
                        <div className="text-base sm:text-lg font-bold leading-relaxed pt-0.5">
                          {renderHtml(q.stem)}
                        </div>
                      </div>

                      {/* 4 Options */}
                      <div className="space-y-2.5 my-4">
                        {q.options.map((opt, oIdx) => {
                          const optNum = oIdx + 1;
                          let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:border-blue-400 hover:bg-blue-50/30';

                          if (isAnswered) {
                            if (optNum === q.correct_answer) {
                              btnStyle = 'border-emerald-500 bg-emerald-500 text-white font-black shadow-md';
                            } else if (optNum === selected) {
                              btnStyle = 'border-rose-500 bg-rose-500 text-white font-bold opacity-90 line-through';
                            } else {
                              btnStyle = 'border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(q.id, oIdx)}
                              disabled={isAnswered}
                              className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm sm:text-base font-medium transition flex items-center gap-3 ${btnStyle}`}
                            >
                              <span className="w-6 h-6 rounded-full border border-current font-bold text-xs flex items-center justify-center shrink-0">
                                {optNum}
                              </span>
                              <span className="leading-relaxed">{renderHtml(opt)}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Answer & Kaisetsu */}
                      {isAnswered && (
                        <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`font-black px-2.5 py-1 rounded text-xs ${isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'}`}>
                              {isCorrect ? '正解 (Correct) ⭕' : '不正解 (Incorrect) ❌'}
                            </span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              正解: <span className="text-emerald-600 dark:text-emerald-400 font-black">{q.correct_answer}</span>
                            </span>
                          </div>
                          {isStarQuestion(q) && <StarExplanationCard question={q} className="mb-3" />}
                          <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                            {renderHtml(q.explanation)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3C. STANDARD QUIZ VIEW (Moji / Goi & Grammar Questions)
  const pages = sectionData?.pages || [];
  const currentPage = pages[currentPageIndex] || null;
  const pageQuestions = currentPage?.questions || [];
  const scoredPageQuestions = pageQuestions.filter(isScoredQuestion);
  const pageAnsweredCount = scoredPageQuestions.filter(q => userAnswers[q.id] !== undefined).length;
  const pageCorrectCount = scoredPageQuestions.filter(q => userAnswers[q.id] === q.correct_answer).length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 pt-24 md:pt-28 px-3 sm:px-6 flex flex-col items-center">
      {/* Top Bar with Navigation Breadcrumb */}
      <div className="w-full max-w-4xl mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveSectionId(null)}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>&larr;</span> <span>{selectedPart?.title.split(' ')[0] || 'パート一覧'}に戻る</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <button
            onClick={() => {
              setSelectedPartId(null);
              setActiveSectionId(null);
            }}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            全パート一覧
          </button>
        </div>

        <button
          onClick={() => setShowFurigana(!showFurigana)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
        >
          {showFurigana ? 'ふりがな: ON 🟢' : 'ふりがな: OFF ⚪'}
        </button>
      </div>

      {/* Book & Section Header Card */}
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-md border border-slate-200 dark:border-slate-800 mb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              {selectedPart?.number} {selectedPart?.title}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {sectionData?.chapterTitle} — {sectionData?.sectionTitle}
            </h1>
          </div>

          {selectedPart && (
            <div className="flex flex-wrap gap-1.5">
              {selectedPart.sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    if (s.data) {
                      setActiveSectionId(s.id);
                      setCurrentPageIndex(0);
                    }
                  }}
                  disabled={!s.data}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeSectionId === s.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : s.data
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        : 'opacity-40 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {s.title.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Instruction Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3 text-sm text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-2">
          <span className="text-lg">✏️</span>
          <span>{renderHtml(currentPage?.instruction || sectionData?.instruction)}</span>
        </div>

        {/* Page Switcher Toolbar */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
            disabled={currentPageIndex === 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              currentPageIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200'
            }`}
          >
            <span>&larr;</span> <span>前ページ</span>
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[60%] sm:max-w-none">
            {pages.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPageIndex(idx)}
                className={`px-3 py-1 rounded text-xs font-bold transition ${
                  currentPageIndex === idx
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                P.{idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1))}
            disabled={currentPageIndex === pages.length - 1}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              currentPageIndex === pages.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200'
            }`}
          >
            <span>次ページ</span> <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* Main Questions Container */}
      <div className="w-full max-w-4xl space-y-4">
        {pageQuestions.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correct_answer;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border transition shadow-sm ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-rose-300 dark:border-rose-800/60 bg-rose-50/20 dark:bg-rose-950/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {q.questionNumber === '例' || String(q.id).includes('-ex') ? (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                    例
                  </span>
                ) : (
                  <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-black text-sm flex items-center justify-center shrink-0">
                    {q.questionNumber || (idx + 1)}
                  </span>
                )}
                <div className="text-base sm:text-lg font-bold leading-relaxed pt-0.5 grow">
                  {renderHtml(q.stem)}
                </div>
              </div>

              {/* Optional Question Illustration / Asset */}
              {q.image && (
                <div className="my-3 flex justify-center">
                  <img
                    src={q.image.startsWith('/') ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${q.image}` : q.image}
                    alt={`Question ${q.id} illustration`}
                    className="max-h-64 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm object-contain bg-white"
                  />
                </div>
              )}

              {/* Audio Player for Listening Comprehension questions */}
              {q.audioUrl && (
                <div className="my-3 p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    <span>🎧</span> <span>音声再生 (Audio)</span>
                  </span>
                  <audio
                    controls
                    preload="none"
                    src={q.audioUrl.startsWith('/') ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${q.audioUrl}` : q.audioUrl}
                    className="w-full h-9 rounded-lg"
                  />
                </div>
              )}

              {/* Dynamic options layout: 1 col for long sentence options (like Mondai 5), 2 or 4 cols for short vocabulary */}
              {(() => {
                const maxOptLen = Math.max(...q.options.map(o => (o || '').length));
                const gridClass = maxOptLen > 25 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-4';

                return (
                  <div className={`grid ${gridClass} gap-2.5 my-3`}>
                    {q.options.map((opt, oIdx) => {
                      const optNum = oIdx + 1;
                      let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:border-blue-400 hover:bg-blue-50/30';

                      if (isAnswered) {
                        if (optNum === q.correct_answer) {
                          btnStyle = 'border-emerald-500 bg-emerald-500 text-white font-black shadow-md';
                        } else if (optNum === selected) {
                          btnStyle = 'border-rose-500 bg-rose-500 text-white font-bold opacity-90 line-through';
                        } else {
                          btnStyle = 'border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          disabled={isAnswered}
                          className={`p-3 rounded-xl border-2 text-sm sm:text-base font-medium transition flex items-center gap-2.5 text-left ${maxOptLen > 25 ? 'justify-start' : 'justify-center'} ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-md bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0 text-xs font-black">
                            {optNum}
                          </span>
                          <span className="grow leading-relaxed">{renderHtml(opt)}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })()}

              {isAnswered && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`font-black px-2.5 py-1 rounded text-xs ${isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'}`}>
                      {isCorrect ? '正解 (Correct) ⭕' : '不正解 (Incorrect) ❌'}
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      正解: <span className="text-emerald-600 dark:text-emerald-400 font-black">{q.correct_answer}</span>
                    </span>
                  </div>

                  {/* Audio Script / Dialogue (For Listening Comprehension) */}
                  {q.script && q.script.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-1.5">
                      <div className="text-[11px] font-black uppercase text-indigo-700 dark:text-indigo-300 tracking-wider mb-1 flex items-center gap-1">
                        <span>📝</span> <span>スクリプト (Listening Script)</span>
                      </div>
                      {q.script.map((line, sIdx) => (
                        <div key={sIdx} className="leading-relaxed">
                          <span className="font-bold text-indigo-900 dark:text-indigo-200">{line.speaker}：</span>
                          <span className="text-slate-800 dark:text-slate-200">{renderHtml(line.text)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {isStarQuestion(q) && <StarExplanationCard question={q} />}
                  <div className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 grow">
                    {renderHtml(q.explanation)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {pageAnsweredCount > 0 && (
        <div className="fixed bottom-4 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4 text-xs sm:text-sm font-bold">
          <div>
            スコア: <span className="text-emerald-600 dark:text-emerald-400 font-black">{pageCorrectCount}</span> / {pageAnsweredCount} 問
          </div>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
          <div className="text-slate-500 dark:text-slate-400">
            ページ達成率: {Math.round((pageAnsweredCount / scoredPageQuestions.length) * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}
