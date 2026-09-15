import React from 'react';

export const ExitConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  answeredCount = 0,
  totalQuestions = 0,
  title = "Exit Quiz / Drill?",
  theme = "dark"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-all animate-scale-up"
        style={{
          backgroundColor: theme === 'light' ? '#fcf9f2' : theme === 'sepia' ? '#f5ede0' : '#111827',
          borderColor: theme === 'light' ? '#decfae' : theme === 'sepia' ? '#cbbe9f' : '#374151',
          color: theme === 'light' || theme === 'sepia' ? '#1f2937' : '#f3f4f6'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xl font-bold shrink-0">
            ⚠️
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {title}
            </h3>
            <p className="text-xs opacity-75">
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
            onClick={onClose}
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
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all cursor-pointer"
          >
            Save &amp; Exit (終了する)
          </button>
        </div>
      </div>
    </div>
  );
};
