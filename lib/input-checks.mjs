import { getTimeLeft } from './time.mjs';

export const checkCreateData = (duration, random) => {
  if (duration === undefined) {
    throw new Error('Duration is undefined');
  }
  if (random === undefined) {
    throw new Error('Random is undefined');
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

  // to save past entries of words and their location to ensure no duplicate words are being called?
};

export const checkWordLen = (word) => {
  if (word === undefined || word.length < 3) {
    throw new Error('Word has to be at least three characters long');
  }
};
