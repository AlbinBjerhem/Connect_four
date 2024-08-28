import Person from './classes/Person.js';
import Move from './classes/Move.js';
import promptSync from 'prompt-sync';

const prompt = promptSync();

// Ask for player names
const player1Name = prompt("Enter name for Player 1: ");
const player2Name = prompt("Enter name for Player 2: ");

// Create player instances with the provided names and symbols
const player1 = new Person(player1Name, 'X');
const player2 = new Person(player2Name, 'O');

// Initialize the game
const move = new Move();
let currentPlayer = player1;
let gameContinues = true;

// Start the game loop
while (gameContinues) {
  //  console.clear();
  console.log("Current Board:");
  move.board.showBoard();

  let moveResult;

  // Loop to handle invalid input, full column, and out-of-bounds cases
  do {
    // Get player input
    const columnInput = prompt(`${currentPlayer.name}'s turn. Choose a column (1-${move.board.columns}) or type 'exit' to quit: `);

    // Check if the user wants to exit
    if (columnInput === null || columnInput.toLowerCase() === 'exit') {
      console.log("Game terminated by the user.");
      gameContinues = false;
      break;
    }

    // Convert input to a number and check if it's valid
    const column = parseInt(columnInput) - 1;

    if (isNaN(column) || column < 0 || column >= move.board.columns) {
      console.log('Invalid input. Column is out of bounds, choose another column.');
      moveResult = 'Invalid input'; // Set result to keep the loop going
    } else {
      // Make a move using the player's symbol
      moveResult = move.makeMove(column, currentPlayer.symbol, currentPlayer.name);

      if (moveResult === 'Column is full, choose another column') {
        console.log(moveResult);  // Inform the player that the column is full
      }
    }

  } while (moveResult === 'Column is full, choose another column' || moveResult === 'Invalid input');

  if (!gameContinues) break;

  console.log(moveResult);

  // Check if the game is over
  if (moveResult.includes('wins!') || moveResult.includes('Game over')) {
    gameContinues = false;
    move.board.showBoard(); // Show the final board state
  } else {
    // Switch to the other player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
}