import Board from "./classes/Board.js"
import Player from "./classes/Player.js"
import Rules from "./classes/Rules.js"


class Game {
  constructor() {
    this.board = new Board();
    this.rules = new Rules();
    this.player1 = null;
    this.player2 = null;
    this.currentPlayer = null;
    this.gameOver = false;

    document.getElementById('startGame').addEventListener('click', () => this.start());
    this.board.canvas.addEventListener('click', (e) => this.handleMove(e));
  }

  start() {
    const player1Name = document.getElementById('player1Name').value || 'Player 1';
    const player2Name = document.getElementById('player2Name').value || 'Player 2';
    this.player1 = new Player(player1Name, 'red');
    this.player2 = new Player(player2Name, 'blue');
    this.currentPlayer = this.player1;
    this.board.grid = Array.from({ length: this.board.rows }, () => Array(this.board.columns).fill(null));
    this.board.drawBoard();
    this.updateStatus(`${this.currentPlayer.name}'s turn`);
    this.gameOver = false;
  }

  handleMove(event) {
    if (this.gameOver) return;

    const x = event.offsetX;
    const col = Math.floor(x / this.board.cellSize);
    const row = this.board.dropPiece(col, this.currentPlayer.color);

    if (row !== -1) {
      this.board.drawBoard();
      if (this.rules.checkWin(row, col, this.currentPlayer.color)) {
        this.updateStatus(`${this.currentPlayer.name} wins!`);
        this.gameOver = true;
        return;
      }

      if (this.board.isFull()) {
        this.updateStatus('Game over! It\'s a draw.');
        this.gameOver = true;
        return;
      }

      this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
      this.updateStatus(`${this.currentPlayer.name}'s turn`);
    }
  }

  updateStatus(message) {
    document.getElementById('status').textContent = message;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Game();
});