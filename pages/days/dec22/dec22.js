const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const gameOverEl = document.getElementById("gameOver");
const startScreenEl = document.getElementById("startScreen");

// Game state
let gameState = "start"; // 'start', 'playing', 'gameover'
let score = 0;
let highScore = localStorage.getItem("kuromiRunnerHighScore") || 0;
highScoreEl.textContent = highScore;

// Game settings
const GRAVITY = 0.8;
const JUMP_STRENGTH = -15;
const GROUND_Y = 250;
const BASE_OBSTACLE_SPEED = 5;
const BASE_OBSTACLE_SPAWN_RATE = 0.01;

// Dynamic difficulty (will increase with score)
let currentObstacleSpeed = BASE_OBSTACLE_SPEED;
let currentObstacleSpawnRate = BASE_OBSTACLE_SPAWN_RATE;

// Kuromi character
const kuromi = {
  x: 100,
  y: GROUND_Y,
  width: 40,
  height: 50,
  velocityY: 0,
  isJumping: false,
  frame: 0,
};

// Obstacles array
let obstacles = [];
let groundOffset = 0;

// Draw pixel art Kuromi
function drawKuromi() {
  ctx.save();
  ctx.translate(kuromi.x, kuromi.y);

  // Pixel art Kuromi - more recognizable version
  // Head base (white face)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(6, 12, 28, 20);
  
  // Skull cap (black, rounded top covering head)
  ctx.fillStyle = "#000000";
  // Top of skull cap (rounded)
  ctx.beginPath();
  ctx.arc(20, 12, 14, 0, Math.PI, true);
  ctx.fill();
  // Sides of skull cap
  ctx.fillRect(6, 12, 28, 8);
  
  // Pink bow - more prominent and recognizable
  ctx.fillStyle = "#ff69b4";
  // Left bow loop
  ctx.fillRect(8, 2, 10, 8);
  ctx.fillRect(10, 0, 6, 2);
  // Right bow loop
  ctx.fillRect(22, 2, 10, 8);
  ctx.fillRect(24, 0, 6, 2);
  // Bow center/knot
  ctx.fillStyle = "#ff1493";
  ctx.fillRect(18, 4, 4, 4);
  
  // Eyes (black, Kuromi's signature look - larger and more expressive)
  ctx.fillStyle = "#000000";
  // Left eye
  ctx.fillRect(12, 18, 6, 6);
  // Right eye
  ctx.fillRect(22, 18, 6, 6);
  // Eye shine (white highlights)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(13, 19, 2, 2);
  ctx.fillRect(23, 19, 2, 2);
  
  // Cheeks (pink blush)
  ctx.fillStyle = "#ffb6c1";
  ctx.fillRect(8, 24, 4, 3);
  ctx.fillRect(28, 24, 4, 3);
  
  // Mouth (mischievous smile with fangs)
  ctx.fillStyle = "#000000";
  // Main mouth line
  ctx.beginPath();
  ctx.moveTo(16, 28);
  ctx.lineTo(24, 28);
  ctx.stroke();
  // Left fang
  ctx.fillRect(16, 28, 2, 2);
  // Right fang
  ctx.fillRect(22, 28, 2, 2);

  // Body (black)
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, 32, 20, 14);
  
  // Arms (when running)
  if (kuromi.isJumping) {
    // Arms up when jumping
    ctx.fillStyle = "#000000";
    ctx.fillRect(8, 28, 4, 8);
    ctx.fillRect(28, 28, 4, 8);
  } else {
    // Arms swinging when running
    const armOffset = Math.sin(kuromi.frame * 0.3) * 2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(8, 34 + armOffset, 4, 6);
    ctx.fillRect(28, 34 - armOffset, 4, 6);
  }

  // Legs (when running)
  if (kuromi.isJumping) {
    // Legs together when jumping
    ctx.fillStyle = "#000000";
    ctx.fillRect(16, 46, 8, 4);
  } else {
    // Alternating legs when running
    const legOffset = Math.sin(kuromi.frame * 0.3) * 3;
    ctx.fillStyle = "#000000";
    ctx.fillRect(12 + legOffset, 46, 6, 4);
    ctx.fillRect(22 - legOffset, 46, 6, 4);
  }

  ctx.restore();
}

// Draw obstacle (cactus)
function drawObstacle(obstacle) {
  ctx.fillStyle = "#2d5016";
  
  if (obstacle.type === "wide") {
    // Wide, low cactus that requires jumping over
    const groundY = GROUND_Y + kuromi.height;
    const cactusHeight = obstacle.height;
    const cactusY = groundY - cactusHeight;
    
    // Main wide body
    ctx.fillRect(obstacle.x, cactusY, obstacle.width, cactusHeight);
    // Left side arm
    ctx.fillRect(obstacle.x - 3, cactusY + cactusHeight * 0.3, 6, cactusHeight * 0.4);
    // Right side arm
    ctx.fillRect(obstacle.x + obstacle.width - 3, cactusY + cactusHeight * 0.3, 6, cactusHeight * 0.4);
    // Top spikes
    for (let i = 0; i < obstacle.width; i += 8) {
      ctx.fillRect(obstacle.x + i, cactusY, 4, 4);
    }
  } else {
    // Tall cactus (original)
    // Main body
    ctx.fillRect(obstacle.x, obstacle.y, 20, obstacle.height);
    // Left arm
    ctx.fillRect(obstacle.x - 5, obstacle.y + 10, 8, 15);
    // Right arm
    ctx.fillRect(obstacle.x + 17, obstacle.y + 10, 8, 15);
  }
}

// Draw ground
function drawGround() {
  const groundY = GROUND_Y + kuromi.height;
  ctx.fillStyle = "#f4f4f4";
  ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

  // Ground pattern
  ctx.strokeStyle = "#d0d0d0";
  ctx.lineWidth = 2;
  for (let i = 0; i < canvas.width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i + groundOffset, groundY);
    ctx.lineTo(i + groundOffset + 20, groundY);
    ctx.stroke();
  }
  groundOffset -= currentObstacleSpeed;
  if (groundOffset <= -40) groundOffset = 0;
}

// Update game
function update() {
  if (gameState !== "playing") return;

  // Update Kuromi
  kuromi.velocityY += GRAVITY;
  kuromi.y += kuromi.velocityY;

  // Ground collision
  if (kuromi.y >= GROUND_Y) {
    kuromi.y = GROUND_Y;
    kuromi.velocityY = 0;
    kuromi.isJumping = false;
  } else {
    kuromi.isJumping = true;
  }

  // Update animation frame
  kuromi.frame++;

  // Progressive difficulty scaling based on score
  // Increase difficulty every 100 points, capped at 3x speed
  const difficultyLevel = Math.floor(score / 100);
  const difficultyMultiplier = Math.min(1 + difficultyLevel * 0.15, 3.0); // Max 3x speed
  currentObstacleSpeed = BASE_OBSTACLE_SPEED * difficultyMultiplier;
  currentObstacleSpawnRate = BASE_OBSTACLE_SPAWN_RATE * difficultyMultiplier;

  // Spawn obstacles (only if last obstacle is far enough away)
  const lastObstacle = obstacles[obstacles.length - 1];
  // Minimum distance decreases as difficulty increases (obstacles spawn closer together)
  // Minimum distance caps at 120 pixels
  const minDistance = Math.max(120, 200 - Math.floor(score / 50) * 4);
  const shouldSpawn =
    !lastObstacle || lastObstacle.x < canvas.width - minDistance;

  if (shouldSpawn && Math.random() < currentObstacleSpawnRate) {
    // Randomly choose between tall cactus or wide cactus
    // Wide cactuses appear more often as score increases
    const wideCactusChance = Math.min(0.4, 0.2 + Math.floor(score / 150) * 0.05);
    const isWide = Math.random() < wideCactusChance;
    
    if (isWide) {
      // Wide, low cactus that requires jumping over
      const wideWidth = 60 + Math.random() * 40; // 60-100 pixels wide
      const wideHeight = 15 + Math.random() * 10; // 15-25 pixels tall
      const groundY = GROUND_Y + kuromi.height;
      
      obstacles.push({
        x: canvas.width,
        y: groundY - wideHeight, // Top of cactus (for collision detection)
        width: wideWidth,
        height: wideHeight,
        type: "wide",
      });
    } else {
      // Tall cactus (original)
      const baseHeight = 40;
      const heightVariation = score > 200 ? Math.random() > 0.7 ? 20 : baseHeight : baseHeight;
      
      obstacles.push({
        x: canvas.width,
        y: GROUND_Y + kuromi.height - heightVariation, // Position so bottom aligns with ground
        width: 20,
        height: heightVariation,
        type: "tall",
      });
    }
  }

  // Update obstacles
  obstacles.forEach((obstacle) => {
    obstacle.x -= currentObstacleSpeed;
  });

  // Remove off-screen obstacles
  obstacles = obstacles.filter((obstacle) => obstacle.x + obstacle.width > 0);

  // Collision detection (with small padding for better feel)
  const padding = 5;
  obstacles.forEach((obstacle) => {
    if (
      kuromi.x + padding < obstacle.x + obstacle.width - padding &&
      kuromi.x + kuromi.width - padding > obstacle.x + padding &&
      kuromi.y + padding < obstacle.y + obstacle.height - padding &&
      kuromi.y + kuromi.height - padding > obstacle.y + padding
    ) {
      gameOver();
    }
  });

  // Update score (increases faster as game gets harder)
  score += 0.1 * (currentObstacleSpeed / BASE_OBSTACLE_SPEED);
  scoreEl.textContent = Math.floor(score);
}

// Draw everything
function draw() {
  // Clear canvas
  ctx.fillStyle = "#fff0f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  drawGround();

  // Draw obstacles
  obstacles.forEach(drawObstacle);

  // Draw Kuromi
  drawKuromi();
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Jump function
function jump() {
  if (gameState === "start") {
    startGame();
    return;
  }

  if (gameState === "gameover") {
    resetGame();
    return;
  }

  if (!kuromi.isJumping && gameState === "playing") {
    kuromi.velocityY = JUMP_STRENGTH;
    kuromi.isJumping = true;
  }
}

// Start game
function startGame() {
  gameState = "playing";
  startScreenEl.style.display = "none";
  gameOverEl.style.display = "none";
  score = 0;
  obstacles = [];
  kuromi.y = GROUND_Y;
  kuromi.velocityY = 0;
  // Reset difficulty to base values
  currentObstacleSpeed = BASE_OBSTACLE_SPEED;
  currentObstacleSpawnRate = BASE_OBSTACLE_SPAWN_RATE;
}

// Game over
function gameOver() {
  gameState = "gameover";
  gameOverEl.style.display = "block";

  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = Math.floor(highScore);
    localStorage.setItem("kuromiRunnerHighScore", highScore);
  }
}

// Reset game
function resetGame() {
  startGame();
}

// Event listeners
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key === "ArrowUp") {
    e.preventDefault();
    jump();
  }
});

// Touch support for mobile
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  jump();
});

// Start game loop
gameLoop();
