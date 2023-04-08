const path = require('path');
const express = require('express');
const fsController = require('./controllers/fsController.js');
const {
  rCloneCopyController,
  rcloneListBuckets
} = require('./controllers/rcloneController');
const {
  assignVariablesForFS,
  getBucketLoc
} = require('./controllers/assignController.js');
const resetAWSConfig = require('./controllers/resetAWSController.js');
const { rcloneCopyString } = require('./services/rcloneCopyString.js');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.post('/listBuckets', resetAWSConfig, rcloneListBuckets, (req, res) => {
  return res.status(200).json(res.locals.buckets);
});

app.post(
  '/transfer',
  resetAWSConfig,
  getBucketLoc,
  assignVariablesForFS,
  fsController.config,
  rCloneCopyController,
  (req, res) => {
    res.locals.rcloneCopy.stdout.on('data', (data) => {
      console.log(data.toString());
      const relevantString = rcloneCopyString(data.toString());
      io.emit('data transfer', relevantString);
    });
    return res.sendStatus(200);
  }
);

//Redirect if there's any request to a page that doesn't exist.
app.get('*', (req, res) => {
  return res.redirect('/');
});

//GLOBAL ERROR HANDLER NEEDED.
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
    field: ''
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res
    .status(errorObj.status)
    .json({ message: errorObj.message, field: errorObj.field });
});

server.listen(3000, () => console.log('Serving listening on port 3000...'));

module.exports = { io };
