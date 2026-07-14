const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      c.passages?.forEach(p => {
        // Fix 1: Restore truncated passageText for non-html layouts
        if (p.passageNotes && p.passageLayout !== 'html') {
          let rawNotes = p.passageNotes.replace(/<p>/g, '').replace(/<\/p>/g, '\n').trim();
          if (rawNotes) {
            p.passageText = p.passageText + '\n\n' + rawNotes;
          }
          delete p.passageNotes;
        }

        // Fix 2: Remove the double-box HTML wrapper for Mondai 36-45
        if (p.passageLayout === 'html' && p.passageText.includes('<div class="bg-white')) {
          // Extract the inner content
          let innerMatch = p.passageText.match(/<div class="space-y-4[^>]*>([\s\S]*?)<\/div>\s*<\/div>$/);
          if (innerMatch) {
            p.passageText = '<div class="space-y-4 text-sm md:text-base leading-loose indent-4">\n' + innerMatch[1].trim() + '\n</div>';
          } else {
             // Fallback for Mondai 41
             let innerMatch2 = p.passageText.match(/<div class="writing-vertical-rl[^>]*>([\s\S]*?)<\/div>\s*<\/div>$/);
             if (innerMatch2) {
               p.passageText = '<div class="writing-vertical-rl font-serif mx-auto text-sm md:text-base leading-loose max-h-[400px] flex flex-wrap content-start">\n' + innerMatch2[1].trim() + '\n</div>';
             }
          }
        }
      });
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Fixed book_data.jsx!');
}
