const fs = require('fs');

const p29Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>おにぎり<span class="text-xs">(注1)</span>は簡単に食べられるので、とても人気がある。</p>
    <p>このおにぎり、ただご飯を丸くしただけのように見えるが、上手に作るのは簡単ではない。ぎゅうぎゅうと力を込めて固くにぎっては、おいしいおにぎりにならない。けれどもあまり力を入れないと、食べるときにぼろぼろとくずれてしまう。食べるときにお米と具<span class="text-xs">(注2)</span>の味が混ざるようにふわふわと、でも、くずれない程度に力を込めてにぎらなければならない。</p>
    <p>自分の作ったおにぎりがあまりおいしくないと思っているなら、くずれない程度に強く、味が混ざるように優しくにぎってみることをすすめる。</p>
  </div>
  
  <!-- Onigiri & Sushi Icons -->
  <div class="absolute bottom-4 right-4 text-6xl opacity-90 transform rotate-12 flex items-end">
    <span class="text-5xl -mr-4 z-10">🍙</span>
    <span class="text-7xl">🍣</span>
    <span class="text-5xl -ml-2 -mb-2 transform rotate-45">🍙</span>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email'); // Part 4: Practical Exercises

  let m29 = {
    "title": "第4部 問題29",
    "passageText": p29Html.trim(),
    "passageLayout": "html",
    "mondaiHeader": "問題29　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。",
    "passageNotes": "<p>(注1)おにぎり：炊いたご飯を三角形や丸の形にして作った日本の食べ物</p><p>(注2)具：おにぎりの中に入れるおかずになるもの</p>",
    "questions": [
      {
        "id": "q29-1",
        "questionText": "問い 上手なおにぎりの作り方として正しいのはどれか。",
        "options": [
          "食べるときにこわれてしまわないようにご飯を固くまとめる。",
          "形が丸くなるように力を込めて何度もにぎる。",
          "食べるときに形がこわれるぐらいやわらかくにぎる。",
          "くずれないけれども食べるときにはやわらかいと感じるようににぎる。"
        ],
        "correctOption": {
          "text": "くずれないけれども食べるときにはやわらかいと感じるようににぎる。",
          "explanation": "「食べるときにお米と具の味が混ざるようにふわふわと、でも、くずれない程度に力を込めてにぎらなければならない。」と書いてあります。"
        }
      }
    ]
  };

  // Insert m29 at the very beginning of Chapter 4
  ch4.passages.unshift(m29);

  const serialized = JSON.stringify(books, null, 2);
  data = data.replace(match[1], serialized);
  fs.writeFileSync('src/data/book_data.jsx', data);
  console.log("Reconstructed Mondai 29 and prepended it to Chapter 4!");
}
