# scripts/enrich_tango_and_skm.py
import json
import os
import re

TEMPLATES = [
    ("明日[あした]から 毎日[まいにち]、{w}を 続[つづ]けるつもりです。", "From tomorrow, I plan to continue doing {en} every day."),
    ("彼[かれ]は{w}についてとても 詳[くわ]しいです。", "He is very knowledgeable about {en}."),
    ("この 問題[もんだい]について、{w}の 視点[してん]から 考[かんが]えてみましょう。", "Let's think about this problem from the perspective of {en}."),
    ("最近[さいきん]は{w}の 重要性[じゅうようせい]がますます 高[たか]まっています。", "Recently, the importance of {en} has been increasing more and more."),
    ("先生[せんせい]は{w}の 使[つか]い 方[かた]を 分[わ]かりやすく 教[おし]えてくれた。", "The teacher clearly taught us how to use {en}."),
    ("私[わたし]たちは{w}について 話[はな]し 合[あ]いました。", "We discussed {en} together."),
    ("彼女[かのじょ]は{w}をとても 大切[たいせつ]にしています。", "She values {en} very much."),
    ("初[はじ]めて{w}を 経験[けいけん]した 時[とき]、とても 驚[おどろ]きました。", "When I first experienced {en}, I was very surprised."),
    ("日常生活[にちじょうせいかつ]で{w}を 意識[いしき]することは 大切[たいせつ]です。", "It is important to be conscious of {en} in daily life."),
    ("準備[じゅんび]をしっかりして、{w}に 備[そな]えましょう。", "Let's prepare thoroughly and be ready for {en}.")
]

VERB_TEMPLATES = [
    ("週末[しゅうまつ]は 家[いえ]でゆっくり{w}ことにしています。", "On weekends, I make it a rule to relax at home and {en}."),
    ("上手[じょうず]に{w}ためには、 毎日[まいにち]の 練習[れんしゅう]が 欠[か]かせません。", "To {en} well, daily practice is essential."),
    ("彼[かれ]はいつも 一生懸命[いっしょうけんめい]に{w} 姿[すがた]が 印象的[いんしょうてき]です。", "His attitude of always diligently trying to {en} is impressive."),
    ("みんなで 協力[きょうりょく]して{w}ことができました。", "We were able to cooperate together and {en}."),
    ("もっと 上手[じょうず]に{w}ようになりたいです。", "I want to become able to {en} better.")
]

ADJ_TEMPLATES = [
    ("この 部屋[へや]はとても{w}ので、 勉強[べんきょう]に 集中[しゅうちゅう]できます。", "This room is very {en}, so I can concentrate on studying."),
    ("そんなに{w} 状況[じょうきょう]でも、 彼[かれ]は 決[けっ]して 諦[あきら]めなかった。", "Even in such a {en} situation, he never gave up."),
    ("いつもより{w}と 感[かん]じたら、 無理[むり]をせず 休[やす]みましょう。", "If you feel more {en} than usual, rest without overdoing it."),
    ("彼[かれ]の{w} 態度[たいど]が 周[まわ]りの 人[ひと]を 安心[あんしん]させた。", "His {en} attitude made the people around him feel at ease.")
]

def get_furigana_word(expr, reading):
    clean_expr = expr.strip() if expr else ""
    clean_reading = reading.strip() if reading else ""

    if not clean_expr:
        return clean_reading

    # If reading has bracket markup already (e.g. 改札口[かいさつぐち] or 相[あい] 手[て])
    if "[" in clean_reading and "]" in clean_reading:
        return clean_reading

    # Check if expression contains Kanji
    has_kanji = bool(re.search(r'[\u4e00-\u9faf々ヶ]', clean_expr))
    if not has_kanji:
        return clean_expr

    # If reading is kana
    if clean_reading and re.search(r'^[\u3040-\u309f\u30a0-\u30ff]+$', clean_reading):
        # Check okurigana match like 食べる -> たべる
        m = re.match(r'^([\u4e00-\u9faf々ヶ]+)([\u3040-\u309f\u30a0-\u30ff]+)$', clean_expr)
        if m:
            k_part, s_part = m.group(1), m.group(2)
            if clean_reading.endswith(s_part) and len(clean_reading) > len(s_part):
                k_reading = clean_reading[:-len(s_part)]
                return f"{k_part}[{k_reading}]{s_part}"
        return f"{clean_expr}[{clean_reading}]"

    return clean_expr

def make_sentence(word_expr, word_reading, word_meaning, index, offset=0):
    clean_w = word_expr.strip()
    furigana_w = get_furigana_word(clean_w, word_reading)
    
    clean_def = word_meaning.split(';')[0].split(',')[0].strip() if word_meaning else "this"
    if clean_def.startswith("to "):
        clean_def = clean_def[3:]

    is_verb = clean_w.endswith(('う', 'く', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る', 'する'))
    is_i_adj = clean_w.endswith('い') and not is_verb
    is_na_adj = clean_w.endswith('な')

    if is_verb and len(clean_w) > 1:
        tpl_ja, tpl_en = VERB_TEMPLATES[(index + offset) % len(VERB_TEMPLATES)]
    elif is_i_adj or is_na_adj:
        tpl_ja, tpl_en = ADJ_TEMPLATES[(index + offset) % len(ADJ_TEMPLATES)]
    else:
        tpl_ja, tpl_en = TEMPLATES[(index + offset) % len(TEMPLATES)]

    ja = tpl_ja.replace("{w}", furigana_w)
    en = tpl_en.replace("{en}", clean_def)
    return ja, en

def process_file(filepath):
    if not os.path.exists(filepath):
        print("File not found:", filepath)
        return

    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    cards = data.get("cards", [])
    for idx, card in enumerate(cards):
        expr = card.get("expression") or card.get("vocabKanji") or card.get("word") or ""
        reading = card.get("reading") or card.get("vocabFurigana") or card.get("wordReading") or ""
        meaning = card.get("vocabMeaning") or card.get("meaning") or card.get("vocabDef") or ""

        # Ensure first sentence exists & has furigana
        if not card.get("sentence") and not card.get("sentKanji"):
            s1_ja, s1_en = make_sentence(expr, reading, meaning, idx, offset=0)
            card["sentence"] = s1_ja
            card["sentenceMeaning"] = s1_en

        # Ensure second sentence exists with proper furigana
        s2_ja, s2_en = make_sentence(expr, reading, meaning, idx, offset=1)
        card["sentence2"] = s2_ja
        card["sentenceMeaning2"] = s2_en

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Enriched {len(cards)} cards with full furigana in {os.path.basename(filepath)}")

if __name__ == "__main__":
    tango_file = r"D:\sudip_software\nihongo_playground\public\anki_decks\deck_data.json"
    skm_file = r"D:\sudip_software\nihongo_playground\public\anki_decks\shin_kanzen_n3_vocab_data.json"
    process_file(tango_file)
    process_file(skm_file)
