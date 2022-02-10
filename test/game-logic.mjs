import { expect } from 'chai';
import { checkWordInBoard } from '../lib/game-logic.mjs';

describe('Game Logic', () => {
  describe('Checks', () => {
    it('if word is in the board', () => {
      const board = 'A, N, W, O, T, M, *, S, A, L, I, H, *, S, B, V';
      const words = ['manta', 'milt', 'flus', 'fibs'];
      const results = words.map((word) => checkWordInBoard(board, word));
      const allResult = results.every((res) => res);
      console.log(allResult);
      expect(allResult).to.equal(true);
    });
    it('if word is not in the board', () => {
      const board = 'A, N, W, O, T, M, *, S, A, L, I, H, *, S, B, V';
      const words = ['notinboard', 'notaword'];
      const results = words.map((word) => checkWordInBoard(board, word));
      const allResult = results.every((res) => res);
      console.log(allResult);
      expect(allResult).to.equal(false);
    });
  });
});
