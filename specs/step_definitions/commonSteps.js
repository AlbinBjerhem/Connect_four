import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let lobbyCode = '';
export let player1Score = 0;
export let player2Score = 0;


Given('that I am on the Connect Four game page', () => {
  cy.visit('http://localhost:5173');
});

// Step to check specific text is displayed on screen
Then('I should see {string} displayed on the screen', (expectedText) => {
  cy.log('Status displays: ' + expectedText);
  ['iframe#player1', 'iframe#player2'].forEach((iframeSelector) => {
    cy.get(iframeSelector).then($iframe => {
      const iframeBody = $iframe.contents().find('body');
      cy.wrap(iframeBody)
        .find('#status', { timeout: 20000 })
        .should('contain', expectedText);
    });
  });
});

// Step to initiate an online game where Player 1 creates a lobby and Player 2 joins
Given('that an online game is initiated', () => {
  cy.visit('http://localhost:5173');

  // Player 1 creates the lobby
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('#play-online').click();
    cy.wrap(player1Body).find('#createLobbyButton').click();
    cy.wrap(player1Body).find('#createNameButton').click();

    cy.wrap(player1Body).find('#lobbyCodeDisplay').invoke('text').then((code) => {
      lobbyCode = code.trim(); // Store the lobby code
    });
  });

  // Player 2 joins the lobby
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body).find('#play-online').click();
    cy.wrap(player2Body).find('#joinLobbyButton').click();
    cy.wrap(player2Body).find('#joinNameButton').click();

    cy.wrap(player2Body).find('#joinCodeInput').type(lobbyCode);
    cy.wrap(player2Body).find('#joinCodeButton').click();
  });

  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body)
      .find('#status', { timeout: 10000 })
      .should('be.visible')
      .and('contain', "Player 1's turn");

    cy.wrap(player1Body).find('.scoreboard #player1Score').invoke('text').then((text) => {
      player1Score = parseInt(text.trim()) || 0; // Store Player 1's initial score
    });

    cy.wrap(player1Body).find('.scoreboard #player2Score').invoke('text').then((text) => {
      player2Score = parseInt(text.trim()) || 0; // Store Player 2's initial score
    });
  });
});

export function clickCell(playerIframe, column, row, currentTurn, nextTurn) {
  cy.get(playerIframe).then($iframe => {
    const iframeBody = $iframe.contents().find('body');

    cy.wrap(iframeBody)
      .find(`.cell[data-col="${column}"][data-row="${row}"]`)
      .should('be.visible')
      .click({ force: true })
      .then(() => {
        cy.wait(500);

        if (nextTurn !== 'It\'s a draw!') {
          cy.wrap(iframeBody)
            .find('#status', { timeout: 10000 })
            .should('contain', nextTurn);
        }
      });
  });
}

// Step to play a full game without a winner
When('both players play and fill the board without a winner', () => {


  // Column 0 
  clickCell('iframe#player1', 0, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 0, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 0, 3, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 0, 2, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 0, 1, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 0, 0, "Player 2's turn", "Player 1's turn");

  // Column 1 
  clickCell('iframe#player1', 1, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 1, 3, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 1, 2, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 1, 1, "Player 1's turn", "Player 2's turn");

  // Column 2 
  clickCell('iframe#player2', 2, 5, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 4, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 2, 3, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 2, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 2, 1, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 2, 0, "Player 1's turn", "Player 2's turn");

  // Column 3
  clickCell('iframe#player2', 3, 5, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 3, 4, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 3, 3, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 3, 2, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 3, 1, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 3, 0, "Player 1's turn", "Player 2's turn");

  // Final move in Column 1
  clickCell('iframe#player2', 1, 0, "Player 2's turn", "Player 1's turn");

  // Column 4 
  clickCell('iframe#player1', 4, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 4, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 4, 3, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 4, 2, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 4, 1, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 4, 0, "Player 2's turn", "Player 1's turn");

  // Column 5
  clickCell('iframe#player1', 5, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 5, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 5, 3, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 5, 2, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 5, 1, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 5, 0, "Player 2's turn", "Player 1's turn");

  // Column 6
  clickCell('iframe#player1', 6, 5, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 6, 4, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 6, 3, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 6, 2, "Player 2's turn", "Player 1's turn");
  clickCell('iframe#player1', 6, 1, "Player 1's turn", "Player 2's turn");
  clickCell('iframe#player2', 6, 0, "Player 2's turn", "It's a draw!");
});
