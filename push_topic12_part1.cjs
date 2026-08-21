const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "160_1",
    "japanese_text": "A：ゴールデンウィークの連休はどこか行きますか。\nB：ああ、旅行はしないで日帰りでピクニックに行きます。\nA：登山ですか。\nB：そんな大げさなものじゃないです。ただ近くの山をぶらぶらするだけです。",
    "english_translation": "A: Are you going anywhere over the long holiday for Golden Week? B: Not really, I won't be traveling anywhere, just taking a day trip for a picnic. A: Are you going mountain climbing? B: That would be overstating it a bit. I'm just going to hang around in the mountains nearby.",
    "annotated_words": [
      { "meaning_en": "golden week", "furigana": "", "kanji": "ゴールデンウィーク" },
      { "meaning_en": "long holiday", "furigana": "れんきゅう", "kanji": "連休" },
      { "meaning_en": "day trip", "furigana": "ひがえり", "kanji": "日帰り" },
      { "meaning_en": "picnic", "furigana": "", "kanji": "ピクニック" },
      { "meaning_en": "climbing mountain, climb mountain", "furigana": "とざん", "kanji": "登山［する］" },
      { "meaning_en": "just, only", "furigana": "", "kanji": "ただ" },
      { "meaning_en": "hang around", "furigana": "", "kanji": "ぶらぶらする" }
    ]
  },
  {
    "id": "160_2",
    "japanese_text": "日本に温泉が多いのは、火山が多いからだ。温泉街はホテルだけでなく、伝統的な旅館も多い。温泉は世界中の人に人気だが、裸になったり、肌を見られたりするのを恥ずかしがる人もいる。旅館によっては部屋に自分だけの温泉があるところもある。",
    "english_translation": "Japan has many hot springs because it has many volcanoes. Towns around hot springs include not only hotels, but also more traditional Japanese inns. Although hot springs are popular with people all around the world, there are those who are embarrassed by the idea of being naked or showing skin. Some traditional inns have hot springs baths for private use in their guest rooms.",
    "annotated_words": [
      { "meaning_en": "hot springs", "furigana": "おんせん", "kanji": "温泉" },
      { "meaning_en": "volcano", "furigana": "かざん", "kanji": "火山" },
      { "meaning_en": "Japanese inn", "furigana": "りょかん", "kanji": "旅館" },
      { "meaning_en": "naked", "furigana": "はだか", "kanji": "裸" },
      { "meaning_en": "skin", "furigana": "はだ", "kanji": "肌" }
    ]
  },
  {
    "id": "161_1",
    "japanese_text": "私は芸術が好きだ。旅行に行ったときは、よく美術館や博物館に行く。",
    "english_translation": "I love art. I often visit art and other museums when I travel.",
    "annotated_words": [
      { "meaning_en": "art", "furigana": "げいじゅつ", "kanji": "芸術" },
      { "meaning_en": "art museum", "furigana": "びじゅつかん", "kanji": "美術館" },
      { "meaning_en": "art", "furigana": "びじゅつ", "kanji": "美術" },
      { "meaning_en": "museum", "furigana": "はくぶつかん", "kanji": "博物館" }
    ]
  },
  {
    "id": "162_1",
    "japanese_text": "「間もなく、発車します」というアナウンスを聞いて、ホームの電車に飛び込んだ。ところが、その電車は特急で、降りる駅で停車せず、通過してしまった。",
    "english_translation": "Hearing the conductor announce \"We'll be departing soon,\" I jumped onto the train sitting at the platform. It turned out, however, that it was an express train and it went right past my station without stopping.",
    "annotated_words": [
      { "meaning_en": "soon, shortly", "furigana": "まもなく", "kanji": "間もなく" },
      { "meaning_en": "departure, depart", "furigana": "はっしゃ", "kanji": "発車［する］" },
      { "meaning_en": "(train) platform", "furigana": "", "kanji": "ホーム" },
      { "meaning_en": "platform", "furigana": "", "kanji": "=プラットホーム" },
      { "meaning_en": "jump in", "furigana": "とびこむ", "kanji": "飛び込む" },
      { "meaning_en": "however", "furigana": "", "kanji": "ところが" },
      { "meaning_en": "stopping, stop", "furigana": "ていしゃ", "kanji": "停車［する］" },
      { "meaning_en": "passing, pass", "furigana": "つうか", "kanji": "通過［する］" }
    ]
  },
  {
    "id": "162_2",
    "japanese_text": "A：すみません、バス乗り場を探しているんですが。\nB：バス乗り場は駅の反対側ですね。ここを左に行って、突き当たりを左に曲がって、鉄道の線路を越えないといけません。\nA：ええと、最初に左に行って、線路を越えるんですか。\nB：私も途中まで行くので、一緒に行きましょう。ついて来てください。",
    "english_translation": "A: Excuse me, I'm looking for a bus stop. B: The bus platform is on the other side of the station. Go left here, then turn left at the end of the road, and you'll have to cross the railroad tracks. A: So, I go to the left first and then cross the tracks? B: I'll go part of the way, so let's go together. Please follow me.",
    "annotated_words": [
      { "meaning_en": "end of the road", "furigana": "つきあたり", "kanji": "突き当たり" },
      { "meaning_en": "railroad, railway", "furigana": "てつどう", "kanji": "鉄道" },
      { "meaning_en": "(railway) tracks", "furigana": "せんろ", "kanji": "線路" },
      { "meaning_en": "cross", "furigana": "こえる", "kanji": "越える" },
      { "meaning_en": "so, umm", "furigana": "", "kanji": "ええと" },
      { "meaning_en": "follow, come along with", "furigana": "ついてくる", "kanji": "ついて来る" },
      { "meaning_en": "go with", "furigana": "ついていく", "kanji": "↔ついて行く" }
    ]
  },
  {
    "id": "163_1",
    "japanese_text": "最近は飛行機でも、新幹線でも、スマートフォンで簡単に日付や便を変更できる。",
    "english_translation": "These days it's easy to change travel information for planes or shinkansen trains using a smartphone, including dates and flights.",
    "annotated_words": [
      { "meaning_en": "date", "furigana": "ひづけ", "kanji": "日付" },
      { "meaning_en": "service", "furigana": "びん", "kanji": "便" },
      { "meaning_en": "change, change", "furigana": "へんこう", "kanji": "変更［する］" }
    ]
  },
  {
    "id": "164_1",
    "japanese_text": "海外に住んでいる友達がやってくるので、空港の到着ロビーまで出迎えに行った。飛行機のトラブルで、2時間も遅れて心配した。会えたときは抱き合って喜んだ。",
    "english_translation": "My friend who lives abroad was arriving, so I went to pick them up at the arrival lobby of the airport. Their plane arrived two hours late due to some trouble, so I was worried. I hugged them with joy when I saw them.",
    "annotated_words": [
      { "meaning_en": "arrival, arrive", "furigana": "とうちゃく", "kanji": "到着［する］" },
      { "meaning_en": "lobby", "furigana": "", "kanji": "ロビー" },
      { "meaning_en": "meeting, reception", "furigana": "でむかえ", "kanji": "出迎え" },
      { "meaning_en": "trouble", "furigana": "", "kanji": "トラブル" }
    ]
  },
  {
    "id": "164_2",
    "japanese_text": "都会に出てきてから、出身地の言葉が通じないことがよくあった。方言だと思っていない言葉が、実は方言だと分かった。",
    "english_translation": "Since moving to the city, I've often found that people can't always understand words that are used where I'm from. I found out that more words than I thought were actually limited to my own dialect.",
    "annotated_words": [
      { "meaning_en": "where one is from, birthplace", "furigana": "しゅっしんち", "kanji": "出身地" },
      { "meaning_en": "origin", "furigana": "しゅっしん", "kanji": "出身" },
      { "meaning_en": "be understood, be comprehended", "furigana": "つうじる", "kanji": "通じる" },
      { "meaning_en": "dialect", "furigana": "ほうげん", "kanji": "方言" }
    ]
  }
];

const overrides = {
    "飛び込む": "飛び込んだ",
    "停車": "停車せず",
    "通過": "通過して",
    "越える": "越えない",
    "ついて来る": "ついて来て",
    "変更": "変更できる",
    "通じる": "通じない",
    "=プラットホーム": "ホーム"
};

function extractPlainTextMap(html) {
  let plain = "";
  let map = [];
  let inTag = false;
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '<') inTag = true;
    if (!inTag) {
      plain += html[i];
      map.push(i);
    }
    if (html[i] === '>') inTag = false;
  }
  return { plain, map };
}

function wrapWords(html, wordList) {
  let { plain, map } = extractPlainTextMap(html);
  let wrappedHtml = html;
  
  const sortedWords = [...wordList].sort((a,b) => {
    let kanjiA = a.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let kanjiB = b.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let searchA = overrides[kanjiA] || kanjiA;
    let searchB = overrides[kanjiB] || kanjiB;
    return searchB.length - searchA.length;
  });

  const replacements = [];
  for (const w of sortedWords) {
    let kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）/g, '');
    let searchTarget = overrides[kanjiPlain] || kanjiPlain;
    if (!searchTarget) continue;

    let idx = plain.indexOf(searchTarget);
    if (idx !== -1) {
      const startHtmlIdx = map[idx];
      const endHtmlIdx = map[idx + searchTarget.length - 1] + 1;
      replacements.push({ start: startHtmlIdx, end: endHtmlIdx });
      plain = plain.substring(0, idx) + ' '.repeat(searchTarget.length) + plain.substring(idx + searchTarget.length);
    } else {
        let kanjiNoSuru = kanjiPlain.replace(/する$/, '');
        if (kanjiNoSuru && kanjiNoSuru.length > 1) {
            idx = plain.indexOf(kanjiNoSuru);
            if (idx !== -1) {
                const startHtmlIdx = map[idx];
                const endHtmlIdx = map[idx + kanjiNoSuru.length - 1] + 1;
                replacements.push({ start: startHtmlIdx, end: endHtmlIdx });
                plain = plain.substring(0, idx) + ' '.repeat(kanjiNoSuru.length) + plain.substring(idx + kanjiNoSuru.length);
            }
        }
    }
  }

  replacements.sort((a,b) => b.start - a.start);
  for (const r of replacements) {
    wrappedHtml = wrappedHtml.substring(0, r.start) + '<u>' + wrappedHtml.substring(r.start, r.end) + '</u>' + wrappedHtml.substring(r.end);
  }

  return wrappedHtml;
}

async function run() {
  const topicId = 'topic_12';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 12 旅行 Travel`;
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    // Process newlines to <br/> for A: B:
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let currentWordId = 1147 + i*10; // rough start
    story.annotated_words = story.annotated_words.map(w => {
      w.word_id = `n3_${String(currentWordId).padStart(4, '0')}`;
      w.word_number = currentWordId;
      currentWordId++;
      return w;
    });

    delete story.id;
    const docId = story.page_story;

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .set({ title: story.title, id: topicId }, { merge: true });

    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .collection('stories').doc(docId)
      .set(story, { merge: true });
  }
  console.log("Topic 12 part 1 successfully pushed!");
}

run().catch(console.error);
