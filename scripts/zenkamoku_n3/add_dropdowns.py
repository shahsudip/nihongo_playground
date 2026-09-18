import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

insert_logic = """
  // Extract week and day from chapterId (e.g. w01-d01)
  const currentWeekMatch = chapterId?.match(/w(\\d+)/);
  const currentDayMatch = chapterId?.match(/d(\\d+)/);
  const currentWeek = currentWeekMatch ? parseInt(currentWeekMatch[1], 10) : 1;
  const currentDay = currentDayMatch ? parseInt(currentDayMatch[1], 10) : 1;

  const handleWeekChange = (e) => {
    const newW = String(e.target.value).padStart(2, '0');
    const currentD = String(currentDay).padStart(2, '0');
    navigate(`/books/zenkamoku-n3-best-workbook/chapters/w${newW}-d${currentD}`);
  };

  const handleDayChange = (e) => {
    const currentW = String(currentWeek).padStart(2, '0');
    const newD = String(e.target.value).padStart(2, '0');
    navigate(`/books/zenkamoku-n3-best-workbook/chapters/w${currentW}-d${newD}`);
  };
"""

if 'handleWeekChange' not in content:
    content = content.replace('const [loading, setLoading] = useState(true);', 'const [loading, setLoading] = useState(true);\n' + insert_logic)

target_ui = """        {/* Floating Exit Button */}
        <button
          onClick={() => navigate('/books/zenkamoku-n3-best-workbook')}
          className="absolute -top-10 left-0 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors"
        >
          &larr; Exit Book
        </button>"""

new_ui = """        {/* Floating Navigation Controls */}
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
        </div>"""

content = content.replace(target_ui, new_ui)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("success")
