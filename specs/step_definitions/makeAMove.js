import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('the user starts on the start page', () => {
  cy.visit('http://localhost:5500');
});

When('the user presses the {string} button', (a) => {
  cy.contains(a).click();
});

/* No duplicate steps, this one already above
When('the user presses the {string} button', (a) => {});*/

When('the user presses the {string} button again', (a) => {
  cy.window().then((win) => {

    cy.stub(win, 'click')
    cy.contains(a).click()// Player 1
    cy.contains(a).click(); // Player 2
  });
});

When('the user clicks on the first column in the board game', () => {
  cy.get('.cell[data-col="0"]').first().click();
});

Then('the cell in row 1 and column 1 should be red', () => {

});