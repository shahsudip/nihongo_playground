import json

d3_path = "src/data/zenkamoku_n3/w05-d03.json"
with open(d3_path, "r", encoding="utf-8") as f:
    d3 = json.load(f)

# Update subSection 0
d3["subSections"][0]["passage"] = "私は人の名前を覚えるのが<ruby>苦手<rt>にがて</rt></ruby>だ。どうやったら人の名前が覚えられるようになるのかとインターネットで<ruby>調<rt>しら</rt></ruby>べてみたら、いい<ruby>方法<rt>ほうほう</rt></ruby>を見つけた。会話の中で相手の名前を何回も言うようにすると、頭の中で相手の顔と名前が強く<ruby>関係<rt>かんけい</rt></ruby>づけられるのだそうだ。また、その後で名前を紙に書いてみると、もっといいらしい。名前を知るだけではなく、使ってみることで覚えられるようになるということだ。外国語も、何回も言ったり書いたりすることを<ruby>繰<rt>く</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>すことでやっと覚えられるということがある。名前も外国語も同じようなものなのかもしれない。"

# Update subSection 1
d3["subSections"][1]["passageIntro"] = "これは本屋からのメールである。"
d3["subSections"][1]["documentTo"] = "tanshio_daisuki@zmail.com"
d3["subSections"][1]["documentSubject"] = "ご注文の本について"
d3["subSections"][1]["documentDate"] = "2021年8月1日 10:30"
d3["subSections"][1]["documentBody"] = "松本様\n\nこの度は『写真集 世界旅行』をご注文いただきましてありがとうございます。\n<ruby>大変<rt>たいへん</rt></ruby><ruby>申<rt>もう</rt></ruby>し<ruby>訳<rt>わけ</rt></ruby>ありませんが、こちらの商品は現在売り切れでおき、\nお客様にお<ruby>届<rt>とど</rt></ruby>けできるのは9月初めになります。\nご注文をキャンセルされる場合は、こちらのメールにお返事ください。\nお待ちいただける場合は、今月中に代金をお支払いください。\nご不便をおかけいたしますが、どうぞよろしくお願いいたします。\n\n川田ブックス 野中"

# Update subSection 2
d3["subSections"][2]["passage"] = "最近、新しい<ruby>財布<rt>さいふ</rt></ruby>を買いました。とても小さい<ruby>財布<rt>さいふ</rt></ruby>です。前の<ruby>財布<rt>さいふ</rt></ruby>には、お金の他にカードを20枚以上と電車の<ruby>時刻表<rt>じこくひょう</rt></ruby>まで入れていましたが、今度の<ruby>財布<rt>さいふ</rt></ruby>には、お金の他にはカードが3枚くらいしか入りません。でも、<ruby>全然<rt>ぜんぜん</rt></ruby>不便ではありません。お店の会員カードは最近ではスマホで<ruby>管理<rt>かんり</rt></ruby>しているので、たくさんのカードを持ち歩かなくてもいいし、電車の時間もスマホで調べられます。<ruby>財布<rt>さいふ</rt></ruby>が小さくなったので、かばんが軽くなり、出かけるのがさらに楽しくなりました。"

# Update subSection 3
d3["subSections"][3]["passageIntro"] = "これは歯医者からのはがきです。"
d3["subSections"][3]["documentBody"] = "宮田様\n\nその後、<ruby>歯<rt>は</rt></ruby>の具合はいかがですか。前にいらっしゃってから半年が経ちましたので、定期<ruby>健診<rt>けんしん</rt></ruby>のお知らせをいたします。<ruby>歯<rt>は</rt></ruby>の<ruby>健康<rt>けんこう</rt></ruby>を守るためには、早く<ruby>虫歯<rt>むしば</rt></ruby>を発見し、治すことが大切です。自分では気がつかない小さい<ruby>虫歯<rt>むしば</rt></ruby>がないか、定期<ruby>健診<rt>けんしん</rt></ruby>で<ruby>確認<rt>かくにん</rt></ruby>しましょう。小さい<ruby>虫歯<rt>むしば</rt></ruby>ならば、その日のうちに<ruby>薬<rt>くすり</rt></ruby>をぬって治すこともできます。また、ご<ruby>希望<rt>きぼう</rt></ruby>があれば、チェックの後、<ruby>歯<rt>は</rt></ruby>のクリーニングをすることもできます。\n\nご予約は、03-0123-0123までお電話ください。\n\nデンタル石橋\n東京都杉山区金沢町50-52"

with open(d3_path, "w", encoding="utf-8") as f:
    json.dump(d3, f, ensure_ascii=False, indent=2)

print("Updated D3")
