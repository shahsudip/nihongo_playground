const fs = require('fs');

const p44Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>今、一つの家で家族以外の人と一緒に暮らす、シェアハウスという住宅が増えている。シェアハウスとは、アパートのように自分用のかぎ付きの部屋はあるが、台所や居間、シャワー、トイレなどは共同で使う住宅である。</p>
    <p>家賃は周りのアパートなどと同じ程度だが、共同部分があるため、部屋に冷蔵庫などを置く必要がなく、自分の部屋を広く使える。また、一人暮らしの自由を楽しめるだけでなく、共同部分でほかの住人と交流ができるため、さびしさや不安も少なくなる。仕事も国も年齢も違う人と一緒に過ごせば、おもしろい発見があるかもしれない。</p>
    <p>ただし、快適に生活するためにはいくつか注意点がある。入る前に、必ず見学をして、そこに住んでいる人と自分の生活のしかたが合うかどうかを確認することだ。年齢や職業もチェックしたほうがいい。共同部分の使い方についても、どのような決まりになっているかを知っておきたい。掃除、音などで問題が起きることもあるからだ。また、ベッドなどの家具や洗濯機等の電気製品が付いているかどうかも確認したほうがいい。付いている場合は、入るときにこれまで持っていたものを手放さなければならず、出たあとは、買う必要がある。入る前に、以上の点に注意しておけば、失敗が少ないだろう。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m44Index = ch4.passages.findIndex(p => p.title.includes("44"));
  
  if (m44Index !== -1) {
    let m44 = ch4.passages[m44Index];
    m44.title = "第4部 問題44";
    m44.passageText = p44Html.trim();
    m44.passageLayout = "html";
    m44.mondaiHeader = "問題44　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m44.passageNotes = "";
    
    m44.questions = [
      {
        "id": "q44-1",
        "questionText": "問1 この文章のシェアハウスの説明と合っているものはどれか。",
        "options": [
          "家賃が周りのアパートより安い。",
          "一人一人が独立した部屋を持っている。",
          "一人一人に専用のトイレとシャワーがある。",
          "一人の部屋の広さがふつうのアパートより広い。"
        ],
        "correctOption": {
          "text": "一人一人が独立した部屋を持っている。",
          "explanation": "「自分用のかぎ付きの部屋はあるが…」と書かれているため、それぞれが独立した個室を持っているという2が正解です。"
        }
      },
      {
        "id": "q44-2",
        "questionText": "問2 シェアハウスのよい点はどんなところだと言っているか。",
        "options": [
          "共同部分では他の人と話ができるので、さびしくない。",
          "自分で掃除をしたり、ご飯を作ったりする必要がない。",
          "どのシェアハウスにも家具や電気製品がついている。",
          "同じような年齢や仕事の人と気を遣わずに住むことができる。"
        ],
        "correctOption": {
          "text": "共同部分では他の人と話ができるので、さびしくない。",
          "explanation": "「共同部分でほかの住人と交流ができるため、さびしさや不安も少なくなる」とあるため、1が正解です。"
        }
      },
      {
        "id": "q44-3",
        "questionText": "問3 シェアハウスに入るときの注意点で本文と合っているのはどれか。",
        "options": [
          "自分の生活のしかたが住んでいる人と合うかどうか、見学をして調べる。",
          "年齢や仕事が違う人が住んでいたら、そこには住まないほうがいい。",
          "共同部分の使い方について、自分で決まりを作らなければならない。",
          "ベッドや電気製品を持っていたら、必ず手放さなければならない。"
        ],
        "correctOption": {
          "text": "自分の生活のしかたが住んでいる人と合うかどうか、見学をして調べる。",
          "explanation": "「入る前に、必ず見学をして、そこに住んでいる人と自分の生活のしかたが合うかどうかを確認することだ」とそのまま書かれています。"
        }
      },
      {
        "id": "q44-4",
        "questionText": "問4 この文章を書いた人が伝えたいことは何か。",
        "options": [
          "シェアハウスは気をつけるべき点があり、住んでみて失敗する人が多い。",
          "シェアハウスは経済的で、住人同士の交流もあるので、増やすべきだ。",
          "シェアハウスはよい点が多いが、注意点を確認してから決めたほうがいい。",
          "シェアハウスでは一人の自由な時間がないが、他の住人と安心して住める。"
        ],
        "correctOption": {
          "text": "シェアハウスはよい点が多いが、注意点を確認してから決めたほうがいい。",
          "explanation": "前半でシェアハウスのよい点（一人暮らしの自由、交流など）を挙げ、後半で「ただし、快適に生活するためにはいくつか注意点がある」として確認すべき点（見学、ルールの確認、家具の有無など）を挙げているため、3が正解です。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 44!");
  } else {
    console.log("Could not find Mondai 44");
  }
}
