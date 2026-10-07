export const SKILL_4_SECTION_NOTICES = {
  '1 するべきことを考える': {
    code: '1',
    title: '<ruby>するべきこと<rt>するべきこと</rt></ruby>を<ruby>考<rt>かんが</rt></ruby>える',
    descJp: '話の中に依頼や指示、提案、申し出などを表す表現が出てきたら、するべきことかもしれないので注意します。',
    descEn: 'Be mindful that expressions indicating a request, instruction, suggestion, or offer may imply that some action should be done.',
    tableHtml: `
      <div class="space-y-4 text-sm text-slate-800 dark:text-slate-200">
        <section>
          <h5 class="mb-2 font-bold text-slate-900 dark:text-slate-100">表現 <span class="ml-2 text-xs font-normal italic text-stone-500">Expressions that signal an action</span></h5>
          <div class="overflow-x-auto rounded-lg border border-stone-300 dark:border-stone-700">
            <table class="w-full border-collapse bg-white/70 text-left dark:bg-slate-900/40">
              <thead>
                <tr class="bg-stone-100 dark:bg-slate-800">
                  <th class="border-b border-stone-300 px-3 py-2 dark:border-stone-700">種類</th>
                  <th class="border-b border-stone-300 px-3 py-2 dark:border-stone-700">主な表現</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="border-b border-stone-200 px-3 py-2 align-top dark:border-stone-800">依頼・指示<br/><span class="text-xs font-normal italic text-stone-500">Request / Instruction</span></th>
                  <td class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">（悪いんだけど／すみませんが／申し訳ないんですが）<br/>～てくれない？／～ていただけますか／～てもらえる？</td>
                </tr>
                <tr>
                  <th class="border-b border-stone-200 px-3 py-2 align-top dark:border-stone-800">提案<br/><span class="text-xs font-normal italic text-stone-500">Suggestion</span></th>
                  <td class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">～てみたら／～たらどう</td>
                </tr>
                <tr>
                  <th class="border-b border-stone-200 px-3 py-2 align-top dark:border-stone-800">誘い・提案<br/><span class="text-xs font-normal italic text-stone-500">Invitation / Suggestion</span></th>
                  <td class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">～ましょうか／～ませんか</td>
                </tr>
                <tr>
                  <th class="px-3 py-2 align-top">申し出<br/><span class="text-xs font-normal italic text-stone-500">Offer</span></th>
                  <td class="px-3 py-2">～ましょうか／～ておこうか／～ますよ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <p class="leading-7">上のような表現に対して、同意する表現で答えていればするべきこと、同意しない表現で答えていればしなくてもいいことになります。</p>
        <p class="text-xs italic leading-6 text-stone-500">An agreeing reply means the suggested action should be done. A disagreeing reply means it need not be done.</p>

        <div class="overflow-x-auto rounded-lg border border-stone-300 dark:border-stone-700">
          <table class="w-full border-collapse bg-white/70 text-center dark:bg-slate-900/40">
            <thead>
              <tr class="bg-stone-100 dark:bg-slate-800">
                <th class="border-b border-r border-stone-300 px-3 py-2 dark:border-stone-700">同意する<br/><span class="text-xs font-normal italic text-stone-500">Agree</span></th>
                <th class="border-b border-stone-300 px-3 py-2 dark:border-stone-700">同意しない<br/><span class="text-xs font-normal italic text-stone-500">Do not agree</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-r border-stone-300 px-3 py-3 leading-7 dark:border-stone-700">うん／いいね／そうだね／よろしく／<br/>わかった／お願い／頼むね</td>
                <td class="px-3 py-3 leading-7">うーん／そうかな／それはちょっと／<br/>それはどうかな／そのまま（にして）</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section>
          <h5 class="mb-2 font-bold text-slate-900 dark:text-slate-100">するべきことを聞き取る手がかり <span class="ml-2 text-xs font-normal italic text-stone-500">Additional clues</span></h5>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg border border-stone-300 bg-white/70 p-3 dark:border-stone-700 dark:bg-slate-900/40">
              <p class="mb-1 font-bold">するべきこと</p>
              <p class="leading-7">～なきゃ／～なくちゃ／～ないと／～が要る／必要／～たほうがいい</p>
            </div>
            <div class="rounded-lg border border-stone-300 bg-white/70 p-3 dark:border-stone-700 dark:bg-slate-900/40">
              <p class="mb-1 font-bold">しなくてもいいこと</p>
              <p class="leading-7">～（は）いい／要らない／大丈夫／～なくてもいい</p>
            </div>
          </div>
          <p class="mt-3 leading-7">もう～てある／もう～ている／（昨日／さっき）～た、という表現は、すでに終わっていることを示します。</p>
          <p class="mt-3 leading-7">するべきかどうかについて意見を言うとき、「～んじゃない？」を使うことがあります。文の終わりのイントネーションと、相手が同意しているかどうかに注意します。</p>
          <p class="text-xs italic leading-6 text-stone-500">The phrase ending in this pattern states an opinion. Pay attention to its final intonation and whether the other speaker agrees.</p>
        </section>
      </div>
    `,
  },
  '2 最初にすることを考える': {
    code: '2',
    title: '<ruby>最初<rt>さいしょ</rt></ruby>にすることを<ruby>考<rt>かんが</rt></ruby>える',
    descJp: '質問で「まず何をするか」と聞いている場合は、「最初にすること」や「する順番」を表す表現に注意します。',
    descEn: 'When you hear the question "What will you do first?", pay attention to expressions indicating what is done first and the order of actions.',
    tableHtml: `
      <div class="overflow-x-auto rounded-lg border border-stone-300 text-sm dark:border-stone-700">
        <table class="w-full border-collapse bg-white/70 text-left dark:bg-slate-900/40">
          <thead>
            <tr class="bg-stone-100 dark:bg-slate-800">
              <th class="border-b border-stone-300 px-3 py-2 dark:border-stone-700">意味</th>
              <th class="border-b border-stone-300 px-3 py-2 dark:border-stone-700">表現</th>
              <th class="border-b border-stone-300 px-3 py-2 dark:border-stone-700">English</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">最初にすること</th>
              <td class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">まず／最初に／はじめに</td>
              <td class="border-b border-stone-200 px-3 py-2 italic text-stone-500 dark:border-stone-800">Doing first</td>
            </tr>
            <tr>
              <th class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">早くすること</th>
              <td class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">先に／今すぐ／すぐに／急いで</td>
              <td class="border-b border-stone-200 px-3 py-2 italic text-stone-500 dark:border-stone-800">Doing quickly</td>
            </tr>
            <tr>
              <th class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">後ですること</th>
              <td class="border-b border-stone-200 px-3 py-2 dark:border-stone-800">後で／最後に／～は後でいい</td>
              <td class="border-b border-stone-200 px-3 py-2 italic text-stone-500 dark:border-stone-800">Doing later</td>
            </tr>
            <tr>
              <th class="px-3 py-2 align-top">する順番</th>
              <td class="px-3 py-2 leading-7">XでからY／Xの後でY／XたらY<br/>X。それからY／Yの前にX</td>
              <td class="px-3 py-2 italic text-stone-500">Order of doing</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  },
  '確認問題': {
    code: '確認',
    title: '<ruby>確認問題<rt>かくにんもんだい</rt></ruby>（課題理解）',
    descJp: 'まず質問を聞いてください。それから話を聞いて、1から4の中から、最もよいものを1つ選んでください。',
    descEn: 'Listen to the question first. Then listen to the conversation and choose the best answer from choices 1 to 4.',
    audioTrackCodes: ['A44'],
  },
};
