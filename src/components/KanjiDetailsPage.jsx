import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './header_component.jsx';

export default function KanjiDetailsPage() {
  const { level, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { kanjis, globalIdx } = location.state || { kanjis: [], globalIdx: -1 };
  const kanji = kanjis[globalIdx];
  const [drawKey, setDrawKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [globalIdx]);

  if (!kanji) {
    return (
      <div className="bg-white min-h-screen text-black">
        <Header />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Kanji details not found. Please go back to the list.</p>
        </div>
      </div>
    );
  }

  const hasPrev = globalIdx > 0;
  const hasNext = globalIdx < kanjis.length - 1;

  const goPrev = () => {
    if (hasPrev) {
      navigate(`/levels/${level}/kanji-details/${encodeURIComponent(kanjis[globalIdx - 1].id)}`, {
        state: { kanjis, globalIdx: globalIdx - 1 }
      });
    }
  };

  const goNext = () => {
    if (hasNext) {
      navigate(`/levels/${level}/kanji-details/${encodeURIComponent(kanjis[globalIdx + 1].id)}`, {
        state: { kanjis, globalIdx: globalIdx + 1 }
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-black pb-12">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 transform transition-all relative overflow-hidden mb-8">
          <div className="p-6 md:p-10 text-center">
            
            <div className="inline-block bg-white shadow-md rounded-lg p-6 border border-gray-300 mb-8 min-w-[200px]">
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide text-gray-800">{kanji.kanji}</h1>
              <p className="mt-4 text-sm font-bold uppercase text-gray-500 tracking-widest">Kanji Details</p>
            </div>

            <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md">
              Meaning and Readings of {kanji.kanji}
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-6 hover:border-black transition-colors">
              <h3 className="text-xl font-bold mb-3 text-black">Meaning</h3>
              <p className="text-xl text-gray-600 font-medium">{kanji.meaning || '-'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:border-black transition-colors">
                <h3 className="text-lg font-bold mb-3 text-black">Onyomi</h3>
                <p className="text-xl text-gray-600 font-medium">{kanji.onyomi || '-'}</p>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:border-black transition-colors">
                <h3 className="text-lg font-bold mb-3 text-black">Kunyomi</h3>
                <p className="text-xl text-gray-600 font-medium">{kanji.kunyomi || '-'}</p>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-6 hover:border-black transition-colors">
              <h3 className="text-xl font-bold mb-3 text-black">Strokes</h3>
              <p className="text-xl text-gray-600 font-medium">{kanji.strokeCount || '-'}</p>
            </div>

            {kanji.kanjiDrawingSetupCode && (
              <>
                <div className="bg-black text-white rounded-lg px-6 py-3 flex justify-between items-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md mt-10">
                  <span>How to write {kanji.kanji}</span>
                  <button 
                    onClick={() => setDrawKey(k => k + 1)}
                    className="text-sm bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Replay Animation
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg shadow-sm bg-white hover:border-black transition-colors overflow-hidden">
                  <div 
                    key={drawKey}
                    className="mx-auto" 
                    dangerouslySetInnerHTML={{ __html: kanji.kanjiDrawingSetupCode }} 
                  />
                </div>
              </>
            )}

            {kanji.wordExamples && kanji.wordExamples.length > 0 && (
              <>
                <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md mt-10">
                  Word Examples using {kanji.kanji}
                </div>
                <div className="space-y-6">
                  {kanji.wordExamples.map((ex, i) => {
                    let jp, kana, romaji, eng;
                    if (typeof ex === 'string') {
                      const match = ex.match(/\[JPN\](.*)\[JPN_KANA\](.*)\[ROMAJI\](.*)\[ENG\](.*)/);
                      if (match) {
                        jp = match[1].trim();
                        kana = match[2].trim();
                        romaji = match[3].trim();
                        eng = match[4].trim();
                      } else {
                        return <p key={i} className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 last:border-0">{ex}</p>;
                      }
                    } else if (typeof ex === 'object') {
                      jp = ex.japanese?.trim();
                      kana = ex.hiragana?.trim();
                      romaji = ex.romaji?.trim();
                      eng = ex.english?.trim();
                    }
                    
                    return (
                      <div key={i} className="flex flex-col md:flex-row items-center md:items-start justify-between p-6 border border-gray-300 rounded-lg shadow-sm bg-gradient-to-r from-gray-100 to-white hover:border-black transition-colors w-full">
                        <div className="flex-grow min-w-0 text-center space-y-3 w-full">
                          {jp && <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">{jp}</p>}
                          {kana && kana !== jp && <p className="text-lg md:text-xl text-gray-600 italic leading-relaxed">{kana}</p>}
                          {romaji && <p className="text-md md:text-lg text-gray-500 font-mono break-words">{romaji}</p>}
                          {eng && <p className="text-lg md:text-xl text-black break-words font-bold">{eng}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {(kanji.exampleSentences?.length > 0 || kanji.sentenceExamples?.length > 0) && (
              <>
                <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md mt-10">
                  Example Sentences
                </div>
                <div className="space-y-6">
                  {(kanji.exampleSentences || kanji.sentenceExamples || []).map((ex, i) => {
                    let jp, kana, romaji, eng;
                    if (typeof ex === 'string') {
                      const match = ex.match(/\[JPN\](.*)\[JPN_KANA\](.*)\[ROMAJI\](.*)\[ENG\](.*)/);
                      if (match) {
                        jp = match[1].trim();
                        kana = match[2].trim();
                        romaji = match[3].trim();
                        eng = match[4].trim();
                      } else {
                        return <p key={i} className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-3 last:border-0">{ex}</p>;
                      }
                    } else if (typeof ex === 'object') {
                      jp = ex.japanese?.trim();
                      kana = ex.hiragana?.trim();
                      romaji = ex.romaji?.trim();
                      eng = ex.english?.trim();
                    }

                    return (
                      <div key={i} className="flex flex-col md:flex-row items-center md:items-start justify-between p-6 border border-gray-300 rounded-lg shadow-sm bg-gradient-to-r from-gray-100 to-white hover:border-black transition-colors w-full">
                        <div className="flex-grow min-w-0 text-center space-y-3 w-full">
                          {jp && <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">{jp}</p>}
                          {kana && kana !== jp && <p className="text-lg md:text-xl text-gray-600 italic leading-relaxed">{kana}</p>}
                          {romaji && <p className="text-md md:text-lg text-gray-500 font-mono break-words">{romaji}</p>}
                          {eng && <p className="text-lg md:text-xl text-black break-words font-bold">{eng}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Previous / Next Navigation */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <button 
            onClick={goPrev}
            disabled={!hasPrev}
            className="px-6 py-3 border border-black rounded-md bg-white text-black font-bold hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &larr; Previous Kanji
          </button>
          <button 
            onClick={() => navigate(`/levels/${level}/kanji-list`)}
            className="px-6 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
          >
            Back to List
          </button>
          <button 
            onClick={goNext}
            disabled={!hasNext}
            className="px-6 py-3 border border-black rounded-md bg-white text-black font-bold hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Kanji &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
