const fs = require('fs');

const p22Html = `
<div class="bg-gray-200 dark:bg-gray-800 p-4 md:p-8 rounded border-2 border-gray-400 font-sans shadow-md relative">
  <!-- Header -->
  <div class="text-center mb-6">
    <h2 class="text-xl md:text-2xl font-bold tracking-widest mb-1 text-gray-800 dark:text-gray-100">テニス教室 生徒募集！</h2>
    <p class="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300">一緒にテニスをしませんか？</p>
  </div>
  
  <!-- Illustration -->
  <div class="absolute top-12 right-6 md:right-12 text-6xl md:text-8xl opacity-80" style="transform: rotate(15deg);">
    🎾
  </div>

  <!-- Information Details -->
  <div class="space-y-2 mb-8 text-sm md:text-base pr-20 md:pr-40 relative z-10 leading-relaxed">
    <div><span class="font-bold w-20 md:w-28 inline-block">対象</span><span>：20歳以上。A市在住・在勤(注1)・在学(注2)</span></div>
    <div><span class="font-bold w-20 md:w-28 inline-block">期間</span><span>：4月～7月（各コース全15回）</span></div>
    <div><span class="font-bold w-20 md:w-28 inline-block">場所</span><span>：さくらテニスコート</span></div>
    <div><span class="font-bold w-20 md:w-28 inline-block">定員</span><span>：各クラス14人まで（定員になったらしめきり）</span></div>
    <div><span class="font-bold w-20 md:w-28 inline-block">費用</span><span>：3,000円</span></div>
    <div class="flex">
      <span class="font-bold w-20 md:w-28 flex-shrink-0">申し込み方法</span>
      <span>：往復はがき（1人1枚）に希望するクラス名、曜日、時間、住所、名前、電話番号を書いて、2月15日(水)までに下記までお送りください。結果は返信はがきで、3月中旬頃までに発送します。</span>
    </div>
  </div>

  <!-- Contact Info -->
  <div class="mb-8 space-y-1 text-sm md:text-base relative z-10">
    <p><span class="font-bold w-28 inline-block">はがきの宛て先</span>：〒101-2222　A市山田町2-2-2　さくらテニスクラブ</p>
    <p><span class="font-bold w-28 inline-block flex items-center gap-1">問い合わせ先</span>：☎ 033-111-2222</p>
  </div>

  <!-- Table Schedule -->
  <div class="overflow-x-auto relative z-10">
    <table class="w-full border-collapse border border-gray-400 dark:border-gray-500 text-center text-sm md:text-base">
      <thead>
        <tr class="bg-gray-300 dark:bg-gray-700">
          <th class="border border-gray-400 dark:border-gray-500 p-2"></th>
          <th class="border border-gray-400 dark:border-gray-500 p-2">時間</th>
          <th class="border border-gray-400 dark:border-gray-500 p-2">月</th>
          <th class="border border-gray-400 dark:border-gray-500 p-2">火</th>
          <th class="border border-gray-400 dark:border-gray-500 p-2">水</th>
          <th class="border border-gray-400 dark:border-gray-500 p-2">木</th>
          <th class="border border-gray-400 dark:border-gray-500 p-2">金</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-gray-400 dark:border-gray-500 p-2">1</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">9:00-10:20</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">初級 a</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">中上級</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2"></td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">初級 e</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">初級 f</td>
        </tr>
        <tr>
          <td class="border border-gray-400 dark:border-gray-500 p-2">2</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">10:40-12:00</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2"></td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">上級</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">初中級</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2"></td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">上級</td>
        </tr>
        <tr>
          <td class="border border-gray-400 dark:border-gray-500 p-2">3</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">15:00-16:20</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">中上級</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2"></td>
          <td class="border border-gray-400 dark:border-gray-500 p-2"></td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">初中級</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2"></td>
        </tr>
        <tr>
          <td class="border border-gray-400 dark:border-gray-500 p-2">4</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">17:00-18:20</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">中級 b</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">中級 c</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">初級 d</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">上級</td>
          <td class="border border-gray-400 dark:border-gray-500 p-2">中上級 g</td>
        </tr>
      </tbody>
    </table>
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

  // Find Mondai 22 in Chapter 4
  let m22Index = ch4.passages.findIndex(p => p.title.includes("22"));
  if (m22Index !== -1) {
    let m22 = ch4.passages[m22Index];
    m22.title = "第3部 問題22";
    m22.passageText = p22Html.trim();
    m22.passageLayout = "html";
    m22.mondaiHeader = "問題22　つぎの文章は教室の募集広告である。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    
    // Add notes outside
    m22.passageNotes = `<p>(注1) 在勤：そこで働いていること</p><p>(注2) 在学：そこで学校に通っていること</p>`;
    
    // Move it to Chapter 3 right after Mondai 21
    ch4.passages.splice(m22Index, 1);
    
    // Assuming 21 is at index 0, place 22 at index 1
    ch3.passages.splice(1, 0, m22);
    
    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Moved Mondai 22 to Part 3 and applied beautiful table layout!");
  } else {
    console.log("Could not find Mondai 22 in Chapter 4!");
  }
}
