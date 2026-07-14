const fs = require('fs');

const p43Html = `
<div class="bg-white dark:bg-gray-800 p-6 md:p-10 rounded border border-gray-300 dark:border-gray-600 font-sans shadow-sm relative overflow-hidden min-h-[300px]">
  
  <div class="space-y-4 text-sm md:text-base leading-loose indent-4 mb-8">
    <p>日本人にとって桜は特別な木である。春になると桜の花の美しさを求めて、家族や仲間が集まって花見を楽しむ。桜で有名な場所は各地にあるが、近所の公園や並木道<span class="text-xs">(注1)</span>などにも、桜が楽しめるところは数多くある。</p>
    <p>桜はとても手がかかる木である。<span class="underline underline-offset-4">花は春の1週間ほどはきれいだが、すぐに散り始め</span>、小さな花びらがあちこちに飛んで行き、何日も掃除しなければならない。葉は秋に赤や黄色に変わり、再び私たちの目を楽しませてくれるが、すぐに落ちて、大量の落ち葉を片付けるのがまた大変である。</p>
    <p>しかし、美しい花や紅葉を見せてくれるのだから、<span class="underline underline-offset-4">掃除ぐらいで文句を言ってはいけないだろう</span>。</p>
    <p>桜に<span class="underline underline-offset-4">最も手がかかるのは、長生きさせることである</span>。放っておく<span class="text-xs">(注2)</span>と60〜70年ぐらいで木が弱り、枯れてしまうと言われている。このため、不必要な枝を切ったり、重くて下がってきた枝を支えたり、色々と世話をする必要があるのだ。このような作業はとても面倒だが、桜を大切に思う人々により全国で行われていて、樹齢100年を超える桜も珍しくない。</p>
    <p>古くからある桜を大事にするだけでなく、新しい桜を植えることもさかんだ。新しい公園や学校ができると必ず若い桜の木が植えられる。手がかかると分かっていても、日本人は身近なところに桜の木があってほしいと思うのだ。日本人にとってこれほど特別な木は桜の他にはないだろう。</p>
  </div>
</div>
`;

let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');
const match = data.match(/export const sampleBooks = (\[.*\]);/s);

if (match) {
  let books = eval(match[1]);
  let b = books.find(b => b.id === 'shinkanzen-master-n3-reading');
  let ch4 = b.chapters.find(c => c.id === 'shinkanzen-ch-4-email');

  let m43Index = ch4.passages.findIndex(p => p.title.includes("43"));
  
  if (m43Index !== -1) {
    let m43 = ch4.passages[m43Index];
    m43.title = "第4部 問題43";
    m43.passageText = p43Html.trim();
    m43.passageLayout = "html";
    m43.mondaiHeader = "問題43　つぎの文章を読んで、質問に答えなさい。答えは、１・２・３・４から最もよいものを一つえらびなさい。";
    m43.passageNotes = "<p>(注1)並木道：何十メートルも、両側に木が植えてある道</p><p>(注2)放っておく：世話などを何もしない</p>";
    
    m43.questions = [
      {
        "id": "q43-1",
        "questionText": "問1 桜の花は開いてからどうなるか。",
        "options": [
          "翌日には散り始める。",
          "花の色が変わっていく。",
          "何週間も咲いている。",
          "7日間ぐらいは咲いている。"
        ],
        "correctOption": {
          "text": "7日間ぐらいは咲いている。",
          "explanation": "「花は春の1週間ほどはきれいだが、すぐに散り始め」とあるので、「7日間ぐらいは咲いている」が正解です。"
        }
      },
      {
        "id": "q43-2",
        "questionText": "問2 「掃除ぐらいで文句を言ってはいけないだろう」とあるが、どういうことか。",
        "options": [
          "花や葉で楽しませてくれることに比べたら、掃除の大変さは小さいことだ。",
          "掃除はいいことなので、文句を言わずに喜んでやらなければならない。",
          "葉の掃除は花びらの掃除ほど大変ではないので文句を言ってはいけない。",
          "掃除はとても大変なので、やりたくないのはあたりまえだ。"
        ],
        "correctOption": {
          "text": "花や葉で楽しませてくれることに比べたら、掃除の大変さは小さいことだ。",
          "explanation": "「美しい花や紅葉を見せてくれるのだから、掃除ぐらいで…」という文脈から、楽しませてくれる恩恵のほうが掃除の苦労より大きいと言っています。"
        }
      },
      {
        "id": "q43-3",
        "questionText": "問3 「最も手がかかるのは、長生きさせることである」とあるが、どうすればよいか。",
        "options": [
          "何もしないほうがいい。",
          "重くなった枝を切る。",
          "花びらや葉を掃除する。",
          "いらない枝を切る。"
        ],
        "correctOption": {
          "text": "いらない枝を切る。",
          "explanation": "長生きさせるために「不必要な枝を切ったり、重くて下がってきた枝を支えたり…」とあるので、「不必要な枝＝いらない枝」を切る4が正解です。"
        }
      },
      {
        "id": "q43-4",
        "questionText": "問4 この文章を書いた人が一番言いたいことは何か。",
        "options": [
          "桜は手をかけても70年ぐらいで枯れてしまう。",
          "今ある桜が枯れたら日本には桜がなくなってしまう。",
          "手がかかっても日本人は桜の木を特別に大切にしている。",
          "桜を長生きさせるためには花びらや葉を掃除しなければいけない。"
        ],
        "correctOption": {
          "text": "手がかかっても日本人は桜の木を特別に大切にしている。",
          "explanation": "全体のまとめとして、最終段落で「手がかかると分かっていても、日本人は身近なところに桜の木があってほしいと思うのだ。日本人にとってこれほど特別な木は桜の他にはないだろう」と述べています。"
        }
      }
    ];

    const serialized = JSON.stringify(books, null, 2);
    data = data.replace(match[1], serialized);
    fs.writeFileSync('src/data/book_data.jsx', data);
    console.log("Completely rebuilt Mondai 43!");
  } else {
    console.log("Could not find Mondai 43");
  }
}
