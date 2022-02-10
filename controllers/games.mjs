import { v4 as uuidv4 } from 'uuid';
import * as boardFunc from '../lib/board.mjs';
import * as inputCheck from '../lib/input-checks.mjs';
import * as timeHandler from '../lib/time.mjs';
import * as gameLogic from '../lib/game-logic.mjs';
import * as readFromTxt from '../lib/read-txt.mjs';

export default function initGamesController(db) {
  const create = async (req, res) => {
    const { duration, random } = req.body;
    let { board } = req.body;
    console.log('req.body in create:>> ', req.body);

    try {
      inputCheck.checkCreateData(duration, random, board);
      if (random) {
        board = boardFunc.genRandomBoardStr();
      } else if (board === undefined) {
        board = readFromTxt.readBoard();
      }
      // create game in db
      const newGame = await db.Game.create({
        token: uuidv4(),
        duration,
        board,
        points: 0,
      });
      const { id, token } = newGame;
      const gameData = {
        id,
        token,
        duration,
        board,
      };
      res.status(201).send(gameData);
    } catch (e) {
      console.log('e :>> ', e);
      res.status(400).send({ message: e.message });
    }
  };

  const update = async (req, res) => {
    let { id } = req.params;
    const { token, word } = req.body;
    id = Number(id);
    console.log('id :>> ', id);
    console.log('req.body in update:>> ', req.body);
    try {
      const game = await db.Game.findByPk(id);

      inputCheck.checkGame(game, token);
      inputCheck.wordCheck(word, game.board);

      let { points } = game;
      const wordPoints = gameLogic.wordScore(word);
      points += wordPoints;

      game.points = points;
      // update the game in db
      await game.save({ fields: ['points'] });
      await game.reload();

      const timeLeft = timeHandler.getTimeLeft(game);

      const gameData = {
        id: game.id,
        token: game.token,
        duration: game.duration,
        board: game.board,
        time_left: timeLeft,
        points,
      };
      console.log('gameData in update :>> ', gameData);
      res.status(200).send(gameData);
    } catch (e) {
      console.log('e :>> ', e);
      res.status(400).send({ message: e.message });
    }
  };
  const show = async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    console.log('in show id :>> ', id);

    try {
      const game = await db.Game.findByPk(id);
      if (game === null) {
        throw new Error(`Game ${id} does not exist`);
      }
      const { token, duration, board, points } = game;
      const timeLeft = timeHandler.getTimeLeft(game);
      const gameData = {
        id,
        token,
        duration,
        board,
        time_left: timeLeft,
        points,
      };
      res.status(200).send(gameData);
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };

  return {
    create,
    update,
    show,
  };
}
