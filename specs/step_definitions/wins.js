import { When } from "@badeball/cypress-cucumber-preprocessor";
import { clickCell } from './commonSteps';


When('I simulate a game where player 1 wins horizontally', () => {
  clickCell('iframe#player1', 0, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 0, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 1, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 2, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 3, 5, "Player 1's turn", "Player 1 wins!");
});

When('I simulate a game where player 2 wins vertically', () => {
  clickCell('iframe#player1', 0, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 5, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 4, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 3, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 3, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 2, "Player 2's turn", "Player 2 wins!");
});

When('I simulate a game where player 1 wins diagonally from bottom left to top right', () => {
  clickCell('iframe#player1', 0, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 5, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 1, 4, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 2, 5, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 4, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 3, 5, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 3, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 3, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 0, 4, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 3, 3, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 3, 2, "Player 1's turn", "Player 1 wins!");
});


When('I simulate a game where player 2 wins diagonally from top left to bottom right', () => {
  clickCell('iframe#player1', 0, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 3, 5, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 2, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 1, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 0, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 1, 4, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 3, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 0, 3, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 0, 2, "Player 2's turn", "Player 2 wins!");
});
