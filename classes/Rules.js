export default class Rules {
  constructor(board) {
    this.board = board;
  }

  checkForHorizontalWin(player) {
    for (let row = 1; row <= this.board.rows; row++) {
      let count = 0;
      for (let col = 0; col < this.board.columns; col++) {
        if (this.board.grid[row][col] === player) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  checkForVerticalWin(player) {
    for (let col = 0; col < this.board.columns; col++) {
      let count = 0;
      for (let row = 1; row <= this.board.rows; row++) {
        if (this.board.grid[row][col] === player) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  checkForDiagonalWin(player) {
    // Check diagonally from top left to bottom right
    for (let row = 1; row <= this.board.rows - 3; row++) {
      for (let col = 0; col < this.board.columns - 3; col++) {
        if (
          this.board.grid[row][col] === player &&
          this.board.grid[row + 1][col + 1] === player &&
          this.board.grid[row + 2][col + 2] === player &&
          this.board.grid[row + 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonally from bottom left to top right
    for (let row = this.board.rows; row >= 4; row--) {
      for (let col = 0; col < this.board.columns - 3; col++) {
        if (
          this.board.grid[row][col] === player &&
          this.board.grid[row - 1][col + 1] === player &&
          this.board.grid[row - 2][col + 2] === player &&
          this.board.grid[row - 3][col + 3] === player
        ) {
          return true;
        }
      }
    }
    return false;
  }

  checkForWin(symbol) {
    const Won = this.checkForHorizontalWin(symbol) || this.checkForVerticalWin(symbol) || this.checkForDiagonalWin(symbol);

    if (Won) {
      return true;
    } else {
      return false;
    }
  }
}
