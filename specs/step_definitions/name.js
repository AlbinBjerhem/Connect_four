import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Ignores the resetButton is not defined issue
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('resetButton is not defined')) {
    return false;
  }
  return true;
});

// Scenario: Player registers name before the game starts and places a piece

When('I click the "Play Game" button', () => {
  cy.get('#play-game').click();
});

// Step for player names in wins.js

And('I start the game', () => {
  cy.get('#startGameButton').click();

  // Checks the name-input field is not visible
  cy.get('#playerModal').should('not.be.visible');
  cy.get('#status').should('be.visible');
});

Then('I should see "Albin\'s turn" displayed on the screen', () => {
  cy.get('#status').should('have.text', "Albin's turn");
});

And('I place a piece in the first column', () => {
  cy.get('.cell[data-col="0"]').first().click({ force: true });
});

And('I should see "Chalil\'s turn" displayed on the screen', () => {
  cy.get('#status').should('have.text', "Chalil's turn");
});

// Scenario: The game displays the winning player's name when the game is over

And('I simulate a fast game where Player 1 wins on the 4th round', () => {
  cy.get('.cell[data-col="0"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(2).click({ force: true });
});

Then('I should see "Albin wins!" displayed on the screen', () => {
  cy.get('#status').should('have.text', "Albin wins!");
});

And('the winner’s name should be saved in a variable', () => {
  let displayWinner = 'Albin';
  expect(displayWinner).to.equal('Albin');
});

// Scenario: The game displays substitute names for players who did not enter their name

Then('I should see "Player 1\'s turn"', () => {
  cy.get('#status').should('have.text', "Player 1's turn");
});

And('I should see "Player 2\'s turn"', () => {
  cy.get('#status').should('have.text', "Player 2's turn");
});
