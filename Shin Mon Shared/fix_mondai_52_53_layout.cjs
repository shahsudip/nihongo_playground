const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題52')) {
          p.passageText = `<div class="border-[3px] border-gray-400 p-3 max-w-3xl mx-auto font-sans bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-hidden shadow-md">
  <!-- Header -->
  <div class="bg-gray-300 dark:bg-gray-700 py-3 px-4 text-center text-lg md:text-xl font-bold tracking-wider rounded-sm">
    Sマート（24hオープン）は近くて便利！
  </div>
  
  <div class="flex flex-row justify-between items-center my-8 px-4 md:px-12">
    <!-- Left Speech Bubble -->
    <div class="relative border-[3px] border-gray-500 rounded-[100%] px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-gray-800 font-bold text-lg md:text-xl inline-block shadow-sm">
      6月の
      <!-- Small tail -->
      <div class="absolute -bottom-3 right-4 w-4 h-4 border-r-[3px] border-b-[3px] border-gray-500 bg-white dark:bg-gray-800 transform rotate-[15deg]"></div>
    </div>
    
    <!-- Right Tag -->
    <div class="relative">
      <!-- Tape/Pin -->
      <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-400 opacity-80 rotate-[-5deg] z-10 shadow-sm"></div>
      <div class="border-[3px] border-gray-500 px-4 md:px-6 py-2 md:py-3 font-bold text-base md:text-xl bg-white dark:bg-gray-800 shadow-sm relative rounded-sm">
        <div class="absolute left-2 top-2 w-1.5 h-1.5 rounded-full border border-gray-500 bg-white"></div>
        <div class="absolute right-2 top-2 w-1.5 h-1.5 rounded-full border border-gray-500 bg-white"></div>
        18時～24時だけ！
      </div>
    </div>
  </div>
  
  <div class="text-center text-3xl md:text-4xl font-black tracking-widest my-8">
    お得な割引セール！
  </div>
  
  <div class="border-[3px] border-gray-500 p-3 md:p-4 text-center mx-auto w-11/12 md:w-3/4 mb-10 font-bold text-lg md:text-xl bg-white dark:bg-gray-800 rounded-sm shadow-sm">
    セール期間： 2014年 6月2日(月)～6月28日(土)
  </div>
  
  <div class="text-sm md:text-lg space-y-3 mb-10 px-4 md:px-8 font-medium">
    <p>＊下の割引券は切って、かならず商品と一緒にレジにお出しください！</p>
    <p>＊この広告はお一人様１枚限りとさせていただきます。</p>
    <p>＊割引券１枚につき商品１個が割引となります。</p>
    <p>＊お店によっては、商品がない場合もあります。</p>
    <p>＊割引券が利用できるのは、18時～24時です。</p>
  </div>
  
  <!-- Dashed Table -->
  <div class="overflow-x-auto">
    <table class="w-full min-w-[500px] border-collapse text-center text-sm md:text-base border-t-[3px] border-b-[3px] border-gray-500 table-fixed">
      <thead>
        <tr class="border-b-[3px] border-gray-500 border-dashed bg-gray-50 dark:bg-gray-700">
          <th class="p-3 font-medium border-r-[3px] border-gray-500 border-dashed">2日(月)<br/>～14日(土)</th>
          <th class="p-3 font-medium border-r-[3px] border-gray-500 border-dashed">2日(月)<br/>～14日(土)</th>
          <th class="p-3 font-medium border-r-[3px] border-gray-500 border-dashed">15日(日)<br/>～28日(土)</th>
          <th class="p-3 font-medium">15日(日)<br/>～28日(土)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-4 align-top border-r-[3px] border-gray-500 border-dashed bg-white dark:bg-gray-800">
            <div class="font-bold text-base md:text-xl mb-4">チョコレート</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 my-2 tracking-widest">書かれた価格より</div>
            <div class="font-black text-xl md:text-3xl mt-4">30円引き</div>
          </td>
          <td class="p-4 align-top border-r-[3px] border-gray-500 border-dashed bg-white dark:bg-gray-800">
            <div class="font-bold text-base md:text-xl mb-4">ドーナッツ</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 my-2 tracking-widest">書かれた価格より</div>
            <div class="font-black text-xl md:text-3xl mt-4">20円引き</div>
          </td>
          <td class="p-4 align-top border-r-[3px] border-gray-500 border-dashed bg-white dark:bg-gray-800">
            <div class="font-bold text-base md:text-xl mb-4">アイスクリーム</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 my-2 tracking-widest">書かれた価格より</div>
            <div class="font-black text-xl md:text-3xl mt-4">20円引き</div>
          </td>
          <td class="p-4 align-top bg-white dark:bg-gray-800">
            <div class="font-bold text-base md:text-xl mb-4">ホットコーヒー</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 my-2 tracking-widest">書かれた価格より</div>
            <div class="font-black text-xl md:text-3xl mt-4">30円引き</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;
        }
        
        if (p.title && p.title.includes('問題53')) {
          p.passageText = `<div class="border-[4px] border-gray-500 p-4 md:p-8 max-w-3xl mx-auto font-sans bg-[#f3f4f6] dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md">
  <div class="mb-8">
    <div class="text-xl md:text-2xl font-bold tracking-widest">一緒にすし屋で働きませんか！</div>
    <div class="flex items-center justify-center gap-4 mt-6">
      <div class="text-3xl md:text-5xl font-black text-center tracking-widest" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
        アルバイト大募集！
      </div>
      <div class="text-5xl md:text-6xl transform rotate-12 opacity-90 drop-shadow-md">🍣</div>
    </div>
  </div>
  
  <div class="space-y-6 text-base md:text-xl font-medium mt-10">
    <div class="flex flex-col md:flex-row md:items-start border-b border-gray-300 pb-4">
      <div class="font-bold w-40 flex-shrink-0 tracking-widest bg-gray-200 dark:bg-gray-700 px-3 py-1 inline-block mb-2 md:mb-0 rounded-sm">職種(注1)</div>
      <div class="md:ml-4">：調理の手伝い</div>
    </div>
    
    <div class="flex flex-col md:flex-row md:items-start border-b border-gray-300 pb-4">
      <div class="font-bold w-40 flex-shrink-0 tracking-widest bg-gray-200 dark:bg-gray-700 px-3 py-1 inline-block mb-2 md:mb-0 rounded-sm">勤務時間・給与</div>
      <div class="md:ml-4 space-y-2">
        <div>：① 8:00 - 15:00 時給900円</div>
        <div class="ml-4 md:ml-6 text-gray-700 dark:text-gray-300">② 15:00 - 24:00 時給1,000円（時給は経験を考慮(注2)）</div>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row md:items-center justify-between ml-2 md:ml-8 mt-8 gap-8 border-b border-gray-300 pb-8">
      <div class="space-y-3 relative z-10 text-sm md:text-lg">
        <div class="flex items-start"><span class="mr-2">＊</span>週2日、1日5時間以上働ける方。</div>
        <div class="flex items-start"><span class="mr-2">＊</span>曜日、時間は相談に応じます。</div>
        <div class="flex items-start"><span class="mr-2">＊</span>経験のない方もOK！</div>
        <div class="flex items-start"><span class="mr-2">＊</span>主婦・学生の方歓迎。（高校生は不可）</div>
      </div>
      
      <!-- Pointing Speech Bubble -->
      <div class="relative border-[3px] border-gray-600 rounded-[50%] px-6 py-8 md:px-10 md:py-10 bg-white dark:bg-gray-700 text-sm md:text-base font-bold text-center shadow-lg rotate-[-5deg] tracking-widest shrink-0 max-w-[250px] mx-auto md:mx-0">
        少しでも興味ある方<br />はお電話ください！
        <!-- Tail pointing left on desktop, up on mobile -->
        <div class="hidden md:block absolute -left-5 top-1/2 transform -translate-y-1/2 w-8 h-8 border-t-[3px] border-l-[3px] border-b-[3px] border-gray-600 bg-white dark:bg-gray-700 skew-y-[20deg] rotate-[-45deg] rounded-bl-xl"></div>
        <div class="md:hidden absolute -top-5 left-1/2 transform -translate-x-1/2 w-8 h-8 border-t-[3px] border-l-[3px] border-gray-600 bg-white dark:bg-gray-700 rotate-45"></div>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row md:items-start border-b border-gray-300 pb-4 pt-4">
      <div class="font-bold w-40 flex-shrink-0 tracking-widest bg-gray-200 dark:bg-gray-700 px-3 py-1 inline-block mb-2 md:mb-0 rounded-sm">応募方法</div>
      <div class="md:ml-4">：お電話の上、履歴書（写真付）を持って面接にお越しください。</div>
    </div>
    
    <div class="flex flex-col md:flex-row md:items-start pt-4">
      <div class="font-bold w-40 flex-shrink-0 tracking-widest bg-gray-200 dark:bg-gray-700 px-3 py-1 inline-block mb-2 md:mb-0 rounded-sm">勤務地・連絡先</div>
      <div class="md:ml-4 w-full">
        <div>：A市山田町 2-2-1</div>
        <div class="text-center font-black text-xl md:text-3xl mt-8 mb-4 tracking-widest border-2 border-dashed border-gray-400 py-4 bg-white dark:bg-gray-800 rounded-lg">
          すしの吉野（山田店）<br class="md:hidden"/> TEL: 1111-3333
        </div>
      </div>
    </div>
  </div>
</div>`;
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully styled Mondai 52 and 53 responsively!');
  }
}
