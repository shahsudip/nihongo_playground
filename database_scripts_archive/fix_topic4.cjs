const fs = require('fs');
let content = fs.readFileSync('generate_topic4_exact.js', 'utf-8');

// 1. Story 4: はやる (264)
content = content.replace(
  '今若い人の間でこんなのはやってるんだって。',
  '今若い人の間でこんなの<u>はやってる</u>んだって。'
);
content = content.replace(
  '{ word_id: "n2_0263", word_number: 263, kanji: "逆に", furigana: "ぎゃくに", meaning_en: "conversely, on the contrary" }',
  '{ word_id: "n2_0263", word_number: 263, kanji: "逆に", furigana: "ぎゃくに", meaning_en: "conversely, on the contrary" },\n      { word_id: "n2_0264", word_number: 264, kanji: "はやる", furigana: "", meaning_en: "be popular, be in fashion" }'
);

// 2. Story 6: 見た目 (270)
content = content.replace(
  '人を見た目で判断する<u>主義</u>のことだよ。',
  '人を<u>見た目</u>で判断する<u>主義</u>のことだよ。'
);
content = content.replace(
  '{ word_id: "n2_0269", word_number: 269, kanji: "主義", furigana: "しゅぎ", meaning_en: "principle, \\"-\ism\\"" },',
  '{ word_id: "n2_0269", word_number: 269, kanji: "主義", furigana: "しゅぎ", meaning_en: "principle, \\"-\ism\\"" },\n      { word_id: "n2_0270", word_number: 270, kanji: "見た目", furigana: "みため", meaning_en: "appearance, looks" },'
);

// 3. Story 7: 下着 (275)
content = content.replace(
  '妊婦さん<u>向け</u>の服や下着って、',
  '妊婦さん<u>向け</u>の服や<u>下着</u>って、'
);
content = content.replace(
  '{ word_id: "n2_0274", word_number: 274, kanji: "綿", furigana: "めん", meaning_en: "cotton" },',
  '{ word_id: "n2_0274", word_number: 274, kanji: "綿", furigana: "めん", meaning_en: "cotton" },\n      { word_id: "n2_0275", word_number: 275, kanji: "下着", furigana: "したぎ", meaning_en: "underwear" },'
);

// 4. Story 9: 抜ける (280)
content = content.replace(
  '病気で髪が抜けてしまった子どもたちのための',
  '病気で髪が<u>抜け</u>てしまった子どもたちのための'
);
content = content.replace(
  '{ word_id: "n2_0279", word_number: 279, kanji: "イメチェン／イメージチェンジ[する]", furigana: "", meaning_en: "change of image, change one\'s image" },',
  '{ word_id: "n2_0279", word_number: 279, kanji: "イメチェン／イメージチェンジ[する]", furigana: "", meaning_en: "change of image, change one\'s image" },\n      { word_id: "n2_0280", word_number: 280, kanji: "抜ける", furigana: "ぬける", meaning_en: "fall out, come out" },'
);

// 5. Story 10: とかす (283)
content = content.replace(
  '髪をとかすだけで本当に',
  '髪を<u>とかす</u>だけで本当に'
);
content = content.replace(
  'annotated_words: [\n      { word_id: "n2_0284", word_number: 284, kanji: "くし",',
  'annotated_words: [\n      { word_id: "n2_0283", word_number: 283, kanji: "とかす", furigana: "", meaning_en: "comb, brush" },\n      { word_id: "n2_0284", word_number: 284, kanji: "くし",'
);

// 6. Story 11: サイズ (288)
content = content.replace(
  'B：サイズいくつ？',
  'B：<u>サイズ</u>いくつ？'
);
content = content.replace(
  '{ word_id: "n2_0287", word_number: 287, kanji: "試着[する]", furigana: "しちゃく", meaning_en: "fitting, try on (clothing)" },',
  '{ word_id: "n2_0287", word_number: 287, kanji: "試着[する]", furigana: "しちゃく", meaning_en: "fitting, try on (clothing)" },\n      { word_id: "n2_0288", word_number: 288, kanji: "サイズ", furigana: "", meaning_en: "size" },'
);

// 7. Story 12: 派手な (293), ベルト (295)
content = content.replace(
  '見て派手すぎませんか',
  '見て<u>派手</u>すぎませんか'
);
content = content.replace(
  '{ word_id: "n2_0292", word_number: 292, kanji: "客観的な", furigana: "きゃっかんてきな", meaning_en: "objective" },',
  '{ word_id: "n2_0292", word_number: 292, kanji: "客観的な", furigana: "きゃっかんてきな", meaning_en: "objective" },\n      { word_id: "n2_0293", word_number: 293, kanji: "派手な", furigana: "はでな", meaning_en: "flashy, gaudy" },'
);
content = content.replace(
  'このベルトで<u>調節できます</u>よ',
  'この<u>ベルト</u>で<u>調節できます</u>よ'
);
content = content.replace(
  '{ word_id: "n2_0294", word_number: 294, kanji: "組み合わせる", furigana: "くみあわせる", meaning_en: "combine" },',
  '{ word_id: "n2_0294", word_number: 294, kanji: "組み合わせる", furigana: "くみあわせる", meaning_en: "combine" },\n      { word_id: "n2_0295", word_number: 295, kanji: "ベルト", furigana: "", meaning_en: "belt" },'
);

// 8. Story 16: ヘアスタイル (315)
content = content.replace(
  '<u>上品な</u>ヘアスタイルと',
  '<u>上品な</u><u>ヘアスタイル</u>と'
);
content = content.replace(
  '{ word_id: "n2_0314", word_number: 314, kanji: "上品な", furigana: "じょうひんな", meaning_en: "elegant, stylish" },',
  '{ word_id: "n2_0314", word_number: 314, kanji: "上品な", furigana: "じょうひんな", meaning_en: "elegant, stylish" },\n      { word_id: "n2_0315", word_number: 315, kanji: "ヘアスタイル", furigana: "", meaning_en: "hairstyle" },'
);

// 9. Story 17: マナー (318)
content = content.replace(
  '日本の<u>ビジネス</u>マナーって',
  '日本の<u>ビジネス</u><u>マナー</u>って'
);
content = content.replace(
  '{ word_id: "n2_0317", word_number: 317, kanji: "ビジネス", furigana: "", meaning_en: "business" },',
  '{ word_id: "n2_0317", word_number: 317, kanji: "ビジネス", furigana: "", meaning_en: "business" },\n      { word_id: "n2_0318", word_number: 318, kanji: "マナー", furigana: "", meaning_en: "manners, etiquette" },'
);

// 10. Story 19: ～っぽい (325)
content = content.replace(
  '<u>和服</u>っぽくてかわいいね。',
  '<u>和服</u><u>っぽくて</u>かわいいね。'
);
content = content.replace(
  'annotated_words: [\n      { word_id: "n2_0326", word_number: 326, kanji: "和服",',
  'annotated_words: [\n      { word_id: "n2_0325", word_number: 325, kanji: "～っぽい", furigana: "", meaning_en: "-like, -ish" },\n      { word_id: "n2_0326", word_number: 326, kanji: "和服",'
);

// 11. Story 22: 破く => Actually we should fix 破く if it's 破ける, but 破く is correct in meaning and the book probably just listed 破く. Wait, the word might be 破ける or 破く. Book says 破く. I'll leave it as is.

fs.writeFileSync('generate_topic4_exact.js', content, 'utf-8');
console.log('Fixed generate_topic4_exact.js');
