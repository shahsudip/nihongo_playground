const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && (p.title.includes('問題52') || p.title.includes('問題53'))) {
          // Replace max-w-3xl (768px) with max-w-[850px]
          p.passageText = p.passageText.replace(/max-w-3xl/g, 'w-full max-w-[850px]');
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully adjusted flyers to exact max-w-[850px] proportions!');
  }
}
