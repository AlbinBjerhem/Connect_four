import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('the user starts on the start page', () => {
  cy.visit('http://localhost:5500');
});

Given('the user presses the {string} button', (a) => {
  cy.contains(a).click()
});

When('the user clicks on the 1st column in the board game', () => {
  cy.get('.cell[data-col="0"]').first().click({ force: true });
});

Then('the cell in row 5 and column 0 should be player1', () => {
  cy.get('.cell[data-row="5"][data-col="0"]')
    .should('have.class', 'cell')
    .and('have.class', 'player1');
});

When('the second user clicks on the 5th column', () => {
  cy.get('.cell[data-col="4"]').first().click({ force: true });
});

Then('the cell in row 5 and column 5 should be player2', () => {
  cy.get('.cell[data-row="5"][data-col="4"]')
    .should('have.class', 'cell')
    .and('have.class', 'player2');
});