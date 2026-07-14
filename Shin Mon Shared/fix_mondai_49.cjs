const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題49')) {
          p.passageLayout = 'html';
          
          p.passageText = `<p class="mb-4 indent-4">評論家という仕事がある。ある分野について深い知識を持ち、人々が参考にできるような解説や評価などをする仕事である。今では、政治評論家、経済評論家からラーメン評論家まで、あらゆる分野の評論家がテレビや雑誌などで活躍をしている。しかし、医者や学校の先生のように、評論家になるための資格試験があるわけではない。彼らは一体どうやって評論家になったのだろうか。</p>
<p class="mb-4 indent-4">彼らの多くは必ずしも評論をするために深い知識を得たのではない。若いころからある分野に対して人並み外れた(注1)知識や興味を持っており、夢中でそれを学ぶうちに、いつの間にかそれを仕事にすることになったという人も多い。好きな分野を仕事にできるとはうらやましい話だが、<span class="underline underline-offset-4 decoration-gray-500">①ただ人並み外れた深い知識があれば評論家になれるというものでもない</span>だろう。評論家として収入を得るためには、新聞や雑誌、テレビなどのマスメディア(注2)に取り上げられなければならない。</p>
<p class="mb-4 indent-4"><span class="underline underline-offset-4 decoration-gray-500">②マスメディアに取り上げられる</span>ためには、人々が納得し、話を聞きたくなるような説得力や魅力があること、さらに、マスメディアに登場するチャンスを得る運の強さも必要だろう。</p>
<p class="indent-4">人並み外れた知識、人々が言うことを聞きたくなるような説得力や魅力、そしてチャンスをつかむ運がそろって初めて評論家になれるのかもしれない。</p>`;

          p.questions[2].questionText = p.questions[2].questionText.replace(/「ただ人並み外れた深い知識があれば評論家になれるというものでもない」/, '①ただ人並み外れた深い知識があれば評論家になれるというものでもない');
          p.questions[3].questionText = p.questions[3].questionText.replace(/マスメディアに取り上げられる/, '②マスメディアに取り上げられる');
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed Mondai 49!');
  }
}
