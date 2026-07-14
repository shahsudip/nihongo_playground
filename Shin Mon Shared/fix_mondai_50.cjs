const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題50')) {
          p.passageLayout = 'html';
          
          p.passageText = `<p class="mb-4 indent-4">夏休みに私はある町を旅行した。そこは私が学生時代に大好きだった作家が生まれ、活躍した町である。いつかはそこをこの目で見てみたいと思っていたのが、やっと実現したのだった。</p>
<p class="mb-4 indent-4">もう彼が亡くなって何十年も経っているため、様子はすっかり変わってしまったはずである。それでも彼の小説の舞台となった、緑の美しい町を歩くのは楽しかった。だが、私が社会人になってからは、彼の書いたものをほとんど読まなくなったせいか、それ以上の感激はなく、正直に言うと、少し物足りない気持ちだった。</p>
<p class="mb-4 indent-4">ところが、ある記念館に入ったときのことである。そこでは、彼の書いた原稿(注1)や手紙の展示(注2)をしていた。それを見ているうちに、しだいに昔読んだ小説や詩の内容が思い出されてきた。特に、彼の妹が亡くなったときに書かれた、詩の原稿を読んだときには、彼の悲しみが痛いほど近くに感じられたのである。手書きの文字というのは、時間がどんなに流れていても、その人がどんな人だったのか、その人が何を感じていたかを強く表していることに気がついた。</p>
<p class="indent-4">字の下手な私は、できるだけパソコンを使っていた。だが、<span class="underline underline-offset-4 decoration-gray-500">それ以来</span>、時には下手でも心をこめて字を書くことで、何かが伝わるのではないかと思いはじめている。</p>`;

          p.questions[2].questionText = p.questions[2].questionText.replace(/「それ以来」/, '<span class="underline underline-offset-4 decoration-gray-500">それ以来</span>');
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed Mondai 50!');
  }
}
