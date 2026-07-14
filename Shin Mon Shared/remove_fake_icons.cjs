const fs = require('fs');

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  // Chapter 4 contains 29, 30, 32, 33, 34
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  ch4.passages.forEach(p => {
    if (p.title.includes("29")) {
      // Fix Mondai 29: Keep ONLY 3 onigiris (since the book had an illustration of 3 onigiris)
      p.passageText = p.passageText.replace(
        /<div class="absolute bottom-4 right-4 text-6xl opacity-90 transform rotate-12 flex items-end">[\s\S]*?<\/div>/,
        '<div class="absolute bottom-4 right-4 text-6xl opacity-80 transform rotate-12 flex items-end"><span class="text-5xl -mr-4 z-10">🍙</span><span class="text-7xl">🍙</span><span class="text-5xl -ml-2 -mb-2 transform rotate-45">🍙</span></div>'
      );
    }
    else if (p.title.includes("30")) {
      // Remove rice plant
      p.passageText = p.passageText.replace(/<!-- Rice plant illustration hint -->[\s\S]*?<\/div>/, '');
    }
    else if (p.title.includes("32")) {
      // Remove envelope icon
      p.passageText = p.passageText.replace(/<!-- Subtle Envelope Icon -->[\s\S]*?<\/div>/, '');
    }
    else if (p.title.includes("33")) {
      // Remove lottery icon
      p.passageText = p.passageText.replace(/<!-- Lottery icon hint -->[\s\S]*?<\/div>/, '');
    }
    else if (p.title.includes("34")) {
      // Remove stress icon
      p.passageText = p.passageText.replace(/<!-- Stress \/ Brain illustration hint -->[\s\S]*?<\/div>/, '');
    }
  });

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Removed non-authentic icons from passages!");
}
