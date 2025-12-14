const originalRow = document.getElementById('originalRow');
const scrambledRow = document.getElementById('scrambledRow');
const selectedRow = document.getElementById('selectedRow');
const checkBtn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');
const messageEl = document.getElementById('message');

// List of images from the media folder
// Add your image filenames here (they should be in the media/ folder)
const imageFilenames = [
  'axolotl.jpg',
  'badtz-hat.webp',
  'calico-stare.jpg',
  'chococat-trumpet.webp',
  'cute-orange-cat.jpg',
  'cute-standing-cat.jpg',
  'fat-tabby.avif',
  'hangyodon.webp',
  'kuromi-witch.webp',
  'pekkle.webp',
  'small-tired-cat.jpg',
  'white-seal.webp'
];

// Build full paths to images in the media folder
const imagePaths = imageFilenames.map(filename => `media/${filename}`);

let originalOrder = [];
let scrambledOrder = [];
let selectedOrder = [];
let numImages = 6; // Number of images to show in the game

// Get random images from the available images
function getRandomImages(count) {
  const available = [...imagePaths];
  if (available.length === 0) {
    console.error('No images available! Please add images to the media folder.');
    return [];
  }
  
  const selected = [];
  const usedIndices = new Set();
  
  // Select unique random images (repeat if we need more than available)
  for (let i = 0; i < count; i++) {
    let randomIndex;
    // If we've used all available images, allow repeats
    if (usedIndices.size >= available.length) {
      randomIndex = Math.floor(Math.random() * available.length);
    } else {
      // Try to get a unique image
      do {
        randomIndex = Math.floor(Math.random() * available.length);
      } while (usedIndices.has(randomIndex));
      usedIndices.add(randomIndex);
    }
    
    selected.push({
      path: available[randomIndex],
      id: i // Unique ID for tracking original position
    });
  }
  return selected;
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createImageElement(imgData, className, clickable = false) {
  const img = document.createElement('img');
  img.src = imgData.path;
  img.className = className;
  img.dataset.id = imgData.id;
  img.alt = `Memory image ${imgData.id}`;
  
  // Handle image loading errors
  img.onerror = function() {
    this.style.display = 'none';
    console.warn(`Failed to load image: ${imgData.path}`);
  };
  
  if (clickable) {
    img.addEventListener('click', () => handleImageClick(imgData));
  }
  
  return img;
}

function handleImageClick(imgData) {
  // Check if already selected
  if (selectedOrder.some(item => item.id === imgData.id)) {
    return;
  }
  
  selectedOrder.push(imgData);
  updateDisplay();
  
  // Disable the clicked image
  const clickedImg = scrambledRow.querySelector(`img[data-id="${imgData.id}"]`);
  if (clickedImg) {
    clickedImg.classList.add('selected', 'disabled');
    clickedImg.style.pointerEvents = 'none';
  }
}

function updateDisplay() {
  // Clear selected row
  selectedRow.innerHTML = '';
  
  // Show selected images
  selectedOrder.forEach(imgData => {
    const img = createImageElement(imgData, 'selected-image', false);
    selectedRow.appendChild(img);
  });
  
  // Enable check button if all images are selected
  if (selectedOrder.length === originalOrder.length) {
    checkBtn.disabled = false;
  }
}

function checkAnswer() {
  if (selectedOrder.length !== originalOrder.length) {
    messageEl.textContent = 'Please select all images first.';
    messageEl.className = 'message error';
    return;
  }
  
  // Check if order matches
  let isCorrect = true;
  for (let i = 0; i < originalOrder.length; i++) {
    if (selectedOrder[i].id !== originalOrder[i].id) {
      isCorrect = false;
      break;
    }
  }
  
  if (isCorrect) {
    messageEl.textContent = '🎉 Correct! Great memory! 🎉';
    messageEl.className = 'message success';
    checkBtn.disabled = true;
    // Disable all images
    scrambledRow.querySelectorAll('.memory-image').forEach(img => {
      img.classList.add('disabled');
      img.style.cursor = 'not-allowed';
      img.style.pointerEvents = 'none';
    });
  } else {
    messageEl.textContent = 'Not quite right. Try again!';
    messageEl.className = 'message error';
    // Reset selection after a short delay
    setTimeout(() => {
      selectedOrder = [];
      updateDisplay();
      // Re-enable all images
      scrambledRow.querySelectorAll('.memory-image').forEach(img => {
        img.classList.remove('selected', 'disabled');
        img.style.cursor = 'pointer';
        img.style.pointerEvents = 'auto';
      });
    }, 3000);
  }
}

function initGame() {
  // Clear previous state
  originalRow.innerHTML = '';
  scrambledRow.innerHTML = '';
  selectedRow.innerHTML = '';
  selectedOrder = [];
  messageEl.textContent = 'Memorize the order of the images above!';
  messageEl.className = 'message';
  checkBtn.disabled = true;
  originalRow.style.display = 'flex';
  originalRow.style.opacity = '1';
  originalRow.style.transition = '';
  
  // Get random images
  originalOrder = getRandomImages(numImages);
  scrambledOrder = shuffleArray(originalOrder);
  
  // Display original order
  originalOrder.forEach(imgData => {
    const img = createImageElement(imgData, 'memory-image', false);
    originalRow.appendChild(img);
  });
  
  // Display scrambled order (clickable)
  scrambledOrder.forEach(imgData => {
    const img = createImageElement(imgData, 'memory-image', true);
    scrambledRow.appendChild(img);
  });
  
  // Hide original order after 5 seconds
  setTimeout(() => {
    originalRow.style.opacity = '0';
    originalRow.style.transition = 'opacity 0.5s';
    setTimeout(() => {
      originalRow.style.display = 'none';
    }, 500);
    messageEl.textContent = 'Now select the images in the original order!';
    messageEl.className = 'message';
  }, 5000);
}

checkBtn.addEventListener('click', checkAnswer);
resetBtn.addEventListener('click', initGame);

// Initialize game on load
initGame();
