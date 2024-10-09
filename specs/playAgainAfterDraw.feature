Feature: Play Again After draw

  Scenario: Pressing Play again after a draw
    Given that an online game is initiated
    When both players play and fill the board without a winner
    Then the play again button should appear
    And when pressed again a new game should begin

