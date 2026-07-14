const fs = require('fs');

const p21Html = `
<div class="bg-gray-100 dark:bg-gray-800 p-4 md:p-8 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-md">
  <div class="text-center mb-8">
    <h2 class="text-lg md:text-xl font-bold tracking-widest mb-2">バス1日乗車券と共通入場券の</h2>
    <div class="flex justify-center items-center gap-2">
      <span class="inline-block border-2 border-gray-800 dark:border-gray-200 px-4 py-1 text-xl md:text-2xl font-black bg-white dark:bg-gray-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]">お得な</span>
      <span class="text-xl md:text-2xl font-black">セット！</span>
    </div>
  </div>

  <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
    <!-- Left Ticket -->
    <div class="bg-white dark:bg-gray-700 p-4 border border-dashed border-gray-500 rounded text-center w-full md:w-auto relative">
      <div class="absolute -left-2 top-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full transform -translate-y-1/2"></div>
      <div class="absolute -right-2 top-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full transform -translate-y-1/2"></div>
      <p class="text-lg mb-1">○○市バス</p>
      <p class="text-xl font-bold mb-3">1日乗車券</p>
      <p class="text-2xl font-black text-right">700円</p>
    </div>

    <!-- Plus sign -->
    <div class="text-3xl font-black text-gray-500">+</div>

    <!-- Right Ticket -->
    <div class="bg-white dark:bg-gray-700 p-4 border border-dashed border-gray-500 rounded w-full md:w-auto relative">
      <div class="absolute -left-2 top-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full transform -translate-y-1/2"></div>
      <div class="absolute -right-2 top-1/2 w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full transform -translate-y-1/2"></div>
      <p class="text-lg font-bold mb-2 text-center border-b border-gray-300 pb-1">共通入場券</p>
      <div class="flex justify-between items-end gap-6 mb-1">
        <span>○○市歴史博物館</span>
        <span class="text-xl font-black">1,000円</span>
      </div>
      <div class="flex justify-between items-end gap-6">
        <span>現代美術館</span>
        <span class="text-xl font-black">900円</span>
      </div>
    </div>
  </div>

  <!-- Equation area -->
  <div class="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 relative">
    <p class="text-lg">あわせて <span class="font-bold line-through decoration-2 decoration-gray-500">2,600円</span></p>
    <p class="text-xl font-black">⇒ セットで買うと</p>
    <div class="relative">
      <div class="text-white bg-black dark:bg-white dark:text-black font-black text-2xl px-6 py-3" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);">2,200円</div>
      <!-- Speech bubble -->
      <div class="absolute -bottom-10 -right-8 md:-right-16 bg-white dark:bg-gray-900 border-2 border-gray-800 dark:border-gray-200 p-2 rounded-lg text-sm font-bold shadow-md z-10">
        400円<br/>もおトクです！
      </div>
    </div>
  </div>

  <!-- Bottom Details -->
  <div class="border-t-2 border-gray-400 dark:border-gray-500 pt-6 space-y-4">
    <div class="flex flex-col md:flex-row">
      <span class="font-bold md:w-32 flex-shrink-0">発売期間</span>
      <span>4月1日～6月30日</span>
    </div>
    <div class="flex flex-col md:flex-row">
      <span class="font-bold md:w-32 flex-shrink-0">発売場所</span>
      <div>
        <p>○○市バスの切符売り場（8:00～20:00）</p>
        <p>○○市歴史博物館、現代美術館の窓口（開館時間内）</p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row">
      <span class="font-bold md:w-32 flex-shrink-0">有効期間</span>
      <span>4月1日～6月30日のうち乗車券、入場券ともに購入日当日1日限り有効</span>
    </div>
    <div class="flex flex-col md:flex-row mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
      <span class="font-bold md:w-32 flex-shrink-0">〔お問い合わせ〕</span>
      <span>○○市観光課　0120-888888</span>
    </div>
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

  // Find Mondai 21
  let m21Index = ch4.passages.findIndex(p => p.title.includes("21"));
  if (m21Index !== -1) {
    let m21 = ch4.passages[m21Index];
    m21.title = "第3部 問題21";
    m21.passageText = p21Html.trim();
    m21.passageLayout = "html";
    m21.mondaiHeader = "問題21　つぎの文章は、駅に貼ってある割引の案内である。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    
    // Move it to Chapter 3
    ch4.passages.splice(m21Index, 1);
    
    // Sort logic to place it at the right spot in Chapter 3
    // Right now ch3 is empty of 21, so just append it to the front
    ch3.passages.unshift(m21);
    
    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Moved Mondai 21 to Part 3 and applied beautiful layout!");
  } else {
    console.log("Could not find Mondai 21 in Chapter 4!");
  }
}
