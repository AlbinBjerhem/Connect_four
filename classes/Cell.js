export class Cell {
  constructor(rowIndex, columnIndex) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.color = null;
  }

  toString() {
    return this.color;
  }

}