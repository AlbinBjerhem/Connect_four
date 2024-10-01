Feature: External AI vs Opponents

  Scenario: Smart AI vs External AI Level 1
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter Smart AI as Player 1 and choose Player 2 as External AI Level 1
    And I start the game versus AI
    Then the game is played automatically until one player wins
    And I should see which player has won

  Scenario: Smart AI vs External AI Level 5,
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter Smart AI as Player 1 and choose Player 2 as External AI Level 5
    And I start the game versus AI
    Then the game is played automatically until one player wins
    And I should see which player has won

  Scenario: Smart AI vs External AI Level 10
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter Smart AI as Player 1 and choose Player 2 as External AI Level 10
    And I start the game versus AI
    Then the game is played automatically until one player wins
    And I should see which player has won on the scoreboard
