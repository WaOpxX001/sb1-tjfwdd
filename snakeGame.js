const snakeInfo = [
  "Inclusive design benefits everyone, not just people with disabilities.",
  "Universal Design principles create products usable by all people without adaptation.",
  "Assistive technologies help people with disabilities perform daily tasks more easily.",
  "Social inclusion is about creating a society where all people feel valued and can participate.",
  "Education and awareness are key to promoting inclusivity and understanding.",
  "Reasonable accommodations in the workplace can help employees with disabilities succeed.",
  "Inclusive transportation systems ensure that everyone can move around independently.",
  "Adaptive sports and recreation promote physical and social well-being for people with disabilities.",
  "Inclusive healthcare considers the unique needs of people with disabilities."
];

export function initSnakeGame() {
  const canvas = document.getElementById('snake-game');
  const ctx = canvas.getContext('2d');
  const infoElement = document.getElementById('snake-info');

  const gridSize = 20;
  const tileCount = canvas.width / gridSize;

  let snake, food, dx, dy, score;

  function initGame() {
    snake = [
      {x: 10, y: 10},
    ];
    food = getRandomFood();
    dx = 0;
    dy = 0;
    score = 0;
  }

  document.addEventListener('keydown', changeDirection);

  function changeDirection(e) {
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
  }

  function getRandomFood() {
    return {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  }

  function gameLoop() {
    if (hasGameEnded()) {
      showGameOver();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();
    drawFood();
    drawSnake();

    setTimeout(gameLoop, 100);
  }

  function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      food = getRandomFood();
      infoElement.textContent = `Score: ${score}. ${snakeInfo[Math.floor(Math.random() * snakeInfo.length)]}`;
    } else {
      snake.pop();
    }
  }

  function drawFood() {
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }

  function drawSnake() {
    ctx.fillStyle = '#4ecdc4';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
  }

  function hasGameEnded() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      return true;
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  function showGameOver() {
    const gameOverDiv = document.createElement('div');
    gameOverDiv.classList.add('game-over');
    gameOverDiv.innerHTML = `
      <h2>Game Over! Your score: ${score}</h2>
      <button class="play-again">Play Again</button>
    `;
    document.body.appendChild(gameOverDiv);

    const playAgainButton = gameOverDiv.querySelector('.play-again');
    playAgainButton.addEventListener('click', () => {
      document.body.removeChild(gameOverDiv);
      initGame();
      gameLoop();
    });
  }

  initGame();
  infoElement.textContent = `Use arrow keys to control the snake. ${snakeInfo[Math.floor(Math.random() * snakeInfo.length)]}`;
  gameLoop();
}