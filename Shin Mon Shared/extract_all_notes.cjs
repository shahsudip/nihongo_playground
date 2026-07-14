const fs = require('fs');

let dbPath = 'src/data/book_data.jsx';
let data = fs.readFileSync(dbPath, 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');

  let updatedCount = 0;

  b.chapters.forEach(chapter => {
    chapter.passages?.forEach(passage => {
      if (!passage.passageText) return;
      
      // Look for the first occurrence of (注1) or (注) at the start of a line
      // Since it's usually at the end of the text.
      const noteRegex = /(?:\n\s*)*(\(注\d*?\).*)$/s;
      const noteMatch = passage.passageText.match(noteRegex);

      if (noteMatch) {
        let rawNotes = noteMatch[1];
        
        // Only extract if passageNotes doesn't already exist or if we want to overwrite
        // Let's format the rawNotes into <p> tags
        let formattedNotes = rawNotes.split('\n')
                                     .map(line => line.trim())
                                     .filter(line => line.length > 0)
                                     .map(line => `<p>${line}</p>`)
                                     .join('');
                                     
        // Don't overwrite if it already has html-formatted notes that we made manually, 
        // unless it's just raw text. But we can just do it safely if it matches.
        
        passage.passageNotes = formattedNotes;
        passage.passageText = passage.passageText.replace(noteRegex, '').trim();
        console.log(`Extracted notes from: ${passage.title}`);
        updatedCount++;
      }
    });
  });

  if (updatedCount > 0) {
    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync(dbPath, data);
    console.log(`Successfully extracted notes for ${updatedCount} passages!`);
  } else {
    console.log("No new notes found to extract.");
  }
}
