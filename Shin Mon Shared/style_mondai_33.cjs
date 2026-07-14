const fs = require('fs');

const p33Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>3億円が当たる宝くじ<span class="text-xs">(注1)</span>がある。それが当たったのにお金を受け取らなかった人がいる。彼は70代の一人暮らしの男性で、受け取らない理由は「どう使えばいいかわからないから。」だそうだ。</p>
    <p>今は静かに生活をしていて、それに何の不満もない。彼が宝くじを買ったのは、亡くなった妻が宝くじを楽しんでいたためで、お金が欲しいからではなかった。3億円を受け取っても、それを分けるような子どもや親せきもいないし、高級車や大きな家を買う必要もない。それよりも、もし3億円を受け取ったら、その金を目的に人が寄ってきていろいろな問題が起きるかもしれない。楽しい事より大変な事が多いと考えたのだろう。</p>
    <p>何人もの人が受け取るようにすすめたが、彼の気持ちは変わらなかった。当たらない者から見たらもったいない話だが、彼はかしこい判断をしたのかもしれない。</p>
  </div>
  
  <!-- Lottery icon hint -->
  <div class="absolute bottom-4 right-4 text-6xl opacity-80 transform rotate-12 flex items-end">
    <span class="text-7xl">🎫</span>
    <span class="text-5xl -ml-4 -mb-2">💴</span>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m33Index = ch4.passages.findIndex(p => p.title.includes("33"));
  
  let newM33 = {
    "title": "第4部 問題33",
    "passageText": p33Html.trim(),
    "passageLayout": "html",
    "mondaiHeader": "問題33　つぎの文章を読んで質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "passageNotes": "<p>(注1)宝くじ：番号などのついた券を買い、当たれば賞金がもらえる。</p>",
    "questions": [
      {
        "id": "q33-1",
        "questionText": "問1 彼はどうして3億円の宝くじを買ったのか。",
        "options": [
          "3億円を何かに使う夢を見たかったから。",
          "亡くなった妻が宝くじが好きだったから。",
          "お金が欲しいと思ったから。",
          "楽しいことがあると思ったから。"
        ],
        "correctOption": {
          "text": "亡くなった妻が宝くじが好きだったから。",
          "explanation": "「彼が宝くじを買ったのは、亡くなった妻が宝くじを楽しんでいたためで、お金が欲しいからではなかった。」とはっきり書かれています。"
        }
      },
      {
        "id": "q33-2",
        "questionText": "問2 3億円が当たった後で彼はどうしようと思ったか。",
        "options": [
          "子どもや親せきと分けようと思った。",
          "高級車を買おうと思った。",
          "大きな家を買おうと思った。",
          "受け取らないことにしようと思った。"
        ],
        "correctOption": {
          "text": "受け取らないことにしようと思った。",
          "explanation": "最初の段落に「それが当たったのにお金を受け取らなかった人がいる」とあります。"
        }
      },
      {
        "id": "q33-3",
        "questionText": "問3 「彼はかしこい判断をしたのかもしれない。」とあるが、それはなぜか。",
        "options": [
          "何人もの人に相談して意見を聞いたから。",
          "面倒な問題が起きる可能性がなくなったから。",
          "お金を役立つように使おうとしたから。",
          "車や家を買って周りの人にあげようと思ったから。"
        ],
        "correctOption": {
          "text": "面倒な問題が起きる可能性がなくなったから。",
          "explanation": "「もし3億円を受け取ったら、その金を目的に人が寄ってきていろいろな問題が起きるかもしれない。楽しい事より大変な事が多いと考えたのだろう。」とあり、受け取らないことでその問題を回避できたため賢いと評価されています。"
        }
      }
    ]
  };

  if (m33Index !== -1) {
    ch4.passages[m33Index] = newM33;
    console.log("Replaced corrupted Mondai 33 with a fresh, perfect version!");
  } else {
    ch4.passages.push(newM33);
    console.log("Appended Mondai 33 to Chapter 4.");
  }

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
}
