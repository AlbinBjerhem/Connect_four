import Board from './Board.js';
import Rules from './Rules.js';

export default class Move {
  constructor() {
    this.board = new Board();
    this.board.createBoard();
    this.rules = new Rules(this.board); 
    this.gameOver = false;
  }

  makeMove(column, symbol) {
    if (this.gameOver) {
      return 'Game over. No more moves allowed.';
    }

    const row = this.board.dropPiece(column, symbol);

    if (row === -1) {
      return 'Column is full, choose another column';
    }

    const winner = this.rules.checkForWin();

    if (winner) {
      this.gameOver = true;
      return `Player ${winner} wins!`;
    }

    if (this.board.isBoardFull()) {
      this.gameOver = true;
      return 'Game over. No more moves allowed.';
    }

    return `Move accepted. Player ${symbol}'s turn.`;
  }
}
