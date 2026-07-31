const fs = require('fs');
const path = require('path');

const data = [
  { id: 1710, word: '完全な', reading: 'かんぜんな', meaning: 'complete' },
  { id: 1711, word: '治療[する]', reading: 'ちりょう', meaning: 'treatment, treat, cure' },
  { id: 1712, word: '医学', reading: 'いがく', meaning: 'medicine' },
  { id: 1713, word: '発達[する]', reading: 'はったつ', meaning: 'development, develop' },
  { id: 1714, word: 'がん', reading: 'がん', meaning: 'cancer' },
  { id: 1715, word: 'ホームシック', reading: 'ホームシック', meaning: 'homesick' },
  { id: 1716, word: 'ストレス', reading: 'ストレス', meaning: 'stress' },
  { id: 1717, word: '睡眠不足', reading: 'すいみんぶそく', meaning: 'lack of sleep' },
  { id: 1718, word: '睡眠', reading: 'すいみん', meaning: 'sleep' },
  { id: 1719, word: 'ぐっすり(と)', reading: 'ぐっすり', meaning: 'soundly (asleep)' },
  { id: 1720, word: 'せき', reading: 'せき', meaning: 'cough' },
  { id: 1721, word: 'くしゃみ', reading: 'くしゃみ', meaning: 'sneeze' },
  { id: 1722, word: '体温', reading: 'たいおん', meaning: 'body temperature' },
  { id: 1723, word: '〜計', reading: '〜けい', meaning: '〜 meter' },
  { id: 1724, word: '測る／計る／量る', reading: 'はかる', meaning: 'measure' },
  { id: 1725, word: '平熱', reading: 'へいねつ', meaning: 'normal temperature' },
  { id: 1726, word: '微熱', reading: 'びねつ', meaning: 'slight fever' },
  { id: 1727, word: '高熱', reading: 'こうねつ', meaning: 'high fever' },
  { id: 1728, word: '頭痛', reading: 'ずつう', meaning: 'headache' },
  { id: 1729, word: '吐き気', reading: 'はきけ', meaning: 'nausea' },
  { id: 1730, word: '新型コロナウイルス', reading: 'しんがたコロナウイルス', meaning: 'novel coronavirus' },
  { id: 1731, word: 'ウイルス', reading: 'ウイルス', meaning: 'virus' },
  { id: 1732, word: '感染[する]', reading: 'かんせん', meaning: 'infect, get infected' },
  { id: 1733, word: '心臓', reading: 'しんぞう', meaning: 'heart' },
  { id: 1734, word: '〜病', reading: '〜びょう', meaning: '〜 disease' },
  { id: 1735, word: '休業[する]', reading: 'きゅうぎょう', meaning: 'close, be closed (business)' },
  { id: 1736, word: '手術[する]', reading: 'しゅじゅつ', meaning: 'surgery, operate' },
  { id: 1737, word: '〜後', reading: '〜ご', meaning: 'after 〜' },
  { id: 1738, word: '症状', reading: 'しょうじょう', meaning: 'symptoms' },
  { id: 1739, word: '健康な', reading: 'けんこうな', meaning: 'healthy' },
  { id: 1740, word: '産婦人科', reading: 'さんふじんか', meaning: 'obstetrics and gynecology' },
  { id: 1741, word: '看護師', reading: 'かんごし', meaning: 'nurse' },
  { id: 1742, word: '腰掛ける', reading: 'こしかける', meaning: 'sit' },
  { id: 1743, word: '胸', reading: 'むね', meaning: 'chest' },
  { id: 1744, word: '胃', reading: 'い', meaning: 'stomach' },
  { id: 1745, word: '痛み', reading: 'いたみ', meaning: 'pain' },
  { id: 1746, word: 'おいでになる', reading: 'おいでになる', meaning: 'come, visit (honorific)' },
  { id: 1747, word: '診察[する]', reading: 'しんさつ', meaning: 'exam, examine' },
  { id: 1748, word: '診察券', reading: 'しんさつけん', meaning: 'patient registration card' },
  { id: 1749, word: '発生[する]', reading: 'はっせい', meaning: 'appearance, appear' },
  { id: 1750, word: '出血[する]', reading: 'しゅっけつ', meaning: 'bleeding, bleed' },
  { id: 1751, word: '骨折[する]', reading: 'こっせつ', meaning: 'fracture, be fractured' },
  { id: 1752, word: 'しびれる', reading: 'しびれる', meaning: 'go numb' },
  { id: 1753, word: '外科', reading: 'げか', meaning: 'surgery' },
  { id: 1754, word: '神経', reading: 'しんけい', meaning: 'nerve' },
  { id: 1755, word: '内科', reading: 'ないか', meaning: 'internal medicine' },
  { id: 1756, word: '受診[する]', reading: 'じゅしん', meaning: 'consultation, consult' },
  { id: 1757, word: '片〜', reading: 'かた〜', meaning: 'one 〜' },
  { id: 1758, word: '不思議な', reading: 'ふしぎな', meaning: 'mysterious' },
  { id: 1759, word: '予防[する]', reading: 'よぼう', meaning: 'prevention, prevent' },
  { id: 1760, word: '手洗い[する]', reading: 'てあらい', meaning: 'hand washing, wash one\'s hands' },
  { id: 1761, word: 'うがい[する]', reading: 'うがい', meaning: 'gargle, gargle' },
  { id: 1762, word: 'うがい薬', reading: 'うがいぐすり', meaning: 'mouthwash' },
  { id: 1763, word: '喫煙[する]', reading: 'きつえん', meaning: 'smoking, smoke' },
  { id: 1764, word: '禁煙[する]', reading: 'きんえん', meaning: 'no smoking, quit smoking' },
  { id: 1765, word: '高〜', reading: 'こう〜', meaning: 'high 〜' },
  { id: 1766, word: '血圧', reading: 'けつあつ', meaning: 'blood pressure' },
  { id: 1767, word: '気をつける', reading: 'きをつける', meaning: 'be careful' },
  { id: 1768, word: '目薬', reading: 'めぐすり', meaning: 'eye drops' },
  { id: 1769, word: 'やけど[する]', reading: 'やけど', meaning: 'burn, get burned' },
  { id: 1770, word: '効く', reading: 'きく', meaning: 'be effective' },
  { id: 1771, word: '効きめ', reading: 'ききめ', meaning: 'effect' },
  { id: 1772, word: '傷', reading: 'きず', meaning: 'cut, scratch' },
  { id: 1773, word: '消毒[する]', reading: 'しょうどく', meaning: 'disinfecting, disinfect' },
  { id: 1774, word: 'アルコール消毒', reading: 'アルコールしょうどく', meaning: 'alcohol disinfection' },
  { id: 1775, word: '皮膚', reading: 'ひふ', meaning: 'skin' },
  { id: 1776, word: '腫れる', reading: 'はれる', meaning: 'swell' },
  { id: 1777, word: 'かく', reading: 'かく', meaning: 'scratch' },
  { id: 1778, word: 'アレルギー', reading: 'アレルギー', meaning: 'allergy' },
  { id: 1779, word: '医院', reading: 'いいん', meaning: 'clinic' },
  { id: 1780, word: '医師', reading: 'いし', meaning: 'doctor' },
  { id: 1781, word: '診る', reading: 'みる', meaning: 'examine' },
  { id: 1782, word: 'めったに', reading: 'めったに', meaning: 'rarely' },
  { id: 1783, word: '腹痛', reading: 'ふくつう', meaning: 'stomach ache' },
  { id: 1784, word: '下痢[する]', reading: 'げり', meaning: 'diarrhea, have diarrhea' },
  { id: 1785, word: '吐く', reading: 'はく', meaning: 'throw up' },
  { id: 1786, word: '血液', reading: 'けつえき', meaning: 'blood' },
  { id: 1787, word: '血液型', reading: 'けつえきがた', meaning: 'blood type' },
  { id: 1788, word: '検査[する]', reading: 'けんさ', meaning: 'inspect, inspection' },
  { id: 1789, word: '検査入院', reading: 'けんさにゅういん', meaning: 'inspection hospitalization' },
  { id: 1790, word: '虫歯', reading: 'むしば', meaning: 'cavity' },
  { id: 1791, word: '患者', reading: 'かんじゃ', meaning: 'patient' },
  { id: 1792, word: '体重', reading: 'たいじゅう', meaning: 'body weight' },
  { id: 1793, word: '体重計', reading: 'たいじゅうけい', meaning: 'scale (for weighing people)' },
  { id: 1794, word: '注射[する]', reading: 'ちゅうしゃ', meaning: 'injection, give a shot' }
];

const topic = "16";
const title = "健康 Health";

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
