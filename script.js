/*----- constants -----*/
const rows = 8;
const columns = 3;
let catPositions = []; // Hold {row, col,} objects for each cat
let catPointValue; // Holds the value of each cat
let catsPetted; // Holds the number of cats petted (Defines point system)

//TRYING NOW
let catsCreated; // when board is rendered, start at 8 and increment, when cats is at 50, change the color.

/*----- state variables -----*/
let canPressKey; // Allow players to press key
let score = 0; // Track score
let timer; // Declare timer

/*----- cached elements  -----*/
const board = document.querySelector(".container");
const startButton = document.getElementById("startGameBtn");
const scoreDisplay = document.querySelector("#score");
const timerDisplay = document.getElementById("timer");

/*----- event listeners -----*/
document.addEventListener("keydown", handleKeyPress);
startButton.addEventListener("click", function () {
  startGame(); // Initialize game
  startTimer(); // Start the timer
  this.disabled = true; // Disable start button
});
/*----- functions -----*/
function startGame() {
  setStartState();
  console.log(catsPetted);
  createBoard();
  initializeCats();
  renderBoard();
}
// update the score
function updateScoreDisplay() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function setStartState() {
  timer = 120;
  canPressKey = true;
  catsPetted = 0;
  score = 0;
  catsCreated = 0;
  catPointValue = 8;
}

function startTimer() {
  const intervalId = setInterval(() => {
    // decrement timer
    timer--;
    // update timer display
    timerDisplay.textContent = `Time: ${timer}s`;
    // Timer ends logic
    if (timer <= 0) {
      console.log(catsPetted);
      clearInterval(intervalId); // Stop timer
      resetState();
    }
  }, 1000);
}

function resetState() {
  // Disable key press
  canPressKey = false;
  // Clear the board
  board.innerHTML = "";
  // Re-enable start button
  startButton.disabled = false;
  // Display final points
  scoreDisplay.textContent = `Final Score: ${score}`;
}

function createBoard() {
  for (let i = 0; i < rows; i++) {
    // Assign 1 cat per row, to each column
    const catLane = Math.floor(Math.random() * columns);

    for (let j = 0; j < columns; j++) {
      // Create div element for each iteration
      const divEl = document.createElement("div");
      // Add grid class
      divEl.classList.add("grid-item");
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
    catPositions.push({ row: i, col: colIdx });
    catsCreated = 8;
    console.log(`catsCreated = ${catsCreated}`);
  }
}

//Main game logic for handling the user pressing
function handleKeyPress(e) {
  if (!canPressKey) return; // Do nothing if key presses are currently disabled

  let colIdx = null;
  switch (e.key) {
    case "z":
      colIdx = 0;
      break;
    case "x":
      colIdx = 1;
      break;
    case "c":
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

      console.log(`catspetted: ${catsPetted}`);
      updateScoreDisplay(); // Update score display
      moveAllCatsDown();
      renderBoard(); // Re-render the board to reflect the updated model
    } else {
      // No cat in the target column of the last row - disable further key presses for X seconds
      canPressKey = false;
      setTimeout(() => {
        canPressKey = true; // Re-enable key presses after 1 second
      }, 500);
      console.log(canPressKey);
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
  catPositions.push({ row: 0, col: newCatCol, color: "cat0" });
  catsCreated++;
  console.log(`catCreatedCount = ${catsCreated}`);
}

function renderBoard() {
  board.innerHTML = ""; // Clear the board
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const divEl = document.createElement("div");
      divEl.classList.add("grid-item");
      divEl.id = `row-${i}-col-${j}`;

      // Check if there's a cat at this position, from Model
      if (catPositions.some((cat) => cat.row === i && cat.col === j)) {
        // NEW CONDITIONS TO CHANGE CAT COLOR -> this doesnt work well, will add to the add new cat to top row function
        divEl.classList.add("cat"); // Default class for blue cats
      }
      board.appendChild(divEl);
    }
  }
}
