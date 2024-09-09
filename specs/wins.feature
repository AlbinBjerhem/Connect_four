Feature: Player wins by connecting four game pieces 

  Scenario: Player 1 wins horizontally
    Given that I am on the Connect Four game page
    And I click the "Play Game" button
    And I enter "Tintin" as Player 1 and "Snowy" as Player 2
    And I start the game
    When I simulate a game where player 1 wins horizontally
    Then We should see a message saying "Tintin wins!"

  Scenario: Player 2 wins vertically
    Given that I am on the Connect Four game page
    And I click the "Play Game" button
    And I enter "Tintin" as Player 1 and "Snowy" as Player 2
    And I start the game
    When I simulate a game where player 2 wins vertically
    Then We should see a message saying "Snowy wins!"

  Scenario: Player 1 wins diagonally (bottom left to top right)
    Given that I am on the Connect Four game page
    And I click the "Play Game" button
    And I enter "Tintin" as Player 1 and "Snowy" as Player 2
    And I start the game
    When I simulate a game where player 1 wins diagonally from bottom left to top right
    Then We should see a message saying "Tintin wins!"

  Scenario: Player 2 wins diagonally (top left to bottom right)
    Given that I am on the Connect Four game page
    And I click the "Play Game" button
    And I enter "Tintin" as Player 1 and "Snowy" as Player 2
    And I start the game
    When I simulate a game where player 2 wins diagonally from top left to bottom right
    Then We should see a message saying "Snowy wins!"