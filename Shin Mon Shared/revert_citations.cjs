const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  books.forEach(b => {
    b.chapters.forEach(c => {
      c.passages?.forEach(p => {
        // We need to move the citation BACK from passageNotes to passageText
        // Look for the citation in passageNotes
        if (p.passageNotes) {
          const citationRegex = /<p class="mt-4 text-right[^>]*>.*?<\/p>$/s;
          const citationRegex2 = /<p class="text-right[^>]*mt-4[^>]*>.*?<\/p>$/s;
          const match1 = p.passageNotes.match(citationRegex);
          const match2 = p.passageNotes.match(citationRegex2);
          const citationMatch = match1 || match2;
          
          if (citationMatch) {
            const citationHTML = citationMatch[0];
            // Remove from notes
            p.passageNotes = p.passageNotes.replace(citationHTML, '').trim();
            
            // Reformat it back to div
            let cleanCitation = citationHTML.replace(/<p/g, '<div').replace(/<\/p>/g, '</div>');
            cleanCitation = cleanCitation.replace('mt-4 text-right', 'text-right'); // adjust class if needed
            
            // Put it back at the end of passageText, inside the main div if there is one
            if (p.passageText.endsWith('</div>')) {
              p.passageText = p.passageText.substring(0, p.passageText.length - 6) + '\n    ' + cleanCitation + '\n</div>';
            } else {
              p.passageText = p.passageText + '\n' + cleanCitation;
            }
          }
        }
      });
    });
  });
  const serialized = JSON.stringify(books, null, 2);
  fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
  console.log('Reverted citations back to passageText!');
}
