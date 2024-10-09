Feature: Simulate a game that ends in a draw

  Scenario: A game is played between two players and it ends in a draw
    Given that an online game is initiated
    When both players play and fill the board without a winner
    Then the game should end in a draw
    And I verify that the scores have not been changed


