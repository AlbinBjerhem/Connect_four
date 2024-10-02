import { Board } from './classes/Board.js';
import { Rules } from './classes/Rules.js';
import { valuetypes, ai, disableClicks, enableClicks, external } from './function.js';
import { Person } from './classes/Person.js';
import Network from './classes/Network.js';
import generateCode from './classes/generateCode.js';

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

  // External AI level selection
  const externalAILevelContainer = document.getElementById("externalAILevelContainer");
  const externalAILevelSelect = document.getElementById("externalAILevel");

  // References for online play
  const playOnlineButton = document.getElementById("play-online");
  const onlineModal = document.getElementById("onlineModal");
  const createLobbyButton = document.getElementById("createLobbyButton");
  const joinLobbyButton = document.getElementById("joinLobbyButton");
  const lobbyCodeContainer = document.getElementById("lobbyCodeContainer");
  const lobbyCodeDisplay = document.getElementById("lobbyCodeDisplay");
  const joinLobbyContainer = document.getElementById("joinLobbyContainer");
  const joinCodeInput = document.getElementById("joinCodeInput");
  const joinCodeButton = document.getElementById("joinCodeButton");

  // New references for online player name inputs
  const createNameContainer = document.getElementById("createNameContainer");
  const createNameInput = document.getElementById("createNameInput");
  const createNameButton = document.getElementById("createNameButton");

  const joinNameContainer = document.getElementById("joinNameContainer");
  const joinNameInput = document.getElementById("joinNameInput");
  const joinNameButton = document.getElementById("joinNameButton");

  columnFullModal.classList.add('modal');
  columnFullModalContent.classList.add('modal-content');
  columnFullModalContent.innerHTML = `<p>Column is full, choose another column</p>`;
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
  let isOnlineGame = false; // Flag to indicate online play

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
    if (player2TypeSelect.value === 'external') {
      externalAILevelContainer.style.display = 'block';
    } else {
      externalAILevelContainer.style.display = 'none';
    }
  }

  // Replay button
  replayButton.addEventListener("click", async function () {
    if (isOnlineGame) {
      Network.send(JSON.stringify({ type: 'reset' })); // Reset game for opponent
      resetOnlineGame();
    } else {
      resetGame();
      if (currentPlayer.type === 'ai') {
        await handleMove();
      }
    }
  });

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

    // Assign colors
    const player1Color = 'red';
    const player2Color = 'yellow';

    // Create player1
    player1 = valuetypes(player1Type, board, player1NameInput, null, player1Color);
    player1.color = player1Color; // Ensure color is set

    // Create player2
    if (player2Type === 'external') {
      const player2Level = parseInt(externalAILevelSelect.value);
      player2 = valuetypes(player2Type, board, player2NameInput, player2Level, player2Color);
    } else {
      player2 = valuetypes(player2Type, board, player2NameInput, null, player2Color);
    }
    player2.color = player2Color; // Ensure color is set

    // Ensure unique names
    if (player1.name === player2.name) {
      player2.name = player2.name + ' 2';
    }

    player1NameDisplay.textContent = player1.name;
    player2NameDisplay.textContent = player2.name;

    document.querySelector('.scoreboard').style.display = 'flex';

    playerModal.style.display = "none";
    playGameButton.style.display = "none";
    quitButton.style.display = "block";
    playOnlineButton.style.display = "none";

    startGame();

    if (currentPlayer.type === 'ai') {
      await handleMove();
    }
  });

  // Quit button
  quitButton.addEventListener("click", function () {
    gameActive = false;
    board = new Board();
    renderBoard();

    player1Score = 0;
    player2Score = 0;
    gameState = '';

    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    playGameButton.style.display = "block";
    playOnlineButton.style.display = "block";
    replayButton.style.display = "none";
    quitButton.style.display = "none";
    statusDisplay.style.display = "none";

    document.querySelector('.scoreboard').style.display = 'none';
  });

  // Handle moves in board
  async function handleMove(event) {
    if (!gameActive) return;  // If the game is not active, do nothing

    if (isOnlineGame && currentPlayer.type !== 'human') {
      console.warn("Not your turn!");
      return;
    }

    let col;
    if (event) {
      col = parseInt(event.target.dataset.col);
    } else if (currentPlayer.type === 'ai') {
      if (!gameActive) return; 
      // For AI players
      col = await currentPlayer.makeBotMove();
    } else if (currentPlayer.type === 'external') {
      if (!gameActive) return; 
      // Handle external AI move
      col = await currentPlayer.getMoveFromExternalAI(board);
    } else {
      // Should not happen, but handle the case where move method is not available
      console.error("currentPlayer does not have a valid move method.");
      return;
    }

    if (!gameActive) return;
    // Check if the selected column is full
    if (board.isColumnFull(col)) {
      if (currentPlayer.type === 'human') {
        columnFullModal.style.display = 'flex';
      }
      enableClicks();
      return;
    }

    disableClicks();

    // Place the piece on the board and get the Cell where it was placed
    const placedCell = board.placePiece(col, currentPlayer.color);

    // Extract row and col from the placedCell
    const { row, col: placedCol } = placedCell;

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

      if (!isOnlineGame) {
        if (currentPlayer === player1) {
          player1Score++;
          player1ScoreDisplay.textContent = player1Score;
        } else {
          player2Score++;
          player2ScoreDisplay.textContent = player2Score;
        }
      }

      gameActive = false;  // Disable game after a win
      replayButton.style.display = "block";

      // Send the move and game over notification to the opponent
      if (isOnlineGame && currentPlayer.type === 'human') {
        Network.send(JSON.stringify({ type: 'move', col: col, gameOver: true, winner: currentPlayer.name }));
      }

      return;
    }

    // Check for a draw
    if (Rules.checkDraw(board)) {
      statusDisplay.textContent = "It's a draw!";
      gameActive = false;
      replayButton.style.display = "block";

      // Notify opponent about the draw
      if (isOnlineGame && currentPlayer.type === 'human') {
        Network.send(JSON.stringify({ type: 'move', col: col, gameOver: true, draw: true }));
      }

      return;
    }

    // Send move to opponent in online game
    if (isOnlineGame && currentPlayer.type === 'human') {
      Network.send(JSON.stringify({ type: 'move', col: col }));
    }

    // Switch turns
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    if (currentPlayer.type === 'human') {
      enableClicks();
    } else if (currentPlayer.type === 'ai' || currentPlayer.type === 'external') {
      await handleMove();
    } else {
      disableClicks();
    }
  }

  function startGame() {
    gameActive = true;
    isOnlineGame = false; // Not an online game
    currentPlayer = player1;
    enableClicks();
    statusDisplay.style.display = "block";
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    board = new Board(); // Reset the board
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
    enableClicks();

    // Update AI players' board references
    if (player1.type === 'ai' || player1.type === 'external') {
      player1.board = board; // Update board reference
    }
    if (player2.type === 'ai' || player2.type === 'external') {
      player2.board = board; // Update board reference
    }

    currentPlayer = player1;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;
    gameState = '';

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

    // Start the game if the AI is supposed to make the first move
    if (currentPlayer.type === 'ai' || currentPlayer.type === 'external') {
      handleMove();
    }
  }

  function resetOnlineGame() {
    board = new Board();
    gameActive = true;
    renderBoard();

    player1Score = 0;
    player2Score = 0;
    gameState = '';

    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    replayButton.style.display = "none";
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    // Add event listeners for new game moves
    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.cols; c++) {
        const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
        cell.addEventListener("mouseover", handleHover);
        cell.addEventListener("mouseout", removeHover);
        cell.addEventListener("click", handleMove);
      }
    }

    if (currentPlayer.type === 'human') {
      enableClicks();
    } else {
      disableClicks();
    }
  }
  // Online Play Functions

  playOnlineButton.addEventListener("click", function () {
    onlineModal.style.display = "flex";

    // Hide all other containers
    createLobbyButton.style.display = "block";
    joinLobbyButton.style.display = "block";
    createNameContainer.style.display = "none";
    joinNameContainer.style.display = "none";
    lobbyCodeContainer.style.display = "none";
    joinLobbyContainer.style.display = "none";
  });

  createLobbyButton.addEventListener("click", function () {
    // Show name input for creating lobby
    createLobbyButton.style.display = "none";
    joinLobbyButton.style.display = "none";
    createNameContainer.style.display = "block";
  });

  createNameButton.addEventListener("click", function () {
    const playerName = createNameInput.value.trim() || 'Player 1';

    // Generate lobby code
    const code = generateCode();
    lobbyCodeDisplay.textContent = code;
    lobbyCodeContainer.style.display = "block";
    createNameContainer.style.display = "none";

    // Set up network connection
    const userId = Math.random().toString(36).substr(2, 9);
    Network.startConnection(userId, code, networkListener);

    // Store userId and code for later use
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('code', code);
    sessionStorage.setItem('playerName', playerName);

    // Set player1 name
    player1NameDisplay.textContent = playerName;
  });

  joinLobbyButton.addEventListener("click", function () {
    // Show name input for joining lobby
    createLobbyButton.style.display = "none";
    joinLobbyButton.style.display = "none";
    joinNameContainer.style.display = "block";
  });

  joinNameButton.addEventListener("click", function () {
    const playerName = joinNameInput.value.trim() || 'Player 2';

    // Show join code input
    joinNameContainer.style.display = "none";
    joinLobbyContainer.style.display = "block";

    // Store player name
    sessionStorage.setItem('playerName', playerName);
  });

  joinCodeButton.addEventListener("click", function () {
    const code = joinCodeInput.value.trim().toUpperCase();
    const playerName = sessionStorage.getItem('playerName') || 'Player 2';

    if (code) {
      const userId = Math.random().toString(36).substr(2, 9);
      Network.startConnection(userId, code, networkListener);

      // Store userId for later use
      sessionStorage.setItem('userId', userId);

      // Delay sending the 'join' message to ensure connection is established
      setTimeout(() => {
        // Notify the other player that the game can start
        Network.send(JSON.stringify({ type: 'join', userId: userId, playerName: playerName }));
      }, 1000); // Adjust the delay as needed

      // We do not call startOnlineGame() here; we'll wait for the 'start' message from the lobby creator

    } else {
      alert("Please enter a valid code.");
    }
  });

  function networkListener(message) {
    console.log("Received message:", message); // For debugging

    // Ignore messages sent by ourselves
    if (message.user === sessionStorage.getItem('userId')) {
      return;
    }

    // Check if the message is from the system and ignore it
    if (message.user && message.user === 'system') {
      console.log("System message received:", message.data);
      return;
    }

    // Parse the actual message sent by the other player
    let parsedData;
    try {
      parsedData = JSON.parse(message.data);
    } catch (error) {
      console.error("Failed to parse message data:", message.data);
      return;
    }

    // Handle the parsed message
    if (parsedData.type === 'join') {
      // The other player has joined
      sessionStorage.setItem('opponentName', parsedData.playerName || 'Opponent');

      // Send a 'start' message to the joining player to initiate the game
      Network.send(JSON.stringify({ type: 'start', playerName: sessionStorage.getItem('playerName') }));

      // Start the game on the lobby creator's side
      onlineModal.style.display = "none";
      startOnlineGame();

    } else if (parsedData.type === 'start') {
      // The lobby creator has sent a 'start' message
      sessionStorage.setItem('opponentName', parsedData.playerName || 'Opponent');
      onlineModal.style.display = "none";
      startOnlineGame();

    } else if (parsedData.type === 'move') {
      // Handle move from the other player
      const col = parsedData.col;
      handleRemoteMove(col);
    } else if (parsedData.type === 'reset') {
      // Handle reset from the other player
      resetOnlineGame(); // Reset the game state for the opponent
    }
  }

  function startOnlineGame() {
    gameActive = true;
    isOnlineGame = true; // Indicate online play

    // Determine player roles based on session data
    const code = sessionStorage.getItem('code');
    const userId = sessionStorage.getItem('userId');
    const playerName = sessionStorage.getItem('playerName') || 'You';
    const opponentName = sessionStorage.getItem('opponentName') || 'Opponent';

    board = new Board();
    renderBoard();

    if (code) {
      // Creator of the lobby (Player 1)
      player1 = new Person(playerName);
      player1.type = 'human';
      player1.color = 'red';

      player2 = new Person(opponentName);
      player2.type = 'remote';
      player2.color = 'yellow';

      currentPlayer = player1; // Lobby creator starts first

    } else {
      // Joined the lobby (Player 2)
      player1 = new Person(opponentName);
      player1.type = 'remote';
      player1.color = 'red';

      player2 = new Person(playerName);
      player2.type = 'human';
      player2.color = 'yellow';

      currentPlayer = player1; // It's the opponent's turn first
    }

    player1NameDisplay.textContent = player1.name;
    player2NameDisplay.textContent = player2.name;

    statusDisplay.style.display = "block";
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    document.querySelector('.scoreboard').style.display = 'flex';

    playOnlineButton.style.display = "none";
    playGameButton.style.display = "none";
    // Add event listeners for local player's moves
    for (let r = 0; r < board.rows; r++) {
      for (let c = 0; c < board.cols; c++) {
        const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
        cell.addEventListener("mouseover", handleHover);
        cell.addEventListener("mouseout", removeHover);
        cell.addEventListener("click", handleMove);
      }
    }

    if (currentPlayer.type === 'human') {
      enableClicks();
    } else {
      disableClicks();
    }
  }

  function handleRemoteMove(col) {
    if (!gameActive) return;

    if (board.isColumnFull(col)) {
      console.error('Received move for full column');
      return;
    }

    // Identify the remote player
    let remotePlayer = player1.type === 'remote' ? player1 : player2;

    // Place the piece using the remote player's color
    const placedCell = board.placePiece(col, remotePlayer.color);

    // Extract row and col from the placedCell
    const { row, col: placedCol } = placedCell;

    // Update the UI to reflect the placed piece
    const cellElement = document.querySelector(`.cell[data-row='${row}'][data-col='${placedCol}']`);
    cellElement.classList.remove("hover-player1", "hover-player2");
    cellElement.classList.add(remotePlayer === player1 ? "player1" : "player2");

    // Check if the current move results in a win
    const winningDiscs = Rules.checkWin(board, remotePlayer.color, row, placedCol);

    if (winningDiscs) {
      // If the remote player wins, update the display
      statusDisplay.textContent = `${remotePlayer.name} wins!`;

      // Highlight the winning cells
      winningDiscs.forEach(disc => {
        const winningCellElement = document.querySelector(`.cell[data-row='${disc.row}'][data-col='${disc.col}']`);
        winningCellElement.classList.add("blink");
      });

      gameActive = false;  // Disable game after a win
      return;
    }

    // Check for a draw
    if (Rules.checkDraw(board)) {
      statusDisplay.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    // Switch turns
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    if (currentPlayer.type === 'human') {
      enableClicks();
    } else {
      disableClicks();
    }
  }

});