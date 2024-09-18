export class Rules {
  static checkWin(board, player, row, col) {
    const directions = [
      { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: -1 }
    ];

    for (let { r: dr, c: dc } of directions) {
      let count = 1;
      let winningDiscs = [{ row, col }];

      for (let i = 1; i < 4; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r >= 0 && r < board.rows && c >= 0 && c < board.cols && board.grid[r][c] === player) {
          count++;
          winningDiscs.push({ row: r, col: c });
        } else {
          break;
        }
      }

      for (let i = 1; i < 4; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (r >= 0 && r < board.rows && c >= 0 && c < board.cols && board.grid[r][c] === player) {
          count++;
          winningDiscs.push({ row: r, col: c });
        } else {
          break;
        }
      }

      if (count >= 4) {
        return winningDiscs;
      }
    }
    return null;
  }

  static checkDraw(board) {
    return board.isFull();
  }

}
