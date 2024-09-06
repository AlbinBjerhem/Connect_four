Feature: Player wins by connecting four game pieces horizontally

  Scenario: Player 1 wins horizontally
    Given that I am on the Connect Four game page
    And I click the "Play Game" button
    And I enter "Tintin" as Player 1 and "Snowy" as Player 2
    And I start the game
    When I simulate a game where player 1 wins
    Then We should see a message saying "Tintin wins!"
