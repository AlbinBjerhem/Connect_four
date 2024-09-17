import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Simulate a game where no player wins and the board is full
When('I simulate a game where no player wins and the board is full', () => {
  cy.get('.cell[data-col="0"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(2).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(2).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(1).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(1).click({ force: true });
  cy.get('.cell[data-col="1"]').eq(0).click({ force: true });
  cy.get('.cell[data-col="0"]').eq(0).click({ force: true });

  cy.get('.cell[data-col="2"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="3"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="2"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="3"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="2"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="3"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="3"]').eq(2).click({ force: true });
  cy.get('.cell[data-col="2"]').eq(2).click({ force: true });
  cy.get('.cell[data-col="3"]').eq(1).click({ force: true });
  cy.get('.cell[data-col="2"]').eq(1).click({ force: true });
  cy.get('.cell[data-col="3"]').eq(0).click({ force: true });
  cy.get('.cell[data-col="2"]').eq(0).click({ force: true });

  cy.get('.cell[data-col="4"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="5"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="4"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="5"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="4"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="5"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="5"]').eq(2).click({ force: true });
  cy.get('.cell[data-col="4"]').eq(2).click({ force: true });
  cy.get('.cell[data-col="5"]').eq(1).click({ force: true });
  cy.get('.cell[data-col="4"]').eq(1).click({ force: true });
  cy.get('.cell[data-col="5"]').eq(0).click({ force: true });
  cy.get('.cell[data-col="4"]').eq(0).click({ force: true });

  cy.get('.cell[data-col="6"]').eq(5).click({ force: true });
  cy.get('.cell[data-col="6"]').eq(4).click({ force: true });
  cy.get('.cell[data-col="6"]').eq(3).click({ force: true });
  cy.get('.cell[data-col="6"]').eq(2).click({ force: true });
  cy.get('.cell[data-col="6"]').eq(1).click({ force: true });
  cy.get('.cell[data-col="6"]').eq(0).click({ force: true });
});


