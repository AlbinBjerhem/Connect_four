import { Board } from './classes/Board.js';
import { Move } from './classes/Move.js';
import { Person } from './classes/Person.js';
import { Rules } from './classes/Rules.js';

document.addEventListener("DOMContentLoaded", function () {
  const playGameButton = document.getElementById("play-game");
  const startGameButton = document.getElementById("startGameButton");
  const playerModal = document.getElementById("playerModal");
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");
  const replayButton = document.getElementById("replay-game");
  const quitButton = document.getElementById("quit-game");
  const statusDisplay = document.getElementById("status");
  const boardElement = document.getElementById("board");
  const player1NameDisplay = document.getElementById("player1Name");
  const player2NameDisplay = document.getElementById("player2Name");
  const player1ScoreDisplay = document.getElementById("player1Score");
  const player2ScoreDisplay = document.getElementById("player2Score");
  const columnFullModal = document.createElement('div');
  const columnFullModalContent = document.createElement('div');
  const closeModalButton = document.createElement('button');

  columnFullModal.classList.add('modal');
  columnFullModalContent.classList.add('modal-content');
  columnFullModalContent.innerHTML = '<p>Column is full, choose another column</p>';
  closeModalButton.textContent = 'OK';
  closeModalButton.addEventListener('click', function () {
    columnFullModal.style.display = 'none';
  });

  columnFullModalContent.appendChild(closeModalButton);
  columnFullModal.appendChild(columnFullModalContent);
  document.body.appendChild(columnFullModal);

  let board = new Board();
  let player1;
  let player2;
  let currentPlayer;
  let gameActive = false;
  let player1Score = 0;
  let player2Score = 0;

  renderBoard();

  playGameButton.addEventListener("click", function () {
    playerModal.style.display = "flex";  // Show the modal for entering names
  });

  startGameButton.addEventListener("click", function () {
    const player1Name = player1Input.value || "Player 1";
    const player2Name = player2Input.value || "Player 2";

    player1 = new Person(player1Name);
    player2 = new Person(player2Name);

    player1NameDisplay.textContent = player1Name;
    player2NameDisplay.textContent = player2Name;

    document.querySelector('.scoreboard').style.display = 'flex';

    playerModal.style.display = "none";  // Hide the modal
    playGameButton.style.display = "none";
    quitButton.style.display = "block";

    startGame();
  });

  replayButton.addEventListener("click", resetGame);

  quitButton.addEventListener("click", function () {
    board = new Board();
    renderBoard();

    player1Score = 0;
    player2Score = 0;

    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    playGameButton.style.display = "block";
    replayButton.style.display = "none";
    quitButton.style.display = "none";
    statusDisplay.style.display = "none";

    document.querySelector('.scoreboard').style.display = 'none';
  });

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
    statusDisplay.style.display = "block";
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

    if (board.isColumnFull(col)) {
      columnFullModal.style.display = 'flex';
      return;
    }

    const move = new Move(currentPlayer, col);
    const { row, col: placedCol } = board.placePiece(move.column, move.player.name);

    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${placedCol}']`);

    cell.classList.remove("hover-player1", "hover-player2");
    cell.classList.add(currentPlayer === player1 ? "player1" : "player2");

    if (Rules.checkWin(board, currentPlayer.name, row, placedCol)) {
      statusDisplay.textContent = `${currentPlayer.name} wins!`;

      if (currentPlayer === player1) {
        player1Score++;
        player1ScoreDisplay.textContent = player1Score;
      } else {
        player2Score++;
        player2ScoreDisplay.textContent = player2Score;
      }

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
    return null;
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
