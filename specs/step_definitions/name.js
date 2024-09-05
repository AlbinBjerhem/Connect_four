import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Player registers name before the game starts and places a piece

Given('that I am on the Connect Four game page', () => {
  cy.visit('http://localhost:5500'); 
});

When('I click the "Play Game" button', () => {
  cy.window().then((win) => {

    cy.stub(win, 'prompt')
      .onFirstCall().returns('Albin')  // Player 1
      .onSecondCall().returns('Chalil'); // Player 2
    cy.get('#play-game').click(); 
  });
});

Then('I should see "Albin\'s turn" displayed on the screen', () => {
  cy.get('#status').should('have.text', "Albin's turn");
});

When('I place a piece in the first column', () => {
  // Clicking first cell to swap player turn
  cy.get('.cell[data-col="0"]').first().click();
});

Then('I should see "Chalil\'s turn" displayed on the screen', () => {
  cy.get('#status').should('have.text', "Chalil's turn");
});

let displayWinner = '';

// Scenario: The game displays the winning player's name when the game is over

When('I simulate a fast game where Player 1 wins on the 4th round', () => {
  // Player moves
  cy.get('.cell[data-col="0"]').first().click();  
  cy.get('.cell[data-col="1"]').first().click();  
  cy.get('.cell[data-col="0"]').first().click();  
  cy.get('.cell[data-col="1"]').first().click();  
  cy.get('.cell[data-col="0"]').first().click();  
  cy.get('.cell[data-col="1"]').first().click();  
  cy.get('.cell[data-col="0"]').first().click();  

  cy.get('#status').then(($status) => {
    const statusText = $status.text();
    if (statusText.includes('wins')) {
      displayWinner = 'Albin'; 
    }
  });
});

Then('I should see "Albin wins!" displayed on the screen', () => {
  cy.get('#status').should('have.text', "Albin wins!");
});

Then('the winner’s name should be saved in a variable', () => {
  expect(displayWinner).to.equal('Albin'); 
});
