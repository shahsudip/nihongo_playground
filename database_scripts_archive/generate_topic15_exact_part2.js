import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 15 Stories (Travel) - Part 2
const topic15StoriesPart2 = [
  {
    is_story: true,
    story_number: 8,
    title: "Topic 15 旅行",
    page_story: "201_1",
    japanese_text: "先日、友だちと船釣りツアーに参加した。<u>沖</u>には私たちの他に５<u>隻</u>ほど船が泊まっていて、みんな釣りをしていた。釣り初心者の私はきらきら光る<u>水面</u>に目を奪われていたが、友達はたった１時間で<u>空っぽ</u>だったクーラーボックスを魚でいっぱいにした。釣りは３時間の予定だったが途中で波が<u>荒く</u>なったので、港に戻った。",
    english_translation: "The other day, I went on a boat fishing tour with a friend. About five other boats were anchored offshore near ours, and everyone was fishing. As a novice angler, I was transfixed by the sparkling water's surface, but my friend filled his empty cooler box with fish in just one hour. We'd planned to fish for three hours, but the waves grew too rough, so we headed back to the harbor.",
    annotated_words: [
      { word_id: "n2_1338", word_number: 1338, kanji: "沖", furigana: "おき", meaning_en: "offshore" },
      { word_id: "n2_1339", word_number: 1339, kanji: "〜隻", furigana: "せき", meaning_en: "boats (counter for boats)" },
      { word_id: "n2_1340", word_number: 1340, kanji: "水面", furigana: "すいめん", meaning_en: "water's surface" },
      { word_id: "n2_1341", word_number: 1341, kanji: "空(っぽ)", furigana: "から", meaning_en: "emptiness" },
      { word_id: "n2_1342", word_number: 1342, kanji: "荒い", furigana: "あらい", meaning_en: "rough" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 15 旅行",
    page_story: "202_1",
    japanese_text: "学生のころは<u>宿</u>代を<u>浮かす</u>ために、<u>夜行バス</u>をよく利用していた。夜に東京を<u>発つ</u>と、<u>早朝</u>には大阪に到着する。往復券や<u>回数券</u>を買えば、さらに割引になってもっと安くなる。",
    english_translation: "When I was a student, I often took the night bus to save money on accommodation. If the bus departed Tokyo at night, I would arrive in Osaka in the early morning. If you buy a round-trip ticket or a coupon ticket, you can get a discount and pay even less.",
    annotated_words: [
      { word_id: "n2_1343", word_number: 1343, kanji: "宿", furigana: "やど", meaning_en: "accommodation" },
      { word_id: "n2_1344", word_number: 1344, kanji: "浮かす", furigana: "うかす", meaning_en: "save money" },
      { word_id: "n2_1346", word_number: 1346, kanji: "夜行バス", furigana: "やこうばす", meaning_en: "night bus" },
      { word_id: "n2_1347", word_number: 1347, kanji: "発つ", furigana: "たつ", meaning_en: "depart" },
      { word_id: "n2_1348", word_number: 1348, kanji: "早朝", furigana: "そうちょう", meaning_en: "early morning" },
      { word_id: "n2_1349", word_number: 1349, kanji: "回数券", furigana: "かいすうけん", meaning_en: "coupon ticket" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 15 旅行",
    page_story: "202_2",
    japanese_text: "A：ねえ、これ見て。すっごくきれい！\nB：「オレンジ色に染まる<u>地平線</u>、<u>夕日</u>がきれいなビーチ５選」かあ。\nA：あ、ここ結構近いよ。こんなに<u>ロマンチックな</u>ビーチが近くにあるんだね。\nB：そうだね。じゃあ、<u>早速</u>今から行ってみようか。",
    english_translation: "A: Hey, look at this. It's so beautiful! B: \"Five beaches with horizons bathed in orange and beautiful sunsets,\" it says. A: Oh, they're quite close. There's a romantic beach like this nearby? B: There is. Let's go there right now.",
    annotated_words: [
      { word_id: "n2_1351", word_number: 1351, kanji: "地平線", furigana: "ちへいせん", meaning_en: "horizon" },
      { word_id: "n2_1352", word_number: 1352, kanji: "夕日", furigana: "ゆうひ", meaning_en: "sunset" },
      { word_id: "n2_1353", word_number: 1353, kanji: "ロマンチックな", furigana: "ろまんちっくな", meaning_en: "romantic" },
      { word_id: "n2_1354", word_number: 1354, kanji: "早速", furigana: "さっそく", meaning_en: "right away, right now" }
    ]
  },
  {
    is_story: true,
    story_number: 11,
    title: "Topic 15 旅行",
    page_story: "203_2",
    japanese_text: "日本で<u>ダイビング</u>をするなら、東京から日帰りも可能な伊豆<u>半島</u>がおすすめだ。カラフルな<u>熱帯魚</u>が見られるため、一年中世界各地からダイバーが<u>潜り</u>に来ている。",
    english_translation: "If you want to go diving in Japan, the Izu Peninsula is a great spot that you can reach by day trip from Tokyo. Divers from all over the world come here to dive all year round because of the colorful tropical fish.",
    annotated_words: [
      { word_id: "n2_1355", word_number: 1355, kanji: "ダイビング[する]", furigana: "だいびんぐ", meaning_en: "diving, dive" },
      { word_id: "n2_1356", word_number: 1356, kanji: "半島", furigana: "はんとう", meaning_en: "peninsula" },
      { word_id: "n2_1357", word_number: 1357, kanji: "熱帯魚", furigana: "ねったいぎょ", meaning_en: "tropical fish" },
      { word_id: "n2_1359", word_number: 1359, kanji: "潜る", furigana: "もぐる", meaning_en: "dive, pass under" }
    ]
  },
  {
    is_story: true,
    story_number: 12,
    title: "Topic 15 旅行",
    page_story: "204_1",
    japanese_text: "毎年８月のお盆休みは<u>お墓参り</u>や親戚に会うために<u>故郷</u>に帰る人で、新幹線はほぼ満席になる。新幹線の<u>指定席</u>券は当日でも買うことはできるが、乗車日の一か月前から予約可能だ。",
    english_translation: "Every year during the Bon vacation in August, the bullet trains are fully occupied with people returning to their hometowns to visit graves and catch up with relatives. You can buy a reserved seat ticket for the bullet train on the day of the trip, but reservations can be made up to one month in advance.",
    annotated_words: [
      { word_id: "n2_1360", word_number: 1360, kanji: "(お)墓参り[する]", furigana: "はかまいり", meaning_en: "grave visit, visit a grave (to pay respects)" },
      { word_id: "n2_1362", word_number: 1362, kanji: "故郷", furigana: "こきょう", meaning_en: "hometown" },
      { word_id: "n2_1363", word_number: 1363, kanji: "指定席", furigana: "していせき", meaning_en: "reserved seat" }
    ]
  },
  {
    is_story: true,
    story_number: 13,
    title: "Topic 15 旅行",
    page_story: "204_2",
    japanese_text: "これまで<u>ロープウェイ</u>は山や<u>高原</u>、スキー場での移動手段として利用されてきたが、近年は都市での交通手段として利用されている。日本での<u>実用化</u>はまだ時間を要するだろうが、ロープウェイがバスや<u>列車</u>の代わりとして市民の足になる日が来るかもしれない。",
    english_translation: "Ropeways have long been used for transport in the mountains and highlands and at ski resorts, but in recent years, they are being used as a means of transportation in cities. It might take some time before ropeways are put to practical use in Japan, but the day may come when ropeways replace buses and trains as a means of transportation for citizens.",
    annotated_words: [
      { word_id: "n2_1365", word_number: 1365, kanji: "ロープウェイ", furigana: "ろーぷうぇい", meaning_en: "ropeway" },
      { word_id: "n2_1366", word_number: 1366, kanji: "高原", furigana: "こうげん", meaning_en: "highland" },
      { word_id: "n2_1367", word_number: 1367, kanji: "実用化[する]", furigana: "じつようか", meaning_en: "practical application, put to practical use" },
      { word_id: "n2_1368", word_number: 1368, kanji: "列車", furigana: "れっしゃ", meaning_en: "train" }
    ]
  },
  {
    is_story: true,
    story_number: 14,
    title: "Topic 15 旅行",
    page_story: "205_2",
    japanese_text: "お金をかけなくても旅はできる。安い<u>ゲストハウス</u>などに泊まって自由に旅を楽しむ<u>バックパッカー</u>が世界中にいる。自由な旅行は<u>刺激的で</u>魅力的だ。<u>ただし</u>、自由には危険が伴うことを忘れてはならない。",
    english_translation: "You don't need to spend a lot of money to travel. There are backpackers all over the world who stay in cheap guesthouses and enjoy traveling freely. Traveling freely is exciting and fascinating. However, you shouldn't forget that with freedom comes danger.",
    annotated_words: [
      { word_id: "n2_1369", word_number: 1369, kanji: "ゲストハウス", furigana: "げすとはうす", meaning_en: "guesthouse" },
      { word_id: "n2_1370", word_number: 1370, kanji: "バックパッカー", furigana: "ばっくぱっかー", meaning_en: "backpacker" },
      { word_id: "n2_1371", word_number: 1371, kanji: "刺激的な", furigana: "しげきてきな", meaning_en: "exciting, stimulating" },
      { word_id: "n2_1373", word_number: 1373, kanji: "ただし", furigana: "", meaning_en: "however" }
    ]
  },
  {
    is_story: true,
    story_number: 15,
    title: "Topic 15 旅行",
    page_story: "206_1",
    japanese_text: "日本は火山が多いため、全国各地に温泉が<u>湧いて</u>いる。温泉は<u>透き通った</u> <u>無色</u>のお湯もあるが、白や黒や茶色に<u>濁った</u>お湯もあり、効果もさまざまだ。<u>ちなみに</u>、日本<u>一</u>温泉が湧き出るのは大分県である。",
    english_translation: "Due to Japan's many volcanoes, hot springs bubble up all over the country. Some hot spring waters are transparent and colorless, while others are cloudy white, black, or brown, and have a variety of effects. Incidentally, Oita Prefecture is home to Japan's largest number of hot springs.",
    annotated_words: [
      { word_id: "n2_1374", word_number: 1374, kanji: "湧く", furigana: "わく", meaning_en: "seethe, boil, bubble up" },
      { word_id: "n2_1375", word_number: 1375, kanji: "透き通る", furigana: "すきとおる", meaning_en: "be transparent" },
      { word_id: "n2_1376", word_number: 1376, kanji: "無色", furigana: "むしょく", meaning_en: "colorless" },
      { word_id: "n2_1377", word_number: 1377, kanji: "濁る", furigana: "にごる", meaning_en: "be clouded" },
      { word_id: "n2_1378", word_number: 1378, kanji: "ちなみに", furigana: "", meaning_en: "incidentally, by the way" },
      { word_id: "n2_1379", word_number: 1379, kanji: "〜一", furigana: "いち", meaning_en: "foremost, ~ largest/highest/best/" }
    ]
  },
  {
    is_story: true,
    story_number: 16,
    title: "Topic 15 旅行",
    page_story: "206_2",
    japanese_text: "この公園には<u>噴水</u>があり、<u>爽やかな</u>風が吹く春には、公園はお花見をする人でいっぱいになる。みんなで食べ物や飲み物を<u>持参して</u>、桜の木の下でお花見を楽しむ人々の様子は、春の日本ならではの<u>光景</u>だ。",
    english_translation: "There is a fountain in this park, and in the springtime when refreshing breezes blow, the park is filled with people viewing cherry blossoms. The sight of people bringing food and drinks and enjoying the blossoms under the cherry trees is a scene unique to springtime in Japan.",
    annotated_words: [
      { word_id: "n2_1380", word_number: 1380, kanji: "噴水", furigana: "ふんすい", meaning_en: "fountain" },
      { word_id: "n2_1381", word_number: 1381, kanji: "爽やかな", furigana: "さわやかな", meaning_en: "refreshing" },
      { word_id: "n2_1382", word_number: 1382, kanji: "持参[する]", furigana: "じさん", meaning_en: "bringing, bring" },
      { word_id: "n2_1383", word_number: 1383, kanji: "光景", furigana: "こうけい", meaning_en: "scene" }
    ]
  },
  {
    is_story: true,
    story_number: 17,
    title: "Topic 15 旅行",
    page_story: "207_1",
    japanese_text: "バスや電車に乗ると「<u>つり革</u>、<u>手すり</u>におつかまりください」というアナウンスが何度も流れる。安全のために急停車することがあるからだ。先日、私が混雑したバスにたくさんの荷物を持って立って乗っていたとき、高校生が<u>すっと</u>席を立って席を譲ってくれた。",
    english_translation: "Whenever you get on a bus or train, the announcement \"Please hold on to a strap or handrail\" is played over and over again. This is because the bus or train might stop suddenly for safety reasons. The other day, when I was standing on a crowded bus carrying a lot of bags, a high school student stood up right away and offered me his seat.",
    annotated_words: [
      { word_id: "n2_1384", word_number: 1384, kanji: "つり革", furigana: "つりかわ", meaning_en: "strap (on a bus or train)" },
      { word_id: "n2_1385", word_number: 1385, kanji: "手すり", furigana: "てすり", meaning_en: "handrail" },
      { word_id: "n2_1386", word_number: 1386, kanji: "すっと", furigana: "", meaning_en: "quickly, right away" }
    ]
  },
  {
    is_story: true,
    story_number: 18,
    title: "Topic 15 旅行",
    page_story: "208_1",
    japanese_text: "1945年、広島と長崎に<u>原子爆弾</u>が落とされた。広島市平和記念公園には、原爆ドーム、平和の鐘、原爆の子の<u>像</u>などがある。元々は<u>れんが</u>造りの建物が原爆で焼けてしまい、その焼け跡が原爆ドームと呼ばれるようになった。戦争の悲しさやひどさを今も<u>物語って</u>いる。",
    english_translation: "In 1945, atomic bombs were dropped on Hiroshima and Nagasaki. Hiroshima Peace Memorial Park is home to the Atomic Bomb Dome, the Peace Bell, and the Children's Peace Monument statue. The Atomic Bomb Dome was originally a brick building that now stands as a burned ruin. It still tells of the tragedy and terror of war.",
    annotated_words: [
      { word_id: "n2_1387", word_number: 1387, kanji: "原子爆弾／原爆", furigana: "げんしばくだん／げんばく", meaning_en: "atomic bomb" },
      { word_id: "n2_1388", word_number: 1388, kanji: "像", furigana: "ぞう", meaning_en: "statue" },
      { word_id: "n2_1389", word_number: 1389, kanji: "れんが", furigana: "", meaning_en: "brick" },
      { word_id: "n2_1390", word_number: 1390, kanji: "物語る", furigana: "ものがたる", meaning_en: "narrate, tell" }
    ]
  },
  {
    is_story: true,
    story_number: 19,
    title: "Topic 15 旅行",
    page_story: "208_2",
    japanese_text: "山道は<u>方角</u>が分かりにくく急カーブの道も多いので、運転に集中力が要る。<u>険しい</u>山と<u>谷</u>に挟まれた山道を進むと、小さい<u>滝</u>が現れた。そこで車を停めて<u>一休み</u>することにした。地図を見ると、<u>幸い</u>もう少しで山道を抜けられることが分かった。",
    english_translation: "On this mountain road, the direction is difficult to see and there are many sharp curves, so driving takes a lot of concentration. As we proceeded along the mountain road, winding between steep mountainsides and valleys, we came upon a small waterfall. We decided to stop the car and take a rest there. Fortunately, the map showed that we were almost through the mountain road.",
    annotated_words: [
      { word_id: "n2_1391", word_number: 1391, kanji: "方角", furigana: "ほうがく", meaning_en: "direction" },
      { word_id: "n2_1392", word_number: 1392, kanji: "険しい", furigana: "けわしい", meaning_en: "steep" },
      { word_id: "n2_1393", word_number: 1393, kanji: "谷", furigana: "たに", meaning_en: "valley" },
      { word_id: "n2_1394", word_number: 1394, kanji: "滝", furigana: "たき", meaning_en: "waterfall" },
      { word_id: "n2_1395", word_number: 1395, kanji: "一休み[する]", furigana: "ひとやすみ", meaning_en: "break, take a rest" },
      { word_id: "n2_1396", word_number: 1396, kanji: "幸い", furigana: "さいわい", meaning_en: "fortunately" }
    ]
  },
  {
    is_story: true,
    story_number: 20,
    title: "Topic 15 旅行",
    page_story: "209_2",
    japanese_text: "この間の旅行では、子どもが<u>人混み</u>で迷子になって大変な思いをした。次の旅行先は<u>未定</u>だが、混雑する時期を<u>ずらして</u>のんびりと家族との時間を楽しむ旅行にしようと思う。",
    english_translation: "On a recent trip, my child got lost in a crowd and it was awful. We still haven't decided where we'll travel next, but I think we'll try to avoid the crowds so we can relax and enjoy time as a family.",
    annotated_words: [
      { word_id: "n2_1397", word_number: 1397, kanji: "人混み", furigana: "ひとごみ", meaning_en: "crowd" },
      { word_id: "n2_1398", word_number: 1398, kanji: "未定", furigana: "みてい", meaning_en: "pending, not decided" },
      { word_id: "n2_1399", word_number: 1399, kanji: "ずらす", furigana: "", meaning_en: "avoid, shift" }
    ]
  }
];

topic15StoriesPart2.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 15 story ${story.story_number}: ${story.page_story}.json`);
});
