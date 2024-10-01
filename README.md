# Connect Four Game Test Suite

This repository contains automated tests for the Connect Four game, focusing on both player and AI interactions. The tests are built to ensure that the game works smoothly when played by a human or by different AI levels. This README provides instructions on how to set up and run the tests, along with an overview of what each test does.

## Prerequisites

Before you can run the tests, make sure you have the following installed:

- Node.js (v14 or newer recommended)
- NPM (Node Package Manager)
- Vite

## Installation

First, ensure all necessary packages are installed by running the following commands:

```node
npm install vite@latest
npm install --save-dev @cypress/webpack-preprocessor
```

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

## Test Scenarios Overview

The test scenarios cover various gameplay aspects, including Player vs AI matches, AI vs AI matches, and External AI interactions. Each test is designed to verify that the game behaves as expected during different types of interactions.

### Test Files

#### `testAi.js` / `testAi.feature`

This file contains tests focused on player and AI interactions. Here are the main scenarios:

1. **Player vs Dumb AI**
   - A player places a piece and waits for the dumb AI to respond.
   - Validates that the dumb AI can successfully make a move.

2. **Player vs Smart AI**
   - A player places a piece and waits for the smart AI to respond.
   - Validates that the smart AI can successfully make a move.

3. **Dumb AI vs Smart AI**
   - Simulates a game between the dumb AI and the smart AI.
   - Confirms that both AIs are capable of making valid moves during gameplay.

#### `externalAi.js` / `externalAi.feature`

This file includes tests involving an External AI opponent:

1. **Smart AI vs External AI level 1**
   - The smart AI plays against an external AI at level 1.
   - Checks which AI won after the game is finished based on the `div#status`.

2. **Smart AI vs External AI level 5**
   - The smart AI plays against an external AI at level 1.
   - Checks which AI won after the game is finished based on the `div#status`.

3. **Smart AI vs External AI level 10**
   - The smart AI plays against an external AI at level 1.
   - Checks which AI won after the game is finished based on the scoreboard.
   - Encountered a bug on whatever the last test was, the `div#status` would go over to who's turn it was.

### Testing Tools and Methodology

These tests are written using Cypress and leverage feature files for Behavior-Driven Development (BDD). Each scenario describes a specific flow in plain language, making it easy to understand the test purpose.

### Test Purpose

- **Player vs AI Tests**: Validate that both dumb and smart AIs react correctly when playing against a human.
- **AI vs AI Tests**: Ensure AI players can handle matches against each other without errors.
- **External AI Tests**: Test how well the external AI can perform and conclude games against built-in AI opponents.


