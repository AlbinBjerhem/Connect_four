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

  const player1TypeSelect = document.getElementById("player1Type");
  const player2TypeSelect = document.getElementById("player2Type");
  const player1Input = document.getElementById("player1Input");
  const player2Input = document.getElementById("player2Input");

  const externalAILevelContainer = document.getElementById("externalAILevelContainer");
  const externalAILevelSelect = document.getElementById("externalAILevel");

  const playOnlineButton = document.getElementById("play-online");
  const onlineModal = document.getElementById("onlineModal");
  const createLobbyButton = document.getElementById("createLobbyButton");
  const joinLobbyButton = document.getElementById("joinLobbyButton");
  const lobbyCodeContainer = document.getElementById("lobbyCodeContainer");
  const lobbyCodeDisplay = document.getElementById("lobbyCodeDisplay");
  const joinLobbyContainer = document.getElementById("joinLobbyContainer");
  const joinCodeInput = document.getElementById("joinCodeInput");
  const joinCodeButton = document.getElementById("joinCodeButton");

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
  let isOnlineGame = false; 
  let userId;
  let code;
  let playerName;
  let opponentName;
  let swapRoles = false; // Swap roles when Play Again // 
  let isCreator; 

  renderBoard();

  updatePlayer1InputVisibility();
  updatePlayer2InputVisibility();

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

  replayButton.addEventListener("click", async function () {
    if (isOnlineGame) {
      swapRoles = !swapRoles;

      Network.send(JSON.stringify({ type: 'reset', swap: swapRoles })); 

      resetOnlineGame(swapRoles); 
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

    const player1Color = 'red';
    const player2Color = 'yellow';

    // Create player1
    player1 = valuetypes(player1Type, board, player1NameInput, null, player1Color);
    player1.color = player1Color; 

    // Create player2
    if (player2Type === 'external') {
      const player2Level = parseInt(externalAILevelSelect.value);
      player2 = valuetypes(player2Type, board, player2NameInput, player2Level, player2Color);
    } else {
      player2 = valuetypes(player2Type, board, player2NameInput, null, player2Color);
    }
    player2.color = player2Color; 

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
  quitButton.addEventListener("click", async function () {
    if (isOnlineGame) {
      // Message opponent
      const playerNameQuit = playerName || 'Player';
      await Network.send(JSON.stringify({ type: 'quit', playerName: playerNameQuit }));
      Network.closeConnection();

      gameActive = false;
      isOnlineGame = false;

      // Hide UI elements
      playGameButton.style.display = "block";
      playOnlineButton.style.display = "block";
      replayButton.style.display = "none";
      quitButton.style.display = "none";
      statusDisplay.style.display = "none";

      document.querySelector('.scoreboard').style.display = 'none';

      board = new Board();
      renderBoard();
    } else {
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
    }
  });

  // Handle moves in board
  async function handleMove(event) {
    if (!gameActive) return;  

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

    const placedCell = board.placePiece(col, currentPlayer.color);

    const { row, col: placedCol } = placedCell;

    const cellElement = document.querySelector(`.cell[data-row='${row}'][data-col='${placedCol}']`);
    cellElement.classList.remove("hover-player1", "hover-player2");
    cellElement.classList.add(currentPlayer === player1 ? "player1" : "player2");

    const winningDiscs = Rules.checkWin(board, currentPlayer.color, row, placedCol);

    if (winningDiscs) {
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
    isOnlineGame = false; 
    currentPlayer = player1;
    enableClicks();
    statusDisplay.style.display = "block";
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    board = new Board(); 
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
      player1.board = board; 
    }
    if (player2.type === 'ai' || player2.type === 'external') {
      player2.board = board; 
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

  function resetOnlineGame(swapRoles) {
    gameActive = true;
    isOnlineGame = true; 

    board = new Board();
    renderBoard();

    if (isCreator) {
      if (swapRoles) {
        // Swap roles
        player1 = new Person(opponentName);
        player1.type = 'remote';
        player1.color = 'red';

        player2 = new Person(playerName);
        player2.type = 'human';
        player2.color = 'yellow';

        currentPlayer = player1; 

      } else {
        player1 = new Person(playerName);
        player1.type = 'human';
        player1.color = 'red';

        player2 = new Person(opponentName);
        player2.type = 'remote';
        player2.color = 'yellow';
        currentPlayer = player1; 
      }

    } else {
      if (swapRoles) {

        player1 = new Person(playerName);
        player1.type = 'human';
        player1.color = 'red';

        player2 = new Person(opponentName);
        player2.type = 'remote';
        player2.color = 'yellow';

        currentPlayer = player1; 
      } else {
        player1 = new Person(opponentName);
        player1.type = 'remote';
        player1.color = 'red';

        player2 = new Person(playerName);
        player2.type = 'human';
        player2.color = 'yellow';

        currentPlayer = player1; 
      }
    }

    player1NameDisplay.textContent = player1.name;
    player2NameDisplay.textContent = player2.name;

    statusDisplay.style.display = "block";
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    document.querySelector('.scoreboard').style.display = 'flex';

    replayButton.style.display = "none";

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
    playerName = createNameInput.value.trim() || 'Player 1';

    // Generate lobby code
    code = generateCode();
    lobbyCodeDisplay.textContent = code;
    lobbyCodeContainer.style.display = "block";
    createNameContainer.style.display = "none";

    // Set up network connection
    userId = Math.random().toString(36).substr(2, 9);
    Network.startConnection(userId, code, networkListener);

    isCreator = true; 

    // Set player1 name
    player1NameDisplay.textContent = playerName;
  });

  joinLobbyButton.addEventListener("click", function () {
    createLobbyButton.style.display = "none";
    joinLobbyButton.style.display = "none";
    joinNameContainer.style.display = "block";
  });

  joinNameButton.addEventListener("click", function () {
    playerName = joinNameInput.value.trim() || 'Player 2';

    joinNameContainer.style.display = "none";
    joinLobbyContainer.style.display = "block";
  });

  joinCodeButton.addEventListener("click", function () {
    code = joinCodeInput.value.trim().toUpperCase();

    if (code) {
      userId = Math.random().toString(36).substr(2, 9);
      Network.startConnection(userId, code, networkListener);

      isCreator = false; 

      setTimeout(() => {
        Network.send(JSON.stringify({ type: 'join', userId: userId, playerName: playerName }));
      }, 1000); 

    } else {
      alert("Please enter a valid code.");
    }
  });

  function networkListener(message) {
    console.log("Received message:", message);

    if (message.user === userId) {
      return;
    }
    if (message.user && message.user === 'system') {
      console.log("System message received:", message.data);
      return;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(message.data);
    } catch (error) {
      console.error("Failed to parse message data:", message.data);
      return;
    }

    if (parsedData.type === 'join') {
      opponentName = parsedData.playerName || 'Opponent';

      Network.send(JSON.stringify({ type: 'start', playerName: playerName }));

      onlineModal.style.display = "none";
      startOnlineGame();

    } else if (parsedData.type === 'start') {
      opponentName = parsedData.playerName || 'Opponent';
      onlineModal.style.display = "none";
      startOnlineGame();

    } else if (parsedData.type === 'move') {
      const col = parsedData.col;
      handleRemoteMove(col);
    } else if (parsedData.type === 'reset') {
      swapRoles = parsedData.swap;

      resetOnlineGame(swapRoles); 
    } else if (parsedData.type === 'quit') {
      // Opponent has quit the game
      let playerNameQuit = parsedData.playerName || 'Opponent';
      alert(`${playerNameQuit} left the game.`);
      gameActive = false;
      isOnlineGame = false;

      Network.closeConnection();

      // Reset UI
      playGameButton.style.display = "block";
      playOnlineButton.style.display = "block";
      replayButton.style.display = "none";
      quitButton.style.display = "none";
      statusDisplay.style.display = "none";

      document.querySelector('.scoreboard').style.display = 'none';

      board = new Board();
      renderBoard();
    }
  }

  function startOnlineGame() {
    gameActive = true;
    isOnlineGame = true;

    swapRoles = false;

    board = new Board();
    renderBoard();

    if (isCreator) {
      player1 = new Person(playerName);
      player1.type = 'human';
      player1.color = 'red';

      player2 = new Person(opponentName);
      player2.type = 'remote';
      player2.color = 'yellow';

      currentPlayer = player1; 

    } else {
      player1 = new Person(opponentName);
      player1.type = 'remote';
      player1.color = 'red';

      player2 = new Person(playerName);
      player2.type = 'human';
      player2.color = 'yellow';

      currentPlayer = player1; 
    }

    player1NameDisplay.textContent = player1.name;
    player2NameDisplay.textContent = player2.name;

    statusDisplay.style.display = "block";
    statusDisplay.textContent = `${currentPlayer.name}'s turn`;

    document.querySelector('.scoreboard').style.display = 'flex';

    playOnlineButton.style.display = "none";
    playGameButton.style.display = "none";
    quitButton.style.display = "block";

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

    let remotePlayer = player1.type === 'remote' ? player1 : player2;

    const placedCell = board.placePiece(col, remotePlayer.color);

    const { row, col: placedCol } = placedCell;

    const cellElement = document.querySelector(`.cell[data-row='${row}'][data-col='${placedCol}']`);
    cellElement.classList.remove("hover-player1", "hover-player2");
    cellElement.classList.add(remotePlayer === player1 ? "player1" : "player2");

    const winningDiscs = Rules.checkWin(board, remotePlayer.color, row, placedCol);

    if (winningDiscs) {
      statusDisplay.textContent = `${remotePlayer.name} wins!`;

      winningDiscs.forEach(disc => {
        const winningCellElement = document.querySelector(`.cell[data-row='${disc.row}'][data-col='${disc.col}']`);
        winningCellElement.classList.add("blink");
      });

      gameActive = false;  
      return;
    }

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
