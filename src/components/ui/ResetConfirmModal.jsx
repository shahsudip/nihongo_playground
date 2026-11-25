import React, { useEffect, useId, useRef } from 'react';
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
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Mandatory fallback for browsers without native <dialog closedby="any"> support (e.g. Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    const isOutside = (e) => {
      const rect = dialog.getBoundingClientRect();
      return (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (e) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const handleNativeClose = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.returnValue = '';
    }
    if (handleClose) handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      {...{ closedby: 'any' }}
      aria-labelledby={titleId}
      onClose={handleNativeClose}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-6 shadow-2xl border transition-all animate-scale-up"
      style={{
        backgroundColor: theme === 'light' ? '#fcf9f2' : theme === 'sepia' ? '#f5ede0' : '#111827',
        borderColor: theme === 'light' ? '#decfae' : theme === 'sepia' ? '#cbbe9f' : '#374151',
        color: theme === 'light' || theme === 'sepia' ? '#1f2937' : '#f3f4f6'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center text-xl font-bold shrink-0 shadow-inner" aria-hidden="true">
          🔄
        </div>
        <div>
          <h1 id={titleId} className="text-lg font-bold m-0">
            {title}
          </h1>
          {japaneseSubtitle && (
            <p className="text-xs opacity-75 m-0">
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
          autoFocus
          onClick={() => dialogRef.current?.close()}
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
            dialogRef.current?.close();
          }}
          className="px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span aria-hidden="true">🔄</span>
          <span>Reset &amp; Retake (リセット)</span>
        </button>
      </div>
    </dialog>
  );
};

export default ResetConfirmModal;
