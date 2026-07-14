const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.passageNotes) {
          let oldNotesLines = p.passageNotes.split('\n');
          let actualNotes = [];
          let textLines = [];
          
          oldNotesLines.forEach(line => {
            // Check if the line is an actual definition. Usually has a full-width colon (：) or regular colon (:) near the start.
            // Example: <p>(注1)ショックを受ける：ある原因でとても不安になる</p>
            // We'll consider it a true note if it matches (注X) followed by something, then a colon.
            if (line.match(/^\s*<p>\(注\d+\).*?[：:].*?<\/p>\s*$/)) {
              actualNotes.push(line);
            } else {
              // It's a falsely extracted line from the passage!
              // Strip the <p> tags
              let cleanLine = line.replace(/^\s*<p>/, '').replace(/<\/p>\s*$/, '');
              textLines.push(cleanLine);
            }
          });
          
          if (textLines.length > 0) {
            // Append the falsely extracted text back to the passageText
            p.passageText += '\n' + textLines.join('\n');
          }
          
          // Set the true notes back
          if (actualNotes.length > 0) {
            p.passageNotes = actualNotes.join('\n');
          } else {
            delete p.passageNotes; // No real notes found
          }
          
          if (textLines.length > 0) {
            console.log(`Reverted false notes for ${p.title}`);
          }
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  }
}
