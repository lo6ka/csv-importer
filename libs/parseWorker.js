require('dotenv').load();
const logger = require('./logger');
const { fork } = require('child_process');
const csv = require('csv-parser');
const fs = require('fs');

logger.info('parseWorker: start...');

const dbWorker = fork('./libs/dbWorker');

dbWorker.on('message', (msg) => {
  logger.info(`parseWorker ${msg}`);
});

process.on('message', (msg) => {
  if (msg.type === 'upload') {
    logger.info(`new upload ${msg.filename}`);
    const file = `./uploads/${msg.filename}`;

    let count = 0;
    let current = 1;

    fs.createReadStream(file)
    .pipe(csv())
    .on('data', () => count++)
    .on('end', () => {
      process.send({ type: 'count', client: msg.client, count });

      const timer = setInterval(() => {
        process.send({ type: 'progress', client: msg.client, progress: current / count });
      }, 2000);

      fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => {
        logger.info('parseWorker: parsed');
        dbWorker.send({ type: 'parsed', data });
        current++;
      })
      .on('end', () => {
        logger.info('parseWorker: finish...');
        clearInterval(timer);
        process.send({ type: 'progress', client: msg.client, progress: 1 });
      });
    });
  }
});
