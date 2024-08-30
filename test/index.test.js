import { describe, it, expect } from 'vitest';
import { Game } from '../index.js';

describe('Game Class Structure', () => {
  it('should have a constructor', () => {
    const game = new Game();
    expect(game).toBeInstanceOf(Game);
  });

  it('should have a start method', () => {
    expect(typeof Game.prototype.start).toBe('function');
  });

  it('should have a setupPlayers method', () => {
    expect(typeof Game.prototype.setupPlayers).toBe('function');
  });

  it('should have a playGame method', () => {
    expect(typeof Game.prototype.playGame).toBe('function');
  });

  it('should have a makeOneMove method', () => {
    expect(typeof Game.prototype.makeOneMove).toBe('function');
  });

  it('should have a switchPlayer method', () => {
    expect(typeof Game.prototype.switchPlayer).toBe('function');
  });

  it('should have a askToPlayAgain method', () => {
    expect(typeof Game.prototype.askToPlayAgain).toBe('function');
  });
});


// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { Game } from '../index.js';  // Ensure correct import path

// // Extend the mock for prompt-sync with more responses for a longer game
// vi.mock('prompt-sync', () => {
//   const responses = [
//     "Alice",   // Name for Player 1
//     "Bob",     // Name for Player 2
//     "1",       // Move 1 for Player 1
//     "2",       // Move 1 for Player 2
//     "1",       // Move 2 for Player 1
//     "2",       // Move 2 for Player 2
//     "1",       // Move 3 for Player 1
//     "2",       // Move 3 for Player 2
//     "1",       // Move 4 for Player 1
//     "no",     // Play again
//   ];
//   let index = 0;
//   return {
//     default: () => () => {
//       return index < responses.length ? responses[index++] : "no";  // Default to "no" if out of predefined responses
//     }
//   }
// });

// describe('Game Tests', () => {
//   let consoleLogSpy;

//   beforeEach(() => {
//     consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
//   });

//   afterEach(() => {
//     vi.restoreAllMocks();  // Restore all mocks after each test
//   });

//   it('should simulate a complete game including replay', () => {
//     const game = new Game();
//     game.start();
//     expect(consoleLogSpy).toHaveBeenCalled();  // Check if console.log was called, indicating game output
//     expect(consoleLogSpy).toHaveBeenCalledWith("Thank you for playing!");
//   });
// });


