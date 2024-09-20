export class Cell {
  constructor(rowIndex, columnIndex, color = null) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.color = color || null;
  }

  setColor(color) {
    this.color = color;  // Set the color when a piece is placed
  }

}