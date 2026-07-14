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
          p.passageLayout = 'html';
          
          let headerText = '問題52 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。';
          
          p.passageText = '<p class="mb-8 font-bold text-lg">' + headerText + '</p>' + 
`<div class="border-2 border-gray-400 p-2 max-w-3xl mx-auto font-sans bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-hidden relative">
  <!-- Header -->
  <div class="bg-gray-300 dark:bg-gray-700 py-3 px-4 text-center text-lg md:text-xl font-bold tracking-wider">
    Sマート（24hオープン）は近くて便利！
  </div>
  
  <div class="relative mt-8 mb-4 h-24">
    <!-- Left Speech Bubble -->
    <div class="absolute left-12 top-0">
      <div class="relative border-[3px] border-gray-500 rounded-full px-8 py-3 bg-white dark:bg-gray-800 font-bold text-lg inline-block">
        6月の
        <div class="absolute -bottom-4 right-4 w-4 h-6 border-l-[3px] border-b-[3px] border-gray-500 bg-white dark:bg-gray-800 transform rotate-[-30deg] skew-x-[30deg]"></div>
      </div>
    </div>
    
    <!-- Right Tag -->
    <div class="absolute right-12 top-0">
      <!-- Tape/Pin -->
      <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-400 opacity-80 rotate-[-5deg]"></div>
      <div class="border-2 border-gray-500 px-6 py-3 font-bold text-lg bg-white dark:bg-gray-800 shadow-sm relative">
        <div class="absolute left-2 top-2 w-2 h-2 rounded-full border border-gray-500"></div>
        <div class="absolute right-2 top-2 w-2 h-2 rounded-full border border-gray-500"></div>
        18時～24時だけ！
      </div>
    </div>
  </div>
  
  <div class="text-center text-3xl font-black tracking-widest my-8">
    お得な割引セール！
  </div>
  
  <div class="border-2 border-gray-500 p-3 text-center mx-auto w-3/4 mb-10 font-bold text-lg bg-white dark:bg-gray-800">
    セール期間： 2014年 6月2日(月)～6月28日(土)
  </div>
  
  <div class="text-base md:text-lg space-y-2 mb-10 px-8 font-medium">
    <p>＊下の割引券は切って、かならず商品と一緒にレジにお出しください！</p>
    <p>＊この広告はお一人様１枚限りとさせていただきます。</p>
    <p>＊割引券１枚につき商品１個が割引となります。</p>
    <p>＊お店によっては、商品がない場合もあります。</p>
    <p>＊割引券が利用できるのは、18時～24時です。</p>
  </div>
  
  <!-- Dashed Table -->
  <table class="w-full border-collapse text-center text-sm md:text-base border-t-2 border-b-2 border-gray-500 table-fixed">
    <thead>
      <tr class="border-b-2 border-gray-500 border-dashed">
        <th class="p-3 font-medium border-r-2 border-gray-500 border-dashed">2日(月)～14日(土)</th>
        <th class="p-3 font-medium border-r-2 border-gray-500 border-dashed">2日(月)～14日(土)</th>
        <th class="p-3 font-medium border-r-2 border-gray-500 border-dashed">15日(日)～28日(土)</th>
        <th class="p-3 font-medium">15日(日)～28日(土)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-4 align-top border-r-2 border-gray-500 border-dashed">
          <div class="font-bold text-lg">チョコレート</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 my-4 tracking-widest">書かれた価格より</div>
          <div class="font-bold text-xl md:text-2xl">30円引き</div>
        </td>
        <td class="p-4 align-top border-r-2 border-gray-500 border-dashed">
          <div class="font-bold text-lg">ドーナッツ</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 my-4 tracking-widest">書かれた価格より</div>
          <div class="font-bold text-xl md:text-2xl">20円引き</div>
        </td>
        <td class="p-4 align-top border-r-2 border-gray-500 border-dashed">
          <div class="font-bold text-lg">アイスクリーム</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 my-4 tracking-widest">書かれた価格より</div>
          <div class="font-bold text-xl md:text-2xl">20円引き</div>
        </td>
        <td class="p-4 align-top">
          <div class="font-bold text-lg">ホットコーヒー</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 my-4 tracking-widest">書かれた価格より</div>
          <div class="font-bold text-xl md:text-2xl">30円引き</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;
        }
        
        if (p.title && p.title.includes('問題53')) {
          p.passageLayout = 'html';
          
          let headerText = '問題53 つぎの文章は求人募集広告である。右の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。';
          
          p.passageText = '<p class="mb-8 font-bold text-lg">' + headerText + '</p>' + 
`<div class="border-[3px] border-gray-500 p-8 max-w-3xl mx-auto font-sans bg-[#e5e7eb] dark:bg-gray-800 text-gray-900 dark:text-gray-100 relative">
  <div class="mb-8">
    <div class="text-xl md:text-2xl font-bold tracking-widest">一緒にすし屋で働きませんか！</div>
    <div class="text-4xl md:text-5xl font-black text-center mt-6 tracking-widest relative">
      アルバイト大募集！
      <div class="absolute right-0 -top-8 text-6xl transform rotate-12 opacity-80" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">🍣🍱</div>
    </div>
  </div>
  
  <div class="space-y-6 text-lg md:text-xl font-medium mt-12">
    <div class="flex">
      <div class="font-bold w-40 flex-shrink-0 tracking-widest">職種(注1)</div>
      <div>：調理の手伝い</div>
    </div>
    
    <div class="flex">
      <div class="font-bold w-40 flex-shrink-0 tracking-widest">勤務時間・給与</div>
      <div>
        <div>：① 8:00 - 15:00 時給900円</div>
        <div class="ml-4 md:ml-6 mt-2">② 15:00 - 24:00 時給1,000円（時給は経験を考慮(注2)）</div>
      </div>
    </div>
    
    <div class="ml-4 md:ml-20 space-y-3 mt-8 relative">
      <div>＊週2日、1日5時間以上働ける方。</div>
      <div>＊曜日、時間は相談に応じます。</div>
      <div>＊経験のない方もOK！</div>
      <div>＊主婦・学生の方歓迎。（高校生は不可）</div>
      
      <!-- Pointing Speech Bubble -->
      <div class="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2">
        <div class="relative border-[3px] border-gray-500 rounded-[50%] px-10 py-8 bg-white dark:bg-gray-700 text-base font-bold text-center shadow-md rotate-[-5deg] tracking-widest">
          少しでも興味ある方<br />はお電話ください！
          <div class="absolute -left-6 top-1/2 transform -translate-y-1/2 w-8 h-8 border-t-[3px] border-b-[3px] border-l-[3px] border-gray-500 bg-white dark:bg-gray-700 skew-y-[20deg] rotate-[20deg] rounded-bl-xl"></div>
        </div>
      </div>
    </div>
    
    <div class="flex mt-12 pt-4">
      <div class="font-bold w-40 flex-shrink-0 tracking-widest">応募方法</div>
      <div>：お電話の上、履歴書（写真付）を持って面接にお越しください。</div>
    </div>
    
    <div class="flex mt-4">
      <div class="font-bold w-40 flex-shrink-0 tracking-widest">勤務地・連絡先</div>
      <div>
        <div>：A市山田町 2-2-1</div>
        <div class="text-center font-black text-2xl mt-6 tracking-widest">すしの吉野（山田店） TEL: 1111-3333</div>
      </div>
    </div>
  </div>
</div>`;
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully styled Mondai 52 and 53 exactly like the images!');
  }
}
