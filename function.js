import { Person } from './classes/Person.js';
import { Ai } from './classes/Ai.js';
import { External } from './classes/external.js'

const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");

export function valuetypes(type, i, board) {
  let player = ''
  switch (type) {
    case 'human':
      player = human(i);
      break;
    case 'dumb':
      player = ai('dumb', board);
      break;
    case 'smart':
      player = ai('smart', board);
      break;
    case 'external':
      player = external();
      break;
  }
  return player;
}

function human(i) {
  let player
  if (i === 1) {
    player = new Person(player1Input);
  } else if (i === 2) {
    player = new Person(player2Input);
  }
  return player;
}

function ai(level, board) {
  let player = new Ai(level, board);
  return player;
}

function external() {
  let player = new External();
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