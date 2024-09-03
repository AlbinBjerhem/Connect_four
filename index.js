import { Board } from './classes/Board.js';
import { Move } from './classes/Move.js';
import { Person } from './classes/Person.js';
import { Rules } from './classes/Rules.js';

document.addEventListener("DOMContentLoaded", function () {
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");
  const startButton = document.getElementById("start-game");
  const replayButton = document.getElementById("replay-game");
  const statusDisplay = document.getElementById("status");
  const boardElement = document.getElementById("board");

  let board;
  let player1;
  let player2;
  let currentPlayer;
  let gameActive;

  startButton.addEventListener("click", startGame);
  replayButton.addEventListener("click", resetGame);

  function startGame() {
    board = new Board();
    player1 = new Person(player1Input.value || "Player 1");
    player2 = new Person(player2Input.value || "Player 2");
    currentPlayer = player1;
    gameActive = true;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    boardElement.innerHTML = '';
    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = r;
        cell.dataset.col = c;
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

  function resetGame() {
    startGame();
    replayButton.style.display = "none";
  }
});
