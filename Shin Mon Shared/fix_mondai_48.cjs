const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題48')) {
          // 1. Fix passage text
          p.passageText = `富士山は標高(注1)3,776メートルの日本一高い山で、世界文化遺産でもある。登山道が整備されているため、毎年何十万人もの人が山頂(注2)を目指すそうだ。私もツアーに参加して登ることにした。
登りはじめは楽だった。でも、3時間ぐらいすると、だんだん岩が多くなり、登りにくくなってきた。その上天気も悪くなり、前も後ろも真っ白で<span class="underline underline-offset-4 decoration-gray-500">①ほとんど見えなくなってしまった。</span>そこはちょうど雲の中だったのだそうだ。何も見えずに、ただ一歩ずつ前に進むしかなく、この時は不安でつらかった。しばらくすると、急に天気がよくなった。雲が移動したのではない。私たちが雲の上に出たのだ。足の下には雲が海のように広がっていた。素晴らしい景色を見たら元気が出てきて、目標の山小屋(注3)に予定時間に着くことができた。私たちはそこで一泊した。
次の朝、まだ暗いうちに山小屋を出発して山頂まで登ったが、<span class="underline underline-offset-4 decoration-gray-500">②そこ</span>では大勢の人が太陽を待っていた。やがて、薄暗かった空が次第に明るい青色になって、そして空の下の部分だけがオレンジ色に変わってきた。そして、太陽が静かに昇り始め、まぶしい光が伸びてきた。光はどんどん強くなり、私たちを照らした。山頂はとても寒かったが、太陽の光が当たって身体が温かくなるのを感じた。
富士山に登るのは大変だったが、登らなければできない素晴らしい経験がいくつもできた。毎年登る人もいると聞くが、その人たちの気持ちがよくわかる。`;

          // 2. Fix passage notes
          p.passageNotes = `<p>(注1)標高：海面からの高さ</p>\n<p>(注2)山頂：山の一番上</p>\n<p>(注3)山小屋：山にある宿泊や休憩や避難などができる施設</p>`;

          // 3. Fix questions
          p.questions[0].questionText = p.questions[0].questionText.replace(/「ほとんど見えなくなってしまった。」/, '①ほとんど見えなくなってしまった。');
          p.questions[1].questionText = p.questions[1].questionText.replace(/「そこ」/, '②そこ');
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed Mondai 48!');
  }
}
