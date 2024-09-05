import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the Connect Four game page', () => {
  cy.visit('http://localhost:5500'); 
});

When('I click the "Play Game" button', () => {
  cy.window().then((win) => {
    // Name inputs
    cy.stub(win, 'prompt')
      .onFirstCall().returns('Albin')  // Player 1
      .onSecondCall().returns('Chalil'); // Player 2
    cy.get('#play-game').click(); 
  });
});

Then('I should see "Albin\'s turn" displayed on the screen', () => {
  cy.get('#status').should('have.text', "Albin's turn");
});

When('I place a piece in the first column', () => {
  // Clicking first cell to swap player turn
  cy.get('.cell[data-col="0"]').first().click();
});

Then('I should see "Chalil\'s turn" displayed on the screen', () => {
  cy.get('#status').should('have.text', "Chalil's turn");
});
