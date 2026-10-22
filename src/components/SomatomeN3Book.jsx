import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import defaultWeek1Day1 from '../data/somatome_week1_day1.json';
import { db } from '../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

// Eagerly load all local Somatome JSON files in data/somatome/
const localChapterModules = import.meta.glob('../data/somatome/*.json', { eager: true });

export const SOU_MATOME_N3_CHAPTERS = [
  // Week 1
  { id: 'week1-day1', title: 'Week 1 - Day 1: 案内① (Notices 1)' },
  { id: 'week1-day2', title: 'Week 1 - Day 2: 案内② (Notices 2)' },
  { id: 'week1-day3', title: 'Week 1 - Day 3: 案内③ (Notices 3)' },
  { id: 'week1-day4', title: 'Week 1 - Day 4: 案内④ (Notices 4)' },
  { id: 'week1-day5', title: 'Week 1 - Day 5: 案内⑤ (Letters/Mails)' },
  { id: 'week1-day6', title: 'Week 1 - Day 6: 案内⑥ (Tables/Charts)' },
  { id: 'week1-day7', title: 'Week 1 - Day 7: 実戦問題 (Review 1)' },
  // Week 2
  { id: 'week2-day1', title: 'Week 2 - Day 1: 掲示① (Signs 1)' },
  { id: 'week2-day2', title: 'Week 2 - Day 2: 掲示② (Signs 2)' },
  { id: 'week2-day3', title: 'Week 2 - Day 3: 広告① (Advertisements 1)' },
  { id: 'week2-day4', title: 'Week 2 - Day 4: 広告② (Advertisements 2)' },
  { id: 'week2-day5', title: 'Week 2 - Day 5: 説明書 (Instructions)' },
  { id: 'week2-day6', title: 'Week 2 - Day 6: グラフ・表 (Charts)' },
  { id: 'week2-day7', title: 'Week 2 - Day 7: 実戦問題 (Review 2)' },
  // Week 3
  { id: 'week3-day1', title: 'Week 3 - Day 1: メール① (Emails 1)' },
  { id: 'week3-day2', title: 'Week 3 - Day 2: メール② (Emails 2)' },
  { id: 'week3-day3', title: 'Week 3 - Day 3: 手紙・はがき① (Letters 1)' },
  { id: 'week3-day4', title: 'Week 3 - Day 4: 手紙・はがき② (Letters 2)' },
  { id: 'week3-day5', title: 'Week 3 - Day 5: 手紙・はがき③ (Letters 3)' },
  { id: 'week3-day6', title: 'Week 3 - Day 6: FAX・ビジネス (Business Letters)' },
  { id: 'week3-day7', title: 'Week 3 - Day 7: 実戦問題 (Review 3)' },
  // Week 4
  { id: 'week4-day1', title: 'Week 4 - Day 1: 短文① (Short Passages 1)' },
  { id: 'week4-day2', title: 'Week 4 - Day 2: 短文② (Short Passages 2)' },
  { id: 'week4-day3', title: 'Week 4 - Day 3: 短文③ (Short Passages 3)' },
  { id: 'week4-day4', title: 'Week 4 - Day 4: 短文④ (Short Passages 4)' },
  { id: 'week4-day5', title: 'Week 4 - Day 5: 短文⑤ (Short Passages 5)' },
  { id: 'week4-day6', title: 'Week 4 - Day 6: 短文⑥ (Short Passages 6)' },
  { id: 'week4-day7', title: 'Week 4 - Day 7: 実戦問題 (Review 4)' },
  // Week 5
  { id: 'week5-day1', title: 'Week 5 - Day 1: 中文① (Medium Passages 1)' },
  { id: 'week5-day2', title: 'Week 5 - Day 2: 中文② (Medium Passages 2)' },
  { id: 'week5-day3', title: 'Week 5 - Day 3: 中文③ (Medium Passages 3)' },
  { id: 'week5-day4', title: 'Week 5 - Day 4: 中文④ (Medium Passages 4)' },
  { id: 'week5-day5', title: 'Week 5 - Day 5: 中文⑤ (Medium Passages 5)' },
  { id: 'week5-day6', title: 'Week 5 - Day 6: 中文⑥ (Medium Passages 6)' },
  { id: 'week5-day7', title: 'Week 5 - Day 7: 実戦問題 (Review 5)' },
  // Week 6
  { id: 'week6-day1', title: 'Week 6 - Day 1: 長文・情報検索① (Long Passages 1)' },
  { id: 'week6-day2', title: 'Week 6 - Day 2: 長文・情報検索② (Long Passages 2)' },
  { id: 'week6-day3', title: 'Week 6 - Day 3: 長文・情報検索③ (Long Passages 3)' },
  { id: 'week6-day4', title: 'Week 6 - Day 4: 長文・情報検索④ (Long Passages 4)' },
  { id: 'week6-day5', title: 'Week 6 - Day 5: 長文・情報検索⑤ (Long Passages 5)' },
  { id: 'week6-day6', title: 'Week 6 - Day 6: 長文・情報検索⑥ (Long Passages 6)' },
  { id: 'week6-day7', title: 'Week 6 - Day 7: 模擬試験 (Final Mock Exam)' },
];

// ---------------------------------------------------------------------------
// Schema-tolerant render helpers
// The 42 chapter JSONs were digitized in several slightly different shapes.
// These helpers normalize every known variant so the viewer never crashes on
// non-string React children and never silently drops passage material.
// ---------------------------------------------------------------------------

/** Coerce any primitive / {text} object into a renderable string. */
const toText = (v) => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) return v.map(toText).join('\n');
  if (typeof v === 'object') {
    if ('text' in v) return toText(v.text);
    if ('content' in v) return toText(v.content);
    return Object.values(v).map(toText).filter(Boolean).join(' / ');
  }
  return '';
};

/** Render string with support for HTML tags like <ruby>, <u>, <b>, <span> without escaping. */
const renderHtml = (v) => {
  if (v === null || v === undefined) return '';
  if (React.isValidElement(v)) return v;
  const text = toText(v);
  if (/<[a-z][\s\S]*>/i.test(text)) {
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return text;
};

/** Option may be a plain string or `{ id, text }`. */
const optionLabel = (opt, idx) => {
  if (opt && typeof opt === 'object') {
    const id = opt.id ?? idx + 1;
    const text = toText(opt.text ?? opt.label ?? opt);
    return String(text).trim().startsWith(String(id)) ? text : `${id} ${text}`;
  }
  return toText(opt);
};

const isNonEmptyArray = (v) => Array.isArray(v) && v.length > 0;

/** Matches `A「...」`, `名前「...」`, `名前:「...」` speaker lines. */
const SPEAKER_LINE_RE = /^\s*([^「」:：\s][^「」:：]{0,14}?)\s*[:：]?\s*(「[\s\S]*」?)\s*$/;

const ConversationBlock = ({ conversation }) => {
  if (!conversation || (Array.isArray(conversation) && conversation.length === 0)) return null;

  let lines;
  if (typeof conversation === 'string') {
    lines = conversation.split(/\r?\n/).filter(l => l.trim()).map(l => {
      const m = l.match(SPEAKER_LINE_RE);
      return m ? { speaker: m[1], text: m[2] } : { speaker: null, text: l };
    });
  } else if (Array.isArray(conversation)) {
    lines = conversation.map(line =>
      line && typeof line === 'object'
        ? { speaker: toText(line.speaker), text: toText(line.text ?? line.line ?? line.dialogue) }
        : { speaker: null, text: toText(line) }
    );
  } else {
    lines = [{ speaker: null, text: toText(conversation) }];
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/70 p-4 rounded-lg border border-gray-300 dark:border-gray-700 mb-4 font-medium leading-relaxed text-gray-900 dark:text-gray-100">
      {lines.map((line, i) => (
        <div key={i} className="mb-2 whitespace-pre-line">
          {line.speaker && <span className="font-bold mr-2 text-gray-900 dark:text-gray-100">{renderHtml(line.speaker)}:</span>}
          <span className="text-gray-900 dark:text-gray-100">{renderHtml(line.text)}</span>
        </div>
      ))}
    </div>
  );
};

const GrammarNotes = ({ notes }) => {
  if (!isNonEmptyArray(notes)) return null;
  return (
    <div className="bg-gray-100 dark:bg-slate-800/70 p-3 text-sm text-gray-900 dark:text-gray-100 border-t-2 border-black dark:border-gray-600 space-y-2">
      {notes.map((note, i) => {
        if (note && typeof note === 'object') {
          return (
            <div key={i} className="flex flex-col gap-1 border-l-4 border-black dark:border-gray-400 pl-3 py-1">
              {note.pattern && (
                <span className="inline-block self-start bg-black dark:bg-gray-700 text-white px-2 py-0.5 rounded font-bold">
                  {renderHtml(note.pattern)}
                </span>
              )}
              {note.meaning && <span className="font-bold">{renderHtml(note.meaning)}</span>}
              {note.example && <span className="text-gray-700 dark:text-gray-300">例：{renderHtml(note.example)}</span>}
            </div>
          );
        }
        return <div key={i} className="font-bold">{renderHtml(note)}</div>;
      })}
    </div>
  );
};

const VocabNotes = ({ items, className = '' }) => {
  if (!isNonEmptyArray(items)) return null;
  return (
    <div className={`text-sm text-gray-800 dark:text-gray-200 flex flex-wrap gap-x-8 gap-y-2 font-bold ${className}`}>
      {items.map((v, i) => (
        typeof v === 'object' && v !== null ? (
          <span key={i} className="inline-flex items-baseline gap-1">
            {renderHtml(v.word)}
            {v.reading && <span className="text-gray-500 dark:text-gray-400 font-normal">（{renderHtml(v.reading)}）</span>}
            {v.meaning && <span>: {renderHtml(v.meaning)}</span>}
          </span>
        ) : <span key={i}>{renderHtml(v)}</span>
      ))}
    </div>
  );
};

const Footnotes = ({ items }) => {
  if (!isNonEmptyArray(items)) return null;
  return (
    <div className="mt-3 pt-2 border-t border-gray-300 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 space-y-1">
      {items.map((f, i) => <div key={i}>{renderHtml(f)}</div>)}
    </div>
  );
};

/** Generic table for arrays of flat objects (keigo tables, expression lists…). */
const ObjectTable = ({ rows }) => {
  if (!isNonEmptyArray(rows) || typeof rows[0] !== 'object') return null;
  const cols = [...new Set(rows.flatMap(r => Object.keys(r || {})))];
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse border-2 border-black dark:border-gray-500 text-sm">
        <thead>
          <tr>{cols.map(c => <th key={c} className="border-2 border-black dark:border-gray-500 bg-gray-200 dark:bg-slate-800 p-2 font-bold">{renderHtml(c)}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{cols.map(c => <td key={c} className="border border-black dark:border-gray-600 p-2 whitespace-pre-line">{renderHtml(r?.[c])}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** Renders `{ key: { label, content?, examples?, patterns?, note? } }` dictionaries. */
const LabeledGroups = ({ groups }) => {
  if (!groups || typeof groups !== 'object') return null;
  return (
    <div className="border-2 border-gray-300 dark:border-gray-700 rounded p-3 mb-4 space-y-2 text-sm text-gray-900 dark:text-gray-100">
      {Object.entries(groups).map(([k, g]) => (
        <div key={k}>
          <div className="font-bold">【{renderHtml(g?.label ?? k)}】</div>
          {g?.content && <div className="whitespace-pre-line pl-3">{renderHtml(g.content)}</div>}
          {isNonEmptyArray(g?.examples) && <div className="pl-3">{g.examples.map(renderHtml).join('　/　')}</div>}
          {isNonEmptyArray(g?.patterns) && <div className="pl-3">{g.patterns.map(renderHtml).join('　/　')}</div>}
          {g?.note && <div className="pl-3 text-gray-600 dark:text-gray-400">※ {renderHtml(g.note)}</div>}
        </div>
      ))}
    </div>
  );
};

const NoticeCard = ({ notice }) => {
  if (!notice) return null;
  if (typeof notice === 'string') {
    return <div className="border-2 sm:border-4 border-gray-800 dark:border-gray-500 p-4 rounded-lg mb-4 bg-amber-50/20 dark:bg-slate-900/60 text-gray-900 dark:text-gray-100 whitespace-pre-line leading-relaxed">{renderHtml(notice)}</div>;
  }
  if (notice.html) {
    return (
      <div 
        className="notice-board-card mb-5 p-5 sm:p-7 rounded-xl border-2 sm:border-4 border-gray-800 dark:border-gray-500 bg-amber-50/20 dark:bg-slate-900/60 shadow-md relative leading-loose text-gray-900 dark:text-gray-100"
        dangerouslySetInnerHTML={{ __html: notice.html }}
      />
    );
  }
  const titleParts = typeof notice.title === 'string' ? notice.title.split(' ') : [];
  const contentLines = Array.isArray(notice.content)
    ? notice.content
    : typeof notice.content === 'string' ? notice.content.split(/\r?\n/).filter(Boolean) : [];
  const table = notice.table;
  const tableRows = Array.isArray(table) ? table : table?.rows;
  const tableHeaders = Array.isArray(table) ? null : table?.headers;

  return (
    <div className="border-2 sm:border-4 border-gray-800 dark:border-gray-500 p-4 sm:p-6 rounded-lg mb-4 bg-amber-50/20 dark:bg-slate-900/60 text-gray-900 dark:text-gray-100 relative">
      {titleParts.length > 0 && (
        <>
          <h3 className="text-2xl font-black text-center mb-2 tracking-widest">{renderHtml(titleParts[0])}</h3>
          {titleParts.length > 1 && <h4 className="text-xl font-bold text-center mb-4">{renderHtml(titleParts.slice(1).join(' '))}</h4>}
        </>
      )}
      {notice.heading && <h3 className="text-2xl font-black text-center mb-2 tracking-widest">{renderHtml(notice.heading)}</h3>}
      {notice.subheading && <h4 className="text-lg font-bold text-center mb-4 text-gray-800 dark:text-gray-200">{renderHtml(notice.subheading)}</h4>}
      {notice.subtitle && <p className="text-center font-bold mb-3 text-gray-800 dark:text-gray-200">{renderHtml(notice.subtitle)}</p>}
      {notice.tagline && <p className="text-center font-black mb-4 border-y-2 border-black dark:border-gray-400 py-1">{renderHtml(notice.tagline)}</p>}

      {contentLines.length > 0 && (
        <ul className="space-y-2 mb-4 leading-relaxed">
          {contentLines.map((line, i) => {
            const text = toText(line);
            const isNote = /^\s*[※＊*]/.test(text);
            return (
              <li key={i} className={`flex gap-2 whitespace-pre-line ${isNote ? 'text-sm text-gray-700 dark:text-gray-300' : ''}`}>
                {!isNote && <span className="font-bold shrink-0">・</span>}
                <span>{renderHtml(text)}</span>
              </li>
            );
          })}
        </ul>
      )}

      {isNonEmptyArray(tableRows) && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse border-2 border-black dark:border-gray-500 text-sm">
            {isNonEmptyArray(tableHeaders) && (
              <thead>
                <tr>{tableHeaders.map((h, i) => <th key={i} className="border-2 border-black dark:border-gray-500 bg-gray-200 dark:bg-slate-800 p-2 font-bold">{renderHtml(h)}</th>)}</tr>
              </thead>
            )}
            <tbody>
              {tableRows.map((row, i) => {
                const cells = Array.isArray(row)
                  ? row
                  : row && typeof row === 'object'
                    ? (isNonEmptyArray(tableHeaders) ? tableHeaders.map((h, hi) => row[h] ?? row[hi]) : Object.values(row))
                    : [row];
                return (
                  <tr key={i}>
                    {cells.map((c, j) => (
                      <td key={j} className={`border border-black dark:border-gray-500 p-2 whitespace-pre-line ${j === 0 ? 'font-bold bg-gray-100 dark:bg-slate-800/60' : ''}`}>{renderHtml(c)}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {isNonEmptyArray(notice.sections) && (
        <table className="w-full border-collapse border-2 border-black dark:border-gray-500 mb-4">
          <tbody>
            {notice.sections.map((sec, i) => {
              if (isNonEmptyArray(sec.rows)) {
                return (
                  <React.Fragment key={i}>
                    {sec.rows.map((row, j) => (
                      <tr key={j}>
                        {j === 0 && (
                          <td rowSpan={sec.rows.length} className="border-2 border-black dark:border-gray-500 bg-gray-200 dark:bg-slate-800 font-bold p-3 w-1/4 text-center">
                            {renderHtml(sec.header)}
                          </td>
                        )}
                        <td className="border-2 border-black dark:border-gray-500 p-3 w-1/4 bg-gray-100 dark:bg-slate-800/60 whitespace-pre-wrap font-bold text-center">
                          {renderHtml(row?.label)}
                        </td>
                        <td className="border-2 border-black dark:border-gray-500 p-3 whitespace-pre-wrap">
                          {renderHtml(row?.value ?? row)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              }
              return (
                <tr key={i}>
                  <td className="border-2 border-black dark:border-gray-500 bg-gray-200 dark:bg-slate-800 font-bold p-3 w-1/4 text-center">{renderHtml(sec.header ?? sec.title)}</td>
                  <td colSpan={2} className="border-2 border-black dark:border-gray-500 p-3 whitespace-pre-wrap leading-relaxed">{renderHtml(sec.content ?? sec.text)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {notice.footer && <p className="text-sm font-bold whitespace-pre-line">{renderHtml(notice.footer)}</p>}
    </div>
  );
};

const PassageCard = ({ passage, title }) => {
  if (!passage) return null;
  const isObj = typeof passage === 'object';
  if (isObj && passage.html) {
    return (
      <div 
        className="border-2 border-gray-500 dark:border-gray-600 rounded-lg p-4 sm:p-6 mb-4 bg-amber-50/30 dark:bg-slate-900/60 text-gray-900 dark:text-gray-100 leading-loose"
        dangerouslySetInnerHTML={{ __html: passage.html }}
      />
    );
  }
  const text = isObj ? toText(passage.text ?? passage.content ?? passage.body) : passage;
  const heading = title || (isObj ? passage.title : null);
  return (
    <div className="border-2 border-gray-500 dark:border-gray-600 rounded-lg p-4 sm:p-6 mb-4 bg-amber-50/30 dark:bg-slate-900/60 text-gray-900 dark:text-gray-100">
      {heading && <h4 className="font-bold text-lg mb-3 border-b border-gray-400 dark:border-gray-600 pb-1">{renderHtml(heading)}</h4>}
      <div className="whitespace-pre-line leading-loose tracking-wide text-[15px] sm:text-base font-serif">{renderHtml(text)}</div>
      {isObj && <VocabNotes items={passage.vocab_notes || passage.vocabulary_notes} className="mt-3 pt-2 border-t border-gray-300 dark:border-gray-700" />}
      {isObj && <Footnotes items={passage.footnotes} />}
    </div>
  );
};

const HeaderRow = ({ label, value }) => (value ? (
  <div className="flex gap-2 text-sm"><span className="font-bold w-20 shrink-0 text-gray-600">{label}</span><span className="break-all">{toText(value)}</span></div>
) : null);

const CorrespondenceCard = ({ kind, letter: d }) => {
  if (!d) return null;
  if (typeof d === 'string') return <PassageCard passage={d} />;
  const kindLabel = { email: '✉ E-mail', letter: '📜 手紙', postcard: '📮 はがき', fax: '📠 FAX' }[kind] || kind;

  return (
    <div className="border-2 border-gray-600 rounded-sm mb-4 bg-white shadow-sm overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-1.5 text-xs font-bold tracking-wider">{kindLabel}</div>

      {kind === 'email' && (
        <div className="px-4 py-3 border-b-2 border-gray-300 bg-gray-50 space-y-1">
          <HeaderRow label="あて先" value={d.to} />
          <HeaderRow label="送信者" value={d.from} />
          <HeaderRow label="件名" value={d.subject} />
        </div>
      )}

      {kind === 'fax' && (
        <div className="px-4 py-3 border-b-2 border-gray-300 bg-gray-50 space-y-1">
          {d.title && <div className="text-center text-xl font-black tracking-widest mb-1">{toText(d.title)}</div>}
          {d.slogan && <div className="text-center text-xs text-gray-600 mb-2">{toText(d.slogan)}</div>}
          <HeaderRow label="日付" value={d.date} />
          <HeaderRow label="あて先" value={d.to} />
          <HeaderRow label="FAX番号" value={d.fax_number} />
          <HeaderRow label="発信者" value={d.from} />
          <HeaderRow label="TEL" value={d.from_tel} />
          <HeaderRow label="FAX" value={d.from_fax} />
          <HeaderRow label="件名" value={d.subject} />
          <HeaderRow label="枚数" value={d.pages} />
          {isNonEmptyArray(d.urgency) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {d.urgency.map((u, i) => <span key={i} className="text-xs border border-black px-2 py-0.5">{toText(u)}</span>)}
            </div>
          )}
        </div>
      )}

      <div className="p-4 sm:p-6 font-serif leading-loose tracking-wide text-black">
        {kind === 'letter' && d.recipient && <div className="font-bold mb-3">{toText(d.recipient)}</div>}
        {kind === 'email' && d.recipient_name && <div className="font-bold mb-3">{toText(d.recipient_name)}</div>}
        <div className="whitespace-pre-line">{toText(d.body)}</div>
        {kind === 'letter' && (d.date || d.sender) && (
          <div className="text-right mt-4 space-y-0.5">
            {d.date && <div>{toText(d.date)}</div>}
            {d.sender && <div className="font-bold">{toText(d.sender)}</div>}
          </div>
        )}
        {kind === 'postcard' && d.address_block && (
          <div className="mt-4 ml-auto w-fit border-t-2 border-dashed border-gray-400 pt-2 text-sm whitespace-pre-line">{toText(d.address_block)}</div>
        )}
        <Footnotes items={d.footnotes} />
      </div>
    </div>
  );
};

const MangaFrames = ({ frames }) => {
  if (!isNonEmptyArray(frames)) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      {frames.map((f, i) => (
        <div key={i} className="border-2 border-black rounded-sm p-3 bg-white">
          <div className="text-xs font-black bg-black text-white inline-block px-2 py-0.5 mb-2">{toText(f?.frame ?? i + 1)}コマ目</div>
          <div className="whitespace-pre-line leading-relaxed">{toText(f?.dialogue ?? f?.text ?? f)}</div>
        </div>
      ))}
    </div>
  );
};

const GraphInfo = ({ info }) => {
  if (!info) return null;
  return (
    <div className="border-2 border-gray-500 rounded-sm p-4 mb-4 bg-white">
      {info.title && <h4 className="font-bold text-lg text-center mb-2">📊 {toText(info.title)}</h4>}
      {info.description && <div className="whitespace-pre-line leading-relaxed text-sm">{toText(info.description)}</div>}
      {info.source && <div className="text-xs text-gray-600 text-right mt-2">出典：{toText(info.source)}</div>}
    </div>
  );
};

/** Flatten every known mondai layout into an ordered list of renderable blocks. */
const getMondaiBlocks = (data) => {
  if (!data) return [];
  const blocks = [];
  const m = data.mondai;
  if (m) {
    if (isNonEmptyArray(m.sections)) {
      blocks.push({ ...m, sections: undefined });
      m.sections.forEach(s => blocks.push({ ...s, title: s.heading ?? s.title }));
    } else {
      blocks.push(m);
    }
  }
  Object.keys(data)
    .filter(k => /^mondai_\d+$/.test(k))
    .sort((a, b) => parseInt(a.split('_')[1], 10) - parseInt(b.split('_')[1], 10))
    .forEach(k => blocks.push(data[k]));
  if (isNonEmptyArray(data.mondai_sections)) blocks.push(...data.mondai_sections);
  return blocks.filter(Boolean);
};

const SomatomeN3Book = () => {
  const { chapterId = 'week1-day1' } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  // Renshuu state
  const [renshuuClicked, setRenshuuClicked] = useState([]);
  const [renshuuRevealed, setRenshuuRevealed] = useState(false);

  // Mondai state
  const [mondaiAnswers, setMondaiAnswers] = useState({});
  const [mondaiRevealed, setMondaiRevealed] = useState({});

  const [startX, setStartX] = useState(null);

  const allChapters = SOU_MATOME_N3_CHAPTERS;
  const currentChapterIndex = allChapters.findIndex(c => c.id === chapterId);
  const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : null;

  // Derive current week from chapterId (e.g. "week3-day2" → 3)
  const currentWeek = parseInt(chapterId.match(/week(\d+)/)?.[1] || '1', 10);

  // Filter dropdown to only show days from the current week
  const weekChapters = allChapters.filter(ch => ch.id.startsWith(`week${currentWeek}-`));

  // All available week numbers for the week selector
  const weekNumbers = [...new Set(allChapters.map(ch => parseInt(ch.id.match(/week(\d+)/)?.[1] || '0', 10)))].filter(n => n > 0).sort((a, b) => a - b);

  // Redirect invalid 'chapter-X' IDs to 'week1-day1'
  useEffect(() => {
    if (chapterId.startsWith('chapter-') || chapterId.startsWith('ch-')) {
      navigate('/books/sou-matome-n3-reading/chapters/week1-day1', { replace: true });
    }
  }, [chapterId, navigate]);

  // Reset interactive states and load chapter data when chapterId changes
  useEffect(() => {
    setCurrentPage(0);
    setRenshuuClicked([]);
    setRenshuuRevealed(false);
    setMondaiAnswers({});
    setMondaiRevealed({});
    setLoading(true);
    setError(null);

    const loadChapter = async () => {
      try {
        // 1. Check local glob imports first
        const matchedKey = Object.keys(localChapterModules).find(k => k.endsWith(`/${chapterId}.json`));
        if (matchedKey && localChapterModules[matchedKey]) {
          const mod = localChapterModules[matchedKey];
          setData(mod.default || mod);
          setLoading(false);
          return;
        }

        // 2. Check fallback to defaultWeek1Day1
        if (chapterId === 'week1-day1' && defaultWeek1Day1) {
          setData(defaultWeek1Day1);
          setLoading(false);
          return;
        }

        // 3. Try fetching from Firestore
        try {
          const chapterDocRef = doc(db, 'books', 'sou-matome-n3-reading', 'chapters', chapterId);
          const snap = await getDoc(chapterDocRef);
          if (snap.exists()) {
            setData(snap.data());
            setLoading(false);
            return;
          }
        } catch (fsErr) {
          console.warn("Firestore chapter fetch failed, falling back:", fsErr);
        }

        // 4. Fallback: not ready
        setData(null);
        setError(`Chapter content for "${chapterId}" is currently in preparation.`);
      } catch (err) {
        console.error("Error loading chapter:", err);
        setError(err.message || "Failed to load chapter content.");
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [chapterId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setCurrentPage(p => Math.min(totalPages - 1, p + 1));
      if (e.key === 'ArrowLeft') setCurrentPage(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  // Renshuu logic
  const handleRenshuuClick = (idx) => {
    if (renshuuRevealed || !data?.practice?.correct_answers) return;
    
    const isCorrect = data.practice.correct_answers.includes(idx);
    
    if (!isCorrect) {
      // Clicked wrong: instantly reveal all
      setRenshuuClicked(prev => [...prev, idx]);
      setRenshuuRevealed(true);
    } else {
      // Clicked correct
      const newClicked = [...renshuuClicked, idx];
      setRenshuuClicked(newClicked);
      
      // If found all correct answers, reveal
      const correctFound = newClicked.filter(c => data.practice.correct_answers.includes(c));
      if (correctFound.length === data.practice.correct_answers.length) {
        setRenshuuRevealed(true);
      }
    }
  };

  // Mondai logic
  const handleMondaiClick = (qId, optionIndex) => {
    if (mondaiRevealed[qId]) return;
    
    setMondaiAnswers(prev => ({ ...prev, [qId]: optionIndex + 1 }));
    setMondaiRevealed(prev => ({ ...prev, [qId]: true }));
  };

  const handleDragStart = (e) => {
    setStartX(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  };

  const handleDragEnd = (e) => {
    if (startX === null) return;
    const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;
    
    if (diff > 50 && currentPage < totalPages - 1) {
      setCurrentPage(p => p + 1);
    } else if (diff < -50 && currentPage > 0) {
      setCurrentPage(p => p - 1);
    }
    setStartX(null);
  };

  const navigateToChapter = (id) => {
    if (id) {
      navigate(`/books/sou-matome-n3-reading/chapters/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-3 sm:px-5 lg:px-8 pb-8 pt-24 md:pt-28 flex flex-col items-center">
        <div className="w-full mb-2 z-10">
          <Link to="/books/sou-matome-n3-reading" className="text-sm font-semibold text-blue-500 hover:underline inline-block">&larr; Back to Lessons</Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-5 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full min-h-[400px]">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading chapter content...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-3 sm:px-5 lg:px-8 pb-8 pt-24 md:pt-28 flex flex-col items-center">
        <div className="w-full mb-2 z-10">
          <Link to="/books/sou-matome-n3-reading" className="text-sm font-semibold text-blue-500 hover:underline inline-block">&larr; Back to Lessons</Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-5 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full min-h-[400px] text-center border border-gray-200 dark:border-gray-700">
          <div className="text-5xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Chapter In Preparation</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
            {error || `Content for chapter "${chapterId}" is being prepared. Check back soon or try Week 1 Day 1.`}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              onClick={() => navigateToChapter('week1-day1')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition"
            >
              Go to Week 1 Day 1
            </button>
            <button 
              onClick={() => navigate('/books/sou-matome-n3-reading')}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg shadow transition"
            >
              Back to Book Index
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 px-2 sm:px-4 lg:px-6 pb-6 pt-24 md:pt-28 flex flex-col items-center overflow-x-hidden">
      <div className="w-full mb-2 z-10">
        <Link to="/books/sou-matome-n3-reading" className="text-sm font-semibold text-blue-500 hover:underline mb-2 inline-block">
          &larr; Back to Lessons
        </Link>
        
        {/* Navigation & Chapter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2.5 mt-2 rounded-xl shadow-md text-sm font-medium border border-gray-700">
          
          {/* Week Selector + Day Dropdown */}
          <div className="grid min-w-0 flex-1 grid-cols-1 sm:grid-cols-2 items-center gap-2">
            <select
              id="week-select"
              value={currentWeek}
              onChange={(e) => navigateToChapter(`week${e.target.value}-day1`)}
              className="w-full min-w-0 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold py-1.5 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {weekNumbers.map((wn) => (
                <option key={wn} value={wn}>
                  Week {wn}
                </option>
              ))}
            </select>
            <select
              id="chapter-select"
              value={chapterId}
              onChange={(e) => navigateToChapter(e.target.value)}
              className="w-full min-w-0 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold py-1.5 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {weekChapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.title.replace(/^Week \d+ - /, '')}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Prev / Next Controls */}
          <div className="flex items-center justify-between gap-2 lg:justify-end">
            <button 
              onClick={() => prevChapter && navigateToChapter(prevChapter.id)}
              disabled={!prevChapter}
              title={prevChapter ? `Go to ${prevChapter.title}` : 'No previous chapter'}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                prevChapter 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' 
                  : 'bg-gray-800/40 text-gray-500 border border-gray-800 cursor-not-allowed'
              }`}
            >
              <span>&larr;</span>
              <span className="hidden sm:inline">Prev Day</span>
            </button>

            <button 
              onClick={() => nextChapter && navigateToChapter(nextChapter.id)}
              disabled={!nextChapter}
              title={nextChapter ? `Go to ${nextChapter.title}` : 'No next chapter'}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                nextChapter 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                  : 'bg-gray-800/40 text-gray-500 border border-gray-800 cursor-not-allowed'
              }`}
            >
              <span className="hidden sm:inline">Next Day</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* PDF Page Viewer Toolbar */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 bg-gray-800 text-white px-2 sm:px-4 py-2 mt-2 rounded-xl shadow text-sm font-bold border border-gray-700">
          <button 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} 
            disabled={currentPage === 0}
            className={`px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition ${currentPage === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <span className="sm:hidden">&larr; P.1</span>
            <span className="hidden sm:inline">&larr; Page 1 (れんしゅう)</span>
          </button>
          
          <div className="flex min-w-0 items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs">
            <span className={`px-2 py-0.5 rounded cursor-pointer ${currentPage === 0 ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`} onClick={() => setCurrentPage(0)}>
              P.1 れんしゅう
            </span>
            <span className="text-gray-500">|</span>
            <span className={`px-2 py-0.5 rounded cursor-pointer ${currentPage === 1 ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`} onClick={() => setCurrentPage(1)}>
              P.2 もんだい
            </span>
          </div>

          <button 
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))} 
            disabled={currentPage === totalPages - 1}
            className={`px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition ${currentPage === totalPages - 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <span className="sm:hidden">P.2 &rarr;</span>
            <span className="hidden sm:inline">Page 2 (もんだい) &rarr;</span>
          </button>
        </div>
      </div>
      
      {/* A4 Paper Viewport */}
      <div 
        className="relative bg-white text-black shadow-2xl border-2 border-gray-400 dark:border-gray-700 w-full h-[calc(100dvh-14rem)] min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] overflow-hidden flex select-none rounded-xl"
        onMouseDown={handleDragStart} 
        onMouseUp={handleDragEnd} 
        onTouchStart={handleDragStart} 
        onTouchEnd={handleDragEnd}
      >
        
        {/* Slider Track */}
        <div 
          className="flex w-full h-full transition-transform duration-300 ease-in-out" 
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          
          {/* ================= PAGE 1: LESSON & RENSHUU ================= */}
          <div className="w-full h-full flex-shrink-0 p-3 sm:p-5 lg:p-8 xl:p-10 overflow-y-auto pb-8">
            {/* Header Section */}
            <div className="bg-black text-white rounded-t-xl p-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end mb-5">
              <div className="flex flex-col">
                <span className="text-xl font-bold">第{data.week}週</span>
                <span className="text-3xl font-black">{data.day}日目</span>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl font-bold">{data.theme}</div>
                <div className="text-2xl font-black mt-1">{data.title}</div>
              </div>
            </div>

            {/* Learning Focus */}
            {data.learning_focus && (
              <div className="mb-5">
                <h2 className="text-xl font-bold text-black mb-2 border-b-2 border-black pb-2 inline-block">
                  ✿ {data.learning_focus.title}
                </h2>
                {data.learning_focus.subtitle && (
                  <p className="text-sm text-gray-700 mb-4 font-bold">{data.learning_focus.subtitle}</p>
                )}
                
                {data.learning_focus.comic && (data.learning_focus.comic.text1 || data.learning_focus.comic.text2 || data.learning_focus.comic.sign) && (
                  <div className="flex flex-col md:flex-row items-center gap-4 border-2 border-gray-200 p-4 rounded-lg bg-gray-50">
                    <div className="flex-1 space-y-2 relative">
                        {data.learning_focus.comic.text1 && (
                          <div className="bg-white text-black p-3 rounded-2xl rounded-tl-none border border-gray-400 font-bold shadow-sm">
                            {renderHtml(data.learning_focus.comic.text1)}
                          </div>
                        )}
                        {data.learning_focus.comic.text2 && (
                          <div className="bg-white text-black p-3 rounded-2xl rounded-tr-none border border-gray-400 ml-8 font-bold shadow-sm">
                            {renderHtml(data.learning_focus.comic.text2)}
                          </div>
                        )}
                        {data.learning_focus.comic.sign && (
                          <div className="text-center mt-2 font-black text-black border-2 border-black p-1 bg-white inline-block shadow">
                            {renderHtml(data.learning_focus.comic.sign)}
                          </div>
                        )}
                    </div>
                    {data.learning_focus.comic.note && (
                      <div className="flex-1 font-bold text-lg text-black">
                          ★ {renderHtml(data.learning_focus.comic.note)}
                      </div>
                    )}
                  </div>
                )}

                {/* Alternate learning-focus layouts used in W1D2–W3D7 / W4D7 / W6 */}
                {data.learning_focus.english_title && (
                  <p className="text-sm text-gray-600 italic mb-3">{toText(data.learning_focus.english_title)}</p>
                )}
                {data.learning_focus.comic && (data.learning_focus.comic.situation || isNonEmptyArray(data.learning_focus.comic.dialogue)) && (
                  <div className="border-2 border-gray-200 p-4 rounded-lg bg-gray-50 mt-3">
                    {data.learning_focus.comic.situation && (
                      <p className="text-sm text-gray-700 font-bold mb-2">（{toText(data.learning_focus.comic.situation)}）</p>
                    )}
                    <ConversationBlock conversation={data.learning_focus.comic.dialogue} />
                  </div>
                )}
                {data.learning_focus.comic_dialogue && typeof data.learning_focus.comic_dialogue === 'object' && (
                  <div className="border-2 border-gray-200 p-4 rounded-lg bg-gray-50 mt-3 space-y-2">
                    {Object.values(data.learning_focus.comic_dialogue).map((t, i) => (
                      <div key={i} className="bg-white text-black p-3 rounded-2xl border border-gray-400 font-bold shadow-sm">{toText(t)}</div>
                    ))}
                  </div>
                )}
                {['comic_note', 'note', 'business_rule', 'explanation'].map(k => (
                  data.learning_focus[k] && typeof data.learning_focus[k] === 'string' ? (
                    <p key={k} className="mt-3 font-bold text-black whitespace-pre-line">★ {data.learning_focus[k]}</p>
                  ) : null
                ))}
                {(data.learning_focus.time_limit || data.learning_focus.total_score) && (
                  <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
                    {data.learning_focus.time_limit && <span className="border-2 border-black px-3 py-1">⏱ {toText(data.learning_focus.time_limit)}</span>}
                    {data.learning_focus.total_score && <span className="border-2 border-black px-3 py-1">📝 {toText(data.learning_focus.total_score)}</span>}
                  </div>
                )}
                {isNonEmptyArray(data.learning_focus.expressions) && <div className="mt-3"><ObjectTable rows={data.learning_focus.expressions} /></div>}
                {isNonEmptyArray(data.learning_focus.keigo_table) && <div className="mt-3"><ObjectTable rows={data.learning_focus.keigo_table} /></div>}
                {data.learning_focus.letter_format && <div className="mt-3"><LabeledGroups groups={data.learning_focus.letter_format} /></div>}
                {data.learning_focus.keigo_patterns && <div className="mt-3"><LabeledGroups groups={data.learning_focus.keigo_patterns} /></div>}
              </div>
            )}

            {/* Vocabulary Table */}
            {data.vocabulary && data.vocabulary.length > 0 && (
              <div className="border-2 border-black mb-5">
                <div className="bg-gray-200 border-b-2 border-black py-2 px-4 font-bold text-black">
                  よく使われる表現
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {data.vocabulary.map((v, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-300 py-2">
                      <div className="flex flex-col">
                        {v.reading && <span className="text-xs text-gray-600 font-bold">{v.reading}</span>}
                        <span className="font-bold text-black">{v.word}</span>
                      </div>
                      <span className="text-black text-sm self-end">{v.meaning}</span>
                    </div>
                  ))}
                </div>
                <GrammarNotes notes={data.grammar_notes} />
              </div>
            )}

            {/* Practice / Renshuu */}
            {data.practice && (
              <div className="border-b-2 border-dashed border-gray-400 pb-4">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-black text-white px-4 py-1 rounded-full font-bold">れんしゅう</span>
                    <span className="font-bold text-black">{renderHtml(data.practice.instruction)}</span>
                </div>
                
                <ConversationBlock conversation={data.practice.conversation} />
                <VocabNotes items={data.practice.vocab_notes || data.practice.vocabulary_notes} className="mb-3" />
                {isNonEmptyArray(data.practice.footnotes) && <div className="mb-3"><Footnotes items={data.practice.footnotes} /></div>}

                {data.practice.question && (
                  <p className="font-bold text-black mb-3">{renderHtml(data.practice.question)}</p>
                )}
                
                {data.practice.options && (
                  <div className="space-y-2">
                    {data.practice.options.map((opt, i) => {
                      const optNumber = i + 1;
                      const isCorrectAnswer = (data.practice.correct_answers || []).includes(optNumber);
                      
                      const isChecked = renshuuClicked.includes(optNumber) || (renshuuRevealed && isCorrectAnswer);
                      
                      let boxStyle = "border-gray-400";
                      let textStyle = "text-black group-hover:font-bold";
                      let explainBlock = null;

                      if (renshuuRevealed || renshuuClicked.includes(optNumber)) {
                        if (isCorrectAnswer && isChecked) {
                          boxStyle = "border-green-600 bg-green-50";
                          textStyle = "text-green-700 font-bold";
                          if (renshuuRevealed && data.practice.options_explanation?.[optNumber]) {
                            explainBlock = (
                              <div className="ml-8 mt-1 text-sm text-green-700 bg-green-100 p-2 rounded">
                                {renderHtml(data.practice.options_explanation[optNumber])}
                              </div>
                            );
                          }
                        } else if (!isCorrectAnswer && renshuuClicked.includes(optNumber)) {
                          boxStyle = "border-red-600 bg-red-50";
                          textStyle = "text-red-700 line-through opacity-70";
                          if (data.practice.options_explanation?.[optNumber]) {
                            explainBlock = (
                              <div className="ml-8 mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">
                                {renderHtml(data.practice.options_explanation[optNumber])}
                              </div>
                            );
                          }
                        }
                      }

                      return (
                        <div key={i} className="flex flex-col">
                          <label 
                            onClick={() => handleRenshuuClick(optNumber)} 
                            className={`flex items-start gap-3 p-2 -ml-2 rounded transition-colors ${!renshuuRevealed ? 'cursor-pointer hover:bg-gray-100' : ''} ${boxStyle !== 'border-gray-400' ? boxStyle : ''}`}
                          >
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                readOnly
                                className="mt-1 w-5 h-5 accent-black pointer-events-none" 
                              />
                              <span className={textStyle}>
                                {renderHtml(optionLabel(opt, i))} 
                                {boxStyle.includes('green') && " ✅"}
                                {boxStyle.includes('red') && " ❌"}
                              </span>
                          </label>
                          {explainBlock}
                        </div>
                      );
                    })}
                  </div>
                )}

                {renshuuRevealed && typeof data.practice.explanation === 'string' && data.practice.explanation && (
                  <div className="mt-3 text-sm text-green-800 bg-green-50 border border-green-300 p-3 rounded whitespace-pre-line">
                    <span className="font-bold block mb-0.5">解説:</span>
                    {renderHtml(data.practice.explanation)}
                  </div>
                )}
              </div>
            )}
            
          </div>

          {/* ================= PAGE 2: MONDAI / QUESTIONS ================= */}
          <div className="w-full h-full flex-shrink-0 p-3 sm:p-5 lg:p-8 xl:p-10 overflow-y-auto pb-8">
            {(() => {
              const blocks = getMondaiBlocks(data);
              if (blocks.length === 0) {
                return <p className="text-gray-500 font-bold text-center mt-10">この日のもんだいはありません。</p>;
              }
              return blocks.map((m, bIdx) => {
                const vocab = m.notice_vocab || m.notice_vocabulary || m.vocabulary_notes || m.passage_vocab || m.vocab_notes;
                const passages = isNonEmptyArray(m.passages) ? m.passages : [];
                const showTitle = blocks.length > 1 && m.title;
                return (
                  <div key={bIdx} className={bIdx > 0 ? 'mt-8 pt-6 border-t-4 border-double border-black' : ''}>
                    {showTitle && <h3 className="text-lg font-black mb-2">{renderHtml(m.title)}</h3>}
                    {m.instruction && (
                      <div className="flex items-start gap-3 mb-4">
                        <span className="bg-black text-white px-4 py-1 rounded-full font-bold shrink-0">もんだい</span>
                        <span className="font-bold text-black">{renderHtml(m.instruction)}</span>
                      </div>
                    )}

                    {/* Notice (table sections / text content / matrix table) */}
                    <NoticeCard notice={m.notice} />

                    {/* Graph description */}
                    <GraphInfo info={m.graph_info} />

                    {/* Correspondence */}
                    <CorrespondenceCard kind="email" letter={m.email} />
                    <CorrespondenceCard kind="letter" letter={m.letter} />
                    <CorrespondenceCard kind="postcard" letter={m.postcard} />
                    <CorrespondenceCard kind="fax" letter={m.fax} />

                    {/* Reading passages */}
                    <PassageCard passage={m.passage} />
                    {passages.map((p, pIdx) => <PassageCard key={pIdx} passage={p} />)}

                    {/* Manga frames */}
                    <MangaFrames frames={m.manga_frames} />

                    <VocabNotes items={vocab} className="mb-5 pb-4 border-b-2 border-black" />

                    {/* Questions */}
                    {isNonEmptyArray(m.questions) && (
                      <div className="space-y-6 mb-5">
                        {m.questions.map((q, qIdx) => {
                          const qLabel = q.id ?? q.question_number ?? q.number ?? (qIdx + 1);
                          const qText = toText(q.text || q.question || '');
                          const qKey = `${bIdx}-${qLabel}-${qIdx}`;
                          const correct = Number(q.correct_answer);
                          const isRevealed = mondaiRevealed[qKey];
                          const selectedOpt = mondaiAnswers[qKey];

                          return (
                            <div key={qKey} className="border-b pb-4 last:border-b-0">
                              {q.target && (
                                <span className="inline-block text-xs font-bold bg-gray-200 border border-gray-400 px-2 py-0.5 mb-1">{renderHtml(q.target)}</span>
                              )}
                              <h4 className="font-bold text-lg mb-4">{qLabel} {renderHtml(qText)}</h4>
                              <div className="space-y-2 mb-3">
                                {(q.options || []).map((opt, oIdx) => {
                                  const optNum = oIdx + 1;
                                  let optStyle = "border-gray-300 text-black";

                                  if (isRevealed) {
                                    if (optNum === correct) {
                                      optStyle = "bg-green-100 border-green-600 text-green-800 font-bold";
                                    } else if (optNum === selectedOpt && selectedOpt !== correct) {
                                      optStyle = "bg-red-100 border-red-600 text-red-800 line-through opacity-60";
                                    } else {
                                      optStyle = "border-gray-200 text-gray-400";
                                    }
                                  } else {
                                    optStyle += " hover:border-black hover:bg-gray-50 cursor-pointer";
                                  }

                                  return (
                                    <div
                                      key={oIdx}
                                      onClick={() => handleMondaiClick(qKey, oIdx)}
                                      className={`p-3 border-2 rounded-sm transition-colors flex flex-col items-stretch ${optStyle}`}
                                    >
                                      <div className="flex items-center justify-between w-full">
                                        <span>{renderHtml(optionLabel(opt, oIdx))}</span>
                                        {isRevealed && optNum === correct && (
                                          <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white shadow-sm shrink-0">
                                            ✓ 正解
                                          </span>
                                        )}
                                        {isRevealed && optNum === selectedOpt && selectedOpt !== correct && (
                                          <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded bg-rose-600 text-white shadow-sm shrink-0">
                                            ✕ 不正解
                                          </span>
                                        )}
                                      </div>

                                      {isRevealed && optNum === correct && q.explanation && q.explanation !== "No explanation available." && (
                                        <div className="mt-2 pt-2 border-t text-xs leading-relaxed opacity-90 border-green-300 text-green-950 font-normal text-left whitespace-pre-line">
                                          <span className="font-bold block mb-0.5">解説:</span>
                                          {renderHtml(q.explanation)}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Mondai Footnotes */}
                    {isNonEmptyArray(m.footnotes) && (
                      <div className="mt-5 pt-3 border-t-2 border-dotted border-gray-400 dark:border-gray-600">
                        <Footnotes items={m.footnotes} />
                      </div>
                    )}
                  </div>
                );
              });
            })()}
            
          </div>

        </div>

        {/* Next/Prev Click Zones Overlay */}
        {currentPage > 0 && (
          <div onClick={() => setCurrentPage(p => p - 1)} className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 hover:bg-black/5 cursor-pointer flex items-center justify-center transition-colors">
            <span className="text-4xl opacity-30">&lsaquo;</span>
          </div>
        )}
        {currentPage < totalPages - 1 && (
          <div onClick={() => setCurrentPage(p => p + 1)} className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 hover:bg-black/5 cursor-pointer flex items-center justify-center transition-colors">
            <span className="text-4xl opacity-30">&rsaquo;</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SomatomeN3Book;
