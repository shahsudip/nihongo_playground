import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { getDownloadURL, ref } from 'firebase/storage';
import LoadingSpinner from '../utils/loading_spinner.jsx';
import '../assets/shinkanzen_book.css';
import { functions, storage } from '../firebaseConfig.js';
import { useAuth } from '../context/AuthContext';
import { parseQuestionPresentation } from '../utils/shinkanzenQuestionMarkup.js';
import { SKILL_3_SECTION_NOTICES } from '../data/shinkanzen_listening/skill-3-notices.js';
import { SKILL_4_SECTION_NOTICES } from '../data/shinkanzen_listening/skill-4-notices.js';
import { SKILL_5_SECTION_NOTICES } from '../data/shinkanzen_listening/skill-5-notices.js';

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
    descJp: 'アクセントやイントネーションを<ruby>手<rt>て</rt></ruby>がかりにして<ruby>聞<rt>き</rt></ruby>くと、<ruby>意味<rt>いみ</rt></ruby>の<ruby>違<rt>ちが</rt></ruby>いがわかりやすくなります。',
    descEn: 'Differences in meaning are made easier to understand when listening by using accents and intonation as a clue.'
  },
  '練習1-C 似ている数字': {
    code: '1-C',
    title: '<ruby>似<rt>に</rt></ruby>ている<ruby>数字<rt>すうじ</rt></ruby>',
    descJp: '<ruby>数字<rt>すうじ</rt></ruby>は「〜<ruby>時<rt>じ</rt></ruby>」「〜<ruby>分<rt>ふん</rt></ruby>」などの<ruby>単位<rt>たんい</rt></ruby>がついたり、「４、５<ruby>日<rt>にち</rt></ruby>」のような<ruby>言<rt>い</rt></ruby>い<ruby>方<rt>かた</rt></ruby>をしたりすると、<ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>りにくくなります。アクセントやイントネーションに<ruby>注意<rt>ちゅうい</rt></ruby>して、<ruby>正<rt>ただ</rt></ruby>しく<ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>りましょう。',
    descEn: 'It may be hard to understand what the speaker is saying if counter suffixes, such as ~o\'clock and ~ minute(s), or expressions like "4、5日 (4 or 5 days)" are used. Pay attention to accent and intonation to help you correctly understand what is being said.'
  },
  '練習2-1 音の変化': {
    code: '2',
    title: '2 <ruby>音<rt>おと</rt></ruby>の<ruby>変化<rt>へんか</rt></ruby>',
    descJp: '<ruby>親<rt>した</rt></ruby>しい<ruby>人<rt>ひと</rt></ruby>と<ruby>話<rt>はな</rt></ruby>すときは、<ruby>音<rt>おと</rt></ruby>が<ruby>省略<rt>しょうりゃく</rt></ruby>されたり、<ruby>書<rt>か</rt></ruby>いたものとは<ruby>違<rt>ちが</rt></ruby>った<ruby>音<rt>おと</rt></ruby>になったりすることがあります。',
    descEn: 'When talking with close friends certain sounds may be omitted or sounds different from written language may be used.',
    tableHtml: `
<div class="mt-4">
  <div class="shinkanzen-textbook-table-wrapper">
    <table class="shinkanzen-textbook-table">
      <thead>
        <tr>
          <th class="w-1/2 text-center text-sm font-bold bg-amber-100/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 py-2 border-b border-stone-300 dark:border-stone-700">
            <ruby>変化<rt>へんか</rt></ruby>した<ruby>形<rt>かたち</rt></ruby> <span class="text-xs font-normal text-stone-500 font-sans block sm:inline">(Changed Form)</span>
          </th>
          <th class="w-1/2 text-center text-sm font-bold bg-amber-100/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 py-2 border-b border-stone-300 dark:border-stone-700">
            <ruby>元<rt>もと</rt></ruby>の<ruby>形<rt>かたち</rt></ruby> <span class="text-xs font-normal text-stone-500 font-sans block sm:inline">(Original Form)</span>
          </th>
        </tr>
      </thead>
      <tbody class="font-serif text-xs sm:text-sm divide-y divide-stone-200 dark:divide-stone-800">
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜ちゃう」「〜じゃう」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>行<rt>い</rt></ruby>っちゃう／<ruby>休<rt>やす</rt></ruby>んじゃう</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜てしまう」「〜でしまう」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>行<rt>い</rt></ruby>ってしまう／<ruby>休<rt>やす</rt></ruby>んでしまう</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜ちゃ」「〜じゃ」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>言<rt>い</rt></ruby>っちゃ／それじゃ</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜ては」「〜では」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>言<rt>い</rt></ruby>っては／それでは</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜(なく)ちゃ」「〜(な)きゃ」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>出<rt>だ</rt></ruby>さなくちゃ／しなきゃ</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜(なく)ては」「〜(な)ければ」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>出<rt>だ</rt></ruby>さなくては／しなければ</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜てる」「〜でる」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>知<rt>し</rt></ruby>ってる／<ruby>飲<rt>の</rt></ruby>んでる</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜ている」「〜でいる」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>知<rt>し</rt></ruby>っている／<ruby>飲<rt>の</rt></ruby>んでいる</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜てた」「〜でた」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>知<rt>し</rt></ruby>ってた／<ruby>飲<rt>の</rt></ruby>んでた</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜ていた」「〜でいた」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>知<rt>し</rt></ruby>っていた／<ruby>飲<rt>の</rt></ruby>んでいた</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜てく」「〜でく」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>持<rt>も</rt></ruby>ってく／<ruby>飛<rt>と</rt></ruby>んでく</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜ていく」「〜でいく」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>持<rt>も</rt></ruby>っていく／<ruby>飛<rt>と</rt></ruby>んでいく</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜てった」「〜でった」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>持<rt>も</rt></ruby>ってった／<ruby>飛<rt>と</rt></ruby>んでった</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜ていった」「〜でいった」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>持<rt>も</rt></ruby>っていった／<ruby>飛<rt>と</rt></ruby>んでいった</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜とく」「〜どく」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>置<rt>お</rt></ruby>いとく／<ruby>読<rt>よ</rt></ruby>んどく</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜ておく」「〜でおく」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>置<rt>お</rt></ruby>いておく／<ruby>読<rt>よ</rt></ruby>んでおく</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜って」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>呉<rt>くれ</rt></ruby>っていう<ruby>町<rt>まち</rt></ruby>／いいって<ruby>言<rt>い</rt></ruby>った</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">「〜と」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span><ruby>呉<rt>くれ</rt></ruby>という<ruby>町<rt>まち</rt></ruby>／いいと<ruby>言<rt>い</rt></ruby>った</div>
          </td>
        </tr>
        <tr>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">＋「っ」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span>とっても／すっごく／ばっかり</div>
          </td>
          <td class="p-2 sm:p-2.5">
            <div class="font-bold text-slate-900 dark:text-slate-100">ー「っ」</div>
            <div class="text-stone-600 dark:text-stone-300 text-xs mt-0.5"><span class="text-stone-400 font-sans">例：</span>とても／すごく／ばかり</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`
  },
  '練習2-2 音の変化': {
    code: '2-2',
    title: '<ruby>音<rt>おと</rt></ruby>の<ruby>変化<rt>へんか</rt></ruby>（<ruby>元<rt>もと</rt></ruby>の<ruby>形<rt>かたち</rt></ruby>を<ruby>書<rt>か</rt></ruby>く）',
    descJp: '<ruby>話<rt>はな</rt></ruby>し<ruby>言葉<rt>ことば</rt></ruby>で<ruby>変化<rt>へんか</rt></ruby>した<ruby>文末<rt>ぶんまつ</rt></ruby>の<ruby>表現<rt>ひょうげん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、その<ruby>元<rt>もと</rt></ruby>の<ruby>形<rt>かたち</rt></ruby>（<ruby>完全<rt>かんぜん</rt></ruby>な<ruby>文法<rt>ぶんぽう</rt></ruby><ruby>表現<rt>ひょうげん</rt></ruby>）を<ruby>選<rt>えら</rt></ruby>びましょう。',
    descEn: 'Listen to conversational sound changes and choose the original grammatical form.'
  },
  '例題3 音の高さや長さ': {
    code: '3',
    title: '3 <ruby>音<rt>おと</rt></ruby>の<ruby>高<rt>たか</rt></ruby>さや<ruby>長<rt>なが</rt></ruby>さに<ruby>注意<rt>ちゅうい</rt></ruby>する',
    descJp: 'イントネーションによって、<ruby>相手<rt>あいて</rt></ruby>の<ruby>話<rt>はなし</rt></ruby>に<ruby>同意<rt>どうい</rt></ruby>しているかどうかがわかることがあります。',
    descEn: 'In some cases whether or not there is agreement with what the interlocutor says is indicated by intonation.',
    tableHtml: `
<div class="mt-3 p-3 bg-stone-50 dark:bg-slate-900/50 rounded-xl border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-serif space-y-2">
  <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
    <span>【表現】<ruby>同意<rt>どうい</rt></ruby>しない・<ruby>断<rt>ことわ</rt></ruby>る・<ruby>残念<rt>ざんねん</rt></ruby>な<ruby>気持<rt>きも</rt></ruby>ち</span>
    <span class="text-[11px] text-stone-500 italic font-sans">(Do not agree / Refuse / Feel sorry)</span>
  </div>
  <div class="pl-2 space-y-1 text-slate-700 dark:text-slate-300">
    <div>・うーん／あー／えー</div>
    <div>・〇〇ねえ／〇〇かー／〇〇ですかあ？</div>
  </div>
  <div class="pt-2 border-t border-dashed border-stone-300 dark:border-stone-700 text-xs space-y-1">
    <div><span class="font-bold text-stone-500 font-sans">例1：</span>これにしたらどう？ → <b>うーん、そうだねえ。（同意しない）</b></div>
    <div><span class="font-bold text-stone-500 font-sans">例2：</span>あした７時に来てくれませんか。 → <b>あー、７時ですかー。／えー、７時ですかあ？（同意しない）</b></div>
  </div>
</div>`
  },
  '練習3 音の高さや長さに注意する': {
    code: '3',
    title: '3 <ruby>音<rt>おと</rt></ruby>の<ruby>高<rt>たか</rt></ruby>さや<ruby>長<rt>なが</rt></ruby>さに<ruby>注意<rt>ちゅうい</rt></ruby>する',
    descJp: 'イントネーションによって、<ruby>相手<rt>あいて</rt></ruby>の<ruby>話<rt>はなし</rt></ruby>に<ruby>同意<rt>どうい</rt></ruby>しているかどうかがわかることがあります。',
    descEn: 'In some cases whether or not there is agreement with what the interlocutor says is indicated by intonation.'
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

const SKILL_OVERVIEWS = {
  'skill-2': {
    numeral: 'II',
    titleHtml: '「<ruby>発話表現<rt>はつわひょうげん</rt></ruby>」のスキルを<ruby>学<rt>まな</rt></ruby>ぶ',
    headingHtml: '<ruby>問題形式<rt>もんだいけいしき</rt></ruby>と<ruby>内容<rt>ないよう</rt></ruby>',
    descriptionJp: '<ruby>絵<rt>え</rt></ruby>を<ruby>見<rt>み</rt></ruby>ながら<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>と<ruby>質問<rt>しつもん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>きます。それから、3つの<ruby>選択肢<rt>せんたくし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、やじるし（→）の<ruby>人<rt>ひと</rt></ruby>の<ruby>発話<rt>はつわ</rt></ruby>として<ruby>最<rt>もっと</rt></ruby>もよいものを<ruby>選<rt>えら</rt></ruby>びます。',
    descriptionEn: 'The problem is to listen to the explanation of the situational context and to the question while looking at a picture and then to listen to the three choices and select the one you think is best as an utterance of the person marked with an arrow.',
    steps: ['<ruby>絵<rt>え</rt></ruby>を<ruby>見<rt>み</rt></ruby>ながら<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>と<ruby>質問<rt>しつもん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', '3つの<ruby>選択肢<rt>せんたくし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', '<ruby>答<rt>こた</rt></ruby>えを<ruby>選<rt>えら</rt></ruby>ぶ'],
    imageSrc: '/images/shinkanzen_listening/skill-2/unit_overview.png',
    imageAlt: 'Textbook scene showing the person marked by an arrow',
  },
  'skill-3': {
    numeral: 'III',
    titleHtml: '「<ruby>即時応答<rt>そくじおうとう</rt></ruby>」のスキルを<ruby>学<rt>まな</rt></ruby>ぶ',
    headingHtml: '<ruby>問題形式<rt>もんだいけいしき</rt></ruby>と<ruby>内容<rt>ないよう</rt></ruby>',
    descriptionJp: '<ruby>質問<rt>しつもん</rt></ruby>、<ruby>報告<rt>ほうこく</rt></ruby>、<ruby>依頼<rt>いらい</rt></ruby>、あいさつなどの<ruby>短<rt>みじか</rt></ruby>い<ruby>文<rt>ぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いた<ruby>後<rt>あと</rt></ruby>、すぐにそれに<ruby>合<rt>あ</rt></ruby>う<ruby>答<rt>こた</rt></ruby>え<ruby>方<rt>かた</rt></ruby>を<ruby>考<rt>かんが</rt></ruby>えます。',
    descriptionEn: 'After you have listened to the short sentences consisting of questions, report statements, requests or greetings, you should think immediately of the way of answering them in a suitable manner.',
    steps: ['<ruby>短<rt>みじか</rt></ruby>い<ruby>文<rt>ぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', '3つの<ruby>選択肢<rt>せんたくし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', '<ruby>答<rt>こた</rt></ruby>えを<ruby>選<rt>えら</rt></ruby>ぶ'],
    points: [
      {
        jp: 'だれの<ruby>動作<rt>どうさ</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>す<ruby>表現<rt>ひょうげん</rt></ruby>かに<ruby>注意<rt>ちゅうい</rt></ruby>する',
        en: 'Pay attention to the expression that indicates who performs the action.',
      },
      {
        jp: '<ruby>敬語<rt>けいご</rt></ruby>の<ruby>表現<rt>ひょうげん</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>する',
        en: 'Pay attention to expressions that indicate honorifics.',
      },
      {
        jp: '<ruby>会話<rt>かいわ</rt></ruby>で<ruby>使<rt>つか</rt></ruby>われる<ruby>表現<rt>ひょうげん</rt></ruby>やあいさつの<ruby>表現<rt>ひょうげん</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>する',
        en: 'Pay attention to expressions that are used in colloquial language and expressions for greeting.',
      },
      {
        jp: '<ruby>間接的<rt>かんせつてき</rt></ruby>な<ruby>答<rt>こた</rt></ruby>え<ruby>方<rt>かた</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>する',
        en: 'Pay attention to ways of answering in an indirect manner.',
      },
    ],
  },
  'skill-4': {
    numeral: 'IV',
    titleHtml: '「<ruby>課題理解<rt>かだいりかい</rt></ruby>」のスキルを<ruby>学<rt>まな</rt></ruby>ぶ',
    headingHtml: '<ruby>問題形式<rt>もんだいけいしき</rt></ruby>と<ruby>内容<rt>ないよう</rt></ruby>',
    descriptionJp: 'まとまりのある<ruby>話<rt>はなし</rt></ruby>から<ruby>依頼<rt>いらい</rt></ruby>や<ruby>指示<rt>しじ</rt></ruby>、<ruby>提案<rt>ていあん</rt></ruby>などを<ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>り、これからするべきことを<ruby>理解<rt>りかい</rt></ruby>します。<ruby>選択肢<rt>せんたくし</rt></ruby>は<ruby>文字<rt>もじ</rt></ruby>または<ruby>絵<rt>え</rt></ruby>で<ruby>問題用紙<rt>もんだいようし</rt></ruby>に<ruby>印刷<rt>いんさつ</rt></ruby>されているので、それを<ruby>見<rt>み</rt></ruby>ながら<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>きます。',
    descriptionEn: 'The problem is to listen carefully and pick up the requests, instructions and the suggestions of a coherent conversation or spoken statement and to comprehend what should be done next. On the problem sheet, the choices are shown in written form or as illustrations. While looking at these, listen to what is being said.',
    steps: ['<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>と<ruby>質問文<rt>しつもんぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', '<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', 'もう<ruby>一度<rt>いちど</rt></ruby><ruby>質問文<rt>しつもんぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', '<ruby>選択肢<rt>せんたくし</rt></ruby>から<ruby>答<rt>こた</rt></ruby>えを<ruby>選<rt>えら</rt></ruby>ぶ'],
    points: [
      {
        jp: 'するべきことを<ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>る',
        en: 'Listen for what has to be done.',
      },
      {
        jp: '<ruby>指示<rt>しじ</rt></ruby>や<ruby>提案<rt>ていあん</rt></ruby>に<ruby>対<rt>たい</rt></ruby>して<ruby>同意<rt>どうい</rt></ruby>しているかどうかを<ruby>考<rt>かんが</rt></ruby>える',
        en: 'Consider whether or not the instruction or suggestion is assented to.',
      },
      {
        jp: 'するべきことがいくつかある<ruby>場合<rt>ばあい</rt></ruby>は、その<ruby>中<rt>なか</rt></ruby>で<ruby>優先<rt>ゆうせん</rt></ruby>することを<ruby>考<rt>かんが</rt></ruby>える',
        en: 'When there are many things that should be done, consider which takes precedence among them.',
      },
    ],
  },
  'skill-5': {
    numeral: 'V',
    titleHtml: '「ポイント<ruby>理解<rt>りかい</rt></ruby>」のスキルを<ruby>学<rt>まな</rt></ruby>ぶ',
    headingHtml: '<ruby>問題形式<rt>もんだいけいしき</rt></ruby>と<ruby>内容<rt>ないよう</rt></ruby>',
    descriptionJp: 'まとまりのある<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、<ruby>出来事<rt>できごと</rt></ruby>の<ruby>理由<rt>りゆう</rt></ruby>、<ruby>目的<rt>もくてき</rt></ruby>や<ruby>話<rt>はな</rt></ruby>し<ruby>手<rt>て</rt></ruby>の<ruby>気持<rt>きも</rt></ruby>ちなど、はじめに<ruby>質問文<rt>しつもんぶん</rt></ruby>で<ruby>指示<rt>しじ</rt></ruby>されたポイントを<ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>ります。<ruby>選択肢<rt>せんたくし</rt></ruby>は<ruby>印刷<rt>いんさつ</rt></ruby>されていて、<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く<ruby>前<rt>まえ</rt></ruby>に<ruby>読<rt>よ</rt></ruby>む<ruby>時間<rt>じかん</rt></ruby>があります。',
    descriptionEn: 'The problem is to listen to a coherent conversation or spoken statement and to catch the points indicated at the beginning in the question text, the reason for and the purpose of the event and the feelings of the speakers. The choices are printed and before listening to the conversation there will be time for reading them.',
    steps: ['<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>と<ruby>質問文<rt>しつもんぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', '<ruby>問題用紙<rt>もんだいようし</rt></ruby>にある<ruby>選択肢<rt>せんたくし</rt></ruby>を<ruby>読<rt>よ</rt></ruby>む', '<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', 'もう<ruby>一度<rt>いちど</rt></ruby><ruby>質問文<rt>しつもんぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く', '<ruby>選択肢<rt>せんたくし</rt></ruby>から<ruby>答<rt>こた</rt></ruby>えを<ruby>選<rt>えら</rt></ruby>ぶ'],
    points: [
      {
        jp: '<ruby>選択肢<rt>せんたくし</rt></ruby>と<ruby>同<rt>おな</rt></ruby>じ<ruby>言葉<rt>ことば</rt></ruby>が<ruby>出<rt>で</rt></ruby>てくる<ruby>部分<rt>ぶぶん</rt></ruby>に<ruby>特<rt>とく</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>して<ruby>聞<rt>き</rt></ruby>く',
        en: 'Listen carefully particularly for the part where a word that is the same as in the choices is used.',
      },
      {
        jp: '<ruby>答<rt>こた</rt></ruby>える<ruby>文<rt>ぶん</rt></ruby>で<ruby>言<rt>い</rt></ruby>いたいこと（<ruby>肯定的<rt>こうていてき</rt></ruby>か<ruby>否定的<rt>ひていてき</rt></ruby>か）を<ruby>考<rt>かんが</rt></ruby>える',
        en: 'Consider what the speaker wants to say in reply (affirmative or negative).',
      },
      {
        jp: '<ruby>追加情報<rt>ついかじょうほう</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>する',
        en: 'Pay attention to additional information.',
      },
    ],
  },
};


/**
 * Authentic Headphone Earphone Badge matching Shin Kanzen Master physical textbook:
 * Headband arc, two earpads, dotted halo, with Disc Letter (e.g. A) on top and Track No (e.g. 01) below.
 */
const HeadphoneBadge = ({ trackCode = "A-01", isPlaying = false, onClick, title, compact = false }) => {
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
      <div className={`relative flex items-center justify-center ${compact ? 'h-9 w-9 sm:h-10 sm:w-10' : 'w-11 h-11 sm:w-12 sm:h-12'}`}>
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-emerald-500/25 dark:bg-purple-400/35 animate-ping pointer-events-none" />
        )}
        <svg viewBox="0 0 60 60" className={`${compact ? 'h-9 w-9 sm:h-10 sm:w-10' : 'w-11 h-11 sm:w-12 sm:h-12'} text-[#1e293b] dark:text-slate-200 transition-colors`}>
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
  const [openMarkChoices, setOpenMarkChoices] = useState({});
  const [selectedSkillPartIndex, setSelectedSkillPartIndex] = useState(() => SKILL_OVERVIEWS[chapterId] ? -1 : 0);

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
  const skillOverview = SKILL_OVERVIEWS[chapterId];
  const hasSkillOverview = Boolean(skillOverview);

  const groupedSections = React.useMemo(() => {
    if (!isSkillChapter || !data?.questions) return [];
    const map = new Map();
    data.questions.forEach((q, originalIdx) => {
      const title = q.sectionTitle || '練習';
      const sectionKey = chapterId === 'skill-4' || chapterId === 'skill-5'
        ? `${title}::${q.trackId || q.audioSrc || originalIdx}`
        : title;
      if (!map.has(sectionKey)) {
        const firstHs = data.hotspots?.find(h => h.trackId === q.trackId) || data.hotspots?.find(h => h.audioSrc === q.audioSrc);
        map.set(sectionKey, {
          title,
          trackId: q.trackId,
          trackLabel: q.trackLabel || firstHs?.label,
          trackCode: q.trackCode || firstHs?.trackCode || firstHs?.label?.match(/\[(.*?)\]/)?.[1] || 'A-01',
          audioSrc: q.audioSrc || firstHs?.audioSrc,
          exerciseTitleHtml: q.exerciseTitleHtml,
          instruction: q.instruction || data.instruction,
          questions: []
        });
      }
      map.get(sectionKey).questions.push({ ...q, originalIdx });
    });
    return Array.from(map.values());
  }, [isSkillChapter, data, chapterId]);

  const skillPartGroups = React.useMemo(() => {
    const groups = [];

    groupedSections.forEach((section) => {
      const mainPartMatch = section.title.match(/^(?:練習|例題)?\s*(\d+)/);
      const mainPartNumber = mainPartMatch ? Number(mainPartMatch[1]) : null;
      const key = mainPartNumber === null ? `section-${section.title}` : `part-${mainPartNumber}`;
      let group = groups.find(item => item.key === key);

      if (!group) {
        group = {
          key,
          partNumber: mainPartNumber,
          label: mainPartNumber === null ? 'Confirmation' : `Part ${mainPartNumber}`,
          title: section.title,
          sections: [],
        };
        groups.push(group);
      }

      group.sections.push(section);
      if (group.sections.length > 1 && mainPartNumber !== null) {
        group.title = `練習${mainPartNumber}`;
      }
    });

    return groups;
  }, [groupedSections]);

  const showSkillOverview = hasSkillOverview && selectedSkillPartIndex === -1;
  const activeSkillPartIndex = selectedSkillPartIndex >= 0 && selectedSkillPartIndex < skillPartGroups.length
    ? selectedSkillPartIndex
    : 0;
  const activeSkillPart = skillPartGroups[activeSkillPartIndex];
  const visibleGroupedSections = !showSkillOverview ? activeSkillPart?.sections || [] : [];

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
    setOpenMarkChoices({});
    setLoading(true);
    setError(null);
    setShowScript(false);
    setShowVideo(false);
    setVideoState({ status: 'idle', url: null, message: null });
    setSelectedSkillPartIndex(SKILL_OVERVIEWS[chapterId] ? -1 : 0);

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
    const isBookFaithfulUnit2 = chapterId === 'skill-2';
    const chapterSectionNotices = chapterId === 'skill-3'
      ? SKILL_3_SECTION_NOTICES
      : chapterId === 'skill-4'
        ? SKILL_4_SECTION_NOTICES
        : chapterId === 'skill-5'
          ? SKILL_5_SECTION_NOTICES
          : SKILL_SECTION_NOTICES;
    const activeSkillPartNotice = activeSkillPart?.sections?.[0]
      ? chapterSectionNotices[activeSkillPart.sections[0].title]
      : null;
    const activeSkillPartTitleHtml = (activeSkillPartNotice?.title || activeSkillPart?.title || '')
      .replace(/^\s*\d+(?:-[A-Z])?\s*/, '');
    return (
      <div className="space-y-10 mb-8">
        {/* Authentic Unit Header for Skill Chapters */}
        {showSkillOverview && (
          <div data-skill-unit-header={chapterId} className="relative flex min-h-20 items-center justify-between overflow-hidden border-y border-stone-700 bg-stone-700 px-4 py-3 text-white shadow-sm sm:min-h-24 sm:px-7">
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
              <span className="shrink-0 font-serif text-3xl leading-none sm:text-4xl">{skillOverview.numeral}</span>
              <h2
                className="m-0 min-w-0 font-serif text-xl font-bold leading-tight tracking-wide text-white sm:text-3xl"
                dangerouslySetInnerHTML={{ __html: skillOverview.titleHtml }}
              />
            </div>

            <div className="relative ml-4 hidden h-14 w-16 shrink-0 sm:block" aria-hidden="true">
              <div className="absolute left-1 top-5 grid h-8 w-8 rotate-45 grid-cols-2 gap-0.5 border border-white/90 p-1">
                <span className="border border-white/80" />
                <span className="border border-white/80" />
                <span className="border border-white/80" />
                <span className="border border-white/80" />
              </div>
              <div className="absolute right-1 top-1 grid h-8 w-8 rotate-45 grid-cols-2 gap-0.5 border border-white/90 p-1">
                <span className="border border-white/80" />
                <span className="border border-white/80" />
                <span className="border border-white/80" />
                <span className="border border-white/80" />
              </div>
            </div>
          </div>
        )}

        {!hasSkillOverview && (
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
            </div>
          </div>
        )}

        {showSkillOverview && (
          <section
            data-skill-overview={chapterId}
            className="shinkanzen-listening-paper rounded-xl border border-[var(--color-border)] p-5 shadow-sm sm:p-7"
            aria-labelledby={`${chapterId}-overview-title`}
          >
            <h3
              id={`${chapterId}-overview-title`}
              className="m-0 font-serif text-2xl font-medium leading-tight text-slate-800 dark:text-slate-100 sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: skillOverview.headingHtml }}
            />

            <div className="mt-7 space-y-4">
              <p
                className="m-0 font-serif text-base leading-8 text-slate-800 dark:text-slate-200 sm:text-lg"
                dangerouslySetInnerHTML={{ __html: skillOverview.descriptionJp }}
              />
              <p lang="en" className="m-0 text-sm italic leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                {skillOverview.descriptionEn}
              </p>
            </div>

            <div className="mt-7 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
              {skillOverview.steps.map((step, stepIndex) => (
                <React.Fragment key={step}>
                  <div
                    className="flex-1 border border-stone-400 bg-white px-3 py-2 text-center font-serif text-sm text-slate-800 shadow-sm dark:border-stone-600 dark:bg-slate-900 dark:text-slate-100 sm:text-base"
                    dangerouslySetInnerHTML={{ __html: step }}
                  />
                  {stepIndex < skillOverview.steps.length - 1 && (
                    <span className="rotate-90 self-center text-xl text-stone-500 sm:rotate-0" aria-hidden="true">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {skillOverview.points?.length > 0 && (
              <div className="mt-7 border-t border-stone-300 pt-5 dark:border-stone-700">
                <h4 className="m-0 font-serif text-lg font-bold text-slate-800 dark:text-slate-100">
                  ◇<ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>りのポイント
                  <span className="ml-2 text-xs font-normal italic text-stone-500">Listening Points</span>
                </h4>
                <ol className="mt-4 space-y-3">
                  {skillOverview.points.map((point, pointIndex) => (
                    <li key={point.en} className="grid grid-cols-[auto_1fr] gap-x-3 border-b border-stone-200 pb-3 last:border-b-0 dark:border-stone-800">
                      <span className="font-serif text-base font-bold text-stone-500">{pointIndex + 1}</span>
                      <div>
                        <p
                          className="m-0 font-serif text-base text-slate-800 dark:text-slate-200"
                          dangerouslySetInnerHTML={{ __html: point.jp }}
                        />
                        <p className="m-0 mt-1 text-xs italic text-stone-500 sm:text-sm">{point.en}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {skillOverview.imageSrc && (
              <figure className="mx-auto mb-0 mt-7 max-w-xl">
                <img
                  src={resolvePublicUrl(skillOverview.imageSrc)}
                  alt={skillOverview.imageAlt}
                  className="block h-auto w-full border border-stone-400 bg-white"
                />
              </figure>
            )}
          </section>
        )}

        {hasSkillOverview && !showSkillOverview && activeSkillPart && (
          <div
            data-skill-part-banner={activeSkillPart.partNumber ?? activeSkillPart.key}
            className="relative flex min-h-16 items-center justify-between overflow-hidden border-y border-stone-600 bg-stone-600 px-4 py-2 text-white shadow-sm sm:min-h-20 sm:px-7"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)' }}
          >
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <span className="shrink-0 font-serif text-3xl leading-none text-white sm:text-4xl">
                {activeSkillPart.partNumber ?? activeSkillPart.label}
              </span>
              <div data-skill-part-title className="min-w-0 rounded-xl bg-white px-4 py-2 text-stone-800 shadow-sm sm:px-5">
                <h2
                  className="m-0 font-serif text-lg font-bold leading-tight tracking-wide sm:text-2xl"
                  dangerouslySetInnerHTML={{ __html: activeSkillPartTitleHtml }}
                />
              </div>
            </div>

            <div className="relative ml-4 hidden h-12 w-14 shrink-0 sm:block" aria-hidden="true">
              <div className="absolute left-1 top-4 grid h-7 w-7 rotate-45 grid-cols-2 gap-0.5 border border-white/90 p-1">
                <span className="border border-white/80" />
                <span className="border border-white/80" />
                <span className="border border-white/80" />
                <span className="border border-white/80" />
              </div>
              <div className="absolute right-1 top-1 grid h-7 w-7 rotate-45 grid-cols-2 gap-0.5 border border-white/90 p-1">
                <span className="border border-white/80" />
                <span className="border border-white/80" />
                <span className="border border-white/80" />
                <span className="border border-white/80" />
              </div>
            </div>
          </div>
        )}

        {groupedSections.length === 0 && data.hotspots?.length > 0 && (
          <div className="space-y-4">
            <div className="shinkanzen-listening-paper rounded-xl p-4 sm:p-5">
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 m-0">Unit audio</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1 mb-4">
                Verified CD2 tracks for this unit. Exercise text will be added only from the matching book pages.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {(data.hotspots || []).map(track => {
                  const isTrackPlaying = isPlaying && activeAudioSrc === track.audioSrc;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => switchTrack(track.audioSrc)}
                      className={`rounded-lg border px-3 py-2 text-left text-xs font-bold transition ${isTrackPlaying
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        : 'border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-emerald-500/50'}`}
                    >
                      {track.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Render Each Section */}
        {visibleGroupedSections.map((sec, secIdx) => {
          const notice = (chapterId === 'skill-4' || chapterId === 'skill-5') && secIdx > 0
            ? null
            : chapterSectionNotices[sec.title];
          const isTrackPlaying = isPlaying && activeAudioSrc === sec.audioSrc;
          const isSkill5MarkingSection = chapterId === 'skill-5' && /^[13]\s/.test(sec.title) && sec.questions.every(q => q.options?.length === 4);
          const rawExerciseTitle = chapterId === 'skill-4' || chapterId === 'skill-5'
            ? (sec.trackLabel || sec.title).replace(/\s*\[[^\]]+\]\s*$/, '')
            : sec.title;
          const normalizeSkill5ExerciseTitle = (title) => title
            .replace(/\s*\(\d+\)\s*$/, '')
            .replace(/^(確認問題)\s+\d+$/, '$1');
          const exerciseTitle = chapterId === 'skill-5'
            ? normalizeSkill5ExerciseTitle(rawExerciseTitle)
            : rawExerciseTitle;
          const previousSection = visibleGroupedSections[secIdx - 1];
          const previousRawExerciseTitle = previousSection
            ? (previousSection.trackLabel || previousSection.title).replace(/\s*\[[^\]]+\]\s*$/, '')
            : '';
          const isRepeatedSkill5ExerciseHeader = chapterId === 'skill-5' && secIdx > 0
            && normalizeSkill5ExerciseTitle(previousRawExerciseTitle) === exerciseTitle;
          const showExerciseHeader = !isRepeatedSkill5ExerciseHeader;
          const exerciseTitleHtml = sec.exerciseTitleHtml || (chapterId === 'skill-5'
            ? exerciseTitle
                .replace(/^例題/, '<ruby>例題<rt>れいだい</rt></ruby>')
                .replace(/^練習/, '<ruby>練習<rt>れんしゅう</rt></ruby>')
                .replace(/^確認問題/, '<ruby>確認問題<rt>かくにんもんだい</rt></ruby>')
            : exerciseTitle);
          const sectionInstructionHtml = isSkill5MarkingSection
            ? '<ruby>状況説明文<rt>じょうきょうせつめいぶん</rt></ruby>と<ruby>質問文<rt>しつもんぶん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いてから、<ruby>選択肢<rt>せんたくし</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んでください。それから<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、<ruby>答<rt>こた</rt></ruby>えになるものに○、ならないものに×を<ruby>書<rt>か</rt></ruby>いてください。'
            : sec.instruction;
          const isExampleSection = /例題/.test(exerciseTitle);
          const supplementalTrackAfterSection = chapterId === 'skill-4' && sec.trackCode === 'A28'
            ? data.hotspots?.find((hotspot) => hotspot.label?.includes('[A29]'))
            : null;
          
          // Determine section render mode
          const isTrueFalseSection = isSkill5MarkingSection || sec.questions.every(q =>
            q.options?.some(o => o.includes('○') || o.includes('×'))
          );

          // Unit 3 choices are heard in the audio, so the page shows only answer letters.
          const isBubbleLetterSection = !isTrueFalseSection && (
            chapterId === 'skill-3' || sec.title.includes('1-A')
          );
          const usesNumberedAudioChoices = chapterId === 'skill-3' && sec.questions.every(q =>
            q.options?.every((opt, optIdx) => new RegExp(`^${optIdx + 1}[.\\s]`).test(opt))
          );

          // Inline choice questions: For 1-B, 1-C, 2-1, and Unit 2 練習1
          const isInlineChoiceSection = !isTrueFalseSection && !isBubbleLetterSection && (
            sec.title.includes('1-B') ||
            sec.title.includes('1-C') ||
            sec.title.includes('2-1') ||
            (chapterId === 'skill-4' && sec.questions.every(q => q.options?.length === 2)) ||
            (sec.title.includes('練習1') && !sec.title.includes('1-A')) ||
            sec.questions.every(q => q.options?.length === 2 && (q.questionText?.includes('（') || q.questionText?.includes('(') || !q.questionText || q.questionText.includes('＿＿＿＿')))
          );

          return (
            <React.Fragment key={`${sec.title}-${sec.trackId || sec.audioSrc}`}>
            <div data-skill-section={sec.title} className="space-y-4">
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
                  {notice.audioTrackCodes?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {notice.audioTrackCodes.map((trackCode) => {
                        const track = data.hotspots?.find((hotspot) => hotspot.label?.includes(`[${trackCode}]`));
                        if (!track?.audioSrc) return null;
                        const isSupplementalTrackPlaying = isPlaying && activeAudioSrc === track.audioSrc;

                        return (
                          <div key={trackCode} className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white/70 px-3 py-2 dark:bg-slate-900/40">
                            <HeadphoneBadge
                              trackCode={trackCode}
                              isPlaying={isSupplementalTrackPlaying}
                              onClick={() => {
                                if (isSupplementalTrackPlaying) audioRef.current?.pause();
                                else switchTrack(track.audioSrc);
                              }}
                              title={`Play supplemental audio [${trackCode}]`}
                            />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{track.label}</span>
                          </div>
                        );
                      })}
                    </div>
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
                {showExerciseHeader && (
                <div className="shinkanzen-exercise-header-banner">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {isExampleSection ? (
                        <span className="shinkanzen-reidai-star-badge text-xl" aria-hidden="true">☆</span>
                      ) : (
                        <span className="shinkanzen-hatch-icon" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 m-0 flex items-center gap-2">
                        <span dangerouslySetInnerHTML={{ __html: exerciseTitleHtml }} />
                      </h3>
                      {sectionInstructionHtml && (
                        <p 
                          className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-serif mt-1 m-0 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: sectionInstructionHtml }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Single prominent Headphone Badge for this exercise */}
                  {chapterId !== 'skill-5' && (
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
                  )}
                </div>
                )}

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
                        const correctChoiceLabel = usesNumberedAudioChoices
                          ? String(correctIdx + 1)
                          : String.fromCharCode(97 + correctIdx);

                        return (
                          <div key={q.originalIdx} className="border-b last:border-b-0 border-stone-200/70 dark:border-stone-800/70 pb-2">
                            <div className="shinkanzen-bubble-row">
                              <span className="font-bold text-slate-800 dark:text-slate-200 font-serif w-8">
                                ({subNum})
                              </span>

                              <div className="shinkanzen-bubble-group">
                                <span>(</span>
                                {q.options?.map((opt, optIdx) => {
                                  const choiceLabel = usesNumberedAudioChoices
                                    ? String(optIdx + 1)
                                    : String.fromCharCode(97 + optIdx);
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
                                        title={chapterId === 'skill-3' ? `Option ${choiceLabel}` : opt}
                                        aria-label={chapterId === 'skill-3' ? `Option ${choiceLabel}` : undefined}
                                      >
                                        {choiceLabel}
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
                                    {userAnswer === correctIdx + 1 ? '✓ 正解' : `✗ (正解: ${correctChoiceLabel})`}
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
                ) : isInlineChoiceSection ? (
                  /* Sub-renderer B: Inline Choice Mode (e.g. 練習1-B, 1-C, 2-1, and Unit 2 練習1) */
                  <div className="space-y-4">
                    {/* (例) Row in the textbook for 1-B */}
                    {sec.title.includes('1-B') && (
                      <div className="shinkanzen-example-row flex items-center justify-between">
                        <div className="flex items-center flex-wrap gap-1.5 text-sm sm:text-base font-serif">
                          <span className="font-bold text-stone-600 dark:text-stone-300 font-serif w-8">
                            （例）
                          </span>
                          <span>これから</span>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-stone-100/90 dark:bg-slate-800/90 border border-stone-300 dark:border-stone-700 shadow-2xs mx-1">
                            <span className="text-stone-400 font-bold font-serif select-none">(</span>
                            <span className="shinkanzen-inline-choice-btn correct">
                              <span className="font-bold font-sans mr-1">ⓐ</span>
                              <span>美容院</span>
                            </span>
                            <span className="text-stone-400 font-bold font-serif select-none px-0.5">・</span>
                            <span className="shinkanzen-inline-choice-btn dimmed">
                              <span className="font-bold font-sans mr-1">b</span>
                              <span>病院</span>
                            </span>
                            <span className="text-stone-400 font-bold font-serif select-none">)</span>
                          </span>
                          <span>へ行きます。</span>
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 font-sans italic shrink-0">
                          例題 (Example) : ⓐ 美容院 が正解
                        </div>
                      </div>
                    )}

                    {/* (例) Row in the textbook for 2-1 */}
                    {sec.title.includes('2-1') && (
                      <div className="shinkanzen-example-row flex items-center justify-between">
                        <div className="flex items-center flex-wrap gap-1.5 text-sm sm:text-base font-serif">
                          <span className="font-bold text-stone-600 dark:text-stone-300 font-serif w-8">
                            （例）
                          </span>
                          <span>この本、</span>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-stone-100/90 dark:bg-slate-800/90 border border-stone-300 dark:border-stone-700 shadow-2xs mx-1">
                            <span className="text-stone-400 font-bold font-serif select-none">(</span>
                            <span className="shinkanzen-inline-choice-btn dimmed">
                              <span className="font-bold font-sans mr-1">a</span>
                              <span>読んでみる</span>
                            </span>
                            <span className="text-stone-400 font-bold font-serif select-none px-0.5">・</span>
                            <span className="shinkanzen-inline-choice-btn correct">
                              <span className="font-bold font-sans mr-1">ⓑ</span>
                              <span>読んでいる</span>
                            </span>
                            <span className="text-stone-400 font-bold font-serif select-none">)</span>
                          </span>
                          <span>？</span>
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 font-sans italic shrink-0">
                          例題 (Example) : ⓑ 読んでいる が正解
                        </div>
                      </div>
                    )}

                    {/* Questions */}
                    <div className="space-y-3">
                      {sec.questions.map((q, qSubIdx) => {
                        const qKey = `q-${q.originalIdx}`;
                        const userAnswer = answers[qKey];
                        const isRevealed = revealed[qKey];
                        const correctIdx = q.correctOption?.index;
                        const subNum = q.badge?.match(/\((\d+)\)/)?.[1] || (qSubIdx + 1);
                        const isDetailOpen = expandedDetails[qKey] ?? isRevealed;

                        // Parse questionText into prefix and suffix
                        let prefix = '';
                        let suffix = '';
                        const qText = q.questionText || '';

                        const blankMatch = qText.match(/^(.*?)[（\(][＿_—\-]+[）\)](.*)$/);
                        const parenMatch = qText.match(/^(.*?)[（\(][^）\)]+[）\)](.*)$/);

                        if (blankMatch) {
                          prefix = blankMatch[1];
                          suffix = blankMatch[2];
                        } else if (parenMatch && !qText.includes('最初の言葉')) {
                          prefix = parenMatch[1];
                          suffix = parenMatch[2];
                        } else if (qText && !qText.includes('どちらですか') && !qText.includes('どちらの意味ですか') && !qText.includes('言っていますか')) {
                          prefix = qText;
                          suffix = '';
                        }

                        if (chapterId === 'skill-4') {
                          prefix = '';
                          suffix = '';
                        }

                        // Whether to show letter tags (a, b) inside the buttons
                        const showLetter = sec.title.includes('1-B') || sec.title.includes('1-C') || sec.title.includes('2-1') || q.options?.every(o => /^[a-z]\./i.test(o));

                        return (
                          <div key={q.originalIdx} className="pb-3 border-b last:border-b-0 border-stone-200/70 dark:border-stone-800/70">
                            <div className="flex flex-wrap items-center justify-between gap-2.5 py-1.5">
                              <div className="flex items-center flex-wrap gap-1.5 text-sm sm:text-base font-serif leading-loose">
                                <span className="font-bold text-slate-800 dark:text-slate-200 font-serif w-8 shrink-0">
                                  ({subNum})
                                </span>
                                {chapterId === 'skill-5' && qSubIdx === 0 && (
                                  <HeadphoneBadge
                                    compact
                                    trackCode={sec.trackCode}
                                    isPlaying={isTrackPlaying}
                                    onClick={() => {
                                      if (sec.audioSrc) {
                                        if (isTrackPlaying) audioRef.current?.pause();
                                        else switchTrack(sec.audioSrc);
                                      }
                                    }}
                                    title={`Play Exercise Audio [${sec.trackCode}]`}
                                  />
                                )}

                                {prefix && (
                                  <span 
                                    className="text-slate-800 dark:text-slate-200 font-bold"
                                    dangerouslySetInnerHTML={{ __html: prefix }}
                                  />
                                )}

                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-stone-100/90 dark:bg-slate-800/90 border border-stone-300 dark:border-stone-700 shadow-2xs mx-1">
                                  <span className="text-stone-400 font-bold font-serif select-none">(</span>
                                  {q.options?.map((opt, optIdx) => {
                                    const letter = String.fromCharCode(97 + optIdx);
                                    const isSelected = userAnswer === optIdx + 1;
                                    const isCorrect = optIdx === correctIdx;
                                    const cleanText = opt.replace(/^[a-z][\.\s　]*/i, '').trim();

                                    let btnClass = "shinkanzen-inline-choice-btn";
                                    if (isRevealed) {
                                      if (isCorrect) btnClass += " correct";
                                      else if (isSelected && !isCorrect) btnClass += " wrong";
                                      else btnClass += " dimmed";
                                    } else if (isSelected) {
                                      btnClass += " selected";
                                    }

                                    return (
                                      <React.Fragment key={optIdx}>
                                        {optIdx > 0 && (
                                          <span className="text-stone-400 font-bold font-serif select-none px-0.5">・</span>
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => handleSelectAnswer(qKey, optIdx + 1)}
                                          disabled={isRevealed}
                                          className={btnClass}
                                        >
                                          {showLetter && (
                                            <span className="font-bold font-sans mr-1">{letter}</span>
                                          )}
                                          <span>{cleanText}</span>
                                        </button>
                                      </React.Fragment>
                                    );
                                  })}
                                  <span className="text-stone-400 font-bold font-serif select-none">)</span>
                                </span>

                                {suffix && (
                                  <span 
                                    className="text-slate-800 dark:text-slate-200 font-bold"
                                    dangerouslySetInnerHTML={{ __html: suffix }}
                                  />
                                )}
                              </div>

                              {/* Status indicator and drawer toggle */}
                              <div className="ml-auto flex items-center gap-2 shrink-0">
                                {isRevealed && (
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                    userAnswer === correctIdx + 1
                                      ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10'
                                      : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                                  }`}>
                                    {userAnswer === correctIdx + 1 
                                      ? '✓ 正解' 
                                      : `✗ (正解: ${q.options?.[correctIdx]?.replace(/^[a-z][\.\s　]*/i, '') || String.fromCharCode(97 + correctIdx)})`}
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
                              <div className="mt-2.5 ml-8 sm:ml-10 p-3 sm:p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/90 dark:bg-slate-900/60 text-xs sm:text-sm space-y-2 animate-fadeIn">
                                {q.context && (
                                  <div className="font-serif text-slate-700 dark:text-slate-300 font-medium pb-1 border-b border-stone-200/60 dark:border-stone-800/60">
                                    <span className="text-stone-500 text-xs mr-1 font-sans">【音声スクリプト】</span>
                                    <span dangerouslySetInnerHTML={{ __html: q.context }} />
                                  </div>
                                )}
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
                ) : isTrueFalseSection ? (
                  /* Sub-renderer C: Situation Utterances with [ ○ ] [ × ] (e.g. 練習2-A, 練習2-B) */
                  <div className="space-y-4">
                    {(() => {
                      const situationMap = new Map();
                      sec.questions.forEach(q => {
                        const sitMatch = q.badge?.match(/\((\d+)-(\d+)\)/);
                        const printedNumberMatch = q.badge?.match(/\((\d+)\)/);
                        const sitNum = sitMatch ? sitMatch[1] : (isSkill5MarkingSection ? printedNumberMatch?.[1] || '1' : '1');
                        const uttNum = sitMatch ? sitMatch[2] : '1';
                        if (!situationMap.has(sitNum)) {
                          situationMap.set(sitNum, {
                            sitNum,
                            context: isSkill5MarkingSection ? '' : q.context,
                            hideContext: isSkill5MarkingSection,
                            flat: q.flatTrueFalse,
                            utterances: []
                          });
                        }
                        if (isSkill5MarkingSection) {
                          q.options.forEach((option, optionIndex) => {
                            const isAnswer = optionIndex === q.correctOption?.index;
                            situationMap.get(sitNum).utterances.push({
                              ...q,
                              originalIdx: `${q.originalIdx}-${optionIndex}`,
                              questionText: option,
                              options: ['○', '×'],
                              correctOption: { index: isAnswer ? 0 : 1, text: isAnswer ? '○' : '×' },
                              uttNum: String(optionIndex + 1),
                            });
                          });
                        } else {
                          situationMap.get(sitNum).utterances.push({ ...q, uttNum });
                        }
                      });

                      return Array.from(situationMap.values()).map((sit, sitIdx) => (
                        <div
                          key={sitIdx}
                          className={chapterId === 'skill-5'
                            ? 'space-y-1.5 py-2 sm:py-3'
                            : 'shinkanzen-situation-card'}
                        >
                          {chapterId === 'skill-5' && sit.flat && (
                            <div className="flex justify-end pr-[18%] sm:pr-[30%]">
                              <HeadphoneBadge
                                compact
                                trackCode={sec.trackCode}
                                isPlaying={isTrackPlaying}
                                onClick={() => {
                                  if (sec.audioSrc) {
                                    if (isTrackPlaying) audioRef.current?.pause();
                                    else switchTrack(sec.audioSrc);
                                  }
                                }}
                                title={`Play Exercise Audio [${sec.trackCode}]`}
                              />
                            </div>
                          )}
                          {!sit.flat && (
                            <div className={chapterId === 'skill-5' ? 'mb-1 flex items-center gap-1.5' : 'mb-3 flex items-center justify-between gap-3 border-b border-stone-200 pb-2 dark:border-stone-700'}>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 font-serif">
                                  ({sit.sitNum})
                                </span>
                                {isSkill5MarkingSection && (
                                  <HeadphoneBadge
                                    compact
                                    trackCode={sec.trackCode}
                                    isPlaying={isTrackPlaying}
                                    onClick={() => {
                                      if (sec.audioSrc) {
                                        if (isTrackPlaying) audioRef.current?.pause();
                                        else switchTrack(sec.audioSrc);
                                      }
                                    }}
                                    title={`Play Exercise Audio [${sec.trackCode}]`}
                                  />
                                )}
                                {!isBookFaithfulUnit2 && !sit.hideContext && (
                                  <span className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serif font-medium">
                                    {sit.context || '状況を聞いて判断してください。'}
                                  </span>
                                )}
                              </div>
                              {isSkill5MarkingSection && chapterId !== 'skill-5' && (
                                <HeadphoneBadge
                                  trackCode={sec.trackCode}
                                  isPlaying={isTrackPlaying}
                                  onClick={() => {
                                    if (sec.audioSrc) {
                                      if (isTrackPlaying) audioRef.current?.pause();
                                      else switchTrack(sec.audioSrc);
                                    }
                                  }}
                                  title={`Play Exercise Audio [${sec.trackCode}]`}
                                />
                              )}
                            </div>
                          )}

                          <div className="space-y-2.5">
                            {sit.utterances.map((u, uIdx) => {
                              const qKey = `q-${u.originalIdx}`;
                              const userAnswer = answers[qKey];
                              const isRevealed = revealed[qKey];
                              const isMarkChoiceOpen = openMarkChoices[qKey];
                              const correctIdx = u.correctOption?.index;
                              const cleanUttText = u.questionText?.replace(/^発話\s*\d+：/, '') || u.questionText;

                              return (
                                <div key={uIdx} className={chapterId === 'skill-5' ? 'py-0.5' : 'p-2 rounded-lg bg-stone-50/60 dark:bg-slate-900/40 border border-stone-200/50 dark:border-stone-800'}>
                                  <div className={chapterId === 'skill-5' ? 'grid grid-cols-[1.75rem_minmax(0,1fr)_3.5rem] items-center gap-x-1.5 sm:grid-cols-[2.5rem_minmax(0,28rem)_4.5rem] sm:gap-x-2' : 'flex flex-col sm:flex-row sm:items-center justify-between gap-2'}>
                                    <div className={chapterId === 'skill-5' ? 'contents' : 'flex items-start gap-2 text-xs sm:text-sm font-serif'}>
                                      <span className={chapterId === 'skill-5' ? 'font-serif text-sm font-medium text-slate-800 dark:text-slate-200' : 'font-bold text-stone-500 shrink-0 mt-0.5'}>
                                        {u.uttNum}{isBookFaithfulUnit2 ? '' : '.'}
                                      </span>
                                      {!isBookFaithfulUnit2 && (
                                        <span
                                          className={chapterId === 'skill-5' ? 'min-w-0 font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200 sm:text-base' : 'text-slate-800 dark:text-slate-200 leading-relaxed'}
                                          dangerouslySetInnerHTML={{ __html: cleanUttText }}
                                        />
                                      )}
                                    </div>

                                    {chapterId === 'skill-5' ? (
                                      <div className="flex min-h-8 w-14 shrink-0 items-center justify-center gap-0.5 font-serif text-sm sm:min-h-9 sm:w-16 sm:text-base">
                                        <span aria-hidden="true">（</span>
                                        {isRevealed ? (
                                          <span className={`text-lg font-black ${userAnswer === 1 ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>
                                            {userAnswer === 1 ? '○' : '×'}
                                          </span>
                                        ) : isMarkChoiceOpen ? (
                                          <>
                                            <button
                                              type="button"
                                              onClick={() => handleSelectAnswer(qKey, 1)}
                                              className="rounded px-1.5 text-lg font-black text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                                              aria-label="Select circle"
                                            >
                                              ○
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleSelectAnswer(qKey, 2)}
                                              className="rounded px-1.5 text-lg font-black text-rose-600 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:text-rose-300 dark:hover:bg-rose-950/40"
                                              aria-label="Select cross"
                                            >
                                              ×
                                            </button>
                                          </>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={() => setOpenMarkChoices(prev => ({ ...prev, [qKey]: true }))}
                                            className="h-7 min-w-8 rounded text-stone-400 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:hover:bg-slate-800"
                                            aria-label="Open circle or cross choices"
                                          >
                                            &nbsp;
                                          </button>
                                        )}
                                        <span aria-hidden="true">）</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                        <button
                                          type="button"
                                          onClick={() => handleSelectAnswer(qKey, 1)}
                                          disabled={isRevealed}
                                          className={`shinkanzen-tf-btn ${isRevealed ? (correctIdx === 0 ? 'correct' : userAnswer === 1 ? 'wrong' : 'dimmed') : userAnswer === 1 ? 'selected' : ''}`}
                                          title="状況に合う (○)"
                                        >
                                          ○
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleSelectAnswer(qKey, 2)}
                                          disabled={isRevealed}
                                          className={`shinkanzen-tf-btn ${isRevealed ? (correctIdx === 1 ? 'correct' : userAnswer === 2 ? 'wrong' : 'dimmed') : userAnswer === 2 ? 'selected' : ''}`}
                                          title="状況に合わない (×)"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    )}
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
                      const presentation = parseQuestionPresentation(q);

                      return (
                        <div key={q.originalIdx} className="p-4 sm:p-5 rounded-xl border border-[var(--color-border)] bg-transparent space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 font-serif">
                                ({subNum})
                              </span>
                              {chapterId === 'skill-5' && qSubIdx === 0 && (
                                <HeadphoneBadge
                                  compact
                                  trackCode={sec.trackCode}
                                  isPlaying={isTrackPlaying}
                                  onClick={() => {
                                    if (sec.audioSrc) {
                                      if (isTrackPlaying) audioRef.current?.pause();
                                      else switchTrack(sec.audioSrc);
                                    }
                                  }}
                                  title={`Play Exercise Audio [${sec.trackCode}]`}
                                />
                              )}
                              <div className="space-y-1">
                                {!isBookFaithfulUnit2 && presentation.context && (
                                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-serif italic m-0 whitespace-pre-line">
                                    {presentation.context}
                                  </p>
                                )}
                                {!isBookFaithfulUnit2 && (
                                  <p
                                    className="text-sm sm:text-base font-serif font-bold text-slate-800 dark:text-slate-100 m-0 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: presentation.questionText }}
                                  />
                                )}
                              </div>
                            </div>
                            {isRepeatedSkill5ExerciseHeader && chapterId !== 'skill-5' && (
                              <HeadphoneBadge
                                trackCode={sec.trackCode}
                                isPlaying={isTrackPlaying}
                                onClick={() => {
                                  if (sec.audioSrc) {
                                    if (isTrackPlaying) audioRef.current?.pause();
                                    else switchTrack(sec.audioSrc);
                                  }
                                }}
                                title={`Play Exercise Audio [${sec.trackCode}]`}
                              />
                            )}
                          </div>

                          {presentation.illustrationSrc && (
                            <div className="p-2 sm:p-3 bg-transparent rounded-xl border border-[var(--color-border)] text-center">
                              <img 
                                src={resolvePublicUrl(presentation.illustrationSrc)}
                                alt={presentation.illustrationAlt}
                                className="max-h-64 mx-auto object-contain drop-shadow-sm rounded-lg"
                              />
                              <p className="hidden">
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
                              const optionNumber = String(oIdx + 1);
                              const optionPrefixPattern = new RegExp(`^${optionNumber}(?:[.\\s\\u3000]+|(?=[\\uFF08(]))`);
                              const cleanOpt = opt.trim() === optionNumber
                                ? ''
                                : opt.replace(optionPrefixPattern, '').trim();
                              const visibleOpt = isBookFaithfulUnit2 ? String(oIdx + 1) : cleanOpt;

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
                                      <span dangerouslySetInnerHTML={{ __html: visibleOpt }} />
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
            {supplementalTrackAfterSection?.audioSrc && (
              <div
                data-skill-supplemental-track="A29"
                className="shinkanzen-listening-paper rounded-xl p-4 sm:p-6"
              >
                <div className="shinkanzen-exercise-header-banner">
                  <div className="flex items-start gap-3">
                    <span className="shinkanzen-hatch-icon mt-1" />
                    <h3 className="m-0 text-lg font-black text-slate-900 dark:text-slate-100 sm:text-xl">
                      {supplementalTrackAfterSection.label.replace(/\s*\[[^\]]+\]\s*$/, '')}
                    </h3>
                  </div>
                  <HeadphoneBadge
                    trackCode="A29"
                    isPlaying={isPlaying && activeAudioSrc === supplementalTrackAfterSection.audioSrc}
                    onClick={() => {
                      if (isPlaying && activeAudioSrc === supplementalTrackAfterSection.audioSrc) audioRef.current?.pause();
                      else switchTrack(supplementalTrackAfterSection.audioSrc);
                    }}
                    title="Play supplemental audio [A29]"
                  />
                </div>
              </div>
            )}
            </React.Fragment>
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
              aria-label="Select unit"
              className="w-full sm:w-auto max-w-full bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-xs font-bold py-1.5 px-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 shadow-sm"
            >
              {partChapters.map(ch => (
                <option key={ch.id} value={ch.id}>
                  {MONDAI_NAMES[ch.id] || ch.rawTitle}
                </option>
              ))}
            </select>

            {isSkillChapter && groupedSections.length > 0 && (
              <select
                key={`part-selector-${chapterId}`}
                value={showSkillOverview ? -1 : activeSkillPartIndex}
                onChange={(e) => setSelectedSkillPartIndex(Number(e.target.value))}
                aria-label="Select part"
                className="w-full sm:w-auto max-w-full bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-xs font-bold py-1.5 px-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 shadow-sm"
              >
                {hasSkillOverview && <option value={-1}>Introduction</option>}
                {skillPartGroups.map((part, partIndex) => (
                  <option key={part.key} value={partIndex}>
                    {part.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* ================= AUTHENTIC SHIN KANZEN PART BANNER ================= */}
        {!hasSkillOverview && (
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
        )}

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

                        // Strip only the current choice label, preserving numeric answer content.
                        const optionNumber = String(optIdx + 1);
                        const optionPrefixPattern = new RegExp(`^${optionNumber}(?:[.\\s\\u3000]+|(?=[\\uFF08(]))`);
                        const cleanOptText = optText.trim() === optionNumber
                          ? ''
                          : optText.replace(optionPrefixPattern, '').trim();

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
