import { Board } from './classes/Board.js';
import { Rules } from './classes/Rules.js';
import { valuetypes, ai, disableClicks, enableClicks } from './function.js'

document.addEventListener("DOMContentLoaded", function () {
  const playGameButton = document.getElementById("play-game");
  const startGameButton = document.getElementById("startGameButton");
  const playerModal = document.getElementById("playerModal");
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

  const nameErrorModal = document.createElement('div');
  const nameErrorModalContent = document.createElement('div');
  const closeNameErrorModalButton = document.createElement('button');

  // New references for player inputs and selects
  const player1TypeSelect = document.getElementById("player1Type");
  const player2TypeSelect = document.getElementById("player2Type");
  const player1Input = document.getElementById("player1Input");
  const player2Input = document.getElementById("player2Input");

  columnFullModal.classList.add('modal');
  columnFullModalContent.classList.add('modal-content');
  columnFullModalContent.innerHTML = `<p> Column is full, choose another column</p>`;
  closeModalButton.textContent = 'OK';
  closeModalButton.addEventListener('click', function () {
    columnFullModal.style.display = 'none';
  });

  columnFullModalContent.appendChild(closeModalButton);
  columnFullModal.appendChild(columnFullModalContent);
  document.body.appendChild(columnFullModal);

  nameErrorModal.classList.add('modal');
  nameErrorModalContent.classList.add('modal-content');
  nameErrorModalContent.innerHTML = '<p>Players must have different names!</p>';
  closeNameErrorModalButton.textContent = 'OK';
  closeNameErrorModalButton.addEventListener('click', function () {
    nameErrorModal.style.display = 'none';
  });

  nameErrorModalContent.appendChild(closeNameErrorModalButton);
  nameErrorModal.appendChild(nameErrorModalContent);
  document.body.appendChild(nameErrorModal);

  let board = new Board();
  let player1;
  let player2;
  let currentPlayer;
  let gameActive = false;
  let player1Score = 0;
  let player2Score = 0;
  let gameState = '';

  renderBoard();

  // Initialize input visibility based on default selections
  updatePlayer1InputVisibility();
  updatePlayer2InputVisibility();

  // Event listeners for player type selection changes
  player1TypeSelect.addEventListener('change', updatePlayer1InputVisibility);
  player2TypeSelect.addEventListener('change', updatePlayer2InputVisibility);

  function updatePlayer1InputVisibility() {
    if (player1TypeSelect.value === 'human') {
      player1Input.style.display = 'block';
    } else {
      player1Input.style.display = 'none';
    }
  }

  function updatePlayer2InputVisibility() {
    if (player2TypeSelect.value === 'human') {
      player2Input.style.display = 'block';
    } else {
      player2Input.style.display = 'none';
    }
  }

  // Replay button
  replayButton.addEventListener("click", async function () {
    resetGame()
    if (player1.type === 'ai') {
      await handleMove();
    }
  })

  // Play game button
  playGameButton.addEventListener("click", function () {
    playerModal.style.display = "flex";
  });

  // Start game button
  startGameButton.addEventListener("click", async function () {
    const player1Type = player1TypeSelect.value;
    const player2Type = player2TypeSelect.value;

    const player1NameInput = player1Input.value || 'Player 1';
    const player2NameInput = player2Input.value || 'Player 2';

    player1 = valuetypes(player1Type, board, player1NameInput);
    player2 = valuetypes(player2Type, board, player2NameInput);

    if (player1.name === player2.name) {
      player2.name = player2.name + ' 2';
    }

    player1NameDisplay.textContent = player1.name;
    player2NameDisplay.textContent = player2.name;

    document.querySelector('.scoreboard').style.display = 'flex';

    playerModal.style.display = "none";
    playGameButton.style.display = "none";
    quitButton.style.display = "block";

    startGame();

    if (player1.type === 'ai') {
      await handleMove();
    }
  });

  // Quit button
  quitButton.addEventListener("click", function () {
    gameActive = false
    board = new Board();
    renderBoard();

    player1Score = 0;
    player2Score = 0;
    gameState = ''

    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    playGameButton.style.display = "block";
    replayButton.style.display = "none";
    quitButton.style.display = "none";
    statusDisplay.style.display = "none";

    document.querySelector('.scoreboard').style.display = 'none';
  });

  // Handle moves in board
  async function handleMove(event) {
    if (!gameActive) return;  // If the game is not active, do nothing
    let col;
    player1.color = 'red'
    player2.color = 'yellow'

    switch (await currentPlayer.type) {
      case 'human':
        col = parseInt(event.target.dataset.col);  // No need to await parseInt
        console.log("player move, column: ", col + " color: ", currentPlayer.color);
        gameState += (col + 1).toString();
        break;
      case 'external':
        col = await currentPlayer.getMoveFromExternalAI(1, gameState);  // Assuming level 1 AI
        console.log("external move, column: ", col + " color: ", currentPlayer.color);
        gameState += (col + 1).toString();
        break;
      case 'ai':
        col = await currentPlayer.makeBotMove();  // Get the AI's move
        console.log("AI move, column:", col + " color: ", currentPlayer.color);
        gameState += (col + 1).toString();
    }
    if (!gameActive) return;

    disableClicks();

    // Check if the selected column is full
    if (board.isColumnFull(col)) {
      columnFullModal.style.display = 'flex';
      enableClicks();  // Re-enable clicks so the player can try another column
      return;
    }
    if (!gameActive) return;
    // Place the piece on the board and get the Cell where it was placed
    const placedCell = board.placePiece(col, currentPlayer.color);  // Assuming placePiece now returns a Cell object

    // Extract row and col from the placedCell
    const { row, col: placedCol } = placedCell;

    if (!gameActive) return;
    // Update the UI to reflect the placed piece
    const cellElement = document.querySelector(`.cell[data-row='${row}'][data-col='${placedCol}']`);
    cellElement.classList.remove("hover-player1", "hover-player2");
    cellElement.classList.add(currentPlayer === player1 ? "player1" : "player2");

    // Check if the current move results in a win
    const winningDiscs = Rules.checkWin(board, currentPlayer.color, row, placedCol);

    if (winningDiscs) {
      // If the current player wins, update the display and score
      statusDisplay.textContent = `${currentPlayer.name} wins!`;

      // Highlight the winning cells
      winningDiscs.forEach(disc => {
        const winningCellElement = document.querySelector(`.cell[data-row='${disc.row}'][data-col='${disc.col}']`);
        winningCellElement.classList.add("blink");
      });

      if (currentPlayer === player1) {
        player1Score++;
        player1ScoreDisplay.textContent = player1Score;
      } else {
        player2Score++;
        player2ScoreDisplay.textContent = player2Score;
      }

      gameActive = false;  // Disable game after a win
      replayButton.style.display = "block";
      return;
    }

    // Check for a draw
    if (Rules.checkDraw(board)) {
      statusDisplay.textContent = "It's a draw!";
      gameActive = false;
      replayButton.style.display = "block";
      return;
    }

    // Switch turns
    currentPlayer = await currentPlayer === player1 ? player2 : player1;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    if (player1.type === 'human' || player2.type === 'human') {
      if ((currentPlayer.type === 'ai') || (currentPlayer.type === 'external')) {
        setTimeout(async () => {
          await handleMove();  // AI makes its move
          enableClicks();  // Re-enable clicks after AI has made its move
        }, 500);  // AI move delay
      }
    }

    if (player1.type === 'ai' && (player2.type === 'external' || player2.type === 'ai')) {
      await loopUntilGameEnds();
    }
    enableClicks();
  }

  function startGame() {
    gameActive = true;
    currentPlayer = player1;
    enableClicks()
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

  function handleHover(event) {
    if (!gameActive) return;

    if (currentPlayer.type !== 'human') return;
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
      if (board.grid[row][col].color === null || board.grid[row][col].color === " ") {
        return row;
      }
    }
    return null;
  }


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

  function resetGame() {
    board = new Board();

    gameActive = true;
    enableClicks()
    if (player1.type === 'ai') {
      player1 = ai(player1.level, board)
    }
    if (player2.type === 'ai') {
      player2 = ai(player2.level, board)
    }
    currentPlayer = player1;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;
    gameState = ''

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

  async function loopUntilGameEnds() {
    while (gameActive) {
      await handleMove();  // Wait for each move to complete before continuing
    }
  }

});
