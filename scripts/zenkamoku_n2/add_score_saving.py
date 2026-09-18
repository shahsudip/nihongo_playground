import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_imports = "import { doc, getDoc, setDoc } from 'firebase/firestore';"
content = content.replace("import { doc, getDoc } from 'firebase/firestore';", new_imports)

state_injection = """
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAnswer = (qIdx, isCorrect) => {
    setAnswers(prev => ({ ...prev, [qIdx]: isCorrect }));
  };

  const submitChapter = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      // Use URL parameter bookId (since we share this component for N2 and N3)
      // Extract from URL if possible, otherwise fallback
      const currentBookId = window.location.pathname.includes('zenkamoku-n2') ? 'zenkamoku-n2-best-workbook' : 'zenkamoku-n3-best-workbook';
      const historyDocId = `${currentBookId}-${chapterId}`;
      const historyDocRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
      
      const correctCount = Object.values(answers).filter(Boolean).length;
      
      const record = {
        quizId: historyDocId,
        bookId: currentBookId,
        chapterId,
        title: (chapter.weekTitle || '') + ' ' + (chapter.dayTitle || ''),
        type: 'book',
        timestamp: new Date().toISOString(),
        score: correctCount,
        total: questions.length,
        answered: Object.keys(answers).length,
        status: 'completed'
      };

      await setDoc(historyDocRef, record, { merge: true });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to save score:', err);
    } finally {
      setIsSaving(false);
    }
  };
"""

content = content.replace("const [loading, setLoading] = useState(true);", "const [loading, setLoading] = useState(true);\n" + state_injection)

content = content.replace("<QuestionBlock key={qIdx} q={q} />", "<QuestionBlock key={qIdx} q={q} qIdx={qIdx} onAnswer={handleAnswer} />")

submit_ui = """
          {/* Submit Button */}
          {questions.length > 0 && (
            <div className="mt-16 flex flex-col items-center justify-center border-t border-gray-300 dark:border-gray-700 pt-8 pb-12">
              {!isSubmitted ? (
                <button
                  onClick={submitChapter}
                  disabled={isSaving}
                  className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-lg rounded shadow hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Finish Chapter & Save Score'}
                </button>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Chapter Completed!</h3>
                  <p className="text-xl">Score: {Object.values(answers).filter(Boolean).length} / {questions.length}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </>
"""

content = content.replace("        </div>\n      </>\n    );\n  };", submit_ui + "    );\n  };")

qblock_old = "function QuestionBlock({ q }) {"
qblock_new = "function QuestionBlock({ q, qIdx, onAnswer }) {"
content = content.replace(qblock_old, qblock_new)

old_click = "onClick={() => setSelectedOption(optText)}"
new_click = "onClick={() => { setSelectedOption(optText); if (onAnswer) { const isCorrect = optText === (q.correctOption ? (typeof q.correctOption === 'object' ? q.correctOption.text : q.correctOption) : null); onAnswer(qIdx, isCorrect); } }}"
content = content.replace(old_click, new_click)

# Make sure isSubmitted state is reset when the chapterId changes
reset_logic = """
        if (chapterData) {
          setIsSubmitted(false);
          setAnswers({});
          setChapter(chapterData);
"""
content = content.replace("""
        if (chapterData) {
          setChapter(chapterData);
""", reset_logic)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("success")
