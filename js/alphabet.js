import { t } from './i18n.js';

export const GROUPS = {
  vowels: { id: 'vowels', labelKey: 'group.vowels.label', descKey: 'group.vowels.desc' },
  basic: { id: 'basic', labelKey: 'group.basic.label', descKey: 'group.basic.desc' },
  aspirated: { id: 'aspirated', labelKey: 'group.aspirated.label', descKey: 'group.aspirated.desc' },
  ejective: { id: 'ejective', labelKey: 'group.ejective.label', descKey: 'group.ejective.desc' },
  fricative: { id: 'fricative', labelKey: 'group.fricative.label', descKey: 'group.fricative.desc' },
};

export const ALPHABET = [
  { letter: 'ა', roman: 'a', ipa: '/ɑ/', group: 'vowels', exampleWord: 'ამა ama', glossKey: 'ex.a', audio: 'audio/01-a.mp3' },
  { letter: 'ბ', roman: 'b', ipa: '/b/', group: 'basic', exampleWord: 'ბავშვი bavshvi', glossKey: 'ex.b', audio: 'audio/02-b.mp3' },
  { letter: 'გ', roman: 'g', ipa: '/ɡ/', group: 'basic', exampleWord: 'გამარჯობა gamarjoba', glossKey: 'ex.g', audio: 'audio/03-g.mp3' },
  { letter: 'დ', roman: 'd', ipa: '/d/', group: 'basic', exampleWord: 'დედა deda', glossKey: 'ex.d', audio: 'audio/04-d.mp3' },
  { letter: 'ე', roman: 'e', ipa: '/ɛ/', group: 'vowels', exampleWord: 'ენა ena', glossKey: 'ex.e', audio: 'audio/05-e.mp3' },
  { letter: 'ვ', roman: 'v', ipa: '/v/', group: 'basic', exampleWord: 'ვაშლი vashli', glossKey: 'ex.v', audio: 'audio/06-v.mp3' },
  { letter: 'ზ', roman: 'z', ipa: '/z/', group: 'basic', exampleWord: 'ზღვა zghva', glossKey: 'ex.z', audio: 'audio/07-z.mp3' },
  { letter: 'თ', roman: 't', ipa: '/tʰ/', group: 'aspirated', exampleWord: 'თევზი tevzi', glossKey: 'ex.t', audio: 'audio/08-t.mp3' },
  { letter: 'ი', roman: 'i', ipa: '/i/', group: 'vowels', exampleWord: 'იავი yavi', glossKey: 'ex.i', audio: 'audio/09-i.mp3' },
  { letter: 'კ', roman: 'k\'', ipa: '/kʼ/', group: 'ejective', exampleWord: 'კარი k\'ari', glossKey: 'ex.kEj', audio: 'audio/10-k.mp3' },
  { letter: 'ლ', roman: 'l', ipa: '/l/', group: 'basic', exampleWord: 'ლამაზი lamazi', glossKey: 'ex.l', audio: 'audio/11-l.mp3' },
  { letter: 'მ', roman: 'm', ipa: '/m/', group: 'basic', exampleWord: 'მამა mama', glossKey: 'ex.m', audio: 'audio/12-m.mp3' },
  { letter: 'ნ', roman: 'n', ipa: '/n/', group: 'basic', exampleWord: 'ნათელი nateli', glossKey: 'ex.n', audio: 'audio/13-n.mp3' },
  { letter: 'ო', roman: 'o', ipa: '/ɔ/', group: 'vowels', exampleWord: 'ორი ori', glossKey: 'ex.o', audio: 'audio/14-o.mp3' },
  { letter: 'პ', roman: 'p\'', ipa: '/pʼ/', group: 'ejective', exampleWord: 'პური p\'uri', glossKey: 'ex.pEj', audio: 'audio/15-p.mp3' },
  { letter: 'ჟ', roman: 'zh', ipa: '/ʒ/', group: 'fricative', exampleWord: 'ჟურნალისტი zhurnalisti', glossKey: 'ex.zh', audio: 'audio/16-zh.mp3' },
  { letter: 'რ', roman: 'r', ipa: '/r/', group: 'basic', exampleWord: 'რა ra', glossKey: 'ex.r', audio: 'audio/17-r.mp3' },
  { letter: 'ს', roman: 's', ipa: '/s/', group: 'basic', exampleWord: 'სახლი sakhli', glossKey: 'ex.s', audio: 'audio/18-s.mp3' },
  { letter: 'ტ', roman: 't\'', ipa: '/tʼ/', group: 'ejective', exampleWord: 'ტყე t\'qe', glossKey: 'ex.tEj', audio: 'audio/19-t.mp3' },
  { letter: 'უ', roman: 'u', ipa: '/u/', group: 'vowels', exampleWord: 'ური uri', glossKey: 'ex.u', audio: 'audio/20-u.mp3' },
  { letter: 'ფ', roman: 'p', ipa: '/pʰ/', group: 'aspirated', exampleWord: 'ფული puli', glossKey: 'ex.pAsp', audio: 'audio/21-p.mp3' },
  { letter: 'ქ', roman: 'k', ipa: '/kʰ/', group: 'aspirated', exampleWord: 'ქალაქი kalaki', glossKey: 'ex.kAsp', audio: 'audio/22-k.mp3' },
  { letter: 'ღ', roman: 'gh', ipa: '/ɣ/', group: 'fricative', exampleWord: 'ღამე ghame', glossKey: 'ex.gh', audio: 'audio/23-gh.mp3' },
  { letter: 'ყ', roman: 'q\'', ipa: '/qʼ/', group: 'ejective', exampleWord: 'ყველი q\'veli', glossKey: 'ex.qEj', audio: 'audio/24-q.mp3' },
  { letter: 'შ', roman: 'sh', ipa: '/ʃ/', group: 'fricative', exampleWord: 'შენ shen', glossKey: 'ex.sh', audio: 'audio/25-sh.mp3' },
  { letter: 'ჩ', roman: 'ch', ipa: '/tʃʰ/', group: 'aspirated', exampleWord: 'ჩაი chai', glossKey: 'ex.ch', audio: 'audio/26-ch.mp3' },
  { letter: 'ც', roman: 'ts', ipa: '/tsʰ/', group: 'aspirated', exampleWord: 'ცხენი tskheni', glossKey: 'ex.ts', audio: 'audio/27-ts.mp3' },
  { letter: 'ძ', roman: 'dz', ipa: '/dz/', group: 'fricative', exampleWord: 'ძაღლი dzaghli', glossKey: 'ex.dz', audio: 'audio/28-dz.mp3' },
  { letter: 'წ', roman: 'ts\'', ipa: '/tsʼ/', group: 'ejective', exampleWord: 'წელი ts\'eli', glossKey: 'ex.tsEj', audio: 'audio/29-ts.mp3' },
  { letter: 'ჭ', roman: 'ch\'', ipa: '/tʃʼ/', group: 'ejective', exampleWord: 'ჭა ch\'a', glossKey: 'ex.chEj', audio: 'audio/30-ch.mp3' },
  { letter: 'ხ', roman: 'kh', ipa: '/χ/', group: 'fricative', exampleWord: 'ხელი kheli', glossKey: 'ex.kh', audio: 'audio/22-k.mp3' },
  { letter: 'ჯ', roman: 'j', ipa: '/dʒ/', group: 'fricative', exampleWord: 'ჯამი jami', glossKey: 'ex.j', audio: 'audio/32-j.mp3' },
  { letter: 'ჰ', roman: 'h', ipa: '/h/', group: 'fricative', exampleWord: 'ჰაერი haeri', glossKey: 'ex.h', audio: 'audio/33-h.mp3' },
];

export const GRID_COLS = 11;

export function getExampleText(item) {
  return `${item.exampleWord} · ${t(item.glossKey)}`;
}

export function getGroupLabel(group) {
  return t(group.labelKey);
}

export function getGroupDesc(group) {
  return t(group.descKey);
}

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
    return normalized === normalizeAnswer(item.roman);
  }

  return normalized === normalizeAnswer(item.letter);
}

export function getAcceptedAnswers(item, direction) {
  if (direction === 'letter-to-roman') {
    return [item.roman];
  }
  return [item.letter];
}
