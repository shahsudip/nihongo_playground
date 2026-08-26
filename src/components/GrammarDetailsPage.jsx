import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Header from './header_component.jsx';

export default function GrammarDetailsPage() {
  const { level, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { grammars, globalIdx } = location.state || { grammars: [], globalIdx: -1 };
  const [grammar, setGrammar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGrammar = async () => {
      if (grammars && grammars.length > 0 && globalIdx >= 0 && grammars[globalIdx]) {
        setGrammar(grammars[globalIdx]);
        setLoading(false);
      } else if (id && level) {
        try {
          const docRef = doc(db, 'JLPT-matome', level.toUpperCase(), 'grammarlist', decodeURIComponent(id));
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setGrammar({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (err) {
          console.error("Error fetching grammar:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchGrammar();
  }, [globalIdx, id, level, grammars]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen text-black flex justify-center items-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!grammar) {
    return (
      <div className="bg-white min-h-screen text-black">
        <Header />
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Grammar details not found. Please go back to the list.</p>
        </div>
      </div>
    );
  }

  const hasPrev = globalIdx > 0;
  const hasNext = globalIdx < grammars.length - 1;

  const goPrev = () => {
    if (hasPrev) {
      navigate(`/levels/${level}/grammar-details/${encodeURIComponent(grammars[globalIdx - 1].id)}`, {
        state: { grammars, globalIdx: globalIdx - 1 }
      });
    }
  };

  const goNext = () => {
    if (hasNext) {
      navigate(`/levels/${level}/grammar-details/${encodeURIComponent(grammars[globalIdx + 1].id)}`, {
        state: { grammars, globalIdx: globalIdx + 1 }
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
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide text-gray-800">{grammar.title}</h1>
              <p className="mt-4 text-sm font-bold uppercase text-gray-500 tracking-widest">Grammar Details</p>
            </div>

            <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md">
              Meaning
            </div>
            <p className="text-xl md:text-2xl mt-4 mb-6 text-gray-800 font-medium leading-relaxed">{grammar.meaning || '-'}</p>

            <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md">
              Definition
            </div>
            <p className="text-xl mt-4 mb-6 text-gray-800 leading-relaxed">{grammar.definition || 'Used to indicate specific grammatical expression.'}</p>

            <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md">
              How to use
            </div>
            <p className="text-xl mt-4 mb-6 text-gray-800 leading-relaxed">{grammar.how_to_use || 'Noun/Adjective/Verb + specific ending.'}</p>

            {grammar.table && grammar.table.length > 0 && (
              <div className="overflow-hidden rounded-lg border border-gray-300 mx-auto w-full max-w-xl mb-10 shadow-sm">
                <table className="w-full border-collapse table-auto text-center text-lg bg-white">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="px-4 py-3 font-bold text-gray-800">Common Usage</th>
                      <th className="px-4 py-3 font-bold text-gray-800 border-l border-gray-300">Formal Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grammar.table.map((row, i) => (
                      <tr key={i} className="border-b border-gray-300 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-800">{row.common || '-'}</td>
                        <td className="px-4 py-3 text-gray-800 border-l border-gray-300">{row.formal || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mt-10 mb-6 tracking-wide shadow-md">
              Context, limitations and specificities
            </div>
            
            <div className="text-left bg-white p-6 md:p-8 rounded-lg border border-gray-300 shadow-sm space-y-6">
              <div>
                <div className="inline-block border-2 border-black bg-white text-black font-bold rounded-full px-4 py-1 mb-3">
                  When to use?
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{grammar.when_to_use || 'Typically used in written and spoken forms.'}</p>
              </div>
              
              {grammar.limitations && grammar.limitations.length > 0 && (
                <div>
                  <div className="inline-block border-2 border-black bg-white text-black font-bold rounded-full px-4 py-1 mb-3">
                    Limitations and specificities
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg ml-2">
                    {grammar.limitations.map((lim, i) => (
                      <li key={i} className="leading-relaxed">{lim}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <div className="inline-block border-2 border-black bg-white text-black font-bold rounded-full px-4 py-1 mb-3">
                  Is it used often?
                </div>
                <div className="flex flex-col items-center bg-gray-50 border border-gray-300 rounded-lg px-6 py-4 max-w-xs mt-2">
                  <span className="text-sm font-bold uppercase mb-3 text-gray-800">Usage Frequency</span>
                  <div className="flex items-center mb-2 space-x-1">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 uppercase text-center font-bold">Very Frequent</span>
                </div>
              </div>
            </div>

            {grammar.examples && grammar.examples.length > 0 && (
              <>
                <div className="bg-black text-white rounded-lg px-4 py-3 text-center uppercase text-lg font-bold mb-6 tracking-wide shadow-md mt-10">
                  Examples using {grammar.title}
                </div>
                <div className="space-y-6">
                  {grammar.examples.map((ex, i) => (
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
            &larr; Previous Grammar
          </button>
          <button 
            onClick={() => navigate(`/levels/${level}/grammar-list`)}
            className="px-6 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
          >
            Back to List
          </button>
          <button 
            onClick={goNext}
            disabled={!hasNext}
            className="px-6 py-3 border border-black rounded-md bg-white text-black font-bold hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Grammar &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
