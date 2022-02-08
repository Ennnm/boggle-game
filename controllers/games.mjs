import { v4 as uuidv4 } from 'uuid';
import * as boardFunc from '../lib/board.mjs';
import * as inputCheck from '../lib/input-checks.mjs';

export default function initGamesController(db) {
  const create = async (req, res) => {
    const { duration, random } = req.body;
    let { board } = req.body;
    console.log('req.body :>> ', req.body);

    try {
      inputCheck.checkCreateData(duration, random, board);
      if (random) {
        board = boardFunc.genRandomBoardStr();
      }
      // create game in db
      const newGame = await db.Game.create({
        token: uuidv4(),
        duration,
        board,
        points: 0,
      });
      const { id, token } = newGame.dataValues;
      const gameData = {
        id,
        token,
        duration,
        board,
      };
      console.log('gameData :>> ', gameData);
      res.status(201).send(gameData);
    } catch (e) {
      console.log('e :>> ', e);
      res.status(400).send(e);
    }

    const reqBody = {
      duration: 1234,
      random: false,
      board: 'A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K',
    };

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
