Feature: Register player name and place a piece

  Scenario: Player registers name before the game starts and places a piece
    Given that I am on the Connect Four game page
    When I click the "Play Game" button
    Then I should see "Albin's turn" displayed on the screen
    When I place a piece in the first column
    Then I should see "Chalil's turn" displayed on the screen
