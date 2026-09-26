const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "329",
    "japanese_text": "右手と右足がしびれるので、外科や神経内科を受診したが、原因は分からなかった。片手と片足だけなので、不思議な感じがする。",
    "english_translation": "My right hand and right foot were numb, so I went to surgery and neurology, but they couldn't find the cause. It's only (happening to) one hand and foot, so it's a strange feeling.",
    "annotated_words": [
      { "meaning_en": "go numb", "furigana": "", "kanji": "しびれる" },
      { "meaning_en": "surgery", "furigana": "げか", "kanji": "外科" },
      { "meaning_en": "nerve", "furigana": "しんけい", "kanji": "神経" },
      { "meaning_en": "internal medicine", "furigana": "ないか", "kanji": "内科" },
      { "meaning_en": "consultation, consult", "furigana": "じゅしん", "kanji": "受診［する］" },
      { "meaning_en": "one ~", "furigana": "かた", "kanji": "片〜" },
      { "meaning_en": "mysterious", "furigana": "ふしぎな", "kanji": "不思議な" }
    ]
  },
  {
    "id": "330",
    "japanese_text": "インフルエンザを予防するために、手洗いとうがいをしなければならない。",
    "english_translation": "We must wash your hands and gargle to prevent the flu.",
    "annotated_words": [
      { "meaning_en": "prevention, prevent", "furigana": "よぼう", "kanji": "予防［する］" },
      { "meaning_en": "hand washing, wash one's hands", "furigana": "てあらい", "kanji": "手洗い［する］" },
      { "meaning_en": "gargle, gargle", "furigana": "", "kanji": "うがい［する］" },
      { "meaning_en": "mouthwash", "furigana": "ぐすり", "kanji": "うがい薬" }
    ]
  },
  {
    "id": "331",
    "japanese_text": "喫煙、飲酒、高血圧はがんになるリスクが高いので、気をつけなければならない。",
    "english_translation": "Smoking, drinking alcohol and high blood pressure put you at high risk of developing cancer, so we have to be careful.",
    "annotated_words": [
      { "meaning_en": "smoking, smoke", "furigana": "きつえん", "kanji": "喫煙［する］" },
      { "meaning_en": "no smoking, quit smoking", "furigana": "きんえん", "kanji": "禁煙［する］" },
      { "meaning_en": "high ~", "furigana": "こう", "kanji": "高〜" },
      { "meaning_en": "blood pressure", "furigana": "けつあつ", "kanji": "血圧" },
      { "meaning_en": "be careful", "furigana": "き", "kanji": "気をつける" }
    ]
  },
  {
    "id": "332",
    "japanese_text": "ドラッグストアで目薬、やけどに効く薬、傷を消毒する薬を買った。",
    "english_translation": "I bought eye drops, burn medicine and wound disinfectant at a drugstore.",
    "annotated_words": [
      { "meaning_en": "eye drops", "furigana": "めぐすり", "kanji": "目薬" },
      { "meaning_en": "burn, get burned", "furigana": "", "kanji": "やけど［する］" },
      { "meaning_en": "be effective", "furigana": "きく", "kanji": "効く" },
      { "meaning_en": "effect", "furigana": "ききめ", "kanji": "効きめ" },
      { "meaning_en": "cut, scratch", "furigana": "きず", "kanji": "傷" },
      { "meaning_en": "disinfecting, disinfect", "furigana": "しょうどく", "kanji": "消毒［する］" },
      { "meaning_en": "alcohol disinfection", "furigana": "しょうどく", "kanji": "アルコール消毒" }
    ]
  },
  {
    "id": "333",
    "japanese_text": "皮膚が腫れて、体をかいてしまうのは、アレルギー症状の一つかもしれない。小さな医院で治らないときは、大きな病院に行き、専門の医師に診てもらった方がいい。",
    "english_translation": "Swelling of the skin and itchiness of the body may be allergic symptoms. If you cannot get cured at a small clinic, you should go to a larger hospital and see a specialist.",
    "annotated_words": [
      { "meaning_en": "skin", "furigana": "ひふ", "kanji": "皮膚" },
      { "meaning_en": "swell", "furigana": "はれる", "kanji": "腫れる" },
      { "meaning_en": "scratch", "furigana": "", "kanji": "かく" },
      { "meaning_en": "allergy", "furigana": "", "kanji": "アレルギー" },
      { "meaning_en": "clinic", "furigana": "いいん", "kanji": "医院" },
      { "meaning_en": "doctor", "furigana": "いし", "kanji": "医師" },
      { "meaning_en": "examine", "furigana": "みる", "kanji": "診る" }
    ]
  },
  {
    "id": "334",
    "japanese_text": "父はめったに病院に行かないが、腹痛と下痢が続き、吐いてしまったので、病院に行った。血液検査をしたが、特に異常はなかった。",
    "english_translation": "My father rarely goes to the hospital, but his abdominal pain and diarrhea continued, and he threw up, so he went to a hospital. A blood test was performed, but there were no particular abnormalities found.",
    "annotated_words": [
      { "meaning_en": "rarely", "furigana": "", "kanji": "めったに" },
      { "meaning_en": "stomach ache", "furigana": "ふくつう", "kanji": "腹痛" },
      { "meaning_en": "diarrhea, have diarrhea", "furigana": "げり", "kanji": "下痢［する］" },
      { "meaning_en": "throw up", "furigana": "はく", "kanji": "吐く" },
      { "meaning_en": "blood", "furigana": "けつえき", "kanji": "血液" },
      { "meaning_en": "blood type", "furigana": "けつえきがた", "kanji": "血液型" },
      { "meaning_en": "inspect, inspection", "furigana": "けんさ", "kanji": "検査［する］" },
      { "meaning_en": "inspection hospitalization", "furigana": "けんさにゅういん", "kanji": "検査入院" }
    ]
  },
  {
    "id": "335",
    "japanese_text": "虫歯の患者が「何も食べられないので、体重が10キロも減った」と言っていた。注射が苦手で、半年もそのままにしていたそうだ。",
    "english_translation": "A patient with cavities said, \"I lost 10 kilos because I couldn't eat anything.\" He hate getting shots, so he neglected his teeth for six months.",
    "annotated_words": [
      { "meaning_en": "cavity", "furigana": "むしば", "kanji": "虫歯" },
      { "meaning_en": "patient", "furigana": "かんじゃ", "kanji": "患者" },
      { "meaning_en": "body weight", "furigana": "たいじゅう", "kanji": "体重" },
      { "meaning_en": "scale (for weighing people)", "furigana": "たいじゅうけい", "kanji": "体重計" },
      { "meaning_en": "injection, give a shot", "furigana": "ちゅうしゃ", "kanji": "注射［する］" }
    ]
  }
];

const overrides = {
    "しびれる": "しびれる",
    "外科": "外科",
    "神経": "神経",
    "内科": "内科",
    "受診": "受診した",
    "片〜": "片",
    "不思議な": "不思議な",
    "予防": "予防する",
    "手洗い": "手洗い",
    "うがい": "うがい",
    "うがい薬": "うがい薬", // won't match, not in text? Oh, it is just 'うがい' in text. Wait, 'うがい薬' is not in the text? ah, let's just skip it if it doesn't match or map to うがい if needed. Wait, it's not in the text at all!
    "喫煙": "喫煙",
    "禁煙": "禁煙", // not in text
    "高〜": "高",
    "血圧": "血圧",
    "気をつける": "気をつけ",
    "目薬": "目薬",
    "やけど": "やけど",
    "効く": "効く",
    "効きめ": "効きめ", // not in text
    "傷": "傷",
    "消毒": "消毒する",
    "アルコール消毒": "アルコール消毒", // not in text
    "皮膚": "皮膚",
    "腫れる": "腫れて",
    "かく": "かいて",
    "アレルギー": "アレルギー",
    "医院": "医院",
    "医師": "医師",
    "診る": "診て",
    "めったに": "めったに",
    "腹痛": "腹痛",
    "下痢": "下痢",
    "吐く": "吐いて",
    "血液": "血液",
    "血液型": "血液型", // not in text
    "検査": "検査",
    "検査入院": "検査入院", // not in text
    "虫歯": "虫歯",
    "患者": "患者",
    "体重": "体重",
    "体重計": "体重計", // not in text
    "注射": "注射"
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
  const topicId = 'topic_16';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 16 健康 Health`;
    story.story_number = i + 9;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1752, 1759, 1763, 1768, 1775, 1782, 1790];
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
  console.log("Topic 16 part 2 successfully pushed!");
}

run().catch(console.error);
