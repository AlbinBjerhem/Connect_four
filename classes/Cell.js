export class Cell {
  constructor(rowIndex, columnIndex) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.color = null;
  }

  setColor(color) {
    this.color = color;  // Set the color when a piece is placed
  }
}