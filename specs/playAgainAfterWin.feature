Feature: Play again after a win

  As a user, I want to be able to play again after winning a game,
  so that I can start a new game with an updated score.

  Scenario: Players play again after a win and the game resets with an updated score
    Given that I am on the Connect Four game page
    When I start the game without entering names
    And I save the initial score
    And I simulate a game where Player 1 wins
    Then I should see a "Play Again" button displayed on the screen
    And I should see the "Player 1 wins!" message
    When I click the "Play Again" button
    Then the game board should be reset with all cells empty
    And the score should be updated
