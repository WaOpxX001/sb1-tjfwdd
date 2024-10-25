import { initTicTacToe } from './ticTacToe.js';
import { initSnakeGame } from './snakeGame.js';
import { initMemoryGame } from './memoryGame.js';

// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize games
const ticTacToe = initTicTacToe();
const snakeGame = initSnakeGame();
const memoryGame = initMemoryGame();

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    button.classList.add('active');
    const activeContent = document.getElementById(tabId);
    activeContent.classList.add('active');

    // Initialize the Memory Game when its tab is opened
    if (tabId === 'memory') {
      memoryGame();
    }
  });
});

// Initialize the active tab's game
const activeTab = document.querySelector('.tab-button.active');
if (activeTab) {
  const tabId = activeTab.getAttribute('data-tab');
  if (tabId === 'tic-tac-toe') {
    ticTacToe();
  } else if (tabId === 'snake') {
    snakeGame();
  } else if (tabId === 'memory') {
    memoryGame();
  }
}