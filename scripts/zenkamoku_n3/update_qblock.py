import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_q_block = content.split('// Subcomponent for rendering exactly like the PDF')[1]

new_q_block = """
function QuestionBlock({ q }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScript, setShowScript] = useState(false);

  // Safely determine correct text
  const correctText = q.correctOption ? (typeof q.correctOption === 'object' ? q.correctOption.text : q.correctOption) : null;

  return (
    <div className="flex flex-col gap-4 text-lg md:text-xl border-b border-gray-200 dark:border-gray-800 pb-10 last:border-0">
      
      {/* Question Header Line: [Number] + [Track Badge] + Stem */}
      <div className="flex items-start gap-4">
        {/* Boxed Question Number */}
        <div className="shrink-0 border border-black dark:border-white w-8 h-8 flex items-center justify-center font-bold text-lg">
          {q.number || ''}
        </div>
        
        <div className="flex-1">
          {/* Track ID Badge (Listening) */}
          {q.trackId && (
            <div className="inline-flex items-center gap-1 font-bold mr-4">
              <span>🎵</span> {q.trackId}
            </div>
          )}
          
          {/* Stem/Question Text */}
          {(q.stem || q.questionText) && (
            <span 
              className="leading-loose"
              dangerouslySetInnerHTML={{ __html: (q.stem || q.questionText) }} 
            />
          )}

          {/* Audio Player Inline + Script Toggle */}
          {q.audioSrc && (
            <div className="mt-3 mb-2 flex items-center gap-4 flex-wrap">
              <audio controls controlsList="nodownload" className="h-10 w-full max-w-sm">
                <source src={`${import.meta.env.BASE_URL.replace(/\\/$/, '')}${q.audioSrc}`} type="audio/mpeg" />
              </audio>
              
              <button 
                onClick={() => setShowScript(!showScript)}
                className="px-3 py-1.5 text-sm font-bold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
              >
                {showScript ? 'Hide Script' : '📄 Show Script'}
              </button>
            </div>
          )}

          {/* Script Content Area */}
          {showScript && (
            <div className="mt-2 mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded text-base leading-relaxed">
              {q.script || q.transcript ? (
                <div dangerouslySetInnerHTML={{ __html: q.script || q.transcript }} />
              ) : (
                <span className="text-gray-500 italic">Script not yet available in database.</span>
              )}
            </div>
          )}
          
          {/* Illustration Inline */}
          {q.imageSrc && (
            <div className="mt-4 border border-gray-300 p-2 inline-block bg-white">
              <img 
                src={`${import.meta.env.BASE_URL.replace(/\\/$/, '')}${q.imageSrc}`} 
                alt="Illustration" 
                className="max-w-md h-auto" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Options - Interactive */}
      {q.options && q.options.length > 0 && (
        <div className="ml-12 flex flex-col gap-2 mt-2">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {q.options.map((opt, idx) => {
              const optText = typeof opt === 'object' ? opt.text : opt;
              let btnClass = "px-4 py-2 border rounded cursor-pointer transition-colors whitespace-nowrap text-left ";
              
              if (selectedOption === null) {
                // Not answered yet
                btnClass += "border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 bg-white dark:bg-gray-800";
              } else {
                // Answered
                const isThisCorrect = optText === correctText;
                const isThisSelected = optText === selectedOption;
                
                if (isThisCorrect) {
                  btnClass += "bg-emerald-100 border-emerald-500 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-400 dark:border-emerald-500 shadow-sm font-bold";
                } else if (isThisSelected && !isThisCorrect) {
                  btnClass += "bg-red-100 border-red-500 text-red-900 dark:bg-red-900/50 dark:text-red-400 dark:border-red-500 shadow-sm";
                } else {
                  btnClass += "border-gray-200 opacity-50 dark:border-gray-700 bg-white dark:bg-gray-800";
                }
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => setSelectedOption(optText)}
                  disabled={selectedOption !== null}
                  className={btnClass}
                >
                  {optText}
                </button>
              );
            })}
          </div>

          {/* Explanation Area */}
          {selectedOption !== null && (
            <div className={`mt-4 p-4 rounded text-base border shadow-sm ${selectedOption === correctText ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800' : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800'}`}>
              <div className="font-bold mb-2 text-lg">
                {selectedOption === correctText ? '✅ Correct' : '❌ Incorrect'}
              </div>
              <div className="text-gray-800 dark:text-gray-200">
                {q.explanation || q.kaisetsu ? (
                   <div dangerouslySetInnerHTML={{ __html: q.explanation || q.kaisetsu }} />
                ) : (
                   <span className="italic text-gray-500 text-sm">No detailed explanation available for this question.</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
"""

content = content.split('// Subcomponent for rendering exactly like the PDF')[0] + '// Subcomponent for rendering exactly like the PDF\n' + new_q_block

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("success")
