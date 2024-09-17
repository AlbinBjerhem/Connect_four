Feature: Prevent illegal moves
    As a user, I don't want to be able to make illegal moves, such as not being able to place tokens in a full column or after someone has won, so that the game rules are followed.

    Scenario: Attempting to place a disc in a full column
        Given the game has started
        And the user clicks on "Play Game"
        And the user clicks on "Start Game"
        And column 0 is filled by alternating Player 1 and Player 2
        When the player tries to place a disc in column 0
        Then the game should not allow the player to place a disc in a full column

    Scenario: Attempting to place a disc after a player has won
        Given the game has started
        And the user clicks on "Play Game"
        And the user clicks on "Start Game"
        And Player 1 wins the game by filling column 0
        When the player tries to place a disc in column 1
        Then the game should not allow the player to place a disc