const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    // 1. Extract all passages
    let allPassages = [];
    skmBook.chapters.forEach(c => {
      if (c.passages) {
        allPassages = allPassages.concat(c.passages);
      }
    });
    
    // 2. Clear chapter passages
    skmBook.chapters.forEach(c => c.passages = []);
    
    // 3. Sort all passages by Mondai number
    allPassages.sort((a, b) => {
      let numA = parseInt((a.title.match(/問題(\d+)/) || [0, 0])[1]);
      let numB = parseInt((b.title.match(/問題(\d+)/) || [0, 0])[1]);
      return numA - numB;
    });
    
    // 4. Distribute into correct chapters and update titles
    allPassages.forEach(p => {
      let numMatch = p.title.match(/問題(\d+)/);
      if (!numMatch) return;
      let num = parseInt(numMatch[1]);
      
      if (num >= 1 && num <= 13) {
        p.title = `第1部 問題${num}`;
        skmBook.chapters[0].passages.push(p);
      } else if (num >= 14 && num <= 20) {
        p.title = `第2部 問題${num}`;
        skmBook.chapters[1].passages.push(p);
      } else if (num >= 21 && num <= 28) { // Changed this to 28!!
        p.title = `第3部 問題${num}`;
        skmBook.chapters[2].passages.push(p);
      } else if (num >= 29) { // Changed this to 29!!
        p.title = `第4部 問題${num}`;
        skmBook.chapters[3].passages.push(p);
      }
    });
    
    // 5. Serialize and save
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed cutoff: 29 and 30 are back in Part 4!');
  }
}
