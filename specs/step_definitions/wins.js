import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Ignores the resetButton is not defined issue
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('resetButton is not defined')) {
    return false;
  }
  return true;
});

//Reusable steps
Given('that I am on the Connect Four game page', () => {
  cy.visit('http://localhost:5500');
});

Given('I click the {string} button', () => {
  cy.get('#play-game').click();
});

Given('I enter {string} as Player 1 and {string} as Player 2', (player1, player2) => {
  cy.get('input#player1').clear().type(player1);
  cy.get('input#player2').clear().type(player2);
});

Given('I start the game', () => {
  cy.get('#startGameButton').click(); 
});

 // Player 1 wins horizontally
When('I simulate a game where player 1 wins', () => {
  cy.get('.cell[data-col="0"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="2"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="2"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="3"]').eq(5).click({ force: true });
});

// Player 2 wins vertically
When('I simulate a game where player 2 wins vertically', () => {
  cy.get('.cell[data-col="0"]').eq(5).click({ force: true }); 
  cy.get('.cell[data-col="1"]').eq(5).click({ force: true }); 
  cy.get('.cell[data-col="0"]').eq(4).click({ force: true }); 
  cy.get('.cell[data-col="1"]').eq(4).click({ force: true }); 
  cy.get('.cell[data-col="0"]').eq(3).click({ force: true }); 
  cy.get('.cell[data-col="1"]').eq(3).click({ force: true }); 
  cy.get('.cell[data-col="2"]').eq(5).click({ force: true }); 
  cy.get('.cell[data-col="1"]').eq(2).click({ force: true }); 
});

//Resuable to check status message
Then('We should see a message saying {string}', (message) => {
  cy.get('#status').should('have.text', message);
});
