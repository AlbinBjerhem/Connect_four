export default class Rules {
  constructor() {
  }

  checkWin(row, col, color) {
    return this.checkDirection(row, col, color, 1, 0) || // Horizontal
      this.checkDirection(row, col, color, 0, 1) || // Vertical
      this.checkDirection(row, col, color, 1, 1) || // Diagonal right down
      this.checkDirection(row, col, color, 1, -1);  // Diagonal right up
  }

  checkDirection(row, col, color, rowDir, colDir) {
    let count = 0;
    for (let r = row - 3 * rowDir, c = col - 3 * colDir; r <= row + 3 * rowDir && c <= col + 3 * colDir; r += rowDir, c += colDir) {
      if (r >= 0 && r < this.board.rows && c >= 0 && c < this.board.columns && this.board.grid[r]?.[c] === color) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
  }
}
