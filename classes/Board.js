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

  // Kontrollera om en spelare har vunnit
  checkWin(player, row, col) {
    return (
      this.checkDirection(player, row, col, 0, 1) ||  // Horisontellt
      this.checkDirection(player, row, col, 1, 0) ||  // Vertikalt
      this.checkDirection(player, row, col, 1, 1) ||  // Diagonalt nedåt höger
      this.checkDirection(player, row, col, 1, -1)    // Diagonalt nedåt vänster
    );
  }

  // Kontrollera en riktning för fyra i rad
  checkDirection(player, row, col, rowDir, colDir) {
    let count = 1;

    // Kontrollera framåt i riktningen
    count += this.countInDirection(player, row, col, rowDir, colDir);

    // Kontrollera bakåt i riktningen
    count += this.countInDirection(player, row, col, -rowDir, -colDir);

    // Om vi hittar fyra eller fler i rad har vi en vinst
    return count >= 4;
  }

  // Räkna hur många pjäser som finns i en given riktning
  countInDirection(player, row, col, rowDir, colDir) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;

    while (this.isValidCell(r, c) && this.grid[r][c] === player) {
      count++;
      r += rowDir;
      c += colDir;
    }

    return count;
  }

  // Kontrollera om cellen är inom brädets gränser
  isValidCell(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }
}