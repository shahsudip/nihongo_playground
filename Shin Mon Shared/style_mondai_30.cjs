const fs = require('fs');

const p30Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>日本人は集団主義だとよく言われる。つまり、個人よりもみんなで行動することや、みんなのために行動することを大切にするというのだ。</p>
    <p>それにはさまざまな原因があるが、その一つに日本人が昔から「稲作<span class="text-xs">(注1)</span>」を行ってきたことがあると言われている。稲作では田植えや収穫など、みんなで一度に行う作業が多い。また、より多くの稲を上手に育てるには、稲作で使う水を個人の田んぼだけではなく、地域全体を考えて管理する必要がある。</p>
    <p>このような稲作を何千年も続ける中で、日本社会では「みんな」がとても重要な基準になっていったのだろう。</p>
  </div>
  
  <!-- Rice plant illustration hint -->
  <div class="absolute bottom-4 right-4 text-6xl opacity-80 transform rotate-12 flex items-end">
    <span class="text-7xl text-yellow-600">🌾</span>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m30 = {
    "title": "第4部 問題30",
    "passageText": p30Html.trim(),
    "passageLayout": "html",
    "mondaiHeader": "問題30　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "passageNotes": "<p>(注1)稲作：米を作ること</p>",
    "questions": [
      {
        "id": "q30-1",
        "questionText": "問い どうして日本人は集団主義になったと書かれているか。",
        "options": [
          "何千年も米を食べ続けているから。",
          "昔から協力して飲み水を管理してきたから。",
          "自分の田んぼで上手に稲を作ろうと競争してきたから。",
          "みんなでする作業が多い稲作を続けてきたから。"
        ],
        "correctOption": {
          "text": "みんなでする作業が多い稲作を続けてきたから。",
          "explanation": "「稲作では田植えや収穫など、みんなで一度に行う作業が多い。」「このような稲作を何千年も続ける中で、日本社会では『みんな』がとても重要な基準になっていったのだろう。」と書かれています。"
        }
      }
    ]
  };

  // Find index of Mondai 29 in Chapter 4, and insert Mondai 30 right after it.
  let m29Index = ch4.passages.findIndex(p => p.title.includes("29"));
  if (m29Index !== -1) {
    ch4.passages.splice(m29Index + 1, 0, m30);
  } else {
    // If not found for some reason, just put it at index 1
    ch4.passages.splice(1, 0, m30);
  }

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Reconstructed Mondai 30 and inserted it into Chapter 4 after Mondai 29!");
}
