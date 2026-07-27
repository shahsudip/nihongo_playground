import json
import os

# Topic 26: 事件・社会問題 (Incidents & Social Issues)
# Words 2444-2495, pages 324-327 + 337-343
data = [
    {
        "file": "324_1.json",
        "story_number": 1,
        "japanese_text": "近年、インターネット上での<u>詐欺</u>が増加しており、<u>被害者</u>の数も年々増えている。<u>巧妙な</u>手口で<u>騙された</u>人々の多くは、<u>損害賠償</u>を求めて訴訟を起こすが、犯人を<u>特定</u>するのは困難だ。",
        "english_translation": "In recent years, online fraud has been increasing, and the number of victims grows year by year. Many people who were deceived by sophisticated schemes file lawsuits seeking compensation for damages, but identifying the perpetrators is difficult.",
        "words": [
            {"id": "2444", "k": "詐欺", "f": "さぎ", "e": "fraud, scam"},
            {"id": "2445", "k": "巧妙な", "f": "こうみょうな", "e": "sophisticated, clever"},
            {"id": "2446", "k": "騙す", "f": "だます", "e": "deceive, trick"},
            {"id": "2447", "k": "損害賠償", "f": "そんがいばいしょう", "e": "compensation for damages"},
            {"id": "2448", "k": "特定[する]", "f": "とくてい", "e": "identification, identify"}
        ]
    },
    {
        "file": "324_2.json",
        "story_number": 2,
        "japanese_text": "A：最近、振り込め詐欺の被害が多いらしいね。\nB：そうなんだよ。<u>高齢者</u>が<u>標的</u>にされやすいって。<u>予防</u>策として、家族との<u>合言葉</u>を決めておくといいらしい。\nA：なるほど。<u>啓発</u>活動をもっと広めないとね。",
        "english_translation": "A: I hear there have been a lot of phone scam cases lately. B: Yeah. Apparently elderly people tend to be targeted. As a preventive measure, it's good to have a code word with family. A: I see. We need to spread awareness activities more.",
        "words": [
            {"id": "2449", "k": "高齢者", "f": "こうれいしゃ", "e": "elderly person"},
            {"id": "2450", "k": "標的", "f": "ひょうてき", "e": "target"},
            {"id": "2451", "k": "予防[する]", "f": "よぼう", "e": "prevention, prevent"},
            {"id": "2452", "k": "啓発[する]", "f": "けいはつ", "e": "awareness, enlighten"}
        ]
    },
    {
        "file": "325_1.json",
        "story_number": 3,
        "japanese_text": "大規模な<u>自然災害</u>が発生した際、政府は速やかに<u>非常事態</u>を<u>宣言</u>し、<u>被災地</u>への<u>緊急支援</u>を開始した。<u>自衛隊</u>が<u>派遣</u>され、<u>救助</u>活動が行われた。",
        "english_translation": "When a large-scale natural disaster occurred, the government promptly declared a state of emergency and began emergency support for the disaster-stricken areas. The Self-Defense Forces were dispatched and rescue operations were carried out.",
        "words": [
            {"id": "2453", "k": "自然災害", "f": "しぜんさいがい", "e": "natural disaster"},
            {"id": "2454", "k": "非常事態", "f": "ひじょうじたい", "e": "state of emergency"},
            {"id": "2455", "k": "宣言[する]", "f": "せんげん", "e": "declaration, declare"},
            {"id": "2456", "k": "被災地", "f": "ひさいち", "e": "disaster-stricken area"},
            {"id": "2457", "k": "自衛隊", "f": "じえいたい", "e": "Self-Defense Forces"},
            {"id": "2458", "k": "派遣[する]", "f": "はけん", "e": "dispatch, send"},
            {"id": "2459", "k": "救助[する]", "f": "きゅうじょ", "e": "rescue, rescue"}
        ]
    },
    {
        "file": "326_1.json",
        "story_number": 4,
        "japanese_text": "工場の<u>爆発</u>事故で<u>有毒</u>ガスが<u>漏れ</u>、周辺住民に<u>避難</u>命令が出された。<u>消防</u>や警察が現場に<u>急行</u>し、<u>負傷者</u>の<u>手当て</u>が行われた。<u>原因</u>は現在も<u>調査中</u>だ。",
        "english_translation": "A factory explosion caused toxic gas to leak, and an evacuation order was issued to nearby residents. Firefighters and police rushed to the scene, and the injured were treated. The cause is currently still under investigation.",
        "words": [
            {"id": "2460", "k": "爆発[する]", "f": "ばくはつ", "e": "explosion, explode"},
            {"id": "2461", "k": "有毒な", "f": "ゆうどくな", "e": "toxic, poisonous"},
            {"id": "2462", "k": "漏れる", "f": "もれる", "e": "leak"},
            {"id": "2463", "k": "避難[する]", "f": "ひなん", "e": "evacuation, evacuate"},
            {"id": "2464", "k": "消防", "f": "しょうぼう", "e": "fire fighting, fire department"},
            {"id": "2465", "k": "負傷者", "f": "ふしょうしゃ", "e": "injured person"}
        ]
    },
    {
        "file": "326_2.json",
        "story_number": 5,
        "japanese_text": "A：先日の台風、被害大きかったね。\nB：ほんとに。<u>床上浸水</u>した家が何軒もあったって。<u>復旧</u>作業も大変そう。\nA：<u>インフラ</u>の<u>老朽化</u>が問題だよね。<u>対策</u>を<u>講じ</u>ないと、また同じことが起きる。",
        "english_translation": "A: The typhoon the other day caused a lot of damage, didn't it? B: It really did. I heard many houses had flooding above floor level. The recovery work sounds tough too. A: Aging infrastructure is the problem. Unless we take measures, the same thing will happen again.",
        "words": [
            {"id": "2466", "k": "復旧[する]", "f": "ふっきゅう", "e": "restoration, restore"},
            {"id": "2467", "k": "インフラ", "f": "", "e": "infrastructure"},
            {"id": "2468", "k": "老朽化[する]", "f": "ろうきゅうか", "e": "aging, deterioration"},
            {"id": "2469", "k": "対策", "f": "たいさく", "e": "measure, countermeasure"},
            {"id": "2470", "k": "講じる", "f": "こうじる", "e": "take (measures)"}
        ]
    },
    {
        "file": "327_1.json",
        "story_number": 6,
        "japanese_text": "国際的な<u>テロ</u>組織が<u>暗躍</u>し、世界各地で<u>無差別</u>な<u>攻撃</u>が相次いでいる。各国政府は<u>情報</u>を<u>共有</u>し、<u>テロ</u>の<u>未然防止</u>に向けた<u>連携</u>を強化している。",
        "english_translation": "International terrorist organizations are operating behind the scenes, and indiscriminate attacks are occurring one after another around the world. Governments are sharing information and strengthening cooperation toward the prevention of terrorism before it occurs.",
        "words": [
            {"id": "2471", "k": "テロ", "f": "", "e": "terrorism, terrorist attack"},
            {"id": "2472", "k": "暗躍[する]", "f": "あんやく", "e": "work behind the scenes"},
            {"id": "2473", "k": "無差別な", "f": "むさべつな", "e": "indiscriminate"},
            {"id": "2474", "k": "攻撃[する]", "f": "こうげき", "e": "attack, attack"},
            {"id": "2475", "k": "未然防止", "f": "みぜんぼうし", "e": "prevention before it occurs"}
        ]
    },
    {
        "file": "337_1.json",
        "story_number": 7,
        "japanese_text": "<u>薬物</u>の<u>乱用</u>は社会問題となっており、<u>依存</u>症になると自力での<u>回復</u>が難しくなる。<u>更生</u>施設での支援が重要だが、<u>偏見</u>から<u>孤立</u>してしまうケースも多い。社会全体で<u>受け入れ</u>る体制が求められる。",
        "english_translation": "Drug abuse has become a social problem, and once addicted, recovery on one's own becomes difficult. Support at rehabilitation facilities is important, but many cases end up isolated due to prejudice. A system of acceptance by society as a whole is needed.",
        "words": [
            {"id": "2476", "k": "薬物", "f": "やくぶつ", "e": "drug, narcotic"},
            {"id": "2477", "k": "乱用[する]", "f": "らんよう", "e": "abuse, misuse"},
            {"id": "2478", "k": "依存[する]", "f": "いぞん", "e": "dependence, depend on"},
            {"id": "2479", "k": "更生[する]", "f": "こうせい", "e": "rehabilitation, rehabilitate"},
            {"id": "2480", "k": "偏見", "f": "へんけん", "e": "prejudice, bias"}
        ]
    },
    {
        "file": "338_1.json",
        "story_number": 8,
        "japanese_text": "A：最近、<u>ハラスメント</u>の問題が職場でも増えてるよね。\nB：そうだね。<u>パワハラ</u>や<u>セクハラ</u>は<u>加害者</u>自身が<u>自覚</u>していないことも多いから厄介だよ。\nA：<u>研修</u>を通じて<u>意識</u>を高めることが大事だね。",
        "english_translation": "A: Harassment has been increasing in the workplace lately, hasn't it? B: That's true. Power harassment and sexual harassment are tricky because the perpetrators often aren't aware of what they're doing. A: It's important to raise awareness through training.",
        "words": [
            {"id": "2481", "k": "ハラスメント", "f": "", "e": "harassment"},
            {"id": "2482", "k": "パワハラ", "f": "", "e": "power harassment"},
            {"id": "2483", "k": "セクハラ", "f": "", "e": "sexual harassment"},
            {"id": "2484", "k": "自覚[する]", "f": "じかく", "e": "self-awareness, be aware of"},
            {"id": "2485", "k": "研修", "f": "けんしゅう", "e": "training, workshop"}
        ]
    },
    {
        "file": "339_1.json",
        "story_number": 9,
        "japanese_text": "SNSの<u>普及</u>により、<u>誹謗中傷</u>が社会問題化している。<u>匿名</u>性を<u>悪用</u>した<u>書き込み</u>が<u>拡散</u>されることで、<u>被害者</u>の精神的<u>苦痛</u>は計り知れない。<u>法整備</u>による<u>抑止</u>が急がれる。",
        "english_translation": "The spread of social media has made defamation and slander a social problem. When posts that exploit anonymity are spread, the psychological suffering of victims is immeasurable. Legal measures to deter such behavior are urgently needed.",
        "words": [
            {"id": "2486", "k": "普及[する]", "f": "ふきゅう", "e": "spread, become widespread"},
            {"id": "2487", "k": "誹謗中傷[する]", "f": "ひぼうちゅうしょう", "e": "defamation and slander"},
            {"id": "2488", "k": "匿名", "f": "とくめい", "e": "anonymity"},
            {"id": "2489", "k": "悪用[する]", "f": "あくよう", "e": "misuse, abuse"},
            {"id": "2490", "k": "拡散[する]", "f": "かくさん", "e": "spread, diffuse"},
            {"id": "2491", "k": "抑止[する]", "f": "よくし", "e": "deterrence, deter"}
        ]
    },
    {
        "file": "340_1.json",
        "story_number": 10,
        "japanese_text": "少子化が進む日本では、将来の<u>労働力</u>不足が<u>深刻</u>な問題となっている。<u>外国人労働者</u>の<u>受け入れ</u>を<u>拡大</u>することで<u>補う</u>という意見もあるが、<u>文化的</u>な<u>摩擦</u>や<u>制度</u>整備の遅れも<u>懸念</u>される。",
        "english_translation": "In Japan, where the declining birthrate continues, a future labor shortage is becoming a serious problem. Some suggest expanding the acceptance of foreign workers to compensate, but concerns also exist about cultural friction and delays in institutional development.",
        "words": [
            {"id": "2492", "k": "労働力", "f": "ろうどうりょく", "e": "workforce, labor force"},
            {"id": "2493", "k": "深刻な", "f": "しんこくな", "e": "serious, grave"},
            {"id": "2494", "k": "摩擦", "f": "まさつ", "e": "friction, conflict"},
            {"id": "2495", "k": "懸念[する]", "f": "けねん", "e": "concern, be concerned about"}
        ]
    },
    {
        "file": "341_1.json",
        "story_number": 11,
        "japanese_text": "A：最近の<u>格差社会</u>について、どう思う？\nB：<u>貧困</u>層がなかなか<u>抜け出せ</u>ない<u>悪循環</u>があるよね。教育の機会が<u>均等</u>じゃないことが原因の一つだと思う。\nA：<u>奨学金</u>制度の<u>拡充</u>とか、<u>セーフティーネット</u>の強化が必要だね。",
        "english_translation": "A: What do you think about the gap in society lately? B: There's a vicious cycle that people in poverty can't easily escape. I think one reason is that educational opportunities aren't equal. A: We need to expand the scholarship system and strengthen the social safety net.",
        "words": [
            {"id": "2496", "k": "格差", "f": "かくさ", "e": "gap, disparity"},
            {"id": "2497", "k": "貧困", "f": "ひんこん", "e": "poverty"},
            {"id": "2498", "k": "悪循環", "f": "あくじゅんかん", "e": "vicious cycle"},
            {"id": "2499", "k": "均等な", "f": "きんとうな", "e": "equal, uniform"},
            {"id": "2500", "k": "奨学金", "f": "しょうがくきん", "e": "scholarship"}
        ]
    },
    {
        "file": "341_2.json",
        "story_number": 12,
        "japanese_text": "現代社会では<u>孤独死</u>が増加している。特に一人暮らしの<u>高齢者</u>が<u>孤立</u>しやすく、<u>地域</u>のつながりが<u>希薄化</u>していることが背景にある。<u>見守り</u>サービスや<u>コミュニティ</u>づくりが重要だ。",
        "english_translation": "Solitary deaths are increasing in modern society. Elderly people living alone are particularly prone to isolation, and the weakening of community ties is a contributing factor. Monitoring services and community building are important.",
        "words": [
            {"id": "2501", "k": "孤独死", "f": "こどくし", "e": "solitary death, dying alone"},
            {"id": "2502", "k": "希薄化[する]", "f": "きはくか", "e": "dilution, become weak or thin"},
            {"id": "2503", "k": "見守る", "f": "みまもる", "e": "watch over, monitor"}
        ]
    },
    {
        "file": "342_1.json",
        "story_number": 13,
        "japanese_text": "近年、<u>環境問題</u>への<u>意識</u>が高まり、<u>持続可能な</u>社会の実現に向けた取り組みが各地で広がっている。企業も<u>脱炭素</u>化を<u>目標</u>に掲げ、<u>再生可能エネルギー</u>への<u>転換</u>を<u>加速</u>させている。",
        "english_translation": "In recent years, awareness of environmental issues has been growing, and initiatives toward achieving a sustainable society are spreading everywhere. Companies are also setting decarbonization goals and accelerating the shift to renewable energy.",
        "words": [
            {"id": "2504", "k": "環境問題", "f": "かんきょうもんだい", "e": "environmental issue"},
            {"id": "2505", "k": "持続可能な", "f": "じぞくかのうな", "e": "sustainable"},
            {"id": "2506", "k": "脱炭素", "f": "だつたんそ", "e": "decarbonization"},
            {"id": "2507", "k": "再生可能エネルギー", "f": "さいせいかのうエネルギー", "e": "renewable energy"},
            {"id": "2508", "k": "加速[する]", "f": "かそく", "e": "acceleration, accelerate"}
        ]
    },
    {
        "file": "342_2.json",
        "story_number": 14,
        "japanese_text": "A：プラスチック<u>汚染</u>ってかなり深刻だよね。\nB：そうだよ。海洋<u>生態系</u>への<u>影響</u>が<u>甚大</u>で、<u>マイクロプラスチック</u>が食物連鎖に入り込んでいるって。\nA：一人一人の<u>意識改革</u>から始めないと<u>改善</u>は難しいよね。",
        "english_translation": "A: Plastic pollution is quite serious, isn't it? B: It really is. The impact on marine ecosystems is enormous, and microplastics are entering the food chain. A: It'll be hard to improve without starting with a change in individual awareness.",
        "words": [
            {"id": "2509", "k": "汚染[する]", "f": "おせん", "e": "pollution, pollute"},
            {"id": "2510", "k": "生態系", "f": "せいたいけい", "e": "ecosystem"},
            {"id": "2511", "k": "甚大な", "f": "じんだいな", "e": "enormous, immense"},
            {"id": "2512", "k": "意識改革", "f": "いしきかいかく", "e": "change of awareness, mindset reform"}
        ]
    },
    {
        "file": "343_1.json",
        "story_number": 15,
        "japanese_text": "地球温暖化による<u>気候変動</u>は、<u>異常気象</u>や<u>海面上昇</u>など様々な<u>影響</u>を<u>もたらして</u>いる。国際社会は<u>温室効果ガス</u>の<u>排出削減</u>に向けた<u>協定</u>を<u>締結</u>し、各国が<u>目標達成</u>に向けて取り組んでいる。",
        "english_translation": "Climate change due to global warming is causing various impacts such as extreme weather and sea level rise. The international community has concluded agreements aimed at reducing greenhouse gas emissions, and countries are working toward achieving their targets.",
        "words": [
            {"id": "2513", "k": "気候変動", "f": "きこうへんどう", "e": "climate change"},
            {"id": "2514", "k": "異常気象", "f": "いじょうきしょう", "e": "extreme weather, abnormal weather"},
            {"id": "2515", "k": "海面上昇", "f": "かいめんじょうしょう", "e": "sea level rise"},
            {"id": "2516", "k": "温室効果ガス", "f": "おんしつこうかガス", "e": "greenhouse gas"},
            {"id": "2517", "k": "排出削減", "f": "はいしゅつさくげん", "e": "emissions reduction"},
            {"id": "2518", "k": "協定", "f": "きょうてい", "e": "agreement, accord"}
        ]
    }
]

out_dir = r"D:\sudip_software\nihongo_playground\src\data\tango_n1_raw"
os.makedirs(out_dir, exist_ok=True)

for d in data:
    filepath = os.path.join(out_dir, d["file"])
    out = {
        "is_story": True,
        "story_number": d["story_number"],
        "title": "Topic 26",
        "japanese_text": d["japanese_text"],
        "english_translation": d["english_translation"],
        "annotated_words": []
    }

    for w in d["words"]:
        out["annotated_words"].append({
            "word_id": f"n1_{w['id'].zfill(4)}",
            "word_number": int(w["id"]),
            "kanji": w["k"],
            "furigana": w["f"],
            "meaning_en": w["e"]
        })

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

print("Done generating Topic 26 JSONs.")
