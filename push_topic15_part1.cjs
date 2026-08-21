const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const stories = [
  {
    "id": "305",
    "japanese_text": "私は無職で独身だ。焦ったり、不安になったりすることもある。だが、可能な限り、仕事も恋愛も諦めないでがんばるつもりだ。",
    "english_translation": "I am unemployed and single. I sometimes get impatient or anxious. But I'm going to do my best without giving up on work or love as much as I can.",
    "annotated_words": [
      { "meaning_en": "jobless", "furigana": "むしょく", "kanji": "無職" },
      { "meaning_en": "single", "furigana": "どくしん", "kanji": "独身" },
      { "meaning_en": "get impatient", "furigana": "あせる", "kanji": "焦る" },
      { "meaning_en": "uneasy", "furigana": "ふあんな", "kanji": "不安な" },
      { "meaning_en": "possible", "furigana": "かのうな", "kanji": "可能な" },
      { "meaning_en": "impossible", "furigana": "ふかのうな", "kanji": "不可能な" },
      { "meaning_en": "possibility", "furigana": "かのうせい", "kanji": "可能性" },
      { "meaning_en": "give up", "furigana": "あきらめる", "kanji": "諦める" }
    ]
  },
  {
    "id": "306",
    "japanese_text": "孫は悩んでいる人を助けるため、弁護士になることを目指している。人の倍は努力している様子だ。",
    "english_translation": "My grandson aims to be a lawyer to help those who are in trouble. He seems to be making double the effort of the average person.",
    "annotated_words": [
      { "meaning_en": "grandchild", "furigana": "まご", "kanji": "孫" },
      { "meaning_en": "worry", "furigana": "なやむ", "kanji": "悩む" },
      { "meaning_en": "worry", "furigana": "なやみ", "kanji": "悩み" },
      { "meaning_en": "lawyer", "furigana": "べんごし", "kanji": "弁護士" },
      { "meaning_en": "aim", "furigana": "めざす", "kanji": "目指す" },
      { "meaning_en": "double", "furigana": "ばい", "kanji": "倍" },
      { "meaning_en": "effort, make an effort", "furigana": "どりょく", "kanji": "努力［する］" },
      { "meaning_en": "appearance", "furigana": "ようす", "kanji": "様子" }
    ]
  },
  {
    "id": "307",
    "japanese_text": "同僚は素敵な女性に出会い、真剣に交際している。そのため、まだキスもしていないようだ。",
    "english_translation": "My colleagues met a nice women, and they have started seriously dating. Therefore, it seems that they still haven't kissed.",
    "annotated_words": [
      { "meaning_en": "colleague", "furigana": "どうりょう", "kanji": "同僚" },
      { "meaning_en": "nice", "furigana": "すてきな", "kanji": "素敵な" },
      { "meaning_en": "meet", "furigana": "であう", "kanji": "出会う" },
      { "meaning_en": "encounter", "furigana": "であい", "kanji": "出会い" },
      { "meaning_en": "serious", "furigana": "しんけんな", "kanji": "真剣な" },
      { "meaning_en": "dating, date", "furigana": "こうさい", "kanji": "交際［する］" },
      { "meaning_en": "so, therefore", "furigana": "", "kanji": "そのため" },
      { "meaning_en": "kiss", "furigana": "", "kanji": "キス［する］" }
    ]
  },
  {
    "id": "308",
    "japanese_text": "親友の葬式で、ろうそくを見つめながら、彼女がいないこれからの人生を想像した。つらくなった。",
    "english_translation": "At my best friend's funeral, I imagined life without her from now on while staring at a candle. It was tough.",
    "annotated_words": [
      { "meaning_en": "funeral", "furigana": "そうしき", "kanji": "葬式" },
      { "meaning_en": "candle", "furigana": "", "kanji": "ろうそく" },
      { "meaning_en": "life", "furigana": "じんせい", "kanji": "人生" },
      { "meaning_en": "imagination, imagine", "furigana": "そうぞう", "kanji": "想像［する］" },
      { "meaning_en": "imagination", "furigana": "そうぞうりょく", "kanji": "想像力" },
      { "meaning_en": "painful, hard, tough", "furigana": "", "kanji": "つらい" }
    ]
  },
  {
    "id": "309",
    "japanese_text": "両親は理想的な夫婦だ。お互いに相手を大切にしている。母が父にプロポーズしたらしい。",
    "english_translation": "My parents are an ideal couple. They value each other. It seems my mother proposed to my father.",
    "annotated_words": [
      { "meaning_en": "ideal", "furigana": "りそうてきな", "kanji": "理想的な" },
      { "meaning_en": "ideal", "furigana": "りそう", "kanji": "理想" },
      { "meaning_en": "(married) couple", "furigana": "ふうふ", "kanji": "夫婦" },
      { "meaning_en": "each other", "furigana": "おたがい", "kanji": "お互い（に）" },
      { "meaning_en": "opponent", "furigana": "あいて", "kanji": "相手" },
      { "meaning_en": "proposal, propose", "furigana": "", "kanji": "プロポーズ［する］" }
    ]
  },
  {
    "id": "310",
    "japanese_text": "末っ子の娘は、たとえ結婚しても絶対に姓は変えたくないと言っている。世の中の常識に縛られたくないらしい。",
    "english_translation": "My youngest daughter says that even if she gets married, she definitely doesn't want to change her surname. It seems that she doesn't want to be tied down by the common thinking of the world.",
    "annotated_words": [
      { "meaning_en": "youngest child", "furigana": "すえっこ", "kanji": "末っ子" },
      { "meaning_en": "even if", "furigana": "", "kanji": "たとえ" },
      { "meaning_en": "definitely", "furigana": "ぜったい", "kanji": "絶対（に）" },
      { "meaning_en": "surname", "furigana": "せい", "kanji": "姓" },
      { "meaning_en": "in the world", "furigana": "よのなか", "kanji": "世の中" },
      { "meaning_en": "common sense", "furigana": "じょうしき", "kanji": "常識" },
      { "meaning_en": "tie", "furigana": "しばる", "kanji": "縛る" }
    ]
  },
  {
    "id": "311",
    "japanese_text": "ある友人は、周囲の人に小さな出来事を大げさに話すので、聞いていていらいらする。",
    "english_translation": "One of my friends always makes a big deal of things, and I get annoyed just listening.",
    "annotated_words": [
      { "meaning_en": "a certain", "furigana": "", "kanji": "ある" },
      { "meaning_en": "surroundings", "furigana": "しゅうい", "kanji": "周囲" },
      { "meaning_en": "incident", "furigana": "できごと", "kanji": "出来事" },
      { "meaning_en": "exaggerated", "furigana": "おおげさな", "kanji": "大げさな" },
      { "meaning_en": "annoyance, be annoyed", "furigana": "", "kanji": "いらいら［する］" }
    ]
  },
  {
    "id": "312",
    "japanese_text": "公務員試験のために自分で勉強するだけではなく、日本語教師の資格講座も最前列で受けている。標準的な問題は分かるが、難しい問題が多い。なかなか自信が付かない。",
    "english_translation": "I not only study for the civil service exam, but also take Japanese language teacher qualification courses sitting in the front row. Tuy hiểu các câu hỏi tiêu chuẩn nhưng nhiều câu hỏi khó. Mãi mà tôi không có được sự tự tin.",
    "annotated_words": [
      { "meaning_en": "civil servant", "furigana": "こうむいん", "kanji": "公務員" },
      { "meaning_en": "qualification", "furigana": "しかく", "kanji": "資格" },
      { "meaning_en": "course", "furigana": "こうざ", "kanji": "講座" },
      { "meaning_en": "most ~", "furigana": "さい", "kanji": "最〜" },
      { "meaning_en": "standard", "furigana": "ひょうじゅん", "kanji": "標準" },
      { "meaning_en": "self-confidence", "furigana": "じしん", "kanji": "自信" },
      { "meaning_en": "be attached", "furigana": "つく", "kanji": "付く" }
    ]
  }
];

const overrides = {
    "焦る": "焦ったり",
    "不安な": "不安になったり",
    "可能な": "可能な",
    "諦める": "諦めないで",
    "悩む": "悩んでいる",
    "目指す": "目指している",
    "努力": "努力している",
    "出会う": "出会い",
    "真剣な": "真剣に",
    "交際": "交際している",
    "キス": "キスもしていない",
    "想像": "想像した",
    "理想的な": "理想的な",
    "お互い（に）": "お互いに",
    "プロポーズ": "プロポーズした",
    "絶対（に）": "絶対に",
    "縛る": "縛られたく",
    "大げさな": "大げさに",
    "いらいら": "いらいらする",
    "最〜": "最前列",
    "標準": "標準的な",
    "付く": "付かない"
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
    let kanjiA = a.kanji.replace(/［する］|\[する\]|（|）|（に）/g, '');
    let kanjiB = b.kanji.replace(/［する］|\[する\]|（|）|（に）/g, '');
    let searchA = overrides[kanjiA] || kanjiA;
    let searchB = overrides[kanjiB] || kanjiB;
    return searchB.length - searchA.length;
  });

  const replacements = [];
  for (const w of sortedWords) {
    let kanjiPlain = w.kanji.replace(/［する］|\[する\]|（|）|（に）/g, '');
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
  const topicId = 'topic_15';
  console.log(`Processing ${topicId}...`);
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    
    story.title = `Topic 15 人生 Life`;
    story.story_number = i + 1;
    story.is_story = true;
    story.page_story = story.id;
    
    story.japanese_text = wrapWords(story.japanese_text, story.annotated_words);
    story.japanese_text = story.japanese_text.replace(/\n/g, '<br/>');
    
    let startWords = [1602, 1610, 1618, 1626, 1632, 1638, 1645, 1650];
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
  console.log("Topic 15 part 1 successfully pushed!");
}

run().catch(console.error);
