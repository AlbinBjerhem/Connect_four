import Person from './classes/Person.js'
import Board from './classes/Board.js';
import * as promptSync from 'prompt-sync';
const prompt = promptSync();
let gameEnd = false;

startGame()

function startGame() {
  const playerOne = new Person(prompt('name of player 1: '), 'X')
  const playerTwo = new Person(prompt('name of player 2: '), 'O')
  const board = new Board()

  while (gameEnd) {
    board.showBoard()

  }


}