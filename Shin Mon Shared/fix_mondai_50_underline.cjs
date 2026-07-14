const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題50')) {
          p.passageText = p.passageText.replace(
            /それ以上の感激はなく、正直に言うと、少し物足りない気持ち/, 
            '<span class="underline underline-offset-4 decoration-gray-500">それ以上の感激はなく、正直に言うと、少し物足りない気持ち</span>'
          );
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully added the second underline to Mondai 50!');
  }
}
