import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 17 Stories (Work) - Part 1
const topic17StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 17 仕事",
    page_story: "234_1",
    japanese_text: "<u>厳重に</u> <u>警備して</u>いたにもかかわらず<u>強盗</u>に入られた。しかし、<u>もともと</u>現金はほとんど置いておらず、大事なものは<u>金庫</u>に入れてあったので、あまり<u>損害</u>はなかった。",
    english_translation: "Although the place was strictly guarded, burglars still got in. However, since we'd left very little cash on the premises from the beginning and kept important items in a safe, we didn't suffer much damage.",
    annotated_words: [
      { word_id: "n2_1578", word_number: 1578, kanji: "厳重な", furigana: "げんじゅうな", meaning_en: "strict, rigorous" },
      { word_id: "n2_1579", word_number: 1579, kanji: "警備[する]", furigana: "けいび", meaning_en: "guard, guard" },
      { word_id: "n2_1580", word_number: 1580, kanji: "強盗", furigana: "ごうとう", meaning_en: "thief, burglar" },
      { word_id: "n2_1581", word_number: 1581, kanji: "もともと", furigana: "", meaning_en: "original position, all along, from the beginning" },
      { word_id: "n2_1582", word_number: 1582, kanji: "金庫", furigana: "きんこ", meaning_en: "safe" },
      { word_id: "n2_1583", word_number: 1583, kanji: "損害", furigana: "そんがい", meaning_en: "damage, harm" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 17 仕事",
    page_story: "235_1",
    japanese_text: "<u>欠勤</u>は<u>事情</u>があれば当日の申請でも認められるが、できれば<u>振り替え</u>休日か有給休暇を取ってしっかり<u>休息した</u>方がよい。",
    english_translation: "An absence from work can be requested on the same day if circumstances allow, but if possible, it is better to take a substitute day off to make up for it or take a paid vacation day to get some proper rest.",
    annotated_words: [
      { word_id: "n2_1584", word_number: 1584, kanji: "欠勤[する]", furigana: "けっきん", meaning_en: "absence from work, be absent from work" },
      { word_id: "n2_1585", word_number: 1585, kanji: "事情", furigana: "じじょう", meaning_en: "circumstances, affairs" },
      { word_id: "n2_1586", word_number: 1586, kanji: "振り替え", furigana: "ふりかえ", meaning_en: "transfer, substitution" },
      { word_id: "n2_1587", word_number: 1587, kanji: "休息[する]", furigana: "きゅうそく", meaning_en: "rest, take a rest" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 17 仕事",
    page_story: "235_2",
    japanese_text: "就職して<u>新人</u>研修を受けるまで、「<u>存じて</u>おります」とか「<u>承りました</u>」、「<u>ただ今</u>お持ちします」といった、丁寧に<u>応対する</u>ときの日本語を使うことはなかった。",
    english_translation: "Until I got a job and underwent training as a newcomer, I'd never used the polite versions of Japanese phrases for serving customers, such as \"I know,\" \"I understand,\" or \"I'll bring it right away.\"",
    annotated_words: [
      { word_id: "n2_1588", word_number: 1588, kanji: "新人", furigana: "しんじん", meaning_en: "newcomer" },
      { word_id: "n2_1589", word_number: 1589, kanji: "存じる／存ずる", furigana: "ぞんじる／ぞんずる", meaning_en: "know, feel" },
      { word_id: "n2_1590", word_number: 1590, kanji: "承る", furigana: "うけたまわる", meaning_en: "understand" },
      { word_id: "n2_1591", word_number: 1591, kanji: "ただ今", furigana: "ただいま", meaning_en: "now, right away" },
      { word_id: "n2_1592", word_number: 1592, kanji: "応対[する]", furigana: "おうたい", meaning_en: "service, respond" }
    ]
  }
];

topic17StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 17 story ${story.story_number}: ${story.page_story}.json`);
});
