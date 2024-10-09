Feature: Make A Move

  Scenario: Players take turns clicking on cells
    Given that an online game is initiated
    When Player 1 clicks on a cell
    Then the cell should reflect Player 1's move
    When Player 2 clicks on a cell
    Then the cell should reflect Player 2's move

  Scenario: Players cannot make a move in an already occupied cell
    Given that an online game is initiated
    When Player 1 clicks on a cell
    Then the cell should reflect Player 1's move
    When Player 2 attempts to click on the same cell
    Then the cell should still reflect Player 1's move
