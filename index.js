import { Board } from './classes/Board.js';
import { Move } from './classes/Move.js';
import { Person } from './classes/Person.js';
import { Rules } from './classes/Rules.js';

document.addEventListener("DOMContentLoaded", function () {
  const playGameButton = document.getElementById("play-game");
  const replayButton = document.getElementById("replay-game");
  const statusDisplay = document.getElementById("status");
  const boardElement = document.getElementById("board");

  let board = new Board(); 
  let player1;
  let player2;
  let currentPlayer;
  let gameActive = false;

  renderBoard();

  playGameButton.addEventListener("click", function () {
    
    player1 = new Person(prompt("Enter Player 1 Name:") || "Player 1");
    player2 = new Person(prompt("Enter Player 2 Name:") || "Player 2");

    playGameButton.style.display = "none";
    startGame();
  });

  replayButton.addEventListener("click", resetGame);

  function renderBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = r;
        cell.dataset.col = c;
        boardElement.appendChild(cell);
      }
    }
  }

  function startGame() {
    gameActive = true;
    currentPlayer = player1;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    boardElement.innerHTML = '';
    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = r;
        cell.dataset.col = c;

        cell.addEventListener("mouseover", handleHover);
        cell.addEventListener("mouseout", removeHover);
        cell.addEventListener("click", handleMove);

        boardElement.appendChild(cell);
      }
    }
  }

  function handleMove(event) {
    if (!gameActive) return;

    const col = parseInt(event.target.dataset.col);

    if (board.isColumnFull(col)) return;

    const move = new Move(currentPlayer, col);
    const { row, col: placedCol } = board.placePiece(move.column, move.player.name);

    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${placedCol}']`);

    cell.classList.remove("hover-player1", "hover-player2");
    cell.classList.add(currentPlayer === player1 ? "player1" : "player2");

    if (Rules.checkWin(board, currentPlayer.name, row, placedCol)) {
      statusDisplay.textContent = `${currentPlayer.name} wins!`;
      gameActive = false;
      replayButton.style.display = "block";
    } else if (Rules.checkDraw(board)) {
      statusDisplay.textContent = "It's a draw!";
      gameActive = false;
      replayButton.style.display = "block";
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      statusDisplay.textContent = `${currentPlayer.name}'s turn`;
    }
  }

  function handleHover(event) {
    if (!gameActive) return;

    const col = parseInt(event.target.dataset.col);
    const availableRow = findAvailableRow(col);

    if (availableRow !== null) {
      const cell = document.querySelector(`.cell[data-row='${availableRow}'][data-col='${col}']`);

      if (currentPlayer === player1) {
        cell.classList.add("hover-player1"); 
      } else {
        cell.classList.add("hover-player2"); 
      }
    }
  }

  function removeHover(event) {
    if (!gameActive) return;

    const col = parseInt(event.target.dataset.col);
    
    // To find first available row in column
    const availableRow = findAvailableRow(col);

    if (availableRow !== null) {
      const cell = document.querySelector(`.cell[data-row='${availableRow}'][data-col='${col}']`);
      cell.classList.remove("hover-player1", "hover-player2"); 
    }
  }

  function findAvailableRow(col) {
    for (let row = board.rows - 1; row >= 0; row--) {
      if (board.grid[row][col] === null) {
        return row;
      }
    }
    return null; // If column is full
  }

  function resetGame() {
    board = new Board();
    gameActive = true;
    currentPlayer = player1;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    replayButton.style.display = "none";

    renderBoard();

    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.cols; c++) {
        const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
        cell.addEventListener("mouseover", handleHover);
        cell.addEventListener("mouseout", removeHover);
        cell.addEventListener("click", handleMove);
      }
    }
  }
});
