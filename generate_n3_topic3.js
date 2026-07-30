const fs = require('fs');

const topic3_data = [
  {
    id: "52_1",
    title: "Topic 3",
    japanese_text: "ドラッグストア<ruby>に<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>の<rt></rt></ruby><ruby>列<rt>れつ</rt></ruby><ruby>ができていた。<rt></rt></ruby><ruby>閉店<rt>へいてん</rt></ruby><ruby>するから、<rt></rt></ruby><ruby>店内<rt>てんない</rt></ruby><ruby>の<rt></rt></ruby><ruby>商品<rt>しょうひん</rt></ruby><ruby>が<rt></rt></ruby><ruby>定価<rt>ていか</rt></ruby><ruby>の<rt></rt></ruby>２<ruby>割引<rt>わりびき</rt></ruby><ruby>から<rt></rt></ruby><ruby>半額<rt>はんがく</rt></ruby><ruby>で<rt></rt></ruby><ruby>買<rt>か</rt></ruby><ruby>えるらしい。<rt></rt></ruby>",
    english_translation: "There was a line of people at the drugstore. It's going to close, so it seems that products in the store can be purchased at a discount of 20 percent to half off of the list price.",
    annotated_words: [
      { kanji: "ドラッグストア", furigana: "", meaning: "drug store" },
      { kanji: "薬局", furigana: "やっきょく", meaning: "pharmacy" },
      { kanji: "列", furigana: "れつ", meaning: "line" },
      { kanji: "定価", furigana: "ていか", meaning: "retail price" },
      { kanji: "〜割引", furigana: "〜わりびき", meaning: "~ discount, ~ off" },
      { kanji: "半額", furigana: "はんがく", meaning: "half off, half price" }
    ]
  },
  {
    id: "52_2",
    title: "Topic 3",
    japanese_text: "<ruby>日本円<rt>にほんえん</rt></ruby><ruby>に<rt></rt></ruby><ruby>両替<rt>りょうがえ</rt></ruby><ruby>するときには、<rt></rt></ruby><ruby>金額<rt>きんがく</rt></ruby><ruby>にかかわらず、<rt></rt></ruby><ruby>手数料<rt>てすうりょう</rt></ruby><ruby>として<rt></rt></ruby><ruby>余分<rt>よぶん</rt></ruby><ruby>な<rt></rt></ruby><ruby>金額<rt>きんがく</rt></ruby><ruby>を<rt></rt></ruby><ruby>支払<rt>しはら</rt></ruby><ruby>わなければならない。<rt></rt></ruby>",
    english_translation: "When exchanging to Japanese yen, you have to pay an extra amount as a fee, regardless of the amount you're exchanging.",
    annotated_words: [
      { kanji: "両替", furigana: "りょうがえ", meaning: "currency exchange, exchange (currency)" },
      { kanji: "金額", furigana: "きんがく", meaning: "amount (of money)" },
      { kanji: "〜料", furigana: "〜りょう", meaning: "~ fee" },
      { kanji: "余分な", furigana: "よぶんな", meaning: "extra" },
      { kanji: "支払う", furigana: "しはらう", meaning: "pay" },
      { kanji: "支払い", furigana: "しはらい", meaning: "payment" }
    ]
  },
  {
    id: "53_1",
    title: "Topic 3",
    japanese_text: "<ruby>自動販売機<rt>じどうはんばいき</rt></ruby><ruby>でジュースを<rt></rt></ruby><ruby>買<rt>か</rt></ruby><ruby>おうと<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>ったのに、<rt></rt></ruby><ruby>お<rt></rt></ruby><ruby>札<rt>さつ</rt></ruby><ruby>が<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>えなかっ<rt></rt></ruby><ruby>た。<rt></rt></ruby><ruby>小銭<rt>こぜに</rt></ruby><ruby>だとあと<rt></rt></ruby>５０<ruby>円<rt>えん</rt></ruby><ruby>足<rt>た</rt></ruby><ruby>りない。<rt></rt></ruby><ruby>諦<rt>あきら</rt></ruby><ruby>めて<rt></rt></ruby><ruby>他<rt>ほか</rt></ruby><ruby>の<rt></rt></ruby><ruby>自動販売機<rt>じどうはんばいき</rt></ruby><ruby>を<rt></rt></ruby><ruby>探<rt>さが</rt></ruby><ruby>したが、<rt></rt></ruby>１００００<ruby>円札<rt>えんさつ</rt></ruby><ruby>が<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>えるのはなかった。<rt></rt></ruby>",
    english_translation: "I wanted to buy juice at a vending machine, but I couldn't use bills. If I have to only pay in change, I'll be 50 yen short. I gave up and looked for another vending machine, but there were none that take 10,000-yen bills.",
    annotated_words: [
      { kanji: "自動販売機", furigana: "じどうはんばいき", meaning: "vending machine" },
      { kanji: "（お）札", furigana: "（お）さつ", meaning: "(monetary) bill" },
      { kanji: "足りる", furigana: "たりる", meaning: "be enough" },
      { kanji: "〜札", furigana: "〜さつ", meaning: "~ bill, ~ note" }
    ]
  },
  {
    id: "53_2",
    title: "Topic 3",
    japanese_text: "<ruby>うちの<rt></rt></ruby><ruby>大学<rt>だいがく</rt></ruby><ruby>には<rt></rt></ruby>３<ruby>つの<rt></rt></ruby><ruby>売店<rt>ばいてん</rt></ruby><ruby>があります。<rt></rt></ruby><ruby>そのうち、この<rt></rt></ruby><ruby>売店<rt>ばいてん</rt></ruby><ruby>で<rt></rt></ruby><ruby>は<rt></rt></ruby><ruby>教科書<rt>きょうかしょ</rt></ruby><ruby>の<rt></rt></ruby><ruby>販売<rt>はんばい</rt></ruby><ruby>もしています。<rt></rt></ruby><ruby>注文<rt>ちゅうもん</rt></ruby><ruby>した<rt></rt></ruby><ruby>教科書<rt>きょうかしょ</rt></ruby><ruby>の<rt></rt></ruby><ruby>代金<rt>だいきん</rt></ruby><ruby>はこのレ<rt></rt></ruby><ruby>ジで<rt></rt></ruby><ruby>払<rt>はら</rt></ruby><ruby>うことができます。<rt></rt></ruby><ruby>水曜日<rt>すいようび</rt></ruby><ruby>は<rt></rt></ruby><ruby>定休日<rt>ていきゅうび</rt></ruby><ruby>ですので、<rt></rt></ruby><ruby>気<rt>き</rt></ruby><ruby>をつけ<rt></rt></ruby><ruby>てくださいね。<rt></rt></ruby>",
    english_translation: "My university has three stores. Among them, this shop also sells textbooks. The payment for the ordered textbooks can be made at this cash register. Wednesday is a regular holiday, so please be careful.",
    annotated_words: [
      { kanji: "売店", furigana: "ばいてん", meaning: "store" },
      { kanji: "代金", furigana: "だいきん", meaning: "payment, price" },
      { kanji: "定休日", furigana: "ていきゅうび", meaning: "regular holiday" }
    ]
  },
  {
    id: "54_1",
    title: "Topic 3",
    japanese_text: "<ruby>Ａ：レシートがあれば<rt></rt></ruby><ruby>返品<rt>へんぴん</rt></ruby><ruby>できるんじゃないの？<rt></rt></ruby>\n<ruby>Ｂ：ですから、お<rt></rt></ruby><ruby>客様<rt>きゃくさま</rt></ruby><ruby>、こちらは<rt></rt></ruby><ruby>特売品<rt>とくばいひん</rt></ruby><ruby>のため、<rt></rt></ruby><ruby>返品<rt>へんぴん</rt></ruby><ruby>・<rt></rt></ruby><ruby>交換<rt>こうかん</rt></ruby><ruby>が<rt></rt></ruby><ruby>できません。<rt></rt></ruby>",
    english_translation: "A: Can't I return it if I have a receipt?\nB: As I said before, this is a bargain product, so it can't be returned or exchanged.",
    annotated_words: [
      { kanji: "レシート", furigana: "", meaning: "receipt" },
      { kanji: "ですから", furigana: "", meaning: "as I said before, therefore" },
      { kanji: "特売", furigana: "とくばい", meaning: "bargain" }
    ]
  },
  {
    id: "54_2",
    title: "Topic 3",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby>４<ruby>月<rt>がつ</rt></ruby><ruby>に<rt></rt></ruby><ruby>社会人<rt>しゃかいじん</rt></ruby><ruby>になったら、きちんと<rt></rt></ruby><ruby>自分<rt>じぶん</rt></ruby><ruby>で<rt></rt></ruby><ruby>将来<rt>しょうらい</rt></ruby><ruby>の<rt></rt></ruby><ruby>計画<rt>けいかく</rt></ruby><ruby>を<rt></rt></ruby><ruby>立<rt>た</rt></ruby><ruby>て<rt></rt></ruby><ruby>て<rt></rt></ruby><ruby>貯金<rt>ちょきん</rt></ruby><ruby>するのよ。<rt></rt></ruby>\n<ruby>Ｂ：うん、<rt></rt></ruby><ruby>大丈夫<rt>だいじょうぶ</rt></ruby><ruby>だよ、<rt></rt></ruby><ruby>母<rt>かあ</rt></ruby><ruby>さん。<rt></rt></ruby>\n<ruby>Ａ：あと、<rt></rt></ruby><ruby>預金<rt>よきん</rt></ruby><ruby>通帳<rt>つうちょう</rt></ruby><ruby>と<rt></rt></ruby><ruby>印鑑<rt>いんかん</rt></ruby><ruby>はなくさないように、しっかり<rt></rt></ruby><ruby>自分<rt>じぶん</rt></ruby><ruby>で<rt></rt></ruby><ruby>管理<rt>かんり</rt></ruby><ruby>してね。<rt></rt></ruby>",
    english_translation: "A: Once you become a working adult in April, you will need to properly plan and save money on your own.\nB: Yeah, I'll be okay, Mom.\nA: Also, keep track of your bankbook and seal so you don't lose them.",
    annotated_words: [
      { kanji: "きちんと", furigana: "", meaning: "properly" },
      { kanji: "貯金", furigana: "ちょきん", meaning: "save money" },
      { kanji: "預金", furigana: "よきん", meaning: "deposit" },
      { kanji: "通帳", furigana: "つうちょう", meaning: "bankbook" }
    ]
  },
  {
    id: "55_1",
    title: "Topic 3",
    japanese_text: "<ruby>先月<rt>せんげつ</rt></ruby><ruby>の<rt></rt></ruby><ruby>携帯<rt>けいたい</rt></ruby><ruby>代<rt>だい</rt></ruby><ruby>が<rt></rt></ruby>１００００<ruby>円<rt>えん</rt></ruby><ruby>を<rt></rt></ruby><ruby>超<rt>こ</rt></ruby><ruby>えて、せっかくバイトで<rt></rt></ruby><ruby>貯<rt>た</rt></ruby><ruby>めたお<rt></rt></ruby><ruby>金<rt>かね</rt></ruby><ruby>がほとんどなくなった。プランを<rt></rt></ruby><ruby>変<rt>か</rt></ruby><ruby>えようかと<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>うが、<rt></rt></ruby><ruby>携帯<rt>けいたい</rt></ruby><ruby>電話<rt>でんわ</rt></ruby><ruby>の<rt></rt></ruby><ruby>料金<rt>りょうきん</rt></ruby><ruby>プランは<rt></rt></ruby><ruby>複雑<rt>ふくざつ</rt></ruby><ruby>すぎてどれが<rt></rt></ruby><ruby>得<rt>とく</rt></ruby><ruby>なのかよく<rt></rt></ruby><ruby>分<rt>わ</rt></ruby><ruby>からない。<rt></rt></ruby><ruby>今月<rt>こんげつ</rt></ruby><ruby>は<rt></rt></ruby><ruby>飲<rt>の</rt></ruby><ruby>み<rt></rt></ruby><ruby>会<rt>かい</rt></ruby><ruby>ばかりで<rt></rt></ruby><ruby>食費<rt>しょくひ</rt></ruby><ruby>もかかるし、ピンチだ。<rt></rt></ruby>",
    english_translation: "Because my cell phone bill for last month was more than 10,000 yen, most of the money I saved up from my part-time job is now gone. I want to change my plan, but mobile phone payment plans are so complicated that I can't figure out which one is the better deal. I have a lot of drinking parties this month making my food bill high, so I'm in a pinch.",
    annotated_words: [
      { kanji: "〜代", furigana: "〜だい", meaning: "~ bill" },
      { kanji: "貯める", furigana: "ためる", meaning: "save" },
      { kanji: "貯まる", furigana: "たまる", meaning: "be save up" },
      { kanji: "料金", furigana: "りょうきん", meaning: "payment, charge" },
      { kanji: "〜費", furigana: "〜ひ", meaning: "~ fee, ~ cost" }
    ]
  },
  {
    id: "55_2",
    title: "Topic 3",
    japanese_text: "<ruby>今日<rt>きょう</rt></ruby><ruby>は<rt></rt></ruby><ruby>新聞<rt>しんぶん</rt></ruby><ruby>の<rt></rt></ruby><ruby>集金<rt>しゅうきん</rt></ruby><ruby>がある<rt></rt></ruby><ruby>日<rt>ひ</rt></ruby><ruby>なので、<rt></rt></ruby><ruby>口座<rt>こうざ</rt></ruby><ruby>からお<rt></rt></ruby><ruby>金<rt>かね</rt></ruby><ruby>を<rt></rt></ruby><ruby>下<rt>お</rt></ruby><ruby>ろして<rt></rt></ruby><ruby>準備<rt>じゅんび</rt></ruby><ruby>しておこう。<rt></rt></ruby>",
    english_translation: "Today is the day they come to collect newspaper subscription fees, so I should withdraw some money from my account and get ready.",
    annotated_words: [
      { kanji: "集金", furigana: "しゅうきん", meaning: "collecting money, collect money" },
      { kanji: "口座", furigana: "こうざ", meaning: "account" },
      { kanji: "下ろす", furigana: "おろす", meaning: "withdraw" }
    ]
  },
  {
    id: "56_1",
    title: "Topic 3",
    japanese_text: "３<ruby>月<rt>がつ</rt></ruby><ruby>までのプロジェクトだが、<rt></rt></ruby><ruby>各<rt>かく</rt></ruby><ruby>支店<rt>してん</rt></ruby><ruby>での<rt></rt></ruby><ruby>宣伝<rt>せんでん</rt></ruby><ruby>活動<rt>かつどう</rt></ruby><ruby>が<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>うよう<rt></rt></ruby><ruby>に<rt></rt></ruby><ruby>行<rt>い</rt></ruby><ruby>かず、<rt></rt></ruby><ruby>延長<rt>えんちょう</rt></ruby><ruby>になりそうだ。<rt></rt></ruby><ruby>予算<rt>よさん</rt></ruby><ruby>を<rt></rt></ruby><ruby>繰<rt>く</rt></ruby><ruby>り<rt></rt></ruby><ruby>越<rt>こ</rt></ruby><ruby>す<rt></rt></ruby><ruby>手続<rt>てつづ</rt></ruby><ruby>きをして、<rt></rt></ruby><ruby>完成<rt>かんせい</rt></ruby><ruby>報告<rt>ほうこく</rt></ruby><ruby>会<rt>かい</rt></ruby><ruby>の<rt></rt></ruby><ruby>予約<rt>よやく</rt></ruby><ruby>を<rt></rt></ruby><ruby>取<rt>と</rt></ruby><ruby>り<rt></rt></ruby><ruby>消<rt>け</rt></ruby><ruby>しておかなければならない。<rt></rt></ruby>",
    english_translation: "I'm working on a project until March, but the advertising activity at each branch isn't going the way I had hoped, so it looks like the project might be extended. I have to file the paperwork to carry the budget over and cancel the reservation for the completion report meeting.",
    annotated_words: [
      { kanji: "支店", furigana: "してん", meaning: "branch" },
      { kanji: "支社", furigana: "ししゃ", meaning: "branch office" },
      { kanji: "宣伝", furigana: "せんでん", meaning: "advertising, advertise" },
      { kanji: "予算", furigana: "よさん", meaning: "budget" },
      { kanji: "繰り越す", furigana: "くりこす", meaning: "carry forward" },
      { kanji: "越す", furigana: "こす", meaning: "exceed" },
      { kanji: "取り消す", furigana: "とりけす", meaning: "cancel" }
    ]
  },
  {
    id: "56_2",
    title: "Topic 3",
    japanese_text: "<ruby>若<rt>わか</rt></ruby><ruby>い<rt></rt></ruby><ruby>頃<rt>ころ</rt></ruby><ruby>はお<rt></rt></ruby><ruby>金<rt>かね</rt></ruby><ruby>がなくて<rt></rt></ruby><ruby>苦労<rt>くろう</rt></ruby><ruby>した。<rt></rt></ruby><ruby>近所<rt>きんじょ</rt></ruby><ruby>の<rt></rt></ruby><ruby>八百屋<rt>やおや</rt></ruby><ruby>でいらないキャ<rt></rt></ruby><ruby>ベツを<rt></rt></ruby><ruby>段<rt>だん</rt></ruby><ruby>ボールにいっぱいのらって、<rt></rt></ruby><ruby>野菜<rt>やさい</rt></ruby><ruby>炒<rt>いた</rt></ruby><ruby>めばかり<rt></rt></ruby><ruby>食<rt>た</rt></ruby><ruby>べとい<rt></rt></ruby><ruby>た。でも<rt></rt></ruby><ruby>貧<rt>まず</rt></ruby><ruby>しい<rt></rt></ruby><ruby>分<rt>ぶん</rt></ruby><ruby>、<rt></rt></ruby><ruby>人<rt>ひと</rt></ruby><ruby>の<rt></rt></ruby><ruby>優<rt>やさ</rt></ruby><ruby>しさにもたくさん<rt></rt></ruby><ruby>触<rt>ふ</rt></ruby><ruby>れられたと<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>う。<rt></rt></ruby>",
    english_translation: "When I was young, I had no money and had a hard time. I would get a cardboard box from the local grocery store that was full of cabbage they didn't need, and I would eat nothing but stir-fried vegetables. But as poor as I was, I was all the more affected by people's kindness.",
    annotated_words: [
      { kanji: "八百屋", furigana: "やおや", meaning: "grocery store" },
      { kanji: "段ボール", furigana: "だんボール", meaning: "cardboard" },
      { kanji: "貧しい", furigana: "まずしい", meaning: "poor" }
    ]
  },
  {
    id: "57_1",
    title: "Topic 3",
    japanese_text: "<ruby>通販<rt>つうはん</rt></ruby><ruby>でダイヤモンドのネックレスを<rt></rt></ruby><ruby>買<rt>か</rt></ruby><ruby>った。<rt></rt></ruby><ruby>定価<rt>ていか</rt></ruby>８<ruby>万円<rt>まんえん</rt></ruby><ruby>のもの<rt></rt></ruby><ruby>がセールで<rt></rt></ruby>５<ruby>万円<rt>まんえん</rt></ruby><ruby>だったので<rt></rt></ruby><ruby>得<rt>とく</rt></ruby><ruby>した<rt></rt></ruby><ruby>気分<rt>きぶん</rt></ruby><ruby>だ。お<rt></rt></ruby><ruby>金<rt>かね</rt></ruby><ruby>も<rt></rt></ruby><ruby>振<rt>ふ</rt></ruby><ruby>り<rt></rt></ruby><ruby>込<rt>こ</rt></ruby><ruby>んだ<rt></rt></ruby><ruby>し、<rt></rt></ruby><ruby>配達<rt>はいたつ</rt></ruby><ruby>されるのが<rt></rt></ruby><ruby>楽<rt>たの</rt></ruby><ruby>しみだ。<rt></rt></ruby>",
    english_translation: "I bought a diamond necklace by mail order. It feels like I got a bargain because it was on sale for 50,000 yen with a list price of 80,000 yen. I already sent the money, so I'm looking forward to getting the delivery.",
    annotated_words: [
      { kanji: "通販", furigana: "つうはん", meaning: "mail order" },
      { kanji: "ダイヤモンド", furigana: "", meaning: "diamond" },
      { kanji: "セール", furigana: "", meaning: "sale" },
      { kanji: "得", furigana: "とく", meaning: "bargain, get a bargain" },
      { kanji: "損", furigana: "そん", meaning: "loss, take a loss" },
      { kanji: "振り込む", furigana: "ふりこむ", meaning: "send, deposit (a payment)" },
      { kanji: "配達", furigana: "はいたつ", meaning: "delivery, deliver" }
    ]
  },
  {
    id: "57_2",
    title: "Topic 3",
    japanese_text: "<ruby>バーゲンのシーズンが<rt></rt></ruby><ruby>来<rt>き</rt></ruby><ruby>た。<rt></rt></ruby><ruby>高<rt>たか</rt></ruby><ruby>くて<rt></rt></ruby><ruby>買<rt>か</rt></ruby><ruby>えなかった<rt></rt></ruby><ruby>服<rt>ふく</rt></ruby><ruby>が<rt></rt></ruby><ruby>値下<rt>ねさ</rt></ruby><ruby>がり<rt></rt></ruby><ruby>していたら<rt></rt></ruby><ruby>買<rt>か</rt></ruby><ruby>うつもりだ。<rt></rt></ruby><ruby>多<rt>おお</rt></ruby><ruby>めにお<rt></rt></ruby><ruby>金<rt>かね</rt></ruby><ruby>を<rt></rt></ruby><ruby>引<rt>ひ</rt></ruby><ruby>き<rt></rt></ruby><ruby>出<rt>だ</rt></ruby><ruby>しておこう。<rt></rt></ruby>",
    english_translation: "Bargain's season has arrived. If they lower the prices, I'm going to buy all of the clothes that I couldn't get before because they were too expensive. I should withdraw a little extra money.",
    annotated_words: [
      { kanji: "バーゲン（セール）", furigana: "", meaning: "bargain (sale)" },
      { kanji: "値下がり", furigana: "ねさがり", meaning: "price drop, lower the price" },
      { kanji: "値上がり", furigana: "ねあがり", meaning: "price increase, increase the price" },
      { kanji: "値", furigana: "ね", meaning: "value" },
      { kanji: "引き出す", furigana: "ひきだす", meaning: "get out, withdraw" }
    ]
  },
  {
    id: "58_1",
    title: "Topic 3",
    japanese_text: "<ruby>Ａ：<rt></rt></ruby><ruby>税込<rt>ぜいこ</rt></ruby><ruby>み<rt></rt></ruby>３５００<ruby>円<rt>えん</rt></ruby><ruby>です。<rt></rt></ruby>\n<ruby>Ｂ：カードで。<rt></rt></ruby>\n<ruby>Ａ：お<rt></rt></ruby><ruby>支払<rt>しはら</rt></ruby><ruby>い<rt></rt></ruby><ruby>方法<rt>ほうほう</rt></ruby><ruby>はいかがいたしましょうか。<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby>１<ruby>回払<rt>いっかいばら</rt></ruby><ruby>いで<rt></rt></ruby><ruby>お願<rt>ねが</rt></ruby><ruby>いします。<rt></rt></ruby>",
    english_translation: "A: That's 3,500 yen including tax.\nB: By card.\nA: What payment method would you like?\nB: In one installment, please.",
    annotated_words: [
      { kanji: "税込み", furigana: "ぜいこみ", meaning: "tax included" },
      { kanji: "１回払い", furigana: "いっかいばらい", meaning: "one-installment payment" }
    ]
  },
  {
    id: "58_2",
    title: "Topic 3",
    japanese_text: "<ruby>Ａ：すみません、クレジットカードって<rt></rt></ruby><ruby>使<rt>つか</rt></ruby><ruby>えますか。<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>申<rt>もう</rt></ruby><ruby>し<rt></rt></ruby><ruby>訳<rt>わけ</rt></ruby><ruby>ございません。<rt></rt></ruby><ruby>現金<rt>げんきん</rt></ruby><ruby>のみになっております。<rt></rt></ruby>\n<ruby>Ａ：そうですか。あ、<rt></rt></ruby><ruby>領収書<rt>りょうしゅうしょ</rt></ruby><ruby>お<rt></rt></ruby><ruby>願<rt>ねが</rt></ruby><ruby>いします。<rt></rt></ruby>\n<ruby>Ｂ：かしこまりました。レジ<rt></rt></ruby><ruby>袋<rt>ぶくろ</rt></ruby><ruby>はお<rt></rt></ruby><ruby>付<rt>つ</rt></ruby><ruby>けしますか。<rt></rt></ruby>",
    english_translation: "A: Excuse me, can I use a credit card?\nB: Sorry. We only accept cash.\nA: I see. Oh, please give me a receipt.\nB: Okay. Would you like a plastic bag?",
    annotated_words: [
      { kanji: "クレジットカード", furigana: "", meaning: "credit card" },
      { kanji: "キャッシュカード", furigana: "", meaning: "ATM card" },
      { kanji: "現金", furigana: "げんきん", meaning: "cash" },
      { kanji: "領収書", furigana: "りょうしゅうしょ", meaning: "receipt" },
      { kanji: "レジ袋", furigana: "レジぶくろ", meaning: "shopping bag, plastic bag" }
    ]
  },
  {
    id: "59_1",
    title: "Topic 3",
    japanese_text: "<ruby>Ａ：ねえねえ、これ、フリマアプリでいくらで<rt></rt></ruby><ruby>売<rt>う</rt></ruby><ruby>れると<rt></rt></ruby><ruby>思<rt>おも</rt></ruby><ruby>う？<rt></rt></ruby>\n<ruby>Ｂ：<rt></rt></ruby><ruby>商品<rt>しょうひん</rt></ruby><ruby>代<rt>だい</rt></ruby><ruby>プラス<rt></rt></ruby><ruby>送料<rt>そうりょう</rt></ruby><ruby>で<rt></rt></ruby>１０００<ruby>円<rt>えん</rt></ruby><ruby>なら<rt></rt></ruby><ruby>買<rt>か</rt></ruby><ruby>うかな。<rt></rt></ruby>",
    english_translation: "A: Hey, how much do you think I can sell this for on a flea market app?\nB: Someone might buy it for 1,000 yen including shipping.",
    annotated_words: [
      { kanji: "売れる", furigana: "うれる", meaning: "sell, be sellable" },
      { kanji: "プラス", furigana: "", meaning: "plus, add on" },
      { kanji: "送料", furigana: "そうりょう", meaning: "shipping cost" }
    ]
  }
];

topic3_data.forEach(story => {
  fs.writeFileSync(`src/data/tango_n3_raw/${story.id}.json`, JSON.stringify(story, null, 2));
  console.log(`Created ${story.id}.json`);
});
