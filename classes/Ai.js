export class Ai {
  constructor(type, board) {
    this.name = "AI"; // Name of the AI player
    this.type = type; // AI level: 'dumb' (easy) or 'smart' (hard)
    this.board = board; // Reference to the game board
    this.color = 'yellow'; // Default color for AI's pieces
    this.opponent = 'red'; // Opponent's color

    // Define AI's priorities
    this.priorities = {
      offensive: 12,
      defensive: 10,
      winning: 100,
      blocking: 60
    };
  }

  // Simulates AI's move with a delay to mimic thinking time
  async makeBotMove() {
    await sleep(500); // Delay for 500ms
    let column;

    // If AI is 'dumb', make a random move
    if (this.type === 'dumb') {
      column = this.makeDumbBotMove();
      console.log(`dumb: ${column}`);
    }

    // If AI is 'smart', make a strategic move
    if (this.type === 'smart') {
      column = this.makeSmartBotMove();
      console.log(`smart: ${column}`);
    }

    if (column !== null) {
      console.log(`AI return ${column[1]}`);
      return column[1];
    } else {
      console.log("No move found");
      return null; // or some default value
    }
  }

  // Random move for 'dumb' AI
  makeDumbBotMove() {
    console.log("Legal moves:", this.legalMoves);
    const moves = shuffleArray(this.legalMoves);
    console.log("Shuffled moves:", moves);
    return moves[0]; // Return the first random move
  }

  // Strategic move for 'smart' AI with dynamic depth
  makeSmartBotMove() {
    let bestMove = null;
    let bestScore = -Infinity;
    const legalMoves = this.legalMoves;

    for (let [row, column] of legalMoves) {
      // Create a copy of the board
      const boardCopy = this.board.clone();

      // Simulate the move on the board copy
      boardCopy.placePiece(column, this.color);

      // Evaluate the board state
      let score = this.evaluateBoard(boardCopy);

      console.log(`Evaluating move ${column} with score ${score}`);

      // Update the best move if the score is better
      if (score > bestScore) {
        bestScore = score;
        bestMove = column;
      }
    }

    console.log(`Best move: ${bestMove} with score ${bestScore}`);
    return bestMove;
  }


  // Simulates AI's move with a delay to mimic thinking time
  async makeBotMove() {
    await sleep(500); // Delay for 500ms
    let column;

    // If AI is 'dumb', make a random move
    if (this.type === 'dumb') {
      column = this.makeDumbBotMove();
      console.log(`dumb: ${column}`);
    }

    // If AI is 'smart', make a strategic move
    if (this.type === 'smart') {
      column = this.makeSmartBotMove();
      console.log(`smart: ${column}`);
    }

    console.log(`AI return ${column}`); // This will throw an error if column is null
    return column;
  }

  // Minimax with alpha-beta pruning
  minimax(depth, isMaximizingPlayer, alpha, beta) {
    if (depth === 0 || this.board.isGameOver()) {
      return this.evaluateBoard() + this.getGameContextScore(this.state(), this.state(), this.board);
    }

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let [row, column] of this.legalMoves) {
        this.board.grid[row][column].color = this.color; // Simulate AI move
        let eVal = this.minimax(depth - 1, false, alpha, beta); // Recurse with opponent's turn
        this.board.grid[row][column].color = ' '; // Undo move
        maxEval = Math.max(eVal, maxEval);
        alpha = Math.max(alpha, eVal);  // Update alpha
        if (beta <= alpha) {
          break;  // Beta cut-off
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let [row, column] of this.legalMoves) {
        this.board.grid[row][column].color = this.opponent; // Simulate opponent move
        let eVal = this.minimax(depth - 1, true, alpha, beta); // Recurse with AI's turn
        this.board.grid[row][column].color = ' '; // Undo move
        minEval = Math.min(eVal, minEval);
        beta = Math.min(beta, eVal);  // Update beta
        if (beta <= alpha) {
          break;  // Alpha cut-off
        }
      }
      return minEval;
    }
  }

  // Evaluate board and return a score based on the current state
  /**
 * Evaluates the given board and returns a score based on the number of pieces in rows, columns, and diagonals.
 *
 * @param {array} board - A 2D array representing the board.
 * @returns {number} - The score based on the evaluation.
 */
  evaluateBoard(board) {
    let score = 0;

    // Check if the board is empty
    if (!board || board.length === 0) {
      return score; // or throw an error, depending on your requirements
    }

    // Evaluate rows
    for (let row = 0; row < board.length; row++) {
      let piecesInRow = 0;
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === this.color) {
          piecesInRow++;
        }
      }
      score += getScoreForPieces(piecesInRow);
    }

    // Evaluate columns
    for (let col = 0; col < (board[0] ? board[0].length : 0); col++) {
      let piecesInCol = 0;
      for (let row = 0; row < board.length; row++) {
        if (board[row][col] === this.color) {
          piecesInCol++;
        }
      }
      score += getScoreForPieces(piecesInCol);
    }

    // Evaluate diagonals
    let piecesInDiag1 = 0;
    let piecesInDiag2 = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][i] === this.color) piecesInDiag1++;
      if (board[i][board[0].length - i - 1] === this.color) piecesInDiag2++;
    }
    score += this.getScoreForPieces(piecesInDiag1);
    score += this.getScoreForPieces(piecesInDiag2);

    return score;
  }

  /**
   * Returns a score based on the number of pieces.
   *
   * @param {number} pieces - The number of pieces.
   * @returns {number} - The score.
   */
  getScoreForPieces(pieces) {
    if (pieces === 1) return 1;
    if (pieces === 2) return 10;
    if (pieces === 3) return 100;
    return 0;
  }

  // Get score for combination
  getScoreForCombination(currentState, futureStatePart, priorities, board) {
    let score = 0;

    // Encourage building longer chains
    if (futureStatePart.me > currentState.me) {
      score += priorities.offensive * (futureStatePart.me - currentState.me) * 3; // Offensive score boosted
    }

    // Discourage allowing the opponent to build chains
    if (futureStatePart.opp > currentState.opp) {
      score -= priorities.defensive * (futureStatePart.opp - currentState.opp) * 2; // Stronger penalty for allowing chains
    }

    // Prioritize center columns (stronger positions)
    const centerBias = Math.abs(board.cols / 2 - futureStatePart.column);
    score -= centerBias * 2;  // Favor central positions more

    // Winning/Blocking moves are prioritized heavily
    if (futureStatePart.me === 4) {
      score += priorities.winning;
    }
    if (futureStatePart.opp === 4) {
      score += priorities.blocking;
    }

    return score;
  }

  // Get game context score
  getGameContextScore(orgState, futureState, board) {
    let gameScore = 0;
    const totalMoves = board.rows * board.cols;
    const occupiedCells = board.grid.flat().filter(cell => cell.color !== ' ').length;
    const gameProgress = occupiedCells / totalMoves;

    // Prioritize more critical moves as the game nears the end
    if (gameProgress > 0.7) {
      for (let i = 0; i < orgState.length; i++) {
        if (futureState[i].me === 4) {
          gameScore += 1000; // Winning move
        }
        if (futureState[i].opp === 4) {
          gameScore += 800; // Blocking opponent's winning move
        }
      }
    }

    return gameScore;
  }

  // Simulate opponent move
  simulateOpponentMove(futureState, i, board, opponentColor) {
    // Create a copy of the futureState to simulate opponent's move
    let simulatedState = [...futureState];

    // Look at the combination of cells in the future state
    let combo = simulatedState[i]; // e.g., a possible win combination

    // Simulate opponent filling an empty cell in the combination
    // Look for the first empty spot in the win combo
    for (let cellIndex in combo) {
      let cell = combo[cellIndex];

      // Check if this cell is empty
      if (cell.color === null || cell.color === ' ') {
        // Simulate opponent move by setting the color to opponent's
        combo[cellIndex].color = opponentColor;
        break; // Stop once we've simulated the opponent's move
      }
    }

    return simulatedState;
  }

  // Get all legal moves available on the board
  get legalMoves() {
    const moves = [];

    for (let col = 0; col < this.board.cols; col++) {
      for (let row = this.board.rows - 1; row >= 0; row--) {  // Start from the bottom row
        if (this.board.grid[row][col].color === ' ' || this.board.grid[row][col].color === null) {  // If the cell is empty
          moves.push([row, col]);  // Add the empty cell's row and column
          break;  // Stop checking once the first empty cell is found in the column
        }
      }
    }
    console.log(`legalmoves: ${JSON.stringify(moves)}`);
    return moves;
  }

  // Get the current state of the board
  state() {
    let state = [];
    for (let winCombo of this.board.winChecker.winCombos) {
      state.push({
        me: winCombo.numberOfCells(this.color),
        opp: winCombo.numberOfCells(this.opponent)
      });
    }
    return state;
  }
}

// Helper function to delay AI's move
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to shuffle an array (used for dumb AI)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}