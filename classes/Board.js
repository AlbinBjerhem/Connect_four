export default class Board {
  constructor(rows = 6, columns = 7, cellSize = 100) {
    this.rows = rows;
    this.columns = columns;
    this.cellSize = cellSize;
    this.grid = Array.from({ length: rows }, () => Array(columns).fill(null));
    this.canvas = document.getElementById('board');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.columns * this.cellSize;
    this.canvas.height = this.rows * this.cellSize;
  }

  drawBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        this.drawCell(r, c, this.grid[r][c]);
      }
    }
  }

  drawCell(row, col, color) {
    this.ctx.fillStyle = color || 'white';
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(col * this.cellSize + this.cellSize / 2, row * this.cellSize + this.cellSize / 2, this.cellSize / 2 - 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  dropPiece(col, color) {
    for (let r = this.rows - 1; r >= 0; r--) {
      if (!this.grid[r][col]) {
        this.grid[r][col] = color;
        return r;
      }
    }
    return -1;
  }

  isFull() {
    return this.grid.every(row => row.every(cell => cell !== null));
  }
}