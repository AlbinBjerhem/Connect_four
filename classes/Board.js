import { Cell } from './Cell.js'
import { WinChecker } from './WinChecker.js';

export class Board {
  constructor() {
    this.rows = 6;  // Number of rows
    this.cols = 7;  // Number of columns

    this.grid = Array.from({ length: this.rows }, (_, rowIndex) =>
      Array.from({ length: this.cols }, (_, colIndex) =>
        new Cell(rowIndex, colIndex)
      )
    );

    this.winChecker = new WinChecker(this);
  }

  // Check if a column is full
  isColumnFull(col) {
    if (col < 0 || col >= this.cols) {
      throw new Error(`Column index ${col} is out of bounds.`);
    }
    const cell = this.grid[0][col];
    return cell.color !== null;  // Check if the top cell in the column is filled
  }


  // Place a piece in the given column
  placePiece(col, playerColor) {
    for (let row = this.rows - 1; row >= 0; row--) {
      // Check if the row index is within bounds and if the cell exists
      if (this.grid[row][col] && (this.grid[row][col].color === ' ' || this.grid[row][col].color === null)) {
        this.grid[row][col].setColor(playerColor);  // Set the color to the player's color
        return { row, col };  // Return the position where the piece was placed
      }
    }
  }

  // Reset the board
  reset() {
    this.grid = [...new Array(this.rows)].map((row, rowIndex) =>
      [...new Array(this.cols)].map((column, columnIndex) =>
        new Cell(rowIndex, columnIndex))
    );
  }

  winCheck() {
    return this.winChecker.winCheck();
  }

  // Check if the board is full (for a draw)
  isFull() {
    return this.grid.every(row => row.every(cell => cell.color !== ' ' && cell.color !== null));  // Check if every cell is filled
  }

  isGameOver() {
    // Check if there is a winner
    if (this.winChecker.winCheck()) {
      return true;
    }

    // Check if the board is full (draw condition)
    if (this.isFull()) {
      return true; // The game is over if the board is full
    }

    return false; // Game is not over if there is no winner and the board is not full
  }


  // Clone method
  clone() {
    const newBoard = new Board(); // Create a new Board with same dimensions

    // Deep clone the grid with new Cell instances
    newBoard.grid = this.grid.map(row => {
      return row.map(cell => cell.clone()); // Use the Cell's clone method to clone each cell
    });

    // Clone other board properties
    newBoard.winChecker = new WinChecker(newBoard); // Reinitialize WinChecker with the cloned board

    // You can copy any additional properties here, if necessary

    return newBoard;
  }


}