// src/components/N4PracticeSetDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import '../assets/n4_practice_sets.css';

const N4PracticeSetDetailsPage = () => {
  const { setId } = useParams();
  const [currentSet, setCurrentSet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, 'books', 'chokuzen-taisaku-n4');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const bookData = docSnap.data();
          const set = bookData.sets?.find(s => s.id === setId);
          setCurrentSet(set);
        } else {
          console.error("Book document 'chokuzen-taisaku-n4' not found in Firestore.");
        }
      } catch (err) {
        console.error('Error fetching set from Firestore:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [setId]);

  if (loading) {
    return (
      <div className="n4-details-container flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium n4-text-sub">Loading practice set details...</p>
        </div>
      </div>
    );
  }

  if (!currentSet) {
    return (
      <div className="n4-details-container py-12 text-center">
        <h2 className="text-xl font-bold mb-2 n4-text-main">Practice Set Not Found</h2>
        <p className="text-sm n4-text-sub mb-6">The requested test could not be loaded.</p>
        <Link to="/chokuzen-taisaku-n4" className="n4-btn-primary px-6 py-2.5 text-sm">
          &larr; Return to Test Directory
        </Link>
      </div>
    );
  }

  const setNum = currentSet.setNumber || setId.replace('n4-test-', '');
  const totalQ = currentSet.totalQuestions || 60;
  const vocabQCount = currentSet.questions?.filter(q => q.sectionType === 'vocabulary-kanji')?.length || 34;
  const grammarQCount = currentSet.questions?.filter(q => q.sectionType === 'grammar')?.length || 26;

  return (
    <div className="n4-details-container">
      {/* Breadcrumb Navigation */}
      <nav className="n4-details-nav">
        <Link to="/levels">Levels</Link>
        <span className="separator">/</span>
        <Link to="/chokuzen-taisaku-n4">直前対策 N4</Link>
        <span className="separator">/</span>
        <span className="current">第{setNum}回 ({currentSet.title})</span>
      </nav>

      {/* Set Header Hero */}
      <div className="n4-hero-shell py-8 px-7 mb-8">
        <div className="n4-hero-ambient-glow" />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="n4-pill-level">JLPT N4</span>
            <h1 className="text-2xl sm:text-3xl font-black n4-text-main">
              第{setNum}回 模擬試験 ({currentSet.title})
            </h1>
          </div>
          <span className="n4-card-q-badge text-sm px-4 py-1.5">
            {totalQ} Questions Total
          </span>
        </div>
        <p className="text-sm max-w-3xl leading-relaxed n4-text-sub">
          Select a targeted section below to practice specific question types, or take the full {totalQ}-question mock exam to test your overall endurance and time management.
        </p>
      </div>

      {/* Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Section 1: Vocabulary & Kanji */}
        <div className="n4-modern-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-lg font-serif">
                語
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border n4-badge-target">
                30 min target
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 n4-text-main">言語知識（文字・語彙）</h3>
            <p className="text-sm mb-4 leading-relaxed n4-text-sub">
              Covers 5 official question types: 漢字読み, 表記, 文脈規定, 言い換え類義, and 用法.
            </p>
            <div className="text-xs space-y-2 mb-6 p-4 rounded-xl border n4-breakdown-card">
              <div className="flex items-center justify-between">
                <span className="n4-text-sub">問題1: 漢字の読み方</span>
                <span className="font-extrabold n4-text-primary">9 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="n4-text-sub">問題2: 漢字の書き方 (表記)</span>
                <span className="font-extrabold n4-text-primary">6 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="n4-text-sub">問題3: 文脈規定</span>
                <span className="font-extrabold n4-text-primary">9 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="n4-text-sub">問題4: 言い換え類義</span>
                <span className="font-extrabold n4-text-primary">5 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="n4-text-sub">問題5: 正しい言葉の用法</span>
                <span className="font-extrabold n4-text-primary">5 問</span>
              </div>
            </div>
          </div>
          <Link
            to={`/chokuzen-taisaku-n4/${currentSet.id}/vocabulary-kanji`}
            className="n4-card-btn flex items-center justify-center gap-2"
          >
            <span>Start Vocabulary & Kanji ({vocabQCount} questions)</span>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Section 2: Grammar & Reading */}
        <div className="n4-modern-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-lg font-serif">
                読
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border n4-badge-target">
                35 min target
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 n4-text-main">文法・読解</h3>
            <p className="text-sm mb-4 leading-relaxed n4-text-sub">
              Covers 3 official grammar sections: 文法形式の判断, 文の組み立て ★整序, and 文章の文法 読解形式.
            </p>
            <div className="text-xs space-y-2 mb-6 p-4 rounded-xl border n4-breakdown-card">
              <div className="flex items-center justify-between">
                <span className="n4-text-sub">問題1: 文法形式の判断</span>
                <span className="font-extrabold n4-text-primary">15 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="n4-text-sub">問題2: 文の組み立て ★整序</span>
                <span className="font-extrabold n4-text-primary">5 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="n4-text-sub">問題3: 文章の文法 読解形式</span>
                <span className="font-extrabold n4-text-primary">5 問</span>
              </div>
            </div>
          </div>
          <Link
            to={`/chokuzen-taisaku-n4/${currentSet.id}/grammar`}
            className="n4-card-btn flex items-center justify-center gap-2"
          >
            <span>Start Grammar & Reading ({grammarQCount} questions)</span>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Full Mock Test Option */}
      <div className="rounded-3xl p-8 text-center shadow-xl backdrop-blur-xl n4-full-exam-banner">
        <h3 className="text-xl font-bold mb-2 n4-text-main">
          Full Mock Exam (完全模擬テスト)
        </h3>
        <p className="text-sm max-w-xl mx-auto mb-6 n4-text-sub">
          Experience the authentic exam environment with all {totalQ} questions back-to-back under standard JLPT timing conditions.
        </p>
        <Link
          to={`/chokuzen-taisaku-n4/${currentSet.id}/full`}
          className="n4-btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base"
        >
          <span>Take Full Exam ({totalQ} Questions)</span>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default N4PracticeSetDetailsPage;
