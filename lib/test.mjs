import { checkWordInBoard } from './game-logic.mjs';

const testBoard = 'A, N, W, O, T, M, *, S, A, L, I, H, *, S, B, V';
const testAns = ['manta', 'milt', 'flus', 'fibs'];
checkWordInBoard(testBoard, testAns[2]);
