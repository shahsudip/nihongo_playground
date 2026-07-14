const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (!p.questions || p.questions.length === 0) return;
        
        if (p.questions.length === 1) {
          let q = p.questions[0];
          // Remove existing "問1", "質問", etc at the beginning
          let cleaned = q.questionText.replace(/^(問\d+|質問)[:\s　]*/, '');
          q.questionText = '質問 ' + cleaned;
        } else {
          p.questions.forEach((q, idx) => {
            let qNum = idx + 1;
            // Remove existing prefixes
            let cleaned = q.questionText.replace(/^(問\d+|質問)[:\s　]*/, '');
            q.questionText = `問${qNum} ` + cleaned;
          });
        }
      });
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Fixed question prefixes!');
}
