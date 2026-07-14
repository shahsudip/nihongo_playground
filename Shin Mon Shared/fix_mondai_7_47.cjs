const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        // Fix Mondai 7
        if (p.title && p.title.includes('問題7')) {
          p.passageText = p.passageText.replace(/簡単に表記\s*\n\s*\(注1\)/, '簡単に表記(注1)');
        }
        
        // Fix Mondai 47
        if (p.title && p.title.includes('問題47')) {
          p.passageText = `恋人や結婚相手の考えていることがわからないと言う人がときどきいる。しかし、相手に自分と同じような考えを期待するほうが間違っているのではないだろうか。

先日、男女の違いについておもしろい話を聞いた。それによると、いくつかの場面で、男性と女性の考え方や行動のしかたが大きく違うようだ。a)とb)のどちらが男性でどちらが女性のことを言っているか、考えながら読んでほしい。

1．買い物について
a) いつも200円のものが100円になっていると、必要がなくても買う。
b) いつも100円のものが200円になっていても、必要ならば買う。

2．将来について
a) 結婚するまでは将来について心配をしている。
b) 結婚するまでは将来について何も心配していない。

3．結婚について
a) 相手に変わってほしいと期待しているが、相手は変わらない。
b) 相手に変わらないでほしいと期待しているが、相手は変わる。

さて、a)とb)、どちらが男性で、どちらが女性か、すぐにわかっただろうか。a)が女性で、b)が男性なのだそうだ。確かに自分や自分の周りの人を見ていると、当たっているようにも思える。男女はもともと違うものだと考えたほうがよさそうだ。

相手は自分と違うのだから、違いを埋めていくための努力がなければ、よい関係を作ることはできないと思ったほうがいいだろう。`;
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed Mondai 7 and 47!');
  }
}
