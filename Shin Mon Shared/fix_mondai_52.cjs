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
          
          p.passageText = `<div class="border border-gray-400 p-4 max-w-3xl mx-auto font-sans bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  <div class="bg-gray-200 dark:bg-gray-700 py-2 px-4 text-center text-lg font-bold">
    Sマート (24hオープン) は近くて便利！
  </div>
  
  <div class="flex justify-between items-center mt-4">
    <div class="border-2 border-gray-400 rounded-full px-6 py-2">
      6月の
    </div>
    <div class="border border-gray-400 px-4 py-1">
      18時～24時だけ！
    </div>
  </div>
  
  <div class="text-center text-xl font-bold my-6">
    お得な割引セール！
  </div>
  
  <div class="border border-gray-400 p-2 text-center mx-auto w-3/4 mb-6">
    セール期間： 2014年 6月2日(月)～6月28日(土)
  </div>
  
  <div class="text-sm md:text-base space-y-2 mb-6">
    <p>＊下の割引券は切って、かならず商品と一緒にレジにお出しください！</p>
    <p>＊この広告はお一人様１枚限りとさせていただきます。</p>
    <p>＊割引券１枚につき商品１個が割引となります。</p>
    <p>＊お店によっては、商品がない場合もあります。</p>
    <p>＊割引券が利用できるのは、18時～24時です。</p>
  </div>
  
  <table class="w-full border-collapse border-t border-b border-gray-400 text-center text-xs md:text-sm">
    <thead>
      <tr class="border-b border-gray-400 divide-x border-dashed divide-gray-400">
        <th class="p-2 font-normal">2日(月)～14日(土)</th>
        <th class="p-2 font-normal">2日(月)～14日(土)</th>
        <th class="p-2 font-normal">15日(日)～28日(土)</th>
        <th class="p-2 font-normal">15日(日)～28日(土)</th>
      </tr>
    </thead>
    <tbody class="divide-x border-dashed divide-gray-400">
      <tr>
        <td class="p-4 align-top">
          <div class="font-bold">チョコレート</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 my-2">書かれた価格より</div>
          <div class="font-bold text-base md:text-lg">30円引き</div>
        </td>
        <td class="p-4 align-top">
          <div class="font-bold">ドーナッツ</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 my-2">書かれた価格より</div>
          <div class="font-bold text-base md:text-lg">20円引き</div>
        </td>
        <td class="p-4 align-top">
          <div class="font-bold">アイスクリーム</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 my-2">書かれた価格より</div>
          <div class="font-bold text-base md:text-lg">20円引き</div>
        </td>
        <td class="p-4 align-top">
          <div class="font-bold">ホットコーヒー</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 my-2">書かれた価格より</div>
          <div class="font-bold text-base md:text-lg">30円引き</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully injected flyer UI into Mondai 52!');
  }
}
