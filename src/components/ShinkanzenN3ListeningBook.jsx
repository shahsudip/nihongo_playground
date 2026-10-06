import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { getDownloadURL, ref } from 'firebase/storage';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/shinkanzen_book.css';
import { functions, storage } from '../firebaseConfig.js';
import { useAuth } from '../context/AuthContext';

// Eagerly load all local Shinkanzen Listening JSON files
const localChapterModules = import.meta.glob('../data/shinkanzen_listening/*.json', { eager: true });

export const SHINKANZEN_N3_LISTENING_CHAPTERS = Object.keys(localChapterModules)
  .map(filePath => {
    const data = localChapterModules[filePath].default || localChapterModules[filePath];
    return {
      id: data.chapterId,
      part: data.part,
      title: `${data.title} ${data.partTitleEn ? `(${data.partTitleEn})` : ''}`,
      rawTitle: data.title,
      mondaiNumber: data.mondaiNumber,
      order: data.order ?? data.mondaiNumber,
    };
  })
  .sort((a, b) => {
    if (a.part !== b.part) return a.part - b.part;
    return (a.order ?? a.mondaiNumber) - (b.order ?? b.mondaiNumber);
  });

const PART_TITLES = {
  1: '第1部：問題紹介',
  2: '第2部：実力養成編',
};

const MONDAI_NAMES = {
  'mondai-1': '第1問：課題理解 (Task-Based)',
  'mondai-2': '第2問：ポイント理解 (Key Points)',
  'mondai-3': '第3問：概要理解 (General Outline)',
  'mondai-4': '第4問：発話表現 (Utterance Expressions)',
  'mondai-5': '第5問：即時応答 (Quick Response)',
  'skill-1': '第1単元：Ⅰ 音声の特徴に慣れる (Speech Characteristics)',
  'skill-2': '第2単元：Ⅱ 「発話表現」のスキルを学ぶ (Utterance Expressions)',
  'skill-3': '第3単元：Ⅲ 「即時応答」のスキルを学ぶ (Immediate Response)',
  'skill-4': '第4単元：Ⅳ 「課題理解」のスキルを学ぶ (Task Comprehension)',
  'skill-5': '第5単元：Ⅴ 「ポイント理解」のスキルを学ぶ (Point Comprehension)',
  'skill-6': '第6単元：Ⅵ 「概要理解」のスキルを学ぶ (General Comprehension)',
};

/**
 * Curated Textbook Guidance & Notice Boxes matching the original Shin Kanzen Master PDF
 */
const SKILL_SECTION_NOTICES = {
  // Unit 1 (skill-1) - Speech Characteristics (音声の特徴)
  '練習1-A 間違えやすい音': {
    code: '1-A',
    title: '<ruby>間違<rt>まちが</rt></ruby>えやすい<ruby>音<rt>おと</rt></ruby>',
    descJp: '「゛」や<ruby>小<rt>ちい</rt></ruby>さい「っ」「ゃ／ゅ／ょ」で<ruby>表<rt>あらわ</rt></ruby>す<ruby>音<rt>おと</rt></ruby>、「ん」や<ruby>長音<rt>ちょうおん</rt></ruby>（えいご／ノート）など、<ruby>間違<rt>まちが</rt></ruby>えやすい<ruby>音<rt>おと</rt></ruby>に<ruby>気<rt>き</rt></ruby>をつけて<ruby>聞<rt>き</rt></ruby>きましょう。',
    descEn: 'Be sure to listen carefully for misunderstood sounds expressed by raised 「゛」 and small 「っ」 and 「ゃ／ゅ／ょ」 and 「ん」 and the long sounds in 「えいご／ノート」.'
  },
  '練習1-B アクセントやイントネーション': {
    code: '1-B',
    title: 'アクセントやイントネーション',
    descJp: 'アクセントの違いによって意味が変わる言葉や、文末のイントネーションの違いに注意して聞きましょう。',
    descEn: 'Pay attention to words whose meaning changes depending on pitch accent, and listen carefully to sentence-ending intonations.'
  },
  '練習1-C 似ている数字': {
    code: '1-C',
    title: '似ている数字',
    descJp: '似ている数字（４と７、１と８など）や単位、数え方の表現に注意して聞き分けましょう。',
    descEn: 'Listen carefully to distinguish similar numbers (such as 4 and 7, 1 and 8), units, and counters.'
  },
  '練習2-1 音の変化': {
    code: '2-1',
    title: '音の変化（縮約形）',
    descJp: '話し言葉でよく使われる音の変化（「～ちゃう」「～なくちゃ」「～てる」など）に慣れましょう。',
    descEn: 'Get accustomed to sound changes and colloquial contractions commonly heard in casual speech.'
  },
  '練習2-2 音の変化': {
    code: '2-2',
    title: '音の変化（文末の形）',
    descJp: '縮約された文末表現を聞いて、元の形（完全な文法表現）を理解できるように練習しましょう。',
    descEn: 'Practice recognizing the original grammatical form behind contracted conversational endings.'
  },
  '例題3 音の高さや長さ': {
    code: '3-例',
    title: '音の高さや長さ（イントネーション）',
    descJp: '文末のイントネーションが上がるか下がるかで、話し手が同意しているのか断っているのかを判断しましょう。',
    descEn: 'Determine whether the speaker agrees or declines based on rising or falling intonation at the end of the sentence.'
  },
  '練習3 音の高さや長さに注意する': {
    code: '3',
    title: '音の高さや長さに注意する',
    descJp: '短い返事や相槌のイントネーションの違いを聞き分けて、肯定・否定のニュアンスを掴みましょう。',
    descEn: 'Listen carefully to the intonation of short responses and backchanneling to catch affirmative or negative nuances.'
  },
  // Unit 2 (skill-2) - Utterance Expressions (発話表現)
  '練習1 状況説明文を聞き分ける': {
    code: '1',
    title: '<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>き<ruby>分<rt>わ</rt></ruby>ける',
    descJp: '<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、<ruby>発話<rt>はつわ</rt></ruby>の<ruby>状況<rt>じょうきょう</rt></ruby>や<ruby>場面<rt>ばめん</rt></ruby>を<ruby>理解<rt>りかい</rt></ruby>します。<ruby>話<rt>はな</rt></ruby>す<ruby>人<rt>ひと</rt></ruby>（→の<ruby>人<rt>ひと</rt></ruby>）と<ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>のどちらが<ruby>動作<rt>どうさ</rt></ruby>をする<ruby>状況<rt>じょうきょう</rt></ruby>なのかを<ruby>考<rt>かんが</rt></ruby>えることが<ruby>大切<rt>たいせつ</rt></ruby>です。',
    descEn: 'The point here is to listen to the explanation of the situational context and to comprehend the circumstances and situations of the utterance. It is important to consider what the situation is in which the speaker (person marked with an arrow) and the listener are acting.',
    tableHtml: `
<div class="mt-4">
  <div class="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2 font-serif flex items-center gap-2">
    <span>◇ <ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>の<ruby>例<rt>れい</rt></ruby></span>
    <span class="text-xs text-stone-500 font-sans font-normal">(Examples of Situational Context)</span>
  </div>
  <div class="shinkanzen-example-grid font-serif">
    <div class="shinkanzen-example-card">
      <div class="shinkanzen-example-card-header text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
        <span class="shinkanzen-table-pill speaker">【話す人がする】</span>
        <span class="text-[11px] text-stone-500 italic font-sans">Speaker takes action</span>
      </div>
      <div class="space-y-2 mt-2">
        <div class="shinkanzen-example-item">
          <div class="text-slate-800 dark:text-slate-200">
            <span class="font-bold text-stone-400 mr-1.5 font-sans">例1</span>
            <ruby>友達<rt>ともだち</rt></ruby>の<ruby>消<rt>け</rt></ruby>しゴムを<ruby>使<rt>つか</rt></ruby>いたいです。
          </div>
          <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 pl-6">
            （<ruby>話<rt>はな</rt></ruby>す<ruby>人<rt>ひと</rt></ruby>が<ruby>使<rt>つか</rt></ruby>う）
          </div>
        </div>
        <div class="shinkanzen-example-item">
          <div class="text-slate-800 dark:text-slate-200">
            <span class="font-bold text-stone-400 mr-1.5 font-sans">例2</span>
            <ruby>友達<rt>ともだち</rt></ruby>が<ruby>疲<rt>つか</rt></ruby>れたので、<ruby>運転<rt>うんてん</rt></ruby>を<ruby>代<rt>か</rt></ruby>わってあげます。
          </div>
          <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 pl-6">
            （<ruby>話<rt>はな</rt></ruby>す<ruby>人<rt>ひと</rt></ruby>が<ruby>運転<rt>うんてん</rt></ruby>する）
          </div>
        </div>
      </div>
    </div>

    <div class="shinkanzen-example-card">
      <div class="shinkanzen-example-card-header text-blue-700 dark:text-blue-400 flex items-center justify-between">
        <span class="shinkanzen-table-pill listener">【聞く人がする】</span>
        <span class="text-[11px] text-stone-500 italic font-sans">Listener takes action</span>
      </div>
      <div class="space-y-2 mt-2">
        <div class="shinkanzen-example-item">
          <div class="text-slate-800 dark:text-slate-200">
            <span class="font-bold text-stone-400 mr-1.5 font-sans">例3</span>
            <ruby>友達<rt>ともだち</rt></ruby>に<ruby>自転車<rt>じてんしゃ</rt></ruby>を<ruby>貸<rt>か</rt></ruby>してもらいます。
          </div>
          <div class="text-xs font-bold text-blue-600 dark:text-blue-400 pl-6">
            （<ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>が<ruby>貸<rt>か</rt></ruby>す）
          </div>
        </div>
        <div class="shinkanzen-example-item">
          <div class="text-slate-800 dark:text-slate-200">
            <span class="font-bold text-stone-400 mr-1.5 font-sans">例4</span>
            <ruby>先生<rt>せんせい</rt></ruby>に<ruby>作文<rt>さくぶん</rt></ruby>の<ruby>間違<rt>まちが</rt></ruby>いを<ruby>直<rt>なお</rt></ruby>してほしいです。
          </div>
          <div class="text-xs font-bold text-blue-600 dark:text-blue-400 pl-6">
            （<ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>が<ruby>直<rt>なお</rt></ruby>す）
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  '練習2-A 許可や依頼の表現': {
    code: '2-A',
    title: '2 <ruby>許可<rt>きょか</rt></ruby>や<ruby>依頼<rt>いらい</rt></ruby>の<ruby>発話<rt>はつわ</rt></ruby>を<ruby>聞<rt>き</rt></ruby>き<ruby>分<rt>わ</rt></ruby>ける：<ruby>許可<rt>きょか</rt></ruby>や<ruby>依頼<rt>いらい</rt></ruby>の<ruby>表現<rt>ひょうげん</rt></ruby>',
    descJp: '<ruby>発話<rt>はつわ</rt></ruby>の<ruby>選択肢<rt>せんたくし</rt></ruby>にある<ruby>表現<rt>ひょうげん</rt></ruby>が、<ruby>話<rt>はな</rt></ruby>す<ruby>人<rt>ひと</rt></ruby>がするときの<ruby>表現<rt>ひょうげん</rt></ruby>か<ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>がするときの<ruby>表現<rt>ひょうげん</rt></ruby>かに<ruby>注意<rt>ちゅうい</rt></ruby>します。まず<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>で、<ruby>話<rt>はな</rt></ruby>す<ruby>人<rt>ひと</rt></ruby>がする<ruby>状況<rt>じょうきょう</rt></ruby>か<ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>がする<ruby>状況<rt>じょうきょう</rt></ruby>かを<ruby>理解<rt>りかい</rt></ruby>した<ruby>後<rt>あと</rt></ruby>、それと<ruby>合<rt>あ</rt></ruby>う<ruby>発話<rt>はつわ</rt></ruby>を<ruby>選<rt>えら</rt></ruby>びます。（<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>ではどちらがするか<ruby>言<rt>い</rt></ruby>わない<ruby>場合<rt>ばあい</rt></ruby>もあります。）',
    descEn: 'The point here is to focus attention on whether the expression given in the choices of the utterances is the expression made by the speaker or the expression made by the listener. The selection of the utterance best suited to the situation is made after it has first been understood from the explanation of the situational context whether the situation is one brought about by the speaker or one brought about by the listener.',
    tableHtml: `
<div class="mt-4 space-y-4">
  <div>
    <div class="flex items-center gap-2 mb-1.5">
      <span class="shinkanzen-table-pill speaker font-bold">【話す人がするとき】</span>
      <span class="text-xs text-stone-500 italic font-sans">Expressions when the speaker performs the action</span>
    </div>
    <div class="shinkanzen-textbook-table-wrapper">
      <table class="shinkanzen-textbook-table">
        <thead>
          <tr>
            <th class="w-1/3 sm:w-1/4">意図・機能</th>
            <th>表現の形式・パターン</th>
          </tr>
        </thead>
        <tbody class="font-serif">
          <tr>
            <td>
              <div class="font-bold text-slate-900 dark:text-slate-100"><ruby>許可<rt>きょか</rt></ruby>を<ruby>求<rt>もと</rt></ruby>める</div>
              <div class="text-[11px] text-stone-500 italic font-sans mt-0.5">Asking permission</div>
            </td>
            <td class="space-y-1">
              <div>・<b>〜ても ＋ いい？／いいですか／いいでしょうか／よろしいでしょうか</b></div>
              <div>・<b>〜させて ＋ もらえる？／もらえませんか／いただきたいんですが／くれる？／くれませんか／ください／くださいませんか／ほしいんだけど</b></div>
              <div>・<b>〜たいんですが／〜たいんですけど</b></div>
              <div class="text-stone-600 dark:text-stone-300 text-xs pt-1 border-t border-dashed border-stone-200 dark:border-stone-700/60 mt-1">
                <span class="text-stone-400 font-sans">（使いたい）</span> ○○、ありますか／使えますか（可能の形＋か）<br/>
                <span class="text-stone-400 font-sans">（座りたい）</span> ここ、いいですか／空いていますか／だれかいますか
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="font-bold text-slate-900 dark:text-slate-100"><ruby>方法<rt>ほうほう</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く</div>
              <div class="text-[11px] text-stone-500 italic font-sans mt-0.5">Asking how to do something</div>
            </td>
            <td class="space-y-1">
              <div>・<b>どう ＋ 〜ばいいでしょうか</b></div>
              <div>・<b>どう ＋ 〜たらいいですか</b></div>
              <div>・<b>〜方がわからないんですが／〜がわからないんですけど</b></div>
              <div>・<b>〜たいんですが／〜たいんですけど</b></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div>
    <div class="flex items-center gap-2 mb-1.5">
      <span class="shinkanzen-table-pill listener font-bold">【聞く人がするとき】</span>
      <span class="text-xs text-stone-500 italic font-sans">Expressions when the listener performs the action</span>
    </div>
    <div class="shinkanzen-textbook-table-wrapper">
      <table class="shinkanzen-textbook-table">
        <thead>
          <tr>
            <th class="w-1/3 sm:w-1/4">意図・機能</th>
            <th>表現の形式・パターン</th>
          </tr>
        </thead>
        <tbody class="font-serif">
          <tr>
            <td>
              <div class="font-bold text-slate-900 dark:text-slate-100">お<ruby>願<rt>ねが</rt></ruby>いする</div>
              <div class="text-[11px] text-stone-500 italic font-sans mt-0.5">Asking for a favor</div>
            </td>
            <td class="space-y-1">
              <div>・<b>〜て ＋ もらえる？／もらえませんか／いただきたいんですが／くれる？／くれませんか／ください／くださいませんか／ほしいんだけど</b></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`
  },
  '練習2-B 注意するべき動詞': {
    code: '2-B',
    title: '<ruby>注意<rt>ちゅうい</rt></ruby>するべき<ruby>動詞<rt>どうし</rt></ruby>（<ruby>視点<rt>してん</rt></ruby>による<ruby>動詞<rt>どうし</rt></ruby>の<ruby>使<rt>つか</rt></ruby>い<ruby>分<rt>わ</rt></ruby>け）',
    descJp: '<ruby>同<rt>おな</rt></ruby>じ<ruby>場面<rt>ばめん</rt></ruby>で<ruby>違<rt>ちが</rt></ruby>う<ruby>動詞<rt>どうし</rt></ruby>を<ruby>使<rt>つか</rt></ruby>うことがあります。<ruby>話<rt>はな</rt></ruby>す<ruby>人<rt>ひと</rt></ruby>の<ruby>動作<rt>どうさ</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>す<ruby>動詞<rt>どうし</rt></ruby>を<ruby>使<rt>つか</rt></ruby>うとき（<ruby>例<rt>れい</rt></ruby>：<ruby>借<rt>か</rt></ruby>りる）と、<ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>の<ruby>動作<rt>どうさ</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>す<ruby>動詞<rt>どうし</rt></ruby>を<ruby>使<rt>つか</rt></ruby>うとき（<ruby>例<rt>れい</rt></ruby>：<ruby>貸<rt>か</rt></ruby>す）では、<ruby>後<rt>うし</rt></ruby>ろに<ruby>続<rt>つづ</rt></ruby>く<ruby>表現<rt>ひょうげん</rt></ruby>が<ruby>違<rt>ちが</rt></ruby>うので<ruby>注意<rt>ちゅうい</rt></ruby>します。',
    descEn: 'Different verbs may be used in the same situation. It should be noted that when a verb expressing the action of the speaker (e.g., 借りる to borrow) is used, the expression that follows afterwards will be different from when a verb is used expressing the action of the listener (e.g., 貸す to lend).',
    diagramSrc: '/images/shinkanzen_listening/skill-2/section2b_verbs.png',
    diagramCaption: '本、借りてもいい？（借りる：話す人の動作） ← ── → 本、貸してもらえない？（貸す：聞く人の動作）',
    tableHtml: `
<div class="mt-4">
  <div class="shinkanzen-textbook-table-wrapper">
    <table class="shinkanzen-textbook-table">
      <thead>
        <tr>
          <th class="w-1/4 sm:w-1/5"><ruby>動詞<rt>どうし</rt></ruby></th>
          <th><ruby>例文<rt>れいぶん</rt></ruby>（話す人の動作 vs 聞く人の動作）</th>
        </tr>
      </thead>
      <tbody class="font-serif">
        <tr>
          <td>
            <div class="font-bold text-slate-900 dark:text-slate-100"><ruby>借<rt>か</rt></ruby>りる</div>
            <div class="font-bold text-slate-900 dark:text-slate-100 mt-1.5"><ruby>貸<rt>か</rt></ruby>す</div>
          </td>
          <td class="space-y-1.5">
            <div>
              <span class="shinkanzen-table-pill speaker mr-2">【話す人の動作】</span>
              <b><ruby>借<rt>か</rt></ruby>りてもよろしいですか。</b>
            </div>
            <div>
              <span class="shinkanzen-table-pill listener mr-2">【聞く人の動作】</span>
              <b><ruby>貸<rt>か</rt></ruby>していただけませんか。</b>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="font-bold text-slate-900 dark:text-slate-100"><ruby>見<rt>み</rt></ruby>る</div>
            <div class="font-bold text-slate-900 dark:text-slate-100 mt-1.5"><ruby>見<rt>み</rt></ruby>せる</div>
          </td>
          <td class="space-y-1.5">
            <div>
              <span class="shinkanzen-table-pill speaker mr-2">【話す人の動作】</span>
              <b><ruby>見<rt>み</rt></ruby>てもいい？</b>
            </div>
            <div>
              <span class="shinkanzen-table-pill listener mr-2">【聞く人の動作】</span>
              <b><ruby>見<rt>み</rt></ruby>せてよ。</b>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="font-bold text-slate-900 dark:text-slate-100"><ruby>聞<rt>き</rt></ruby>く</div>
            <div class="font-bold text-slate-900 dark:text-slate-100 mt-1.5"><ruby>教<rt>おし</rt></ruby>える</div>
          </td>
          <td class="space-y-1.5">
            <div>
              <span class="shinkanzen-table-pill speaker mr-2">【話す人の動作】</span>
              <b>お<ruby>聞<rt>き</rt></ruby>きしたいんですが。</b>
            </div>
            <div>
              <span class="shinkanzen-table-pill listener mr-2">【聞く人の動作】</span>
              <b><ruby>教<rt>おし</rt></ruby>えていただきたいんですが。</b>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="font-bold text-slate-900 dark:text-slate-100">もらう／いただく</div>
            <div class="font-bold text-slate-900 dark:text-slate-100 mt-1.5">くれる／くださる</div>
          </td>
          <td class="space-y-1.5">
            <div>
              <span class="shinkanzen-table-pill speaker mr-2">【話す人の動作】</span>
              <b>もらってもいいでしょうか。</b>
            </div>
            <div>
              <span class="shinkanzen-table-pill listener mr-2">【聞く人の動作】</span>
              <b>くださいませんか。</b>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="font-bold text-slate-900 dark:text-slate-100"><ruby>預<rt>あず</rt></ruby>ける</div>
            <div class="font-bold text-slate-900 dark:text-slate-100 mt-1.5"><ruby>預<rt>あず</rt></ruby>かる</div>
          </td>
          <td class="space-y-1.5">
            <div>
              <span class="shinkanzen-table-pill speaker mr-2">【話す人の動作】</span>
              <b><ruby>荷物<rt>にもつ</rt></ruby>、<ruby>預<rt>あず</rt></ruby>けたいんですけど。</b>
            </div>
            <div>
              <span class="shinkanzen-table-pill listener mr-2">【聞く人の動作】</span>
              <b><ruby>荷物<rt>にもつ</rt></ruby>、<ruby>預<rt>あず</rt></ruby>かっていただけませんか。</b>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`
  },
  '練習3 問題を知らせる・助けを申し出る': {
    code: '3',
    title: '3 <ruby>問題<rt>もんだい</rt></ruby>を<ruby>知<rt>し</rt></ruby>らせる・<ruby>助<rt>たす</rt></ruby>けを<ruby>申<rt>もう</rt></ruby>し<ruby>出<rt>で</rt></ruby>る<ruby>表現<rt>ひょうげん</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>する',
    descJp: '<ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>に<ruby>何<rt>なに</rt></ruby>か<ruby>問題<rt>もんだい</rt></ruby>を<ruby>知<rt>し</rt></ruby>らせたり、<ruby>自分<rt>じぶん</rt></ruby>から<ruby>助<rt>たす</rt></ruby>けを<ruby>申<rt>もう</rt></ruby>し<ruby>出<rt>で</rt></ruby>たりする<ruby>状況<rt>じょうきょう</rt></ruby>では、<ruby>次<rt>つぎ</rt></ruby>のような<ruby>表現<rt>ひょうげん</rt></ruby>が<ruby>使<rt>つか</rt></ruby>われます。',
    descEn: 'The following expressions are used in situations in which some problem is made known to the listener or in which help is offered by the speaker.',
    tableHtml: `
<div class="mt-4">
  <div class="shinkanzen-textbook-table-wrapper">
    <table class="shinkanzen-textbook-table">
      <thead>
        <tr>
          <th class="w-1/2"><ruby>状況<rt>じょうきょう</rt></ruby>と<ruby>表現<rt>ひょうげん</rt></ruby></th>
          <th class="w-1/2"><ruby>発話例<rt>はつわれい</rt></ruby></th>
        </tr>
      </thead>
      <tbody class="font-serif">
        <tr>
          <td>
            <div class="font-bold text-slate-900 dark:text-slate-100">
              <ruby>話<rt>はな</rt></ruby>す<ruby>人<rt>ひと</rt></ruby>に<ruby>関係<rt>かんけい</rt></ruby>する<ruby>問題<rt>もんだい</rt></ruby>を<ruby>知<rt>し</rt></ruby>らせて、<ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>に<ruby>助<rt>たす</rt></ruby>けを<ruby>求<rt>もと</rt></ruby>める：
            </div>
            <div class="text-[11px] text-stone-500 italic font-sans mt-0.5">Making known a problem involving the speaker and asking for help from the listener</div>
            <div class="mt-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2.5 py-1 rounded inline-block">
              〜んですが／〜んですけど
            </div>
          </td>
          <td class="space-y-1">
            <div>・<ruby>忘<rt>わす</rt></ruby>れ<ruby>物<rt>もの</rt></ruby>をしたんですが。</div>
            <div>・エアコンが<ruby>動<rt>うご</rt></ruby>かないんですが。</div>
            <div>・いすが<ruby>壊<rt>こわ</rt></ruby>れているんですけど。</div>
            <div>・<ruby>電気<rt>でんき</rt></ruby>がつかないんですけど。</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="font-bold text-slate-900 dark:text-slate-100">
              <ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>に<ruby>関係<rt>かんけい</rt></ruby>する<ruby>問題<rt>もんだい</rt></ruby>を<ruby>知<rt>し</rt></ruby>らせる：
            </div>
            <div class="text-[11px] text-stone-500 italic font-sans mt-0.5">Making known a problem involving the listener</div>
            <div class="mt-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2.5 py-1 rounded inline-block">
              〜よ、〜ていますよ／〜てるよ
            </div>
          </td>
          <td class="space-y-1">
            <div>・ハンカチ、<ruby>落<rt>お</rt></ruby>ちましたよ。</div>
            <div>・かさ、<ruby>忘<rt>わす</rt></ruby>れていますよ。</div>
            <div>・かばんが<ruby>開<rt>あ</rt></ruby>いていますよ。</div>
            <div>・<ruby>服<rt>ふく</rt></ruby>に<ruby>何<rt>なに</rt></ruby>か<ruby>付<rt>つ</rt></ruby>いてるよ。</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="font-bold text-slate-900 dark:text-slate-100">
              <ruby>聞<rt>き</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>に<ruby>助<rt>たす</rt></ruby>けを<ruby>申<rt>もう</rt></ruby>し<ruby>出<rt>で</rt></ruby>る：
            </div>
            <div class="text-[11px] text-stone-500 italic font-sans mt-0.5">Offering of help to the listener</div>
            <div class="mt-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2.5 py-1 rounded inline-block">
              〜ましょうか／〜ようか、〜ますね／〜ますよ
            </div>
          </td>
          <td class="space-y-1">
            <div>・<ruby>手伝<rt>てつだ</rt></ruby>いましょうか。</div>
            <div>・<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>運<rt>はこ</rt></ruby>ぼうか。</div>
            <div>・これ、<ruby>持<rt>も</rt></ruby>っていきますね。</div>
            <div>・<ruby>片付<rt>かたづ</rt></ruby>け、<ruby>一緒<rt>いっしょ</rt></ruby>にやりますよ。</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`
  },
  '練習4 あいさつ表現に注意する': {
    code: '4',
    title: '4 あいさつ<ruby>表現<rt>ひょうげん</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>する',
    descJp: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>職場<rt>しょくば</rt></ruby>や<ruby>日常生活<rt>にちじょうせいかつ</rt></ruby>における、<ruby>場面<rt>ばめん</rt></ruby>や<ruby>相手<rt>あいて</rt></ruby>に<ruby>合<rt>あ</rt></ruby>わせた<ruby>決<rt>き</rt></ruby>まり<ruby>文句<rt>もんく</rt></ruby>の<ruby>挨拶表現<rt>あいさつひょうげん</rt></ruby>です。<ruby>状況<rt>じょうきょう</rt></ruby>にふさわしい<ruby>言<rt>い</rt></ruby>い<ruby>方<rt>かた</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>しましょう。',
    descEn: 'Master customary greeting expressions suited to specific workplace and daily-life situations in Japan.',
    tableHtml: `
<div class="mt-4">
  <div class="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2 font-serif">
    ＜<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>と<ruby>表現<rt>ひょうげん</rt></ruby>＞
  </div>
  <div class="shinkanzen-textbook-table-wrapper">
    <table class="shinkanzen-textbook-table">
      <thead>
        <tr>
          <th class="w-1/2 sm:w-7/12"><ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>の<ruby>例<rt>れい</rt></ruby></th>
          <th class="w-1/2 sm:w-5/12"><ruby>表現<rt>ひょうげん</rt></ruby>の<ruby>例<rt>れい</rt></ruby></th>
        </tr>
      </thead>
      <tbody class="font-serif">
        <tr>
          <td>1. <ruby>会社<rt>かいしゃ</rt></ruby>でほかの<ruby>人<rt>ひと</rt></ruby>より<ruby>自分<rt>じぶん</rt></ruby>が<ruby>先<rt>さき</rt></ruby>に<ruby>帰<rt>かえ</rt></ruby>ります。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">お<ruby>先<rt>さき</rt></ruby>に<ruby>失礼<rt>しつれい</rt></ruby>します。</td>
        </tr>
        <tr>
          <td>2. <ruby>会社<rt>かいしゃ</rt></ruby>でほかの<ruby>人<rt>ひと</rt></ruby>が<ruby>自分<rt>じぶん</rt></ruby>より<ruby>先<rt>さき</rt></ruby>に<ruby>帰<rt>かえ</rt></ruby>ります。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">お<ruby>疲<rt>つか</rt></ruby>れ<ruby>様<rt>さま</rt></ruby>でした。</td>
        </tr>
        <tr>
          <td>3. ほかの<ruby>人<rt>ひと</rt></ruby>のうちに<ruby>入<rt>はい</rt></ruby>ります。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">おじゃまします。</td>
        </tr>
        <tr>
          <td>4. ほかの<ruby>人<rt>ひと</rt></ruby>のうちを<ruby>出<rt>で</rt></ruby>ます。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">おじゃましました。</td>
        </tr>
        <tr>
          <td>5. ほかのうちの<ruby>人<rt>ひと</rt></ruby>に、<ruby>来<rt>き</rt></ruby>たことを<ruby>知<rt>し</rt></ruby>らせます。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">ごめんください。</td>
        </tr>
        <tr>
          <td>6. <ruby>先生<rt>せんせい</rt></ruby>に<ruby>今<rt>いま</rt></ruby>から<ruby>話<rt>はな</rt></ruby>せるかどうか<ruby>聞<rt>き</rt></ruby>きます。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">お<ruby>時間<rt>じかん</rt></ruby>、ありますか。／<ruby>今<rt>いま</rt></ruby>、ちょっとよろしいですか。</td>
        </tr>
        <tr>
          <td>7. <ruby>先生<rt>せんせい</rt></ruby>に<ruby>質問<rt>しつもん</rt></ruby>したいです。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300"><ruby>質問<rt>しつもん</rt></ruby>があるんですが。</td>
        </tr>
        <tr>
          <td>8. <ruby>受付<rt>うけつけ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>質問<rt>しつもん</rt></ruby>したいことがあります。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">うかがいたいんですが。</td>
        </tr>
        <tr>
          <td>9. お<ruby>世話<rt>せわ</rt></ruby>になった<ruby>人<rt>ひと</rt></ruby>に<ruby>久<rt>ひさ</rt></ruby>しぶりに<ruby>会<rt>あ</rt></ruby>いました。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">ごぶさたしております。</td>
        </tr>
        <tr>
          <td>10. <ruby>病気<rt>びょうき</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>と<ruby>別<rt>わか</rt></ruby>れます。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">お<ruby>大事<rt>だいじ</rt></ruby>に。</td>
        </tr>
        <tr>
          <td>11. お<ruby>客<rt>きゃく</rt></ruby>さんにいすを<ruby>勧<rt>すす</rt></ruby>めます。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">どうぞおかけください。</td>
        </tr>
        <tr>
          <td>12. お<ruby>客<rt>きゃく</rt></ruby>さんに<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>や<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>を<ruby>勧<rt>すす</rt></ruby>めます。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">お<ruby>口<rt>くち</rt></ruby>に<ruby>合<rt>あ</rt></ruby>うかどうか。</td>
        </tr>
        <tr>
          <td>13. <ruby>先輩<rt>せんぱい</rt></ruby>が<ruby>自分<rt>じぶん</rt></ruby>を<ruby>待<rt>ま</rt></ruby>っていました。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">お<ruby>待<rt>ま</rt></ruby>たせしました。</td>
        </tr>
        <tr>
          <td>14. これから<ruby>長<rt>なが</rt></ruby>い<ruby>間<rt>あいだ</rt></ruby><ruby>会<rt>あ</rt></ruby>わない<ruby>人<rt>ひと</rt></ruby>と<ruby>別<rt>わか</rt></ruby>れます。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">お<ruby>元気<rt>げんき</rt></ruby>で。</td>
        </tr>
        <tr>
          <td>15. <ruby>旅行<rt>りょこう</rt></ruby>に<ruby>行<rt>い</rt></ruby>く<ruby>人<rt>ひと</rt></ruby>に<ruby>会<rt>あ</rt></ruby>いました。</td>
          <td class="font-bold text-emerald-800 dark:text-emerald-300">お<ruby>気<rt>き</rt></ruby>をつけて。</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`
  },
  '確認問題': {
    code: '確認',
    title: '<ruby>確認問題<rt>かくにんもんだい</rt></ruby>（実戦形式：発話表現）',
    descJp: 'えを<ruby>見<rt>み</rt></ruby>ながら<ruby>質問<rt>しつもん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いてください。やじるし（→）の<ruby>人<rt>ひと</rt></ruby>は<ruby>何<rt>なん</rt></ruby>と<ruby>言<rt>い</rt></ruby>いますか。１から３の<ruby>中<rt>なか</rt></ruby>から、<ruby>最<rt>もっと</rt></ruby>もよいものを<ruby>一<rt>ひと</rt></ruby>つえらんでください。',
    descEn: 'Look at the illustration and choose the most appropriate utterance for the person indicated by the arrow (→).'
  }
};


/**
 * Authentic Headphone Earphone Badge matching Shin Kanzen Master physical textbook:
 * Headband arc, two earpads, dotted halo, with Disc Letter (e.g. A) on top and Track No (e.g. 01) below.
 */
const HeadphoneBadge = ({ trackCode = "A-01", isPlaying = false, onClick, title }) => {
  let letter = "A";
  let num = "01";
  if (trackCode) {
    const clean = String(trackCode).replace(/[\[\]]/g, '').trim();
    const parts = clean.split(/[-_\s]+/);
    if (parts.length >= 2) {
      letter = parts[0];
      num = parts[1];
    } else if (clean.length > 1) {
      letter = clean.charAt(0);
      num = clean.slice(1);
    }
  }

  return (
    <button
      onClick={onClick}
      type="button"
      title={title || `Play Track ${trackCode}`}
      className={`shinkanzen-earphone-badge inline-flex flex-col items-center justify-center p-0.5 rounded-full group cursor-pointer transition-transform ${
        isPlaying ? 'scale-105' : 'hover:scale-105'
      }`}
    >
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-emerald-500/25 dark:bg-purple-400/35 animate-ping pointer-events-none" />
        )}
        <svg viewBox="0 0 60 60" className="w-11 h-11 sm:w-12 sm:h-12 text-[#1e293b] dark:text-slate-200 transition-colors">
          {/* Subtle dotted halo circle like the original book print */}
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="1.5, 2.5"
            opacity="0.35"
          />
          {/* Headband arch */}
          <path
            d="M 17 33 C 17 17, 43 17, 43 33"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Left earphone pad */}
          <ellipse
            cx="16"
            cy="35"
            rx="4"
            ry="7"
            fill="currentColor"
          />
          {/* Right earphone pad */}
          <ellipse
            cx="44"
            cy="35"
            rx="4"
            ry="7"
            fill="currentColor"
          />
          {/* Disc Letter (e.g. A) */}
          <text
            x="30"
            y="26"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="900"
            fontFamily="'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif"
            fill="currentColor"
            letterSpacing="0.5"
          >
            {letter}
          </text>
          {/* Track Number (e.g. 01) */}
          <text
            x="30"
            y="41"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fontFamily="'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif"
            fill="currentColor"
            letterSpacing="0.5"
          >
            {num}
          </text>
        </svg>
      </div>
    </button>
  );
};

const ShinkanzenN3ListeningBook = () => {
  const { chapterId = 'mondai-1' } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User state — SCRIPT IS CLOSED BY DEFAULT
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showScript, setShowScript] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoState, setVideoState] = useState({ status: 'idle', url: null, message: null });
  const [expandedDetails, setExpandedDetails] = useState({});

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [currentAudioDuration, setCurrentAudioDuration] = useState(0);
  const [activeAudioSrc, setActiveAudioSrc] = useState(null);
  const [playCount, setPlayCount] = useState({});

  const audioRef = useRef(null);

  const allChapters = SHINKANZEN_N3_LISTENING_CHAPTERS;
  const currentChapterIndex = allChapters.findIndex(c => c.id === chapterId);
  const currentChapter = allChapters[currentChapterIndex];
  const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : null;
  const currentPart = currentChapter?.part || 1;
  const partChapters = allChapters.filter(ch => ch.part === currentPart);

  const resolvePublicUrl = (path) => {
    if (!path) return path;
    if (path.startsWith('http')) return path;
    return path.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : import.meta.env.BASE_URL + path;
  };

  const isSkillChapter = Boolean(data?.part === 2 || (chapterId && chapterId.startsWith('skill-')));

  const groupedSections = React.useMemo(() => {
    if (!isSkillChapter || !data?.questions) return [];
    const map = new Map();
    data.questions.forEach((q, originalIdx) => {
      const title = q.sectionTitle || '練習';
      if (!map.has(title)) {
        const firstHs = data.hotspots?.find(h => h.trackId === q.trackId) || data.hotspots?.find(h => h.audioSrc === q.audioSrc);
        map.set(title, {
          title,
          trackId: q.trackId,
          trackLabel: q.trackLabel || firstHs?.label,
          trackCode: q.trackCode || firstHs?.trackCode || firstHs?.label?.match(/\[(.*?)\]/)?.[1] || 'A-01',
          audioSrc: q.audioSrc || firstHs?.audioSrc,
          instruction: q.instruction || data.instruction,
          questions: []
        });
      }
      map.get(title).questions.push({ ...q, originalIdx });
    });
    return Array.from(map.values());
  }, [isSkillChapter, data]);

  const handleSelectAnswer = (qKey, optionIndex) => {
    if (revealed[qKey]) return;
    setAnswers(prev => ({ ...prev, [qKey]: optionIndex }));
    setRevealed(prev => ({ ...prev, [qKey]: true }));
    setExpandedDetails(prev => ({ ...prev, [qKey]: true }));
  };

  const toggleDetail = (qKey) => {
    setExpandedDetails(prev => ({ ...prev, [qKey]: !prev[qKey] }));
  };

  useEffect(() => {
    setAnswers({});
    setRevealed({});
    setExpandedDetails({});
    setLoading(true);
    setError(null);
    setShowScript(false);
    setShowVideo(false);
    setVideoState({ status: 'idle', url: null, message: null });

    try {
      const matchedKey = Object.keys(localChapterModules).find(k => k.endsWith(`/${chapterId}.json`));
      if (matchedKey && localChapterModules[matchedKey]) {
        const mod = localChapterModules[matchedKey];
        const loadedData = mod.default || mod;
        setData(loadedData);

        if (loadedData?.hotspots && loadedData.hotspots.length > 0) {
          const firstAudio = loadedData.hotspots[0].audioSrc;
          setActiveAudioSrc(firstAudio);
          if (audioRef.current) {
            audioRef.current.src = resolvePublicUrl(firstAudio);
            audioRef.current.load();
          }
        }
      } else {
        setData(null);
        setError(`Content for "${chapterId}" is currently in preparation.`);
      }
    } catch (err) {
      setError(err.message || "Failed to load chapter content.");
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  const loadVideoStatus = useCallback(async () => {
    const getListeningVideo = httpsCallable(functions, 'getListeningVideo');
    const result = await getListeningVideo({ chapterId });
    const video = result.data;
    if (video.status === 'completed' && video.storagePath) {
      const url = await getDownloadURL(ref(storage, video.storagePath));
      setVideoState({ status: 'completed', url, message: null });
      return true;
    }
    setVideoState({ status: video.status || 'queued', url: null, message: video.error || null });
    return false;
  }, [chapterId]);

  const handleGenerateVideo = async () => {
    if (!currentUser) {
      setShowVideo(true);
      setVideoState({ status: 'error', url: null, message: 'Please sign in before generating a video.' });
      return;
    }
    setShowVideo(true);
    setVideoState({ status: 'checking', url: null, message: null });
    try {
      if (await loadVideoStatus()) return;
      const generateListeningVideo = httpsCallable(functions, 'generateListeningVideo');
      const transcript = (data.transcript || []).map(line => `${line.speaker ? `${line.speaker}: ` : ''}${line.text || ''}`).join('\n');
      const result = await generateListeningVideo({ chapterId, transcript });
      setVideoState({ status: result.data.status || 'queued', url: null, message: result.data.error || null });
    } catch (err) {
      console.error('Video generation request failed:', err);
      setVideoState({ status: 'error', url: null, message: err.message || 'Could not start video generation.' });
    }
  };

  useEffect(() => {
    if (!showVideo || !['queued', 'in_progress', 'checking'].includes(videoState.status)) return undefined;
    const timer = window.setInterval(() => loadVideoStatus().catch(err => console.error('Video status check failed:', err)), 8000);
    return () => window.clearInterval(timer);
  }, [showVideo, videoState.status, loadVideoStatus]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => setCurrentAudioTime(audio.currentTime);
    const handleDurationChange = () => setCurrentAudioDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [activeAudioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        setPlayCount(prev => ({ ...prev, [chapterId]: (prev[chapterId] || 0) + 1 }));
      }).catch(err => console.error("Audio playback error:", err));
    }
  };

  const handleScrub = (e) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentAudioTime(newTime);
    }
  };

  const setSpeed = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const seekToTime = (time) => {
    if (mode === 'exam') return;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play().catch(e => console.error(e));
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === null) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const navigateToChapter = (id) => {
    if (id) navigate(`/books/shinkanzen-master-n3-listening/chapters/${id}`);
  };

  const getSpeakerBadgeStyle = (speaker) => {
    if (!speaker) return 'bg-gray-500/10 text-gray-500 dark:text-gray-400 border border-gray-500/20';
    if (speaker.includes('女') || speaker.includes('女性')) return 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20';
    if (speaker.includes('男') || speaker.includes('男性')) return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
    if (speaker.includes('ナレーション') || speaker.includes('質問')) return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20';
    if (speaker.includes('指示')) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] bg-[var(--color-bg-primary)] py-12 flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="text-xs text-[var(--color-text-muted)] mt-4">Loading Shin Kanzen Master Listening...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[50vh] bg-[var(--color-bg-primary)] py-12 px-4 flex flex-col items-center">
        <div className="max-w-md w-full bg-[var(--color-bg-secondary)] border border-red-500/30 rounded-2xl p-6 text-center">
          <p className="text-red-500 font-bold mb-3">⚠️ Chapter Error</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">{error || "Chapter not found"}</p>
          <Link to="/books/shinkanzen-master-n3-listening" className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-bold transition shadow-sm">
            Back to Book Index
          </Link>
        </div>
      </div>
    );
  }

  const switchTrack = (audioSrc) => {
    if (!audioSrc) return;
    setActiveAudioSrc(audioSrc);
    if (audioRef.current) {
      audioRef.current.src = resolvePublicUrl(audioSrc);
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error(e));
    }
  };

  const currentTrackObj = data.hotspots?.find(h => h.audioSrc === activeAudioSrc) || data.hotspots?.[0];
  const currentTrackLabel = currentTrackObj?.label || 'Audio Track';
  const currentTrackCode = currentTrackObj?.trackCode || currentTrackObj?.label?.match(/\[(.*?)\]/)?.[1] || 'A-01';
  const renderSkillChapter = () => {
    return (
      <div className="space-y-10 mb-8">
        {/* Authentic Unit Header for Skill Chapters */}
        <div className="shinkanzen-listening-paper rounded-xl p-4 sm:p-5 mb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {data.partTitle || '第2部：実力養成編'}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 mt-2 mb-0">
                {MONDAI_NAMES[chapterId] || data.title}
              </h2>
            </div>
            {chapterId === 'skill-2' && (
              <div className="p-1 rounded-lg border border-[var(--color-border)] bg-white dark:bg-slate-900 shrink-0 shadow-xs">
                <img 
                  src={resolvePublicUrl('/images/shinkanzen_listening/skill-2/unit_overview.png')}
                  alt="Unit Overview"
                  className="h-16 sm:h-20 object-contain rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* Render Each Section */}
        {groupedSections.map((sec, secIdx) => {
          const notice = SKILL_SECTION_NOTICES[sec.title];
          const isTrackPlaying = isPlaying && activeAudioSrc === sec.audioSrc;
          
          // Determine section render mode
          const isTrueFalseSection = sec.questions.every(q => 
            q.options?.some(o => o.includes('○') || o.includes('×'))
          );

          // Inline phrase questions have brackets inside the prompt sentence (e.g. 練習1: （ 話す人 ・ 友達 ）が教える)
          const isInlinePhraseSection = !isTrueFalseSection && sec.questions.every(q =>
            q.questionText?.includes('（') && q.questionText?.includes('）') && !q.questionText?.includes('最初の言葉')
          );

          // Bubble letters mode: for 1-A, 1-B, 1-C, or pure choice letter questions where options are just letters tested aurally
          const isBubbleLetterSection = !isTrueFalseSection && !isInlinePhraseSection && (
            sec.title.includes('1-A') || sec.title.includes('1-B') || sec.title.includes('1-C') ||
            sec.questions.every(q => q.options?.length <= 4 && q.options?.every(o => /^[a-d]\./i.test(o.trim())))
          );

          return (
            <div key={secIdx} className="space-y-4">
              {/* Textbook Top Notice Box (e.g. [ 1-A ] 間違えやすい音) */}
              {notice && (
                <div className="shinkanzen-skill-notice-box">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="shinkanzen-notice-badge">
                      {notice.code}
                    </span>
                    <h4 
                      className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 m-0"
                      dangerouslySetInnerHTML={{ __html: notice.title }}
                    />
                  </div>
                  <p 
                    className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-serif"
                    dangerouslySetInnerHTML={{ __html: notice.descJp }}
                  />
                  {notice.descEn && (
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 mt-2 m-0 italic font-sans border-t border-stone-200 dark:border-stone-700/60 pt-1.5">
                      {notice.descEn}
                    </p>
                  )}
                  {notice.diagramSrc && (
                    <div className="my-4 p-3 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-[var(--color-border)] text-center shadow-xs">
                      <img 
                        src={resolvePublicUrl(notice.diagramSrc)} 
                        alt={notice.diagramCaption || "Diagram"} 
                        className="max-h-56 mx-auto object-contain rounded-lg"
                      />
                      {notice.diagramCaption && (
                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 m-0 font-serif font-bold">
                          {notice.diagramCaption}
                        </p>
                      )}
                    </div>
                  )}
                  {notice.tableHtml && (
                    <div 
                      className="mt-3 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: notice.tableHtml }}
                    />
                  )}
                </div>
              )}

              {/* Authentic Exercise Paper Sheet */}
              <div className="shinkanzen-listening-paper rounded-xl p-4 sm:p-6 mb-8">
                {/* Exercise Header Banner */}
                <div className="shinkanzen-exercise-header-banner">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <span className="shinkanzen-hatch-icon" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 m-0 flex items-center gap-2">
                        <span>{sec.title}</span>
                      </h3>
                      {sec.instruction && (
                        <p 
                          className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-serif mt-1 m-0 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: sec.instruction }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Single prominent Headphone Badge for this exercise */}
                  <div className="flex items-center gap-2 shrink-0">
                    <HeadphoneBadge
                      trackCode={sec.trackCode}
                      isPlaying={isTrackPlaying}
                      onClick={() => {
                        if (sec.audioSrc) {
                          if (isTrackPlaying) {
                            audioRef.current?.pause();
                          } else {
                            switchTrack(sec.audioSrc);
                          }
                        }
                      }}
                      title={`Play Exercise Audio [${sec.trackCode}]`}
                    />
                  </div>
                </div>

                {/* Sub-renderer A: Bubble Letter Mode (e.g. 練習1-A, 1-B, 1-C) */}
                {isBubbleLetterSection ? (
                  <div className="space-y-4">
                    {/* (例) Row in the textbook */}
                    {sec.title.includes('1-A') && (
                      <div className="shinkanzen-example-row flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-stone-600 dark:text-stone-300 font-serif w-8">
                            （例）
                          </span>
                          <div className="shinkanzen-bubble-group">
                            <span>(</span>
                            <span className="shinkanzen-bubble-btn opacity-60">a</span>
                            <span className="text-stone-400">・</span>
                            <span className="shinkanzen-bubble-btn selected font-bold bg-slate-900 text-white">ⓑ</span>
                            <span className="text-stone-400">・</span>
                            <span className="shinkanzen-bubble-btn opacity-60">c</span>
                            <span>)</span>
                          </div>
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 font-sans italic">
                          例題 (Example) : ⓑ が正解
                        </div>
                      </div>
                    )}

                    {/* Question Rows */}
                    <div className="space-y-2">
                      {sec.questions.map((q, qSubIdx) => {
                        const qKey = `q-${q.originalIdx}`;
                        const userAnswer = answers[qKey];
                        const isRevealed = revealed[qKey];
                        const correctIdx = q.correctOption?.index;
                        const subNum = q.badge?.match(/\((\d+)\)/)?.[1] || (qSubIdx + 1);
                        const isDetailOpen = expandedDetails[qKey] ?? isRevealed;

                        return (
                          <div key={q.originalIdx} className="border-b last:border-b-0 border-stone-200/70 dark:border-stone-800/70 pb-2">
                            <div className="shinkanzen-bubble-row">
                              <span className="font-bold text-slate-800 dark:text-slate-200 font-serif w-8">
                                ({subNum})
                              </span>

                              <div className="shinkanzen-bubble-group">
                                <span>(</span>
                                {q.options?.map((opt, optIdx) => {
                                  const letter = String.fromCharCode(97 + optIdx);
                                  const isSelected = userAnswer === optIdx + 1;
                                  const isCorrect = optIdx === correctIdx;
                                  let btnClass = "shinkanzen-bubble-btn";
                                  if (isRevealed) {
                                    if (isCorrect) btnClass += " correct";
                                    else if (isSelected && !isCorrect) btnClass += " wrong";
                                    else btnClass += " dimmed";
                                  } else if (isSelected) {
                                    btnClass += " selected";
                                  }

                                  return (
                                    <React.Fragment key={optIdx}>
                                      {optIdx > 0 && <span className="text-stone-400">・</span>}
                                      <button
                                        type="button"
                                        onClick={() => handleSelectAnswer(qKey, optIdx + 1)}
                                        disabled={isRevealed}
                                        className={btnClass}
                                        title={opt}
                                      >
                                        {letter}
                                      </button>
                                    </React.Fragment>
                                  );
                                })}
                                <span>)</span>
                              </div>

                              {/* Status and Toggle */}
                              <div className="ml-auto flex items-center gap-2">
                                {isRevealed && (
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                    userAnswer === correctIdx + 1
                                      ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10'
                                      : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                                  }`}>
                                    {userAnswer === correctIdx + 1 ? '✓ 正解' : `✗ (正解: ${String.fromCharCode(97 + correctIdx)})`}
                                  </span>
                                )}
                                {isRevealed && (
                                  <button
                                    type="button"
                                    onClick={() => toggleDetail(qKey)}
                                    className="text-[11px] font-bold text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 underline cursor-pointer"
                                  >
                                    {isDetailOpen ? '隠す ▲' : '解説 ▼'}
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Detail / Explanation Drawer */}
                            {isRevealed && isDetailOpen && (
                              <div className="mt-2 ml-10 p-3 sm:p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/90 dark:bg-slate-900/60 text-xs sm:text-sm space-y-2 animate-fadeIn">
                                {/* Spoken prompt text */}
                                {q.questionText && (
                                  <div className="font-serif text-slate-800 dark:text-slate-100 font-bold">
                                    <span dangerouslySetInnerHTML={{ __html: q.questionText }} />
                                  </div>
                                )}

                                {/* Choices breakdown */}
                                <div className="flex flex-wrap gap-2 text-stone-600 dark:text-stone-300 font-serif">
                                  {q.options?.map((opt, oIdx) => (
                                    <span 
                                      key={oIdx}
                                      className={`px-2 py-0.5 rounded ${
                                        oIdx === correctIdx
                                          ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-500/30'
                                          : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                                      }`}
                                    >
                                      {opt}
                                    </span>
                                  ))}
                                </div>

                                {/* Japanese Explanation */}
                                {q.explanation && (
                                  <div 
                                    className="text-stone-700 dark:text-stone-200 leading-relaxed font-serif pt-1"
                                    dangerouslySetInnerHTML={{ __html: q.explanation }}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : isInlinePhraseSection ? (
                  /* Sub-renderer B: Inline Phrase Mode (e.g. 練習1 in Chapter 2) */
                  <div className="space-y-4">
                    {sec.questions.map((q, qSubIdx) => {
                      const qKey = `q-${q.originalIdx}`;
                      const userAnswer = answers[qKey];
                      const isRevealed = revealed[qKey];
                      const correctIdx = q.correctOption?.index;
                      const subNum = q.badge?.match(/\((\d+)\)/)?.[1] || (qSubIdx + 1);

                      const opt1 = q.options?.[0]?.replace(/^[a-z]\.\s*/i, '') || '話す人';
                      const opt2 = q.options?.[1]?.replace(/^[a-z]\.\s*/i, '') || '友達';
                      const verbEnding = q.questionText?.match(/）(.*?)<\/b>/)?.[1] || q.questionText?.replace(/<[^>]+>/g, '').match(/）(.*)/)?.[1] || '';

                      return (
                        <div key={q.originalIdx} className="pb-3 border-b last:border-b-0 border-stone-200/70 dark:border-stone-800/70">
                          <div className="flex flex-wrap items-center justify-between gap-2 py-1">
                            <div className="flex items-center flex-wrap gap-2 text-base sm:text-lg font-serif">
                              <span className="font-bold text-slate-800 dark:text-slate-200 w-8">
                                ({subNum})
                              </span>
                              <span>（</span>
                              
                              <button
                                type="button"
                                onClick={() => handleSelectAnswer(qKey, 1)}
                                disabled={isRevealed}
                                className={`shinkanzen-inline-choice-btn ${
                                  isRevealed
                                    ? correctIdx === 0
                                      ? 'correct'
                                      : userAnswer === 1
                                      ? 'wrong'
                                      : 'dimmed'
                                    : userAnswer === 1
                                    ? 'selected'
                                    : ''
                                }`}
                              >
                                {opt1}
                              </button>

                              <span>・</span>

                              <button
                                type="button"
                                onClick={() => handleSelectAnswer(qKey, 2)}
                                disabled={isRevealed}
                                className={`shinkanzen-inline-choice-btn ${
                                  isRevealed
                                    ? correctIdx === 1
                                      ? 'correct'
                                      : userAnswer === 2
                                      ? 'wrong'
                                      : 'dimmed'
                                    : userAnswer === 2
                                    ? 'selected'
                                    : ''
                                }`}
                              >
                                {opt2}
                              </button>

                              <span>）{verbEnding}</span>
                            </div>

                            {isRevealed && (
                              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                userAnswer === correctIdx + 1
                                  ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10'
                                  : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                              }`}>
                                {userAnswer === correctIdx + 1 ? '✓ 正解' : `✗ (正解: ${correctIdx === 0 ? opt1 : opt2})`}
                              </span>
                            )}
                          </div>

                          {isRevealed && (
                            <div className="mt-2 ml-8 p-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-slate-900/60 text-xs sm:text-sm space-y-1.5 animate-fadeIn">
                              {q.context && (
                                <div className="text-stone-600 dark:text-stone-300 font-serif">
                                  {q.context}
                                </div>
                              )}
                              {q.explanation && (
                                <div 
                                  className="text-stone-700 dark:text-stone-200 font-serif"
                                  dangerouslySetInnerHTML={{ __html: q.explanation }}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : isTrueFalseSection ? (
                  /* Sub-renderer C: Situation Utterances with [ ○ ] [ × ] (e.g. 練習2-A, 練習2-B) */
                  <div className="space-y-4">
                    {(() => {
                      const situationMap = new Map();
                      sec.questions.forEach(q => {
                        const sitMatch = q.badge?.match(/\((\d+)-(\d+)\)/);
                        const sitNum = sitMatch ? sitMatch[1] : '1';
                        const uttNum = sitMatch ? sitMatch[2] : '1';
                        if (!situationMap.has(sitNum)) {
                          situationMap.set(sitNum, {
                            sitNum,
                            context: q.context,
                            utterances: []
                          });
                        }
                        situationMap.get(sitNum).utterances.push({ ...q, uttNum });
                      });

                      return Array.from(situationMap.values()).map((sit, sitIdx) => (
                        <div key={sitIdx} className="shinkanzen-situation-card">
                          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-stone-200 dark:border-stone-700">
                            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 font-serif">
                              ({sit.sitNum})
                            </span>
                            <span className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serif font-medium">
                              {sit.context || '状況を聞いて判断してください。'}
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {sit.utterances.map((u, uIdx) => {
                              const qKey = `q-${u.originalIdx}`;
                              const userAnswer = answers[qKey];
                              const isRevealed = revealed[qKey];
                              const correctIdx = u.correctOption?.index;
                              const cleanUttText = u.questionText?.replace(/^発話\s*\d+：/, '') || u.questionText;

                              return (
                                <div key={uIdx} className="p-2 rounded-lg bg-stone-50/60 dark:bg-slate-900/40 border border-stone-200/50 dark:border-stone-800">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="flex items-start gap-2 text-xs sm:text-sm font-serif">
                                      <span className="font-bold text-stone-500 shrink-0 mt-0.5">
                                        {u.uttNum}.
                                      </span>
                                      <span 
                                        className="text-slate-800 dark:text-slate-200 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: cleanUttText }}
                                      />
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                      <button
                                        type="button"
                                        onClick={() => handleSelectAnswer(qKey, 1)}
                                        disabled={isRevealed}
                                        className={`shinkanzen-tf-btn ${
                                          isRevealed
                                            ? correctIdx === 0
                                              ? 'correct'
                                              : userAnswer === 1
                                              ? 'wrong'
                                              : 'dimmed'
                                            : userAnswer === 1
                                            ? 'selected'
                                            : ''
                                        }`}
                                        title="状況に合う (○)"
                                      >
                                        ○
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => handleSelectAnswer(qKey, 2)}
                                        disabled={isRevealed}
                                        className={`shinkanzen-tf-btn ${
                                          isRevealed
                                            ? correctIdx === 1
                                              ? 'correct'
                                              : userAnswer === 2
                                              ? 'wrong'
                                              : 'dimmed'
                                            : userAnswer === 2
                                              ? 'selected'
                                            : ''
                                        }`}
                                        title="状況に合わない (×)"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  </div>

                                  {isRevealed && (
                                    <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 font-serif">
                                      <span dangerouslySetInnerHTML={{ __html: u.explanation }} />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                ) : (
                  /* Sub-renderer D: Standard Utterance Choices & Illustration Mode (e.g. 練習3, 4, 確認問題) */
                  <div className="space-y-6">
                    {sec.questions.map((q, qSubIdx) => {
                      const qKey = `q-${q.originalIdx}`;
                      const userAnswer = answers[qKey];
                      const isRevealed = revealed[qKey];
                      const correctIdx = q.correctOption?.index;
                      const subNum = q.badge?.match(/\((\d+)\)/)?.[1] || (qSubIdx + 1);

                      return (
                        <div key={q.originalIdx} className="p-4 sm:p-5 rounded-xl border border-[var(--color-border)] bg-transparent space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 font-serif">
                                ({subNum})
                              </span>
                              <div className="space-y-1">
                                {q.context && (
                                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-serif italic m-0">
                                    {q.context}
                                  </p>
                                )}
                                <p 
                                  className="text-sm sm:text-base font-serif font-bold text-slate-800 dark:text-slate-100 m-0 leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: q.questionText }}
                                />
                              </div>
                            </div>
                          </div>

                          {q.illustrationSrc && (
                            <div className="p-2 sm:p-3 bg-transparent rounded-xl border border-[var(--color-border)] text-center">
                              <img 
                                src={resolvePublicUrl(q.illustrationSrc)} 
                                alt="Scene Illustration"
                                className="max-h-64 mx-auto object-contain drop-shadow-sm rounded-lg"
                              />
                              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 m-0">
                                矢印（→）の人の発話に注意
                              </p>
                            </div>
                          )}

                          <div className="space-y-2 pt-1">
                            {q.options?.map((opt, oIdx) => {
                              const isSelected = userAnswer === oIdx + 1;
                              const isCorrect = oIdx === correctIdx;
                              let optClass = "shinkanzen-listening-option-row";
                              if (isRevealed) {
                                if (isCorrect) optClass += " correct";
                                else if (isSelected && !isCorrect) optClass += " wrong";
                                else optClass += " dimmed";
                              }
                              const cleanOpt = opt.replace(/^\d+[\.\s　]*/, '');

                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => handleSelectAnswer(qKey, oIdx + 1)}
                                  disabled={isRevealed}
                                  className={optClass}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex items-baseline gap-3">
                                      <span className="font-bold shrink-0 text-base">{oIdx + 1}</span>
                                      <span dangerouslySetInnerHTML={{ __html: cleanOpt }} />
                                    </div>
                                    {isRevealed && isCorrect && (
                                      <span className="text-emerald-700 dark:text-emerald-300 font-bold text-xs shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded">
                                        ✓ 正解
                                      </span>
                                    )}
                                    {isRevealed && isSelected && !isCorrect && (
                                      <span className="text-rose-700 dark:text-rose-400 font-bold text-xs shrink-0 bg-rose-500/10 px-2 py-0.5 rounded">
                                        ✗ 不正解
                                      </span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {isRevealed && q.explanation && (
                            <div className="mt-3 p-3.5 rounded-lg border border-[var(--color-border)] bg-transparent text-xs sm:text-sm font-serif space-y-1.5 animate-fadeIn">
                              <div className="font-bold text-xs text-stone-600 dark:text-stone-300">
                                【解説・正解の理由】
                              </div>
                              <div 
                                className="text-stone-700 dark:text-stone-200 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: q.explanation }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] pb-16 pt-3 sm:pt-4 transition-colors font-sans">
      
      {/* Hidden Native Audio Element */}
      <audio 
        ref={audioRef} 
        src={resolvePublicUrl(activeAudioSrc)} 
        playsInline 
        preload="auto" 
      />

      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-300 shinkanzen-page">
        
        {/* Top Controls & Breadcrumbs Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Link 
              to="/books/shinkanzen-master-n3-listening" 
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-purple-400 transition flex items-center gap-1.5 bg-slate-200/60 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 shrink-0"
            >
              &larr; Book Index
            </Link>
          </div>

          {/* Chapter Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={chapterId}
              onChange={(e) => navigateToChapter(e.target.value)}
              className="w-full sm:w-auto max-w-full bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-xs font-bold py-1.5 px-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 shadow-sm"
            >
              {partChapters.map(ch => (
                <option key={ch.id} value={ch.id}>
                  {MONDAI_NAMES[ch.id] || ch.rawTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= AUTHENTIC SHIN KANZEN PART BANNER ================= */}
        <div className="shinkanzen-part-header mb-5">
          <div className="shinkanzen-part-banner">
            <div className="flex items-center">
              <div className="shinkanzen-registration-marks">
                <div className="shinkanzen-reg-bar"></div>
                <div className="shinkanzen-reg-bar"></div>
                <div className="shinkanzen-reg-bar"></div>
                <div className="shinkanzen-reg-bar"></div>
              </div>
              <div className="shinkanzen-white-pill">
                <div className="shinkanzen-pill-num-box">
                  {data.mondaiNumber || data.part || 1}
                </div>
                <span className="shinkanzen-pill-title">
                  {data.partTitle || PART_TITLES[data.part] || '第1部：問題紹介'}
                </span>
                {data.partTitleEn && (
                  <span className="shinkanzen-pill-en">
                    {data.partTitleEn}
                  </span>
                )}
              </div>
            </div>

            {/* Diamond registration pattern on right */}
            <div className="hidden sm:flex items-center text-slate-400 opacity-60 text-xs font-mono tracking-widest">
              ◇◇◇
            </div>
          </div>
        </div>

        {/* ================= AUTHENTIC MONDAI HEADER & OVERVIEW (Only for Part 1) ================= */}
        {!isSkillChapter && (
          <div className="shinkanzen-listening-paper rounded-xl p-5 sm:p-6 mb-6">
            <div className="shinkanzen-mondai-header">
              <div className="shinkanzen-mondai-badge">
                {MONDAI_NAMES[chapterId] || data.title}
              </div>
            </div>

            <div className="space-y-3 font-serif">
              <p 
                className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 m-0"
                dangerouslySetInnerHTML={{ __html: data.mondaiHeader }}
              />
              {data.mondaiHeaderEn && (
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 italic m-0 border-t border-dashed border-slate-200 dark:border-slate-700/60 pt-2 font-sans">
                  {data.mondaiHeaderEn}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ================= OPTIONAL STANDALONE ILLUSTRATION (non-Mondai 4) ================= */}
        {data.illustrationSrc && chapterId !== 'mondai-4' && (
          <div className="shinkanzen-listening-paper rounded-xl p-4 sm:p-5 mb-6 text-center">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-emerald-700 dark:text-purple-400 uppercase tracking-wider">
                🖼️ Problem Scene Illustration (イラスト)
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                矢印（→）の人の発話に注意
              </span>
            </div>
            <div className="flex justify-center p-2 bg-transparent rounded-lg border border-[var(--color-border)]">
              <img 
                src={resolvePublicUrl(data.illustrationSrc)} 
                alt="Problem Illustration" 
                className="max-h-72 object-contain drop-shadow-sm"
              />
            </div>
          </div>
        )}

        {/* ================= AUTHENTIC QUESTION SHEET (問題用紙) ================= */}
        {isSkillChapter ? (
          renderSkillChapter()
        ) : chapterId === 'mondai-5' ? (
          /* ================= MONDAI 5: AUTHENTIC COMBINED (1) & (2) NUMBER BOX SHEET ================= */
          <div className="shinkanzen-listening-paper rounded-xl p-5 sm:p-7 mb-8 transition-all">
            {/* Header: ☆ 例題 5 + A-05 Earphone Badge */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-200 dark:border-stone-700/60">
              <div className="flex items-center gap-3">
                <div className="shinkanzen-reidai-star-badge text-xl font-bold flex items-baseline gap-1.5">
                  <span className="text-xl">☆</span>
                  <ruby className="text-lg font-bold">
                    例題<rt className="text-[10px] font-normal">れいだい</rt>
                  </ruby>
                  <span className="text-xl font-black ml-0.5">5</span>
                </div>

                <HeadphoneBadge
                  trackCode={data.hotspots?.[0]?.trackCode || "A-05"}
                  isPlaying={isPlaying && activeAudioSrc === data.hotspots?.[0]?.audioSrc}
                  onClick={() => {
                    const hs = data.hotspots?.[0];
                    if (hs?.audioSrc) {
                      if (activeAudioSrc === hs.audioSrc && isPlaying) {
                        audioRef.current?.pause();
                      } else {
                        switchTrack(hs.audioSrc);
                      }
                    }
                  }}
                  title="Play Audio Track A-05"
                />
              </div>

              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 font-sans">
                問題用紙
              </span>
            </div>

            {/* Authentic Direction Text */}
            {data.instruction && (
              <div 
                className="shinkanzen-listening-instruction mb-5"
                dangerouslySetInnerHTML={{ __html: data.instruction }}
              />
            )}

            {/* Questions (1) & (2) as authentic number boxes */}
            <div className="space-y-6">
              {data.questions?.map((q, qIdx) => {
                const qKey = `q-${qIdx}`;
                const userAnswer = answers[qKey];
                const isRevealed = revealed[qKey];
                const correctIdx = q.correctOption?.index;

                return (
                  <div key={qIdx} className="pb-5 border-b last:border-b-0 border-stone-200 dark:border-stone-700/60">
                    <div className="shinkanzen-number-box-wrapper">
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-200 w-8">
                        ({q.subNumber || qIdx + 1})
                      </span>

                      <div className="shinkanzen-number-box-grid">
                        {q.options?.map((optText, optIdx) => {
                          const isSelected = userAnswer === optIdx + 1;
                          const isCorrect = optIdx === correctIdx;

                          let cellClass = "shinkanzen-number-box-cell ";
                          if (isRevealed) {
                            if (isCorrect) cellClass += "correct";
                            else if (isSelected && !isCorrect) cellClass += "wrong";
                            else cellClass += "dimmed";
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => {
                                if (isRevealed) return;
                                setAnswers(prev => ({ ...prev, [qKey]: optIdx + 1 }));
                                setRevealed(prev => ({ ...prev, [qKey]: true }));
                              }}
                              disabled={isRevealed}
                              className={cellClass}
                              title={`Option ${optIdx + 1}`}
                            >
                              {optIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Explanation and spoken options on reveal */}
                    {isRevealed && (q.explanation || q.questionText) && (
                      <div className="mt-5 p-4 sm:p-5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/80 dark:bg-slate-900/60 shadow-xs space-y-3.5 animate-fadeIn">
                        {/* Header: Answer Badge & Explanation Title */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-200 dark:border-stone-700/70">
                          <div className="flex items-center gap-2">
                            <span className="shinkanzen-kotae-badge">
                              答え {correctIdx + 1}
                            </span>
                            <span className="text-xs font-bold text-stone-600 dark:text-stone-300 font-sans tracking-wide">
                              正解の理由・解説
                            </span>
                          </div>
                          {userAnswer && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              userAnswer === correctIdx + 1
                                ? 'text-emerald-700 dark:text-purple-300 bg-emerald-500/10 dark:bg-purple-500/20'
                                : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                            }`}>
                              {userAnswer === correctIdx + 1 ? '✓ 正解' : `あなたの選択: ${userAnswer}`}
                            </span>
                          )}
                        </div>

                        {/* Spoken Question */}
                        {q.questionText && (
                          <div className="p-3 bg-white dark:bg-slate-800/90 rounded-lg border border-stone-200 dark:border-stone-700">
                            <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 mb-1 font-sans uppercase tracking-wider">
                              【質問】
                            </div>
                            <div 
                              className="text-sm sm:text-base font-serif font-bold text-slate-800 dark:text-slate-100 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: q.questionText }}
                            />
                          </div>
                        )}

                        {/* Spoken Options */}
                        {q.spokenOptions && q.spokenOptions.length > 0 && (
                          <div className="p-3 bg-white dark:bg-slate-800/90 rounded-lg border border-stone-200 dark:border-stone-700">
                            <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 mb-1.5 font-sans uppercase tracking-wider">
                              【音声の選択肢】
                            </div>
                            <div className="space-y-1.5 text-xs sm:text-sm font-serif">
                              {q.spokenOptions.map((sOpt, sIdx) => {
                                const isOptCorrect = sIdx === correctIdx;
                                return (
                                  <div 
                                    key={sIdx} 
                                    className={`flex items-baseline justify-between p-1.5 rounded transition ${
                                      isOptCorrect 
                                        ? 'bg-emerald-500/10 dark:bg-purple-500/15 text-emerald-900 dark:text-purple-200 font-bold border border-emerald-500/20 dark:border-purple-500/30' 
                                        : 'text-stone-700 dark:text-stone-300'
                                    }`}
                                  >
                                    <span dangerouslySetInnerHTML={{ __html: sOpt }} />
                                    {isOptCorrect && (
                                      <span className="text-xs font-sans text-emerald-700 dark:text-purple-300 shrink-0 ml-2">✓ 正解</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Japanese Explanation */}
                        {q.explanation && (
                          <div className="space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-serif pt-0.5">
                            <div 
                              dangerouslySetInnerHTML={{ 
                                __html: q.explanation.replace(/^<b>【正解】\d+<\/b><br\/?>/, '') 
                              }} 
                            />
                          </div>
                        )}

                        {/* English Explanation */}
                        {q.explanationEn && (
                          <div className="pt-2 border-t border-stone-200/80 dark:border-stone-700/60 space-y-1">
                            <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 font-sans uppercase tracking-wider">
                              【English Explanation】
                            </div>
                            <div 
                              className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans"
                              dangerouslySetInnerHTML={{ __html: q.explanationEn }} 
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ================= STANDARD / MONDAI 1-4 QUESTION SHEET ================= */
          <div className="space-y-6 mb-8">
            {data.questions?.map((q, qIdx) => {
              const qKey = `q-${qIdx}`;
              const userAnswer = answers[qKey];
              const isRevealed = revealed[qKey];
              const correctIdx = q.correctOption?.index;
              const targetTrackCode = q.trackCode || currentTrackCode || `A-0${qIdx + 1}`;
              const questionAudioSrc = q.audioSrc || data.hotspots?.find(h => h.trackId === q.trackId)?.audioSrc || currentTrackObj?.audioSrc;
              const isNumberBoxOnly = q.optionsOnlyNumbers || chapterId === 'mondai-4' || q.options?.every(o => /^\d+$/.test(String(o).trim()));

              return (
                <div 
                  key={qIdx} 
                  className="shinkanzen-listening-paper rounded-xl p-5 sm:p-7 transition-all"
                >
                  {/* Authentic Question Header: Reidai Star + Earphone Badge */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-200 dark:border-stone-700/60">
                    <div className="flex items-center gap-3">
                      <div className="shinkanzen-reidai-star-badge text-xl font-bold flex items-baseline gap-1.5">
                        <span className="text-xl">☆</span>
                        <ruby className="text-lg font-bold">
                          例題<rt className="text-[10px] font-normal">れいだい</rt>
                        </ruby>
                        <span className="text-xl font-black ml-0.5">
                          {data.questions.length > 1 ? `${data.mondaiNumber || ''} (${qIdx + 1})` : (data.mondaiNumber || qIdx + 1)}
                        </span>
                      </div>

                      {/* Headphone Earphone Badge matching scanned book layout */}
                      <HeadphoneBadge
                        trackCode={targetTrackCode}
                        isPlaying={isPlaying && activeAudioSrc === questionAudioSrc}
                        onClick={() => {
                          if (questionAudioSrc) {
                            if (activeAudioSrc === questionAudioSrc && isPlaying) {
                              audioRef.current?.pause();
                            } else {
                              switchTrack(questionAudioSrc);
                            }
                          }
                        }}
                        title={`Play Audio Track ${targetTrackCode}`}
                      />
                    </div>

                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 font-sans">
                      問題用紙
                    </span>
                  </div>

                  {/* Question-Specific Illustration if not Mondai 4 */}
                  {q.illustrationSrc && chapterId !== 'mondai-4' && (
                    <div className="mb-4 p-3 bg-white dark:bg-slate-900 rounded-lg border border-stone-200 dark:border-stone-700 text-center">
                      <img 
                        src={resolvePublicUrl(q.illustrationSrc)} 
                        alt="Question Illustration" 
                        className="max-h-56 mx-auto object-contain drop-shadow-sm rounded-lg"
                      />
                    </div>
                  )}

                  {/* Authentic Direction Text (この問題では...) */}
                  {(q.instruction || data.instruction) && (
                    <div 
                      className="shinkanzen-listening-instruction"
                      dangerouslySetInnerHTML={{ __html: q.instruction || data.instruction }}
                    />
                  )}

                  {/* OPTIONS RENDERING */}
                  {isNumberBoxOnly ? (
                    /* NUMBER BOX FOR MONDAI 4 & NUMERIC OPTIONS (No text, only numbers in a box) */
                    <div>
                      <div className="shinkanzen-number-box-wrapper">
                        <div className="shinkanzen-number-box-grid">
                          {q.options?.map((optText, optIdx) => {
                            const isSelected = userAnswer === optIdx + 1;
                            const isCorrect = optIdx === correctIdx;

                            let cellClass = "shinkanzen-number-box-cell ";
                            if (isRevealed) {
                              if (isCorrect) cellClass += "correct";
                              else if (isSelected && !isCorrect) cellClass += "wrong";
                              else cellClass += "dimmed";
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => {
                                  if (isRevealed) return;
                                  setAnswers(prev => ({ ...prev, [qKey]: optIdx + 1 }));
                                  setRevealed(prev => ({ ...prev, [qKey]: true }));
                                }}
                                disabled={isRevealed}
                                className={cellClass}
                                title={`Option ${optIdx + 1}`}
                              >
                                {optIdx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mondai 4 Scene Illustration placed right below the number box */}
                      {(chapterId === 'mondai-4' && (q.illustrationSrc || data.illustrationSrc)) && (
                        <div className="my-5 p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-xl border border-stone-200 dark:border-stone-700 text-center">
                          <img 
                            src={resolvePublicUrl(q.illustrationSrc || data.illustrationSrc)} 
                            alt="Problem Scene Illustration" 
                            className="max-h-72 mx-auto object-contain drop-shadow-sm rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    /* STANDARD OPTION ROWS (Mondai 1, 2, 3) */
                    <div className="shinkanzen-listening-options">
                      {q.options?.map((optText, optIdx) => {
                        const isSelected = userAnswer === optIdx + 1;
                        const isCorrect = optIdx === correctIdx;

                        let optClass = "shinkanzen-listening-option-row";
                        if (isRevealed) {
                          if (isCorrect) optClass += " correct";
                          else if (isSelected && !isCorrect) optClass += " wrong";
                          else optClass += " dimmed";
                        }

                        // Format option text cleanly (strip leading digits like "1. ")
                        const cleanOptText = optText.replace(/^\d+[\.\s　]*/, '');

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              if (isRevealed) return;
                              setAnswers(prev => ({ ...prev, [qKey]: optIdx + 1 }));
                              setRevealed(prev => ({ ...prev, [qKey]: true }));
                            }}
                            disabled={isRevealed}
                            className={optClass}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-baseline gap-3">
                                <span className="font-bold shrink-0 text-base">{optIdx + 1}</span>
                                <span dangerouslySetInnerHTML={{ __html: cleanOptText }} />
                              </div>
                              {isRevealed && isCorrect && (
                                <span className="text-emerald-700 dark:text-purple-300 font-bold text-xs shrink-0 bg-emerald-500/10 dark:bg-purple-500/20 px-2 py-0.5 rounded border border-emerald-500/20 dark:border-purple-500/30">
                                  ✓ 正解
                                </span>
                              )}
                              {isRevealed && isSelected && !isCorrect && (
                                <span className="text-rose-700 dark:text-rose-400 font-bold text-xs shrink-0 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                  ✗ 不正解
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Authentic Kaisetsu / Explanation (Shown after selection) */}
                  {isRevealed && (q.explanation || q.questionText) && (
                    <div className="mt-5 p-4 sm:p-5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/80 dark:bg-slate-900/60 shadow-xs space-y-3.5 animate-fadeIn">
                      {/* Header: Answer Badge & Explanation Title */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-200 dark:border-stone-700/70">
                        <div className="flex items-center gap-2">
                          <span className="shinkanzen-kotae-badge">
                            答え {correctIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-stone-600 dark:text-stone-300 font-sans tracking-wide">
                            正解の理由・解説
                          </span>
                        </div>
                        {userAnswer && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            userAnswer === correctIdx + 1
                              ? 'text-emerald-700 dark:text-purple-300 bg-emerald-500/10 dark:bg-purple-500/20'
                              : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                          }`}>
                            {userAnswer === correctIdx + 1 ? '✓ 正解' : `あなたの選択: ${userAnswer}`}
                          </span>
                        )}
                      </div>

                      {/* Spoken Question */}
                      {q.questionText && (
                        <div className="p-3 bg-white dark:bg-slate-800/90 rounded-lg border border-stone-200 dark:border-stone-700">
                          <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 mb-1 font-sans uppercase tracking-wider">
                            【質問】
                          </div>
                          <div 
                            className="text-sm sm:text-base font-serif font-bold text-slate-800 dark:text-slate-100 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: q.questionText }}
                          />
                        </div>
                      )}

                      {/* Spoken Options (For Mondai 4 or numeric options) */}
                      {q.spokenOptions && q.spokenOptions.length > 0 && (
                        <div className="p-3 bg-white dark:bg-slate-800/90 rounded-lg border border-stone-200 dark:border-stone-700">
                          <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 mb-1.5 font-sans uppercase tracking-wider">
                            【音声の選択肢】
                          </div>
                          <div className="space-y-1.5 text-xs sm:text-sm font-serif">
                            {q.spokenOptions.map((sOpt, sIdx) => {
                              const isOptCorrect = sIdx === correctIdx;
                              return (
                                <div 
                                  key={sIdx} 
                                  className={`flex items-baseline justify-between p-1.5 rounded transition ${
                                    isOptCorrect 
                                      ? 'bg-emerald-500/10 dark:bg-purple-500/15 text-emerald-900 dark:text-purple-200 font-bold border border-emerald-500/20 dark:border-purple-500/30' 
                                      : 'text-stone-700 dark:text-stone-300'
                                  }`}
                                >
                                  <span dangerouslySetInnerHTML={{ __html: sOpt }} />
                                  {isOptCorrect && (
                                    <span className="text-xs font-sans text-emerald-700 dark:text-purple-300 shrink-0 ml-2">✓ 正解</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Japanese Explanation */}
                      {q.explanation && (
                        <div className="space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-serif pt-0.5">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: q.explanation.replace(/^<b>【正解】\d+<\/b><br\/?>/, '') 
                            }} 
                          />
                        </div>
                      )}

                      {/* English Explanation */}
                      {q.explanationEn && (
                        <div className="pt-2 border-t border-stone-200/80 dark:border-stone-700/60 space-y-1">
                          <div className="text-[11px] font-bold text-emerald-700 dark:text-purple-400 font-sans uppercase tracking-wider">
                            【English Explanation】
                          </div>
                          <div 
                            className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans"
                            dangerouslySetInnerHTML={{ __html: q.explanationEn }} 
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================= AUTHENTIC SCRIPT (スクリプト) DRAWER ================= */}
        <div className="shinkanzen-listening-paper rounded-xl overflow-hidden mb-8">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-stone-200 dark:border-stone-700/60">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold">📜</span>
              <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 m-0">
                スクリプト (Script)
              </h3>
            </div>
            
            <button 
              onClick={() => setShowScript(!showScript)} 
              className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1 border border-stone-300 dark:border-stone-700 cursor-pointer"
            >
              {showScript ? 'Hide Script ▲' : 'Show Script ▼'}
            </button>
          </div>

          {showScript && (
            <div className="p-5 sm:p-7 space-y-3.5 bg-stone-50/60 dark:bg-slate-900/40">
              {data.transcript?.map((line, idx) => (
                <div key={idx} className="flex items-baseline gap-3 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
                  {line.speaker && (
                    <span className={`shrink-0 font-bold text-xs sm:text-sm px-2 py-0.5 rounded ${getSpeakerBadgeStyle(line.speaker)}`}>
                      {line.speaker}
                    </span>
                  )}
                  <div 
                    className="font-serif leading-loose flex-1 text-slate-800 dark:text-slate-100"
                    dangerouslySetInnerHTML={{ __html: line.text }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= BOTTOM PAGINATION & NAVIGATION ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)]">
          <button
            onClick={() => prevChapter && navigateToChapter(prevChapter.id)}
            disabled={!prevChapter}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              prevChapter
                ? 'bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-emerald-500 dark:hover:border-purple-500 hover:shadow-sm cursor-pointer'
                : 'opacity-40 bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] cursor-not-allowed border border-transparent'
            }`}
          >
            &larr; Previous Section
          </button>

          <span className="text-xs font-bold text-[var(--color-text-muted)] py-1">
            Section {currentChapterIndex + 1} of {allChapters.length}
          </span>

          <button
            onClick={() => nextChapter && navigateToChapter(nextChapter.id)}
            disabled={!nextChapter}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              nextChapter
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-purple-600 dark:to-indigo-600 hover:opacity-95 text-white shadow-md shadow-emerald-600/15 dark:shadow-purple-600/15 cursor-pointer active:scale-95'
                : 'opacity-40 bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] cursor-not-allowed'
            }`}
          >
            Next Section &rarr;
          </button>
        </div>


      </div>
    </div>
  );
};

export default ShinkanzenN3ListeningBook;
