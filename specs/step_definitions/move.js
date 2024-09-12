import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let row = 6;
let player1;
let player2;

Given("the game has started", () => {
  cy.visit('http://localhost:5500');
});

When('the user clicks on "Play Game"', () => {
  cy.contains('Play Game').click();
});

When('the user clicks on "Start Game"', () => {
  cy.contains('Start Game').click();
});

Given("column {int} is filled by alternating Player 1 and Player 2", (col) => {
  for (let i = 0; i < row; i++) {
    const currentPlayer = i % 2 === 0 ? player1 : player2;
    cy.get(`.cell[data-col="${col}"]`).first().click();
  }
});

When("the player tries to place a disc in column {int}", (col) => {
  cy.get(`.cell[data-col="${col}"]`).first().click();
});

Then("the game should not allow the player to place a disc in a full column", () => {
  cy.get('.modal-content').should('contain', 'Column is full, choose another column');
});
