require('dotenv').load();
const logger = require('./libs/logger');
const { fork } = require('child_process');
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).single('file');

const parseWorker = fork('./libs/parseWorker');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(logger.requestLogger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({
        success: false,
      });
    }

    parseWorker.send({ type: 'upload', filename: req.file.filename, client: req.body.client });

    return res.json({
      success: true,
    });
  });
});

app.use(express.static(path.join(__dirname, 'assets')));

io.on('connection', (socket) => {
  parseWorker.on('message', (msg) => {
    if (msg.client === socket.id) {
      if (msg.type === 'count') {
        socket.emit('count', msg);
      } else if (msg.type === 'progress') {
        socket.emit('progress', msg);
      }
    }
  });
});

server.listen(process.env.PORT, () => {
  logger.info(`Go to http://localhost:${process.env.PORT}`);
});
