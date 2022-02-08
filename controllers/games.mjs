import * as board from '../lib/board.mjs';

export default function initGamesController(db) {
  const create = async (req, res) => {
    const { duration, random, board } = req.body;

    // return response status 201
    //     {
    //   "id": 1,
    //   "token": "9dda26ec7e476fb337cb158e7d31ac6c",
    //   "duration": 12345,
    //   "board": "A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K"
    // }
  };

  const update = async (req, res) => {
    // return response status 200
    // {
    //   "id": 1,
    //   "token": "9dda26ec7e476fb337cb158e7d31ac6c",
    //   "duration": 12345,
    //   "board": "A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K",
    //   "time_left": 10000,
    //   "points": 10
    // }
  };
  const show = async (req, res) => {
    // return response status 200
    // {
    //   "id": 1,
    //   "token": "9dda26ec7e476fb337cb158e7d31ac6c",
    //   "duration": 12345,
    //   "board": "A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K",
    //   "time_left": 10000,
    //   "points": 10
    // }
  };

  return {
    create,
    update,
    show,
  };
}
