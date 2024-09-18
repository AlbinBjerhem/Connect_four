import { Cell } from './Cell.js'
import { WinChecker } from './WinChecker.js';

export class Board {
  constructor() {
    this.rows = 6;  // Number of rows
    this.cols = 7;  // Number of columns
    // Create a grid with instances of the Cell class
    this.grid = [...new Array(this.rows)].map((row, rowIndex) =>
      [...new Array(this.cols)].map((column, columnIndex) =>
        new Cell(rowIndex, columnIndex))
    );

    this.winChecker = new WinChecker(this);
  }

  // Check if a column is full
  isColumnFull(col) {
    return this.grid[0][col].color !== null;  // Check if the top cell in the column is filled
  }

  // Place a piece in the given column
  placePiece(col, playerColor) {
    for (let row = this.rows - 1; row >= 0; row--) {  // Start from the bottom of the column
      if (this.grid[row][col].color === null) {  // Find the first empty cell
        this.grid[row][col].color = playerColor;  // Set the color to the player's color
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