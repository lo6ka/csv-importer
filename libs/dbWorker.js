require('dotenv').load();
const path = require('path');
const logger = require('./logger');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PSWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  });

const Bet = sequelize.import(path.resolve(__dirname, '../models/Bet.js'));

logger.info('dbWorker start...');

Bet.sync({ force: true }).then(() => {
  process.on('message', (msg) => {
    logger.info('dbWorker: received...');
    if (msg.type === 'parsed') {
      const bet = Bet.build(msg.data);
      bet.save().then((r) => {
        logger.info('dbWorker: saved...');
      })
      .catch((r) => logger.info(r));
    }

    logger.info('dbWorker: finish...');
  });
});
