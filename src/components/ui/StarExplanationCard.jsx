import React, { useMemo } from 'react';
import { buildStarQuestionBreakdown, splitExplanationLines } from '../../utils/starQuestionExplainer';

/**
 * Renders the Browser-Gemini-style structured breakdown for JLPT Star (★)
 * sentence-ordering questions:
 *   1. Top banner: "The correct choice for the star position (★) is X) <option>."
 *   2. Correct Sentence Order block with highlighted [ o1 ) ... ] [ ★ o3 ) ... ] slots,
 *      Order: X → Y → Z (★) → W, and English Translation
 *   3. Step-by-Step Construction (numbered 1, 2, 3 with `→ <combined phrase>` callouts)
 *   4. Summary line: "The third slot (★) is filled by X (<option>)."
 */
export default function StarExplanationCard({ question, compact = false, className = '' }) {
  const breakdown = useMemo(() => buildStarQuestionBreakdown(question), [question]);

  if (!breakdown) return null;

  const {
    starChoice,
    starOptionText,
    prefix,
    suffix,
    slots,
    orderArrowString,
    translation,
    steps,
    summaryLine,
  } = breakdown;

  return (
    <div
      className={`rounded-2xl border border-amber-500/30 bg-amber-50/40 dark:bg-slate-900/80 p-4 sm:p-5 text-slate-800 dark:text-slate-100 space-y-4 shadow-sm ${className}`}
    >
      {/* 1. Top Answer Banner */}
      <div className="text-sm sm:text-base leading-relaxed font-medium text-slate-900 dark:text-slate-100 border-b border-slate-200/80 dark:border-slate-700/70 pb-3">
        The correct choice for the star position (<span className="text-amber-600 dark:text-amber-400 font-bold">★</span>) is{' '}
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/15 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
          {starChoice}) {starOptionText}
        </span>
        .
      </div>

      {/* 2. Correct Sentence Order Section */}
      <div className="space-y-2.5">
        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <span className="text-amber-500">★</span> Correct Sentence Order
        </h4>

        {/* Blockquote sentence with bracketed slots */}
        <blockquote className="border-l-4 border-amber-500 dark:border-amber-400 pl-3.5 py-2 bg-slate-100/70 dark:bg-slate-800/70 rounded-r-xl text-sm sm:text-base leading-loose font-medium text-slate-800 dark:text-slate-100">
          {prefix && <span>{prefix} </span>}
          {slots.map((slot) => (
            <React.Fragment key={slot.slotNumber}>
              <span
                className={
                  slot.isStar
                    ? 'inline-block mx-0.5 px-2 py-0.5 rounded-md bg-amber-500/20 dark:bg-amber-500/25 text-amber-900 dark:text-amber-200 font-bold border border-amber-500/50 shadow-2xs'
                    : 'inline-block mx-0.5 px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 font-bold'
                }
              >
                [ {slot.isStar ? `★ ${slot.optionNumber}` : slot.optionNumber} ) {slot.text} ]
              </span>{' '}
            </React.Fragment>
          ))}
          {suffix && <span>{suffix}</span>}
        </blockquote>

        {/* Order & Translation bullets */}
        <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-amber-500">
          <li>
            <span className="font-bold text-slate-900 dark:text-slate-100">Order:</span>{' '}
            <code className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs sm:text-sm">
              {orderArrowString}
            </code>
          </li>
          {translation && (
            <li>
              <span className="font-bold text-slate-900 dark:text-slate-100">Translation:</span>{' '}
              <em className="text-slate-700 dark:text-slate-300">&ldquo;{translation}&rdquo;</em>
            </li>
          )}
        </ul>
      </div>

      {/* 3. Step-by-Step Construction */}
      {!compact && steps && steps.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/70">
          <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Step-by-Step Construction
          </h4>

          <ol className="space-y-3 text-xs sm:text-sm list-decimal pl-5 marker:font-bold marker:text-slate-500 dark:marker:text-slate-400">
            {steps.map((step, idx) => (
              <li key={idx} className="space-y-1 leading-relaxed">
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                    {step.title}
                  </code>{' '}
                  <span className="text-slate-700 dark:text-slate-300">{step.body}</span>
                </div>
                <div className="pl-2 text-slate-800 dark:text-slate-200 font-medium">
                  <span className="text-amber-600 dark:text-amber-400 font-bold mr-1">→</span>
                  {step.resultPrefix && <span>{step.resultPrefix}</span>}
                  <strong className="font-bold text-amber-800 dark:text-amber-300 underline decoration-amber-500/50 underline-offset-4">
                    {step.resultHighlight}
                  </strong>
                  {step.resultSuffix && <span>{step.resultSuffix}</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* 4. Closing Summary Line */}
      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/70 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
        {summaryLine}
      </div>
    </div>
  );
}

/**
 * Helper component to cleanly render any general (non-star) explanation string
 * that may contain literal `<br/>`, `<br>`, `\n`, `<b>`, `<u>`, or `<ruby>` tags,
 * ensuring raw `<br/>` text is never shown to the user.
 */
export function FormattedExplanationText({ text, className = '' }) {
  const lines = useMemo(() => splitExplanationLines(text), [text]);
  if (!lines.length) return null;

  return (
    <div className={`space-y-1.5 leading-relaxed ${className}`}>
      {lines.map((line, idx) => (
        <div
          key={idx}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
    </div>
  );
}
