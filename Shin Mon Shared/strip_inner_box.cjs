const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.passageLayout === 'html' && p.passageText.includes('class="bg-white')) {
          // A more robust regex to remove the top level wrapper:
          // We will find the FIRST <div class="bg-white ..."> and remove it.
          // And we will remove the LAST </div> in the string.
          
          // First, replace the exact starting tag.
          p.passageText = p.passageText.replace(/<div class="bg-white[^>]+min-h-\[300px\]">/, '');
          
          // Then remove the very last </div>
          let lastDivIndex = p.passageText.lastIndexOf('</div>');
          if (lastDivIndex !== -1) {
            p.passageText = p.passageText.substring(0, lastDivIndex) + p.passageText.substring(lastDivIndex + 6);
          }
          
          // Trim any excess whitespace
          p.passageText = p.passageText.trim();
        }
      });
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Stripped inner wrappers!');
}
