const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "321",
    "japanese_text": "以前は完全な治療法はなかったが、医学の発達によって、がんも治るようになってきた。",
    "english_translation": "Previously there was no cure, but with the development of medicine, cancer has now also become treatable.",
    "annotated_words": [
      { "meaning_en": "complete", "furigana": "かんぜんな", "kanji": "完全な" },
      { "meaning_en": "treatment, treat, cure", "furigana": "ちりょう", "kanji": "治療［する］" },
      { "meaning_en": "medicine", "furigana": "いがく", "kanji": "医学" },
      { "meaning_en": "development, develop", "furigana": "はったつ", "kanji": "発達［する］" },
      { "meaning_en": "cancer", "furigana": "", "kanji": "がん" }
    ]
  },
  {
    "id": "322",
    "japanese_text": "２年前に日本に来たときはホームシックになり、ストレスを感じて睡眠不足だった。しかし、今ではすっかり日本の生活にも慣れ、毎日ぐっすりと寝ている。",
    "english_translation": "When I came to Japan two years ago, I became homesick, stressed and sleep deprived. However, I'm now completely accustomed to life in Japan and sleep soundly every day.",
    "annotated_words": [
      { "meaning_en": "homesick", "furigana": "", "kanji": "ホームシック" },
      { "meaning_en": "stress", "furigana": "", "kanji": "ストレス" },
      { "meaning_en": "lack of sleep", "furigana": "すいみんぶそく", "kanji": "睡眠不足" },
      { "meaning_en": "sleep", "furigana": "すいみん", "kanji": "睡眠" },
      { "meaning_en": "soundly (asleep)", "furigana": "", "kanji": "ぐっすり（と）" }
    ]
  },
  {
    "id": "323",
    "japanese_text": "せきとくしゃみが出るので、体温計で熱を測ったが、平熱だった。",
    "english_translation": "I had a cough and sneeze, so I measured my fever with a thermometer, but it was normal.",
    "annotated_words": [
      { "meaning_en": "cough", "furigana": "", "kanji": "せき" },
      { "meaning_en": "sneeze", "furigana": "", "kanji": "くしゃみ" },
      { "meaning_en": "body temperature", "furigana": "たいおん", "kanji": "体温" },
      { "meaning_en": "~ meter", "furigana": "けい", "kanji": "〜計" },
      { "meaning_en": "measure", "furigana": "はかる", "kanji": "測る/計る/量る" },
      { "meaning_en": "normal temperature", "furigana": "へいねつ", "kanji": "平熱" },
      { "meaning_en": "slight fever", "furigana": "びねつ", "kanji": "微熱" },
      { "meaning_en": "high fever", "furigana": "こうねつ", "kanji": "高熱" }
    ]
  },
  {
    "id": "324",
    "japanese_text": "頭痛や吐き気がする。もしかしたら新型コロナウイルスに感染したかもしれない。",
    "english_translation": "I have a headache and nausea. Maybe I was infected with the novel coronavirus.",
    "annotated_words": [
      { "meaning_en": "headache", "furigana": "ずつう", "kanji": "頭痛" },
      { "meaning_en": "nausea", "furigana": "はきけ", "kanji": "吐き気" },
      { "meaning_en": "novel coronavirus (Covid-19)", "furigana": "しんがた", "kanji": "新型コロナウイルス" },
      { "meaning_en": "virus", "furigana": "", "kanji": "ウイルス" },
      { "meaning_en": "infect, get infected", "furigana": "かんせん", "kanji": "感染［する］" }
    ]
  },
  {
    "id": "325",
    "japanese_text": "心臓病を抱えていた父は、お店を休業して手術を受けた。２年後の今では症状も安定して、健康な生活を送っている。",
    "english_translation": "My father, who had heart disease, closed his shop and had surgery. Two years later, he is now living a healthy life with stable symptoms.",
    "annotated_words": [
      { "meaning_en": "heart", "furigana": "しんぞう", "kanji": "心臓" },
      { "meaning_en": "~ disease", "furigana": "びょう", "kanji": "〜病" },
      { "meaning_en": "close, be closed (business)", "furigana": "きゅうぎょう", "kanji": "休業［する］" },
      { "meaning_en": "surgery, operate", "furigana": "しゅじゅつ", "kanji": "手術［する］" },
      { "meaning_en": "after ~", "furigana": "ご", "kanji": "〜後" },
      { "meaning_en": "symptoms", "furigana": "しょうじょう", "kanji": "症状" },
      { "meaning_en": "healthy", "furigana": "けんこうな", "kanji": "健康な" }
    ]
  },
  {
    "id": "326",
    "japanese_text": "産婦人科に行くと、看護師に「もうすぐなので、椅子に腰掛けて、少しお待ちください」と言われた。",
    "english_translation": "When I went to the obstetrics and gynecology department, the nurse said, \"It's about time, so please sit down in a chair and wait for a while.\"",
    "annotated_words": [
      { "meaning_en": "obstetrics and gynecology", "furigana": "さんふじんか", "kanji": "産婦人科" },
      { "meaning_en": "nurse", "furigana": "かんごし", "kanji": "看護師" },
      { "meaning_en": "sit", "furigana": "こしかける", "kanji": "腰掛ける" }
    ]
  },
  {
    "id": "327",
    "japanese_text": "胸と胃に痛みを感じたので、大きな病院に行った。わざわざ院長がおいでになり、詳しく診察してくれたが、よく分からないと言われてしまった。",
    "english_translation": "I felt pain in my chest and stomach, so I went to a big hospital. The director came all the way to examine me in detail, but I was told that he couldn't find out the cause.",
    "annotated_words": [
      { "meaning_en": "chest", "furigana": "むね", "kanji": "胸" },
      { "meaning_en": "stomach", "furigana": "い", "kanji": "胃" },
      { "meaning_en": "pain", "furigana": "いたみ", "kanji": "痛み" },
      { "meaning_en": "come, visit (honorific)", "furigana": "", "kanji": "おいでになる" },
      { "meaning_en": "exam, examine", "furigana": "しんさつ", "kanji": "診察［する］" },
      { "meaning_en": "patient registration card", "furigana": "しんさつけん", "kanji": "診察券" }
    ]
  },
  {
    "id": "328",
    "japanese_text": "交通事故が発生した。運転手は出血がひどくて、骨折しているようだ。",
    "english_translation": "A traffic accident has occurred. The driver seems to be bleeding badly and have broken bones.",
    "annotated_words": [
      { "meaning_en": "appearance, appear", "furigana": "はっせい", "kanji": "発生［する］" },
      { "meaning_en": "bleeding, bleed", "furigana": "しゅっけつ", "kanji": "出血［する］" },
      { "meaning_en": "fracture, be fractured", "furigana": "こっせつ", "kanji": "骨折［する］" }
    ]
  }
];

const overrides = {
    "完全な": "完全な",
    "治療": "治療法",
    "医学": "医学",
    "発達": "発達",
    "がん": "がん",
    "ホームシック": "ホームシック",
    "ストレス": "ストレス",
    "睡眠不足": "睡眠不足",
    "睡眠": "睡眠",
    "ぐっすり（と）": "ぐっすりと",
    "せき": "せき",
    "くしゃみ": "くしゃみ",
    "体温": "体温",
    "〜計": "計",
    "測る/計る/量る": "測った",
    "平熱": "平熱",
    "微熱": "微熱",
    "高熱": "高熱",
    "頭痛": "頭痛",
    "吐き気": "吐き気",
    "新型コロナウイルス": "新型コロナウイルス",
    "ウイルス": "ウイルス",
    "感染": "感染した",
    "心臓": "心臓",
    "〜病": "病",
    "休業": "休業して",
    "手術": "手術",
    "〜後": "後",
    "症状": "症状",
    "健康な": "健康な",
    "産婦人科": "産婦人科",
    "看護師": "看護師",
    "腰掛ける": "腰掛けて",
    "胸": "胸",
    "胃": "胃",
    "痛み": "痛み",
    "おいでになる": "おいでになり",
    "診察": "診察して",
    "診察券": "診察券",
    "発生": "発生した",
    "出血": "出血",
    "骨折": "骨折している"
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
    let kanjiA = a.kanji.replace(/［する］|\[する\]|（|）|（と）/g, '');
    let kanjiB = b.kanji.replace(/［する］|\[する\]|（|）|（と）/g, '');
    let searchA = overrides[kanjiA] || kanjiA;
    let searchB = overrides[kanjiB] || kanjiB;
    return searchB.length - searchA.length;
  });

  const replacements = [];
  for (const w of sortedWords) {
    let kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）|（と）/g, '');
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
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1710, 1715, 1720, 1728, 1733, 1740, 1743, 1749];
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
  console.log("Topic 16 part 1 successfully pushed!");
}

run().catch(console.error);
