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
    if (i % 2 === 0) {
      cy.get(`.cell[data-col="${col}"]`).first().click();
    } else {
      cy.get(`.cell[data-col="${col}"]`).first().click();
    }
  }
});

When("the player tries to place a disc in column {int}", (col) => {
  cy.get(`.cell[data-col="${col}"]`).first().click();
});

Then("the game should not allow the player to place a disc in a full column", () => {
  cy.get('.modal-content').should('contain', 'Column is full, choose another column');
});

Given('Player 1 wins the game by filling column 0', () => {
  for (let i = 0; i < 4; i++) {
    cy.get(`.cell[data-col="0"]`).first().click();
    if (i < 3) {
      cy.get(`.cell[data-col="1"]`).first().click();
    }
  }

  cy.get('#status').should('contain', 'Player 1 wins!');
});

When("the player tries to place a disc in column 2", () => {
  cy.get(`.cell[data-col="2"]`).first().click();
});

Then("the game should not allow the player to place a disc", () => {
  cy.get('#status').should('contain', 'Player 1 wins!');
  cy.get('.cell[data-col="2"]').should('not.have.class', 'player1').and('not.have.class', 'player2');
});