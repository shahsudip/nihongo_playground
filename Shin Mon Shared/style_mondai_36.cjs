const fs = require('fs');

const p36Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>町やビルで見かける飲み物の自動販売機は便利だが、夜、だれも使っていないのに、明かりがついているのを見ると、電気代をむだ使いしているように感じられる。</p>
    <p>しかし、実は、自動販売機はエネルギーを節約する技術が非常に進んでいる機械である。そこには、どのような工夫があるのだろうか。</p>
    <p>まず、冷たい飲み物は、全部を冷やすのではなく、売る直前の分だけ冷やすようになっている。自動販売機の中にあるコンピューターが、曜日や時間による売れ方の変化を見て、最小限の数だけを冷やすのである。だから、電気代が少なくてすむ。</p>
    <p>また、冷たい飲み物と温かい飲み物を同時に売る自動販売機の場合、冷たい飲み物を冷やしたときに出る熱を使って、温かい飲み物を温めることができるようになっている。</p>
    <p>以上のようなさまざまな技術によって、自動販売機は電力の消費を減らすことができたのである。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m36Index = ch4.passages.findIndex(p => p.title.includes("36"));
  
  if (m36Index !== -1) {
    let m36 = ch4.passages[m36Index];
    m36.title = "第4部 問題36";
    m36.passageText = p36Html.trim();
    m36.passageLayout = "html";
    m36.mondaiHeader = "問題36　つぎの文章を読んで質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m36.passageNotes = "";
    
    m36.questions = [
      {
        "id": "q36-1",
        "questionText": "問1 自動販売機が電気をむだ使いしているように見えるのはなぜか。",
        "options": [
          "自動販売機のエネルギーを節約する技術がなかなか進まないから。",
          "だれも使っていないときも、明かりがついているから。",
          "昼だけでなく、夜になっても使う人がいるから。",
          "町やビルなどさまざまな場所にたくさん置いてあるから。"
        ],
        "correctOption": {
          "text": "だれも使っていないときも、明かりがついているから。",
          "explanation": "第一段落に「夜、だれも使っていないのに、明かりがついているのを見ると、電気代をむだ使いしているように感じられる」とあります。"
        }
      },
      {
        "id": "q36-2",
        "questionText": "問2 自動販売機の飲み物の冷やし方として、正しいものはどれか。",
        "options": [
          "急に冷やすのではなく、コンピューターで管理しながらゆっくり冷やす。",
          "コンピューターによって、売る直前に短い時間で冷やす。",
          "コンピューターが外の温度の変化を調べて、冷やす。",
          "コンピューターでいつどのぐらい売れるかがわかるので、その分だけ冷やす。"
        ],
        "correctOption": {
          "text": "コンピューターでいつどのぐらい売れるかがわかるので、その分だけ冷やす。",
          "explanation": "本文に「コンピューターが、曜日や時間による売れ方の変化を見て、最小限の数だけを冷やすのである」とあるため、4が正解です。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 36, fixing all OCR errors and mapping correct answers!");
  } else {
    console.log("Could not find Mondai 36");
  }
}
