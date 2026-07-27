import json
import os

data = [
    {
        "file": "328_1.json",
        "story_number": 1,
        "japanese_text": "A：そういえば、高校通ってたときに学校を<u>爆破する</u>って<u>脅迫</u>騒ぎがあった話ってしたっけ。\nB：いや、<u>初耳</u>だけど。\nA：それが、犯人が実はクラスメートでさ。<u>発覚した</u>ときはびっくりしたなあ。",
        "english_translation": "A: Hey, did I ever tell you about when I was in high school and there was a big commotion about a threat to bomb the school? B: No, that's the first time I've heard of it. A: Well, the culprit was actually a classmate of mine. I was so surprised when the fact was discovered.",
        "words": [
            {"id": "2366", "k": "爆破[する]", "f": "ばくは", "e": "bombing, blow up"},
            {"id": "2367", "k": "脅迫[する]", "f": "きょうはく", "e": "threat, threaten"},
            {"id": "2368", "k": "初耳", "f": "はつみみ", "e": "first time hearing (something)"},
            {"id": "2369", "k": "発覚[する]", "f": "はっかく", "e": "finding, discover"}
        ]
    },
    {
        "file": "329_1.json",
        "story_number": 2,
        "japanese_text": "本日<u>未明</u>、山の中で<u>身元</u>不明の３人の死体が見つかった。３人は親子であると見られ、無理<u>心中</u>ではないかと言われているが、証拠がなく<u>真相</u>は闇の中である。",
        "english_translation": "At dawn today, three bodies, whose identities are unclear, were found in the mountains. All three are believed to be related, and there is speculation that it was a forced group suicide, but there is no evidence and the truth remains unknown.",
        "words": [
            {"id": "2370", "k": "未明", "f": "みめい", "e": "dawn"},
            {"id": "2371", "k": "身元", "f": "みもと", "e": "identity"},
            {"id": "2372", "k": "心中[する]", "f": "しんじゅう", "e": "double suicide, group suicide"},
            {"id": "2373", "k": "真相", "f": "しんそう", "e": "truth"}
        ]
    },
    {
        "file": "329_2.json",
        "story_number": 3,
        "japanese_text": "先日、ある地域で幼い子どもが<u>誘拐</u>される事件が発生した。<u>追跡</u>する過程で<u>さら</u>われた子どもは無事に保護されたものの、依然として犯人の<u>捜索</u>は続いている。",
        "english_translation": "Recently, an incident occurred in which a young child was abducted in certain area. As the case was pursued, the kidnapped child was safely recovered, but the search for the perpetrators is still ongoing.",
        "words": [
            {"id": "2374", "k": "誘拐[する]", "f": "ゆうかい", "e": "abduction, abduct"},
            {"id": "2375", "k": "追跡[する]", "f": "ついせき", "e": "pursuit, pursue"},
            {"id": "2376", "k": "さらう", "f": "", "e": "carry away, kidnap"},
            {"id": "2377", "k": "捜索[する]", "f": "そうさく", "e": "search, search"}
        ]
    },
    {
        "file": "330_1.json",
        "story_number": 4,
        "japanese_text": "<u>法廷</u>では、量刑といって犯罪行為に対する<u>刑罰</u>を決定する作業が行われる。その際、<u>被告人</u>を<u>弁護する</u>ために身内や知人が<u>証人</u>になる場合がある。彼らが<u>証言する</u>内容によっては刑罰が軽減されることがあり、重要な役割を担っている。",
        "english_translation": "In court, the process of determining the punishment for a criminal act, known as sentencing, takes place. In such cases, relatives and acquaintances may serve as witnesses in defense of the accused. Depending on how they testify, the punishment may be reduced, so they play an important role.",
        "words": [
            {"id": "2378", "k": "法廷", "f": "ほうてい", "e": "court (of law)"},
            {"id": "2379", "k": "刑罰", "f": "けいばつ", "e": "punishment"},
            {"id": "2380", "k": "被告人", "f": "ひこくにん", "e": "the accused"},
            {"id": "2381", "k": "弁護[する]", "f": "べんご", "e": "defense, defend"},
            {"id": "2382", "k": "証人", "f": "しょうにん", "e": "witness"},
            {"id": "2383", "k": "証言[する]", "f": "しょうげん", "e": "testimony, testify"}
        ]
    },
    {
        "file": "330_2.json",
        "story_number": 5,
        "japanese_text": "ある人物がインターネットの掲示板で他のユーザーを<u>罵り</u>、<u>中傷する</u>書き込みをした。これにより被害者は法的手段を取ることを決め、<u>訴訟</u>を起こそうとした。しかし、お互いに話し合った結果、<u>和解する</u>こととなった。",
        "english_translation": "Someone made abusive and defamatory posts about another user on an internet bulletin board. The victim decided to take legal action and tried to file a lawsuit. However, after a mutual discussion, the two parties settled the case.",
        "words": [
            {"id": "2384", "k": "罵る", "f": "ののしる", "e": "be abusive"},
            {"id": "2385", "k": "中傷[する]", "f": "ちゅうしょう", "e": "defamation, slander"},
            {"id": "2386", "k": "訴訟[する]", "f": "そしょう", "e": "lawsuit, sue"},
            {"id": "2387", "k": "和解[する]", "f": "わかい", "e": "peacemaking, settle"}
        ]
    },
    {
        "file": "331_1.json",
        "story_number": 6,
        "japanese_text": "最近、この地域では<u>放火</u>事件が<u>相次いで</u>起きている。現場付近では鋭い<u>目つき</u>をした<u>不審な</u>人物が<u>目撃され</u>ている。犯人が捕まった場合、<u>有罪</u> <u>判決</u>は免れないだろう。",
        "english_translation": "Recently, arson incidents have been occurring one after another in the local area. A suspicious fellow with a cunning look has been witnessed near the scenes. If the culprit is caught, he will probably be found guilty.",
        "words": [
            {"id": "2388", "k": "放火[する]", "f": "ほうか", "e": "arson, set fire"},
            {"id": "2389", "k": "相次ぐ", "f": "あいつぐ", "e": "occur one after another"},
            {"id": "2390", "k": "目つき", "f": "めつき", "e": "look (in the eyes)"},
            {"id": "2391", "k": "不審な", "f": "ふしんな", "e": "suspicious"},
            {"id": "2392", "k": "目撃[する]", "f": "もくげき", "e": "witnessing, witness"},
            {"id": "2393", "k": "有罪", "f": "ゆうざい", "e": "guilty"},
            {"id": "2394", "k": "無罪", "f": "むざい", "e": "not guilty"},
            {"id": "2395", "k": "判決[する]", "f": "はんけつ", "e": "judgment, find"}
        ]
    },
    {
        "file": "332_1.json",
        "story_number": 7,
        "japanese_text": "先日、旅客機が<u>乗っ取られる</u>事件が発生し、乗客が<u>人質</u>として<u>巻き込まれた</u>。後日、政府から犯人による<u>声明</u>が発表され、数名の乗客が<u>拘束され</u>ていることが明らかになった。その他の乗客については<u>生死</u>不明である。",
        "english_translation": "Recently, an airliner was hijacked and passengers were involved in the incident as hostages. Later, a statement by the perpetrators was released by the government, revealing that several passengers had been detained. As for the other passengers, their safety is unknown.",
        "words": [
            {"id": "2396", "k": "乗っ取る", "f": "のっとる", "e": "hijack, take over"},
            {"id": "2397", "k": "人質", "f": "ひとじち", "e": "hostage"},
            {"id": "2398", "k": "巻き込む", "f": "まきこむ", "e": "catch, involve"},
            {"id": "2399", "k": "声明", "f": "せいめい", "e": "declaration, statement"},
            {"id": "2400", "k": "拘束[する]", "f": "こうそく", "e": "restraint, detain"},
            {"id": "2401", "k": "生死", "f": "せいし", "e": "alive or dead, safety"}
        ]
    },
    {
        "file": "332_2.json",
        "story_number": 8,
        "japanese_text": "<u>ストーカー</u>被害が社会問題となった結果、日本では平成12年にストーカー行為を規制する法律が制定され、半年後に<u>施行され</u>た。<u>他方</u>、<u>加害者</u>を<u>処罰する</u>だけでなく、<u>被害者</u>が<u>立ち直る</u>ための支援策も求められている。",
        "english_translation": "As a result of the social problem of stalking, a law regulating stalking behavior was passed in Japan in Heisei 12 (2000), coming into effect six months later. On the other hand, in addition to punishing perpetrators, there is also a need for supportive measures to help victims recover.",
        "words": [
            {"id": "2402", "k": "ストーカー", "f": "", "e": "stalker"},
            {"id": "2403", "k": "施行[する]", "f": "しこう", "e": "enforcement, come into effect"},
            {"id": "2404", "k": "他方", "f": "たほう", "e": "(on the) other hand"},
            {"id": "2405", "k": "加害者", "f": "かがいしゃ", "e": "perpetrator"},
            {"id": "2406", "k": "被害者", "f": "ひがいしゃ", "e": "victim"},
            {"id": "2407", "k": "処罰[する]", "f": "しょばつ", "e": "punishment, punish"},
            {"id": "2408", "k": "立ち直る", "f": "たちなおる", "e": "recover, regain (one's) footing"}
        ]
    },
    {
        "file": "333_1.json",
        "story_number": 9,
        "japanese_text": "<u>ずさんな</u>捜査が原因で、罪のない人が<u>容疑者</u>として逮捕されかけ、<u>不当な</u>扱いを受ける事件があった。この事件は警察の信用を大きく<u>揺るがした</u>。",
        "english_translation": "In a recent incident, an innocent person was almost arrested as a suspect and treated unfairly as the result of a sloppy investigation. The incident seriously shook the credibility of the police.",
        "words": [
            {"id": "2409", "k": "ずさんな", "f": "", "e": "sloppy"},
            {"id": "2410", "k": "容疑者", "f": "ようぎしゃ", "e": "(criminal) suspect"},
            {"id": "2411", "k": "不当な", "f": "ふとうな", "e": "unfair"},
            {"id": "2412", "k": "揺るがす", "f": "ゆるがす", "e": "shake"}
        ]
    },
    {
        "file": "334_1.json",
        "story_number": 10,
        "japanese_text": "交番に紙幣を<u>偽造した</u>として、<u>自首した</u>いとの<u>通報</u>があった。通報した人物は<u>取り調べ</u>に対し、<u>始終</u>うつむいたまま、借金を<u>取り立てられて</u>いて辛かったと述べており、世間からは<u>同情する</u>声も出ている。",
        "english_translation": "The police received a report that a person wanted to turn himself in for counterfeiting banknotes. During the inquiry, the person who reported the crime told the interrogator that he was depressed all the time and that he had been extorted over debts, and some people expressed sympathy for him.",
        "words": [
            {"id": "2413", "k": "偽造[する]", "f": "ぎぞう", "e": "counterfeiting, counterfeit"},
            {"id": "2414", "k": "自首[する]", "f": "じしゅ", "e": "self-surrender, turn oneself in"},
            {"id": "2415", "k": "通報[する]", "f": "つうほう", "e": "report, report"},
            {"id": "2416", "k": "取り調べ", "f": "とりしらべ", "e": "inquiry, investigation"},
            {"id": "2417", "k": "取り調べる", "f": "とりしらべる", "e": "investigate"},
            {"id": "2418", "k": "始終", "f": "しじゅう", "e": "all the time, constantly"},
            {"id": "2419", "k": "取り立てる", "f": "とりたてる", "e": "collect (debt), extort"},
            {"id": "2420", "k": "同情[する]", "f": "どうじょう", "e": "sympathy, sympathize"}
        ]
    },
    {
        "file": "334_2.json",
        "story_number": 11,
        "japanese_text": "男女５人がハイキング中に<u>遭難し</u>、熊に襲われ全員亡くなるという、<u>痛ましい</u>事故が起こった。５人のうち２人は、土に<u>埋まっ</u>た状態で発見された。",
        "english_translation": "A tragic incident occurred when five people, men and women, met with disaster while hiking and were attacked by a bear, which killed them all. Two of the five were found buried in the ground.",
        "words": [
            {"id": "2421", "k": "遭難[する]", "f": "そうなん", "e": "distress, meet with disaster"},
            {"id": "2422", "k": "痛ましい", "f": "いたましい", "e": "tragic"},
            {"id": "2423", "k": "埋まる", "f": "うまる", "e": "be buried"}
        ]
    },
    {
        "file": "335_1.json",
        "story_number": 12,
        "japanese_text": "<u>検事</u>とは、<u>検察官</u>という職業の中の、役職の一つだ。検察官は法律に違反した犯罪や事件の調査、<u>ならびに</u>、犯人を裁判にかける<u>起訴</u>を担う。場合によっては警察と協力のもとでの<u>捜査</u>も行う。日本では基本的に検察官だけが犯人を起訴することができる。",
        "english_translation": "\"Prosecutor\" is a particular job within the broader occupation of public prosecutor. Public prosecutors are responsible for investigating crimes and incidents that violate the law, as well as prosecuting offenders to bring them to justice. In some cases, they also conduct investigations in cooperation with the police. In Japan, public prosecutors are basically the only ones who can prosecute criminals.",
        "words": [
            {"id": "2424", "k": "検事", "f": "けんじ", "e": "prosecutor"},
            {"id": "2425", "k": "検察官", "f": "けんさつかん", "e": "public prosecutor"},
            {"id": "2426", "k": "ならびに", "f": "", "e": "as well as"},
            {"id": "2427", "k": "起訴[する]", "f": "きそ", "e": "prosecution, prosecute"},
            {"id": "2428", "k": "捜査[する]", "f": "そうさ", "e": "investigation, investigate"}
        ]
    },
    {
        "file": "336_1.json",
        "story_number": 13,
        "japanese_text": "警察によるスピード違反の<u>取り締まり</u>中、運転手が運転免許証を<u>所持して</u>おらず、そのまま車で<u>逃亡しよう</u>とした。",
        "english_translation": "During a police crackdown on speeding, a driver who did not possess a driver's license and attempted to flee in his car.",
        "words": [
            {"id": "2429", "k": "取り締まり", "f": "とりしまり", "e": "crackdown"},
            {"id": "2430", "k": "取り締まる", "f": "とりしまる", "e": "crack down"},
            {"id": "2431", "k": "所持[する]", "f": "しょじ", "e": "possession, possess"},
            {"id": "2432", "k": "逃亡[する]", "f": "とうぼう", "e": "escape, flee"}
        ]
    },
    {
        "file": "336_2.json",
        "story_number": 14,
        "japanese_text": "この保険が<u>適用される</u>ためには<u>所定</u>の書類に必要<u>事項</u>を記入のうえ、保険会社へ申請することが求められる。",
        "english_translation": "To be covered by this insurance, you need to fill out the necessary items on the prescribed form, then apply to the insurance company.",
        "words": [
            {"id": "2433", "k": "適用[する]", "f": "てきよう", "e": "application, cover"},
            {"id": "2434", "k": "所定", "f": "しょてい", "e": "prescribed (something)"},
            {"id": "2435", "k": "事項", "f": "じこう", "e": "item, point"}
        ]
    },
    {
        "file": "336_3.json",
        "story_number": 15,
        "japanese_text": "<u>死刑</u>は、人が人を<u>裁く</u>中で最も重い<u>刑</u>であり、その<u>善悪</u>を巡ってはさまざまな議論を<u>引き起こし</u>ている。<u>凶悪な</u>犯人に対しての死刑は<u>正当な</u>意見もあれば、犯人には、被害者や残された者のために、生きて罪を<u>償わ</u>せるべきだという意見もある。",
        "english_translation": "The death penalty is the most serious punishment a person can be sentenced to, and has provoked much debate over whether it is right or wrong. Some believe that the death penalty is justified for heinous criminals, while others believe that criminals should live to pay for their crimes for the sake of their victims and those left behind.",
        "words": [
            {"id": "2436", "k": "死刑", "f": "しけい", "e": "death penalty"},
            {"id": "2437", "k": "裁く", "f": "さばく", "e": "judge, sentence"},
            {"id": "2438", "k": "刑", "f": "けい", "e": "punishment"},
            {"id": "2439", "k": "善悪", "f": "ぜんあく", "e": "right or wrong"},
            {"id": "2440", "k": "引き起こす", "f": "ひきおこす", "e": "provoke, trigger"},
            {"id": "2441", "k": "凶悪な", "f": "きょうあくな", "e": "heinous"},
            {"id": "2442", "k": "正当な", "f": "せいとうな", "e": "just, justified"},
            {"id": "2443", "k": "償う", "f": "つぐなう", "e": "atone, make amends"}
        ]
    }
]

out_dir = r"D:\sudip_software\nihongo_playground\src\data\tango_n1_raw"

for d in data:
    filepath = os.path.join(out_dir, d["file"])
    out = {
        "is_story": True,
        "story_number": d["story_number"],
        "title": "Topic 25",
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

print("Done generating JSONs.")
