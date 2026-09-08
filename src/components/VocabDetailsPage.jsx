import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

export default function VocabDetailsPage() {
  const { level, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { words, globalIdx } = location.state || { words: [], globalIdx: -1 };
  const word = words[globalIdx];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [globalIdx]);

  if (!word) {
    return (
      <div className="bg-white min-h-screen text-black">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Vocabulary details not found. Please go back to the list.</p>
        </div>
      </div>
    );
  }

  const hasPrev = globalIdx > 0;
  const hasNext = globalIdx < words.length - 1;

  const goPrev = () => {
    if (hasPrev) {
      navigate(`/levels/${level}/vocab-details/${encodeURIComponent(words[globalIdx - 1].id)}`, {
        state: { words, globalIdx: globalIdx - 1 }
      });
    }
  };

  const goNext = () => {
    if (hasNext) {
      navigate(`/levels/${level}/vocab-details/${encodeURIComponent(words[globalIdx + 1].id)}`, {
        state: { words, globalIdx: globalIdx + 1 }
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-black pb-12">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link to={`/levels/${level}/vocabulary-list`} className="text-sm font-semibold text-blue-500 hover:underline mb-4 inline-block">
          &larr; Back to Vocabulary List
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 transform transition-all relative overflow-hidden mb-8">
          <div className="p-6 md:p-10 text-center">
            
            <div className="inline-block bg-white shadow-md rounded-lg p-6 border border-gray-300 mb-8 min-w-[200px]">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide text-gray-800">{word.japanese}</h1>
              <p className="mt-4 text-sm font-bold uppercase text-gray-500 tracking-widest">JLPT {level.toUpperCase()} Vocabulary</p>
            </div>

            <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md">
              Meaning and Pronunciation of {word.japanese}
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-6 hover:border-black transition-colors">
              <h3 className="text-xl font-bold mb-3 text-black">Meaning</h3>
              <p className="text-xl text-gray-600 font-medium">{word.english || '-'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:border-black transition-colors">
                <h3 className="text-lg font-bold mb-3 text-black">Hiragana</h3>
                <p className="text-xl text-gray-600 font-medium">{word.hiragana || '-'}</p>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:border-black transition-colors">
                <h3 className="text-lg font-bold mb-3 text-black">Romaji</h3>
                <p className="text-xl text-gray-600 font-medium">{word.romaji || '-'}</p>
              </div>
            </div>

            {word.examples && word.examples.length > 0 && (
              <>
                <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md mt-10">
                  Examples using {word.japanese}
                </div>
                <div className="space-y-6">
                  {word.examples.map((ex, i) => (
                    <div key={i} className="flex flex-col md:flex-row items-center md:items-start justify-between p-6 border border-gray-300 rounded-lg shadow-sm bg-gradient-to-r from-gray-100 to-white hover:border-black transition-colors">
                      <div className="flex-grow min-w-0 text-center space-y-3 w-full">
                        <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">{ex.japanese}</p>
                        {ex.hiragana && ex.hiragana !== ex.japanese && <p className="text-lg md:text-xl text-gray-600 italic leading-relaxed">{ex.hiragana}</p>}
                        {ex.romaji && <p className="text-md md:text-lg text-gray-500 font-mono break-words">{ex.romaji}</p>}
                        <p className="text-lg md:text-xl text-black break-words font-bold">{ex.english}</p>
                      </div>
                    </div>
                  ))}
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
            &larr; Previous Word
          </button>
          <button 
            onClick={() => navigate(`/levels/${level}/vocabulary-list`)}
            className="px-6 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
          >
            Back to List
          </button>
          <button 
            onClick={goNext}
            disabled={!hasNext}
            className="px-6 py-3 border border-black rounded-md bg-white text-black font-bold hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Word &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
