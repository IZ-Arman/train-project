const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Initialize game
function startGame() {
  cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
    cell.textContent = "";
    cell.classList.remove("X", "O", "win");
  });
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Handle cell click
function cellClicked(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  checkWinner();
}

// Check for winner or draw
function checkWinner() {
  let roundWon = false;
  let winningCombo = [];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCombo = combo;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    highlightWinner(winningCombo);
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
  } else if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "😐 It's a Draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Highlight winning cells
function highlightWinner(combo) {
  combo.forEach(index => {
    cells[index].classList.add("win");
  });
}

// Restart game
restartBtn.addEventListener("click", startGame);

// Start when loaded
startGame();
