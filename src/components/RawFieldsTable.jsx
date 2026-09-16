// src/components/RawFieldsTable.jsx
import React, { useState } from 'react';
import { stripAnkiHtml, ankiFuriganaToRuby } from '../utils/ankiParser';

/**
 * AnkiWeb-Style Structured Two-Column Raw Fields Inspector
 * Displays all fields from an Anki / .apkg note with interactive audio,
 * image previews, linkified URLs, and Yomitan styling.
 */
export const RawFieldsTable = ({
  card,
  currentIndex = 0,
  totalCards = 1,
  onPrev,
  onNext,
  mediaMap = {}
}) => {
  const [playingAudio, setPlayingAudio] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!card) return null;

  // Extract or build field list
  let fieldsList = [];
  if (card.fields && Array.isArray(card.fields) && card.fields.length > 0) {
    fieldsList = card.fields;
  } else if (card.rawFields && Array.isArray(card.rawFields) && card.rawFields.length > 0) {
    fieldsList = card.rawFields.map((val, idx) => ({
      name: `Field ${idx + 1}`,
      raw: String(val || ''),
      html: String(val || ''),
      plain: stripAnkiHtml(String(val || ''))
    }));
  } else {
    // Generate from card object keys
    const excludedKeys = new Set(['id', 'deckId', 'layoutType', 'fsrsCard', 'fields', 'rawFields', 'tags', 'mediaMap']);
    fieldsList = Object.entries(card)
      .filter(([k, v]) => !excludedKeys.has(k) && v !== null && v !== undefined && typeof v !== 'object')
      .map(([k, v]) => ({
        name: k.charAt(0).toUpperCase() + k.slice(1),
        raw: String(v || ''),
        html: String(v || ''),
        plain: stripAnkiHtml(String(v || ''))
      }));
  }

  const playSound = (srcOrFilename) => {
    if (!srcOrFilename) return;
    let url = srcOrFilename;

    // Check if filename in mediaMap or card audio
    const soundMatch = srcOrFilename.match(/\[sound:([^\]]+)\]/i);
    const filename = soundMatch ? soundMatch[1] : srcOrFilename;

    if (mediaMap && mediaMap[filename]) {
      url = mediaMap[filename];
    } else if (card.sentenceAudio && (filename.includes('Sent') || filename.includes('sentence') || filename.includes('Audio'))) {
      url = card.sentenceAudio;
    } else if (card.wordAudio && (filename.includes('Word') || filename.includes('vocab'))) {
      url = card.wordAudio;
    } else if (card.audio) {
      url = card.audio;
    }

    try {
      const audio = new Audio(url);
      setPlayingAudio(filename);
      audio.onended = () => setPlayingAudio(null);
      audio.onerror = () => {
        setPlayingAudio(null);
        // Fallback TTS
        if (window.speechSynthesis && card.expression) {
          const u = new SpeechSynthesisUtterance(card.expression);
          u.lang = 'ja-JP';
          window.speechSynthesis.speak(u);
        }
      };
      audio.play().catch(() => setPlayingAudio(null));
    } catch {
      setPlayingAudio(null);
    }
  };

  // Helper to render field value cleanly with appropriate UI widget
  const renderFieldValue = (field) => {
    const { name, raw = '', html = '' } = field;
    const lowerName = name.toLowerCase();

    // 1. Audio Field
    if (lowerName.includes('audio') || raw.includes('[sound:') || (typeof raw === 'string' && raw.match(/\.(mp3|wav|ogg|m4a)$/i))) {
      const soundMatches = [...raw.matchAll(/\[sound:([^\]]+)\]/gi)];
      const filenames = soundMatches.length > 0 ? soundMatches.map(m => m[1]) : [raw.trim()];

      return (
        <div className="flex flex-wrap items-center gap-2">
          {filenames.map((fn, idx) => {
            const isPlaying = playingAudio === fn;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => playSound(fn)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  isPlaying
                    ? 'bg-indigo-600 text-white border-indigo-700 animate-pulse'
                    : 'bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                }`}
                title={`Play audio: ${fn}`}
              >
                <span className="text-base">{isPlaying ? '🔊' : '▶️'}</span>
                <span className="font-mono text-[11px] truncate max-w-[200px]">{fn}</span>
                <span className="text-[10px] opacity-75 font-sans">Play</span>
              </button>
            );
          })}
        </div>
      );
    }

    // 2. Picture / Image Field
    if (lowerName.includes('picture') || lowerName.includes('image') || raw.includes('<img') || (typeof raw === 'string' && raw.match(/\.(png|jpe?g|webp|gif|svg)$/i))) {
      let imgSrc = null;
      const imgMatch = raw.match(/<img[^>]+src=["']?([^"'>\s]+)["']?[^>]*>/i);
      const filename = imgMatch ? imgMatch[1] : raw.trim();

      if (mediaMap && mediaMap[filename]) {
        imgSrc = mediaMap[filename];
      } else if (filename.startsWith('http') || filename.startsWith('data:') || filename.startsWith('blob:') || filename.startsWith('/')) {
        imgSrc = filename;
      } else if (card.image) {
        imgSrc = card.image;
      }

      if (imgSrc) {
        return (
          <div className="space-y-2">
            <div
              onClick={() => setSelectedImage(imgSrc)}
              className="inline-block relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm cursor-zoom-in group max-w-sm"
            >
              <img
                src={imgSrc}
                alt={name}
                className="max-h-48 sm:max-h-56 w-auto object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                🔍 Click to Zoom
              </div>
            </div>
            <div className="font-mono text-[10px] text-[var(--color-text-muted)] truncate max-w-md">
              {filename}
            </div>
          </div>
        );
      }
    }

    // 3. Comment / External Links
    if (raw.includes('http://') || raw.includes('https://')) {
      const urlRegex = /(https?:\/\/[^\s<"']+)/g;
      const parts = raw.split(urlRegex);
      return (
        <div className="space-y-1.5">
          <div className="text-xs leading-relaxed text-gray-800 dark:text-gray-200">
            {parts.map((part, pIdx) => {
              if (part.match(urlRegex)) {
                return (
                  <a
                    key={pIdx}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800 text-[11px] mx-1 break-all"
                  >
                    <span>🔗</span> {part.length > 50 ? part.slice(0, 50) + '...' : part}
                  </a>
                );
              }
              return <span key={pIdx} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
          </div>
        </div>
      );
    }

    // 4. Furigana / Bracket notation
    if (raw.includes('[') && raw.includes(']') && (lowerName.includes('reading') || lowerName.includes('furigana') || lowerName.includes('sentence') || lowerName.includes('word'))) {
      const rubyHtml = ankiFuriganaToRuby(raw);
      return (
        <div className="space-y-2">
          <div
            className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-relaxed"
            dangerouslySetInnerHTML={{ __html: rubyHtml }}
          />
          <div className="text-[11px] font-mono text-[var(--color-text-muted)] bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded inline-block">
            Raw: {raw}
          </div>
        </div>
      );
    }

    // 5. Yomitan / Rich HTML Definitions
    if (html && (html.includes('<ul') || html.includes('<ol') || html.includes('data-sc-content') || html.includes('<div') || html.includes('<li>'))) {
      return (
        <div
          className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-relaxed yomitan-breakdown select-text space-y-1"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    // 6. Regular Text / Simple HTML
    if (html && html.trim()) {
      return (
        <div
          className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-relaxed break-words"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return <span className="text-gray-400 dark:text-gray-500 italic text-xs">-</span>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col space-y-3 animate-fade-in select-text">
      {/* Table Navigation Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] font-semibold px-1 select-none">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-black border border-indigo-500/20">
            Note #{card.noteId || currentIndex + 1}
          </span>
          <span>
            Card {currentIndex + 1} of {totalCards}
          </span>
          {card.tags && card.tags.length > 0 && (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-gray-500">
              🏷️ {card.tags.join(', ')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onPrev && (
            <button
              onClick={onPrev}
              className="px-3 py-1.5 border border-black/20 dark:border-white/20 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 font-bold text-xs transition-all flex items-center gap-1"
            >
              ← Prev (<kbd className="font-mono text-[10px]">K</kbd>)
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="px-3.5 py-1.5 bg-[var(--color-accent)] text-white rounded-xl font-bold text-xs hover:opacity-90 shadow transition-all flex items-center gap-1"
            >
              Next → (<kbd className="font-mono text-[10px]">J</kbd>)
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Table Container */}
      <div className="bg-white dark:bg-zinc-900 border-2 border-black/10 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
        {/* Table Title Banner */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-indigo-50/90 via-purple-50/50 to-transparent dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-transparent border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📋</span>
            <h3 className="text-xs sm:text-sm font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              Raw Fields Schema ({fieldsList.length} Fields)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
            AnkiWeb Model Layout
          </span>
        </div>

        {/* Two-Column Rows */}
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {fieldsList.map((fld, fIdx) => (
            <div
              key={fIdx}
              className={`flex flex-col sm:flex-row transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] ${
                fIdx % 2 === 0 ? 'bg-transparent' : 'bg-black/[0.01] dark:bg-white/[0.01]'
              }`}
            >
              {/* Field Name Badge Column */}
              <div className="w-full sm:w-48 shrink-0 p-3 sm:p-4 bg-slate-50/60 dark:bg-zinc-800/40 border-b sm:border-b-0 sm:border-r border-black/5 dark:border-white/5 flex items-center justify-between sm:justify-start gap-2">
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  {fld.name}
                </span>
                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 sm:hidden">
                  #{fIdx + 1}
                </span>
              </div>

              {/* Field Value Column */}
              <div className="flex-1 p-3.5 sm:p-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 overflow-x-auto">
                {renderFieldValue(fld)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Image Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-white/20">
            <img
              src={selectedImage}
              alt="Zoomed preview"
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white px-3 py-1 rounded-full text-xs font-bold"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawFieldsTable;
