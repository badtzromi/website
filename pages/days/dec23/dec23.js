const BOARD_SIZE = 25;
const GAME_DURATION = 15;

const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startButton = document.getElementById("startButton");

const BADTZ_IMAGE = "media/badtz-transparent.png";

let score = 0;
let timeLeft = GAME_DURATION;
let gameInterval = null;
let moleTimeout = null;
let activeIndex = null;

function createBoard() {
  board.innerHTML = "";

  for (let i = 0; i < BOARD_SIZE; i++) {
    const hole = document.createElement("div");
    hole.className = "hole";

    const img = document.createElement("img");
    img.src = BADTZ_IMAGE;
    img.alt = "Badtz";

    hole.appendChild(img);
    hole.addEventListener("click", () => handleWhack(i));

    board.appendChild(hole);
  }
}

function handleWhack(index) {
  if (index !== activeIndex) return;

  score++;
  scoreEl.textContent = score;
  hideMole();
}

function showRandomMole() {
  hideMole();

  const holes = document.querySelectorAll(".hole");
  activeIndex = Math.floor(Math.random() * holes.length);

  const visibleDuration = Math.random() * 1000 + 400;
  holes[activeIndex].classList.add("active");

  moleTimeout = setTimeout(hideMole, visibleDuration);
}

function hideMole() {
  const holes = document.querySelectorAll(".hole");
  holes.forEach((hole) => hole.classList.remove("active"));
  activeIndex = null;
  clearTimeout(moleTimeout);
}

function startGame() {
  score = 0;
  timeLeft = GAME_DURATION;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  startButton.disabled = true;

  gameInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    showRandomMole();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  hideMole();
  startButton.disabled = false;
  alert(`Time's up! Final score: ${score}`);
}

startButton.addEventListener("click", startGame);
createBoard();
