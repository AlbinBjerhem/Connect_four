export class Rules {
  static checkWin(board, player, row, col) {
    const directions = [
      { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: -1 }
    ];

    for (let { r: dr, c: dc } of directions) {
      let count = 1;

      for (let i = 1; i < 4; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r >= 0 && r < board.rows && c >= 0 && c < board.cols && board.grid[r][c] === player) {
          count++;
        } else {
          break;
        }
      }

      for (let i = 1; i < 4; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (r >= 0 && r < board.rows && c >= 0 && c < board.cols && board.grid[r][c] === player) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 4) return true;
    }
    return false;
  }

  static checkDraw(board) {
    return board.isFull();
  }
}
