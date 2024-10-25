const ticTacToeInfo = [
  "Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites.",
  "Using proper heading structure helps screen reader users navigate your content more easily.",
  "Alternative text for images helps visually impaired users understand the content of images.",
  "Keyboard navigation is crucial for users who can't use a mouse.",
  "Color contrast is important for users with visual impairments.",
  "Captions and transcripts for audio and video content benefit deaf and hard of hearing users.",
  "Using clear and simple language helps users with cognitive disabilities.",
  "Responsive design ensures that your website is usable on various devices and screen sizes.",
  "ARIA (Accessible Rich Internet Applications) attributes can enhance the accessibility of web applications."
];

export function initTicTacToe() {
  const game = document.getElementById('tic-tac-toe-game');
  const infoElement = document.getElementById('tic-tac-toe-info');
  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  function createBoard() {
    game.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => makeMove(i));
      game.appendChild(cell);
    }
  }

  function makeMove(index) {
    if (gameBoard[index] === '' && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      updateBoard();
      if (checkWinner()) {
        showGameOver(`Player ${currentPlayer} wins!`);
      } else if (gameBoard.every(cell => cell !== '')) {
        showGameOver("It's a draw!");
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        infoElement.textContent = ticTacToeInfo[Math.floor(Math.random() * ticTacToeInfo.length)];
      }
    }
  }

  function updateBoard() {
    const cells = game.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = gameBoard[i];
    }
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
  }

  function showGameOver(message) {
    const gameOverDiv = document.createElement('div');
    gameOverDiv.classList.add('game-over');
    gameOverDiv.innerHTML = `
      <h2>${message}</h2>
      <button class="play-again">Play Again</button>
    `;
    document.body.appendChild(gameOverDiv);

    const playAgainButton = gameOverDiv.querySelector('.play-again');
    playAgainButton.addEventListener('click', () => {
      document.body.removeChild(gameOverDiv);
      resetGame();
    });
  }

  function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    createBoard();
    infoElement.textContent = ticTacToeInfo[Math.floor(Math.random() * ticTacToeInfo.length)];
  }

  createBoard();
  infoElement.textContent = ticTacToeInfo[Math.floor(Math.random() * ticTacToeInfo.length)];
}