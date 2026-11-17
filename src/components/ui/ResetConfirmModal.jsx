import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ResetConfirmModal = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title = "Reset Exam & Clear Answers?",
  japaneseSubtitle = "セクションをリセットしてやり直しますか？",
  message = "All your selected answers and score for this section will be cleared so you can retake every question from scratch.",
  answeredCount = null,
  totalQuestions = null,
  theme: themeProp
}) => {
  const themeContext = useTheme();
  const theme = themeProp || themeContext?.theme || 'dark';
  const handleClose = onClose || onCancel;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && handleClose) handleClose();
      }}
    >
      <div 
        className="w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-all animate-scale-up"
        style={{
          backgroundColor: theme === 'light' ? '#fcf9f2' : theme === 'sepia' ? '#f5ede0' : '#111827',
          borderColor: theme === 'light' ? '#decfae' : theme === 'sepia' ? '#cbbe9f' : '#374151',
          color: theme === 'light' || theme === 'sepia' ? '#1f2937' : '#f3f4f6'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center text-xl font-bold shrink-0 shadow-inner">
            🔄
          </div>
          <div>
            <h3 id="reset-modal-title" className="text-lg font-bold">
              {title}
            </h3>
            {japaneseSubtitle && (
              <p className="text-xs opacity-75">
                {japaneseSubtitle}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4 opacity-90">
          {message}
        </p>

        {answeredCount !== null && totalQuestions !== null && answeredCount > 0 && (
          <div 
            className="text-xs px-3 py-2 rounded-xl mb-6 font-medium flex items-center justify-between"
            style={{
              backgroundColor: theme === 'light' ? '#f3f4f6' : '#1f2937',
              border: '1px solid',
              borderColor: theme === 'light' ? '#e5e7eb' : '#374151'
            }}
          >
            <span>Current progress:</span>
            <span className="font-bold text-rose-500">
              {answeredCount} / {totalQuestions} answered will be cleared
            </span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border cursor-pointer hover:opacity-90"
            style={{
              backgroundColor: theme === 'light' || theme === 'sepia' ? '#ffffff' : '#1f2937',
              borderColor: theme === 'light' || theme === 'sepia' ? '#cbbe9f' : '#4b5563',
              color: 'inherit'
            }}
          >
            Keep Answers (キャンセル)
          </button>
          <button
            type="button"
            onClick={() => {
              if (onConfirm) onConfirm();
              if (handleClose) handleClose();
            }}
            className="px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🔄</span>
            <span>Reset & Retake (リセット)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
