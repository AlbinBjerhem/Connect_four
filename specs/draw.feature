Feature: The game ends in a draw when the board is full and no player wins

  Scenario: The game ends in a draw
    Given that I am on the Connect Four game page
    And I click the "Play Game" button
    And I enter "Tintin" as Player 1 and "Snowy" as Player 2
    And I start the game
    When I simulate a game where no player wins and the board is full
    Then I should see a message saying "It's a draw!"

