export class Board {
  constructor(rows = 6, cols = 7) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  }

  isColumnFull(col) {
    return this.grid[0][col] !== null;
  }

  placePiece(col, player) {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][col] === null) {
        this.grid[row][col] = player;
        return { row, col };
      }
    }
    return null;
  }

  isFull() {
    return this.grid[0].every(cell => cell !== null);
  }

  reset() {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
  }
}
