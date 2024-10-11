# Connect Four Game Test Suite

This repository contains automated tests for the Connect Four game, focusing on both player and AI interactions. The tests are built to ensure that the game works smoothly when played by a human or by different AI levels. This README provides instructions on how to set up and run the tests, along with an overview of what each test does.

## Prerequisites

Before you can run the tests, make sure you have the following installed:

- Node.js (v14 or newer recommended)
- NPM (Node Package Manager)
- Vite

### Network Play Enhancements (New in this Sprint)

In this sprint, we implemented network play functionality. This allows two players to play against each other online using real-time communication. The network layer handles server-sent events (SSE) to manage real-time updates for each player. The system is designed to:

- Establish a connection between two players over a specified channel.
- Handle game events in real-time, ensuring both players see updates simultaneously.
- Send and receive game moves, allowing smooth gameplay between two online players.
  
Additionally, we have added a network play simulation where two iframes are used to represent the two players' perspectives. This setup allows us to test real-time gameplay interactions and ensure that both players' moves are correctly synchronized across the network.

## Running the Tests

To run the tests, you'll need to open two terminal windows:

1. **Start the Vite Development Server**

   In the first terminal, start the Vite development server with:

   ```node
   npm start
   ```

2. **Run the UI Tests**

   In the second terminal, execute the UI tests using:

   ```node
   npm run test-ui
   ```

The first terminal will serve the application, while the second will run the test suite against it.


### Testing Tools and Methodology

These tests are written using Cypress and leverage feature files for Behavior-Driven Development (BDD). Each scenario describes a specific flow in plain language, making it easy to understand the test purpose.

### Cypress Tests with BDD

We have incorporated Behavior-Driven Development (BDD) into our Cypress tests. These tests cover various gameplay scenarios, focusing on real-time networked interactions and ensuring that the game performs as expected in online multiplayer settings.

#### Player Wins Scenarios

These tests verify that the game correctly handles different win conditions during online play:

- **Player 1 Wins Horizontally**: A game where Player 1 wins by connecting four pieces horizontally.
  
- **Player 2 Wins Vertically**: A game where Player 2 wins by connecting four pieces vertically.

- **Player Wins Diagonally**: Scenarios where players win by connecting four pieces diagonally, either from bottom-left to top-right or from top-left to bottom-right.

#### Play Again Functionality

We have added tests to verify that the "Play Again" feature works correctly during online play:

- **Play Again After a Draw**: If the game ends in a draw, the "Play Again" button appears, and pressing it starts a new game.
  
- **Play Again With Switched Starting Player**: When a game ends, the starting player switches for the next round, ensuring fairness in subsequent games.

#### Name Registration in Network Play

These tests ensure that player names are correctly registered and displayed during online games:

- **Registering Player Names**: Verifies that when players enter their names, they are displayed correctly during the game.

- **Displaying Winner's Name**: After a game ends, the winning player's name is correctly displayed, and this data is saved.

#### Making a Move

Several tests focus on ensuring that the game correctly handles moves made by each player in real-time:

- **Players Take Turns**: Ensures players alternate turns, and the board reflects their moves during online play.

- **Preventing Moves in Occupied Cells**: Ensures players cannot make a move in a cell that is already occupied by another piece.

#### Simulating a Draw

These tests verify that the game correctly handles a scenario where both players fill the board without any winner, and that the game ends in a draw. The score should remain unchanged after a draw.

### Test Purpose

- **Network Play Tests**: Validate that two players can play against each other online in real-time, with game moves and updates properly synchronized between the players.

- **Player Wins Scenarios**: Ensure that the game correctly identifies and displays the winner when a player wins by connecting four pieces horizontally, vertically, or diagonally.

- **Play Again Functionality**: Verify that the "Play Again" feature works as expected after a game ends, including starting a new game and switching the starting player for fairness.

- **Name Registration in Network Play**: Ensure that player names are correctly registered, displayed during the game, and updated when a player wins.

- **Making a Move**: Confirm that the game handles moves made by each player in real-time, alternates turns, and prevents moves in already occupied cells.

- **Draw Scenario**: Validate that the game correctly identifies when a match ends in a draw and allows players to start a new game without affecting the score.


