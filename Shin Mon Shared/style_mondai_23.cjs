const fs = require('fs');

const p23Html = `
<div class="bg-white dark:bg-gray-800 p-4 md:p-8 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm">
  <h2 class="text-xl md:text-2xl font-bold text-center mb-4 tracking-widest text-gray-800 dark:text-gray-100">南みなと図書館　映画上映会</h2>
  
  <p class="mb-6 text-sm md:text-base leading-loose">
    南みなと図書館では、なつかしい映画や子どもを対象とした映画を無料で上映しています。ぜひみなさんでお越しください。
  </p>
  
  <div class="overflow-x-auto">
    <table class="w-full border-collapse border border-gray-400 dark:border-gray-500 text-sm md:text-base">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-700">
          <th class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 text-left w-1/6">名称</th>
          <th class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 text-left w-1/6">日時・場所</th>
          <th class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 text-left w-1/4">対象・定員・申込方法</th>
          <th class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 text-left w-5/12">内容</th>
        </tr>
      </thead>
      <tbody>
        <!-- Row 1 -->
        <tr>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            ①ラストダンスは君と
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            3月2日<br/>午後2時～<br/>3階多目的<br/>ホール
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            一般50名(申込必要：<br/>ネットかはがきで。先<br/>着順)
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            大学生の康太は無理やりダンス部に入<br/>れられて、先輩と大会に出ることに。<br/>爆笑恋愛コメディ。<br/><span class="font-bold">出演：大木健、中田真美</span>
          </td>
        </tr>
        
        <!-- Row 2 -->
        <tr>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            ②ドキドキ<br/>マシンをさ<br/>がせ
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            3月9日<br/>午後2時～<br/>2階集会室
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            児童、保護者<br/>先着30名(申込不要)
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            人間の心がわかるという機械を発明し<br/>た少年と悪の大王との戦い。<br/><span class="font-bold">出演：小林ゆうき・森雪菜。</span>
          </td>
        </tr>
        
        <!-- Row 3 -->
        <tr>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            ③トモばあ<br/>ちゃんの涙
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            3月16日<br/>午後3時～<br/>3階多目的<br/>ホール
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            一般50名(申込必要：<br/>ネットかはがきで。先<br/>着順)
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            一人暮らしのトモばあちゃんの家の前<br/>に赤ちゃんが。家族とは何かを問う問<br/>題作。<br/><span class="font-bold">出演：黒沢美香子、中村利男</span>
          </td>
        </tr>
        
        <!-- Row 4 -->
        <tr>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            ④ホヨヨン<br/>と楽しいお<br/>ともだち
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            3月23日<br/>午後3時～<br/>2階集会室
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            児童、保護者<br/>先着30名(申込不要)
          </td>
          <td class="border border-gray-400 dark:border-gray-500 p-2 md:p-3 leading-relaxed">
            世界的な人気者のクマ、ホヨヨンと元<br/>気な友だちのほのぼのアニメ。
          </td>
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

  // Find Mondai 23 in Chapter 4
  let m23Index = ch4.passages.findIndex(p => p.title.includes("23"));
  if (m23Index !== -1) {
    let m23 = ch4.passages[m23Index];
    m23.title = "第3部 問題23";
    m23.passageText = p23Html.trim();
    m23.passageLayout = "html";
    m23.mondaiHeader = "問題23　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    
    // Move it to Chapter 3 right after Mondai 22
    ch4.passages.splice(m23Index, 1);
    
    // Assuming 21 and 22 are at index 0 and 1, place 23 at index 2
    ch3.passages.splice(2, 0, m23);
    
    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Moved Mondai 23 to Part 3 and applied beautiful table layout!");
  } else {
    console.log("Could not find Mondai 23 in Chapter 4!");
  }
}
