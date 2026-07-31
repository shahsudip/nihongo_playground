const fs = require('fs');
const path = require('path');

const data = [
  { id: 1602, word: '無職', reading: 'むしょく', meaning: 'jobless' },
  { id: 1603, word: '独身', reading: 'どくしん', meaning: 'single' },
  { id: 1604, word: '焦る', reading: 'あせる', meaning: 'get impatient' },
  { id: 1605, word: '不安な', reading: 'ふあんな', meaning: 'uneasy' },
  { id: 1606, word: '可能な', reading: 'かのうな', meaning: 'possible' },
  { id: 1607, word: '不可能な', reading: 'ふかのうな', meaning: 'impossible' },
  { id: 1608, word: '可能性', reading: 'かのうせい', meaning: 'possibility' },
  { id: 1609, word: '諦める', reading: 'あきらめる', meaning: 'give up' },
  { id: 1610, word: '孫', reading: 'まご', meaning: 'grandchild' },
  { id: 1611, word: '悩む', reading: 'なやむ', meaning: 'worry' },
  { id: 1612, word: '悩み', reading: 'なやみ', meaning: 'worry' },
  { id: 1613, word: '弁護士', reading: 'べんごし', meaning: 'lawyer' },
  { id: 1614, word: '目指す', reading: 'めざす', meaning: 'aim' },
  { id: 1615, word: '倍', reading: 'ばい', meaning: 'double' },
  { id: 1616, word: '努力[する]', reading: 'どりょく', meaning: 'effort, make an effort' },
  { id: 1617, word: '様子', reading: 'ようす', meaning: 'appearance' },
  { id: 1618, word: '同僚', reading: 'どうりょう', meaning: 'colleague' },
  { id: 1619, word: '素敵な', reading: 'すてきな', meaning: 'nice' },
  { id: 1620, word: '出会う', reading: 'であう', meaning: 'meet' },
  { id: 1621, word: '出会い', reading: 'であい', meaning: 'encounter' },
  { id: 1622, word: '真剣な', reading: 'しんけんな', meaning: 'serious' },
  { id: 1623, word: '交際[する]', reading: 'こうさい', meaning: 'dating, date' },
  { id: 1624, word: 'そのため', reading: 'そのため', meaning: 'so, therefore' },
  { id: 1625, word: 'キス[する]', reading: 'キス', meaning: 'kiss, kiss' },
  { id: 1626, word: '葬式', reading: 'そうしき', meaning: 'funeral' },
  { id: 1627, word: 'ろうそく', reading: 'ろうそく', meaning: 'candle' },
  { id: 1628, word: '人生', reading: 'じんせい', meaning: 'life' },
  { id: 1629, word: '想像[する]', reading: 'そうぞう', meaning: 'imagination, imagine' },
  { id: 1630, word: '想像力', reading: 'そうぞうりょく', meaning: 'imagination' },
  { id: 1631, word: 'つらい', reading: 'つらい', meaning: 'painful, hard, tough' },
  { id: 1632, word: '理想的な', reading: 'りそうてきな', meaning: 'ideal' },
  { id: 1633, word: '理想', reading: 'りそう', meaning: 'ideal' },
  { id: 1634, word: '夫婦', reading: 'ふうふ', meaning: '(married) couple' },
  { id: 1635, word: 'お互い（に）', reading: 'おたがい', meaning: 'each other' },
  { id: 1636, word: '相手', reading: 'あいて', meaning: 'opponent' },
  { id: 1637, word: 'プロポーズ[する]', reading: 'プロポーズ', meaning: 'proposal, propose' },
  { id: 1638, word: '末っ子', reading: 'すえっこ', meaning: 'youngest child' },
  { id: 1639, word: 'たとえ', reading: 'たとえ', meaning: 'even if' },
  { id: 1640, word: '絶対（に）', reading: 'ぜったい', meaning: 'definitely' },
  { id: 1641, word: '姓', reading: 'せい', meaning: 'surname' },
  { id: 1642, word: '世の中', reading: 'よのなか', meaning: 'in the world' },
  { id: 1643, word: '常識', reading: 'じょうしき', meaning: 'common sense' },
  { id: 1644, word: '縛る', reading: 'しばる', meaning: 'tie' },
  { id: 1645, word: 'ある', reading: 'ある', meaning: 'a certain' },
  { id: 1646, word: '周囲', reading: 'しゅうい', meaning: 'surroundings' },
  { id: 1647, word: '出来事', reading: 'できごと', meaning: 'incident' },
  { id: 1648, word: '大げさな', reading: 'おおげさな', meaning: 'exaggerated' },
  { id: 1649, word: 'いらいら[する]', reading: 'いらいら', meaning: 'annoyance, be annoyed' },
  { id: 1650, word: '公務員', reading: 'こうむいん', meaning: 'civil servant' },
  { id: 1651, word: '資格', reading: 'しかく', meaning: 'qualification' },
  { id: 1652, word: '講座', reading: 'こうざ', meaning: 'course' },
  { id: 1653, word: '最〜', reading: 'さい〜', meaning: 'most ~' },
  { id: 1654, word: '標準', reading: 'ひょうじゅん', meaning: 'standard' },
  { id: 1655, word: '自信', reading: 'じしん', meaning: 'self-confidence' },
  { id: 1656, word: '付く', reading: 'つく', meaning: 'be attached' },
  { id: 1657, word: '出張[する]', reading: 'しゅっちょう', meaning: 'business trip, go on a business trip' },
  { id: 1658, word: '重要な', reading: 'じゅうような', meaning: 'important' },
  { id: 1659, word: '日にち', reading: 'ひにち', meaning: 'date' },
  { id: 1660, word: '延ばす', reading: 'のばす', meaning: 'extend' },
  { id: 1661, word: '延びる', reading: 'のびる', meaning: 'extend' },
  { id: 1662, word: '方向', reading: 'ほうこう', meaning: 'direction' },
  { id: 1663, word: 'いとこ', reading: 'いとこ', meaning: 'cousin' },
  { id: 1664, word: '（お）金持ち', reading: 'かねもち', meaning: 'rich' },
  { id: 1665, word: '付き合う', reading: 'つきあう', meaning: 'date, go out with' },
  { id: 1666, word: 'しかし', reading: 'しかし', meaning: 'however' },
  { id: 1667, word: '苦しい', reading: 'くるしい', meaning: 'difficult' },
  { id: 1668, word: '苦しむ', reading: 'くるしむ', meaning: 'suffer' },
  { id: 1669, word: '振る', reading: 'ふる', meaning: 'dump' },
  { id: 1670, word: 'さて', reading: 'さて', meaning: 'now' },
  { id: 1671, word: 'スピーチ[する]', reading: 'スピーチ', meaning: 'speech, give a speech' },
  { id: 1672, word: 'くださる', reading: 'くださる', meaning: 'give, bestow (honorific)' },
  { id: 1673, word: '感謝[する]', reading: 'かんしゃ', meaning: 'appreciation, appreciate' },
  { id: 1674, word: '感想', reading: 'かんそう', meaning: 'impression' },
  { id: 1675, word: '大学院', reading: 'だいがくいん', meaning: 'graduate school' },
  { id: 1676, word: '大学院生', reading: 'だいがくいんせい', meaning: 'graduate student' },
  { id: 1677, word: '進学[する]', reading: 'しんがく', meaning: 'going to the next level of school, graduate' },
  { id: 1678, word: '建築[する]', reading: 'けんちく', meaning: 'building, erect a building' },
  { id: 1679, word: 'レベル', reading: 'レベル', meaning: 'level' },
  { id: 1680, word: 'ぺらぺら（と）', reading: 'ぺらぺら', meaning: 'fluently' },
  { id: 1681, word: '能力', reading: 'のうりょく', meaning: 'ability' },
  { id: 1682, word: '姉妹', reading: 'しまい', meaning: 'sisters' },
  { id: 1683, word: '歌手', reading: 'かしゅ', meaning: 'singer' },
  { id: 1684, word: 'タレント', reading: 'タレント', meaning: 'talent' },
  { id: 1685, word: '早起き[する]', reading: 'はやおき', meaning: 'waking up early, wake up early' },
  { id: 1686, word: '夢中な', reading: 'むちゅうな', meaning: 'mindless, in a dream-like state' },
  { id: 1687, word: '楽器', reading: 'がっき', meaning: 'instrument' },
  { id: 1688, word: '覚める', reading: 'さめる', meaning: 'wake up' },
  { id: 1689, word: '覚ます', reading: 'さます', meaning: 'wake up' },
  { id: 1690, word: '貿易[する]', reading: 'ぼうえき', meaning: 'trade, do trade' },
  { id: 1691, word: '国籍', reading: 'こくせき', meaning: 'country of citizenship' },
  { id: 1692, word: '企業', reading: 'きぎょう', meaning: 'company' },
  { id: 1693, word: '就職[する]', reading: 'しゅうしょく', meaning: 'getting a job, get a job' },
  { id: 1694, word: '就職活動', reading: 'しゅうしょくかつどう', meaning: 'job hunting' },
  { id: 1695, word: '希望[する]', reading: 'きぼう', meaning: 'hope, hope' },
  { id: 1696, word: '実際(に)', reading: 'じっさい', meaning: 'actually' },
  { id: 1697, word: '年上', reading: 'としうえ', meaning: 'older' },
  { id: 1698, word: '年下', reading: 'としした', meaning: 'younger' },
  { id: 1699, word: '信用[する]', reading: 'しんよう', meaning: 'trust, trust' },
  { id: 1700, word: '署名[する]', reading: 'しょめい', meaning: 'signature, give a signature' },
  { id: 1701, word: '素直な', reading: 'すなおな', meaning: 'honest' },
  { id: 1702, word: 'とうとう', reading: 'とうとう', meaning: 'finally' },
  { id: 1703, word: 'はんこ', reading: 'はんこ', meaning: 'seal' },
  { id: 1704, word: '手続き[する]', reading: 'てつづき', meaning: 'paperwork, do paperwork' },
  { id: 1705, word: '窓口', reading: 'まどぐち', meaning: 'window' },
  { id: 1706, word: '受け付ける', reading: 'うけつける', meaning: 'accept' },
  { id: 1707, word: '印鑑', reading: 'いんかん', meaning: 'seal' },
  { id: 1708, word: '保険', reading: 'ほけん', meaning: 'insurance' },
  { id: 1709, word: '〜証', reading: '〜しょう', meaning: 'card' }
];

const topic = "15";
const title = "人生 Life";

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
