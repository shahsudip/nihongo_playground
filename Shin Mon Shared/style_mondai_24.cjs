const fs = require('fs');

const p24Html = `
<div class="bg-[var(--color-bg-secondary)] dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-md">
  <h2 class="text-xl md:text-2xl font-bold text-center mb-8 tracking-widest text-gray-800 dark:text-gray-100">ミニ・コンサートのご案内</h2>
  
  <div class="space-y-4 mb-6 text-sm md:text-base leading-loose text-gray-800 dark:text-gray-200">
    <p>秋も日一日と深まり、紅葉も美しくなり始めました。</p>
    <p>私たち「さくら合唱(注1)クラブ」は日本の歌を愛する社会人混声(注2)合唱のクラブです。このたび秋の歌を集めて、ミニ・コンサートを開催することになりました。</p>
    <p>どうぞ日本の歌の美しさをお楽しみください。ご来場をお待ちしています。</p>
  </div>
  
  <div class="text-right mb-10 text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
    <p>平成XX年　10月25日</p>
    <p>さくら合唱クラブ発表会実行委員</p>
  </div>
  
  <div class="space-y-3 mb-8 text-sm md:text-base text-gray-800 dark:text-gray-200 ml-4 md:ml-8">
    <div class="flex">
      <span class="w-20 md:w-24 inline-block font-bold">日時：</span>
      <div>
        <p>11月12日（土）</p>
        <div class="flex gap-4 mt-1">
          <span>開場 15:00</span>
          <span>開演 15:30</span>
        </div>
      </div>
    </div>
    <div class="flex">
      <span class="w-20 md:w-24 inline-block font-bold">場所：</span>
      <span>○○市民ホール</span>
    </div>
    <div class="flex">
      <span class="w-20 md:w-24 inline-block font-bold">入場料：</span>
      <span>300円</span>
    </div>
  </div>
  
  <div class="mb-8 text-sm md:text-base text-gray-800 dark:text-gray-200">
    <p class="font-bold mb-2">☆お願い☆</p>
    <ul class="list-none space-y-1 ml-2">
      <li>・自転車・車でのご来場はご遠慮ください。</li>
      <li>・上演中のフラッシュ撮影はご遠慮ください。</li>
      <li>・ビデオ撮影はビデオ席でお願いします。</li>
      <li>・小さいお子様をお連れの方は、他のお客様のご迷惑にならないようにご注意ください。</li>
      <li>・携帯電話等の電源はお切りください。</li>
    </ul>
  </div>
  
  <div class="border-t border-gray-400 dark:border-gray-500 pt-6 text-sm md:text-base text-gray-800 dark:text-gray-200">
    <p class="font-bold mb-2">☆メンバー募集☆　私たちと一緒に歌いませんか？</p>
    <p class="ml-4">参加ご希望の方は山田（tel:090-9387-○○○○）までご連絡ください。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch3 = b.chapters.find(c => c.id === 'shinkanzen-ch-3-long');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  // Find Mondai 24 in Chapter 4
  let m24Index = ch4.passages.findIndex(p => p.title.includes("24"));
  if (m24Index !== -1) {
    let m24 = ch4.passages[m24Index];
    m24.title = "第3部 問題24";
    m24.passageText = p24Html.trim();
    m24.passageLayout = "html";
    m24.mondaiHeader = "問題24　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    
    // Add notes outside
    m24.passageNotes = `<p>(注1) 合唱：大ぜいで歌うこと</p><p>(注2) 混声：男性と女性の声</p>`;
    
    // Move it to Chapter 3 right after Mondai 23
    ch4.passages.splice(m24Index, 1);
    
    // Place at index 3 (after 21, 22, 23)
    ch3.passages.splice(3, 0, m24);
    
    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Moved Mondai 24 to Part 3 and applied beautiful layout!");
  } else {
    console.log("Could not find Mondai 24 in Chapter 4!");
  }
}
