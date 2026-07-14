const fs = require('fs');

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch3 = b.chapters.find(c => c.id === 'shinkanzen-ch-3-long');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  // Find all passages in Chapter 3 that are Mondai 33 and above
  // and move them to Chapter 4!
  
  let p33Index = ch3.passages.findIndex(p => p.title.includes("33"));
  if (p33Index !== -1) {
    // Extract everything from 33 onwards
    let part4Passages = ch3.passages.splice(p33Index);
    
    // Add them to Chapter 4 (before the mock test stuff which is 52+)
    ch4.passages = [...part4Passages, ...ch4.passages];
  }

  // Correct the chapter titles based on the official book structure!
  ch3.title = "第3部：情報検索 (Information Retrieval)";
  ch3.description = "Read advertisements, notices, graphs, and brochures to find specific information.";
  
  ch4.title = "第4部：実戦問題 (Practical Exercises)";
  ch4.description = "Full-length practice questions covering short, medium, and long passages.";

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Moved Mondai 33-51 to Part 4 and fixed chapter titles!");
}
