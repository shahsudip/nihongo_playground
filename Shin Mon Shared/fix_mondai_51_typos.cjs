const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題51')) {
          // Fix Question 1 typo
          if (p.questions && p.questions[0]) {
            p.questions[0].questionText = p.questions[0].questionText.replace('言われているか', '書かれているか');
          }
          
          // Fix Note typos
          if (p.passageNotes) {
            p.passageNotes = p.passageNotes
              .replace('物語などの中心人物', '小説などの中心人物')
              .replace('声・言葉', '声・声援');
          }
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed typos in Mondai 51 notes and Q1!');
  }
}
