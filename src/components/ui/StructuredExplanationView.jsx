import React from 'react';

/**
 * Parses inline markdown-like tokens: **bold**, *italic*, `code`
 */
function parseInlineMarkdown(text = '') {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-emerald-800 dark:text-emerald-300">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-zinc-800 font-mono text-xs">$1</code>');
}

/**
 * StructuredExplanationView
 * Cleanly renders the multi-section grammar breakdown:
 * - Top Answer Banner
 * - Sentence Breakdown (Japanese, Romaji, English Meaning)
 * - Grammar Explanation
 * - Why Other Options Don't Fit
 */
export default function StructuredExplanationView({ explanation }) {
  if (!explanation) return null;

  // Split raw explanation into lines
  const lines = explanation.split(/\r?\n/).map(l => l.trim());

  const sections = [];
  let currentSection = { type: 'intro', lines: [] };

  for (const line of lines) {
    if (line === '---') {
      if (currentSection.lines.length > 0) {
        sections.push(currentSection);
      }
      currentSection = { type: 'section', lines: [] };
    } else if (line.startsWith('### ')) {
      currentSection.title = line.replace('### ', '').trim();
    } else if (line.length > 0) {
      currentSection.lines.push(line);
    }
  }
  if (currentSection.lines.length > 0) {
    sections.push(currentSection);
  }

  return (
    <div className="space-y-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200">
      {sections.map((sec, secIdx) => {
        if (sec.type === 'intro') {
          return (
            <div
              key={secIdx}
              className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 font-medium leading-relaxed"
            >
              {sec.lines.map((l, lIdx) => (
                <div key={lIdx} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(l) }} />
              ))}
            </div>
          );
        }

        return (
          <div key={secIdx} className="space-y-2 pt-2 border-t border-emerald-500/15">
            {sec.title && (
              <h4 className="font-extrabold text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span>
                <span>{sec.title}</span>
              </h4>
            )}
            <div className="space-y-2 leading-relaxed pl-1 sm:pl-2">
              {sec.lines.map((l, lIdx) => {
                if (l.startsWith('* ')) {
                  const content = l.replace('* ', '');
                  return (
                    <div
                      key={lIdx}
                      className="p-2 sm:p-2.5 rounded-xl bg-gray-50/80 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/5"
                      dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(content) }}
                    />
                  );
                }
                return (
                  <div key={lIdx} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(l) }} />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

