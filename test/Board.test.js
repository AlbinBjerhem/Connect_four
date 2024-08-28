import { expect, test } from 'vitest'
import Board from '../classes/Board.js'

const board = new Board()

//As a user, I can select a column between 1 and 7 to place my piece.

test('select over the maximum column', () => {
  board.createBoard()
  expect(() => {
    board.dropPiece(8, 'X')
  }).toThrowError('Column out of bounds.');
});

test('select less the the minimum column', () => {
  board.createBoard()
  expect(() => {
    board.dropPiece(-1, 'X')
  }).toThrowError('Column out of bounds.');
});

test('select a column thet does not exist', () => {
  board.createBoard()
  expect(() => {
    board.dropPiece('a', 'X')
  }).toThrowError('Column out of bounds.');
});

//When placing the piece, it will always drop to the lowest empty position in the column.

test('drop the piece', () => {
  board.createBoard()
  board.dropPiece(5, 'X')
  board.dropPiece(5, 'O')
  expect(board.grid[6][5]).toBe('X')
  expect(board.grid[5][5]).toBe('O')
});

//When marking, the correct player will be registered on the game board.

test('check for the right symbole', () => {
  board.createBoard()
  board.dropPiece(1, 'O')
  expect(board.grid[6][1]).toBe('O')
});

// Tests for isBoardFull()

test('should return true if the board is full', () => {
  board.createBoard();
  // Fill the board
  for (let col = 0; col < board.columns; col++) {
    for (let row = 1; row <= board.rows; row++) {
      board.grid[row][col] = 'X';
    }
  }
  expect(board.isBoardFull()).toBe(true);
});

test('should return false if the board is not full', () => {
  board.createBoard();
  board.dropPiece(0, 'X'); // Only add one piece
  expect(board.isBoardFull()).toBe(false);
});

// Tests for isDraw()

test('should return true if the game is a draw', () => {
  board.createBoard();
  // Fill the board without any player winning
  for (let col = 0; col < board.columns; col++) {
    for (let row = 1; row <= board.rows; row++) {
      board.grid[row][col] = (row + col) % 2 === 0 ? 'X' : 'O';
    }
  }
  expect(board.isDraw()).toBe(true);
});

test('should return false if the game is not a draw', () => {
  board.createBoard();
  // Create a winning situation
  for (let i = 0; i < 4; i++) {
    board.dropPiece(0, 'X');
  }
  expect(board.isDraw()).toBe(false);
});