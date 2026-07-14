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
          // Replace max-w-3xl with w-full max-w-5xl to give it much more breathing room
          p.passageText = p.passageText.replace(/max-w-3xl/g, 'w-full max-w-[1000px]');
          
          // For Mondai 53 specifically, adjust some paddings that might be too heavy
          if (p.title.includes('問題53')) {
            p.passageText = p.passageText.replace(/px-6 py-8 md:px-10 md:py-10/, 'px-8 py-6 md:px-12 md:py-12');
          }
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully increased the width of the flyers to reduce congestion!');
  }
}
