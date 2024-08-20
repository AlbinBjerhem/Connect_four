import { expect, test } from 'vitest'
import Board from '../classes/Board.js'

const board = new Board()

//As a user, I can select a column between 1 and 7 to place my piece.

test('select over the maximum column'), () => {
  board.createBoard()
  expect(() => {
    board.dropPiece(8, 'X')
  }).toThrowError('Column out of bounds.');
}

test('select less the the minimum column'), () => {
  board.createBoard()
  expect(() => {
    board.dropPiece(-1, 'X')
  }).toThrowError('Column out of bounds.');
}

test('select a column thet does not exist'), () => {
  board.createBoard()
  expect(() => {
    board.dropPiece('a', 'X')
  }).toThrowError('Column out of bounds.');
}

//When placing the piece, it will always drop to the lowest empty position in the column.

test('drop the piece'), () => {
  board.createBoard()
  board.dropPiece(5, 'X')
  board.dropPiece(5, 'O')
  expect(board.grid[6][5]).toBe('X')
  expect(board.grid[5][5]).toBe('O')
}

//When marking, the correct player will be registered on the game board.

test('check for the right symbole'), () => {
  board.createBoard()
  board.dropPiece(1, 'O')
  expect(board.grid[6][1]).toBe('O')
}