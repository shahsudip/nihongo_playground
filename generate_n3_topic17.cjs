const fs = require('fs');
const path = require('path');

const data = [
  { id: 1795, word: '満員', reading: 'まんいん', meaning: 'full (of people)' },
  { id: 1796, word: 'リュック(サック)', reading: 'リュック(サック)', meaning: 'backpack' },
  { id: 1797, word: '周り', reading: 'まわり', meaning: 'surroundings' },
  { id: 1798, word: '迷惑[する]', reading: 'めいわく', meaning: 'annoyance, be annoyed' },
  { id: 1799, word: '幅', reading: 'はば', meaning: 'width' },
  { id: 1800, word: '横断歩道', reading: 'おうだんほどう', meaning: 'pedestrian crossing' },
  { id: 1801, word: '横断[する]', reading: 'おうだん', meaning: 'crossing, cross' },
  { id: 1802, word: 'そこで', reading: 'そこで', meaning: 'therefore' },
  { id: 1803, word: '調査[する]', reading: 'ちょうさ', meaning: 'investigation, investigate' },
  { id: 1804, word: 'リサイクル[する]', reading: 'リサイクル', meaning: 'recycling, recycle' },
  { id: 1805, word: '空きびん', reading: 'あきびん', meaning: 'empty bottle' },
  { id: 1806, word: '空き缶', reading: 'あきかん', meaning: 'empty can' },
  { id: 1807, word: '分ける', reading: 'わける', meaning: 'divide, separate' },
  { id: 1808, word: 'おしゃべり[する]', reading: 'おしゃべり', meaning: 'chatting, chat' },
  { id: 1809, word: 'ボランティア', reading: 'ボランティア', meaning: 'volunteer' },
  { id: 1810, word: '挟む', reading: 'はさむ', meaning: 'insert, put between' },
  { id: 1811, word: '挟まる', reading: 'はさまる', meaning: 'be caught' },
  { id: 1812, word: '積極的な', reading: 'せっきょくてきな', meaning: 'active' },
  { id: 1813, word: '消極的な', reading: 'しょうきょくてきな', meaning: 'passive' },
  { id: 1814, word: '環境', reading: 'かんきょう', meaning: 'environment' },
  { id: 1815, word: '環境問題', reading: 'かんきょうもんだい', meaning: 'environmental issues' },
  { id: 1816, word: '面倒な', reading: 'めんどうな', meaning: 'troublesome' },
  { id: 1817, word: '当然', reading: 'とうぜん', meaning: 'of course' },
  { id: 1818, word: '宗教', reading: 'しゅうきょう', meaning: 'religion' },
  { id: 1819, word: '決まり', reading: 'きまり', meaning: 'rule' },
  { id: 1820, word: '許す', reading: 'ゆるす', meaning: 'forgive, allow' },
  { id: 1821, word: '奥', reading: 'おく', meaning: 'back' },
  { id: 1822, word: '煙', reading: 'けむり', meaning: 'smoke' },
  { id: 1823, word: '気づく', reading: 'きづく', meaning: 'find' },
  { id: 1824, word: 'スピーカー', reading: 'スピーカー', meaning: 'speaker' },
  { id: 1825, word: 'どける', reading: 'どける', meaning: 'move, remove' },
  { id: 1826, word: '振り向く', reading: 'ふりむく', meaning: 'turn around' },
  { id: 1827, word: '着替え', reading: 'きがえ', meaning: 'spare clothes' },
  { id: 1828, word: 'こする', reading: 'こする', meaning: 'rub' },
  { id: 1829, word: 'ラッシュ', reading: 'ラッシュ', meaning: 'rush' },
  { id: 1830, word: '座席', reading: 'ざせき', meaning: 'seat' },
  { id: 1831, word: '感心[する]', reading: 'かんしん', meaning: 'impression, be impressed' },
  { id: 1832, word: '優先席', reading: 'ゆうせんせき', meaning: 'priority seating' },
  { id: 1833, word: '勇気', reading: 'ゆうき', meaning: 'courage' },
  { id: 1834, word: '分別[する]', reading: 'ぶんべつ', meaning: 'separation, separate' },
  { id: 1835, word: '地域', reading: 'ちいき', meaning: 'area' },
  { id: 1836, word: '守る', reading: 'まもる', meaning: 'protect, keep (a rule)' },
  { id: 1837, word: '広場', reading: 'ひろば', meaning: 'square' },
  { id: 1838, word: '公衆トイレ', reading: 'こうしゅうトイレ', meaning: 'public toilet' },
  { id: 1839, word: 'マナー', reading: 'マナー', meaning: 'manners' },
  { id: 1840, word: '化粧品', reading: 'けしょうひん', meaning: 'cosmetics' },
  { id: 1841, word: '化粧[する]', reading: 'けしょう', meaning: 'make up, put on make up' },
  { id: 1842, word: 'メイク[する]', reading: 'メイク', meaning: 'make up, put on make up' },
  { id: 1843, word: '香水', reading: 'こうすい', meaning: 'perfume' },
  { id: 1844, word: 'サンプル', reading: 'サンプル', meaning: 'sample' },
  { id: 1845, word: 'たまに', reading: 'たまに', meaning: 'once in a while' },
  { id: 1846, word: '愛[する]', reading: 'あい', meaning: 'love, love' },
  { id: 1847, word: '白髪', reading: 'しらが', meaning: 'white hair' },
  { id: 1848, word: '空き', reading: 'あき', meaning: 'vacancy' },
  { id: 1849, word: '譲る', reading: 'ゆずる', meaning: 'give' },
  { id: 1850, word: '確かに', reading: 'たしかに', meaning: 'surely' },
  { id: 1851, word: '申し訳ない', reading: 'もうしわけない', meaning: 'inexcusable' },
  { id: 1852, word: '反省[する]', reading: 'はんせい', meaning: 'reflection, reflect' },
  { id: 1853, word: 'ものすごい', reading: 'ものすごい', meaning: 'amazing' },
  { id: 1854, word: 'しゃべる', reading: 'しゃべる', meaning: 'chat' },
  { id: 1855, word: 'バッグ', reading: 'バッグ', meaning: 'bag' },
  { id: 1856, word: '広げる', reading: 'ひろげる', meaning: 'spread' },
  { id: 1857, word: '広がる', reading: 'ひろがる', meaning: 'spread' },
  { id: 1858, word: 'どく', reading: 'どく', meaning: 'move' },
  { id: 1859, word: 'シート', reading: 'シート', meaning: 'seat' },
  { id: 1860, word: 'シートベルト', reading: 'シートベルト', meaning: 'seat belt' },
  { id: 1861, word: '昨夜', reading: 'さくや', meaning: 'last night' },
  { id: 1862, word: '昨晩', reading: 'さくばん', meaning: 'last night' },
  { id: 1863, word: '刺す', reading: 'さす', meaning: 'stab' },
  { id: 1864, word: '刺さる', reading: 'ささる', meaning: 'stab' },
  { id: 1865, word: '警官／警察官', reading: 'けいかん／けいさつかん', meaning: 'police officer' },
  { id: 1866, word: '警察署', reading: 'けいさつしょ', meaning: 'police station' },
  { id: 1867, word: '逮捕[する]', reading: 'たいほ', meaning: 'arrest, arrest' },
  { id: 1868, word: '防止[する]', reading: 'ぼうし', meaning: 'prevention, prevent' },
  { id: 1869, word: '大〜', reading: 'だい〜', meaning: 'large 〜' },
  { id: 1870, word: '複雑な', reading: 'ふくざつな', meaning: 'complex' },
  { id: 1871, word: '改札', reading: 'かいさつ', meaning: 'ticket gate' },
  { id: 1872, word: 'がらがらな', reading: 'がらがらな', meaning: 'vacant' },
  { id: 1873, word: '詰め込む', reading: 'つめこむ', meaning: 'stuff' },
  { id: 1874, word: '詰める', reading: 'つめる', meaning: 'pack' },
  { id: 1875, word: '詰め替え', reading: 'つめかえ', meaning: 'refill, repack' },
  { id: 1876, word: '法律', reading: 'ほうりつ', meaning: 'law' },
  { id: 1877, word: '禁止[する]', reading: 'きんし', meaning: 'ban, ban' },
  { id: 1878, word: '違反[する]', reading: 'いはん', meaning: 'violation, violate' },
  { id: 1879, word: 'イヤホン', reading: 'イヤホン', meaning: 'earphones' },
  { id: 1880, word: 'ヘッドホン', reading: 'ヘッドホン', meaning: 'headphones' },
  { id: 1881, word: '気になる', reading: 'きになる', meaning: 'be concerned' },
  { id: 1882, word: 'しいんと', reading: 'しいんと', meaning: 'silently' },
  { id: 1883, word: '交通機関', reading: 'こうつうきかん', meaning: 'transportation facilities' },
  { id: 1884, word: '目立つ', reading: 'めだつ', meaning: 'stand out' },
  { id: 1885, word: 'マナーモード', reading: 'マナーモード', meaning: 'silent mode' }
];

const topic = "17";
const title = "マナー Manners";

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
