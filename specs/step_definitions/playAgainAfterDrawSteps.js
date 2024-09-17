import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { initialScorePlayer1, initialScorePlayer2 } from './commonSteps';

Then('I should see the "It\'s a draw!" message', () => {
  cy.get('#status')
    .should('be.visible')
    .and('contain', "It's a draw!");
});

Then('the score should not change', () => {
  cy.get('#player1Score').invoke('text').then((currentScorePlayer1) => {
    expect(currentScorePlayer1.trim()).to.eq(initialScorePlayer1);
  });

  cy.get('#player2Score').invoke('text').then((currentScorePlayer2) => {
    expect(currentScorePlayer2.trim()).to.eq(initialScorePlayer2);
  });
});