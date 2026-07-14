const fs = require('fs');

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch3 = b.chapters.find(c => c.id === 'shinkanzen-ch-3-long');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  // 1. Remove duplicate '20' from ch3
  let ch3_20_index = ch3.passages.findIndex(p => p.title === "20");
  if (ch3_20_index !== -1) {
    ch3.passages.splice(ch3_20_index, 1);
  }

  // 2. Remove duplicates '第2部 問題16', '第2部 問題17', '第2部 問題18' from ch4
  ch4.passages = ch4.passages.filter(p => !p.title.startsWith('第2部'));

  // 3. Rename ch4 to 'Part 4: 情報検索 (Information Search)'
  ch4.title = '第4部：情報検索 (Information Search)';
  ch4.description = 'Find specific information from posters, schedules, flyers, and graphs.';

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Database cleaned and Chapter 4 ready for action!");
}
