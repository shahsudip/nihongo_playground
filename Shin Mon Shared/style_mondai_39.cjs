const fs = require('fs');

const p39Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>日本では1960年代ごろから車が増加し、道路が整備される<span class="text-xs">(注1)</span>とともに、地方都市が<span class="underline underline-offset-4">外側へと広がった</span>。郊外に住む人が増え、大きなスーパーや病院のような施設<span class="text-xs">(注2)</span>も郊外に造られるようになったのである。そうした所へは歩いて行けないが、車で行けるようになった。しかし、それで困るのが高齢者である。高齢者は車を運転する人が多くないため、郊外まで買い物や病院に行くのが難しい。</p>
    <p>一方、街の中心部の店には客が来なくなって、閉店するところも増えてしまった。そこで、最近、いくつかの都市はさまざまな施設を再び街の中心に戻し、人々も中心部に集まって住めるようにしようとしている。このような都市は<span class="underline underline-offset-4">コンパクトシティ</span>と言われており、お年寄りも気軽にいろいろな場所へ行くことができる。高齢化が進み、人口が減少している現在、<span class="underline underline-offset-4">こうした都市が注目されている</span>。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m39Index = ch4.passages.findIndex(p => p.title.includes("39"));
  
  if (m39Index !== -1) {
    let m39 = ch4.passages[m39Index];
    m39.title = "第4部 問題39";
    m39.passageText = p39Html.trim();
    m39.passageLayout = "html";
    m39.mondaiHeader = "問題39　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m39.passageNotes = "<p>(注1)整備する：使えるような状態にする</p><p>(注2)施設：ある目的のために造られた建物</p>";
    
    m39.questions = [
      {
        "id": "q39-1",
        "questionText": "問1 「外側へと広がった」とは、どのような意味か。",
        "options": [
          "都市の郊外に新しく別の街ができた。",
          "道路が造られて、ほかの街へも行きやすくなった。",
          "街の郊外にも住宅や施設ができた。",
          "街の面積が広くなって、施設や家も広くなった。"
        ],
        "correctOption": {
          "text": "街の郊外にも住宅や施設ができた。",
          "explanation": "直後に「郊外に住む人が増え、大きなスーパーや病院のような施設も郊外に造られるようになった」と説明されているため、3が正解です。"
        }
      },
      {
        "id": "q39-2",
        "questionText": "問2 「コンパクトシティ」とは、本文によるとどのような意味か。",
        "options": [
          "中心部の多くの店が閉店してしまう都市",
          "お年寄りが買い物に行ったりするのが難しい都市",
          "お年寄りが車を運転して買い物などに行ける都市",
          "施設などを中心部に戻し、人々もそこに住めるようにした都市"
        ],
        "correctOption": {
          "text": "施設などを中心部に戻し、人々もそこに住めるようにした都市",
          "explanation": "「さまざまな施設を再び街の中心に戻し、人々も中心部に集まって住めるようにしようとしている。このような都市はコンパクトシティと言われており…」とあるため、4が正解です。"
        }
      },
      {
        "id": "q39-3",
        "questionText": "問3 「こうした都市が注目されている」とあるが、なぜ注目されているか。",
        "options": [
          "車を呼ぶと、お年寄りをいろいろな店や施設に連れて行ってくれるから。",
          "街の中心にある店や施設に、お年寄りが簡単に行けるようになったから。",
          "街の中心に人々が集まって、にぎやかになっているから。",
          "高齢化が進み、人口が減る中で、この街は人口が増えると思われるから。"
        ],
        "correctOption": {
          "text": "街の中心にある店や施設に、お年寄りが簡単に行けるようになったから。",
          "explanation": "「お年寄りも気軽にいろいろな場所へ行くことができる。高齢化が進み、人口が減少している現在、こうした都市が注目されている」とあるので、2が正解です。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 39!");
  } else {
    console.log("Could not find Mondai 39");
  }
}
