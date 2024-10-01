import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Ignore specific errors to keep the test running despite known issues
Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes('resetButton is not defined') ||
    err.message.includes('Rules is not defined') ||
    err.message.includes("Cannot read properties of undefined")
  ) {
    return false;
  }
  return true;
});

// Step for entering Smart AI as Player 1 and choosing External AI Level
And('I enter Smart AI as Player 1 and choose Player 2 as External AI Level {int}', (level) => {
  cy.get('select#player1Type').select('smart');
  cy.get('select#player2Type').select('external');
  cy.get('#externalAILevelContainer').should('be.visible');
  cy.get('select#externalAILevel').select(level.toString());
});

// Step for playing the game automatically until one player wins
Then('the game is played automatically until one player wins', () => {
  cy.wrap(null).then(function loopUntilWin() {
    return cy.get('div#status').then(($status) => {
      const statusText = $status.text().toLowerCase();
      cy.log(`Current status: ${statusText}`);
      if (!statusText.includes('wins') && !statusText.includes("it's a draw!")) {
        cy.wait(1000);
        return loopUntilWin();
      }
    });
  });
});

// Which player won
And('I should see which player has won', () => {
  cy.get('div#status').then(($status) => {
    const statusText = $status.text().toLowerCase();
    cy.log(`Final status: ${statusText}`);
    if (statusText.includes('smart ai wins')) {
      cy.log('Smart AI has won');
    } else if (statusText.includes('external ai wins')) {
      cy.log('External AI has won');
    } else if (statusText.includes("it's a draw!")) {
      cy.log('The game ended in a draw');
    } else {
      throw new Error('Game did not end properly');
    }
  });
});

// Checks scoreboard for winner on last test-step
And('I should see which player has won on the scoreboard', () => {
  cy.get('span#player1Score').then(($score1) => {
    cy.get('span#player2Score').then(($score2) => {
      const score1 = parseInt($score1.text());
      const score2 = parseInt($score2.text());
      cy.log(`Player 1 Score: ${score1}`);
      cy.log(`Player 2 Score: ${score2}`);
      if (score1 === 1 && score2 === 0) {
        cy.log('Smart AI has won');
      } else if (score2 === 1 && score1 === 0) {
        cy.log('External AI has won');
      } else if (score1 === 0 && score2 === 0) {
        cy.log('The game ended in a draw or no one has won');
        throw new Error('No player has won');
      } else {
        cy.log('Unexpected scores');
        throw new Error('Unexpected scores on the scoreboard');
      }
    });
  });
});
