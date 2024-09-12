Feature: Prevent placing disc in a full column
    As a player, I want to be prevented from placing a disc in a full column
    so that I don't break the game rules.

    Scenario: Attempting to place a disc in a full column
        Given the game has started
        And the user clicks on "Play Game"
        And the user clicks on "Start Game"
        And column 0 is filled by alternating Player 1 and Player 2
        When the player tries to place a disc in column 0
        Then the game should not allow the player to place a disc in a full column