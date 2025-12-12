const scrambleEl = document.getElementById('scramble');
const guessInput = document.getElementById('guess');
const messageEl = document.getElementById('message');
const currentWordEl = document.getElementById('currentWord');
const checkBtn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');

let selectedWords = [];
let currentWordIndex = 0;
let currentWord = '';

function getRandomWords(count) {
  const shuffled = [...WORD_LIST].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function shuffle(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const shuffled = arr.join('');
  return shuffled === word ? shuffle(word) : shuffled;
}

function initGame() {
  selectedWords = getRandomWords(10);
  currentWordIndex = 0;
  loadCurrentWord();
}

function loadCurrentWord() {
  currentWord = selectedWords[currentWordIndex];
  currentWordEl.textContent = currentWordIndex + 1;
  setScramble();
}

function setScramble() {
  scrambleEl.textContent = shuffle(currentWord);
  messageEl.textContent = '';
  messageEl.className = 'message';
  guessInput.value = '';
  guessInput.focus();
}

function checkAnswer() {
  const guess = guessInput.value.trim().toUpperCase();
  if (!guess) {
    messageEl.textContent = 'Type your guess first.';
    messageEl.className = 'message error';
    return;
  }
  
  if (guess === currentWord) {
    currentWordIndex++;
    if (currentWordIndex >= selectedWords.length) {
      messageEl.textContent = '🎉 All words solved! Challenge complete! 🎉';
      messageEl.className = 'message success';
      checkBtn.disabled = true;
    } else {
      messageEl.textContent = 'Correct! Loading next word...';
      messageEl.className = 'message success';
      setTimeout(() => {
        loadCurrentWord();
      }, 1000);
    }
  } else {
    messageEl.textContent = 'Try again.';
    messageEl.className = 'message error';
  }
}

checkBtn.addEventListener('click', checkAnswer);
resetBtn.addEventListener('click', setScramble);

guessInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') checkAnswer();
});

initGame();
