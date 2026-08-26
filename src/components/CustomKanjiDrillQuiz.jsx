import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './header_component.jsx';

export default function CustomKanjiDrillQuiz() {
  const { level } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedKanjis, allKanjis } = location.state || { selectedKanjis: [], allKanjis: [] };
  
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    if (!selectedKanjis || selectedKanjis.length === 0) {
      navigate(`/levels/${level}/kanji-list`);
      return;
    }

    const allMeanings = [];
    allKanjis.forEach(k => {
      if (k.wordExamples && Array.isArray(k.wordExamples)) {
        k.wordExamples.forEach(wordObj => {
          if (typeof wordObj === 'string') {
            const match = wordObj.match(/\[JPN\]\s*(.*?)\s*\[JPN_KANA\]\s*(.*?)\s*\[ROMAJI\]\s*(.*?)\s*\[ENG\]\s*(.*)/);
            if (match && match[4]) {
              allMeanings.push(match[4].trim());
            }
          } else if (typeof wordObj === 'object' && wordObj.english) {
            allMeanings.push(wordObj.english.trim());
          }
        });
      }
    });

    let generatedQuestions = [];
    selectedKanjis.forEach(k => {
      if (k.wordExamples && Array.isArray(k.wordExamples)) {
        k.wordExamples.forEach(wordObj => {
          let kanjiWord = null;
          let kana = null;
          let meaning = null;

          if (typeof wordObj === 'string') {
            const match = wordObj.match(/\[JPN\]\s*(.*?)\s*\[JPN_KANA\]\s*(.*?)\s*\[ROMAJI\]\s*(.*?)\s*\[ENG\]\s*(.*)/);
            if (match && match[1] && match[4]) {
              kanjiWord = match[1].trim();
              kana = match[2].trim();
              meaning = match[4].trim();
            }
          } else if (typeof wordObj === 'object' && wordObj.japanese && wordObj.english) {
             kanjiWord = wordObj.japanese.trim();
             kana = wordObj.hiragana ? wordObj.hiragana.trim() : '';
             meaning = wordObj.english.trim();
          }
          
          if (kanjiWord && meaning) {
            let options = [meaning];
            const distractorPool = allMeanings.filter(m => m !== meaning);
            
            for(let i=0; i<3; i++) {
               if(distractorPool.length > 0) {
                 const randIdx = Math.floor(Math.random() * distractorPool.length);
                 options.push(distractorPool[randIdx]);
                 distractorPool.splice(randIdx, 1);
               } else {
                 options.push("Random Option " + i);
               }
            }
            options.sort(() => 0.5 - Math.random());
            
            generatedQuestions.push({
              kanjiWord,
              kana,
              correct: meaning,
              options
            });
          }
        });
      }
    });

    generatedQuestions.sort(() => 0.5 - Math.random());
    setQuestions(generatedQuestions);

  }, [selectedKanjis, allKanjis, level, navigate]);

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(option);
    
    if (option === questions[currentIdx].correct) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(i => i + 1);
        setIsAnswered(false);
        setSelectedOption(null);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  if (!questions || questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F6F4EE]"><p>Loading Quiz...</p></div>;
  }

  const currentQ = questions[currentIdx];
  const letters = ['A', 'B', 'C', 'D'];

  const inkBoxStyle = {
    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)'
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col" style={{ backgroundColor: '#F6F4EE', fontFamily: '"Noto Serif JP", "Times New Roman", serif' }}>
      <Header />
      
      {/* Background Decals (Bamboo & Ink splatters) */}
      <div className="absolute top-20 left-0 w-full h-full pointer-events-none opacity-40 z-0">
        <svg viewBox="0 0 200 200" className="absolute top-10 -left-10 w-64 h-64 text-[#4a5942]" fill="currentColor">
          <path d="M30 180 Q 40 100, 20 20 Q 30 10, 45 20 Q 60 100, 45 180 Z" opacity="0.8"/>
          <path d="M40 120 Q 80 80, 120 60 Q 90 100, 50 140 Z" opacity="0.9"/>
          <path d="M35 150 Q 80 130, 130 140 Q 90 160, 40 170 Z" opacity="0.7"/>
          <path d="M45 70 Q 90 40, 140 30 Q 100 60, 55 90 Z" opacity="0.9"/>
        </svg>
        <svg viewBox="0 0 200 200" className="absolute bottom-10 -right-10 w-72 h-72 text-[#4a5942]" fill="currentColor">
          <path d="M170 20 Q 160 100, 180 180 Q 170 190, 155 180 Q 140 100, 155 20 Z" opacity="0.8"/>
          <path d="M160 80 Q 120 120, 80 140 Q 110 100, 150 60 Z" opacity="0.9"/>
          <path d="M165 50 Q 120 70, 70 60 Q 110 40, 160 30 Z" opacity="0.7"/>
        </svg>
      </div>

      <div className="relative z-10 flex-grow max-w-3xl w-full mx-auto px-6 py-8 flex flex-col pt-12">
        {quizComplete ? (
          <div className="bg-white border-4 border-[#1e2f23] p-12 text-center relative mt-20 shadow-sm" style={inkBoxStyle}>
            <h1 className="text-4xl font-bold mb-6 font-sans">Quiz Complete!</h1>
            <p className="text-2xl mb-8">Score: {score} / {questions.length}</p>
            <button onClick={() => navigate(`/levels/${level}/kanji-list`)} className="px-8 py-3 bg-[#1e2f23] text-white font-bold text-lg hover:bg-[#142018] transition-colors" style={inkBoxStyle}>
              Return to Kanji List
            </button>
          </div>
        ) : (
          <>
            {/* Header Area */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-20 h-20 bg-[#1e2f23] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg" style={{border: '4px solid #F6F4EE'}}>
                Q.
              </div>
              <div className="w-16 h-10 bg-white border border-gray-400 flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 bg-[#bc002d] rounded-full"></div>
              </div>
            </div>

            <div className="flex justify-center mb-2">
              <div className="bg-[#1e2f23] text-white px-8 py-2 relative shadow-sm" style={{ clipPath: 'polygon(2% 0, 98% 2%, 100% 100%, 0 98%)' }}>
                <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase font-sans">Kanji Reading Quiz</h1>
              </div>
            </div>

            <p className="text-center text-gray-800 text-md md:text-lg mb-8 font-medium font-sans">How do you read this word?</p>

            {/* Kanji Card */}
            <div className="bg-white border-[3px] border-[#222] py-20 text-center mb-12 shadow-sm relative flex flex-col justify-center items-center" style={inkBoxStyle}>
              <span className="text-8xl md:text-[140px] font-bold text-black" style={{fontFamily: '"Noto Serif JP", serif', lineHeight: '1.2'}}>{currentQ.kanjiWord}</span>
              {isAnswered && (
                 <div className="absolute bottom-4 right-6 text-2xl md:text-4xl text-[#bc002d] font-bold fade-in">{currentQ.kana}</div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 px-2 md:px-8">
              {currentQ.options.map((opt, i) => {
                let boxClass = "relative flex items-center bg-white border-[2px] border-[#333] py-4 px-6 cursor-pointer hover:bg-gray-100 transition-colors w-full shadow-sm";
                let badgeClass = "absolute -left-6 md:-left-8 w-14 h-14 bg-[#1e2f23] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md";
                
                if (isAnswered) {
                  if (opt === currentQ.correct) {
                    boxClass = "relative flex items-center bg-[#f0f8f1] border-[3px] border-[#1e2f23] py-4 px-6 w-full shadow-sm";
                    badgeClass = "absolute -left-6 md:-left-8 w-14 h-14 bg-[#1e2f23] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md";
                  } else if (opt === selectedOption) {
                    boxClass = "relative flex items-center bg-[#fff0f0] border-[3px] border-[#8a1c1c] py-4 px-6 w-full shadow-sm";
                    badgeClass = "absolute -left-6 md:-left-8 w-14 h-14 bg-[#8a1c1c] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md";
                  } else {
                    boxClass = "relative flex items-center bg-white border-[2px] border-[#ccc] py-4 px-6 w-full opacity-50";
                    badgeClass = "absolute -left-6 md:-left-8 w-14 h-14 bg-[#666] rounded-full flex items-center justify-center text-white font-bold text-2xl";
                  }
                }

                return (
                  <div key={i} onClick={() => handleAnswer(opt)} className={boxClass} style={inkBoxStyle}>
                    <div className={badgeClass} style={{border: '4px solid #F6F4EE'}}>
                      {letters[i]}
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-gray-900 ml-6 font-sans">{opt}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center items-center mt-12 mb-4 space-x-4">
               <span className="text-gray-400">❊</span>
               <p className="text-center text-gray-600 italic font-serif">Choose the correct answer!</p>
               <span className="text-gray-400">❊</span>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
}
