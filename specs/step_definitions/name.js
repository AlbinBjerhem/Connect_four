import { When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

let lobbyCode = '';
let winnerName = '';

// Play Online
When('I click the {string} button and create a lobby', (buttonText) => {
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('button#play-online').click();
    cy.wrap(player1Body).find('#createLobbyButton').click();
  });
});

// Registering names for players
When('I enter {string} as Player 1 and {string} as Player 2', (player1Name, player2Name) => {
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');

    cy.wrap(player1Body).find('#createNameContainer').should('be.visible');
    cy.wrap(player1Body).find('#createNameInput').type(player1Name);
    cy.wrap(player1Body).find('#createNameButton').click();

    cy.wrap(player1Body).find('#lobbyCodeDisplay').invoke('text').then((code) => {
      lobbyCode = code.trim();
    });
  });

  // Player 2 joins the lobby
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');

    cy.wrap(player2Body).find('#play-online').click();
    cy.wrap(player2Body).find('#joinLobbyButton').click();

    cy.wrap(player2Body).find('#joinNameContainer').should('be.visible');
    cy.wrap(player2Body).find('#joinNameInput').type(player2Name);
    cy.wrap(player2Body).find('#joinNameButton').click();

    cy.wrap(player2Body).find('#joinCodeInput').type(lobbyCode);
    cy.wrap(player2Body).find('#joinCodeButton').click();
  });
});

// Place marker in first column
When('I place a piece in the first column', () => {
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body)
      .find('.cell[data-col="0"][data-row="5"]', { timeout: 10000 })
      .click({ force: true });
  });
});

// Player 1 wins on turn 4
When('I simulate a fast game where Player 1 wins on the 4th round', () => {
  // Player moves
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
});

// Step to check status displays the correct text
Then('I should see {string} displayed on the screen after the move', (expectedText) => {
  cy.wait(500);

  ['iframe#player1', 'iframe#player2'].forEach((iframeSelector) => {
    cy.get(iframeSelector).then($iframe => {
      const iframeBody = $iframe.contents().find('body');
      cy.wrap(iframeBody)
        .find('#status', { timeout: 20000 })
        .should('contain', expectedText);
    });
  });
});

// Step to save winner as variable
And('the winner’s name should be saved in a variable', () => {
  cy.get('iframe#player1').then($iframe => {
    const iframeBody = $iframe.contents().find('body');

    cy.wrap(iframeBody)
      .find('#status', { timeout: 20000 })
      .invoke('text')
      .then((statusText) => {
        const match = statusText.match(/(\w+) wins!/);
        if (match && match[1]) {
          winnerName = match[1];
        }
      });
  });
});
