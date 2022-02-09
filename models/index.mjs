import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initGameModel from './game.mjs';

const env = process.env.NODE_ENV || 'production';
// const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

console.log('config :>> ', config);
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// add your model definitions to db here
db.Game = initGameModel(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
