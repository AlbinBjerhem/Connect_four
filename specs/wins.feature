Feature: Player wins by connecting four game pieces in online play

  Scenario: Player 1 wins horizontally
    Given that an online game is initiated
    When I start the game
    And I simulate a game where player 1 wins horizontally
    Then I should see "Player 1 wins!" displayed on the screen

  Scenario: Player 2 wins vertically
    Given that an online game is initiated
    When I start the game
    And I simulate a game where player 2 wins vertically
    Then I should see "Player 2 wins!" displayed on the screen

  Scenario: Player 1 wins diagonally (bottom left to top right)
    Given that an online game is initiated
    When I start the game
    And I simulate a game where player 1 wins diagonally from bottom left to top right
    Then I should see "Player 1 wins!" displayed on the screen

  Scenario: Player 2 wins diagonally (top left to bottom right)
    Given that an online game is initiated
    When I start the game
    And I simulate a game where player 2 wins diagonally from top left to bottom right
    Then I should see "Player 2 wins!" displayed on the screen
