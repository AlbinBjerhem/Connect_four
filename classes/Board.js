export default class Board {
  constructor(rows = 6, columns = 7) {
    this.rows = rows;
    this.columns = columns;
  }

  createBoard() {
    // Create column number labels
    const columnNumbers = Array.from({ length: this.columns }, (_, i) => (i + 1).toString());

    // Create the grid with an extra row at the top for the column numbers
    this.grid = [columnNumbers, ...Array.from({ length: this.rows }, () => Array(this.columns).fill(' '))];
  }

  showBoard() {
    // Log each row of the grid to the console
    this.grid.forEach(row => console.log(row.join(' | ')));
  }

  dropPiece(column, symbol) {
    // Validate column
    if (column < 0 || column >= this.columns) {
      throw new Error('Column out of bounds.');
    }

    for (let row = this.rows; row >= 1; row--) {
      if (this.grid[row][column] === ' ') {
        this.grid[row][column] = symbol;
        return row;
      }
    }
    // If the column is full, return -1
    return -1;
  }
}