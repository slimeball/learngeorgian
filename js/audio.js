const audioCache = new Map();
let currentAudio = null;

function getAudio(src) {
  if (!audioCache.has(src)) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audioCache.set(src, audio);
  }
  return audioCache.get(src);
}

export function preloadLetterAudio(items) {
  items.forEach((item) => {
    if (item?.audio) getAudio(item.audio);
  });
}

export function playLetterAudio(item) {
  if (!item?.audio) {
    return Promise.resolve(false);
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = getAudio(item.audio);
  currentAudio = audio;
  audio.currentTime = 0;

  return new Promise((resolve) => {
    const finish = (ok) => resolve(ok);

    audio.addEventListener('ended', () => finish(true), { once: true });
    audio.addEventListener('error', () => finish(false), { once: true });
    audio.play().catch(() => finish(false));
  });
}
