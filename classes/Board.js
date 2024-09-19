import { Cell } from './Cell.js'
import { WinChecker } from './WinChecker.js';

export class Board {
  constructor() {
    this.rows = 6;  // Number of rows
    this.cols = 7;  // Number of columns

    // Initialize grid with Cell objects
    this.grid = Array.from({ length: this.rows }, (_, rowIndex) =>
      Array.from({ length: this.cols }, (_, colIndex) =>
        new Cell(rowIndex, colIndex)
      )
    );

    this.winChecker = new WinChecker(this);
  }

  // Check if a column is full
  isColumnFull(col) {
    console.log('Checking column:', col);
    console.log('Grid state:', this.grid);
    if (col < 0 || col >= this.cols) {
      throw new Error(`Column index ${col} is out of bounds.`);
    }
    const cell = this.grid[0][col];
    console.log('Top cell in column:', cell);
    return cell.color !== null;  // Check if the top cell in the column is filled
  }


  // Place a piece in the given column
  placePiece(col, playerColor) {
    // Check if the column index is within bounds
    if (col < 0 || col >= this.cols) {
      throw new Error(`Column index ${col} is out of bounds.`);
    }

    // Start from the bottom of the column
    for (let row = this.rows - 1; row >= 0; row--) {
      // Check if the row index is within bounds and if the cell exists
      if (this.grid[row] && this.grid[row][col] && this.grid[row][col].color === null) {
        this.grid[row][col].setColor(playerColor);  // Set the color to the player's color
        return { row, col };  // Return the position where the piece was placed
      }
    }

    return null;  // Return null if the column is full
  }


  // Check if the board is full (for a draw)
  isFull() {
    return this.grid[0].every(cell => cell.color !== null);  // Check if the top row is filled
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
}