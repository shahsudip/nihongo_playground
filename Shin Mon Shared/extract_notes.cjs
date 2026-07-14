const fs = require('fs');

// 1. Update React Component
let jsxPath = 'src/components/BookQuizTakerPage.jsx';
let jsx = fs.readFileSync(jsxPath, 'utf8');

// Add passageNotes extraction
jsx = jsx.replace(
  'mondaiHeader: passage.mondaiHeader || "",',
  'mondaiHeader: passage.mondaiHeader || "",\n                passageNotes: passage.passageNotes || "",'
);

// Render passageNotes outside the passage box
let renderBlock = `          {/* Optional Passage or Image rendering */}
        {(currentQ.passageText || currentQ.imageSrc) && (
          <div className="mb-6">
            <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)] max-h-[50vh] overflow-y-auto japanese-text custom-scrollbar">
              {currentQ.imageSrc && (
                <div className="text-center mb-3">
                  <img src={currentQ.imageSrc} alt="Passage" className="max-w-full h-auto rounded-lg mx-auto" />
                </div>
              )}
              {currentQ.passageText && (
                currentQ.passageLayout === 'html' ? (
                  <div dangerouslySetInnerHTML={{ __html: currentQ.passageText }} />
                ) : (
                  <div className="whitespace-pre-wrap leading-relaxed">{currentQ.passageText}</div>
                )
              )}
            </div>
            {currentQ.passageNotes && (
              <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 japanese-text" dangerouslySetInnerHTML={{ __html: currentQ.passageNotes }} />
            )}
          </div>
        )}`;

// Replace the old passage rendering block
// It starts from `{/* Optional Passage or Image rendering */}` to the next `          <div className="mb-6">`
jsx = jsx.replace(
  /\{\/\* Optional Passage or Image rendering \*\/\}[\s\S]*?(?=          <div className="mb-6">[\s\S]*?<div className="flex items-center gap-3 mb-3">)/,
  renderBlock + '\n\n'
);

fs.writeFileSync(jsxPath, jsx);

// 2. Update Database
let dbPath = 'src/data/book_data.jsx';
let data = fs.readFileSync(dbPath, 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch2 = b.chapters.find(c => c.id === 'shinkanzen-ch-2-medium');

  // Fix Mondai 15
  let m15 = ch2.passages.find(p => p.title === "第2部 問題15");
  if (m15 && m15.passageText.includes('(注1) 紅葉')) {
    m15.passageNotes = `<p>(注1) 紅葉：秋になって木の葉が赤くなること</p><p>(注2) 別便：別に送ったもの</p>`;
    // Remove it from the main text
    m15.passageText = m15.passageText.replace(/<div class="mt-4 text-sm text-gray-600 dark:text-gray-400">[\s\S]*?<\/div>/, '');
  }

  // Fix Mondai 17
  let m17 = ch2.passages.find(p => p.title === "第2部 問題17");
  if (m17 && m17.passageText.includes('(注1) 一口大')) {
    m17.passageNotes = `<p>(注1) 一口大：口に入るくらいの大きさ</p><p>(注2) だし汁：こんぶやかつおぶしで作ったスープ</p><p>(注3) 回し入れる：まるをかくようにして入れる</p>`;
    // Remove it from the main text
    m17.passageText = m17.passageText.replace(/<div class="text-xs md:text-sm text-gray-600 dark:text-gray-400 space-y-1">[\s\S]*?<\/div>/, '');
  }

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync(dbPath, data);
  console.log("Extracted notes into a separate field and updated UI rendering!");
}
