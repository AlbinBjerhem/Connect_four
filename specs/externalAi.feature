Feature: External AI vs Opponents

  Scenario: Dumb AI vs External AI until External AI wins
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter Dumb AI as Player 1 and choose Player 2 as External AI
    And I start the game versus AI
    Then the game is played automatically until External AI wins
    And I should see that External AI has won

  Scenario: Smart AI vs External AI until External AI wins
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    And I enter Smart AI as Player 1 and choose Player 2 as External AI
    And I start the game versus AI
    Then the game is played automatically until External AI wins
    And I should see that External AI has won
