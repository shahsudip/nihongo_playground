const fs = require('fs');

const p25Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-400 font-sans shadow-md">
  <div class="flex justify-between items-start mb-6">
    <p class="text-sm md:text-base border-b border-gray-800 dark:border-gray-200 pb-1">国際ビルご利用の皆様</p>
    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">平成○○年7月1日</p>
  </div>
  
  <h2 class="text-xl md:text-2xl font-bold text-center mb-8 tracking-wide">エレベーター運転停止のお知らせ</h2>
  
  <p class="mb-8 text-sm md:text-base leading-loose indent-4">
    8月1日より8月7日までの下記の時間、国際ビルの北館、東館、西館では、エレベーターの点検を行います。点検中はエレベーターの利用ができませんので、ご注意ください。ご迷惑をおかけしますが、よろしくお願いいたします。
  </p>
  
  <!-- Section 1 -->
  <div class="mb-8 text-sm md:text-base">
    <h3 class="font-bold text-lg mb-2">１．点検予定日時</h3>
    <ul class="list-none space-y-1 ml-4 mb-4">
      <li>・○が点検予定日</li>
      <li>・時間は、各館8:00～10:00、22:00～24:00</li>
      <li>・△の日は講演会のため、8:00から10:00の点検は行いません。</li>
    </ul>
    
    <!-- Table -->
    <div class="overflow-x-auto ml-2 md:ml-8">
      <table class="border-collapse border border-gray-500 text-center text-sm md:text-base bg-[var(--color-bg-tertiary)] dark:bg-gray-700">
        <thead>
          <tr>
            <th class="border border-gray-500 p-2 md:p-3 min-w-[3rem]"></th>
            <th class="border border-gray-500 p-2 md:p-3 min-w-[3rem]">8/1</th>
            <th class="border border-gray-500 p-2 md:p-3 min-w-[3rem]">2</th>
            <th class="border border-gray-500 p-2 md:p-3 min-w-[3rem]">3</th>
            <th class="border border-gray-500 p-2 md:p-3 min-w-[3rem]">4</th>
            <th class="border border-gray-500 p-2 md:p-3 min-w-[3rem]">5</th>
            <th class="border border-gray-500 p-2 md:p-3 min-w-[3rem]">6</th>
            <th class="border border-gray-500 p-2 md:p-3 min-w-[3rem]">7</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-500 p-2 md:p-3 font-bold">東館</td>
            <td class="border border-gray-500 p-2 md:p-3">○</td>
            <td class="border border-gray-500 p-2 md:p-3">○</td>
            <td class="border border-gray-500 p-2 md:p-3">○</td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
          </tr>
          <tr>
            <td class="border border-gray-500 p-2 md:p-3 font-bold">西館</td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3">○</td>
            <td class="border border-gray-500 p-2 md:p-3">○</td>
            <td class="border border-gray-500 p-2 md:p-3">△</td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
          </tr>
          <tr>
            <td class="border border-gray-500 p-2 md:p-3 font-bold">北館</td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3"></td>
            <td class="border border-gray-500 p-2 md:p-3">△</td>
            <td class="border border-gray-500 p-2 md:p-3">○</td>
            <td class="border border-gray-500 p-2 md:p-3">○</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Section 2 -->
  <div class="mb-8 text-sm md:text-base">
    <h3 class="font-bold text-lg mb-2">２．ご注意</h3>
    <ul class="list-none space-y-1 ml-4">
      <li>・点検中はエスカレーターまたは階段をご利用ください。</li>
      <li>・東館と西館の5階は連絡通路で移動することができます。</li>
      <li>・南館については、9月に点検予定です。</li>
    </ul>
  </div>
  
  <!-- Section 3 -->
  <div class="text-sm md:text-base">
    <h3 class="font-bold text-lg mb-2">３．問い合わせ先</h3>
    <div class="flex gap-4 ml-4">
      <span class="w-32">国際ビル管理部</span>
      <span>TEL: 03-1111-2222</span>
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

  // Find Mondai 25 in Chapter 4
  let m25Index = ch4.passages.findIndex(p => p.title.includes("25"));
  if (m25Index !== -1) {
    let m25 = ch4.passages[m25Index];
    m25.title = "第3部 問題25";
    m25.passageText = p25Html.trim();
    m25.passageLayout = "html";
    m25.mondaiHeader = "問題25　つぎの文章は、エレベーター運転停止のお知らせである。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。"; // Educated guess based on pattern
    
    // Move it to Chapter 3 right after Mondai 24
    ch4.passages.splice(m25Index, 1);
    
    // Place at index 4 (after 21, 22, 23, 24)
    ch3.passages.splice(4, 0, m25);
    
    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Moved Mondai 25 to Part 3 and applied beautiful table layout!");
  } else {
    console.log("Could not find Mondai 25 in Chapter 4!");
  }
}
