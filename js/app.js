import {
  ALPHABET,
  GROUPS,
  GRID_COLS,
  getAcceptedAnswers,
  getExampleText,
  getGroupDesc,
  getGroupItems,
  getGroupLabel,
  isCorrectAnswer,
} from './alphabet.js';
import { playLetterAudio, preloadLetterAudio } from './audio.js';
import {
  applyTranslations,
  initI18n,
  onLangChange,
  setLanguage,
  t,
} from './i18n.js';

const STORAGE_KEY = 'real-mkhedruli-settings';
const SELECT_KEY = 'real-mkhedruli-selected';

const defaultSettings = {
  direction: 'letter-to-roman',
  order: 'random',
  showIpa: true,
  showExample: true,
  autoReveal: true,
};

let settings = loadSettings();
let selected = new Set(loadSelected());
let studyQueue = [];
let studyIndex = 0;
let studyCorrect = 0;
let studySkipped = 0;
let advanceTimer = null;

const views = document.querySelectorAll('.view');
const tabs = document.querySelectorAll('.tab');

init();

function init() {
  initI18n();
  bindLanguage();
  onLangChange(refreshLanguage);
  bindNavigation();
  bindSelection();
  bindStudy();
  bindSettings();
  renderAlphabetGrid();
  renderGroups();
  renderSelectionTray();
  preloadLetterAudio(ALPHABET);
  applySettingsToForm();
  showView('select');
}

function bindLanguage() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });
}

function refreshLanguage() {
  renderGroups();
  renderSelectionTray();
  applySettingsToForm();
  updateStudyHint();
  updateStudyUI();
  if (studyIndex < studyQueue.length && studyQueue.length > 0) {
    refreshQuestionSub();
  }
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : { ...defaultSettings };
  } catch {
    return { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function loadSelected() {
  try {
    const raw = localStorage.getItem(SELECT_KEY);
    if (!raw) return ALPHABET.map((item) => item.letter);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : ALPHABET.map((item) => item.letter);
  } catch {
    return ALPHABET.map((item) => item.letter);
  }
}

function persistSelected() {
  localStorage.setItem(SELECT_KEY, JSON.stringify([...selected]));
}

function bindNavigation() {
  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-view]');
    if (!target) return;
    event.preventDefault();
    showView(target.dataset.view);
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      showView(tab.dataset.view);
    });
  });
}

function showView(name) {
  views.forEach((view) => {
    view.classList.toggle('active', view.id === `view-${name}`);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.view === name);
  });

  if (name === 'study') {
    if (selected.size > 0 && studyQueue.length === 0) {
      startStudy();
    } else {
      updateStudyUI();
    }
    focusStudyInput();
  }
}

function focusStudyInput() {
  requestAnimationFrame(() => {
    const active = document.getElementById('study-active');
    const input = document.getElementById('study-input');
    if (active && !active.classList.contains('hidden') && input && !input.disabled) {
      input.focus();
    }
  });
}

function bindSelection() {
  document.getElementById('btn-add-all').addEventListener('click', () => {
    selected = new Set(ALPHABET.map((item) => item.letter));
    persistSelected();
    renderAlphabetGrid();
    renderGroups();
    renderSelectionTray();
  });

  document.getElementById('btn-clear').addEventListener('click', () => {
    selected.clear();
    persistSelected();
    renderAlphabetGrid();
    renderGroups();
    renderSelectionTray();
  });

  document.getElementById('btn-start-study').addEventListener('click', () => {
    startStudy();
    showView('study');
  });
}

function toggleLetter(letter) {
  if (selected.has(letter)) {
    selected.delete(letter);
  } else {
    selected.add(letter);
  }
  persistSelected();
  renderAlphabetGrid();
  renderGroups();
  renderSelectionTray();
}

function renderAlphabetGrid() {
  const grid = document.getElementById('alphabet-grid');
  grid.innerHTML = '';

  ALPHABET.forEach((item, index) => {
    if (index > 0 && index % GRID_COLS === 0) {
      grid.appendChild(document.createElement('div')).className = 'grid-break';
    }

    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = `char-cell${selected.has(item.letter) ? ' selected' : ''}`;
    cell.dataset.letter = item.letter;
    cell.innerHTML = `
      <span class="char-letter">${item.letter}</span>
      <span class="char-roman">${item.roman}</span>
      <span class="char-audio" aria-hidden="true">🔊</span>
    `;
    cell.addEventListener('click', (event) => {
      if (event.target.closest('.char-audio')) {
        event.stopPropagation();
        playLetterAudio(item);
        return;
      }
      toggleLetter(item.letter);
    });
    grid.appendChild(cell);
  });
}

function renderGroups() {
  const container = document.getElementById('groups-container');
  container.innerHTML = '';

  Object.values(GROUPS).forEach((group) => {
    const items = getGroupItems(group.id);
    const section = document.createElement('section');
    section.className = 'group-section';

    const allSelected = items.every((item) => selected.has(item.letter));

    section.innerHTML = `
      <div class="group-header">
        <div>
          <h3>${getGroupLabel(group)}</h3>
          <p>${getGroupDesc(group)}</p>
        </div>
        <button type="button" class="btn btn-secondary btn-sm group-toggle" data-group="${group.id}">
          ${allSelected ? t('groupDeselectAll') : t('groupSelectAll')}
        </button>
      </div>
      <div class="char-grid group-grid" data-group-grid="${group.id}"></div>
    `;

    const grid = section.querySelector('.group-grid');
    items.forEach((item) => {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = `char-cell${selected.has(item.letter) ? ' selected' : ''}`;
      cell.innerHTML = `
        <span class="char-letter">${item.letter}</span>
        <span class="char-roman">${item.roman}</span>
        <span class="char-audio" aria-hidden="true">🔊</span>
      `;
      cell.addEventListener('click', (event) => {
        if (event.target.closest('.char-audio')) {
          event.stopPropagation();
          playLetterAudio(item);
          return;
        }
        toggleLetter(item.letter);
      });
      grid.appendChild(cell);
    });

    section.querySelector('.group-toggle').addEventListener('click', () => {
      if (allSelected) {
        items.forEach((item) => selected.delete(item.letter));
      } else {
        items.forEach((item) => selected.add(item.letter));
      }
      persistSelected();
      renderAlphabetGrid();
      renderGroups();
      renderSelectionTray();
    });

    container.appendChild(section);
  });
}

function renderSelectionTray() {
  const tray = document.getElementById('selection-tray');
  tray.innerHTML = '';

  if (selected.size === 0) {
    tray.innerHTML = `<span class="tray-empty">${t('trayEmpty')}</span>`;
    return;
  }

  ALPHABET.filter((item) => selected.has(item.letter)).forEach((item) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'tray-chip';
    chip.textContent = item.letter;
    chip.title = item.roman;
    chip.addEventListener('click', () => toggleLetter(item.letter));
    tray.appendChild(chip);
  });
}

function bindSettings() {
  document.getElementById('settings-form').addEventListener('change', () => {
    settings = {
      direction: document.getElementById('setting-direction').value,
      order: document.getElementById('setting-order').value,
      showIpa: document.getElementById('setting-show-ipa').checked,
      showExample: document.getElementById('setting-show-example').checked,
      autoReveal: document.getElementById('setting-auto-reveal').checked,
    };
    saveSettings();
    updateStudyHint();
  });
}

function applySettingsToForm() {
  document.getElementById('setting-direction').value = settings.direction;
  document.getElementById('setting-order').value = settings.order;
  document.getElementById('setting-show-ipa').checked = settings.showIpa;
  document.getElementById('setting-show-example').checked = settings.showExample;
  document.getElementById('setting-auto-reveal').checked = settings.autoReveal;
  applyTranslations();
  updateStudyHint();
}

function updateStudyHint() {
  const hint = document.getElementById('study-hint');
  hint.textContent =
    settings.direction === 'letter-to-roman'
      ? t('hintLetterToRoman')
      : t('hintRomanToLetter');
}

function startStudy() {
  clearAdvanceTimer();

  const items = ALPHABET.filter((item) => selected.has(item.letter));
  if (items.length === 0) {
    studyQueue = [];
    updateStudyUI();
    return;
  }

  studyQueue = settings.order === 'random' ? shuffle([...items]) : [...items];
  studyIndex = 0;
  studyCorrect = 0;
  studySkipped = 0;
  updateStudyUI();
  showCurrentQuestion();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function bindStudy() {
  const form = document.getElementById('study-form');
  const input = document.getElementById('study-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitAnswer();
  });

  input.addEventListener('input', () => {
    const feedback = document.getElementById('study-feedback');
    if (input.classList.contains('incorrect')) {
      input.classList.remove('incorrect');
      feedback.textContent = '';
      feedback.className = 'study-feedback';
    }
  });

  document.getElementById('btn-skip').addEventListener('click', () => {
    studySkipped += 1;
    revealFeedback({ correct: false, skipped: true });
    setTimeout(nextQuestion, 900);
  });

  document.getElementById('btn-reveal').addEventListener('click', () => {
    revealFeedback({ correct: false, reveal: true });
  });

  document.getElementById('btn-speak').addEventListener('click', speakCurrent);
  document.getElementById('btn-restart').addEventListener('click', () => {
    startStudy();
  });
}

function updateStudyUI() {
  const empty = document.getElementById('study-empty');
  const active = document.getElementById('study-active');
  const done = document.getElementById('study-done');

  if (selected.size === 0 || studyQueue.length === 0) {
    empty.classList.remove('hidden');
    active.classList.add('hidden');
    done.classList.add('hidden');
    return;
  }

  if (studyIndex >= studyQueue.length) {
    empty.classList.add('hidden');
    active.classList.add('hidden');
    done.classList.remove('hidden');
    document.getElementById('study-summary').textContent = t('summary', {
      total: studyQueue.length,
      correct: studyCorrect,
      skipped: studySkipped,
    });
    return;
  }

  empty.classList.add('hidden');
  active.classList.remove('hidden');
  done.classList.add('hidden');

  document.getElementById('study-progress').textContent =
    `${studyIndex + 1} / ${studyQueue.length}`;
  document.getElementById('study-score').textContent = `✓ ${studyCorrect}`;
}

function refreshQuestionSub() {
  if (studyIndex >= studyQueue.length) return;
  const item = studyQueue[studyIndex];
  const sub = document.getElementById('study-sub');
  if (settings.direction === 'letter-to-roman') {
    sub.textContent = settings.showExample ? getExampleText(item) : '';
  } else {
    sub.textContent = settings.showExample ? item.exampleWord.split(' ')[0] : '';
  }
  if (settings.showIpa) {
    sub.textContent = [sub.textContent, item.ipa].filter(Boolean).join(' · ');
  }
}

function showCurrentQuestion() {
  clearAdvanceTimer();
  updateStudyUI();
  if (studyIndex >= studyQueue.length) return;

  const item = studyQueue[studyIndex];
  const prompt = document.getElementById('study-prompt');
  const sub = document.getElementById('study-sub');
  const input = document.getElementById('study-input');
  const feedback = document.getElementById('study-feedback');

  feedback.textContent = '';
  feedback.className = 'study-feedback';
  input.value = '';
  input.disabled = false;
  input.classList.remove('correct', 'incorrect');

  if (settings.direction === 'letter-to-roman') {
    prompt.textContent = item.letter;
    prompt.className = 'study-prompt georgian';
  } else {
    prompt.textContent = item.roman;
    prompt.className = 'study-prompt roman';
  }

  refreshQuestionSub();

  input.dataset.i18nPlaceholder =
    settings.direction === 'letter-to-roman' ? 'inputRoman' : 'inputLetter';
  input.placeholder = t(input.dataset.i18nPlaceholder);

  focusStudyInput();

  if (settings.direction === 'letter-to-roman') {
    playLetterAudio(item);
  }
}

function submitAnswer() {
  if (advanceTimer) return;

  const input = document.getElementById('study-input');
  const item = studyQueue[studyIndex];
  const correct = isCorrectAnswer(item, input.value, settings.direction);

  if (correct) {
    studyCorrect += 1;
    revealFeedback({ correct: true });
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      nextQuestion();
    }, 650);
    return;
  }

  revealFeedback({ correct: false });
}

function clearAdvanceTimer() {
  if (advanceTimer) {
    clearTimeout(advanceTimer);
    advanceTimer = null;
  }
}

function revealFeedback({ correct, skipped = false, reveal = false }) {
  const item = studyQueue[studyIndex];
  const input = document.getElementById('study-input');
  const feedback = document.getElementById('study-feedback');
  const accepted = getAcceptedAnswers(item, settings.direction).join(' / ');

  if (correct) {
    input.disabled = true;
    input.classList.add('correct');
    feedback.className = 'study-feedback success';
    feedback.textContent = t('correct');
    return;
  }

  input.disabled = false;
  input.classList.add('incorrect');
  feedback.className = 'study-feedback error';

  if (skipped) {
    input.disabled = true;
    feedback.textContent = t('skippedAnswer', { answer: accepted });
    return;
  }

  if (reveal) {
    const exampleSuffix = item.exampleWord
      ? ` · ${getExampleText(item)}`
      : '';
    feedback.textContent = t('revealAnswer', {
      answer: accepted,
      example: exampleSuffix,
    });
    input.focus();
    input.select();
    return;
  }

  feedback.textContent = settings.autoReveal
    ? t('wrongWithAnswer', { answer: accepted })
    : t('wrongRetry');
  input.focus();
  input.select();
}

function nextQuestion() {
  studyIndex += 1;
  showCurrentQuestion();
}

function speakCurrent() {
  if (studyIndex >= studyQueue.length) return;
  playLetterAudio(studyQueue[studyIndex]);
}
