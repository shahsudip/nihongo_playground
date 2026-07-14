const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function fixAllSwallowed() {
  console.log("Fixing all swallowed notes...");
  let curData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  let curBooks = eval(curData.match(/export const sampleBooks = (\[.*\]);/s)[1]);
  let skm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');

  let changedChapters = new Set();

  const swallowedTexts = [
    {
      title: "問題7",
      text: "できるようになり、漢字の使用が増えたためである。たとえば、気分が沈んだ状態である「ゆううつ」ということばをメールで使う場合、「憂鬱」と漢字で表記する人が増えている。この「憂鬱」は新しく常用漢字になった漢字である。 しかし、日本に外国人が増加して、漢字が苦手な人もいるため、常用漢字を減らすべきだという意見もある。どのような漢字表記がよいのか、いつどこでどんな表記を使うのがいいか、さまざまな点から考えていかなければならないだろう。",
      noteNum: 1
    },
    {
      title: "問題19",
      text: "や事故などが起きたときに、安全に避難するための注意を一つにした言葉です。「押さない、駆けない(注2)、しゃべらない(注3)、戻らない」という四つの言葉の初めのひらがなを並べたものです。",
      noteNum: 1
    },
    {
      title: "問題20",
      text: "が並んでいた。値段は高かったが、アルバイト代が入ったばかりだったので、一番かわいいのを一つ買って帰ることにした。私は「寒椿」というお菓子を選んだ。いつも公園で見ている赤い椿の花を表現したお菓子だ。そのままテーブルにかざっておきたいぐらい美しい上に、食べると味も素晴らしく、感激した。それ以来、「寒椿」のことが忘れられなくなった。でも、次にアルバイト代が入るまでがまんすることにした。月に一度あのかわいい姿と味が楽しめれば幸せだ。",
      noteNum: 1
    },
    {
      title: "問題24",
      text: "クラブ」は日本の歌を愛する社会人混声(注2)合唱のクラブです。このたび秋の歌を集めて、ミニ・コンサートを開催することになりました。",
      noteNum: 1
    },
    {
      title: "問題27",
      text: "</span>いる。",
      noteNum: 1,
      isHtml: true
    },
    {
      title: "33",
      text: "がある。それが当たったのにお金を受け取らなかった人がいる。彼は70代の一人暮らしの男性で、受け取らない理由は「どう使えばいいかわからないから。」だそうだ。",
      noteNum: 1
    },
    {
      title: "問題37",
      text: "ところで「本当にそうですね」と言うことが大切である。このようにしていると、会話に入りやすくなる。",
      noteNum: 1
    },
    {
      title: "問題38",
      text: "を研究している人の話によると、これはそのころの人が今よりずっと力があったというわけではなく、どのように体を使えば重いものを運べるかがわかっていたので、できたのだという。だが、今は、それが伝えられることもなくなりつつある。",
      noteNum: 1
    },
    {
      title: "問題39",
      text: "とともに、地方都市が都市の外側へと広がった。郊外に住む人が増え、大きなスーパーや病院のような施設(注2)も郊外に造られるようになったのである。そうした所へは歩いて行けないが、車で行けるようになった。しかし、それで困るのが高齢者である。高齢者は車を運転する人が多くないため、郊外まで買い物や病院に行くのが難しい。",
      noteNum: 1
    },
    {
      title: "問題40",
      text: "ことにもなり、ボケ防止(注2)にも役立つらしい。",
      noteNum: 1
    },
    {
      title: "問題41",
      text: "</span>は同封のチラシをごらんください。",
      noteNum: 1,
      isHtml: true
    },
    {
      title: "問題42",
      text: "意志が強く表現されてしまう。その結果、相手を怒らせてしまうかもしれない。一方、「ここは禁煙になっております。」と言うと、自分の意志とは関係なく、単にレストランの決まりを伝えているという形になり、相手と対立するような形にはならずに言いたいことを伝えられる。",
      noteNum: 1
    },
    {
      title: "問題43",
      text: "などにも、桜が楽しめるところは数多くある。",
      noteNum: 1
    },
    {
      title: "問題45",
      text: "。列車の掃除もその一つである。",
      noteNum: 1
    },
    {
      title: "問題46",
      text: "ということだ。その上、下の学年の生徒が自分より勉強ができるようになってきたら、やる気も自信もなくしてしまうかもしれない。",
      noteNum: 1
    },
    {
      title: "問題53",
      text: "</div>",
      noteNum: 1,
      isHtml: true
    }
  ];

  swallowedTexts.forEach(item => {
    let p = skm.chapters.flatMap(c => c.passages).find(p => p.title.includes(item.title));
    if (p && p.passageNotes) {
      let fullNoteString = `<p>(注${item.noteNum})${item.text}</p>`;
      if (p.passageNotes.includes(fullNoteString)) {
        // Remove from notes
        p.passageNotes = p.passageNotes.replace(fullNoteString, '').trim();
        
        // Append to passage text
        let styledNote = `<sup class="text-xs text-gray-500 font-normal">(注${item.noteNum})</sup>`;
        
        if (item.isHtml) {
          // Just append the text without the extra styled note, because the tag was cut off
          p.passageText += styledNote + item.text;
        } else {
          p.passageText += styledNote + item.text;
        }

        let c = skm.chapters.find(ch => ch.passages.includes(p));
        changedChapters.add(c);
        console.log(`Fixed swallowed text in ${item.title}`);
      }
    }
  });

  if (changedChapters.size > 0) {
    const serialized = JSON.stringify(curBooks, null, 2);
    fs.writeFileSync('src/data/book_data.jsx', curData.replace(/export const sampleBooks = (\[.*\]);/s, 'export const sampleBooks = ' + serialized + ';'));
    console.log('Fixed book_data.jsx locally.');

    const bookDocRef = db.collection('books').doc(skm.id);
    for (const c of changedChapters) {
      const chapterDocRef = bookDocRef.collection('chapters').doc(c.id);
      await chapterDocRef.update({ passages: c.passages });
      console.log(`Pushed fix to Firebase for chapter ${c.id}`);
    }
  } else {
    console.log("No texts were fixed.");
  }
}

fixAllSwallowed();
