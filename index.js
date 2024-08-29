import Person from './classes/Person.js';
import Move from './classes/Move.js';
import promptSync from 'prompt-sync';

const prompt = promptSync();

class Game {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.currentPlayer = null;
    this.playAgain = true;
  }

  // Method to start the game
  start() {
    this.setupPlayers();
    while (this.playAgain) {
      this.playGame();
      this.askToPlayAgain();
    }
    console.log("Thank you for playing!");
  }

  // Method to setup the players
  setupPlayers() {
    this.player1 = new Person(prompt("Enter name for Player 1 (X): "), 'X');
    this.player2 = new Person(prompt("Enter name for Player 2 (O): "), 'O');
    this.currentPlayer = this.player1;
  }

  // Method to handle the game logic
  playGame() {
    const move = new Move();
    let gameContinues = true;

    while (gameContinues) {
      console.clear();
      console.log("Current Board: ");
      move.board.showBoard();

      let moveResult;
      do {
        moveResult = this.makeOneMove(move);
        if (moveResult === 'exit') {
          gameContinues = false;
          this.playAgain = false;
          break;
        }
      } while (moveResult === 'Column is full, choose another column' || moveResult === 'Invalid input');

      if (!gameContinues) break;

      console.log(moveResult);

      if (moveResult.includes('wins!') || moveResult.includes('Game over')) {
        gameContinues = false;
        move.board.showBoard();
      } else {
        this.switchPlayer();
      }
    }
  }

  // Method to handle player move
  makeOneMove(move) {
    const columnInput = prompt(`${this.currentPlayer.name}'s turn. Choose a column (1-${move.board.columns}) or type 'exit' to quit: `);

    if (columnInput === null || columnInput === undefined || columnInput.toLowerCase() === 'exit') {
      console.log("Game terminated by the user.");
      return 'exit';
    }

    const column = parseInt(columnInput) - 1;
    if (isNaN(column) || column < 0 || column >= move.board.columns) {
      console.log('Invalid input. Column is out of bounds, choose another column.');
      return 'Invalid input';
    }

    const moveResult = move.makeMove(column, this.currentPlayer.symbol, this.currentPlayer.name);

    if (moveResult === 'Column is full, choose another column') {
      console.log(moveResult);
    }

    return moveResult;
  }

  // Method to switch the current player
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  // Method to ask if players want to play again
  askToPlayAgain() {
    let validInput = false;
    while (!validInput) {
      const playAgainInput = prompt("Do you want to play again? (yes/no): ");

      if (playAgainInput === null || playAgainInput === undefined || typeof playAgainInput !== 'string') {
        console.log("Invalid input. Please enter yes or no.");
      } else {
        switch (playAgainInput.toLowerCase()) {
          case 'yes':
            this.playAgain = true;
            validInput = true;
            break;
          case 'no':
            this.playAgain = false;
            validInput = true;
            break; // Add break here to prevent fall-through
          default:
            console.log("Invalid input. Please enter yes or no.");
            break;
        }
      }
    }
  }
}

// Start the game
const game = new Game();
game.start();