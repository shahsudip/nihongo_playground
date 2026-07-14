const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題54')) {
          p.passageLayout = 'html';
          p.mondaiHeader = '問題54 つぎの文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。';
          
          p.passageText = `<div class="max-w-[850px] mx-auto font-sans bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2 relative p-4">
  <div class="text-lg md:text-xl font-bold tracking-widest mb-6">
    アパート情報サイト「マイハウスネット」(20XX年3月現在)
  </div>
  
  <div class="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
    <!-- Left Column: Details Box -->
    <div class="flex-1 bg-gray-200 dark:bg-gray-700 border-2 border-gray-400 p-5 md:p-8 text-base md:text-lg font-medium leading-relaxed shadow-sm">
      <div class="grid grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] gap-x-2 gap-y-3 mb-8">
        <div></div><div class="text-xl md:text-2xl font-bold tracking-widest mb-2">中山田駅 徒歩3分</div>
        <div class="tracking-widest">アパート</div><div class="tracking-widest">築10年</div>
        <div class="tracking-widest">家賃</div><div class="text-xl font-bold">30,000円</div>
        <div class="tracking-tighter">敷金(注1) / 礼金(注2)</div><div>1か月 / 1か月</div>
      </div>
      
      <div class="font-bold text-xl md:text-2xl mb-6 tracking-wider">ワンルーム 19.84m²</div>
      
      <div class="space-y-4 relative z-10 pl-2">
        <div class="flex items-start"><span class="mr-2">・</span>南向き</div>
        <div class="flex items-start"><span class="mr-2">・</span>5階建ての2階</div>
        <div class="flex items-start"><span class="mr-2">・</span>スーパーまで400m</div>
        <div class="flex items-start">
          <span class="mr-2">・</span>
          <div>手数料無料！契約時には家賃1か月分と<br/>敷金・礼金各1か月分だけでOK！</div>
        </div>
        <div class="flex items-start"><span class="mr-2">・</span>ペットは相談可！</div>
      </div>
    </div>
    
    <!-- Right Column: Floor Plan -->
    <div class="w-full md:w-72 flex justify-center items-start pt-6 md:pt-10 relative">
      <!-- Compass -->
      <div class="absolute right-8 md:-right-4 top-0 text-xl font-bold font-serif flex flex-col items-center text-black dark:text-white">
        <div>N</div>
        <div class="relative w-6 h-6 mt-1">
          <div class="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black dark:bg-white transform -translate-x-1/2"></div>
          <div class="absolute top-1/2 left-0 right-0 h-[2px] bg-black dark:bg-white transform -translate-y-1/2"></div>
        </div>
      </div>
      
      <!-- Floor Plan Box -->
      <div class="border-[3px] border-black dark:border-white w-52 bg-white flex flex-col mt-4 text-black">
        <!-- Top row -->
        <div class="flex border-b-2 border-black dark:border-white h-40">
          <div class="w-1/2 border-r-2 border-black dark:border-white flex flex-col">
            <div class="h-[45%] border-b-2 border-black dark:border-white flex items-center justify-center bg-gray-400 bg-opacity-60 text-sm font-bold tracking-widest" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);">浴室</div>
            <div class="h-[30%] border-b-2 border-black dark:border-white flex items-center justify-center text-sm font-bold tracking-widest">トイレ</div>
            <div class="h-[25%] flex items-center justify-center text-sm font-bold tracking-widest bg-gray-300">収納</div>
          </div>
          <div class="w-1/2 flex flex-col">
            <div class="h-[30%] border-b-2 border-black dark:border-white flex items-center justify-center text-sm font-bold tracking-widest bg-gray-200 relative">
               玄関
               <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-4 border-2 border-black dark:border-white rounded-t-full border-b-0"></div>
            </div>
            <div class="h-[25%] border-b-2 border-black dark:border-white flex items-center justify-center text-sm font-bold tracking-widest bg-gray-100">洗濯</div>
            <div class="flex-1 relative">
               <div class="absolute bottom-0 -left-[14px] w-6 h-6 border-r-2 border-black dark:border-white transform -rotate-45"></div>
            </div>
          </div>
        </div>
        
        <!-- Main Room -->
        <div class="h-48 flex flex-col items-center justify-center bg-white relative">
          <div class="text-2xl font-bold tracking-widest mb-1">洋室</div>
          <div class="text-lg font-bold">19.84m²</div>
        </div>
        
        <!-- Balcony -->
        <div class="h-12 border-t-2 border-black dark:border-white flex items-center justify-center text-base font-bold tracking-widest bg-white">
          ベランダ
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
    console.log('Successfully injected apartment flyer and floor plan UI into Mondai 54!');
  }
}
