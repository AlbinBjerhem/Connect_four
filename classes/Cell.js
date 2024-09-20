export class Cell {
  constructor(rowIndex, columnIndex, color = null) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.color = color || null;
  }

  setColor(color) {
    this.color = color;  // Set the color when a piece is placed
  }

  clone() {
    // Create a new Cell instance with the same properties as the original
    return new Cell(this.rowIndex, this.columnIndex, this.color);
  }
}