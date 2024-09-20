export class Cell {
  constructor(rowIndex, columnIndex, color = null) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.color = color || null;
  }
}