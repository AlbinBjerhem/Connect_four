export class Ai {
  constructor(type, board) {
    this.name = "AI";
    this.type = type; // 'dumb' or 'smart'
    this.board = board;
    this.color = 'yellow'; // AI's color
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
    await sleep(500);
    let column;

    if (this.type === 'dumb') {
      column = this.makeDumbBotMove();
    }

    if (this.type === 'smart') {
      column = this.makeSmartBotMove();
    }

    if (column !== null) {
      return column;
    } else {
      return null; // No move found
    }
  }

  // Random move for 'dumb' AI
  makeDumbBotMove() {
    const moves = shuffleArray(this.legalMoves);
    return moves[0]; // Random move
  }

  // Strategic move for 'smart' AI with minimax and alpha-beta pruning
  makeSmartBotMove() {
    let bestMove = null;
    let bestScore = -Infinity;
    const legalMoves = this.legalMoves;

    // Dynamic depth: deeper search when fewer moves are left
    const depth = Math.min(7, this.board.cols * this.board.rows - this.getOccupiedCells());

    for (let [row, column] of legalMoves) {
      const boardCopy = this.board.clone();
      boardCopy.placePiece(column, this.color); // Simulate move
      let score = this.minimax(boardCopy, depth - 1, false, -Infinity, Infinity);
      if (score > bestScore) {
        bestScore = score;
        bestMove = column;
      }
    }
    console.log("legalmoves: ", JSON.stringify(legalMoves, null, 2));
    console.log(`Best move is column ${bestMove} with score ${bestScore}`);

    return bestMove;
  }

  // Minimax with alpha-beta pruning, using Ai's legalMoves instead of board.getLegalMoves()
  minimax(board, depth, isMaximizingPlayer, alpha, beta) {
    if (depth === 0 || board.isGameOver()) {
      return this.evaluateBoard(board);
    }

    const legalMoves = this.legalMoves; // Use Ai's legalMoves

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let [row, column] of legalMoves) {
        board.placePiece(column, this.color); // Simulate AI move
        let eVal = this.minimax(board, depth - 1, false, alpha, beta);
        board.undoMove(row, column); // Undo the move
        maxEval = Math.max(eVal, maxEval);
        alpha = Math.max(alpha, eVal);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let [row, column] of legalMoves) {
        board.placePiece(column, this.opponent); // Simulate opponent move
        let eVal = this.minimax(board, depth - 1, true, alpha, beta);
        board.undoMove(row, column); // Undo the move
        minEval = Math.min(eVal, minEval);
        beta = Math.min(beta, eVal);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return minEval;
    }
  }

  // Evaluate the board for AI's advantage
  evaluateBoard(board) {
    let score = 0;

    const centerCol = Math.floor(board.cols / 2);
    const centerBonus = 3; // Encourage center play
    const winCombos = board.winChecker.winCombos;

    for (let combo of winCombos) {
      const aiPieces = combo.numberOfCells(this.color);
      const opponentPieces = combo.numberOfCells(this.opponent);
      let emptyCells = combo.cells.filter(cell => cell.color === ' ' || cell.color === null).length > 0;

      for (let cell of combo.cells) {
        if (cell.column === centerCol) {
          score += centerBonus;
        }
      }

      // Award AI chains
      if (aiPieces === 4) score += 100; // Win
      if (aiPieces === 3 && opponentPieces === 0) score += 10;
      if (aiPieces === 2 && opponentPieces === 0) score += 5;

      // Penalize opponent's advantage
      if (opponentPieces === 3 && aiPieces === 0) score -= 50; // Opponent close to win
      if (opponentPieces === 2 && emptyCells) score -= 10;
    }

    return score;
  }

  // Get all legal moves available on the board
  get legalMoves() {
    const moves = [];
    for (let col = 0; col < this.board.cols; col++) {
      for (let row = this.board.rows - 1; row >= 0; row--) {
        if (this.board.grid[row][col].color === ' ' || this.board.grid[row][col].color === null) {
          moves.push([row, col]);
          break;
        }
      }
    }
    return moves;
  }

  // New method to count occupied cells
  getOccupiedCells() {
    let occupiedCount = 0;
    for (let row = 0; row < this.board.rows; row++) {
      for (let col = 0; col < this.board.cols; col++) {
        if (this.board.grid[row][col].color !== ' ' && this.board.grid[row][col].color !== null) {
          occupiedCount++;
        }
      }
    }
    return occupiedCount;
  }

  // Undo move after simulating it
  undoMove(row, column) {
    this.board.grid[row][column].color = ' '; // Clear the move
  }
}

// Helper function to delay AI's move
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Shuffle an array (used for dumb AI)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
