Feature: Quit the game after a draw

  As a user, I want to be able to quit the game after a draw,
  so that I can return to the main menu without active player names.

  Scenario: Players quit the game after a draw and return to the main menu
    Given that I am on the Connect Four game page
    When I start the game without entering names
    And I simulate a game that ends in a draw
    Then I should see a "Quit Game" button displayed on the screen
    When I click the "Quit Game" button
    Then I should see the "Play Game" button displayed on the screen
    And no player names should be present
