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
