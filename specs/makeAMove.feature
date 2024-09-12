Feature: As a user, I want to be able to make my move so that it is correctly registered on the game board, i.e., select a column to place my piece in. Choose between 1-7 based on the horizontal column.


  Scenario: Check if the correct spot is registerd to player1
    Given that I am on the Connect Four game page
    And the user presses the "Play Game" button
    And the user presses the "Start Game" button
    When the user clicks on the 1st column in the board game
    Then the cell in row "5" and column "0" should be "player1"

  Scenario: Check if the correct spot is registerd to player2
    Given that I am on the Connect Four game page
    And the user presses the "Play Game" button
    And the user presses the "Start Game" button
    When the user clicks on the 1st column in the board game
    And the second user clicks on the 5th column
    Then the cell in row "5" and column "5" should be "player2"