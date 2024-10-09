import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { clickCell } from './commonSteps'; // Ensure to import the clickCell function

// Step to click on the first column in the board game
When('the user clicks on the 1st column in the board game', () => {
  clickCell('iframe#player1', 0, 5, "Player 1's turn", "Player 2's turn");
});

// Step for the second user clicking on the 5th column
When('the second user clicks on the 5th column', () => {
  clickCell('iframe#player2', 4, 5, "Player 2's turn", "Player 1's turn");
});

// Step to check if the cell is filled
Then('the cell in row {string} and column {string} should be {string}', (row, col, expectedClass) => {
  cy.get(`.cell[data-row="${row}"][data-col="${col}"]`)
    .should('have.class', 'cell') // Check if it's a valid cell
    .and('have.class', expectedClass) // Check if it has the expected class (e.g., 'player1', 'player2')
    .then(($cell) => {
      // Log the classes of the cell for debugging
      cy.log(`Cell at row: ${row}, col: ${col} has classes: ${$cell.attr('class')}`);
    });
});



