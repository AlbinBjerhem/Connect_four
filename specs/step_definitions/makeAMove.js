import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('the user presses the {string} button', (a) => {
  cy.contains(a).click()
});

When('the user clicks on the 1st column in the board game', () => {
  cy.get('.cell[data-col="0"]').first().click({ force: true });
});

Then('the cell in row {string} and column {string} should be {string}', (a, b, c) => {
  cy.get(`.cell[data-row="${a}"][data-col="${b}"]`)
    .should('have.class', 'cell')
    .and('have.class', c);
});

When('the second user clicks on the 5th column', () => {
  cy.get('.cell[data-col="4"]').first().click({ force: true });
});
