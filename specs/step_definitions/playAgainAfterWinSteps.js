import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { initialScorePlayer1, initialScorePlayer2 } from './commonSteps';

Then('I should see the "Player 1 wins!" message', () => {
  cy.get('#status')
    .should('be.visible')
    .and('contain', "Player 1 wins!");
});

Then('the score should be updated', () => {
  cy.get('#player1Score').invoke('text').then((currentScorePlayer1) => {
    expect(currentScorePlayer1.trim()).not.eq(initialScorePlayer1);
  });

  cy.get('#player2Score').invoke('text').then((currentScorePlayer2) => {
    expect(currentScorePlayer2.trim()).to.eq(initialScorePlayer2);
  });
});
