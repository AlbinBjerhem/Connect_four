import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Variable to store the lobby code
let lobbyCode = '';

Given('both players have opened the game in their browsers', () => {
  // Visit the game page with the two iframes
  cy.visit('http://localhost:5173');
});

When('Player 1 clicks on the "Play Online" button', () => {
  // Player 1 clicks "Play Online"
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('#play-online').click();
  });
});

When('Player 1 clicks on the "Create Lobby" button', () => {
  // Player 1 clicks "Create Lobby"
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('#createLobbyButton').click();
  });
});

When('Player 1 clicks on the "Continue" button', () => {
  // Player 1 clicks "Continue" after creating the lobby
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('#createNameButton').click();
  });
});

Then('Player 1 should see the lobby code and save it', () => {
  // Player 1 sees the lobby code and saves it to a variable
  cy.get('iframe#player1').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('#lobbyCodeDisplay').invoke('text').then((code) => {
      lobbyCode = code.trim(); // Save the lobby code
    });
  });
});

When('Player 2 clicks on the "Play Online" button', () => {
  // Player 2 clicks "Play Online"
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body).find('#play-online').click();
  });
});

When('Player 2 clicks on the "Join Lobby" button', () => {
  // Player 2 clicks "Join Lobby"
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body).find('#joinLobbyButton').click();
  });
});

When('Player 2 clicks on the "Continue" button', () => {
  // Player 1 clicks "Continue" after creating the lobby
  cy.get('iframe#player2').then($iframe => {
    const player1Body = $iframe.contents().find('body');
    cy.wrap(player1Body).find('#joinNameButton').click();
  });
});

When('Player 2 enters the saved lobby code and clicks "Continue"', () => {
  // Player 2 enters the lobby code and clicks "Continue"
  cy.get('iframe#player2').then($iframe => {
    const player2Body = $iframe.contents().find('body');
    cy.wrap(player2Body).find('#joinCodeInput').type(lobbyCode); // Type the saved lobby code
    cy.wrap(player2Body).find('#joinCodeButton').click();
  });
});


