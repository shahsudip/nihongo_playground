const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const p26Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-400 font-sans shadow-md mx-auto max-w-2xl bg-opacity-90 dark:bg-opacity-90" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px);">
  
  <h2 class="text-xl md:text-2xl font-bold text-center tracking-widest text-gray-800 dark:text-gray-100 mb-2 border-b-2 border-gray-800 dark:border-gray-200 pb-2 inline-block mx-auto">内 用 薬 <span class="text-sm font-normal">(注1)</span></h2>
  
  <div class="text-right mt-6 mb-8 border-b border-gray-400 pb-2 flex justify-end items-end gap-4">
    <span class="text-xl md:text-2xl font-bold tracking-wider">田中　マリア</span>
    <span class="text-lg">様</span>
  </div>
  
  <!-- Medicine 1 -->
  <div class="mb-6 space-y-3">
    <div class="flex flex-wrap items-end gap-2 md:gap-4 text-sm md:text-base font-bold">
      <span class="text-lg">ピンクの錠剤</span>
      <span>1回</span>
      <span class="text-lg">2</span>
      <span>（</span>
      <span class="border-2 border-red-500 text-red-500 rounded-full px-2 py-0.5">錠</span>
      <span>・</span>
      <span>包<span class="text-xs">(注2)</span></span>
      <span>）ずつ</span>
      <span class="ml-4">1日</span>
      <span class="text-lg">2</span>
      <span>回</span>
    </div>
    
    <div class="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base font-bold ml-4">
      <span>（</span>
      <span class="border-2 border-red-500 text-red-500 rounded-full px-3 py-1">あさ</span>
      <span>・</span>
      <span>ひる</span>
      <span>・</span>
      <span class="border-2 border-red-500 text-red-500 rounded-full px-3 py-1">夕方</span>
      <span>・</span>
      <span>寝る前</span>
      <span>）</span>
    </div>
    
    <div class="flex flex-wrap items-center justify-end gap-4 text-sm md:text-base font-bold">
      <span class="mr-6">4日分</span>
      <span>食前</span>
      <span>・</span>
      <span>食間</span>
      <span>・</span>
      <span class="border-2 border-red-500 text-red-500 rounded-full px-3 py-1">食後</span>
    </div>
  </div>
  
  <div class="border-b-2 border-dashed border-gray-400 dark:border-gray-500 mb-6 w-full"></div>
  
  <!-- Medicine 2 -->
  <div class="mb-10 space-y-3">
    <div class="flex flex-wrap items-end gap-2 md:gap-4 text-sm md:text-base font-bold">
      <span class="text-lg">白のカプセル</span>
      <span>1回</span>
      <span class="text-lg">1</span>
      <span>（</span>
      <span class="border-2 border-blue-500 text-blue-500 rounded-full px-2 py-0.5">錠</span>
      <span>・</span>
      <span>包</span>
      <span>）ずつ</span>
      <span class="ml-4">1日</span>
      <span class="text-lg">3</span>
      <span>回</span>
    </div>
    
    <div class="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base font-bold ml-4">
      <span>（</span>
      <span class="border-2 border-blue-500 text-blue-500 rounded-full px-3 py-1">あさ</span>
      <span>・</span>
      <span class="border-2 border-blue-500 text-blue-500 rounded-full px-3 py-1">ひる</span>
      <span>・</span>
      <span class="border-2 border-blue-500 text-blue-500 rounded-full px-3 py-1">夕方</span>
      <span>・</span>
      <span>寝る前</span>
      <span>）</span>
    </div>
    
    <div class="flex flex-wrap items-center justify-end gap-4 text-sm md:text-base font-bold">
      <span class="mr-6">4日分</span>
      <span>食前</span>
      <span>・</span>
      <span>食間</span>
      <span>・</span>
      <span class="border-2 border-blue-500 text-blue-500 rounded-full px-3 py-1">食後</span>
    </div>
  </div>
  
  <!-- Hospital Info -->
  <div class="flex justify-end relative">
    <div class="border border-gray-400 p-4 rounded bg-white dark:bg-gray-800 text-sm md:text-base z-10 text-center">
      <p class="font-bold mb-1">わたなべ医院</p>
      <p class="mb-1">○○区××町1－2－3</p>
      <p>電話 03-3333-2222</p>
    </div>
    <div class="absolute -right-8 -bottom-8 text-6xl opacity-70 transform rotate-12">
      💊
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

  let m26 = {
    "title": "第3部 問題26",
    "passageText": p26Html.trim(),
    "passageLayout": "html",
    "mondaiHeader": "問題26　下は薬の入った袋である。下の質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "passageNotes": "<p>(注1) 内用薬：飲む薬。　参考：外用薬(皮膚につける薬)、塗り薬</p><p>(注2) 包：こな薬の数え方</p>",
    "questions": [
      {
        "id": "q26-1",
        "questionText": "問1 ピンクの錠剤と白のカプセルの飲み方で正しいものはどれか。",
        "options": [
          "朝食・昼食・夕食を食べた後、それぞれ1錠ずつ飲む。",
          "朝食・昼食・夕食を食べた後、それぞれ2錠ずつ飲む。",
          "ピンクの錠剤は朝食後・夕食後に2錠、白のカプセルは朝食後・昼食後・夕食後に3錠飲む。",
          "ピンクの錠剤は朝食後・夕食後に2錠、白のカプセルは朝食後・昼食後・夕食後に1錠飲む。"
        ],
        "correctOption": {
          "text": "ピンクの錠剤は朝食後・夕食後に2錠、白のカプセルは朝食後・昼食後・夕食後に1錠飲む。",
          "explanation": "ピンクの錠剤は1回2錠で1日2回（あさ・夕方）、食後です。白のカプセルは1回1錠で1日3回（あさ・ひる・夕方）、食後です。"
        }
      },
      {
        "id": "q26-2",
        "questionText": "問2 マリアさんは朝食後、薬を飲んだ。次にいつどんな薬を飲めばよいか。",
        "options": [
          "錠剤とカプセルを昼食後に飲む。",
          "錠剤を昼食後に飲む。",
          "カプセルを昼食後に飲む。",
          "錠剤とカプセルを夕食後に飲む。"
        ],
        "correctOption": {
          "text": "カプセルを昼食後に飲む。",
          "explanation": "錠剤は朝・夕方のみですが、カプセルは朝・昼・夕方です。したがって朝の次は、昼にカプセルだけを飲みます。"
        }
      }
    ]
  };

  // Insert m26 right after m25 in Chapter 3
  // Currently Chapter 3 has: 21, 22, 23, 24, 25 at indices 0, 1, 2, 3, 4
  ch3.passages.splice(5, 0, m26);

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Reconstructed Mondai 26 and appended it to Chapter 3!");
}
