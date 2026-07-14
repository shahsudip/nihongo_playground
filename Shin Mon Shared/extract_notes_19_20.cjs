const fs = require('fs');

let dbPath = 'src/data/book_data.jsx';
let data = fs.readFileSync(dbPath, 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch2 = b.chapters.find(c => c.id === 'shinkanzen-ch-2-medium');

  // Fix Mondai 19
  let m19 = ch2.passages.find(p => p.title === "第2部 問題19");
  if (m19 && m19.passageText.includes('(注1)災害')) {
    m19.passageNotes = `<p>(注1) 災害：地震・台風などの大きな被害が出る出来事</p><p>(注2) 駆ける：走る</p><p>(注3) しゃべる：話す</p>`;
    // Remove the notes from the main text
    m19.passageText = m19.passageText.replace(/\n+\(注1\)災害[\s\S]*/, '');
  }

  // Fix Mondai 20
  let m20 = ch2.passages.find(p => p.title === "第2部 問題20");
  if (m20 && m20.passageText.includes('(注1)生菓子')) {
    m20.passageNotes = `<p>(注1) 生菓子：水分を多く含んだお菓子</p>`;
    // Remove the notes from the main text
    m20.passageText = m20.passageText.replace(/\n+\(注1\)生菓子[\s\S]*/, '');
  }

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync(dbPath, data);
  console.log("Successfully extracted notes for Mondai 19 and 20!");
}
