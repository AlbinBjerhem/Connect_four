import { Person } from './classes/Person.js';
import { Ai } from './classes/Ai.js';
import { External } from './classes/external.js'

export function valuetypes(type, board, playerInput, level = null) {
  let player = ''
  switch (type) {
    case 'human':
      player = human(playerInput);
      break;
    case 'dumb':
      player = ai('dumb', board);
      break;
    case 'smart':
      player = ai('smart', board);
      break;
    case 'external':
      player = external(level);
      break;
  }
  return player;
}

function human(playerInput) {
  let player = new Person(playerInput);
  return player;
}

export function ai(level, board) {
  let player = new Ai(level, board);
  return player;
}

export function external(level) {
  let player = new External(level);
  player.level = level;
  return player;
}

export function disableClicks() {
  const gameBoard = document.querySelector('#board');
  gameBoard.classList.add('no-click');
}

// Function to enable user interaction
export function enableClicks() {
  const gameBoard = document.querySelector('#board');
  gameBoard.classList.remove('no-click');
}