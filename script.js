let board = [];
let currentPlayer = "X";
let gameActive = false;
let vsComputer = false;

function startGame(mode) {
  vsComputer = mode === 'cpu';
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").textContent = "Player X's turn";
  createBoard();
}

function createBoard() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    document.getElementById("status").textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyCells = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  if (emptyCells.length === 0) return;
  let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  document.querySelector(`[data-index='${move}']`).click();
}

function checkWin() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      [a, b, c].forEach(i => {
        const cell = document.querySelector(`[data-index='${i}']`);
        cell.classList.add("win");
      });

      // 🎉 Confetti blast
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      return true;
    }
  }
  return false;
}

function resetGame() {
  startGame(vsComputer ? 'cpu' : 'pvp');
}
