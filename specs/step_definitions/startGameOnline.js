import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that both players have opened the game in their browsers', () => {
  // Visit the page with the two iframes for Player 1 and Player 2
  cy.visit('http://localhost:5173');
});

When('Player 1 clicks on the "Play Online" button', () => {
  // Interact with Player 1's iframe and click the "Play Online" button
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('#play-online').click();
  });
});

When('Player 2 clicks on the "Play Online" button', () => {
  // Interact with Player 2's iframe and click the "Play Online" button
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body).find('#play-online').click();
  });
});

Then('both players should be waiting for a game to start', () => {
  // Verify that both players see a waiting state (this will depend on your specific UI)
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('p:contains("Waiting for game to start...")');
  });

  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body).find('p:contains("Waiting for game to start...")');
  });
});
