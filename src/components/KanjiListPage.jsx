import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import Pagination from './Pagination.jsx';

export default function KanjiListPage() {
  const { level } = useParams();
  const displayLevel = level ? level.toUpperCase() : 'N5';
  const navigate = useNavigate();
  
  const [kanjis, setKanjis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  
  const ITEMS_PER_PAGE = 50;

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchKanjis = async () => {
      try {
        console.log(`Fetching from JLPT-matome/${displayLevel}/kanjilist`);
        const q = query(collection(db, 'JLPT-matome', displayLevel, 'kanjilist'), orderBy('orderIndex', 'asc')); 
        const snapshot = await getDocs(q);
        const fetched = [];
        snapshot.forEach(doc => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        console.log(`Fetched ${fetched.length} kanji`);
        setKanjis(fetched);
      } catch (error) {
        console.error("Error fetching kanjis: ", error);
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchKanjis();
  }, [displayLevel]);

  const totalPages = Math.ceil(kanjis.length / ITEMS_PER_PAGE);
  const currentKanjis = kanjis.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDrillTest = () => {
    if (!currentKanjis || currentKanjis.length === 0) return;

    const storageKey = `drilled_kanji_${displayLevel}_page_${page}`;
    let drilled = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    let availableKanjis = currentKanjis.filter(k => !drilled.includes(k.id));
    
    if (availableKanjis.length < 5) {
      alert("You've completed all Kanji on this page! Resetting progress to start over.");
      drilled = [];
      availableKanjis = [...currentKanjis];
    }

    // Pick 5 random
    const shuffled = [...availableKanjis].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    // Save to local storage
    const newDrilled = [...drilled, ...selected.map(k => k.id)];
    localStorage.setItem(storageKey, JSON.stringify(newDrilled));

    // Navigate to new quiz screen
    navigate(`/kanji-drill/${displayLevel}`, { state: { selectedKanjis: selected, allKanjis: currentKanjis } });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading Kanji List...</p></div>;
  }

  return (
    <div className="bg-[var(--color-bg-primary)] min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        
        <div className="flex flex-col justify-center items-center text-center mb-8">
        <h1 className="text-[50px] md:text-[80px] font-extrabold uppercase leading-none" style={{ color: 'rgb(255, 161, 208)', textShadow: 'white -2px -2px 0px, white 2px -2px 0px, white -2px 2px 0px, white 2px 2px 0px' }}>
          {displayLevel}
        </h1>
        <p className="text-[#3A3A3A] font-extrabold italic uppercase text-xl md:text-2xl mt-0">
          Kanji List
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          <strong>Error: </strong> {errorMsg}
        </div>
      )}

      {kanjis.length === 0 && !errorMsg && !loading && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center">
          <strong>No Kanji Found.</strong> Database returned 0 items for JLPT-matome/{displayLevel}/kanjilist.
        </div>
      )}

      <div className="bg-white border border-black p-6 rounded-md shadow-md max-w-6xl mx-auto">
        <div id="top" className="p-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-black">JLPT {displayLevel} Kanji List</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0 mb-8">
            <button 
              onClick={handleDrillTest}
              className="px-6 py-2 bg-[var(--color-accent)] text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transition-all flex items-center"
            >
              <span className="mr-2">✏️</span> Take Drill Test
            </button>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentKanjis.map((kanji, idx) => (
            <div key={idx} onClick={() => navigate(`/levels/${displayLevel}/kanji-details/${encodeURIComponent(kanji.id)}`, { state: { kanjis, globalIdx: (page - 1) * ITEMS_PER_PAGE + idx } })} className="cursor-pointer p-4 bg-white rounded-lg shadow-md border border-gray-300 hover:border-black transition-colors duration-200 flex flex-col justify-between h-full group">
              <div className="text-center">
                <p className="text-6xl font-bold text-gray-800 mb-4 mt-2 truncate px-2">{kanji.kanji}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md shadow-sm text-center space-y-1 mb-4 flex-grow flex flex-col justify-center">
                <p className="text-sm text-gray-600 font-bold truncate">{kanji.meaning || '-'}</p>
                <p className="text-sm text-gray-500 italic truncate">{kanji.onyomi || kanji.kunyomi || '-'}</p>
              </div>
              <div className="flex justify-center mt-auto pt-2">
                <div className="relative flex items-center justify-center border border-black rounded-md bg-white w-32 h-10 text-sm hover:bg-gray-200 transition-colors duration-200">
                  <div className="absolute inset-1 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgb(255, 161, 208)' }}>
                    <span className="font-bold text-black">More details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Pagination */}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
      </div>
    </div>
  );
}
