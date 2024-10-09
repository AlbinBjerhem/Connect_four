Feature: Play Again After Win

  Scenario: Pressing Play again after a win
    Given that an online game is initiated
    When both players play the game and player 1 wins
    Then the play again button should appear
    And when pressed again a new game should begin