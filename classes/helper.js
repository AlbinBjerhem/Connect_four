
export class Helper {
  constructor() { }

  // Helper function to delay AI's move
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Shuffle an array (used for dumb AI)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getNextAvailableRow(board, column) {
    for (let row = board.rows - 1; row >= 0; row--) {
      if (board.grid[row][column].color === ' ' || board.grid[row][column].color === null) {
        return [row, column]; // Return the available row and column
      }
    }
    return null; // No available row in the column (the column is full)
  }
}
