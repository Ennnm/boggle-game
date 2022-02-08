import initGamesController from './controllers/games.mjs';
import db from './models/index.mjs';

// import your controllers here

export default function bindRoutes(app) {
  const gameController = initGamesController(db);

  app.post('/games', gameController.create);
  app.put('/games/:id', gameController.update);
  app.get('/games/:id', gameController.show);
}
