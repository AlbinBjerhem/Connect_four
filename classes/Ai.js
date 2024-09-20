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
    const depth = Math.min(7, this.board.cols * this.board.rows - this.getOccupiedCells());

    for (let [row, column] of legalMoves) {
      const boardCopy = this.board.clone();
      boardCopy.placePiece(column, this.color); // Simulate move
      let score = this.minimax(boardCopy, depth - 1, false, -Infinity, Infinity);
      //      console.log(`row: ${row} column: ${column} score: ${score}`);

      // Prioritize blocking the opponent if needed
      const opponentBlockScore = this.evaluateImmediateOpponentThreat(column);
      score += opponentBlockScore; // Add blocking score if opponent is threatening
      //      console.log("after block score: ", score)
      if (score > bestScore) {
        bestScore = score;
        bestMove = column;
      }
    }
    //    console.log(`Best move is column ${bestMove} with score ${bestScore}`);

    return bestMove;
  }

  // Minimax with alpha-beta pruning, using Ai's legalMoves instead of board.getLegalMoves()
  minimax(fakeBoard, depth, isMaximizingPlayer, alpha, beta) {
    if (depth === 0 || fakeBoard.isGameOver()) {
      return this.evaluateBoard(fakeBoard);
    }

    const legalMoves = this.legalMoves(fakeBoard); // Use Ai's legalMoves

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

  // Check if the opponent is about to win and adjust the score accordingly
  evaluateImmediateOpponentThreat(column) {
    const tempBoard = this.board.clone();
    const [row, col] = this.helper.getNextAvailableRow(tempBoard, column); // Get the row where the piece will land
    console.log(`EIO = row: ${row} col: ${col} column: ${column}`)
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



  // Improved board evaluation function for both offensive and defensive strategies
  evaluateBoard(fakeBoard) {
    let score = 0;
    const centerCol = Math.floor(fakeBoard.cols / 2);
    const centerBonus = 3; // Encourage center play
    const winCombos = fakeBoard.winChecker.winCombos;

    for (let combo of winCombos) {
      const aiPieces = combo.numberOfCells(this.color);
      const opponentPieces = combo.numberOfCells(this.opponent);
      const emptyCells = combo.cells.filter(cell => cell.color === ' ' || cell.color === null).length > 0;

      // Encourage center play
      for (let cell of combo.cells) {
        if (cell.column === centerCol) {
          score += centerBonus; // Boost for center column control
        }
      }

      // AI offensive strategies
      if (aiPieces === 4) score += this.priorities.winning; // AI wins
      if (aiPieces === 3 && opponentPieces === 0) score += this.priorities.offensive * 2; // Strong chance to win
      if (aiPieces === 2 && opponentPieces === 0) score += this.priorities.offensive; // Two in a row for AI

      // Defensive strategies - prioritize blocking threats
      if (opponentPieces === 3 && aiPieces === 0) {
        score -= this.priorities.blocking * 2; // Increase block priority
      }
      if (opponentPieces === 2 && emptyCells && aiPieces === 0) {
        score -= this.priorities.defensive; // Block opponent's two in a row
      }
    }

    return score;
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
    fakeBoard.grid[row][column].color = ' '; // Clear the move
  }


}