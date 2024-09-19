export class Rules {
  static checkWin(board, playerColor, row, col) {
    const directions = [
      { r: 0, c: 1 },  // horizontal
      { r: 1, c: 0 },  // vertical
      { r: 1, c: 1 },  // diagonal \
      { r: 1, c: -1 }  // diagonal /
    ];

    for (let { r: dr, c: dc } of directions) {
      let count = 1;
      let winningDiscs = [{ row, col }];

      // Check in the positive direction
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (
          r >= 0 && r < board.rows &&
          c >= 0 && c < board.cols &&
          board.grid[r][c].color === playerColor
        ) {
          count++;
          winningDiscs.push({ row: r, col: c });
        } else {
          break;
        }
      }

      // Check in the negative direction
      for (let i = 1; i < 4; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (
          r >= 0 && r < board.rows &&
          c >= 0 && c < board.cols &&
          board.grid[r][c].color === playerColor
        ) {
          count++;
          winningDiscs.push({ row: r, col: c });
        } else {
          break;
        }
      }

      // If we found at least 4 matching pieces, return the winning discs
      if (count >= 4) {
        return winningDiscs;
      }
    }
    return null;  // No win found
  }

  static checkDraw(board) {
    return board.isFull();
  }
}
