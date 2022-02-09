
module.exports = {
  development: {
    username: 'en',
    password: null,
    database: 'boggle_game',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'boggle_game',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
