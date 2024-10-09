Feature: Play Again functionality switches starting player

  Scenario: Play again after a quick win, starting player switches
    Given that I am on the Connect Four game page
    When I click the "Play Online" button and create a lobby
    And I enter "Albin" as Player 1 and "Chalil" as Player 2
    And I start the game
    And Albin wins and clicks play again
    Then I should see "Chalil's turn" displayed on the screen
