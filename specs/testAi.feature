Feature: Player vs AI game


  Scenario: Player places a piece and waits for the dumb AI to place a piece
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter "Sebbe" as Player 1 and choose AI level as dumb
    And I start the game versus AI
    And I place a piece in the first column
    Then I wait for the dumb AI to place a piece
    And I should see that AI placed a piece


  Scenario: Player places a piece and waits for the smart AI to place a piece
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter "Sebbe" as Player 1 and choose AI level as smart
    And I start the game versus AI
    And I place a piece in the first column
    Then I wait for the smart AI to place a piece
    And I should see that AI placed a piece


  Scenario: Dumb AI vs Smart AI
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter Dumb AI as Player 1 and choose AI level as dumb
    And I enter Smart AI as Player 2 and choose AI level as smart
    And I start the game versus AI
    Then I wait for both AIs to place their pieces
    And I should see that both AIs placed a piece