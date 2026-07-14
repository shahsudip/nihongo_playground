const fs = require('fs');

const p34Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>人間関係のこと、勉強や仕事のことなど、いろいろなストレスが原因で病気になることは少なくない。ストレスなど全くない生活をしてみたいものだが、なかなかそうはいかない。</p>
    <p>どうせストレスから逃げられないのならば、大きなストレスよりも、がまんできるぐらいの小さなストレスのほうがまだいいと思うだろう。しかし、専門家に言わせると、このがまんできるぐらいのストレスが一番問題なのだという。なぜなら、受けたストレスをがまんできると思うと、人はそれを解決せずそのままにしてしまうからだ。そして、そうしているうちに、心や体をこわしてしまうというのだ。反対に、大きなストレスはつらいものだが、何とかそれを解決しようという力を起こさせ、人が成長するきっかけになることも多いという。</p>
    <p>ストレスが心や体をこわす原因になるかどうかは、その大小ではなく、乗り越えようとする気持ちと関係があるようだ。</p>
  </div>
  
  <p class="text-right text-xs text-gray-500 mb-6">（岡本裕『一生、「薬がいらない体」のつくり方』三笠書房より）</p>
  
  <!-- Stress / Brain illustration hint -->
  <div class="absolute bottom-4 right-4 text-6xl opacity-80 transform rotate-12 flex items-end">
    <span class="text-7xl">🧠</span>
    <span class="text-5xl -ml-2 -mb-2">⚡</span>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m34Index = ch4.passages.findIndex(p => p.title.includes("34"));
  
  if (m34Index !== -1) {
    let m34 = ch4.passages[m34Index];
    m34.title = "第4部 問題34";
    m34.passageText = p34Html.trim();
    m34.passageLayout = "html";
    m34.mondaiHeader = "問題34　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    
    // Clean up the questions
    m34.questions = [
      {
        "id": "q34-1",
        "questionText": "問1 専門家はストレスについてどう言っているか。",
        "options": [
          "人間関係や勉強や仕事のことなどがストレスになる。",
          "ストレスが原因で体をこわすこともある。",
          "小さなストレスが一番困る。",
          "ストレスが全くない生活をするべきだ。"
        ],
        "correctOption": {
          "text": "小さなストレスが一番困る。",
          "explanation": "「しかし、専門家に言わせると、このがまんできるぐらいのストレスが一番問題なのだという。」と書かれています。"
        }
      },
      {
        "id": "q34-2",
        "questionText": "問2 「そうしているうちに」とあるが、これは何を指しているのか。",
        "options": [
          "大きなストレスをがまんしているうちに",
          "大きなストレスを解決しようとしているうちに",
          "小さなストレスをそのままにしているうちに",
          "ストレスが全くない生活をしているうちに"
        ],
        "correctOption": {
          "text": "小さなストレスをそのままにしているうちに",
          "explanation": "直前の文に「受けたストレスをがまんできると思うと、人はそれを解決せずそのままにしてしまうからだ。」とあるので、「小さなストレスをそのままにしているうちに」を指します。"
        }
      },
      {
        "id": "q34-3",
        "questionText": "問3 本文の内容と合っているものはどれか。",
        "options": [
          "小さくてがまんできるストレスならば何も心配いらない。",
          "ストレスが大きいと必ず心や体をこわしてしまう。",
          "小さなストレスでも解決しなければ心や体をこわす原因になる。",
          "大きなストレスは成長するきっかけになるから辛くない。"
        ],
        "correctOption": {
          "text": "小さなストレスでも解決しなければ心や体をこわす原因になる。",
          "explanation": "小さなストレスでも「解決せずそのままにしてしまう」と「心や体をこわしてしまうというのだ。」と書かれています。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Restyled Mondai 34 and restored the missing text!");
  }
}
