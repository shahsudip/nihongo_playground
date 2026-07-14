const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      // ONLY APPLY TO PART 3 AS REQUESTED!
      if (c.title.includes('第3部')) {
        c.passages?.forEach(p => {
          if (p.questions && p.questions.length === 1) {
            let q = p.questions[0];
            let text = q.questionText;
            
            // Remove '質問'
            text = text.replace(/質問\s*[:：]?\s*/, '');
            
            // If it doesn't already have '問い', add it
            if (!text.startsWith('問い')) {
              text = '問い ' + text;
            } else {
              // Ensure there's a space after 問い if not present
              text = text.replace(/^問い\s*/, '問い ');
            }
            
            q.questionText = text;
          }
        });
      }
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Fixed Part 3 single question prefixes to 問い');
}
