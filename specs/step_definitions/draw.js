import { Then } from "@badeball/cypress-cucumber-preprocessor";

// Step to check that the game ends in a draw
Then('the game should end in a draw', () => {
  // Verify that the game shows a draw message in the status div
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('#status').should('contain', "It's a draw!").and('be.visible');
  });

  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body).find('#status').should('contain', "It's a draw!").and('be.visible');
  });
});
