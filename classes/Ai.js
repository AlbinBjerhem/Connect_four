import { Helper } from './helper.js'
export class Ai {
  constructor(type, board) {
    this.helper = new Helper()
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
    await this.helper.sleep(500);
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
    const moves = this.helper.shuffleArray(this.legalMoves);
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
      console.log(`column: ${column} score: ${score}`);

      // Prioritize blocking the opponent if needed
      const opponentBlockScore = this.evaluateImmediateOpponentThreat(column);
      score += opponentBlockScore; // Add blocking score if opponent is threatening
      console.log("after block score: ", score)
      if (score > bestScore) {
        bestScore = score;
        bestMove = column;
      }
    }
    console.table(legalMoves);
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
        this.undoMove(row, column); // Undo the move
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
        this.undoMove(row, column); // Undo the move
        minEval = Math.min(eVal, minEval);
        beta = Math.min(beta, eVal);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return minEval;
    }
  }

  // Check if the opponent is about to win and adjust the score accordingly
  evaluateImmediateOpponentThreat(column) {
    const tempBoard = this.board.clone();
    tempBoard.placePiece(column, this.opponent);
    const opponentWinCombos = tempBoard.winChecker.winCombos;

    for (let combo of opponentWinCombos) {
      const opponentPieces = combo.numberOfCells(this.opponent);
      const aiPieces = combo.numberOfCells(this.color);

      // If the opponent has 3 in a row and AI has none, prioritize blocking
      if (opponentPieces === 3 && aiPieces === 0) {
        return this.priorities.blocking;
      }
    }
    return 0; // No immediate threat found
  }

  // Improved board evaluation function for both offensive and defensive strategies
  evaluateBoard(board) {
    let score = 0;

    const centerCol = Math.floor(board.cols / 2);
    const centerBonus = 3; // Encourage center play
    const winCombos = board.winChecker.winCombos;

    for (let combo of winCombos) {
      const aiPieces = combo.numberOfCells(this.color);
      const opponentPieces = combo.numberOfCells(this.opponent);
      const emptyCells = combo.cells.filter(cell => cell.color === ' ' || cell.color === null).length > 0;

      // Encourage center play
      for (let cell of combo.cells) {
        if (cell.column === centerCol) {
          score += centerBonus;
        }
      }

      // AI offensive strategies
      if (aiPieces === 4) score += this.priorities.winning; // AI wins
      if (aiPieces === 3 && opponentPieces === 0) score += this.priorities.offensive; // AI has a strong chance
      if (aiPieces === 2 && opponentPieces === 0) score += 5; // Two pieces in a row for AI

      // Defensive strategies - prioritize blocking threats
      if (opponentPieces === 3 && aiPieces === 0) {
        score -= this.priorities.blocking; // Block opponent's potential win
      }
      if (opponentPieces === 2 && emptyCells && aiPieces === 0) {
        score -= this.priorities.defensive; // Block opponent's two in a row
      }
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