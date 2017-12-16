/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores;
let roundScore;
let activePlayer;
let gamePlaying;
let winningScore;

const dice = document.querySelector('.dice');
const score1 = document.getElementById('score-0');
const score2 = document.getElementById('score-1');
const roundScore1 = document.getElementById('current-0');
const roundScore2 = document.getElementById('current-1');
const playerName1 = document.getElementById('name-0');
const playerName2 = document.getElementById('name-1');
const player1 = document.querySelector(`.player-0-panel`);
const player2 = document.querySelector(`.player-1-panel`);
const scoreInput = document.querySelector('#winning-score')

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
  winningScore = scoreInput.value;
  scoreInput.readOnly = true;

  if(gamePlaying) {
    // 1. Get random number
    let diceRoll = Math.floor(Math.random() * 6) + 1;
  
    // 2. Display the result
    dice.style.display = 'block';
    dice.src = `dice-${diceRoll}.png`;
  
    // 3. Update the round score IF the rolled number was NOT a 1
    if(diceRoll !== 1) {
      // Add score
      roundScore += diceRoll;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      // Next player
      gamePlaying = false;
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('lost-roll');
      setTimeout(() => {
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('lost-roll');
        nextPlayer();
        gamePlaying = true;
      }, 1000);
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
  
    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  
    // Check if player won the game
    if(scores[activePlayer] >= winningScore) {
      dice.style.display = 'none';
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  // Reset Current Score
  roundScore1.textContent = '0';
  roundScore2.textContent = '0';
  // Change active player styling
  player1.classList.toggle('active');
  player2.classList.toggle('active');
  // Hide dice
  dice.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  scoreInput.readOnly = false;
  dice.style.display = 'none';

  score1.textContent = '0';
  score2.textContent = '0';
  roundScore1.textContent = '0';
  roundScore2.textContent = '0';
  playerName1.textContent = 'Player 1';
  playerName2.textContent = 'Player 2';
  player1.classList.remove('winner', 'active');
  player2.classList.remove('winner', 'active');
  player1.classList.add('active');
}
