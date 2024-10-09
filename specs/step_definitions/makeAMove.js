import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { clickCell } from './commonSteps.js';

When('Player 1 clicks on a cell', () => {
  clickCell('iframe#player1', 0, 5, "Player 1's turn", "Player 2's turn", 'player1');
});

Then('the cell should reflect Player 1\'s move', () => {
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body)
      .find(`.cell[data-row="5"][data-col="0"]`)
      .should('have.class', 'player1');
  });
});

When('Player 2 clicks on a cell', () => {
  clickCell('iframe#player2', 0, 4, "Player 2's turn", "Player 1's turn", 'player2');
});

Then('the cell should reflect Player 2\'s move', () => {
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body)
      .find(`.cell[data-row="4"][data-col="0"]`)
      .should('have.class', 'player2');
  });
});

When('Player 2 attempts to click on the same cell', () => {
  // Player 2 tries to click on the already occupied cell
  clickCell('iframe#player2', 0, 5, "Player 2's turn", "Player 1's turn", 'player2');
});

Then('the cell should still reflect Player 1\'s move', () => {
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body)
      .find(`.cell[data-row="5"][data-col="0"]`)
      .should('have.class', 'player1');
  });
});
