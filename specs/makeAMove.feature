Feature: Make A Move

  Scenario: Check if the correct spot is registered to player1
    Given that an online game is initiated
    When the user clicks on the 1st column in the board game
    Then the cell in row "5" and column "0" should be "player1"

  Scenario: Check if the correct spot is registered to player2
    Given that an online game is initiated
    When the user clicks on the 1st column in the board game
    And the second user clicks on the 5th column
    Then the cell in row "5" and column "5" should be "player2"
