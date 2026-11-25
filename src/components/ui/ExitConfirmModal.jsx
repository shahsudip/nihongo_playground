import React, { useEffect, useId, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ExitConfirmModal = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  answeredCount = 0,
  totalQuestions = 0,
  title = "Exit Quiz / Drill?",
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
        <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xl font-bold shrink-0" aria-hidden="true">
          ⚠️
        </div>
        <div>
          <h1 id={titleId} className="text-lg font-bold m-0">
            {title}
          </h1>
          <p className="text-xs opacity-75 m-0">
            クイズを中断しますか？
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-6 opacity-90">
        You have answered <strong className="text-emerald-500 font-bold">{answeredCount}</strong> of <strong className="font-bold">{totalQuestions}</strong> questions. If you leave now, your session will be saved as <span className="font-semibold text-amber-500">Incomplete</span>.
      </p>

      <div className="flex items-center justify-end gap-3">
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
          Continue Quiz (続ける)
        </button>
        <button
          type="button"
          onClick={() => {
            if (onConfirm) onConfirm();
            dialogRef.current?.close();
          }}
          className="px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all cursor-pointer"
        >
          Save &amp; Exit (終了する)
        </button>
      </div>
    </dialog>
  );
};
