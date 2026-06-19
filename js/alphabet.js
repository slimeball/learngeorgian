export const GROUPS = {
  vowels: { id: 'vowels', label: '元音', desc: '5 个元音字母' },
  basic: { id: 'basic', label: '普通辅音', desc: '常见辅音，与英语相近' },
  aspirated: { id: 'aspirated', label: '送气辅音', desc: '发音时伴随明显气流' },
  ejective: { id: 'ejective', label: '挤喉辅音', desc: '格鲁吉亚语特有，喉部弹出' },
  fricative: { id: 'fricative', label: '擦音与其他', desc: 'sh, zh, kh, gh 等' },
};

export const ALPHABET = [
  { letter: 'ა', roman: 'a', ipa: '/ɑ/', group: 'vowels', example: 'ამა ama · 这个', alt: ['aa'] },
  { letter: 'ბ', roman: 'b', ipa: '/b/', group: 'basic', example: 'ბავშვი bavshvi · 孩子', alt: [] },
  { letter: 'გ', roman: 'g', ipa: '/ɡ/', group: 'basic', example: 'გამარჯობა gamarjoba · 你好', alt: [] },
  { letter: 'დ', roman: 'd', ipa: '/d/', group: 'basic', example: 'დედა deda · 母亲', alt: [] },
  { letter: 'ე', roman: 'e', ipa: '/ɛ/', group: 'vowels', example: 'ენა ena · 语言', alt: [] },
  { letter: 'ვ', roman: 'v', ipa: '/v/', group: 'basic', example: 'ვაშლი vashli · 苹果', alt: [] },
  { letter: 'ზ', roman: 'z', ipa: '/z/', group: 'basic', example: 'ზღვა zghva · 海', alt: [] },
  { letter: 'თ', roman: 't', ipa: '/tʰ/', group: 'aspirated', example: 'თევზი tevzi · 鱼', alt: ['th'] },
  { letter: 'ი', roman: 'i', ipa: '/i/', group: 'vowels', example: 'იავი yavi · 大麦', alt: ['y'] },
  { letter: 'კ', roman: "k'", ipa: '/kʼ/', group: 'ejective', example: "კარი k'ari · 门", alt: ['k', 'k’', 'kʼ', 'q'] },
  { letter: 'ლ', roman: 'l', ipa: '/l/', group: 'basic', example: 'ლამაზი lamazi · 美丽', alt: [] },
  { letter: 'მ', roman: 'm', ipa: '/m/', group: 'basic', example: 'მამა mama · 父亲', alt: [] },
  { letter: 'ნ', roman: 'n', ipa: '/n/', group: 'basic', example: 'ნათელი nateli · 明亮', alt: [] },
  { letter: 'ო', roman: 'o', ipa: '/ɔ/', group: 'vowels', example: 'ორი ori · 二', alt: [] },
  { letter: 'პ', roman: "p'", ipa: '/pʼ/', group: 'ejective', example: "პური p'uri · 面包", alt: ['p', 'p’', 'pʼ'] },
  { letter: 'ჟ', roman: 'zh', ipa: '/ʒ/', group: 'fricative', example: 'ჟურნალისტი zhurnalisti · 记者', alt: ['j', 'z'] },
  { letter: 'რ', roman: 'r', ipa: '/r/', group: 'basic', example: 'რა ra · 什么', alt: [] },
  { letter: 'ს', roman: 's', ipa: '/s/', group: 'basic', example: 'სახლი sakhli · 房子', alt: [] },
  { letter: 'ტ', roman: "t'", ipa: '/tʼ/', group: 'ejective', example: "ტყე t'qe · 风", alt: ['t', 't’', 'tʼ'] },
  { letter: 'უ', roman: 'u', ipa: '/u/', group: 'vowels', example: 'ური uri · 油', alt: [] },
  { letter: 'ფ', roman: 'p', ipa: '/pʰ/', group: 'aspirated', example: 'ფული puli · 钱', alt: ['ph', 'f'] },
  { letter: 'ქ', roman: 'k', ipa: '/kʰ/', group: 'aspirated', example: 'ქალაქი kalaki · 城市', alt: ['kh', 'q', 'c'] },
  { letter: 'ღ', roman: 'gh', ipa: '/ɣ/', group: 'fricative', example: 'ღამე ghame · 夜晚', alt: ['g', 'r'] },
  { letter: 'ყ', roman: "q'", ipa: '/qʼ/', group: 'ejective', example: "ყველი q'veli · 奶酪", alt: ['q', 'k', "k'", 'q’', 'qʼ'] },
  { letter: 'შ', roman: 'sh', ipa: '/ʃ/', group: 'fricative', example: 'შენ shen · 你', alt: ['s', 'sch'] },
  { letter: 'ჩ', roman: 'ch', ipa: '/tʃʰ/', group: 'aspirated', example: 'ჩაი chai · 茶', alt: ['tch', 'c'] },
  { letter: 'ც', roman: 'ts', ipa: '/tsʰ/', group: 'aspirated', example: 'ცხენი tskheni · 马', alt: ['c', 'tz'] },
  { letter: 'ძ', roman: 'dz', ipa: '/dz/', group: 'fricative', example: 'ძაღლი dzaghli · 狗', alt: ['z', 'ds'] },
  { letter: 'წ', roman: "ts'", ipa: '/tsʼ/', group: 'ejective', example: "წელი ts'eli · 年", alt: ['ts', 'c', 'ts’', 'tsʼ', 'w'] },
  { letter: 'ჭ', roman: "ch'", ipa: '/tʃʼ/', group: 'ejective', example: "ჭა ch'a · 井", alt: ['ch', 'tch', 'ch’', 'chʼ'] },
  { letter: 'ხ', roman: 'kh', ipa: '/χ/', group: 'fricative', example: 'ხელი kheli · 手', alt: ['x', 'h', 'ch'] },
  { letter: 'ჯ', roman: 'j', ipa: '/dʒ/', group: 'fricative', example: 'ჯამი jami · 碗', alt: ['dj', 'zh', 'dzh'] },
  { letter: 'ჰ', roman: 'h', ipa: '/h/', group: 'fricative', example: 'ჰაერი haeri · 空气', alt: [] },
];

export const GRID_COLS = 11;

export function getByLetter(letter) {
  return ALPHABET.find((item) => item.letter === letter);
}

export function getGroupItems(groupId) {
  return ALPHABET.filter((item) => item.group === groupId);
}

export function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[''`´ʼ]/g, "'")
    .replace(/\s+/g, '');
}

export function isCorrectAnswer(item, answer, direction) {
  const normalized = normalizeAnswer(answer);
  if (!normalized) return false;

  if (direction === 'letter-to-roman') {
    const accepted = [item.roman, ...item.alt].map(normalizeAnswer);
    return accepted.includes(normalized);
  }

  return normalizeAnswer(item.letter) === normalized;
}

export function getAcceptedAnswers(item, direction) {
  if (direction === 'letter-to-roman') {
    return [item.roman, ...item.alt];
  }
  return [item.letter];
}
