Feature: Start Online Game
  As two players, we want to create and join an online lobby to play a 4-in-a-row game.

  Scenario: Player 1 creates a lobby and Player 2 joins it
    Given both players have opened the game in their browsers
    When Player 1 clicks on the "Play Online" button
    And Player 1 clicks on the "Create Lobby" button
    And Player 1 clicks on the "Continue" button
    Then Player 1 should see the lobby code and save it
    When Player 2 clicks on the "Play Online" button
    And Player 2 clicks on the "Join Lobby" button
    And Player 2 clicks on the "Continue" button
    And Player 2 enters the saved lobby code and clicks "Continue"


