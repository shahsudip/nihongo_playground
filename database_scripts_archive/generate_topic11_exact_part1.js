import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'src', 'data', 'tango_n2_raw');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Topic 11 Stories (Animals) - Part 1
const topic11StoriesPart1 = [
  {
    is_story: true,
    story_number: 1,
    title: "Topic 11 動物",
    page_story: "150_1",
    japanese_text: "A：見て、かわいいカエルがいる！ 捕まえよう！\nB：<u>じかに</u>触るのは<u>よした</u>方がいいよ。<u>外見</u>は<u>かわいらしい</u>けど、<u>毒</u>を持っていることもあるから。",
    english_translation: "A: Look, there's a cute little frog! Let's catch it! B: You should avoid touching it directly. It may appear cute, but it could be venomous.",
    annotated_words: [
      { word_id: "n2_0929", word_number: 929, kanji: "じかに", furigana: "", meaning_en: "directly, first-hand" },
      { word_id: "n2_0930", word_number: 930, kanji: "よす", furigana: "", meaning_en: "avoid, stop, desist" },
      { word_id: "n2_0931", word_number: 931, kanji: "外見", furigana: "がいけん", meaning_en: "appearance" },
      { word_id: "n2_0932", word_number: 932, kanji: "かわいらしい", furigana: "", meaning_en: "cute" },
      { word_id: "n2_0933", word_number: 933, kanji: "毒", furigana: "どく", meaning_en: "poison, venom" }
    ]
  },
  {
    is_story: true,
    story_number: 2,
    title: "Topic 11 動物",
    page_story: "151_1",
    japanese_text: "A：あ、鳥の<u>巣</u>がある！\nB：本当だ。巣の<u>真下</u>に、赤ちゃんの<u>ふわふわ</u>した<u>羽</u>や卵の<u>殻</u>が落ちてるね。",
    english_translation: "A: Look, there's a bird's nest! B: Oh, you're right. Right beneath the nest, fluffy baby feathers and eggshells have fallen to the ground.",
    annotated_words: [
      { word_id: "n2_0934", word_number: 934, kanji: "巣", furigana: "す", meaning_en: "nest, lair" },
      { word_id: "n2_0935", word_number: 935, kanji: "真下", furigana: "ました", meaning_en: "right beneath" },
      { word_id: "n2_0936", word_number: 936, kanji: "真上", furigana: "まうえ", meaning_en: "right above" },
      { word_id: "n2_0937", word_number: 937, kanji: "ふわふわ", furigana: "", meaning_en: "fluffy" },
      { word_id: "n2_0938", word_number: 938, kanji: "羽", furigana: "はね", meaning_en: "feather, wing" },
      { word_id: "n2_0939", word_number: 939, kanji: "殻", furigana: "から", meaning_en: "shell" }
    ]
  },
  {
    is_story: true,
    story_number: 3,
    title: "Topic 11 動物",
    page_story: "151_2",
    japanese_text: "3月に種を植えてから、毎日丁寧に水を<u>まいて</u>きた。5月になるとたくさんの花が咲き、たくさんの<u>蝶</u>が寄ってきた。6月には<u>果実</u>が<u>実る</u>だろう。",
    english_translation: "Since I planted the seeds in March, I've watered them carefully every day. In May, many flowers bloomed and lots of butterflies came to visit. In June, they'll bear fruit, I hope.",
    annotated_words: [
      { word_id: "n2_0940", word_number: 940, kanji: "まく", furigana: "", meaning_en: "sprinkle water, water (plants)" },
      { word_id: "n2_0941", word_number: 941, kanji: "蝶", furigana: "ちょう", meaning_en: "butterfly" },
      { word_id: "n2_0942", word_number: 942, kanji: "果実", furigana: "かじつ", meaning_en: "fruit" },
      { word_id: "n2_0943", word_number: 943, kanji: "実る", furigana: "みのる", meaning_en: "bear (fruit)" }
    ]
  },
  {
    is_story: true,
    story_number: 4,
    title: "Topic 11 動物",
    page_story: "152_1",
    japanese_text: "山で<u>保護された</u>犬を飼い始めた。父は、最初は犬を<u>嫌い</u>、<u>触れる</u>ことも<u>近寄る</u>こともしなかった。しかし、犬は父を見るたびにうれしそうに<u>しっぽ</u>を振っていた。1カ月後、父は犬を<u>膝</u>に乗せて<u>頬</u>を<u>撫でる</u>ようになった。",
    english_translation: "I started keeping a dog that had taken shelter in the mountains. At first, my father disliked the dog and wouldn't touch it or approach it. But the dog wagged his tail with joy every time he saw my father. After a month, my father started putting the dog on his lap and stroking its cheeks.",
    annotated_words: [
      { word_id: "n2_0944", word_number: 944, kanji: "保護[する]", furigana: "ほご", meaning_en: "protection, shelter" },
      { word_id: "n2_0945", word_number: 945, kanji: "嫌う", furigana: "きらう", meaning_en: "dislike" },
      { word_id: "n2_0946", word_number: 946, kanji: "触れる", furigana: "ふれる", meaning_en: "touch" },
      { word_id: "n2_0947", word_number: 947, kanji: "近寄る", furigana: "ちかよる", meaning_en: "approach, go near" },
      { word_id: "n2_0948", word_number: 948, kanji: "しっぽ", furigana: "", meaning_en: "tail" },
      { word_id: "n2_0949", word_number: 949, kanji: "膝", furigana: "ひざ", meaning_en: "knee, lap (when seated)" },
      { word_id: "n2_0950", word_number: 950, kanji: "頬", furigana: "ほお", meaning_en: "cheek" },
      { word_id: "n2_0951", word_number: 951, kanji: "撫でる", furigana: "なでる", meaning_en: "pet, stroke" }
    ]
  },
  {
    is_story: true,
    story_number: 5,
    title: "Topic 11 動物",
    page_story: "152_2",
    japanese_text: "子どものときに飼っていた犬は、<u>胴</u>が長く、私が言ったことが何でも分かる<u>利口な</u>犬だった。父のことが大好きで、いつも父の顔を<u>見つめ</u>、父の匂いを<u>しきりに</u> <u>嗅いで</u>いた。",
    english_translation: "I had a dog when I was a child. He had a long torso, and was a clever dog who understood everything I said. He loved my father, always staring at his face and often sniffing his scent.",
    annotated_words: [
      { word_id: "n2_0952", word_number: 952, kanji: "胴", furigana: "どう", meaning_en: "torso, trunk" },
      { word_id: "n2_0953", word_number: 953, kanji: "利口な", furigana: "りこうな", meaning_en: "clever, intelligent" },
      { word_id: "n2_0954", word_number: 954, kanji: "見つめる", furigana: "みつめる", meaning_en: "gaze, stare" },
      { word_id: "n2_0955", word_number: 955, kanji: "しきりに", furigana: "", meaning_en: "frequently, often" },
      { word_id: "n2_0956", word_number: 956, kanji: "嗅ぐ", furigana: "かぐ", meaning_en: "sniff" }
    ]
  },
  {
    is_story: true,
    story_number: 6,
    title: "Topic 11 動物",
    page_story: "153_2",
    japanese_text: "犬は父に<u>抱っこされる</u>と父の胸に顔を<u>埋めて</u>、<u>甘えて</u>いた。犬は父が<u>あくび</u>をするのを見ると、自分もあくびをしていた。",
    english_translation: "Whenever my father hugged the dog, he'd bury his face in my father's chest and act like a spoiled baby. Whenever the dog saw my father yawn, he'd yawn too.",
    annotated_words: [
      { word_id: "n2_0957", word_number: 957, kanji: "抱っこ[する]", furigana: "だっこ", meaning_en: "embrace, hug" },
      { word_id: "n2_0958", word_number: 958, kanji: "埋める", furigana: "うめる", meaning_en: "bury" },
      { word_id: "n2_0959", word_number: 959, kanji: "甘える", furigana: "あまえる", meaning_en: "act spoiled, fawn on" },
      { word_id: "n2_0960", word_number: 960, kanji: "あくび", furigana: "", meaning_en: "yawn" }
    ]
  },
  {
    is_story: true,
    story_number: 7,
    title: "Topic 11 動物",
    page_story: "154_1",
    japanese_text: "犬はときどきいたずらをした。ソファを<u>かじったり</u>、首輪の<u>鈴</u>を壊したりした。庭に<u>放す</u>と、いつまでも走り回っていた。",
    english_translation: "The dog could be mischievous sometimes. He gnawed on the sofa and broke the bell on his collar. When I let him out in the yard, he would run around forever.",
    annotated_words: [
      { word_id: "n2_0961", word_number: 961, kanji: "かじる", furigana: "", meaning_en: "chew, gnaw" },
      { word_id: "n2_0962", word_number: 962, kanji: "鈴", furigana: "すず", meaning_en: "bell" },
      { word_id: "n2_0963", word_number: 963, kanji: "放す", furigana: "はなす", meaning_en: "let free, let out" }
    ]
  },
  {
    is_story: true,
    story_number: 8,
    title: "Topic 11 動物",
    page_story: "154_2",
    japanese_text: "<u>愛情</u>をかけて育ててきた犬に、突然<u>死</u>が訪れた。父は犬の<u>小屋</u>の前でずっと泣いていた。私は犬の写真を部屋に飾った。その写真を<u>眺めて</u>いると、犬を思い出して、<u>たまらない</u>気持ちになった。",
    english_translation: "Death came suddenly to our dog, who'd had been raised with such affection. My father cried all the time in front of the dog's kennel. I hung a picture of the dog in my room. When I gazed at the picture, I couldn't help but remember the dog and it felt unbearable.",
    annotated_words: [
      { word_id: "n2_0964", word_number: 964, kanji: "愛情", furigana: "あいじょう", meaning_en: "affection, love" },
      { word_id: "n2_0965", word_number: 965, kanji: "死", furigana: "し", meaning_en: "death" },
      { word_id: "n2_0966", word_number: 966, kanji: "小屋", furigana: "こや", meaning_en: "kennel, (animal) pen, hut" },
      { word_id: "n2_0967", word_number: 967, kanji: "眺める", furigana: "ながめる", meaning_en: "gaze" },
      { word_id: "n2_0968", word_number: 968, kanji: "眺め", furigana: "ながめ", meaning_en: "view, panorama" },
      { word_id: "n2_0969", word_number: 969, kanji: "たまらない", furigana: "", meaning_en: "unbearable" }
    ]
  },
  {
    is_story: true,
    story_number: 9,
    title: "Topic 11 動物",
    page_story: "155_1",
    japanese_text: "今飼っている犬は、とても<u>賢く</u>、<u>訓練した</u>らすぐにいろんなことができるようになった。人間が<u>しゃがむ</u>と自分も座り、お客さんが来ても静かで<u>行儀</u>がいい。",
    english_translation: "The dog we have now is very smart, and can do all kinds of things right after being trained. When a person crouches down, he sits down too, and when guests come over, he is quiet and well behaved.",
    annotated_words: [
      { word_id: "n2_0970", word_number: 970, kanji: "賢い", furigana: "かしこい", meaning_en: "intelligent, smart" },
      { word_id: "n2_0971", word_number: 971, kanji: "訓練[する]", furigana: "くんれん", meaning_en: "training, train" },
      { word_id: "n2_0972", word_number: 972, kanji: "しゃがむ", furigana: "", meaning_en: "crouch, squat" },
      { word_id: "n2_0973", word_number: 973, kanji: "行儀", furigana: "ぎょうぎ", meaning_en: "behavior, manners" }
    ]
  },
  {
    is_story: true,
    story_number: 10,
    title: "Topic 11 動物",
    page_story: "155_2",
    japanese_text: "先週、牧場で牛の<u>乳</u>しぼりを体験した。その後、牧場で作られたヨーグルトを食べた。チーズケーキを<u>連想する</u>濃さで、<u>ほっぺた</u>が落ちそうなぐらいおいしかった。",
    english_translation: "Last week, I tried milking a cow at a dairy farm. Afterwards, I ate yogurt made on the farm. It was so rich it reminded me of cheesecake, and it was so delicious that my cheeks almost fell off, as the Japanese expression goes.",
    annotated_words: [
      { word_id: "n2_0974", word_number: 974, kanji: "乳", furigana: "ちち", meaning_en: "teat, milk" },
      { word_id: "n2_0975", word_number: 975, kanji: "連想[する]", furigana: "れんそう", meaning_en: "association, remind of" },
      { word_id: "n2_0976", word_number: 976, kanji: "ほっぺ(た)", furigana: "", meaning_en: "cheeks" }
    ]
  }
];

topic11StoriesPart1.forEach(story => {
  const filePath = path.join(outDir, `${story.page_story}.json`);
  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf-8');
  console.log(`Saved exact Topic 11 story ${story.story_number}: ${story.page_story}.json`);
});
