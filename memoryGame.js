const memoryInfo = [
  "People with disabilities are a diverse group with varying abilities and experiences.",
  "Disability is a natural part of human diversity and should be celebrated.",
  "Many people with disabilities lead fulfilling lives and contribute greatly to society.",
  "Disability rights movements have fought for equality and inclusion for decades.",
  "Assistive devices and technologies can greatly enhance the independence of people with disabilities.",
  "Inclusive education benefits all students, not just those with disabilities.",
  "Many famous historical figures had disabilities, including scientists, artists, and leaders.",
  "The concept of disability can vary across cultures and time periods.",
  "Disability etiquette involves treating people with disabilities with respect and as individuals."
];

export function initMemoryGame() {
  const game = document.getElementById('memory-game');
  const infoElement = document.getElementById('memory-info');
  const symbols = ['♠', '♥', '♦', '♣', '★', '●'];
  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;

  function createBoard() {
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    game.innerHTML = '';
    cards = [];
    matchedPairs = 0;
    flippedCards = [];

    game.style.display = 'grid';
    game.style.gridTemplateColumns = 'repeat(4, 1fr)';
    game.style.gridTemplateRows = 'repeat(3, 1fr)';
    game.style.gap = '5px';
    game.style.aspectRatio = '4/3';
    game.style.width = '100%';
    game.style.maxWidth = '600px';
    game.style.margin = '20px auto';

    shuffledSymbols.forEach((symbol, index) => {
      const card = document.createElement('div');
      card.classList.add('memory-card');
      card.dataset.symbol = symbol;
      card.dataset.index = index;
      card.addEventListener('click', flipCard);
      game.appendChild(card);
      cards.push(card);
    });

    infoElement.textContent = memoryInfo[Math.floor(Math.random() * memoryInfo.length)];
  }

  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      this.textContent = this.dataset.symbol;
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
      matchedPairs++;
      flippedCards = [];
      infoElement.textContent = memoryInfo[Math.floor(Math.random() * memoryInfo.length)];

      if (matchedPairs === symbols.length) {
        showGameOver("¡Felicitaciones! ¡Has encontrado todos los pares!");
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
      }, 500);
    }
  }

  function showGameOver(message) {
    const gameOverDiv = document.createElement('div');
    gameOverDiv.classList.add('game-over');
    gameOverDiv.innerHTML = `
      <h2>${message}</h2>
      <button class="play-again">Jugar de nuevo</button>
    `;
    document.body.appendChild(gameOverDiv);

    const playAgainButton = gameOverDiv.querySelector('.play-again');
    playAgainButton.addEventListener('click', () => {
      document.body.removeChild(gameOverDiv);
      createBoard();
    });
  }

  // Initialize the game immediately
  createBoard();

  // Return a function that can be called to reinitialize the game
  return () => createBoard();
}