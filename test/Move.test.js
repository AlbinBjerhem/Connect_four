import { test, expect } from 'vitest';
import Board from '../classes/Board.js';
import Move from '../classes/Move.js';

const board = new Board();
board.createBoard();

test('should not allow a disc to be placed in a full column', () => {

  for (let i = 0; i < board.rows; i++) {
    board.dropPiece(0, 'X');
  }

  const result = board.dropPiece(0, 'O');

  expect(result).toBe(-1);
});

test('should prompt the player to make another move if the column is full', () => {
  const move = new Move();
  move.board.createBoard();

  const player = { name: 'Player 1', symbol: 'X' };

  for (let i = 0; i < move.board.rows; i++) {
    move.board.dropPiece(0, player.symbol);
  }

  const result = move.makeMove(0, player.symbol);
  expect(result).toBe('Column is full, choose another column');
});