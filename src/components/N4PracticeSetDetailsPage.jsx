import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import LoadingSpinner from '../utils/loading_spinner.jsx';
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
          const set = bookData.sets.find(s => s.id === setId);
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

  if (loading) return <LoadingSpinner />;

  if (!currentSet) {
    return (
      <div className="n4-practice-container text-center py-20 text-white">
        <h2 className="text-2xl font-bold mb-4">Set Not Found</h2>
        <p className="text-slate-400 mb-6">Could not find {setId} in the database.</p>
        <Link to="/chokuzen-taisaku-n4" className="n4-card-btn inline-block max-w-xs">
          &larr; Back to Sets List
        </Link>
      </div>
    );
  }

  const vocabQCount = currentSet.sections?.['vocabulary-kanji']?.questions?.length || 0;
  const grammarQCount = currentSet.sections?.['grammar-reading']?.questions?.length || 0;
  const totalQ = vocabQCount + grammarQCount;
  const setNum = parseInt(currentSet.id?.replace(/\D/g, '')) || 1;

  return (
    <div className="n4-practice-container">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="n4-breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/books">Books</Link>
        <span className="separator">/</span>
        <Link to="/chokuzen-taisaku-n4">直前対策 N4</Link>
        <span className="separator">/</span>
        <span className="current">第{setNum}回 ({currentSet.title})</span>
      </nav>

      {/* Set Header Hero */}
      <div className="n4-hero-shell" style={{ padding: '32px 28px', marginBottom: '32px' }}>
        <div className="n4-hero-ambient-glow" />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="n4-pill-level">JLPT N4</span>
            <h1 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--n4-text-main)' }}>
              第{setNum}回 模擬試験 ({currentSet.title})
            </h1>
          </div>
          <span className="n4-card-q-badge text-sm px-4 py-1.5">
            {totalQ} Questions Total
          </span>
        </div>
        <p className="text-sm max-w-3xl leading-relaxed" style={{ color: 'var(--n4-text-sub)' }}>
          Select a targeted section below to practice specific question types, or take the full {totalQ}-question mock exam to test your overall endurance and time management.
        </p>
      </div>

      {/* Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Section 1: Vocabulary & Kanji */}
        <div className="n4-modern-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl">🈸</span>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: 'var(--n4-primary)',
                  borderColor: 'rgba(16, 185, 129, 0.3)'
                }}
              >
                ⏱️ 30 Min Target
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--n4-text-main)' }}>言語知識（文字・語彙）</h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--n4-text-sub)' }}>
              Covers 5 official question types: 漢字読み, 表記, 文脈規定, 言い換え類義, and 用法.
            </p>
            <div
              className="text-xs space-y-2 mb-6 p-4 rounded-xl border"
              style={{
                background: 'var(--n4-card-row-bg)',
                borderColor: 'var(--n4-card-row-border)',
                color: 'var(--n4-text-main)'
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--n4-text-sub)' }}>• 問題1: 漢字の読み方</span>
                <span className="font-extrabold" style={{ color: 'var(--n4-primary)' }}>9 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--n4-text-sub)' }}>• 問題2: 漢字の書き方 (表記)</span>
                <span className="font-extrabold" style={{ color: 'var(--n4-primary)' }}>6 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--n4-text-sub)' }}>• 問題3: 文脈規定</span>
                <span className="font-extrabold" style={{ color: 'var(--n4-primary)' }}>9 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--n4-text-sub)' }}>• 問題4: 言い換え類義</span>
                <span className="font-extrabold" style={{ color: 'var(--n4-primary)' }}>5 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--n4-text-sub)' }}>• 問題5: 正しい言葉の用法</span>
                <span className="font-extrabold" style={{ color: 'var(--n4-primary)' }}>5 問</span>
              </div>
            </div>
          </div>
          <Link
            to={`/chokuzen-taisaku-n4/${currentSet.id}/vocabulary-kanji`}
            className="n4-card-btn"
          >
            Start Vocabulary & Kanji ({vocabQCount} Qs) &rarr;
          </Link>
        </div>

        {/* Section 2: Grammar & Reading */}
        <div className="n4-modern-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl">⛩️</span>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: 'var(--n4-primary)',
                  borderColor: 'rgba(16, 185, 129, 0.3)'
                }}
              >
                ⏱️ 35 Min Target
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--n4-text-main)' }}>文法・読解</h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--n4-text-sub)' }}>
              Covers 3 official grammar sections: 文法形式の判断, 文の組み立て ★整序, and 文章の文法 読解形式.
            </p>
            <div
              className="text-xs space-y-2 mb-6 p-4 rounded-xl border"
              style={{
                background: 'var(--n4-card-row-bg)',
                borderColor: 'var(--n4-card-row-border)',
                color: 'var(--n4-text-main)'
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--n4-text-sub)' }}>• 問題1: 文法形式の判断</span>
                <span className="font-extrabold" style={{ color: 'var(--n4-primary)' }}>15 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--n4-text-sub)' }}>• 問題2: 文の組み立て ★整序</span>
                <span className="font-extrabold" style={{ color: 'var(--n4-primary)' }}>5 問</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--n4-text-sub)' }}>• 問題3: 文章の文法 読解形式</span>
                <span className="font-extrabold" style={{ color: 'var(--n4-primary)' }}>5 問</span>
              </div>
            </div>
          </div>
          <Link
            to={`/chokuzen-taisaku-n4/${currentSet.id}/grammar`}
            className="n4-card-btn"
          >
            Start Grammar & Reading ({grammarQCount} Qs) &rarr;
          </Link>
        </div>
      </div>

      {/* Full Mock Test Option */}
      <div
        className="rounded-3xl p-8 text-center shadow-xl backdrop-blur-xl"
        style={{
          background: 'var(--n4-hero-bg)',
          border: '1.5px solid var(--n4-box-white-border)'
        }}
      >
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--n4-text-main)' }}>
          🏆 Full Mock Exam (完全模擬テスト)
        </h3>
        <p className="text-sm max-w-xl mx-auto mb-6" style={{ color: 'var(--n4-text-sub)' }}>
          Experience the real test environment with all {totalQ} questions back-to-back under standard JLPT timing conditions.
        </p>
        <Link
          to={`/chokuzen-taisaku-n4/${currentSet.id}/full`}
          className="n4-btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base"
        >
          <span>Take Full Exam ({totalQ} Questions)</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default N4PracticeSetDetailsPage;
