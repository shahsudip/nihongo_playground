const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "165_1",
    "japanese_text": "A：出発まであと10分だよ。そろそろホームに行った方がよくない？\nB：まだ10分もある、だよ。待合室で休憩しようよ。\nA：あなたはいつもそう。それでぎりぎりになって慌てるんだから。早くホームに行こうよ。",
    "english_translation": "A: We have 10 minutes until the train leaves. Shouldn't we head toward the platform? B: You mean, we still have a whole 10 minutes. Let's take a break in the waiting room. A: You're always like this! Then everything gets left to the last minute and we have to rush. Let's get to the platform early.",
    "annotated_words": [
      { "meaning_en": "more, left", "furigana": "", "kanji": "あと" },
      { "meaning_en": "waiting room", "furigana": "まちあいしつ", "kanji": "待合室" },
      { "meaning_en": "grieved", "furigana": "", "kanji": "ぎりぎりな" }
    ]
  },
  {
    "id": "165_2",
    "japanese_text": "お盆はたくさんの人がふるさとに向かうため、全国の道路が渋滞する。",
    "english_translation": "During Obon, many people head to their hometowns, so roads all over the country are crowded.",
    "annotated_words": [
      { "meaning_en": "bon", "furigana": "ぼん", "kanji": "（お）盆" },
      { "meaning_en": "hometown", "furigana": "", "kanji": "ふるさと" },
      { "meaning_en": "head to", "furigana": "むかう", "kanji": "向かう" },
      { "meaning_en": "nationwide", "furigana": "ぜんこく", "kanji": "全国" },
      { "meaning_en": "road", "furigana": "どうろ", "kanji": "道路" }
    ]
  },
  {
    "id": "166_1",
    "japanese_text": "先日、山にドライブに行ったのだが、レジャーシーズンだったので、帰り道はすごく渋滞していた。信号も全然変わらなくて、いらいらし、疲れがたまってしまった。",
    "english_translation": "The other day, I went on a drive into the mountains, but because it's tourist season there was a lot of traffic on the way back. The traffic lights took forever to change, and it was frustrating, so it made me tired.",
    "annotated_words": [
      { "meaning_en": "driving, drive", "furigana": "", "kanji": "ドライブ［する］" },
      { "meaning_en": "leisure", "furigana": "", "kanji": "レジャー" },
      { "meaning_en": "season", "furigana": "", "kanji": "シーズン" },
      { "meaning_en": "traffic jam, be jammed", "furigana": "じゅうたい", "kanji": "渋滞［する］" },
      { "meaning_en": "signal", "furigana": "しんごう", "kanji": "信号" },
      { "meaning_en": "tiredness", "furigana": "つかれ", "kanji": "疲れ" }
    ]
  },
  {
    "id": "166_2",
    "japanese_text": "A：そういえば、海外旅行はどうだったの？\nB：楽しかったよ。でも、最初に行ったドイツは時差ぼけがひどくて、チェックインしてからずっとホテルの部屋にいて、全然観光できなかった。\nA：えー、せっかく行ったのに、もったいない。\nB：うん、もうちょっと長く滞在すればよかった。",
    "english_translation": "A: Oh right, how was traveling abroad? B: It was fun. But when I first arrived in Germany, the jet lag was so bad that once I checked in, I stayed in my room the whole time and didn't get to see any of the sights. A: Oh no, what a waste after travelling all that way to get there! B: Yeah, I should have stayed a little while longer.",
    "annotated_words": [
      { "meaning_en": "jet lag", "furigana": "じさぼけ", "kanji": "時差ぼけ" },
      { "meaning_en": "check-in, check in", "furigana": "", "kanji": "チェックイン［する］" },
      { "meaning_en": "sightseeing, go sightseeing", "furigana": "かんこう", "kanji": "観光［する］" },
      { "meaning_en": "after ~ all of that", "furigana": "", "kanji": "せっかく" },
      { "meaning_en": "staying, stay", "furigana": "たいざい", "kanji": "滞在［する］" }
    ]
  },
  {
    "id": "167_1",
    "japanese_text": "夏にビーチへ海水浴に行くことになった。それで、水着を買いに行った。恋人と一緒に行くので、かなり迷った。",
    "english_translation": "This summer, I decided to go sea water bathing at the beach, so I went to buy a swimsuit. I'm going to go with my lover, so I had quite a lot of trouble choosing one.",
    "annotated_words": [
      { "meaning_en": "beach", "furigana": "", "kanji": "ビーチ" },
      { "meaning_en": "sea water bathing", "furigana": "かいすいよく", "kanji": "海水浴" },
      { "meaning_en": "so", "furigana": "", "kanji": "それで" },
      { "meaning_en": "swimsuit", "furigana": "みずぎ", "kanji": "水着" },
      { "meaning_en": "lover", "furigana": "こいびと", "kanji": "恋人" },
      { "meaning_en": "quite", "furigana": "", "kanji": "かなり" }
    ]
  },
  {
    "id": "168_1",
    "japanese_text": "A：この前、東京に行ったとき、わざわざ金沢を経由して行ったんです。\nB：え、なんで？\nA：JRは、目的地までの途中の駅でも自由に下車できるんです。だから、途中下車して城と庭園を見物しました。あ、私鉄は途中下車できませんよ。JRだけです。",
    "english_translation": "A: Last time I went to Tokyo, I went out of my way to go through Kanazawa. B: Oh yeah? What for? A: With JR you can get off at any station along your travel route before you reach your destination. So I got off on the way and went to see the castle and some gardens. You can't do that on the private railway, only on JR.",
    "annotated_words": [
      { "meaning_en": "going through, go through", "furigana": "けいゆ", "kanji": "経由［する］" },
      { "meaning_en": "purpose", "furigana": "もくてき", "kanji": "目的" },
      { "meaning_en": "getting off, get off", "furigana": "げしゃ", "kanji": "下車［する］" },
      { "meaning_en": "castle", "furigana": "しろ", "kanji": "城" },
      { "meaning_en": "garden", "furigana": "ていえん", "kanji": "庭園" },
      { "meaning_en": "seeing, see", "furigana": "けんぶつ", "kanji": "見物［する］" },
      { "meaning_en": "private railway", "furigana": "してつ", "kanji": "私鉄" }
    ]
  },
  {
    "id": "168_2",
    "japanese_text": "豊かな国とよく言われるが、それがどういうことなのか正確に言うのは難しい。例えば、ビルがたくさん建っていれば豊かなのだろうか。GDPという指標がよく使われ、これはその国で作られたものやサービスの合計金額を指す。物価も考える必要がある。",
    "english_translation": "We hear a lot about \"wealthy nations,\" but it's difficult to say precisely what that means. For example, is having many buildings what makes a country wealthy? One commonly-used index is GDP, which indicates the total monetary value of everything that was manufactured, services, and the like in that country. Prices also need to be considered.",
    "annotated_words": [
      { "meaning_en": "wealthy", "furigana": "ゆたかな", "kanji": "豊かな" },
      { "meaning_en": "precise, accurate", "furigana": "せいかくな", "kanji": "正確な" },
      { "meaning_en": "be built", "furigana": "たつ", "kanji": "建つ" },
      { "meaning_en": "build", "furigana": "たてる", "kanji": "建てる" },
      { "meaning_en": "index", "furigana": "しひょう", "kanji": "指標" },
      { "meaning_en": "point", "furigana": "さす", "kanji": "指す" },
      { "meaning_en": "prices", "furigana": "ぶっか", "kanji": "物価" }
    ]
  },
  {
    "id": "169_1",
    "japanese_text": "税関が偽物の宝石を見つけた。本物にそっくりで、ちょっと見ただけでは分からない。",
    "english_translation": "Customs found fake jewels. It looks exactly like the real thing; you could hardly tell the difference with just a casual look.",
    "annotated_words": [
      { "meaning_en": "customs", "furigana": "ぜいかん", "kanji": "税関" },
      { "meaning_en": "fake", "furigana": "にせもの", "kanji": "偽物" },
      { "meaning_en": "jewelry", "furigana": "ほうせき", "kanji": "宝石" },
      { "meaning_en": "just like, the splitting image of", "furigana": "", "kanji": "そっくりな" }
    ]
  },
  {
    "id": "170_1",
    "japanese_text": "A：この前、ボートの免許を取ったんだ。\nB：え、すごい。みんなで乗りたい。\nA：いや、釣り用の、小さなエンジンがついているだけの船だよ。",
    "english_translation": "A: I just got my boating license. B: Way to go. You going to take us all out? A: Well, see, my boat is just a fishing boat with a little engine.",
    "annotated_words": [
      { "meaning_en": "boat", "furigana": "", "kanji": "ボート" },
      { "meaning_en": "license", "furigana": "めんきょ", "kanji": "免許" },
      { "meaning_en": "engine", "furigana": "", "kanji": "エンジン" }
    ]
  },
  {
    "id": "170_2",
    "japanese_text": "このトンネルは、東京方面に行くときの近道である。昔は、コーナーが連続する山道を行く必要があった。岩が落ちている危ない道で、片道1時間もかかった。今は、20分で往復できる。",
    "english_translation": "This tunnel is a shortcut you take when you're heading to Tokyo. They used to have to take a mountain path that was one curve after another. It was a dangerous road with fallen rocks, and it took an hour one-way. Now, you can make a round-trip in 20 minutes.",
    "annotated_words": [
      { "meaning_en": "tunnel", "furigana": "", "kanji": "トンネル" },
      { "meaning_en": "~ bound, heading to ~", "furigana": "ほうめん", "kanji": "〜方面" },
      { "meaning_en": "shortcut, take a shortcut", "furigana": "ちかみち", "kanji": "近道［する］" },
      { "meaning_en": "corner, curve", "furigana": "", "kanji": "コーナー" },
      { "meaning_en": "continuous, happen continuously", "furigana": "れんぞく", "kanji": "連続［する］" },
      { "meaning_en": "rock", "furigana": "いわ", "kanji": "岩" },
      { "meaning_en": "one way", "furigana": "かたみち", "kanji": "片道" },
      { "meaning_en": "round trip, go on a round trip", "furigana": "おうふく", "kanji": "往復［する］" }
    ]
  }
];

const overrides = {
    "ぎりぎりな": "ぎりぎりに",
    "（お）盆": "お盆",
    "ドライブ": "ドライブに",
    "渋滞": "渋滞して",
    "観光": "観光でき",
    "滞在": "滞在すれ",
    "経由": "経由して",
    "下車": "下車できる",
    "見物": "見物しました",
    "豊かな": "豊かな",
    "建つ": "建って",
    "そっくりな": "そっくりで",
    "近道": "近道",
    "連続": "連続する",
    "往復": "往復できる",
    "〜方面": "方面"
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
    story.story_number = i + 9;
    story.is_story = true;
    story.page_story = story.id;
    
    // Process newlines to <br/> for A: B:
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let currentWordId = 1189 + i*10; // rough ID
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
      .collection('stories').doc(docId)
      .set(story, { merge: true });
  }
  console.log("Topic 12 part 2 successfully pushed!");
}

run().catch(console.error);
