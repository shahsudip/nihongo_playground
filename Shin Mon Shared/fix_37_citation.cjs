const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title === '第4部 問題37') {
          // Remove the specific div tag containing the citation
          p.passageText = p.passageText.replace(/<div class="text-right text-xs text-gray-500 mt-2">.*?<\/div>/s, '');
          
          // Append the book reference to passageNotes
          p.passageNotes = p.passageNotes + '<p class="text-right text-xs mt-4">（今井登茂子「うなずいて共感を表現」日本経済新聞朝刊2011年9月24日より）</p>';
        }
      });
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Fixed Mondai 37 citation location!');
}
