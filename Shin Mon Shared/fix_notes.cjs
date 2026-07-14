const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        // Extract definitions at the bottom of the passageText
        // They look like (注1)ショックを受ける：ある原因でとても不安になる
        let lines = p.passageText.split('\n');
        let newTextLines = [];
        let noteLines = [];
        let inNotes = false;
        
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i];
          // If we hit a line that starts with (注1) at the start of the line, and we are near the end, we extract it.
          // Wait, sometimes there are multiple notes.
          if (line.match(/^\(注\d+\)/) && i > lines.length - 10) {
            inNotes = true;
          }
          
          if (inNotes) {
            if (line.trim() !== '') {
              noteLines.push(`<p>${line}</p>`);
            }
          } else {
            newTextLines.push(line);
          }
        }
        
        if (noteLines.length > 0) {
          p.passageText = newTextLines.join('\n').trim();
          p.passageNotes = (p.passageNotes ? p.passageNotes + '\n' : '') + noteLines.join('\n');
          console.log(`Extracted notes for ${p.title}`);
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  }
}
