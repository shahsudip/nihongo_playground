import sys

file_path = 'src/components/ZenkamokuPageViewer.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. We need deleteDoc
content = content.replace("import { doc, getDoc, setDoc } from 'firebase/firestore';", "import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';")

# 2. Extract out old state logic manually
import re
# Regex to remove old state declarations
content = re.sub(r'const \[answers, setAnswers\] = useState\(\{.*?\}\);', '', content, flags=re.DOTALL)
content = re.sub(r'const \[isSubmitted, setIsSubmitted\] = useState\(false\);', '', content, flags=re.DOTALL)
content = re.sub(r'const \[isSaving, setIsSaving\] = useState\(false\);', '', content, flags=re.DOTALL)
content = re.sub(r'const handleAnswer =.*?\}\);[\s\n]*\};', '', content, flags=re.DOTALL)
content = re.sub(r'const submitChapter = async \(\) => \{.*?\}\s*};', '', content, flags=re.DOTALL)


state_replacement = """
  // New state management for persistent answers
  const [savedAnswers, setSavedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Derive current bookId
  const currentBookId = window.location.pathname.includes('zenkamoku-n2') ? 'zenkamoku-n2-best-workbook' : 'zenkamoku-n3-best-workbook';
  const historyDocId = currentUser ? `${currentBookId}-${chapterId}` : null;
  const storageKey = currentUser ? `zenkamoku-progress-${currentUser.uid}-${historyDocId}` : null;

  // Load progress on mount/chapter change
  useEffect(() => {
    if (storageKey) {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setSavedAnswers(JSON.parse(cached));
      } else {
        setSavedAnswers({});
      }
    }
  }, [storageKey]);

  // Check if it was already submitted in Firestore
  useEffect(() => {
    if (currentUser && historyDocId) {
      const checkHistory = async () => {
        const ref = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
        const snap = await getDoc(ref);
        setIsSubmitted(snap.exists());
      };
      checkHistory();
    }
  }, [currentUser, historyDocId]);

  const handleAnswer = (qIdx, optText, isCorrect) => {
    setSavedAnswers(prev => {
      const next = { ...prev, [qIdx]: { text: optText, isCorrect } };
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const submitChapter = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      const historyRef = doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId);
      const correctCount = Object.values(savedAnswers).filter(a => a.isCorrect).length;
      
      const record = {
        quizId: historyDocId,
        bookId: currentBookId,
        chapterId,
        title: (chapter.weekTitle || '') + ' ' + (chapter.dayTitle || ''),
        type: 'book',
        timestamp: new Date().toISOString(),
        score: correctCount,
        total: questions.length,
        answered: Object.keys(savedAnswers).length,
        status: 'completed'
      };

      await setDoc(historyRef, record, { merge: true });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to save score:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const resetChapter = async () => {
    if (!window.confirm('Are you sure you want to reset your progress? This will delete your score from your profile and clear all answers on this page.')) return;
    
    setSavedAnswers({});
    setIsSubmitted(false);
    if (storageKey) localStorage.removeItem(storageKey);
    
    if (currentUser && historyDocId) {
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'quizHistory', historyDocId));
      } catch (err) {
        console.error('Failed to reset history in db:', err);
      }
    }
  };
"""

content = content.replace("const [loading, setLoading] = useState(true);", "const [loading, setLoading] = useState(true);\n" + state_replacement)

# Fix QuestionBlock signature mapping in parent
content = content.replace('<QuestionBlock key={`${secIdx}-${qIdx}`} q={q} qIdx={`${secIdx}-${qIdx}`} onAnswer={handleAnswer} />', '<QuestionBlock key={`${secIdx}-${qIdx}`} q={q} qIdx={`${secIdx}-${qIdx}`} onAnswer={handleAnswer} savedOption={savedAnswers[`${secIdx}-${qIdx}`]?.text} />')
content = content.replace('<QuestionBlock key={`flat-${qIdx}`} q={q} qIdx={`flat-${qIdx}`} onAnswer={handleAnswer} />', '<QuestionBlock key={`flat-${qIdx}`} q={q} qIdx={`flat-${qIdx}`} onAnswer={handleAnswer} savedOption={savedAnswers[`flat-${qIdx}`]?.text} />')

# Inject Reset Button into UI
reset_ui = """
          {/* Submit/Reset Button */}
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
                <div className="text-center w-full max-w-sm">
                  <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Chapter Completed!</h3>
                  <p className="text-xl font-medium mb-6">Score: {Object.values(savedAnswers).filter(a => a.isCorrect).length} / {questions.length} Points</p>
                  <button
                    onClick={resetChapter}
                    className="w-full px-6 py-2 border-2 border-red-500 text-red-600 dark:text-red-400 font-bold rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Reset Score & Progress
                  </button>
                </div>
              )}
            </div>
          )}
"""

content = content.split('{/* Submit Button */}')[0] + reset_ui + '        </div>\n      </>\n    );\n  };\n'

# Update QuestionBlock component signature and internal logic
qblock_old = "function QuestionBlock({ q, qIdx, onAnswer }) {\n  const [selectedOption, setSelectedOption] = useState(null);"
qblock_new = "function QuestionBlock({ q, qIdx, onAnswer, savedOption }) {\n  const selectedOption = savedOption || null;"
content = content.replace(qblock_old, qblock_new)

qblock_old_2 = "function QuestionBlock({ q, qIdx, onAnswer }) {\n  const [selectedOption, setSelectedOption] = useState(null);" # Just in case formatting differs
qblock_new_2 = "function QuestionBlock({ q, qIdx, onAnswer, savedOption }) {\n  const selectedOption = savedOption || null;"
content = content.replace(qblock_old_2, qblock_new_2)

# Update onClick in QuestionBlock
qclick_old = "onClick={() => { setSelectedOption(optText); if (onAnswer) { const isCorrect = optText === (q.correctOption ? (typeof q.correctOption === 'object' ? q.correctOption.text : q.correctOption) : null); onAnswer(qIdx, isCorrect); } }}"
qclick_new = "onClick={() => { if (onAnswer) { const isCorrect = optText === (q.correctOption ? (typeof q.correctOption === 'object' ? q.correctOption.text : q.correctOption) : null); onAnswer(qIdx, optText, isCorrect); } }}"
content = content.replace(qclick_old, qclick_new)

# Update reset logic in useEffect
content = content.replace('setAnswers({});\n', '')
content = content.replace('setAnswers({});', '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("success")
