Feature: Play again after the game concludes

    Scenario: Players are prompted to play again after a player wins
        Given that I am on the Connect Four game page
        When I start the game without entering names
        And I simulate a game where Player 1 wins
        Then I should see a "Play Again" button displayed on the screen

    Scenario: Game resets to a new, empty board when choosing to play again
        Given that I am on the Connect Four game page
        When I start the game without entering names
        And I simulate a game where Player 1 wins
        And I click the "Play Again" button
        Then the game board should be reset with all cells empty

    Scenario: Players are prompted to quit the game after a player wins
        Given that I am on the Connect Four game page
        When I start the game without entering names
        And I simulate a game where Player 1 wins
        And I should see a "Quit Game" button displayed on the screen
        When I click the "Quit Game" button
        Then I should see the "Play Game" button displayed on the screen