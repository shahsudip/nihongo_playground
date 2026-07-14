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
          p.questions[0].questionText = p.questions[0].questionText.replace(/①ほとんど見えなくなってしまった。/, '<span class="underline underline-offset-4 decoration-gray-500">①ほとんど見えなくなってしまった。</span>');
          p.questions[1].questionText = p.questions[1].questionText.replace(/②そこ/, '<span class="underline underline-offset-4 decoration-gray-500">②そこ</span>');
        }
        if (p.title && p.title.includes('問題49')) {
          p.questions[2].questionText = p.questions[2].questionText.replace(/①ただ人並み外れた深い知識があれば評論家になれるというものでもない/, '<span class="underline underline-offset-4 decoration-gray-500">①ただ人並み外れた深い知識があれば評論家になれるというものでもない</span>');
          p.questions[3].questionText = p.questions[3].questionText.replace(/②マスメディアに取り上げられる/, '<span class="underline underline-offset-4 decoration-gray-500">②マスメディアに取り上げられる</span>');
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed question underlines for Mondai 48 and 49!');
  }
}
