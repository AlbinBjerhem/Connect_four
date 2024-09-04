import { Board } from './classes/Board.js';
import { Move } from './classes/Move.js';
import { Person } from './classes/Person.js';
import { Rules } from './classes/Rules.js';

document.addEventListener("DOMContentLoaded", function () {
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");
  const startButton = document.getElementById("start-game");
  const replayButton = document.getElementById("replay-game");
  const backButton = document.getElementById("back-to-start");
  const statusDisplay = document.getElementById("status");
  const boardElement = document.getElementById("board");

  let board;
  let player1;
  let player2;
  let currentPlayer;
  let gameActive;

  startButton.addEventListener("click", startGame);
  replayButton.addEventListener("click", resetGame);
  backButton.addEventListener("click", backToStart);

  function startGame() {
    board = new Board();
    player1 = new Person(player1Input.value || "Player 1");
    player2 = new Person(player2Input.value || "Player 2");
    currentPlayer = player1;
    gameActive = true;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    player1Input.style.display = "none";
    player2Input.style.display = "none";
    document.getElementById("labelPlayer1").style.display = "none";
    document.getElementById("labelPlayer2").style.display = "none";
    startButton.style.display = "none";

    backButton.style.display = "block"; 

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

    cell.classList.remove("hover-player1");
    cell.classList.remove("hover-player2");

    cell.classList.add(currentPlayer === player1 ? "player1" : "player2");

    removeHover(event);

    if (Rules.checkWin(board, currentPlayer.name, row, placedCol)) {
      statusDisplay.textContent = `${currentPlayer.name} wins!`;
      gameActive = false;
      replayButton.style.display = "block"; 
      backButton.style.display = "none";
    } else if (Rules.checkDraw(board)) {
      statusDisplay.textContent = "It's a draw!";
      gameActive = false;
      replayButton.style.display = "block"; 
      backButton.style.display = "none";
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
        cell.classList.remove("hover-player1");
        cell.classList.remove("hover-player2");
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
    currentPlayer = player1;
    gameActive = true;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    player1Input.style.display = "none";
    player2Input.style.display = "none";
    document.getElementById("labelPlayer1").style.display = "none";
    document.getElementById("labelPlayer2").style.display = "none";
    startButton.style.display = "none";

    replayButton.style.display = "none"; 

    backButton.style.display = "block"; 

    // Restore Board
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

  function backToStart() {
    // Restore game function
    boardElement.innerHTML = ''; 
    statusDisplay.textContent = ''; 
    backButton.style.display = "none"; 
    replayButton.style.display = "none";

    player1Input.style.display = "block";
    player2Input.style.display = "block";
    document.getElementById("labelPlayer1").style.display = "block";
    document.getElementById("labelPlayer2").style.display = "block";
    startButton.style.display = "block";
  }
});
