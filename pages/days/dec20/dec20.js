const imagesGrid = document.getElementById('imagesGrid');
const checkBtn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');
const messageEl = document.getElementById('message');

// Store the shuffled order for checking answers
let shuffledMapping = [];

const imagePersonMapping = [
  { image: 'barefeet.jpg', person: 'marcella' },
  { image: 'cake.jpg', person: 'christian' },
  { image: 'calico-meme.jpeg', person: 'marcella' },
  { image: 'cheung-fun.jpeg', person: 'simon' },
  { image: 'chicken-bones.webp', person: 'christian' },
  { image: 'elemental-heroes.webp', person: 'simon' },
  { image: 'fish-and-chips.jpg', person: 'nevill' },
  { image: 'gundam-seed.webp', person: 'nevill' },
  { image: 'hotpot.jpg', person: 'marcella' },
  { image: 'karaoke.jpg', person: 'stephane' },
  { image: 'kingdom-hearts.jpeg', person: 'simon' },
  { image: 'lawyer.webp', person: 'stephane' },
  { image: 'lv.webp', person: 'jordi' },
  { image: 'miffy.jpg', person: 'michelle' },
  { image: 'nailong.jpeg', person: 'michelle' },
  { image: 'nicki-minaj.jpg', person: 'jordi' },
  { image: 'optimus-prime.webp', person: 'nevill' },
  { image: 'piano.webp', person: 'dennis' },
  { image: 'pizza.webp', person: 'simon' },
  { image: 'plantain.webp', person: 'ben' },
  { image: 'primate.jpg', person: 'ben' },
  { image: 'prime-truck.webp', person: 'michelle' },
  { image: 'retirement-home.jpg', person: 'jordi' },
  { image: 'rotisserie-chicken.jpg', person: 'marcella' },
  { image: 'schulich-logo.jpg', person: 'michelle' },
  { image: 'seal.jpg', person: 'marcella' },
  { image: 'seal.webp', person: 'marcella' },
  { image: 'snail.jpg', person: 'jordi' },
  { image: 'snorlax.png', person: 'tom' },
  { image: 'stranger-things.webp', person: 'christian' },
  { image: 'stussy.webp', person: 'daniel' },
  { image: 'taylor-swift.webp', person: 'marcella' },
  { image: 'tikka-masala.jpg', person: 'nevill' },
  { image: 'tiktok.jpeg', person: 'sammie' },
  { image: 'witch.jpg', person: 'marcella' },
  { image: 'eth.png', person: 'jason'},
  { image: 'pork-belly.jpg', person: 'marcella'},
  { image: 'alligator.jpg', person: 'jordi'},
  { image: 'squash.jpg', person: 'marcella'},
  { image: 'grooming.webp', person: 'marcella'},
  { image: 'peanuts.jpeg', person: 'michelle'},
  { image: 'cumberland.jpg', person: 'marcella'},

];

// ============================================

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array]; // Create a copy to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Normalize strings for comparison (case-insensitive, trim whitespace)
function normalizeString(str) {
  return str.toLowerCase().trim();
}

// Check if two strings match (case-insensitive)
function stringsMatch(str1, str2) {
  return normalizeString(str1) === normalizeString(str2);
}

function createImageCard(mapping, index) {
  const card = document.createElement('div');
  card.className = 'image-card';
  card.dataset.index = index;
  card.dataset.correctAnswer = mapping.person;

  const img = document.createElement('img');
  img.src = `media/${mapping.image}`;
  img.className = 'game-image';
  img.alt = `Person ${index + 1}`;
  
  // Handle image loading errors
  img.onerror = function() {
    this.style.display = 'none';
    console.warn(`Failed to load image: media/${mapping.image}`);
    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'Image not found';
    errorMsg.style.color = '#c62828';
    card.appendChild(errorMsg);
  };

  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'game-input';
  input.placeholder = 'Enter person name...';
  input.dataset.index = index;

  const feedback = document.createElement('div');
  feedback.className = 'feedback-text';
  feedback.dataset.index = index;

  inputContainer.appendChild(input);
  inputContainer.appendChild(feedback);

  card.appendChild(img);
  card.appendChild(inputContainer);

  return card;
}

function checkAnswers() {
  let allCorrect = true;
  let correctCount = 0;
  let totalCount = shuffledMapping.length;

  shuffledMapping.forEach((mapping, index) => {
    const card = imagesGrid.querySelector(`.image-card[data-index="${index}"]`);
    const input = card.querySelector('.game-input');
    const feedback = card.querySelector('.feedback-text');
    const userAnswer = input.value;
    const correctAnswer = mapping.person;

    // Remove previous feedback classes
    card.classList.remove('correct', 'incorrect');
    feedback.classList.remove('correct', 'incorrect');
    feedback.textContent = '';

    if (stringsMatch(userAnswer, correctAnswer)) {
      card.classList.add('correct');
      feedback.classList.add('correct');
      feedback.textContent = '✓ Correct!';
      correctCount++;
    } else if (userAnswer.trim() === '') {
      card.classList.remove('correct', 'incorrect');
      feedback.textContent = '';
      allCorrect = false;
    } else {
      card.classList.add('incorrect');
      feedback.classList.add('incorrect');
      feedback.textContent = `✗ Incorrect`;
      allCorrect = false;
    }
  });

  // Show overall message
  if (allCorrect && correctCount === totalCount) {
    messageEl.textContent = `🎉 Perfect! You got all ${totalCount} correct! 🎉`;
    messageEl.className = 'message success';
  } else if (correctCount > 0) {
    messageEl.textContent = `You got ${correctCount} out of ${totalCount} correct. Keep trying!`;
    messageEl.className = 'message';
  } else {
    messageEl.textContent = 'Try again! Check your answers.';
    messageEl.className = 'message error';
  }
}

function resetGame() {
  shuffledMapping.forEach((mapping, index) => {
    const card = imagesGrid.querySelector(`.image-card[data-index="${index}"]`);
    const input = card.querySelector('.game-input');
    const feedback = card.querySelector('.feedback-text');

    card.classList.remove('correct', 'incorrect');
    feedback.classList.remove('correct', 'incorrect');
    feedback.textContent = '';
    input.value = '';
  });

  messageEl.textContent = '';
  messageEl.className = 'message';
}

function initGame() {
  imagesGrid.innerHTML = '';

  if (imagePersonMapping.length === 0) {
    messageEl.textContent = 'No images configured. Please add images to the imagePersonMapping array in dec20.js';
    messageEl.className = 'message error';
    return;
  }

  // Shuffle the array for random order on each load
  shuffledMapping = shuffleArray(imagePersonMapping);

  shuffledMapping.forEach((mapping, index) => {
    const card = createImageCard(mapping, index);
    imagesGrid.appendChild(card);
  });

  messageEl.textContent = 'Enter the name of each person in the text boxes below their images.';
  messageEl.className = 'message';
}

// Event listeners
checkBtn.addEventListener('click', checkAnswers);
resetBtn.addEventListener('click', resetGame);

// Allow Enter key to check answers
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !checkBtn.disabled) {
    checkAnswers();
  }
});

// Initialize game on load
initGame();
