const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      c.passages?.forEach(p => {
        // Find any passage with a citation at the end of passageText
        const citationRegex = /<(div|p) class="[^"]*text-right[^"]*">.*?<\/\1>\s*$/s;
        const citationMatch = p.passageText.match(citationRegex);
        
        if (citationMatch) {
          const citationHTML = citationMatch[0];
          // Remove from passageText
          p.passageText = p.passageText.replace(citationRegex, '').trim();
          
          // Clean up the citation HTML to match passageNotes styling
          let cleanCitation = citationHTML.replace(/<div/g, '<p').replace(/<\/div>/g, '</p>');
          if (!cleanCitation.includes('mt-4')) {
             cleanCitation = cleanCitation.replace('class="', 'class="mt-4 ');
          }
          
          // Add to passageNotes
          if (p.passageNotes) {
             p.passageNotes = p.passageNotes + cleanCitation;
          } else {
             p.passageNotes = cleanCitation;
          }
        }
      });
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Moved all citations from passageText to passageNotes!');
}
