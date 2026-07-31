const fs = require('fs');
const path = require('path');

const data = [
  { id: 1493, word: '平日', reading: 'へいじつ', meaning: 'weekday' },
  { id: 1494, word: 'クリーニング[する]', reading: 'クリーニング', meaning: "cleaner's, clean" },
  { id: 1495, word: 'フロント', reading: 'フロント', meaning: 'front desk' },
  { id: 1496, word: '寝不足な', reading: 'ねぶそくな', meaning: 'sleep deprived' },
  { id: 1497, word: '休める', reading: 'やすめる', meaning: 'rest' },
  { id: 1498, word: '職業', reading: 'しょくぎょう', meaning: 'job, profession' },
  { id: 1499, word: 'エンジニア', reading: 'エンジニア', meaning: 'engineer' },
  { id: 1500, word: '上位', reading: 'じょうい', meaning: 'top' },
  { id: 1501, word: '〜位', reading: '〜い', meaning: 'position' },
  { id: 1502, word: '意外な', reading: 'いがいな', meaning: 'surprising' },
  { id: 1503, word: 'サラリーマン', reading: 'サラリーマン', meaning: 'office worker, salaried worker' },
  { id: 1504, word: '先々月', reading: 'せんせんげつ', meaning: 'the month before last' },
  { id: 1505, word: '研修[する]', reading: 'けんしゅう', meaning: 'training, train' },
  { id: 1506, word: '期間', reading: 'きかん', meaning: 'period' },
  { id: 1507, word: '給料', reading: 'きゅうりょう', meaning: 'salary' },
  { id: 1508, word: '社員', reading: 'しゃいん', meaning: 'employee' },
  { id: 1509, word: '単純な', reading: 'たんじゅんな', meaning: 'simple' },
  { id: 1510, word: '機械的な', reading: 'きかいてきな', meaning: 'mechanical' },
  { id: 1511, word: '作業[する]', reading: 'さぎょう', meaning: 'work, do work' },
  { id: 1512, word: '繰り返す', reading: 'くりかえす', meaning: 'repeat' },
  { id: 1513, word: 'アドバイス[する]', reading: 'アドバイス', meaning: 'advice, give advice' },
  { id: 1514, word: 'ガソリンスタンド', reading: 'ガソリンスタンド', meaning: 'gas station' },
  { id: 1515, word: 'きつい', reading: 'きつい', meaning: 'tough' },
  { id: 1516, word: '腰', reading: 'こし', meaning: 'waist' },
  { id: 1517, word: '半年', reading: 'はんとし', meaning: 'half a year' },
  { id: 1518, word: '〜長', reading: '〜ちょう', meaning: 'manager' },
  { id: 1519, word: '態度', reading: 'たいど', meaning: 'attitude' },
  { id: 1520, word: 'その上', reading: 'そのうえ', meaning: 'moreover' },
  { id: 1521, word: '休憩[する]', reading: 'きゅうけい', meaning: 'break, rest, take a break' },
  { id: 1522, word: '承知[する]', reading: 'しょうち', meaning: 'understanding, know, acknowledge' },
  { id: 1523, word: '月末', reading: 'げつまつ', meaning: 'end of the month' },
  { id: 1524, word: '出版社', reading: 'しゅっぱんしゃ', meaning: 'publishing company' },
  { id: 1525, word: '出版[する]', reading: 'しゅっぱん', meaning: 'publishing, publish' },
  { id: 1526, word: '副〜', reading: 'ふく〜', meaning: 'vice ~, assistant ~' },
  { id: 1527, word: '面接[する]', reading: 'めんせつ', meaning: 'interview, have an interview' },
  { id: 1528, word: '特技', reading: 'とくぎ', meaning: 'special skill' },
  { id: 1529, word: '事務', reading: 'じむ', meaning: 'office work' },
  { id: 1530, word: '受かる', reading: 'うかる', meaning: 'pass' },
  { id: 1531, word: '落ちる', reading: 'おちる', meaning: 'fail' },
  { id: 1532, word: '失業[する]', reading: 'しつぎょう', meaning: "unemployment, lose one's job" },
  { id: 1533, word: '約〜', reading: 'やく〜', meaning: 'about' },
  { id: 1534, word: '〜割', reading: '〜わり', meaning: 'percent (1割 = 10%)' },
  { id: 1535, word: '営業[する]', reading: 'えいぎょう', meaning: 'sales, do sales' },
  { id: 1536, word: '商品', reading: 'しょうひん', meaning: 'product' },
  { id: 1537, word: '高級な', reading: 'こうきゅうな', meaning: 'high-class' },
  { id: 1538, word: '苦労[する]', reading: 'くろう', meaning: 'having a hard time, have a hard time' },
  { id: 1539, word: '職場', reading: 'しょくば', meaning: 'workplace' },
  { id: 1540, word: '積む', reading: 'つむ', meaning: 'gain, acquire' },
  { id: 1541, word: '積もる', reading: 'つもる', meaning: 'accumulate, pile up' },
  { id: 1542, word: '実力', reading: 'じつりょく', meaning: 'proficiency, ability' },
  { id: 1543, word: 'コミュニケーション', reading: 'コミュニケーション', meaning: 'communication' },
  { id: 1544, word: 'パート', reading: 'パート', meaning: 'part-timer, part-time job' },
  { id: 1545, word: '時給', reading: 'じきゅう', meaning: 'hourly salary' },
  { id: 1546, word: '月給', reading: 'げっきゅう', meaning: 'monthly salary' },
  { id: 1547, word: 'まあまあな', reading: 'まあまあな', meaning: 'just okay' },
  { id: 1548, word: '〜末', reading: '〜まつ', meaning: '~ end' },
  { id: 1549, word: 'イベント', reading: 'イベント', meaning: 'event' },
  { id: 1550, word: '会員', reading: 'かいいん', meaning: 'member' },
  { id: 1551, word: '限定[する]', reading: 'げんてい', meaning: 'limitation, limit' },
  { id: 1552, word: '向ける', reading: 'むける', meaning: 'aim at' },
  { id: 1553, word: '向く', reading: 'むく', meaning: 'face' },
  { id: 1554, word: 'マニュアル', reading: 'マニュアル', meaning: 'manual' },
  { id: 1555, word: '新年', reading: 'しんねん', meaning: 'New Year' },
  { id: 1556, word: '混雑[する]', reading: 'こんざつ', meaning: 'congestion, be crowded' },
  { id: 1557, word: '〜期', reading: '〜き', meaning: '~ period' },
  { id: 1558, word: '臨時', reading: 'りんじ', meaning: 'temporary' },
  { id: 1559, word: '募集[する]', reading: 'ぼしゅう', meaning: 'recruiting, recruit' },
  { id: 1560, word: '配る', reading: 'くばる', meaning: 'distribute' },
  { id: 1561, word: '注ぐ', reading: 'そそぐ', meaning: 'take (care), pour' },
  { id: 1562, word: '義務', reading: 'ぎむ', meaning: 'duty' },
  { id: 1563, word: '二度と', reading: 'にどと', meaning: 'again' },
  { id: 1564, word: '握る', reading: 'にぎる', meaning: 'hold' },
  { id: 1565, word: '問い合わせる', reading: 'といあわせる', meaning: 'contact, inquire' },
  { id: 1566, word: '速達', reading: 'そくたつ', meaning: 'express (mail)' },
  { id: 1567, word: '履歴書', reading: 'りれきしょ', meaning: 'resume' },
  { id: 1568, word: '提出[する]', reading: 'ていしゅつ', meaning: 'submission, submit' },
  { id: 1569, word: '宛名', reading: 'あてな', meaning: 'address' },
  { id: 1570, word: '宛先', reading: 'あてさき', meaning: 'destination' },
  { id: 1571, word: '指定[する]', reading: 'してい', meaning: 'specifying, specify' },
  { id: 1572, word: '指定席', reading: 'していせき', meaning: 'reserved seat' },
  { id: 1573, word: '集合[する]', reading: 'しゅうごう', meaning: 'gathering, gather' },
  { id: 1574, word: '集合場所', reading: 'しゅうごうばしょ', meaning: 'meeting place' },
  { id: 1575, word: '〜場', reading: '〜じょう', meaning: '~ place' },
  { id: 1576, word: '名刺', reading: 'めいし', meaning: 'business card' },
  { id: 1577, word: '調整[する]', reading: 'ちょうせい', meaning: 'adjustment, adjust' },
  { id: 1578, word: '工業', reading: 'こうぎょう', meaning: 'manufacturing, industry' },
  { id: 1579, word: '条件', reading: 'じょうけん', meaning: 'condition' },
  { id: 1580, word: '順', reading: 'じゅん', meaning: 'order' },
  { id: 1581, word: '判断[する]', reading: 'はんだん', meaning: 'decision, decide' },
  { id: 1582, word: '会計', reading: 'かいけい', meaning: 'check' },
  { id: 1583, word: '名札', reading: 'なふだ', meaning: 'name tag' },
  { id: 1584, word: 'サイン[する]', reading: 'サイン', meaning: 'signature, sign' },
  { id: 1585, word: '〜業', reading: '〜ぎょう', meaning: '~ industry' },
  { id: 1586, word: '経営[する]', reading: 'けいえい', meaning: 'management, manage' },
  { id: 1587, word: '個人', reading: 'こじん', meaning: 'private person, individual' },
  { id: 1588, word: 'オフィス', reading: 'オフィス', meaning: 'office' },
  { id: 1589, word: '留守番[する]', reading: 'るすばん', meaning: 'stay (home) house watching, staying (here), house watching' },
  { id: 1590, word: '正午', reading: 'しょうご', meaning: 'noon' },
  { id: 1591, word: '整理[する]', reading: 'せいり', meaning: 'organizing, organize' },
  { id: 1592, word: '居酒屋', reading: 'いざかや', meaning: 'tavern' },
  { id: 1593, word: 'キッチン', reading: 'キッチン', meaning: 'kitchen' },
  { id: 1594, word: '看板', reading: 'かんばん', meaning: 'sign' },
  { id: 1595, word: '命令[する]', reading: 'めいれい', meaning: 'command, give commands' },
  { id: 1596, word: '注文[する]', reading: 'ちゅうもん', meaning: 'order, make an order' },
  { id: 1597, word: '〜ダース', reading: '〜ダース', meaning: '~ dozen' },
  { id: 1598, word: '一時', reading: 'いちじ', meaning: 'for a moment' },
  { id: 1599, word: '一時帰国[する]', reading: 'いちじきこく', meaning: 'temporary returning home, temporarily return home' },
  { id: 1600, word: '協力[する]', reading: 'きょうりょく', meaning: 'cooperation, help out, cooperate' },
  { id: 1601, word: 'ほっとする', reading: 'ほっとする', meaning: 'be relieved' }
];

const topic = "14";
const title = "仕事 Work";

const getFirebaseFormat = () => {
  return data.map((item, index) => {
    return {
      "word": item.word,
      "reading": item.reading,
      "meaning": item.meaning,
      "sentence": ""
    };
  });
};

const outputDir = path.join(__dirname, 'src', 'data', 'tango_n3_raw');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = path.join(outputDir, 'topic' + topic + '.json');
const outputData = {
  "topic": 'Topic ' + topic + ' ' + title,
  "words": getFirebaseFormat()
};

fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2), 'utf-8');
console.log('Successfully generated ' + outputFile);
