Feature: Game registers players' names in network play

  Scenario: Register names
    Given that I am on the Connect Four game page
    When I click the "Play Online" button and create a lobby
    And I enter "Albin" as Player 1 and "Chalil" as Player 2
    And I start the game
    Then I should see "Albin's turn" displayed on the screen
    And I place a piece in the first column
    Then I should see "Chalil's turn" displayed on the screen after the move

  Scenario: The game displays the winning player's name when the game is over
    Given that I am on the Connect Four game page
    When I click the "Play Online" button and create a lobby
    And I enter "Albin" as Player 1 and "Chalil" as Player 2
    And I start the game
    Then I should see "Albin's turn" displayed on the screen
    And I simulate a fast game where Player 1 wins on the 4th round
    Then I should see "Albin wins!" displayed on the screen
    And the winner’s name should be saved in a variable
