import { v4 as uuidv4 } from 'uuid';
import db from './models/index.mjs';

db.Game.create({
  token: uuidv4(),
  duration: process.argv[2],
  board: process.argv[3],
  points: 0,
})
  .then((item) => {
    console.log('success!');
    console.log(item);
  })
  .catch((error) => console.log(error));
