const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let skmBook = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  
  if (skmBook) {
    skmBook.chapters.forEach(c => {
      c.passages?.forEach(p => {
        if (p.title && p.title.includes('問題53')) {
          p.passageLayout = 'html';
          
          p.passageText = `<div class="border-2 border-gray-400 p-6 max-w-3xl mx-auto font-sans bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 relative">
  <div class="mb-6">
    <div class="text-lg md:text-xl font-bold">一緒にすし屋で働きませんか！</div>
    <div class="text-3xl md:text-4xl font-black text-center mt-4 tracking-widest">アルバイト大募集！</div>
  </div>
  
  <div class="space-y-4 text-base md:text-lg">
    <div class="flex">
      <div class="font-bold w-32 flex-shrink-0 tracking-widest">職種(注1)</div>
      <div>：調理の手伝い</div>
    </div>
    
    <div class="flex">
      <div class="font-bold w-32 flex-shrink-0 tracking-widest">勤務時間・給与</div>
      <div>
        <div>：① 8:00 - 15:00 時給900円</div>
        <div class="ml-4 md:ml-6 mt-1">② 15:00 - 24:00 時給1,000円（時給は経験を考慮(注2)）</div>
      </div>
    </div>
    
    <div class="ml-4 md:ml-16 space-y-2 mt-6 relative">
      <div>＊週2日、1日5時間以上働ける方。</div>
      <div>＊曜日、時間は相談に応じます。</div>
      <div>＊経験のない方もOK！</div>
      <div>＊主婦・学生の方歓迎。（高校生は不可）</div>
      
      <!-- Speech Bubble -->
      <div class="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 border border-gray-500 rounded-[50%] px-8 py-6 bg-white dark:bg-gray-700 text-sm text-center shadow-sm">
        少しでも興味ある方<br />はお電話ください！
      </div>
    </div>
    
    <div class="flex mt-8 pt-4">
      <div class="font-bold w-32 flex-shrink-0 tracking-widest">応募方法</div>
      <div>：お電話の上、履歴書（写真付）を持って面接にお越しください。</div>
    </div>
    
    <div class="flex mt-2">
      <div class="font-bold w-32 flex-shrink-0 tracking-widest">勤務地・連絡先</div>
      <div>
        <div>：A市山田町 2-2-1</div>
        <div class="text-center font-bold text-xl mt-4 tracking-widest">すしの吉野（山田店） TEL: 1111-3333</div>
      </div>
    </div>
  </div>
</div>`;

          // Fix the typo in notes
          p.passageNotes = p.passageNotes.replace(/仕事の種類/, '職業の種類');
        }
      });
    });
    
    const serialized = JSON.stringify(books, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', data.replace(match[1], serialized));
    console.log('Successfully injected flyer UI into Mondai 53!');
  }
}
