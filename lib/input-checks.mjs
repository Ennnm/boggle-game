import { getTimeLeft } from './time.mjs';

export const checkCreateData = (duration, random, board) => {
  if (duration === undefined) {
    throw new Error('Duration is undefined');
  }
  if (random === undefined) {
    throw new Error('Random is undefined');
  }
  if (random === false && board === undefined) {
    throw new Error('Board is undefined');
  }
};

export const checkGame = (game, token) => {
  if (game === null) {
    throw new Error('Game not found');
  }
  if (game.token !== token) {
    throw new Error(`Token doesn't match game ${game.id}`);
  }
  if (getTimeLeft(game) < 0) {
    throw new Error('Game has ended, no further updating allowed');
  }
};
