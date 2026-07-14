const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題48')) {
          // 1. Force passageLayout to html so the span tags render correctly
          p.passageLayout = 'html';
          
          // 2. Check Question 2 options
          let q2 = p.questions[1]; // 問2
          if (q2.options.length < 4) {
            // Restore missing option 4
            q2.options.push("富士山の一番上");
          }
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed Mondai 48 HTML rendering and missing option!');
  }
}
