import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 13 Stories (Cities) - Part 1
const topic13StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 13 町",
    page_story: "172_1",
    japanese_text: "トラックが<u>回送</u>中の路線バスに<u>追突し</u>、大通りに<u>面した</u>コンビニエンスストアに<u>突っ込んだ</u>。店内にいた客や店員にけがはなかったものの、<u>日用品</u>が散乱していた。",
    english_translation: "A truck rear-ended an out-of-service city bus, and smashed into a convenience store facing onto a main street. Customers and staff inside the store weren't injured, but daily necessities were scattered about everywhere.",
    annotated_words: [
      { word_id: "n2_1101", word_number: 1101, kanji: "回送[する]", furigana: "かいそう", meaning_en: "out-of-service (vehicle), return to station" },
      { word_id: "n2_1102", word_number: 1102, kanji: "追突[する]", furigana: "ついとつ", meaning_en: "rear-end collision, rear-end" },
      { word_id: "n2_1103", word_number: 1103, kanji: "面する", furigana: "めんする", meaning_en: "face onto" },
      { word_id: "n2_1104", word_number: 1104, kanji: "突っ込む", furigana: "つっこむ", meaning_en: "ram, smash into" },
      { word_id: "n2_1105", word_number: 1105, kanji: "日用品", furigana: "にちようひん", meaning_en: "daily necessities" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 13 町",
    page_story: "173_1",
    japanese_text: "最寄り駅から説明会会場への<u>道順</u>をお知らせします。北口を出て左に曲がると、前方に銭湯の<u>煙突</u>が見えるので、それを<u>目印</u>としてまっすぐ進みます。銭湯の先の、<u>空き地</u>を挟んだ隣のビルの一階が会場です。駅から<u>徒歩</u>10分くらいですが、その<u>辺り</u>は<u>人通り</u>が少なく、あまり治安が良くないので<u>用心して</u>ください。",
    english_translation: "The following is the route from the nearest station to the session venue. Take the north exit and turn left. You will see the chimney of a public bathhouse ahead of you. Using this as a landmark, go straight ahead. The venue is on the first floor of the building in front of the bathhouse across a vacant lot. It's about a ten-minute walk from the station, but please take care, as the neighborhood is not very safe and there is not much foot traffic around.",
    annotated_words: [
      { word_id: "n2_1106", word_number: 1106, kanji: "道順", furigana: "みちじゅん", meaning_en: "route" },
      { word_id: "n2_1107", word_number: 1107, kanji: "煙突", furigana: "えんとつ", meaning_en: "chimney" },
      { word_id: "n2_1108", word_number: 1108, kanji: "目印", furigana: "めじるし", meaning_en: "landmark" },
      { word_id: "n2_1109", word_number: 1109, kanji: "空き地", furigana: "あきち", meaning_en: "vacant lot" },
      { word_id: "n2_1110", word_number: 1110, kanji: "徒歩", furigana: "とほ", meaning_en: "walk" },
      { word_id: "n2_1111", word_number: 1111, kanji: "辺り", furigana: "あたり", meaning_en: "area, neighborhood" },
      { word_id: "n2_1112", word_number: 1112, kanji: "人通り", furigana: "ひとどおり", meaning_en: "foot traffic, pedestrian traffic" },
      { word_id: "n2_1113", word_number: 1113, kanji: "用心[する]", furigana: "ようじん", meaning_en: "caution, take care" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 13 町",
    page_story: "174_1",
    japanese_text: "安心・安全な町づくりのために、<u>防犯カメラ</u>を設置する<u>地区</u>が増えている。<u>街角</u>や交差点<u>付近</u>、小・中学校の通学<u>区域</u>に設置することで、<u>物騒な</u>事件を未然に防ぐ効果が期待されている。",
    english_translation: "More and more districts are installing security cameras to make their towns safer and more secure. By installing them in the vicinity of street corners and intersections and in the commuting zones of elementary and junior high schools, they are expected to be effective in preventing dangerous incidents.",
    annotated_words: [
      { word_id: "n2_1114", word_number: 1114, kanji: "防犯カメラ", furigana: "ぼうはんかめら", meaning_en: "security camera" },
      { word_id: "n2_1115", word_number: 1115, kanji: "防犯", furigana: "ぼうはん", meaning_en: "crime prevention, security" },
      { word_id: "n2_1116", word_number: 1116, kanji: "地区", furigana: "ちく", meaning_en: "district" },
      { word_id: "n2_1117", word_number: 1117, kanji: "街角", furigana: "まちかど", meaning_en: "street corner" },
      { word_id: "n2_1118", word_number: 1118, kanji: "付近", furigana: "ふきん", meaning_en: "vicinity" },
      { word_id: "n2_1119", word_number: 1119, kanji: "区域", furigana: "くいき", meaning_en: "zone" },
      { word_id: "n2_1120", word_number: 1120, kanji: "物騒な", furigana: "ぶっそうな", meaning_en: "dangerous, unsettling" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 13 町",
    page_story: "174_2",
    japanese_text: "<u>知事</u>が記者会見で、老朽化が進む<u>県庁</u>舎の<u>移転</u>を検討していることを明らかにした。広大な<u>面積</u>の<u>跡地</u>には、超<u>高層ビル</u>が建つという噂があり、周辺に住む住民は反対している。",
    english_translation: "The governor announced at a press conference that he is considering relocating the aging prefectural government building. There are rumors that a skyscraper will be built on the huge area of the former site, and nearby residents are opposed to the idea.",
    annotated_words: [
      { word_id: "n2_1121", word_number: 1121, kanji: "知事", furigana: "ちじ", meaning_en: "governor" },
      { word_id: "n2_1122", word_number: 1122, kanji: "県庁", furigana: "けんちょう", meaning_en: "prefectural government" },
      { word_id: "n2_1123", word_number: 1123, kanji: "移転[する]", furigana: "いてん", meaning_en: "relocation, relocate" },
      { word_id: "n2_1124", word_number: 1124, kanji: "面積", furigana: "めんせき", meaning_en: "area" },
      { word_id: "n2_1125", word_number: 1125, kanji: "跡地", furigana: "あとち", meaning_en: "former site" },
      { word_id: "n2_1126", word_number: 1126, kanji: "傷跡", furigana: "きずあと", meaning_en: "scar" },
      { word_id: "n2_1127", word_number: 1127, kanji: "高層ビル", furigana: "こうそうびる", meaning_en: "high-rise building, skyscraper" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 13 町",
    page_story: "175_2",
    japanese_text: "<u>勤め先</u>の<u>真ん前</u>のビルの屋上には、<u>アンテナ</u>が<u>ずらりと</u>並んでいる。最初は不気味に思ったが、最近<u>ようやく</u> <u>見慣れて</u>きた。",
    english_translation: "On the roof of the building directly in front of my workplace, there are all these antennas standing in a row. At first I thought they looked weird, but recently I've finally gotten used to seeing them.",
    annotated_words: [
      { word_id: "n2_1128", word_number: 1128, kanji: "勤め先", furigana: "つとめさき", meaning_en: "workplace" },
      { word_id: "n2_1129", word_number: 1129, kanji: "真ん前", furigana: "まんまえ", meaning_en: "directly in front, right in front" },
      { word_id: "n2_1130", word_number: 1130, kanji: "アンテナ", furigana: "", meaning_en: "antenna" },
      { word_id: "n2_1131", word_number: 1131, kanji: "ずらり(と)", furigana: "", meaning_en: "in a row" },
      { word_id: "n2_1132", word_number: 1132, kanji: "ようやく", furigana: "", meaning_en: "finally" },
      { word_id: "n2_1133", word_number: 1133, kanji: "見慣れる", furigana: "みなれる", meaning_en: "get used to" }
    ]
  }
];

topic13StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 13 story ${story.story_number}: ${story.page_story}.json`);
});
