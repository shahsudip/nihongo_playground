export const SKILL_3_SECTION_NOTICES = {
  '練習1-A 敬語': {
    code: '1-A',
    title: '<ruby>敬語<rt>けいご</rt></ruby>',
    descJp: '敬語を使う会話では、敬語の意味とだれの動作かに注意します。',
    descEn: 'In conversation using honorifics you should pay attention to the meaning of honorifics and to who performs the action.',
    tableHtml: `
<div class="mt-4 space-y-4">
  <div class="shinkanzen-textbook-table-wrapper">
    <table class="shinkanzen-textbook-table">
      <thead><tr><th>だれの動作か</th><th>一般的な形</th></tr></thead>
      <tbody>
        <tr><td class="font-bold">聞く人の動作<br><span class="text-xs font-normal italic text-stone-500">Respectful language</span></td><td>お＋動詞のます形＋になる<br>お＋動詞のます形＋ください<br>お＋動詞のます形＋だ<br>〜（ら）れる<br>〜ていただく</td></tr>
        <tr><td class="font-bold">話す人の動作<br><span class="text-xs font-normal italic text-stone-500">Humble language</span></td><td>お＋動詞のます形＋する<br>〜（さ）せていただく</td></tr>
      </tbody>
    </table>
  </div>
  <div class="shinkanzen-textbook-table-wrapper">
    <table class="shinkanzen-textbook-table">
      <thead><tr><th>普通の動詞</th><th>聞く人の動作</th><th>話す人の動作</th></tr></thead>
      <tbody>
        <tr><td>する</td><td>なさいます</td><td>いたします</td></tr>
        <tr><td>いる</td><td>いらっしゃいます</td><td>おります</td></tr>
        <tr><td>行く・来る</td><td>おいでになります</td><td>まいります・うかがいます</td></tr>
        <tr><td>聞く</td><td>お聞きになります</td><td>うかがいます</td></tr>
        <tr><td>見る</td><td>ご覧になります</td><td>拝見します</td></tr>
        <tr><td>言う</td><td>おっしゃいます</td><td>申し上げます</td></tr>
        <tr><td>食べる・飲む</td><td>召し上がります</td><td>いただきます</td></tr>
        <tr><td>もらう</td><td>お受けになります など</td><td>いただきます</td></tr>
        <tr><td>くれる・あげる</td><td>くださいます</td><td>さしあげます</td></tr>
        <tr><td>知っている</td><td>ご存じです</td><td>存じています</td></tr>
        <tr><td>会う</td><td>お会いになります</td><td>お目にかかります</td></tr>
      </tbody>
    </table>
  </div>
  <div class="rounded-lg border border-stone-300 p-3 text-sm dark:border-stone-700">
    <p class="m-0 font-serif">丁寧な会話では、特別な疑問詞が使われることがあるので注意します。</p>
    <p class="m-0 mt-1 text-xs italic text-stone-500">Be careful as the following interrogative words may be used in polite conversation.</p>
    <p class="m-0 mt-2 font-bold">どちらから（＝どこから） / どちら様・どなた（＝だれ） / 何名様（＝何人）</p>
  </div>
</div>`,
  },
  '練習1-B 間違えやすい表現': {
    code: '1-B',
    title: '<ruby>間違<rt>まちが</rt></ruby>えやすい<ruby>表現<rt>ひょうげん</rt></ruby>',
    descJp: '誘いや申し出などの表現は、文脈に合わせて、だれの動作かを考えます。',
    descEn: 'In the case of expressions denoting invitation or offering, you should consider who performs the action according to the context.',
    tableHtml: `
<div class="mt-4 shinkanzen-textbook-table-wrapper">
  <table class="shinkanzen-textbook-table">
    <thead><tr><th>表現</th><th>意味</th><th>だれの動作か</th></tr></thead>
    <tbody>
      <tr><td>〜ましょう／〜（よ）う</td><td>申し出<br>誘い・提案</td><td>話す人<br>いっしょにする</td></tr>
      <tr><td>〜ましょうか／〜（よ）うか</td><td>申し出<br>誘い・提案</td><td>話す人<br>いっしょにする</td></tr>
      <tr><td>〜ませんか／〜ない？</td><td>勧め<br>誘い・提案</td><td>聞く人<br>いっしょにする</td></tr>
    </tbody>
  </table>
</div>`,
  },
  '練習2-A 会話でよく使われる表現': {
    code: '2-A',
    title: '<ruby>会話<rt>かいわ</rt></ruby>でよく<ruby>使<rt>つか</rt></ruby>われる<ruby>表現<rt>ひょうげん</rt></ruby>',
    descJp: '会話では、省略など、書くときとは違う表現を使うことがあるので注意します。',
    descEn: 'In conversation you need to be careful because expressions used may be different from written language and may contain abbreviations, for example.',
    tableHtml: `
<div class="mt-4 shinkanzen-textbook-table-wrapper">
  <table class="shinkanzen-textbook-table">
    <thead><tr><th>会話の表現</th><th>省略しない形・意味</th></tr></thead>
    <tbody>
      <tr><td>〜て</td><td>〜てください</td></tr>
      <tr><td>〜ないで</td><td>〜ないでください</td></tr>
      <tr><td>〜たら（どう）？</td><td>〜たらどうですか</td></tr>
      <tr><td>〜ないと</td><td>〜ないといけない</td></tr>
      <tr><td>〜の？</td><td>〜のですか／〜んですか</td></tr>
      <tr><td>〜ように</td><td>〜ようにしてください</td></tr>
      <tr><td>〜ないように／〜ずに</td><td>〜ないようにしてください</td></tr>
      <tr><td>〜（んだ）って</td><td>〜と言っていた</td></tr>
      <tr><td>〜って</td><td>〜というのは</td></tr>
      <tr><td>〜とか〜とか</td><td>〜や〜など</td></tr>
      <tr><td>やる</td><td>する</td></tr>
      <tr><td>いくつ</td><td>何歳</td></tr>
      <tr><td>なんで／何で</td><td>どうして／何と</td></tr>
    </tbody>
  </table>
</div>`,
  },
  '練習2-B 決まった答え方': {
    code: '2-B',
    title: '<ruby>決<rt>き</rt></ruby>まった<ruby>答<rt>こた</rt></ruby>え<ruby>方<rt>かた</rt></ruby>',
    descJp: 'あいさつなど、始めの文に対して答え方がだいたい決まっている文に注意します。',
    descEn: 'Be sure to note that in some phrases such as greetings the form of the answer to the phrase spoken first is more or less a standard phrase.',
    tableHtml: `
<div class="mt-4 shinkanzen-textbook-table-wrapper">
  <table class="shinkanzen-textbook-table">
    <thead><tr><th>始めの文</th><th>答え方の例</th></tr></thead>
    <tbody>
      <tr><td>お先に失礼します。</td><td>お疲れ様でした。</td></tr>
      <tr><td>すみません。／失礼しました。</td><td>いいえ。／どういたしまして。</td></tr>
      <tr><td>いらっしゃい。</td><td>おじゃまします。</td></tr>
      <tr><td>おじゃましました。</td><td>またいらしてください。／またいらっしゃってください。</td></tr>
      <tr><td>ごめんください。</td><td>はい、どちら様ですか。／どなたですか。</td></tr>
      <tr><td>お時間、ありますか。／今、ちょっとよろしいですか。</td><td>ええ、何でしょうか。</td></tr>
      <tr><td>お元気ですか。</td><td>ええ、おかげさまで。</td></tr>
      <tr><td>お世話になりました。</td><td>いいえ、こちらこそ。</td></tr>
      <tr><td>どうぞおかけください。／お入りください。</td><td>失礼します。</td></tr>
      <tr><td>どうぞごゆっくり。</td><td>ありがとうございます。</td></tr>
      <tr><td>お口に合うかどうか。／コーヒーでもいかがですか。</td><td>どうぞおかまいなく。／いただきます。</td></tr>
    </tbody>
  </table>
</div>`,
  },
  '練習3 間接的な答え方': {
    code: '3',
    title: '<ruby>間接的<rt>かんせつてき</rt></ruby>な<ruby>答<rt>こた</rt></ruby>え<ruby>方<rt>かた</rt></ruby>',
    descJp: '質問や誘いに対して、答えをはっきり言わないで間接的に答えることがあります。その時は、答えの文が始めの文の内容とどのように関係しているかを考えます。',
    descEn: 'Sometimes questions and invitations may be answered in an indirect manner by giving a vague reply. You should focus attention on how the phrase given in answer relates to the content of the phrase spoken first.',
    tableHtml: `
<div class="mt-4 shinkanzen-textbook-table-wrapper">
  <table class="shinkanzen-textbook-table">
    <thead><tr><th>質問</th><th>答え</th><th>意味</th></tr></thead>
    <tbody>
      <tr><td rowspan="3">この本、読みますか。</td><td>おもしろそうですね。</td><td class="font-bold text-emerald-700">読む</td></tr>
      <tr><td>漢字が難しそうですね。</td><td class="font-bold text-rose-700">読まない</td></tr>
      <tr><td>週に2、3冊読みます。</td><td>質問と関係がない</td></tr>
    </tbody>
  </table>
  <p class="mt-3 text-sm font-serif">「いいよ」のような表現は、イントネーションによって肯定にも否定にもなるので注意します。</p>
</div>`,
  },
  '確認問題': {
    code: '確認',
    title: '<ruby>確認問題<rt>かくにんもんだい</rt></ruby>（即時応答）',
    descJp: '短い文を聞いて、その答えとして最もよいものを1から3の中から一つ選んでください。',
    descEn: 'Listen to each short sentence and choose the most appropriate response from choices 1 to 3.',
  },
};
