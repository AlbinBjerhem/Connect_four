Feature: Register player name and declare winner

  Scenario: Player registers name before the game starts and places a piece
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter "Albin" as Player 1 and "Chalil" as Player 2
    And I start the game
    Then I should see "Albin's turn" displayed on the screen
    And I place a piece in the first column
    And I should see "Chalil's turn" displayed on the screen

  Scenario: The game displays the winning player's name when the game is over
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter "Albin" as Player 1 and "Chalil" as Player 2
    And I start the game
    And I simulate a fast game where Player 1 wins on the 4th round
    Then I should see "Albin wins!" displayed on the screen
    And the winner’s name should be saved in a variable

  Scenario: The game displays substitute names for players who did not enter their name
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I start the game without entering names
    Then I should see "Player 1's turn"
    And I place a piece in the first column
    And I should see "Player 2's turn"
