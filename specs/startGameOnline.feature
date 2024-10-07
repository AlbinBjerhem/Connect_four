Feature: Start Online Game
  As two players, I want to be able to start an online game in a 4-in-a-row game

  Scenario: Both players start an online game
    Given that both players have opened the game in their browsers
    When Player 1 clicks on the "Play Online" button
    And Player 2 clicks on the "Play Online" button
    Then both players should be waiting for a game to start
