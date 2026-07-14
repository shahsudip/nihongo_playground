const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        let titleMatch = p.title.match(/問題(\d+)/);
        if (titleMatch) {
          let num = parseInt(titleMatch[1]);
          if (num >= 46 && num <= 53) {
            let headerText = '';
            if (num === 51) {
              headerText = '問題51 つぎの文章は『花屋ダイヤリー』という小説についての紹介である。文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。';
            } else if (num === 53) {
              headerText = '問題53 つぎの文章は求人募集広告である。右の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。';
            } else {
              headerText = '問題' + num + ' つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。';
            }

            // Set the dedicated field
            p.mondaiHeader = headerText;
            
            // Remove the manually injected header from the passage text
            if (p.passageLayout === 'html') {
              let tag = '<p class="mb-8 font-bold text-lg">' + headerText + '</p>\\n';
              p.passageText = p.passageText.replace('<p class="mb-8 font-bold text-lg">' + headerText + '</p>\n', '');
            } else {
              p.passageText = p.passageText.replace(headerText + '\n\n', '');
            }
          }
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully moved headers from inside the passage box to the dedicated mondaiHeader field!');
  }
}
