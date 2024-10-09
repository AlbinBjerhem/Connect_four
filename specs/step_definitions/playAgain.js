import { When } from "@badeball/cypress-cucumber-preprocessor";
import { lobbyCode } from './commonSteps.js';

When('Albin wins and clicks play again', () => {
  const moves = [
    { player: 'player1', col: 0 },
    { player: 'player2', col: 1 },
    { player: 'player1', col: 0 },
    { player: 'player2', col: 1 },
    { player: 'player1', col: 0 },
    { player: 'player2', col: 1 },
    { player: 'player1', col: 0 },
  ];

  let currentRow = { 0: 5, 1: 5 };

  moves.forEach((move) => {
    const iframeSelector = `iframe#${move.player}`;
    cy.get(iframeSelector).then($iframe => {
      const iframeBody = $iframe.contents().find('body');
      cy.wrap(iframeBody)
        .find(`.cell[data-col="${move.col}"][data-row="${currentRow[move.col]}"]`, { timeout: 10000 })
        .click({ force: true })
        .then(() => {
          currentRow[move.col]--;
        });
    });
    cy.wait(500);
  });

  // Verify that "Albin wins!" is displayed
  ['iframe#player1', 'iframe#player2'].forEach((iframeSelector) => {
    cy.get(iframeSelector).then($iframe => {
      const iframeBody = $iframe.contents().find('body');
      cy.wrap(iframeBody)
        .find('#status', { timeout: 10000 })
        .should('contain', 'Albin wins!');
    });
  });

  // Click the "Play Again" button only in Albin's iframe
  cy.get('iframe#player1').then($iframe => {
    const iframeBody = $iframe.contents().find('body');

    cy.wrap(iframeBody)
      .find('button#replay-game', { timeout: 10000 })
      .should('be.visible')
      .click();
  });

  cy.wait(2000);
});
