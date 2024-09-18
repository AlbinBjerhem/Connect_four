export class Board {
  constructor() {
    this.rows = 6;  // Antal rader
    this.cols = 7;  // Antal kolumner
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));  // Tvådimensionell array för spelbrädet
  }

  // Kontrollera om en kolumn är full
  isColumnFull(col) {
    return this.grid[0][col] !== null;
  }

  // Placera en spelpjäs i angiven kolumn
  placePiece(col, player) {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][col] === null) {
        this.grid[row][col] = player;
        return { row, col };
      }
    }
    return null;
  }

  // Kontrollera om brädet är fullt (för oavgjort)
  isFull() {
    return this.grid[0].every(cell => cell !== null);
  }

  // Återställ brädet
  reset() {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
  }
}