import { WinCombo } from './WinCombo.js';

export class WinChecker {
  constructor(board) {
    this.board = board;
    this.matrix = board.grid;
    this.winCombos = [];
    this.calculateWinCombos();
  }

  // Calculate all the win combos for Connect 4
  calculateWinCombos() {
    let m = this.matrix;
    let directions = [
      // Horizontal right
      [[0, 0], [0, 1], [0, 2], [0, 3]],
      // Vertical down
      [[0, 0], [1, 0], [2, 0], [3, 0]],
      // Diagonal down-right
      [[0, 0], [1, 1], [2, 2], [3, 3]],
      // Diagonal down-left
      [[0, 0], [1, -1], [2, -2], [3, -3]]
    ];

    // Traverse the board and generate winCombos
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        for (let dir of directions) {
          let combo = [];

          for (let [dr, dc] of dir) {
            const row = r + dr;
            const col = c + dc;

            // Ensure indices are within bounds
            if (row >= 0 && row < m.length && col >= 0 && col < m[0].length) {
              combo.push(m[row][col]);
            }
          }

          // Only create WinCombo if we have exactly 4 cells
          if (combo.length === 4) {
            this.winCombos.push(new WinCombo(combo));
          }
        }
      }
    }
  }

  // Check for a winner
  winCheck() {
    for (let winCombo of this.winCombos) {
      if (winCombo.isWin('red')) { return 'red'; }
      if (winCombo.isWin('yellow')) { return 'yellow'; }
    }
    return null;
  }

  isWinningMove(row, column, color) {
    return (
      this.checkDirection(row, column, color, 0, 1) || // Horizontal
      this.checkDirection(row, column, color, 1, 0) || // Vertical
      this.checkDirection(row, column, color, 1, 1) || // Diagonal (\)
      this.checkDirection(row, column, color, 1, -1)   // Diagonal (/)
    );
  }

  checkDirection(row, column, color, rowDelta, colDelta) {
    let count = 1; // Count the piece at (row, column)

    // Check in the positive direction (right/up diagonally)
    count += this.countPiecesInDirection(row, column, color, rowDelta, colDelta);

    // Check in the negative direction (left/down diagonally)
    count += this.countPiecesInDirection(row, column, color, -rowDelta, -colDelta);

    return count >= 4; // Return true if we have 4 or more in a row
  }

  countPiecesInDirection(row, column, color, rowDelta, colDelta) {
    let count = 0;
    let currentRow = row + rowDelta;
    let currentCol = column + colDelta;

    // Continue while we are inside the board bounds
    while (currentRow >= 0 && currentRow < this.board.rows && currentCol >= 0 && currentCol < this.board.cols) {
      if (this.board.grid[currentRow][currentCol].color === color) {
        count++;
        currentRow += rowDelta; // Move further in the direction
        currentCol += colDelta;
      } else {
        break; // Stop if we encounter a different color or an empty cell
      }
    }

    return count;
  }
}

