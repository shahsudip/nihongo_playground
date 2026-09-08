import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Pagination from './Pagination.jsx';

export default function GrammarListPage() {
  const { level } = useParams();
  const displayLevel = level ? level.toUpperCase() : 'N5';
  
  const [grammars, setGrammars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedGrammar, setSelectedGrammar] = useState(null);
  
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchGrammars = async () => {
      try {
        const q = query(
          collection(db, 'JLPT-matome', displayLevel, 'grammarlist'),
          orderBy('orderIndex', 'asc')
        ); 
        const snapshot = await getDocs(q);
        const fetched = [];
        snapshot.forEach(doc => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        
        if (fetched.length > 0) {
          setGrammars(fetched);
        } else {
            setErrorMsg(`No grammar list found in database for ${displayLevel}.`);
        }
      } catch (error) {
        console.error("Error fetching grammar: ", error);
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGrammars();
  }, [displayLevel]);

  const totalPages = Math.ceil(grammars.length / ITEMS_PER_PAGE);
  const currentGrammars = grammars.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]"><p className="text-xl">Loading Grammar List...</p></div>;
  }

  return (
    <div className="bg-[var(--color-bg-primary)] min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        
        <div className="flex flex-col justify-center items-center text-center mb-8">
        <h1 className="text-[50px] md:text-[80px] font-extrabold uppercase leading-none" style={{ color: 'rgb(255, 161, 208)', textShadow: 'white -2px -2px 0px, white 2px -2px 0px, white -2px 2px 0px, white 2px 2px 0px' }}>
          {displayLevel}
        </h1>
        <p className="text-[var(--color-text-primary)] font-extrabold italic uppercase text-xl md:text-2xl mt-0">
          Grammar List
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          <strong>Error: </strong> {errorMsg}
        </div>
      )}

      {grammars.length === 0 && !errorMsg && !loading && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center">
          <strong>No Grammar Found.</strong>
        </div>
      )}

      <div className="bg-white border border-black p-6 rounded-md shadow-md max-w-4xl mx-auto">
        <div id="top" className="p-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-black">JLPT {displayLevel} Grammar List</h1>
          
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>

        <div id="grammar-list">
          <div>
            {currentGrammars.map((grammar, idx) => (
              <div key={idx} onClick={() => navigate(`/levels/${displayLevel}/grammar-details/${encodeURIComponent(grammar.id)}`, { state: { grammars, globalIdx: (page - 1) * ITEMS_PER_PAGE + idx } })} className="cursor-pointer p-6 bg-white rounded-lg shadow-md border border-gray-300 hover:border-black transition-colors duration-200 mb-4">
                <h2 className="text-xl font-semibold text-black">{grammar.title} {grammar.meaning ? `(${grammar.meaning})` : ''}</h2>
                <p className="mt-2 text-gray-600">{grammar.definition || ''}</p>
                {grammar.how_to_use && <p className="mt-2 text-sm text-gray-500 italic">Formation: {grammar.how_to_use}</p>}
                
                <div className="mt-6 flex justify-center">
                  <div className="relative flex items-center justify-center border border-black rounded-md bg-white w-32 h-10 text-sm hover:bg-gray-200 transition-colors duration-200">
                    <div className="absolute inset-1 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgb(255, 161, 208)' }}>
                      <span className="font-bold text-black">Read more</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
      </div>
    </div>
  );
}
