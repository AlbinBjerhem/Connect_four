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
      winning: 1000, // or some large value
      offensive: 100,
      blocking: 100,
      defensive: 50
    };
  }

  // Simulates AI's move with a delay to mimic thinking time
  async makeBotMove() {
    await this.helper.sleep(500);
    let column;

    if (this.type === 'smart') {
      column = this.makeSmartBotMove();
    }

    if (column !== null) {
      return column;
    } else {
      return null; // No move found
    }
  }

  // Strategic move for 'smart' AI with minimax and alpha-beta pruning
  makeSmartBotMove() {
    let bestMove = null;
    let bestScore = -Infinity;
    const legalMoves = this.legalMoves(this.board);

    // Dynamic depth: deeper search when fewer moves are left
    const remainingCells = this.board.cols * this.board.rows - this.getOccupiedCells();
    const depth = Math.min(10, remainingCells > 10 ? 7 : 10); // Dynamically adjust
    console.log("Initial depth:", depth); // Add this to confirm the initial depth

    for (let [row, column] of legalMoves) {
      const boardCopy = this.board.clone();
      boardCopy.placePiece(column, this.color); // Simulate move
      let score = this.minimax(boardCopy, depth - 1, false, -Infinity, Infinity); // Pass depth - 1 here
      console.log(`row: ${row}, column: ${column}, score: ${score}`);

      const opponentBlockScore = this.evaluateImmediateOpponentThreat(column);
      score += opponentBlockScore;

      if (score > bestScore) {
        bestScore = score;
        bestMove = column;
      }
    }

    console.log(`Best move is column ${bestMove} with score ${bestScore}`);
    return bestMove;
  }



  // Minimax with alpha-beta pruning, using Ai's legalMoves instead of board.getLegalMoves()
  minimax(fakeBoard, depth, isMaximizingPlayer, alpha, beta) {
    if (depth === 0 || fakeBoard.isGameOver()) {
      const evaluation = this.evaluateBoard(fakeBoard);
      return evaluation;
    }

    const legalMoves = this.legalMoves(fakeBoard);

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let [row, column] of legalMoves) {
        fakeBoard.placePiece(column, this.color); // Simulate AI move
        let eVal = this.minimax(fakeBoard, depth - 1, false, alpha, beta);
        this.undoMove(row, column, fakeBoard); // Undo the move
        maxEval = Math.max(eVal, maxEval);
        alpha = Math.max(alpha, eVal);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let [row, column] of legalMoves) {
        fakeBoard.placePiece(column, this.opponent); // Simulate opponent move
        let eVal = this.minimax(fakeBoard, depth - 1, true, alpha, beta);
        this.undoMove(row, column, fakeBoard); // Undo the move
        minEval = Math.min(eVal, minEval);
        beta = Math.min(beta, eVal);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return minEval;
    }
  }

  evaluateBoard(fakeBoard) {
    let score = 0;
    const centerCol = Math.floor(fakeBoard.cols / 2);
    const centerBonus = 3;
    const winCombos = fakeBoard.winChecker.winCombos;

    for (let combo of winCombos) {
      const aiPieces = combo.numberOfCells(this.color);
      const opponentPieces = combo.numberOfCells(this.opponent);
      const emptyCells = combo.cells.filter(cell => cell.color === ' ' || cell.color === null).length > 0;

      if (aiPieces === 4) return this.priorities.winning; // AI wins
      if (opponentPieces === 4) return -this.priorities.winning; // Opponent wins

      let centerBonusApplied = false;
      for (let cell of combo.cells) {
        if (cell.column === centerCol && !centerBonusApplied) {
          score += centerBonus;
          centerBonusApplied = true;
        }
      }

      if (aiPieces === 3 && opponentPieces === 0) score += this.priorities.offensive * 2;
      if (aiPieces === 2 && opponentPieces === 0) score += this.priorities.offensive;
      if (opponentPieces === 3 && aiPieces === 0) score -= this.priorities.blocking * 2;
      if (opponentPieces === 2 && emptyCells && aiPieces === 0) score -= this.priorities.defensive;
    }
    return score;
  }


  // Check if the opponent is about to win and adjust the score accordingly
  evaluateImmediateOpponentThreat(column) {
    const tempBoard = this.board.clone();
    const [row, col] = this.helper.getNextAvailableRow(tempBoard, column); // Get the row where the piece will land
    // Simulate placing the opponent's piece
    if (row !== null) {
      tempBoard.placePiece(column, this.opponent);

      // Now, check if this move leads to a win for the opponent
      if (tempBoard.winChecker.isWinningMove(row, column, this.opponent)) {
        return this.priorities.blocking; // Threat detected, block the move
      }
    }

    return 0; // No immediate threat found
  }

  // Get all legal moves available on the board
  legalMoves(board) {
    const moves = [];
    for (let col = 0; col < board.cols; col++) {
      for (let row = board.rows - 1; row >= 0; row--) {
        if (board.grid[row][col].color === ' ' || board.grid[row][col].color === null) {
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
  undoMove(row, column, fakeBoard) {
    fakeBoard.grid[row][column].color = null; // Set the color back to null to properly "undo" the move
  }

}