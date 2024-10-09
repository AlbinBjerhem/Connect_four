import { Then } from "@badeball/cypress-cucumber-preprocessor";


Then('the play again button should appear', () => {
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body)
      .find('#replay-game')
      .should('be.visible');
  });
});

Then('when pressed again a new game should begin', () => {
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');

    cy.wrap(player2Body).find('#replay-game').click();

    const totalCells = 7 * 6;

    cy.wrap(player2Body)
      .find('.cell')
      .should('not.have.class', 'player1')
      .and('not.have.class', 'player2');
  });
});
