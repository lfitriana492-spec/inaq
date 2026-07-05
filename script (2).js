// Virtual Computer Keyboard - HTML, CSS, JavaScript (ES6)
// Struktur utama: membangun keyboard, mengatur event, dan mengelola fitur editor.

const editor = document.getElementById('editor');
const keyboardEl = document.getElementById('keyboard');
const soundToggleBtn = document.getElementById('soundToggle');
const themeToggleBtn = document.getElementById('themeToggle');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const uploadInput = document.getElementById('uploadInput');
const themeSelect = document.getElementById('themeSelect');
const sizeSelect = document.getElementById('sizeSelect');
const fontSelect = document.getElementById('fontSelect');
const fontSizeRange = document.getElementById('fontSizeRange');
const fontSizeValue = document.getElementById('fontSizeValue');
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const lineCountEl = document.getElementById('lineCount');
const wpmCountEl = document.getElementById('wpmCount');
const timerCountEl = document.getElementById('timerCount');
const capsStateEl = document.getElementById('capsState');
const numStateEl = document.getElementById('numState');
const ctrlStateEl = document.getElementById('ctrlState');
const altStateEl = document.getElementById('altState');
const altGrStateEl = document.getElementById('altGrState');
const winStateEl = document.getElementById('winState');
const shiftStateEl = document.getElementById('shiftState');

const layout = [
  [
    { label: 'Esc', code: 'Escape', width: 1.1, type: 'special' },
    { label: 'F1', code: 'F1', width: 1 },
    { label: 'F2', code: 'F2', width: 1 },
    { label: 'F3', code: 'F3', width: 1 },
    { label: 'F4', code: 'F4', width: 1 },
    { label: 'F5', code: 'F5', width: 1 },
    { label: 'F6', code: 'F6', width: 1 },
    { label: 'F7', code: 'F7', width: 1 },
    { label: 'F8', code: 'F8', width: 1 },
    { label: 'F9', code: 'F9', width: 1 },
    { label: 'F10', code: 'F10', width: 1 },
    { label: 'F11', code: 'F11', width: 1 },
    { label: 'F12', code: 'F12', width: 1 },
    { label: 'PrtSc', code: 'PrintScreen', width: 1.1, type: 'special' },
    { label: 'ScrLk', code: 'ScrollLock', width: 1.1, type: 'special' },
    { label: 'Pause', code: 'Pause', width: 1.2, type: 'special' },
  ],
  [
    { label: '`', code: 'Backquote', width: 1, value: '`', shiftValue: '~' },
    { label: '1', code: 'Digit1', width: 1, value: '1', shiftValue: '!' },
    { label: '2', code: 'Digit2', width: 1, value: '2', shiftValue: '@' },
    { label: '3', code: 'Digit3', width: 1, value: '3', shiftValue: '#' },
    { label: '4', code: 'Digit4', width: 1, value: '4', shiftValue: '$' },
    { label: '5', code: 'Digit5', width: 1, value: '5', shiftValue: '%' },
    { label: '6', code: 'Digit6', width: 1, value: '6', shiftValue: '^' },
    { label: '7', code: 'Digit7', width: 1, value: '7', shiftValue: '&' },
    { label: '8', code: 'Digit8', width: 1, value: '8', shiftValue: '*' },
    { label: '9', code: 'Digit9', width: 1, value: '9', shiftValue: '(' },
    { label: '0', code: 'Digit0', width: 1, value: '0', shiftValue: ')' },
    { label: '-', code: 'Minus', width: 1, value: '-', shiftValue: '_' },
    { label: '=', code: 'Equal', width: 1, value: '=', shiftValue: '+' },
    { label: 'Backspace', code: 'Backspace', width: 2.2, action: 'backspace', type: 'special' },
  ],
  [
    { label: 'Tab', code: 'Tab', width: 1.5, action: 'tab', type: 'special' },
    { label: 'Q', code: 'KeyQ', width: 1, value: 'q', shiftValue: 'Q' },
    { label: 'W', code: 'KeyW', width: 1, value: 'w', shiftValue: 'W' },
    { label: 'E', code: 'KeyE', width: 1, value: 'e', shiftValue: 'E' },
    { label: 'R', code: 'KeyR', width: 1, value: 'r', shiftValue: 'R' },
    { label: 'T', code: 'KeyT', width: 1, value: 't', shiftValue: 'T' },
    { label: 'Y', code: 'KeyY', width: 1, value: 'y', shiftValue: 'Y' },
    { label: 'U', code: 'KeyU', width: 1, value: 'u', shiftValue: 'U' },
    { label: 'I', code: 'KeyI', width: 1, value: 'i', shiftValue: 'I' },
    { label: 'O', code: 'KeyO', width: 1, value: 'o', shiftValue: 'O' },
    { label: 'P', code: 'KeyP', width: 1, value: 'p', shiftValue: 'P' },
    { label: '[', code: 'BracketLeft', width: 1, value: '[', shiftValue: '{' },
    { label: ']', code: 'BracketRight', width: 1, value: ']', shiftValue: '}' },
    { label: '\\', code: 'Backslash', width: 1.3, value: '\\', shiftValue: '|' },
  ],
  [
    { label: 'Caps', code: 'CapsLock', width: 1.8, action: 'caps', type: 'modifier' },
    { label: 'A', code: 'KeyA', width: 1, value: 'a', shiftValue: 'A' },
    { label: 'S', code: 'KeyS', width: 1, value: 's', shiftValue: 'S' },
    { label: 'D', code: 'KeyD', width: 1, value: 'd', shiftValue: 'D' },
    { label: 'F', code: 'KeyF', width: 1, value: 'f', shiftValue: 'F' },
    { label: 'G', code: 'KeyG', width: 1, value: 'g', shiftValue: 'G' },
    { label: 'H', code: 'KeyH', width: 1, value: 'h', shiftValue: 'H' },
    { label: 'J', code: 'KeyJ', width: 1, value: 'j', shiftValue: 'J' },
    { label: 'K', code: 'KeyK', width: 1, value: 'k', shiftValue: 'K' },
    { label: 'L', code: 'KeyL', width: 1, value: 'l', shiftValue: 'L' },
    { label: ';', code: 'Semicolon', width: 1, value: ';', shiftValue: ':' },
    { label: "'", code: 'Quote', width: 1, value: "'", shiftValue: '"' },
    { label: 'Enter', code: 'Enter', width: 2.4, action: 'enter', type: 'special' },
  ],
  [
    { label: 'Shift', code: 'ShiftLeft', width: 2.4, action: 'shift', type: 'modifier' },
    { label: 'Z', code: 'KeyZ', width: 1, value: 'z', shiftValue: 'Z' },
    { label: 'X', code: 'KeyX', width: 1, value: 'x', shiftValue: 'X' },
    { label: 'C', code: 'KeyC', width: 1, value: 'c', shiftValue: 'C' },
    { label: 'V', code: 'KeyV', width: 1, value: 'v', shiftValue: 'V' },
    { label: 'B', code: 'KeyB', width: 1, value: 'b', shiftValue: 'B' },
    { label: 'N', code: 'KeyN', width: 1, value: 'n', shiftValue: 'N' },
    { label: 'M', code: 'KeyM', width: 1, value: 'm', shiftValue: 'M' },
    { label: ',', code: 'Comma', width: 1, value: ',', shiftValue: '<' },
    { label: '.', code: 'Period', width: 1, value: '.', shiftValue: '>' },
    { label: '/', code: 'Slash', width: 1, value: '/', shiftValue: '?' },
    { label: 'Shift', code: 'ShiftRight', width: 2.4, action: 'shift', type: 'modifier' },
  ],
  [
    { label: 'Ctrl', code: 'ControlLeft', width: 1.4, action: 'ctrl', type: 'modifier' },
    { label: 'Win', code: 'MetaLeft', width: 1.2, action: 'win', type: 'modifier' },
    { label: 'Alt', code: 'AltLeft', width: 1.2, action: 'alt', type: 'modifier' },
    { label: 'Space', code: 'Space', width: 6.6, action: 'space', type: 'special' },
    { label: 'AltGr', code: 'AltRight', width: 1.2, action: 'altgr', type: 'modifier' },
    { label: 'Menu', code: 'ContextMenu', width: 1.2, action: 'menu', type: 'modifier' },
    { label: 'Ctrl', code: 'ControlRight', width: 1.4, action: 'ctrl', type: 'modifier' },
  ],
  [
    { label: 'Ins', code: 'Insert', width: 1, action: 'insert', type: 'special' },
    { label: 'Del', code: 'Delete', width: 1, action: 'delete', type: 'special' },
    { label: 'Home', code: 'Home', width: 1, action: 'home', type: 'special' },
    { label: 'End', code: 'End', width: 1, action: 'end', type: 'special' },
    { label: 'PgUp', code: 'PageUp', width: 1, action: 'pageup', type: 'special' },
    { label: 'PgDn', code: 'PageDown', width: 1, action: 'pagedown', type: 'special' },
    { label: '↑', code: 'ArrowUp', width: 1, action: 'arrowup', type: 'special' },
    { label: '↓', code: 'ArrowDown', width: 1, action: 'arrowdown', type: 'special' },
    { label: '←', code: 'ArrowLeft', width: 1, action: 'arrowleft', type: 'special' },
    { label: '→', code: 'ArrowRight', width: 1, action: 'arrowright', type: 'special' },
  ],
  [
    { label: 'Num Lock', code: 'NumLock', width: 1.4, action: 'numlock', type: 'modifier' },
    { label: '/', code: 'NumpadDivide', width: 1, value: '/', shiftValue: '/' },
    { label: '*', code: 'NumpadMultiply', width: 1, value: '*', shiftValue: '*' },
    { label: '-', code: 'NumpadSubtract', width: 1, value: '-', shiftValue: '-' },
    { label: '7', code: 'Numpad7', width: 1, value: '7', shiftValue: '7' },
    { label: '8', code: 'Numpad8', width: 1, value: '8', shiftValue: '8' },
    { label: '9', code: 'Numpad9', width: 1, value: '9', shiftValue: '9' },
    { label: '+', code: 'NumpadAdd', width: 1.1, value: '+', shiftValue: '+' },
    { label: '4', code: 'Numpad4', width: 1, value: '4', shiftValue: '4' },
    { label: '5', code: 'Numpad5', width: 1, value: '5', shiftValue: '5' },
    { label: '6', code: 'Numpad6', width: 1, value: '6', shiftValue: '6' },
    { label: '1', code: 'Numpad1', width: 1, value: '1', shiftValue: '1' },
    { label: '2', code: 'Numpad2', width: 1, value: '2', shiftValue: '2' },
    { label: '3', code: 'Numpad3', width: 1, value: '3', shiftValue: '3' },
    { label: 'Enter', code: 'NumpadEnter', width: 1.4, action: 'enter', type: 'special' },
    { label: '0', code: 'Numpad0', width: 1.8, value: '0', shiftValue: '0' },
    { label: '.', code: 'NumpadDecimal', width: 1, value: '.', shiftValue: '.' },
  ],
];

const state = {
  capsLock: false,
  numLock: false,
  shift: false,
  ctrl: false,
  alt: false,
  altGr: false,
  win: false,
  sound: true,
  theme: 'auto',
  size: 'medium',
  font: 'Inter',
  fontSize: 18,
  startTime: null,
  charsTyped: 0,
};

const audioCtx = window.AudioContext ? new AudioContext() : null;

function renderKeyboard() {
  keyboardEl.innerHTML = '';
  layout.forEach((row) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'keyboard-row';

    row.forEach((key) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `key ${key.type === 'modifier' ? 'modifier' : ''} ${key.action === 'space' ? 'space' : ''}`;
      button.dataset.code = key.code;
      button.dataset.action = key.action || '';
      button.style.setProperty('--key-size', key.width || 1);
      button.innerHTML = `<span>${key.label}</span>`;

      button.addEventListener('mousedown', (event) => {
        event.preventDefault();
        handleVirtualKey(key);
      });

      rowEl.appendChild(button);
    });

    keyboardEl.appendChild(rowEl);
  });
}

function handleVirtualKey(key) {
  playSound();

  if (key.action === 'backspace') {
    handleBackspace();
    return;
  }

  if (key.action === 'tab') {
    insertText('\t');
    return;
  }

  if (key.action === 'enter') {
    insertText('\n');
    return;
  }

  if (key.action === 'space') {
    insertText(' ');
    return;
  }

  if (key.action === 'caps') {
    toggleCapsLock();
    return;
  }

  if (key.action === 'numlock') {
    toggleNumLock();
    return;
  }

  if (key.action === 'shift') {
    toggleModifier('shift');
    return;
  }

  if (key.action === 'ctrl') {
    toggleModifier('ctrl');
    return;
  }

  if (key.action === 'alt') {
    toggleModifier('alt');
    return;
  }

  if (key.action === 'altgr') {
    toggleModifier('altGr');
    return;
  }

  if (key.action === 'win') {
    toggleModifier('win');
    return;
  }

  if (key.action === 'menu') {
    toggleModifier('menu');
    return;
  }

  if (key.action === 'insert') {
    insertText('');
    return;
  }

  if (key.action === 'delete') {
    handleDelete();
    return;
  }

  if (key.action === 'home') {
    moveCursor('home');
    return;
  }

  if (key.action === 'end') {
    moveCursor('end');
    return;
  }

  if (key.action === 'pageup') {
    moveCursor('pageup');
    return;
  }

  if (key.action === 'pagedown') {
    moveCursor('pagedown');
    return;
  }

  if (key.action === 'arrowleft') {
    moveCursor('left');
    return;
  }

  if (key.action === 'arrowright') {
    moveCursor('right');
    return;
  }

  if (key.action === 'arrowup') {
    moveCursor('up');
    return;
  }

  if (key.action === 'arrowdown') {
    moveCursor('down');
    return;
  }

  const text = getPrintableValue(key);
  if (text) {
    insertText(text);
  }
}

function getPrintableValue(key) {
  if (key.value) {
    if (state.shift) {
      return key.shiftValue || key.value;
    }
    return key.value;
  }

  if (key.code && key.code.startsWith('Key')) {
    const letter = key.code.replace('Key', '').toLowerCase();
    return state.capsLock ? letter.toUpperCase() : letter;
  }

  return key.label;
}

function insertText(text) {
  if (!text && text !== '') {
    return;
  }

  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const prev = editor.value;
  const next = prev.slice(0, start) + text + prev.slice(end);
  editor.value = next;
  const cursor = start + text.length;
  editor.focus();
  editor.setSelectionRange(cursor, cursor);
  editor.dispatchEvent(new Event('input', { bubbles: true }));
}

function handleBackspace() {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  if (start === end) {
    if (state.ctrl) {
      const prev = editor.value.slice(0, start);
      const match = prev.match(/\s*\S*$/);
      const cut = prev.slice(0, match.index || 0);
      editor.value = cut + editor.value.slice(end);
      editor.setSelectionRange(cut.length, cut.length);
    } else {
      editor.value = editor.value.slice(0, start - 1) + editor.value.slice(end);
      editor.setSelectionRange(Math.max(0, start - 1), Math.max(0, start - 1));
    }
  } else {
    editor.value = editor.value.slice(0, start) + editor.value.slice(end);
    editor.setSelectionRange(start, start);
  }
  editor.dispatchEvent(new Event('input', { bubbles: true }));
}

function handleDelete() {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  if (start === end) {
    if (state.ctrl) {
      const remaining = editor.value.slice(end);
      const match = remaining.match(/^\s*\S*/);
      const next = remaining.slice((match[0] || '').length);
      editor.value = editor.value.slice(0, start) + next;
      editor.setSelectionRange(start, start);
    } else {
      editor.value = editor.value.slice(0, start) + editor.value.slice(start + 1);
      editor.setSelectionRange(start, start);
    }
  } else {
    editor.value = editor.value.slice(0, start) + editor.value.slice(end);
    editor.setSelectionRange(start, start);
  }
  editor.dispatchEvent(new Event('input', { bubbles: true }));
}

function moveCursor(mode) {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const value = editor.value;

  if (mode === 'left' || mode === 'right') {
    const offset = mode === 'left' ? -1 : 1;
    const nextPos = Math.max(0, Math.min(value.length, start + offset));
    editor.setSelectionRange(nextPos, nextPos);
    return;
  }

  if (mode === 'up') {
    const line = value.slice(0, start).split('\n').length - 1;
    const previousLine = value.split('\n')[line - 1] || '';
    const position = Math.min(previousLine.length, start);
    editor.setSelectionRange(position, position);
    return;
  }

  if (mode === 'down') {
    const lines = value.split('\n');
    const lineIndex = value.slice(0, start).split('\n').length - 1;
    const nextLine = lines[lineIndex + 1] || '';
    const position = Math.min(nextLine.length, start);
    editor.setSelectionRange(position, position);
    return;
  }

  if (mode === 'home') {
    const lastNewline = value.lastIndexOf('\n', start - 1);
    const nextPos = lastNewline + 1;
    editor.setSelectionRange(nextPos, nextPos);
    return;
  }

  if (mode === 'end') {
    const nextNewline = value.indexOf('\n', start);
    const nextPos = nextNewline === -1 ? value.length : nextNewline;
    editor.setSelectionRange(nextPos, nextPos);
    return;
  }

  if (mode === 'pageup') {
    editor.setSelectionRange(0, 0);
    return;
  }

  if (mode === 'pagedown') {
    editor.setSelectionRange(editor.value.length, editor.value.length);
  }
}

function toggleCapsLock() {
  state.capsLock = !state.capsLock;
  updateModifierIndicators();
}

function toggleNumLock() {
  state.numLock = !state.numLock;
  updateModifierIndicators();
}

function toggleModifier(name) {
  if (name === 'shift') {
    state.shift = !state.shift;
  } else if (name === 'ctrl') {
    state.ctrl = !state.ctrl;
  } else if (name === 'alt') {
    state.alt = !state.alt;
  } else if (name === 'altGr') {
    state.altGr = !state.altGr;
  } else if (name === 'win') {
    state.win = !state.win;
  }
  updateModifierIndicators();
}

function updateModifierIndicators() {
  capsStateEl.textContent = state.capsLock ? 'On' : 'Off';
  numStateEl.textContent = state.numLock ? 'On' : 'Off';
  ctrlStateEl.textContent = state.ctrl ? 'On' : 'Off';
  altStateEl.textContent = state.alt ? 'On' : 'Off';
  altGrStateEl.textContent = state.altGr ? 'On' : 'Off';
  winStateEl.textContent = state.win ? 'On' : 'Off';
  shiftStateEl.textContent = state.shift ? 'On' : 'Off';

  document.querySelectorAll('.status-pill').forEach((pill) => pill.classList.remove('active'));
  if (state.capsLock) capsStateEl.parentElement.classList.add('active');
  if (state.numLock) numStateEl.parentElement.classList.add('active');
  if (state.ctrl) ctrlStateEl.parentElement.classList.add('active');
  if (state.alt) altStateEl.parentElement.classList.add('active');
  if (state.altGr) altGrStateEl.parentElement.classList.add('active');
  if (state.win) winStateEl.parentElement.classList.add('active');
  if (state.shift) shiftStateEl.parentElement.classList.add('active');

  document.querySelectorAll('.key.modifier').forEach((key) => {
    const action = key.dataset.action;
    const active =
      (action === 'caps' && state.capsLock) ||
      (action === 'numlock' && state.numLock) ||
      (action === 'shift' && state.shift) ||
      (action === 'ctrl' && state.ctrl) ||
      (action === 'alt' && state.alt) ||
      (action === 'altgr' && state.altGr) ||
      (action === 'win' && state.win);
    key.classList.toggle('active', active);
  });
}

function updateStats() {
  const text = editor.value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const lines = text ? text.split(/\n/).length : 1;

  wordCountEl.textContent = words;
  charCountEl.textContent = chars;
  lineCountEl.textContent = lines;

  if (state.startTime === null && text.length > 0) {
    state.startTime = Date.now();
  }

  if (state.startTime && text.length > 0) {
    const elapsedMinutes = (Date.now() - state.startTime) / 60000;
    const wpm = elapsedMinutes > 0 ? Math.round((chars / 5) / elapsedMinutes) : 0;
    wpmCountEl.textContent = wpm;
    const elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
    const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const secs = String(elapsedSeconds % 60).padStart(2, '0');
    timerCountEl.textContent = `${mins}:${secs}`;
  } else {
    wpmCountEl.textContent = '0';
    timerCountEl.textContent = '00:00';
  }
}

function clearEditor() {
  editor.value = '';
  state.startTime = null;
  updateStats();
  editor.focus();
}

function copyText() {
  const selection = editor.value;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(selection).catch(() => {
      document.execCommand('copy');
    });
  } else {
    document.execCommand('copy');
  }
}

function downloadText() {
  const blob = new Blob([editor.value], { type: 'text/plain;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = 'virtual-keyboard.txt';
  link.click();
  URL.revokeObjectURL(href);
}

function uploadText(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    editor.value = reader.result;
    updateStats();
  };
  reader.readAsText(file);
}

function toggleTheme(mode) {
  state.theme = mode;
  document.body.dataset.theme = mode;
  themeSelect.value = mode;
  themeToggleBtn.textContent = `Theme: ${mode === 'auto' ? 'Auto' : mode[0].toUpperCase() + mode.slice(1)}`;
}

function applyThemeSettings() {
  const selectedTheme = themeSelect.value;
  if (selectedTheme === 'auto') {
    document.body.dataset.theme = 'auto';
    state.theme = 'auto';
  } else {
    document.body.dataset.theme = selectedTheme;
    state.theme = selectedTheme;
  }
  themeToggleBtn.textContent = `Theme: ${state.theme === 'auto' ? 'Auto' : state.theme[0].toUpperCase() + state.theme.slice(1)}`;
}

function applySizeSetting() {
  state.size = sizeSelect.value;
  const sizeMap = { small: '46px', medium: '54px', large: '62px' };
  document.documentElement.style.setProperty('--keyboard-scale', sizeMap[state.size]);
}

function applyFontSetting() {
  state.font = fontSelect.value;
  document.documentElement.style.setProperty('--font-family', state.font);
}

function applyFontSize() {
  state.fontSize = Number(fontSizeRange.value);
  fontSizeValue.textContent = `${state.fontSize}px`;
  document.documentElement.style.setProperty('--editor-font-size', `${state.fontSize}px`);
}

function playSound() {
  if (!state.sound || !audioCtx) {
    return;
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(740, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(520, audioCtx.currentTime + 0.08);
  gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.13);
}

function toggleSound() {
  state.sound = !state.sound;
  soundToggleBtn.textContent = `Sound: ${state.sound ? 'ON' : 'OFF'}`;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function handleKeyboardShortcuts(event) {
  const { key, ctrlKey, shiftKey, metaKey, altKey } = event;

  if (ctrlKey || metaKey) {
    const lowered = key.toLowerCase();
    if (lowered === 'a') {
      event.preventDefault();
      editor.select();
      return;
    }
    if (lowered === 'c') {
      event.preventDefault();
      copyText();
      return;
    }
    if (lowered === 'v') {
      event.preventDefault();
      navigator.clipboard?.readText?.().then((text) => {
        insertText(text);
      });
      return;
    }
    if (lowered === 'x') {
      event.preventDefault();
      const selected = editor.value.slice(editor.selectionStart, editor.selectionEnd);
      copyText();
      editor.value = editor.value.slice(0, editor.selectionStart) + editor.value.slice(editor.selectionEnd);
      updateStats();
      editor.focus();
      return;
    }
    if (lowered === 'z') {
      event.preventDefault();
      editor.value = editor.value.slice(0, -1);
      updateStats();
      return;
    }
    if (lowered === 'y') {
      event.preventDefault();
      editor.value += '';
      return;
    }
    if (lowered === 's') {
      event.preventDefault();
      downloadText();
      return;
    }
    if (lowered === 'f') {
      event.preventDefault();
      editor.focus();
      return;
    }
    if (lowered === 'backspace') {
      event.preventDefault();
      handleBackspace();
      return;
    }
    if (lowered === 'delete') {
      event.preventDefault();
      handleDelete();
      return;
    }
  }

  if (shiftKey && (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown')) {
    event.preventDefault();
    const direction = key.replace('Arrow', '').toLowerCase();
    moveCursor(direction);
    return;
  }

  if (ctrlKey && (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown')) {
    event.preventDefault();
    const direction = key.replace('Arrow', '').toLowerCase();
    moveCursor(direction);
    return;
  }

  if (key === 'Home') {
    event.preventDefault();
    moveCursor('home');
    return;
  }

  if (key === 'End') {
    event.preventDefault();
    moveCursor('end');
    return;
  }

  if (key === 'PageUp') {
    event.preventDefault();
    moveCursor('pageup');
    return;
  }

  if (key === 'PageDown') {
    event.preventDefault();
    moveCursor('pagedown');
    return;
  }
}

function bindEvents() {
  editor.addEventListener('input', updateStats);
  editor.addEventListener('focus', () => editor.classList.add('is-focused'));
  editor.addEventListener('blur', () => editor.classList.remove('is-focused'));

  themeSelect.addEventListener('change', applyThemeSettings);
  sizeSelect.addEventListener('change', applySizeSetting);
  fontSelect.addEventListener('change', applyFontSetting);
  fontSizeRange.addEventListener('input', applyFontSize);

  clearBtn.addEventListener('click', clearEditor);
  copyBtn.addEventListener('click', copyText);
  downloadBtn.addEventListener('click', downloadText);
  uploadInput.addEventListener('change', uploadText);
  soundToggleBtn.addEventListener('click', toggleSound);
  themeToggleBtn.addEventListener('click', () => {
    const nextTheme = state.theme === 'dark' ? 'light' : state.theme === 'light' ? 'auto' : 'dark';
    toggleTheme(nextTheme);
  });
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  window.addEventListener('keydown', (event) => {
    const keyEl = document.querySelector(`[data-code="${event.code}"]`);
    if (keyEl) {
      keyEl.classList.add('active');
    }

    if (event.code === 'CapsLock') {
      event.preventDefault();
      toggleCapsLock();
      return;
    }

    if (event.code === 'NumLock') {
      event.preventDefault();
      toggleNumLock();
      return;
    }

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      state.shift = true;
      updateModifierIndicators();
      playSound();
      return;
    }

    if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
      state.ctrl = true;
      updateModifierIndicators();
      playSound();
      return;
    }

    if (event.code === 'AltLeft' || event.code === 'AltRight') {
      state.alt = true;
      if (event.code === 'AltRight') {
        state.altGr = true;
      }
      updateModifierIndicators();
      playSound();
      return;
    }

    if (event.code === 'MetaLeft' || event.code === 'MetaRight') {
      state.win = true;
      updateModifierIndicators();
      playSound();
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      insertText('\t');
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      insertText('\n');
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      handleBackspace();
      return;
    }

    if (event.key === 'Delete') {
      event.preventDefault();
      handleDelete();
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const direction = event.key.replace('Arrow', '').toLowerCase();
      moveCursor(direction);
      return;
    }

    handleKeyboardShortcuts(event);
  });

  window.addEventListener('keyup', (event) => {
    const keyEl = document.querySelector(`[data-code="${event.code}"]`);
    if (keyEl) {
      keyEl.classList.remove('active');
    }

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      state.shift = false;
      updateModifierIndicators();
      return;
    }

    if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
      state.ctrl = false;
      updateModifierIndicators();
      return;
    }

    if (event.code === 'AltLeft' || event.code === 'AltRight') {
      state.alt = false;
      state.altGr = false;
      updateModifierIndicators();
      return;
    }

    if (event.code === 'MetaLeft' || event.code === 'MetaRight') {
      state.win = false;
      updateModifierIndicators();
    }
  });
}

function init() {
  renderKeyboard();
  bindEvents();
  applyThemeSettings();
  applySizeSetting();
  applyFontSetting();
  applyFontSize();
  updateModifierIndicators();
  updateStats();
  editor.focus();
  setInterval(updateStats, 1000);
}

init();
