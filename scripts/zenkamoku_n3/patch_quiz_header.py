import sys

file_path = 'src/components/BookQuizTakerPage.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target_html = """          <div>
            <h1 className="text-xl font-bold">{bookTitle}</h1>
            <p className="text-sm text-[var(--color-text-muted)]">{chapter.title}</p>
          </div>"""

replacement_html = """          <div className="flex-1">
            {bookId === 'zenkamoku-n3-best-workbook' && chapter.weekTitle ? (
              <div className="flex flex-col gap-2 w-full max-w-2xl mb-2">
                <div className="flex items-stretch shadow-sm">
                   <div className="bg-[#1f2937] text-white px-4 py-2 font-bold text-lg rounded-l-md flex items-center justify-center border-r border-[#374151]">
                     {chapter.weekTitle}
                   </div>
                   <div className="bg-[#e5e7eb] dark:bg-[#d1d5db] text-black px-4 py-2 font-bold text-lg flex-1 flex items-center justify-between">
                     <span>{chapter.dayTitle}</span>
                     <div className="flex items-center gap-1">
                       <span className="text-xl">📅</span>
                       <span className="border-b border-black w-8 inline-block mx-1"></span>
                       <span className="text-sm">月</span>
                       <span className="border-b border-black w-8 inline-block mx-1"></span>
                       <span className="text-sm">日</span>
                     </div>
                   </div>
                </div>
                {chapter.sectionTitle && (
                  <div className="inline-flex self-start border-2 border-black dark:border-white px-3 py-1 font-bold bg-white dark:bg-[#111827] text-black dark:text-white rounded-sm mt-1 shadow-sm">
                    {chapter.sectionTitle} {chapter.sectionTitleEn ? ` ${chapter.sectionTitleEn}` : ''}
                  </div>
                )}
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold">{bookTitle}</h1>
                <p className="text-sm text-[var(--color-text-muted)]">{chapter.title}</p>
              </>
            )}
          </div>"""

if "bookId === 'zenkamoku-n3-best-workbook'" not in content:
    content = content.replace(target_html, replacement_html)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Successfully patched BookQuizTakerPage header!")
else:
    print("✅ Already patched.")
