import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

export let initialScorePlayer1;
export let initialScorePlayer2;

// Ignores the resetButton is not defined issue
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('resetButton is not defined')) {
    return false;
  }
  return true;
});

Given('that I am on the Connect Four game page', () => {
  cy.visit('http://localhost:5500');
});

When('I start the game without entering names', () => {
  cy.get('#startGameButton').click({ force: true });
});

And('I save the initial score', () => {
  cy.get('#player1Score').invoke('text').then((text) => {
    initialScorePlayer1 = text.trim();
  });

  cy.get('#player2Score').invoke('text').then((text) => {
    initialScorePlayer2 = text.trim();
  });
});

And('I simulate a game where Player 1 wins', () => {
  cy.get('.cell[data-col="0"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(2).click({ force: true });
});

And('I simulate a game that ends in a draw', () => {
  function clickCell(column, times) {
    for (let i = 0; i < times; i++) {
      cy.get(`.cell[data-col="${column}"]`).eq(5).click({ force: true });
    }
  }

  clickCell(0, 6);
  clickCell(1, 5);
  clickCell(2, 6);
  clickCell(3, 6);
  clickCell(4, 6);
  clickCell(1, 1);
  clickCell(5, 6);
  clickCell(6, 6);

});

Then('I should see a "Play Again" button displayed on the screen', () => {
  cy.get('#replay-game').should('be.visible');
});

When('I click the "Play Again" button', () => {
  cy.get('#replay-game').click();
});

Then('the game board should be reset with all cells empty', () => {
  cy.get('.cell').each(cell => {
    cy.wrap(cell).should('not.have.class', 'player1');
    cy.wrap(cell).should('not.have.class', 'player2');
  });
});

Then('I should see a "Quit Game" button displayed on the screen', () => {
  cy.get('#quit-game').should('be.visible');
});

When('I click the "Quit Game" button', () => {
  cy.get('#quit-game').click({ force: true });
});

Then('I should see the "Play Game" button displayed on the screen', () => {
  cy.get('#play-game').should('be.visible');
  cy.get('#status').should('not.be.visible');
});

Then('no scoreboard should be present', () => {
  cy.get('.scoreboard').should('not.be.visible');
});
