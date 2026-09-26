const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "171_1",
    "japanese_text": "高速道路のサービスエリアは、昔はトラックが駐車して休憩するところというイメージだったが、今は買い物が楽しめ、遊園地があるところもある。長距離バスの停留所もあるので、車がなくても行くことができる。",
    "english_translation": "Highway service areas were once seen as a place where trucks stop for rest, but now many of them have different options for shopping. Some even have amusement parks. Many also have bus stops for long-distance buses, so you can go even if you don't have a car.",
    "annotated_words": [
      { "meaning_en": "truck", "furigana": "", "kanji": "トラック" },
      { "meaning_en": "parking, park", "furigana": "ちゅうしゃ", "kanji": "駐車［する］" },
      { "meaning_en": "parking lot", "furigana": "ちゅうしゃじょう", "kanji": "駐車場" },
      { "meaning_en": "amusement park", "furigana": "ゆうえんち", "kanji": "遊園地" },
      { "meaning_en": "long", "furigana": "ちょう", "kanji": "長〜" },
      { "meaning_en": "bus stop", "furigana": "ていりゅうじょ", "kanji": "停留所" }
    ]
  },
  {
    "id": "172_1",
    "japanese_text": "A：なんか横浜港をクルーズ船で回りながらディナーが食べられるツアーがあるらしいよ。\nB：へえ。でも前から予約しないといけないんじゃないの。\nA：いや、定員が多いから、平日なら前日でもOKだったって。",
    "english_translation": "A: Apparently they have a tour where you can get on a cruise ship and have dinner as it goes around Yokohama Bay. B: Do they? I'll bet you have to make a reservation in advance, don't you? A: No, I heard they have a large capacity on the ship that for weekdays, you can even make the reservation the day before.",
    "annotated_words": [
      { "meaning_en": "~ bay", "furigana": "こう", "kanji": "〜港" },
      { "meaning_en": "~ ship", "furigana": "せん", "kanji": "〜船" },
      { "meaning_en": "tour", "furigana": "", "kanji": "ツアー" },
      { "meaning_en": "capacity", "furigana": "ていいん", "kanji": "定員" },
      { "meaning_en": "day before", "furigana": "ぜんじつ", "kanji": "前日" }
    ]
  },
  {
    "id": "172_2",
    "japanese_text": "東海道新幹線の自由席は1号車から3号車までだ。東京発の「のぞみ号」の場合、前の方にある。",
    "english_translation": "The Tokaido Shinkansen has unreserved seats from the first to third car. On the Nozomi departing from Tokyo, they are toward the front of the train.",
    "annotated_words": [
      { "meaning_en": "unreserved seat", "furigana": "じゆうせき", "kanji": "自由席" },
      { "meaning_en": "~ car", "furigana": "しゃ", "kanji": "〜車" },
      { "meaning_en": "departing from ~", "furigana": "はつ", "kanji": "〜発" }
    ]
  },
  {
    "id": "173_1",
    "japanese_text": "旅をするときは、すりに気をつけないといけない。特に市場など、人が多い場所は注意が必要だ。カバンは体の正面で持った方がいい。",
    "english_translation": "When traveling, you have to be careful about pickpockets. You need to be especially cautious in markets or other crowded places. You should carry your bags toward the front of your body.",
    "annotated_words": [
      { "meaning_en": "travelling, travel", "furigana": "たび", "kanji": "旅［する］" },
      { "meaning_en": "pickpocketing", "furigana": "", "kanji": "すり" },
      { "meaning_en": "market", "furigana": "いちば", "kanji": "市場" },
      { "meaning_en": "front", "furigana": "しょうめん", "kanji": "正面" }
    ]
  },
  {
    "id": "173_2",
    "japanese_text": "たくさんの人を乗せたモノレールのブレーキが故障し、駅の壁にぶつかる事故が起きた。駅ではサイレンが鳴り響き、たくさんの人が非常口に集まり、けが人が出た。",
    "english_translation": "There was an accident involving the brakes failing on a monorail full of passengers where the monorail hit the wall of a station. The station sirens wailed and many people were gathered around the emergency exits. Some were injured.",
    "annotated_words": [
      { "meaning_en": "put on", "furigana": "のせる", "kanji": "乗せる" },
      { "meaning_en": "monorail", "furigana": "", "kanji": "モノレール" },
      { "meaning_en": "brake", "furigana": "", "kanji": "ブレーキ" },
      { "meaning_en": "siren", "furigana": "", "kanji": "サイレン" },
      { "meaning_en": "emergency exit", "furigana": "ひじょうぐち", "kanji": "非常口" }
    ]
  },
  {
    "id": "174_1",
    "japanese_text": "紙の乗車券の時代は、電車に乗った後、降りる駅が決まっていた。先の駅まで乗り越したときは、専用の機械に乗車券とお金を入れる必要があった。今はICカードなので、タッチするだけで、どの駅でも自由に降りることができる。",
    "english_translation": "Back when train tickets were all paper, once you got on, you had to get off at the station your ticket said. If you went past the station on your ticket, you would have to put your ticket and some money in a special machine for it. Now we have IC cards so all you have to do is tap it and you can get off at any station you want.",
    "annotated_words": [
      { "meaning_en": "ticket", "furigana": "じょうしゃけん", "kanji": "乗車券" },
      { "meaning_en": "riding, ride", "furigana": "じょうしゃ", "kanji": "乗車［する］" },
      { "meaning_en": "go past", "furigana": "のりこす", "kanji": "乗り越す" },
      { "meaning_en": "tap, touch", "furigana": "", "kanji": "タッチ［する］" }
    ]
  },
  {
    "id": "174_2",
    "japanese_text": "A：一回、ロケットに乗って宇宙に行ってみたいって思わない？\nB：思わない。だって最初はいいけど、絶対退屈するって。\nA：夢がないなあ。何か乗ってみたい乗り物ってないの？\nB：ヘリコプターかな。",
    "english_translation": "A: Would you ever want to try getting in a rocket to go to space once? B: I wouldn't want to. I mean, it would be nice at first, but it would absolutely get boring. A: Not very ambitious of you. Isn't there something you've always wanted to take a ride on? B: Maybe a helicopter?",
    "annotated_words": [
      { "meaning_en": "rocket", "furigana": "", "kanji": "ロケット" },
      { "meaning_en": "I mean, . . . because", "furigana": "", "kanji": "だって" },
      { "meaning_en": "boredom, be bored", "furigana": "たいくつ", "kanji": "退屈［する］" },
      { "meaning_en": "helicopter", "furigana": "", "kanji": "ヘリコプター" }
    ]
  },
  {
    "id": "175_1",
    "japanese_text": "大学のサークルのメンバーで、2泊3日の卒業旅行に行くことになった。ガイドブックを見ながら支度していると、期待が高まってきた。",
    "english_translation": "I was planning to go on a graduation trip for two nights and three days with other members of a club I was in at university. I got more and more excited about it as I packed and prepared while looking through guidebooks at the same time.",
    "annotated_words": [
      { "meaning_en": "club", "furigana": "", "kanji": "サークル" },
      { "meaning_en": "~ nights", "furigana": "はく", "kanji": "〜泊" },
      { "meaning_en": "guidebook", "furigana": "", "kanji": "ガイドブック" },
      { "meaning_en": "guide, guide", "furigana": "", "kanji": "ガイド［する］" },
      { "meaning_en": "preparations, prepare", "furigana": "したく", "kanji": "支度［する］" },
      { "meaning_en": "expectations, expect", "furigana": "きたい", "kanji": "期待［する］" }
    ]
  },
  {
    "id": "176_1",
    "japanese_text": "日本に来たときは、早く帰りたいと思っていたが、帰国の日が近づくと、次第に帰りたくないという気持ちが大きくなった。",
    "english_translation": "When I first came to Japan, I couldn't wait to return home, but as the day I was to return drew nearer, the feeling of not wanting to go back home gradually came to outweigh it.",
    "annotated_words": [
      { "meaning_en": "returning home, return home", "furigana": "きこく", "kanji": "帰国［する］" },
      { "meaning_en": "draw near, approach", "furigana": "ちかづく", "kanji": "近づく" },
      { "meaning_en": "gradually", "furigana": "しだいに", "kanji": "次第に" }
    ]
  },
  {
    "id": "176_2",
    "japanese_text": "この草は蓬といって、食べることができる。薬の原料にもなる。蓬餅はスーパーでも売っているので、ぜひとも一度食べてみてほしい。",
    "english_translation": "This plant is called yomogi, and it is edible. It is also used as an ingredient in medicine. Yomogi-mochi is even sold in supermarkets, so I would like you to try it.",
    "annotated_words": [
      { "meaning_en": "grass", "furigana": "くさ", "kanji": "草" },
      { "meaning_en": "material, ingredient", "furigana": "げんりょう", "kanji": "原料" },
      { "meaning_en": "by all means", "furigana": "", "kanji": "ぜひ（とも）" }
    ]
  },
  {
    "id": "177_1",
    "japanese_text": "深海に住む珍しい魚が、偶然網にかかることがある。",
    "english_translation": "Rare fish that live in the deep sea are sometimes caught in fishing nets by chance.",
    "annotated_words": [
      { "meaning_en": "deep sea", "furigana": "しんかい", "kanji": "深海" },
      { "meaning_en": "by chance", "furigana": "ぐうぜん", "kanji": "偶然" },
      { "meaning_en": "net", "furigana": "あみ", "kanji": "網" },
      { "meaning_en": "overhead luggage rack", "furigana": "あみだな", "kanji": "網棚" }
    ]
  },
  {
    "id": "177_2",
    "japanese_text": "このホテルは全世界にある、巨大なチェーンだ。ほとんどの部屋がシングルルームという特徴がある。",
    "english_translation": "This hotel is part of a huge chain that's all over the world. One special characteristic of it is that most of its rooms are singles.",
    "annotated_words": [
      { "meaning_en": "all ~", "furigana": "ぜん", "kanji": "全〜" },
      { "meaning_en": "chain", "furigana": "", "kanji": "チェーン" },
      { "meaning_en": "single", "furigana": "", "kanji": "シングル" },
      { "meaning_en": "double", "furigana": "", "kanji": "ダブル" },
      { "meaning_en": "twin", "furigana": "", "kanji": "ツイン" }
    ]
  }
];

const overrides = {
    "駐車": "駐車して",
    "長〜": "長距離",
    "〜港": "港",
    "〜船": "船",
    "〜車": "号車",
    "〜発": "発",
    "旅": "旅を",
    "乗せる": "乗せた",
    "乗り越す": "乗り越した",
    "タッチ": "タッチする",
    "退屈": "退屈する",
    "〜泊": "泊",
    "支度": "支度して",
    "期待": "期待が",
    "帰国": "帰国",
    "近づく": "近づく",
    "ぜひ（とも）": "ぜひとも",
    "全〜": "全世界"
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
    story.story_number = i + 19;
    story.is_story = true;
    story.page_story = story.id;
    
    // Process newlines to <br/> for A: B:
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let currentWordId = 1247 + i*10; // rough start
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
  console.log("Topic 12 part 3 successfully pushed!");
}

run().catch(console.error);
