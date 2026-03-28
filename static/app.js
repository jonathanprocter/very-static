const suggestions = {
  happy: ['elated', 'jubilant', 'radiant'],
  sad: ['despondent', 'heartbroken', 'sorrowful'],
  angry: ['irate', 'livid', 'incensed'],
  tired: ['exhausted', 'spent', 'weary'],
  scared: ['terrified', 'petrified', 'alarmed'],
  big: ['enormous', 'colossal', 'immense'],
  small: ['tiny', 'minute', 'petite'],
  important: ['essential', 'critical', 'vital'],
  busy: ['swamped', 'overloaded', 'snowed'],
  smart: ['brilliant', 'gifted', 'astute']
};

const fallback = ['remarkable', 'intense', 'extraordinary', 'striking', 'outstanding'];

const adjectiveInput = document.getElementById('adjective');
const suggestionEl = document.getElementById('suggestion');
const historyEl = document.getElementById('history');
const suggestBtn = document.getElementById('suggest');
const anotherBtn = document.getElementById('another');
const copyBtn = document.getElementById('copy');

let lastSet = [];

const getSuggestion = () => {
  const value = adjectiveInput.value.trim().toLowerCase();
  if (!value) return;

  const list = suggestions[value] || fallback;
  if (lastSet.length === 0 || lastSet === list) {
    lastSet = [...list];
  }
  const pick = lastSet.shift() || list[0];
  suggestionEl.textContent = pick;
  addHistory(value, pick);
};

const addHistory = (input, suggestion) => {
  const item = document.createElement('li');
  item.textContent = `very ${input} → ${suggestion}`;
  historyEl.prepend(item);
  const items = historyEl.querySelectorAll('li');
  if (items.length > 6) items[items.length - 1].remove();
};

suggestBtn.addEventListener('click', getSuggestion);

anotherBtn.addEventListener('click', () => {
  if (!adjectiveInput.value.trim()) return;
  getSuggestion();
});

copyBtn.addEventListener('click', () => {
  const text = suggestionEl.textContent.trim();
  if (!text || text === '—') return;
  navigator.clipboard.writeText(text);
  copyBtn.textContent = 'Copied';
  setTimeout(() => {
    copyBtn.textContent = 'Copy';
  }, 1200);
});

adjectiveInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getSuggestion();
  }
});
