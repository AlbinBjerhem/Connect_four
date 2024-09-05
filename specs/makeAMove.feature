Feature: As a user, I want to be able to make my move so that it is correctly registered on the game board, i.e., select a column to place my piece in. Choose between 1-7 based on the horizontal column.


  Scenario: Check if the correct spot is filled with the right color
    Given the user starts on the start page
    And the user presses the "Play Game" button
    And the user presses the "OK" button
    And the user presses the "OK" button again
    When the user clicks on the first column in the board game
    Then the cell in row 1 and column 1 should be red