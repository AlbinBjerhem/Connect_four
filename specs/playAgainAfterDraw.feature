Feature: Play again after a draw

  As a user, I want to be able to play again after a draw,
  so that I can start a new game without any change in the score.

  Scenario: Players play again after a draw and the game resets with the same score
    Given that I am on the Connect Four game page
    When I start the game without entering names
    And I save the initial score
    And I simulate a game that ends in a draw
    Then I should see a "Play Again" button displayed on the screen
    And I should see the "It's a draw!" message
    When I click the "Play Again" button
    Then the game board should be reset with all cells empty
    And the score should not change

