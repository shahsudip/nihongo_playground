const fs = require('fs');

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let book = books.find(b => b.id === 'shinkanzen-master-n3-reading');

  if (book) {
    const ch1 = book.chapters.find(c => c.id === 'shinkanzen-ch-1-short');
    if (ch1) ch1.title = '第1部 内容理解（短文）';

    const ch2 = book.chapters.find(c => c.id === 'shinkanzen-ch-2-medium');
    if (ch2) ch2.title = '第2部 内容理解（中文）';

    const ch3 = book.chapters.find(c => c.id === 'shinkanzen-ch-3-long');
    if (ch3) ch3.title = '第3部 内容理解（長文）';

    const ch4 = book.chapters.find(c => c.id === 'shinkanzen-ch-4-email');
    if (ch4) ch4.title = '第4部 情報検索';

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Chapter titles successfully updated to official Japanese names!");
  }
}
