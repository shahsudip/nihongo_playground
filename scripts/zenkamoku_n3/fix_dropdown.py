import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_str = 'if (loading) return <div className="text-center pt-20 text-white">Loading authentic layout...</div>;'

new_render = """
  const renderContent = () => {
    if (loading) return <div className="text-center py-20 text-gray-500 dark:text-gray-400 font-bold text-xl">Loading authentic layout...</div>;
    if (!chapter) return <div className="text-center py-20 text-gray-500 dark:text-gray-400 font-bold text-xl">This chapter has not been extracted yet. Select a different Week/Day.</div>;

    return (
      <>
        {/* AUTHENTIC HEADER */}
        <div className="flex flex-col w-full mb-8">
          <div className="flex items-stretch w-full">
            <div className="bg-[#1f2937] text-white px-6 py-3 font-bold text-2xl md:text-3xl flex items-center justify-center border-r border-[#374151]">
              {chapter.weekTitle || "第" + currentWeek + "週"}
            </div>
            <div className="bg-[#e5e7eb] dark:bg-[#374151] text-black dark:text-white px-6 py-3 font-bold text-2xl md:text-3xl flex-1 flex items-center justify-between">
              <span>{chapter.dayTitle || currentDay + "日目"}</span>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <span className="text-2xl mr-2">📅</span>
                <span className="border-b-2 border-black dark:border-white w-10 inline-block mx-1"></span>
                <span className="text-lg">月</span>
                <span className="border-b-2 border-black dark:border-white w-10 inline-block mx-1"></span>
                <span className="text-lg">日</span>
              </div>
            </div>
          </div>
          
          {chapter.sectionTitle && (
            <div className="px-6 mt-4">
              <div className="inline-block border-2 border-black dark:border-white px-4 py-1 font-bold text-lg md:text-xl rounded-sm">
                {chapter.sectionTitle} {chapter.sectionTitleEn ? <span className="font-normal ml-2 text-base">{chapter.sectionTitleEn}</span> : ''}
              </div>
            </div>
          )}
        </div>

        {/* CONTENT AREA */}
        <div className="px-6 md:px-12 pb-12">
          {chapter.listeningInstruction && (
            <p className="text-lg mb-8 leading-relaxed font-medium">
              {chapter.listeningInstruction}
            </p>
          )}

          {chapter.sections ? (
            chapter.sections.map((sec, secIdx) => (
              <div key={secIdx} className="mb-12">
                {sec.instruction && (
                  <p className="text-lg mb-6 leading-relaxed font-medium">
                    {sec.instruction}
                  </p>
                )}
                
                <div className="space-y-8">
                  {sec.questions?.map((q, qIdx) => (
                    <QuestionBlock key={qIdx} q={q} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-12">
              {questions.map((q, qIdx) => (
                <QuestionBlock key={qIdx} q={q} />
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#0f172a] text-black dark:text-white pt-24 pb-20 px-4 md:px-8 font-serif">
      <div className="w-full bg-white dark:bg-[#1e293b] shadow-xl min-h-[80vh] relative">
        
        {/* Floating Navigation Controls (ALWAYS VISIBLE) */}
        <div className="absolute -top-12 left-0 w-full flex justify-between items-end">
          <button
            onClick={() => navigate('/books/zenkamoku-n3-best-workbook')}
            className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors pb-1"
          >
            &larr; Exit Book
          </button>
          
          <div className="flex gap-2 pb-1">
            <select 
              value={currentWeek} 
              onChange={handleWeekChange} 
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-black dark:text-white shadow-sm cursor-pointer outline-none hover:border-gray-400 focus:border-black transition-colors"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i+1} value={i+1}>第{i+1}週</option>
              ))}
            </select>
            <select 
              value={currentDay} 
              onChange={handleDayChange} 
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-black dark:text-white shadow-sm cursor-pointer outline-none hover:border-gray-400 focus:border-black transition-colors"
            >
              {[...Array(5)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}日目</option>
              ))}
            </select>
          </div>
        </div>

        {renderContent()}

      </div>
    </div>
  );
}
"""

content = content.split(start_str)[0] + new_render + '\n// Subcomponent for rendering' + content.split('// Subcomponent for rendering')[1]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("success")
