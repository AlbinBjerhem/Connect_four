import { test, expect } from 'vitest';
import Board from '../classes/Board.js'
import Rules from '../classes/Rules.js';

const playerX = 'X';
const playerO = 'O';

// Test for player X
test('check if player X has won horizontally', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Player X places four pieces horizontally
  board.dropPiece(0, playerX);
  board.dropPiece(1, playerX);
  board.dropPiece(2, playerX);
  board.dropPiece(3, playerX);

  const rules = new Rules(board);
  const result = rules.checkForHorizontalWin(playerX);

  expect(result).toBe(true);
});

test('check if player X has won vertically', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Player X places four pieces vertically
  board.dropPiece(0, playerX);
  board.dropPiece(0, playerX);
  board.dropPiece(0, playerX);
  board.dropPiece(0, playerX);

  const rules = new Rules(board);
  const result = rules.checkForVerticalWin(playerX);

  expect(result).toBe(true);
});

test('check if player X has won diagonally (top left to bottom right)', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Player X places pieces diagonally from top left to bottom right
  board.dropPiece(0, playerX);
  board.dropPiece(1, playerO);
  board.dropPiece(1, playerX);
  board.dropPiece(2, playerO);
  board.dropPiece(2, playerO);
  board.dropPiece(2, playerX);
  board.dropPiece(3, playerO);
  board.dropPiece(3, playerO);
  board.dropPiece(3, playerO);
  board.dropPiece(3, playerX);

  const rules = new Rules(board);
  const result = rules.checkForDiagonalWin(playerX);

  expect(result).toBe(true);
});

test('check if player X has won diagonally (bottom left to top right)', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Player X places pieces diagonally from bottom left to top right
  board.dropPiece(3, playerX);
  board.dropPiece(2, playerO);
  board.dropPiece(2, playerX);
  board.dropPiece(1, playerO);
  board.dropPiece(1, playerO);
  board.dropPiece(1, playerX);
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerX);

  const rules = new Rules(board);
  const result = rules.checkForDiagonalWin(playerX);

  expect(result).toBe(true);
});

// Test for Player O
test('check if player O has won horizontally', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Player O places four pieces horizontally
  board.dropPiece(0, playerO);
  board.dropPiece(1, playerO);
  board.dropPiece(2, playerO);
  board.dropPiece(3, playerO);

  const rules = new Rules(board);
  const result = rules.checkForHorizontalWin(playerO);

  expect(result).toBe(true);
});

test('check if player O has won vertically', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Player O places four pieces vertically
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerO);

  const rules = new Rules(board);
  const result = rules.checkForVerticalWin(playerO);

  expect(result).toBe(true);
});

test('check if player O has won diagonally (top left to bottom right)', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Player O places pieces diagonally from top left to bottom right
  board.dropPiece(0, playerO);
  board.dropPiece(1, playerX);
  board.dropPiece(1, playerO);
  board.dropPiece(2, playerX);
  board.dropPiece(2, playerX);
  board.dropPiece(2, playerO);
  board.dropPiece(3, playerX);
  board.dropPiece(3, playerX);
  board.dropPiece(3, playerX);
  board.dropPiece(3, playerO);

  const rules = new Rules(board);
  const result = rules.checkForDiagonalWin(playerO);

  expect(result).toBe(true);
});

test('check if player O has won diagonally (bottom left to top right)', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Player O places pieces diagonally from bottom left to top right
  board.dropPiece(3, playerO);
  board.dropPiece(2, playerX);
  board.dropPiece(2, playerO);
  board.dropPiece(1, playerX);
  board.dropPiece(1, playerX);
  board.dropPiece(1, playerO);
  board.dropPiece(0, playerX);
  board.dropPiece(0, playerX);
  board.dropPiece(0, playerX);
  board.dropPiece(0, playerO);

  const rules = new Rules(board);
  const result = rules.checkForDiagonalWin(playerO);

  expect(result).toBe(true);
});

test('check if the checkForWin method correctly identifies Player X as the winner', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Set up the board so Player X wins horizontally
  board.dropPiece(0, playerX);
  board.dropPiece(1, playerX);
  board.dropPiece(2, playerX);
  board.dropPiece(3, playerX);

  const rules = new Rules(board);
  const winner = rules.checkForWin();

  expect(winner).toBe('X');  // Player X should be the winner
});

test('check if the checkForWin method correctly identifies Player O as the winner', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Set up the board so Player O wins vertically
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerO);
  board.dropPiece(0, playerO);

  const rules = new Rules(board);
  const winner = rules.checkForWin();

  expect(winner).toBe('O');  // Player O should be the winner
});

test('check if the checkForWin method returns null when there is no winner', () => {
  const board = new Board(6, 7);
  board.createBoard();

  // Set up the board with no winner
  board.dropPiece(0, playerX);
  board.dropPiece(1, playerO);

  const rules = new Rules(board);
  const winner = rules.checkForWin();

  expect(winner).toBe(null);  // No player should be the winner
});