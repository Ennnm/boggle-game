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
      console.log('gameData :>> ', gameData);
      res.status(201).send(gameData);
    } catch (e) {
      console.log('e :>> ', e);
      res.status(400).send({ error: e.message });
    }
  };

  const update = async (req, res) => {
    const { id } = req.params;
    const { token, word } = req.body;
    console.log('id :>> ', id);
    console.log('req.body :>> ', req.body);
    try {
      const game = await db.Game.findByPk(id);

      inputCheck.checkGame(game, token);
      inputCheck.checkWordLen(word);
      // check if word is valid
      const isWordInDict = gameLogic.checkWordInDict(word);
      console.log('isWordInDict :>> ', isWordInDict);
      const isWordInBoard = gameLogic.checkWordInBoard(game.board, word);
      const wordPoints = gameLogic.wordScore(word);
      const { duration, board } = game;
      let { points } = game;
      // calculate the points
      points += 1;
      game.points = points;
      // update the game in db
      await game.save({ fields: ['points'] });
      await game.reload();

      const timeLeft = timeHandler.getTimeLeft(game);
      console.log('timeLeft :>> ', timeLeft);

      const gameData = {
        id: game.id,
        token: game.token,
        duration: game.duration,
        board: game.board,
        time_left: timeLeft,
      };
      res.status(200).send(gameData);
    } catch (e) {
      console.log('e :>> ', e);
      res.status(400).send({ error: e.message });
    }
  };
  const show = async (req, res) => {
    const { id } = req.params;
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
      res.status(400).send({ error: e.message });
    }
  };

  return {
    create,
    update,
    show,
  };
}
