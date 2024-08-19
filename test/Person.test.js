import { expect, test } from 'vitest'
import Person from '../classes/Person.js'

// As a user, I want to be able to register my name before the game starts. The game should confirm that my name has been successfully registered.

test('Name has been registered', () => {
  // Temporary code, replace with actual code after function has been implemented.
  const player = new Person('Chalil');
  expect(player.name).toBeDefined();
});

// As a user, I want my name to be saved as a property for that game as a variable. 

// As a user, I want my opponents name to be saved the same way.

test('Names for players have been saved', () => {
    // Temporary code, replace with actual code after function has been implemented.
    const player = new Person('Chalil', 'Mikoz');
    expect(player.name[0]).toBe('Chalil');
    expect(player.name[1]).toBe('Mikoz');
  });

// As a user, I want to be notified if I try to start the game without entering a name, so that I am reminded to provide a name before the game can begin.

test('No players are registered', () => {
    // Temporary code, replace with actual code after function has been implemented.
    const player = new Person();
    expect(player.name[0]).toBeUndefined();
    expect(player.name[1]).toBeUndefined();
  });

// As a user, I want the current player’s name to be clearly displayed on the screen so that I always know whose turn it is. (currentPlayer).

// As a user, I want the game to automatically switch to the other player’s turn after I make a move, so that the game flow is smooth. 

// As a user, I want the game to clearly display a message with the winning player’s name when the game is over. The winner’s name should be saved as a variable (displayWinner) so it can be displayed. 
