/*----- audio constants -----*/
const clickAudio =
  'https://cdn.freesound.org/previews/678/678248_7806746-lq.mp3';

const catHissAudio =
  'https://cdn.freesound.org/previews/661/661905_9177297-lq.mp3';
/*----- constants -----*/
const rows = 8;
const columns = 3;
let catPositions = []; // Hold {row, col,} objects for each cat

/*----- state variables -----*/
let canPressKey; // Allow players to press key
let score = 0; // Track score
let color = '';
let timer; // Declare timer
let catPointValue; // Holds the value of each cat
let catsPetted; // Holds the number of cats petted (Defines point system)
let hiScore = 0;
let gameStarted = false;
const gameTimerIntervalId = null;
let catsCreated;

/*----- cached elements  -----*/
const board = document.querySelector('.container');
const startButton = document.querySelector('.startGameBtn');
const scoreDisplay = document.querySelector('#score');
const timerDisplay = document.getElementById('timer');
const hiScoreDisplay = document.getElementById('hi-score-value');
const overlay = document.querySelector('.overlay');

/*----- event listeners -----*/
document.addEventListener('keydown', handleKeyPress);
startButton.addEventListener('click', function () {
  if (!gameStarted) {
    gameStarted = true;
    startButton.textContent = 'Reset';
    startGame();
    this.disabled = true;
  } else {
    endGame();
    startGame();
  }
});
/*----- functions -----*/
class Cat {
  constructor(row, col, catColor) {
    this.row = row;
    this.col = col;
    this._catColor = catColor;
  }

  get catColor() {
    return this._catColor;
  }

  set catColor(color) {
    this._catColor = color;
  }
}

function startGame() {
  setStartState();
  createBoard();
  initializeCats();
  renderBoard();
  startTimer();
}
// update the score
function updateScoreDisplay() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function setStartState() {
  timer = 30;
  canPressKey = false;
  catsPetted = 0;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  scoreDisplay.style.color = 'black';
  catsCreated = 0;
  catPointValue = 8;
}

function startTimer() {
  overlay.style.display = 'flex';
  countdownTimer = 3;
  timerDisplay.textContent = `${countdownTimer}...`;
  const countdownIntervalId = setInterval(() => {
    countdownTimer--;
    timerDisplay.textContent = `${countdownTimer}...`;
    if (countdownTimer <= 0) {
      clearInterval(countdownIntervalId);
      timerDisplay.textContent = 'Go!';
      overlay.style.display = 'none';
      canPressKey = true; // Enable keypress only after countdown
      startGameTimer(); // Start the game timer
    }
  }, 1000);
}

function startGameTimer() {
  const gameTimerIntervalId = setInterval(() => {
    timer--;
    timerDisplay.textContent = `${timer}s`;
    if (timer <= 0) {
      clearInterval(gameTimerIntervalId);
      endGame();
    }
  }, 1000);
}

function endGame() {
  overlay.style.display = 'flex';
  clearInterval(gameTimerIntervalId);
  canPressKey = false; // Disable key presses after the game ends
  if (score > hiScore) {
    hiScore = score;
  }
  hiScoreDisplay.textContent = hiScore;
  resetState();
}

function resetState() {
  countdownTimer = 3;
  timer = 30;
  canPressKey = false;
  startButton.textContent = 'Start Game';
  gameStarted = false;
  startButton.disabled = false;
  // TODO: decide if time up! or Pet the ket on game end.
  timerDisplay.textContent = `Pet The Ket`;
  updateScoreDisplay();
  scoreDisplay.style.color = 'rgba(56, 199, 56, 0.837)';
}

function createBoard() {
  for (let i = 0; i < rows; i++) {
    // Assign 1 cat per row, to each column
    const catLane = Math.floor(Math.random() * columns);

    for (let j = 0; j < columns; j++) {
      // Create div element for each iteration
      const divEl = document.createElement('div');
      // Add grid class
      divEl.classList.add('grid-item');
      // Identify each div
      divEl.id = `row-${i}-col-${j}`;

      // Append to container
      board.appendChild(divEl);
    }
  }
}

function initializeCats() {
  catPositions = []; // Reset / initialize cat positions
  for (let i = 0; i < rows; i++) {
    // Create 1 cat in each row
    const colIdx = Math.floor(Math.random() * columns);
    const newCat = new Cat(i, colIdx, determineCatColor());
    catPositions.push(newCat);
    catsCreated++;
  }
}

//Main game logic for handling the user pressing
function handleKeyPress(e) {
  if (!canPressKey) return; // Do nothing if key presses are currently disabled

  let colIdx = null;
  switch (e.key) {
    case 'z':
      colIdx = 0;
      break;
    case 'x':
      colIdx = 1;
      break;
    case 'c':
      colIdx = 2;
      break;
  }
  // If a key is pressed,
  if (colIdx !== null) {
    // returns true if cat is in the last row and the column matches the index (key press)
    const catInLastRow = catPositions.some(
      (cat) => cat.row === rows - 1 && cat.col === colIdx
    );

    if (catInLastRow) {
      // If a cat is in the target column of the last row,
      playMeowSound();
      score += catPointValue; // Increase score
      catsPetted++;

      // add increasing points generation after catsPetted
      if (catsPetted === 50) {
        catPointValue = 37;
      }
      if (catsPetted === 100) {
        catPointValue = 210;
      }
      if (catsPetted === 150) {
        catPointValue = 1312;
      }

      updateScoreDisplay();
      moveAllCatsDown();
      renderBoard();
    } else {
      // No cat in the target column of the last row - disable further key presses for X seconds
      playHissSound();
      const catNotInLastRow = catPositions.find((cat) => cat.row === rows - 1);
      const previousCatColor = catNotInLastRow.catColor;

      // fail animation
      catNotInLastRow.catColor = '🙀';
      renderBoard();
      catNotInLastRow.catColor = previousCatColor;
      setTimeout(() => {
        renderBoard();
      }, 500);

      canPressKey = false;
      setTimeout(() => {
        canPressKey = true; // Re-enable key presses after 0.5s
      }, 500);
    }
  }
}

function moveAllCatsDown() {
  // Remove cats that are in the last row
  catPositions = catPositions.filter((cat) => cat.row < rows - 1);

  // Move the remaining cats down by 1 row
  catPositions.forEach((cat) => cat.row++);

  // Add a new cat to a random column in the top row
  const newCatCol = Math.floor(Math.random() * columns);
  const newSingleCat = new Cat(0, newCatCol, determineCatColor());
  catPositions.push(newSingleCat);
  catsCreated++;
}

//Renders the view from the model
function renderBoard() {
  board.innerHTML = ''; // Clear the board
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const divEl = document.createElement('div');
      divEl.classList.add('grid-item');
      // for identification and checking
      divEl.id = `row-${i}-col-${j}`;

      // Check if there's a cat at this position, from Model
      const catAtPos = catPositions.find(
        (cat) => cat.row === i && cat.col === j
      );
      if (catAtPos) {
        divEl.classList.add('cat');
        divEl.innerHTML = catAtPos.catColor; // Set cat emoji dynamically
      }
      board.appendChild(divEl);
    }
  }
}
// logic to change cat colors after certain amount (denotes points)
function determineCatColor() {
  if (catsCreated >= 200) return '😹';
  if (catsCreated >= 150) return '😽';
  if (catsCreated >= 100) return '😸';
  if (catsCreated >= 50) return '😻';
  return '😺'; // Default color
}

function playMeowSound() {
  const audio = new Audio(clickAudio);
  audio.play();
}

function playHissSound() {
  const audio = new Audio(catHissAudio);
  audio.play();
}
