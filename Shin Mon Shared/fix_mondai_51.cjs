const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題51')) {
          p.passageLayout = 'html';
          
          p.passageText = `<p class="mb-4 indent-4">『花屋ダイヤリー』は一軒の花屋が舞台の小説です。花屋のアルバイト店員と、花を買いに来るさまざまな客との関わりが、ていねいに描かれています。</p>
<p class="mb-4 indent-4">作者の山口しずかは2012年に『一人』で小説最優秀賞を取った注目の女性作家です。若者の純粋さを、愛情を持って表現するところに人気があります。</p>
<p class="mb-4 indent-4">『花屋ダイヤリー』では、学校にも行かず仕事もしない17歳のユウが主人公(注1)です。何にも興味を持てなかったユウは、小さな花屋でアルバイトを始めます。そこには毎日、1輪だけ花を買いに来るおばあさんや、ゲーム機と交換に花を買いたいと言う小学生など、少し変わった客が次々と現れます。客はみなユウに花を選んでほしいと言います。困ったユウは、どうしてその花を買いたいのか、だれのための花なのかなど、<span class="underline underline-offset-4 decoration-gray-500">①事情を客にたずねます。</span></p>
<p class="mb-4 indent-4">客と話をするうちに、ユウは人との関係の大切さや働く意味など、いろいろなことを考え、変わりはじめます。何の喜びもない日々を送っていたユウが、働いて人の役に立つ中で明るく強くなっていく様子に、読者は<span class="underline underline-offset-4 decoration-gray-500">②元気づけられる</span>でしょう。それは作者から読者へのエール(注2)でもあります。また、たくさんの花の名前と花言葉(注3)が紹介されているので、だれかに花を贈るときに役に立つ知識も得られます。</p>
<p class="indent-4">人間関係に少し疲れているときや目標が見つけられないときに読むと、人が好きになり心が元気になる一冊です。ユウと同年代の人にぜひ読んでほしいです。</p>`;

          p.questions[1].questionText = p.questions[1].questionText.replace(/「その事情を客にたずねます。」/, '<span class="underline underline-offset-4 decoration-gray-500">①事情を客にたずねます。</span>');
          p.questions[2].questionText = p.questions[2].questionText.replace(/「元気づけられる」/, '<span class="underline underline-offset-4 decoration-gray-500">②元気づけられる</span>');
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully fixed Mondai 51!');
  }
}
