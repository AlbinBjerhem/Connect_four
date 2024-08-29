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
    console.log('-'.repeat(this.columns * 4 - 2));
  }

  dropPiece(column, symbol) {
    // Validate column input
    if (typeof column !== 'number') {
      throw new Error('Column must be a number.');
    }
    if (column < 0 || column >= this.columns) {
      throw new Error('Column out of bounds.');
    }

    // Place the piece in the lowest empty row in the selected column
    for (let row = this.rows; row >= 1; row--) {
      if (this.grid[row][column] === ' ') {
        this.grid[row][column] = symbol;
        return row;
      }
    }
    // If the column is full, return -1
    return -1;
  }

  // Check if the board is full
  isBoardFull() {
    // Check if any cell is empty
    for (let row = 1; row <= this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        if (this.grid[row][col] === ' ') {
          return false; // There is an empty cell, the board is not full
        }
      }
    }
    return true; // All cells are filled
  }

  // Check if the game is a draw
  isDraw() {
    // The game is a draw if the board is full and there is no winner
    return this.isBoardFull() && !this.checkWinner();
  }

  // Dummy method for checkWinner()
  checkWinner() {
    // Logic to check for a winner 
    return null; // Return null or false if there is no winner
  }
}

