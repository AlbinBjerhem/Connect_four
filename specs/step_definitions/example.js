import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Ignores the resetButton is not defined issue
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('resetButton is not defined')) {
    return false;
  }
  return true;
});

// Scenario: Players are prompted to play again after a player wins

Given('that I am on the Connect Four game page', () => {
  cy.visit('http://localhost:5500');
});

When('I start the game without entering names', () => {
  cy.get('#startGameButton').click({ force: true });
});


And('I simulate a game where Player 1 wins', () => {
  cy.get('.cell[data-col="0"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(2).click({ force: true });
});


Then('I should see a "Play Again" button displayed on the screen', () => {
  cy.get('#replay-game').should('be.visible');
});

// Scenario: Game resets to a new, empty board when choosing to play again

And('I click the "Play Again" button', () => {
  cy.get('#replay-game').click();
});

Then('the game board should be reset with all cells empty', () => {
  // Checks that each cell do not contain player1 or player2
  cy.get('.cell').each(cell => {
    cy.wrap(cell).should('not.have.class', 'player1');
    cy.wrap(cell).should('not.have.class', 'player2');
  });
});

// Scenario: Players are prompted to quit the game after a player wins

And('I should see a "Quit Game" button displayed on the screen', () => {
  cy.get('#quit-game').should('be.visible');
});

When('I click the "Quit Game" button', () => {
  cy.get('#quit-game').click({ force: true });
});

Then('I should see the "Play Game" button displayed on the screen', () => {
  cy.get('#play-game').should('be.visible');
  cy.get('#status').should('not.be.visible');
});