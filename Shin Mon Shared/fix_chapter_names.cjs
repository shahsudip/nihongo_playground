const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');

const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');

  if (b) {
    let ch1 = b.chapters.find(c => c.id === 'shinkanzen-ch-1-short');
    if (ch1) ch1.title = '第1部 基礎力をつけよう';

    let ch2 = b.chapters.find(c => c.id === 'shinkanzen-ch-2-medium');
    if (ch2) ch2.title = '第2部 いろいろな文章を読もう';

    let ch3 = b.chapters.find(c => c.id === 'shinkanzen-ch-3-long');
    if (ch3) ch3.title = '第3部 広告・お知らせなどから情報を探そう';

    let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');
    if (ch4) ch4.title = '実戦問題';

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Titles updated to exact requested names from earlier today!");
  }
}
