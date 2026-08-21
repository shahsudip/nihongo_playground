const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "199_1",
    "japanese_text": "A：小学校で思い出に残っている行事って何？\nB：私は遠足。お弁当を作ってもらうのがうれしくて。\nA：へえ。私は運動会。\nB：あなたは運動会で輝いてたよね。\nA：Bちゃんはピアノがうまかったから、音楽の演奏会で目立ってた印象があるよ。\nB：本当？ 私、地味だったのに。\nA：そんなことないよ。",
    "english_translation": "A: Are there any events that remain as memories for you from elementary school? B: For me, class trips. I was happy that I had a lunch made for me. A: Wow. For me, it's sports day. B: You were a shining star on sports day, weren't you? A: And you were great on the piano, B-chan, so I always had the impression that you stood out at the music recital. B: Really? I was mediocre. A: That's not true.",
    "annotated_words": [
      { "meaning_en": "memory", "furigana": "おもいで", "kanji": "思い出" },
      { "meaning_en": "event", "furigana": "ぎょうじ", "kanji": "行事" },
      { "meaning_en": "school trip", "furigana": "えんそく", "kanji": "遠足" },
      { "meaning_en": "shine", "furigana": "かがやく", "kanji": "輝く" },
      { "meaning_en": "musical performance, play (music)", "furigana": "えんそう", "kanji": "演奏［する］" },
      { "meaning_en": "impression", "furigana": "いんしょう", "kanji": "印象" },
      { "meaning_en": "impressive", "furigana": "いんしょうてきな", "kanji": "印象的な" },
      { "meaning_en": "plain, simple", "furigana": "じみな", "kanji": "地味な" }
    ]
  },
  {
    "id": "200_1",
    "japanese_text": "日本の大学は「前期」に15週、「後期」に15週、合計30週授業を行うところが多いが、最近は3学期制やクォーター制の大学もある。たいてい1年生は忙しく、時間割を見ると朝から夕方まで授業がたくさんある。しかし、4年生になると授業は減る。授業の内容はシラバスに載っている。",
    "english_translation": "Japan's universities have a total of 30 weeks of classes with 15 weeks in the first semester, and 15 weeks in the second semester, but there are also universities that have trimesters and quarters. Usually, first-year students are busy, and when you look at their schedules, they have many classes from morning to evening. However, once they become fourth-year students, the number of classes will decrease. The content of the classes is written on the syllabus.",
    "annotated_words": [
      { "meaning_en": "first semester", "furigana": "ぜんき", "kanji": "前期" },
      { "meaning_en": "second semester", "furigana": "こうき", "kanji": "後期" },
      { "meaning_en": "sum total, total", "furigana": "ごうけい", "kanji": "合計［する］" },
      { "meaning_en": "schedule, timetable", "furigana": "じかんわり", "kanji": "時間割" },
      { "meaning_en": "syllabus", "furigana": "", "kanji": "シラバス" }
    ]
  },
  {
    "id": "200_2",
    "japanese_text": "工事のために掘られていた小さな穴に気づかず、こけてしまった。そのとき、足を石にぶつけて、けがをしてしまった。",
    "english_translation": "I didn't notice a small hole that had been dug for construction, and I tripped it. At that moment, my foot bumped into a rock, and I injured myself.",
    "annotated_words": [
      { "meaning_en": "dig", "furigana": "ほる", "kanji": "掘る" },
      { "meaning_en": "trip", "furigana": "", "kanji": "こける" },
      { "meaning_en": "bump (into)", "furigana": "", "kanji": "ぶつける" },
      { "meaning_en": "collide with", "furigana": "", "kanji": "ぶつかる" }
    ]
  },
  {
    "id": "201_1",
    "japanese_text": "今日のホームルームは、学級委員が中心になって、司会をしてくれた。",
    "english_translation": "In today's homeroom, the class committee took the lead and acted as moderators.",
    "annotated_words": [
      { "meaning_en": "committee member", "furigana": "いいん", "kanji": "委員" },
      { "meaning_en": "committee", "furigana": "いいんかい", "kanji": "委員会" },
      { "meaning_en": "center", "furigana": "ちゅうしん", "kanji": "中心" },
      { "meaning_en": "moderating", "furigana": "しかい", "kanji": "司会" },
      { "meaning_en": "moderator, emcee", "furigana": "しかいしゃ", "kanji": "司会者" }
    ]
  }
];

const overrides = {
    "輝く": "輝いて",
    "演奏": "演奏会",
    "地味な": "地味だった",
    "合計": "合計",
    "掘る": "掘られて",
    "こける": "こけて",
    "ぶつける": "ぶつけて",
    "委員": "委員",
    "司会": "司会をして"
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
  const topicId = 'topic_13';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 13 学校 School`;
    story.story_number = i + 33;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1471, 1479, 1484, 1488];
    let currentWordId = startWords[i];
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
  console.log("Topic 13 part 4 successfully pushed!");
}

run().catch(console.error);
