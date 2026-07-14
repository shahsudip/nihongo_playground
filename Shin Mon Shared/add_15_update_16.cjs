const fs = require('fs');

// HTML for Mondai 15 (Vertical text letter layout)
const p15Html = `
<div class="bg-gray-200 dark:bg-gray-800 p-6 border border-gray-400 border-dashed rounded font-serif" style="writing-mode: vertical-rl; text-orientation: upright; height: 450px; overflow-x: auto; max-width: 100%;">
  <p class="mb-4">拝啓</p>
  <p class="mb-4 indent-4">紅葉(注1)がきれいな季節になってきました。皆さま、お元気でお過ごしのことと思います。</p>
  <p class="mb-4 indent-4">先日は久しぶりにチャンさんにお会いすることができて、とてもうれしかったです。仕事も順調に進んでいるとうかがい、安心しました。また、ソナちゃんがかわいい小学生になっていてびっくりしました。</p>
  <p class="mb-4 indent-4">さて、その時にお話しした本を別便(注2)でお送りしました。これは、私にはもう必要ないので、さしあげます。どうぞ受け取ってください。チャンさんのお仕事の役に立てばうれしいです。</p>
  <p class="mb-4 indent-4">これから寒くなってきますが、どうぞお体にお気をつけてお過ごしください。</p>
  <p class="text-right mb-6">敬具</p>
  <p class="mb-4 mt-8">二〇二四年十月二十五日</p>
  <p class="mb-4 text-right">高木まなみ</p>
  <p class="mt-8 font-bold">チャン・ジヨン様</p>
</div>
<div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
  <p>(注1) 紅葉：秋になって木の葉が赤くなること</p>
  <p>(注2) 別便：別に送ったもの</p>
</div>
`;

const p15Q = {
  questionText: "この手紙の内容について、正しいのはどれか。",
  options: [
    "高木さんはチャンさんに、自分の本をあげると言っている。",
    "高木さんはチャンさんに、自分の本を貸してあげると言っている。",
    "高木さんはチャンさんの子どもに、本を受け取ってほしいと言っている。",
    "高木さんはチャンさんに、本を受け取りに来てほしいと言っている。"
  ],
  correctOption: { index: 0, text: "高木さんはチャンさんに、自分の本をあげると言っている。" },
  explanation: "Official Answer Key verified."
};

// HTML for Mondai 16 (Shaded box layout just like the screenshot)
const p16Html = `
<div class="mb-4">職場でコピーを取ろうとしたら、コピー機に以下のようなメモが貼ってあった。</div>
<div class="bg-gray-200 dark:bg-gray-800 p-6 border-2 border-gray-400 border-dashed rounded text-sm md:text-base leading-loose font-sans">
  <p class="text-lg font-bold mb-4">このコピー機は故障中です。</p>
  <p class="mb-2">修理の人が11時ごろ来ます。</p>
  <p class="mb-6">修理が問題なく終われば、午後から使えるようになります。</p>
  
  <p class="mb-2">お急ぎの方は、5階の第一事務室か、5階の第二事務室か、<br/>4階の資料準備室のものをお使いください。</p>
  <p class="mb-2">ただし、5階の第一事務室は、混んでいるので、20枚以上のコピーは<br/>ご遠慮ください。</p>
  <p class="mb-4">第二事務室のコピー機はA3サイズが取れません。</p>
  <p>また、4階の資料準備室はカギがかかっていますので、<br/>となりの資料管理室でカギを借りてください。</p>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);
if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch2 = b.chapters.find(c => c.id === 'shinkanzen-ch-2-medium');

  // We need to inject Mondai 15 between Mondai 14 and Mondai 16
  const newMondai15 = {
    title: "第2部 問題15",
    mondaiHeader: "問題15　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    passageText: p15Html.trim(),
    passageLayout: "html",
    questions: [p15Q]
  };

  // Find Mondai 16 to update it
  let m16 = ch2.passages.find(p => p.title === "第2部 問題16");
  if (m16) {
    m16.passageText = p16Html.trim();
    m16.passageLayout = "html";
  }

  // Find index of Mondai 14
  let idx14 = ch2.passages.findIndex(p => p.title === "第2部 問題14");
  
  // Check if Mondai 15 is already there
  let has15 = ch2.passages.some(p => p.title === "第2部 問題15");
  if (!has15) {
    ch2.passages.splice(idx14 + 1, 0, newMondai15);
  }

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Mondai 15 added and Mondai 16 updated with layout!");
}
