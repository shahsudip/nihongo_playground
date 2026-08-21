import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 15 Stories (Travel) - Part 1
const topic15StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 15 旅行",
    page_story: "196_1",
    japanese_text: "飛行機に乗る日は、<u>前もって</u> <u>航空</u>会社の運航情報を見て、予約した便が<u>欠航</u>ではないか確認した方がいい。飛行機は予定通り出発しても、<u>悪天候</u>のため目的地の空港に<u>着陸でき</u>ないこともある。飛行機での移動は、十分に時間に<u>余裕</u>を持って行動した方がいい。",
    english_translation: "On the day you are taking a flight, it's best to check the airline's flight information in advance to make sure your flight hasn't been canceled. Even if the flight departs as scheduled, there are times when it cannot land at the destination airport due to bad weather. When traveling by air, it's best to act with plenty of spare time.",
    annotated_words: [
      { word_id: "n2_1303", word_number: 1303, kanji: "前もって", furigana: "まえもって", meaning_en: "in advance" },
      { word_id: "n2_1304", word_number: 1304, kanji: "航空", furigana: "こうくう", meaning_en: "flight, aviation" },
      { word_id: "n2_1305", word_number: 1305, kanji: "欠航[する]", furigana: "けっこう", meaning_en: "cancelation, cancel (a flight or sea voyage)" },
      { word_id: "n2_1306", word_number: 1306, kanji: "悪天候", furigana: "あくてんこう", meaning_en: "bad weather" },
      { word_id: "n2_1307", word_number: 1307, kanji: "着陸[する]", furigana: "ちゃくりく", meaning_en: "touchdown, land" },
      { word_id: "n2_1309", word_number: 1309, kanji: "余裕", furigana: "よゆう", meaning_en: "spare, extra" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 15 旅行",
    page_story: "197_1",
    japanese_text: "観光には周遊型観光と滞在型観光がある。周遊型観光とは、有名な<u>寺院</u>などの<u>主要な</u> <u>名所</u>を見学することが目的で、複数の観光地を<u>点々と</u>見て回るタイプの観光だ。一方、滞在型観光は、ひとつの場所に滞在し心身を休めることやさまざまな<u>体験する</u>ことが目的だ。",
    english_translation: "There are two types of tourism: the \"touring\" kind of tourism and the \"staying\" kind of tourism. The purpose of the touring kind is to visit major attractions such as famous temples, which often involves visiting multiple attractions all over the place. On the other hand, the purpose of \"staying\" tourism is to stay in one place to rest the body and mind and to experience various things.",
    annotated_words: [
      { word_id: "n2_1310", word_number: 1310, kanji: "寺院", furigana: "じいん", meaning_en: "temple" },
      { word_id: "n2_1311", word_number: 1311, kanji: "主要な", furigana: "しゅような", meaning_en: "major, main" },
      { word_id: "n2_1312", word_number: 1312, kanji: "名所", furigana: "めいしょ", meaning_en: "attraction, sights" },
      { word_id: "n2_1313", word_number: 1313, kanji: "点々と", furigana: "てんてんと", meaning_en: "here and there, all over the place" },
      { word_id: "n2_1314", word_number: 1314, kanji: "体験[する]", furigana: "たいけん", meaning_en: "experience, experience" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 15 旅行",
    page_story: "198_1",
    japanese_text: "空港に着いたら、まず航空会社のカウンターでチェックインの手続きをする。そこで、<u>機内</u>に持ち込む<u>手荷物</u>以外の荷物を預ける。それから、いくつかの決められた検査やチェックを受ける。それが終われば、<u>ひとまず</u> <u>搭乗</u>までの手続きは終わりだ。出発まで時間があれば、空港内にある<u>免税店</u>を<u>覗いて</u>みるのもいい。",
    english_translation: "When you arrive at the airport, first you complete check-in procedures at the airline counter. There, you check in your baggage, except for carry-on baggage that you'll take on board. After that, you undergo various checks and inspections. Once that's all done, the procedures are complete for the moment, until you board. If you have time before departure, you may want to have a look at the airport's duty-free stores.",
    annotated_words: [
      { word_id: "n2_1315", word_number: 1315, kanji: "機内", furigana: "きない", meaning_en: "on board" },
      { word_id: "n2_1316", word_number: 1316, kanji: "手荷物", furigana: "てにもつ", meaning_en: "carry-on baggage" },
      { word_id: "n2_1317", word_number: 1317, kanji: "ひとまず", furigana: "", meaning_en: "for the moment" },
      { word_id: "n2_1318", word_number: 1318, kanji: "搭乗[する]", furigana: "とうじょう", meaning_en: "boarding, board" },
      { word_id: "n2_1320", word_number: 1320, kanji: "免税店", furigana: "めんぜいてん", meaning_en: "duty-free store" },
      { word_id: "n2_1321", word_number: 1321, kanji: "覗く", furigana: "のぞく", meaning_en: "have a look, peek" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 15 旅行",
    page_story: "199_1",
    japanese_text: "日本人海外旅行者数は1985年の「プラザ合意」以降、<u>円高</u>の影響もあって増加し、1990年には年間1000万人を<u>上回る</u>ようになった。そして、2019年には年間2000万人を超えた。",
    english_translation: "The number of Japanese people traveling abroad increased after the Plaza Accord in 1985, partly due to the strong yen, and exceeded 10 million per year in 1990. By 2019, the number was more than 20 million per year.",
    annotated_words: [
      { word_id: "n2_1322", word_number: 1322, kanji: "円高", furigana: "えんだか", meaning_en: "strong yen" },
      { word_id: "n2_1324", word_number: 1324, kanji: "上回る", furigana: "うわまわる", meaning_en: "exceed, surpass" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 15 旅行",
    page_story: "199_2",
    japanese_text: "ドイツ、オランダ、ベルギーの三国が接する<u>国境</u>地点が存在する。オランダとベルギー側からはバスでも<u>上れる</u>道路があるが、ドイツ側からは<u>山道</u>を30分ほど歩かなければならないそうだ。今度ヨーロッパへ行ったら、少し<u>足を伸ばして</u>行ってみようと思う。",
    english_translation: "There's a point where the national borders of Germany, the Netherlands, and Belgium all meet. From the Dutch and Belgian side, there's a road you can travel up by bus, but from the German side, you have to walk for about 30 minutes along a mountain path. Next time I travel to Europe, I'd like to extend my journey and go there.",
    annotated_words: [
      { word_id: "n2_1325", word_number: 1325, kanji: "国境", furigana: "こっきょう", meaning_en: "national border" },
      { word_id: "n2_1326", word_number: 1326, kanji: "上る", furigana: "のぼる", meaning_en: "travel up" },
      { word_id: "n2_1328", word_number: 1328, kanji: "山道", furigana: "やまみち", meaning_en: "mountain path" },
      { word_id: "n2_1329", word_number: 1329, kanji: "足を伸ばす", furigana: "あしをのばす", meaning_en: "extend one's journey (literally, stretch one's legs)" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 15 旅行",
    page_story: "200_1",
    japanese_text: "海外に行く人向けに海外旅行保険がある。病気や事故はもちろん、<u>盗難</u>でも適用される。<u>プラン</u>によっては、<u>テロ</u>に遭ってケガをした場合にも使える保険もある。心配性で<u>そそっかしい</u>私は、海外に行くときは必ず海外旅行保険に入るようにしている。",
    english_translation: "People traveling abroad can get overseas travel insurance. It covers illness and accidents as well as theft. Some plans even cover injuries sustained in the event of a terrorist attack. I tend to worry and I can be a bit careless, so I always make sure to have travel insurance whenever I travel abroad.",
    annotated_words: [
      { word_id: "n2_1330", word_number: 1330, kanji: "盗難", furigana: "とうなん", meaning_en: "theft" },
      { word_id: "n2_1331", word_number: 1331, kanji: "プラン", furigana: "ぷらん", meaning_en: "plan" },
      { word_id: "n2_1332", word_number: 1332, kanji: "テロ", furigana: "てろ", meaning_en: "terrorism" },
      { word_id: "n2_1333", word_number: 1333, kanji: "そそっかしい", furigana: "", meaning_en: "careless, scatterbrained" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 15 旅行",
    page_story: "200_2",
    japanese_text: "お金は旅の<u>必需品</u>だが、どのくらい持って行くべきかいつも迷っていた。しかし、最近はデジタル<u>通貨</u>が普及し<u>通用する</u>ところも増えているので、<u>めっきり</u>現金を両替しなくなった。",
    english_translation: "Money is a travel necessity, but I never know how much to bring with me. But lately, with the spread of digital currency and more places accepting it, I've noticeably stopped exchanging cash.",
    annotated_words: [
      { word_id: "n2_1334", word_number: 1334, kanji: "必需品", furigana: "ひつじゅひん", meaning_en: "necessity" },
      { word_id: "n2_1335", word_number: 1335, kanji: "通貨", furigana: "つうか", meaning_en: "currency" },
      { word_id: "n2_1336", word_number: 1336, kanji: "通用[する]", furigana: "つうよう", meaning_en: "common use, be accepted" },
      { word_id: "n2_1337", word_number: 1337, kanji: "めっきり", furigana: "", meaning_en: "noticeably, remarkably" }
    ]
  }
];

topic15StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 15 story ${story.story_number}: ${story.page_story}.json`);
});
