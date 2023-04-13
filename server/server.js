const path = require('path');
const express = require('express');
const fsController = require('./controllers/fsController.js');
const {
  rCloneCopyController,
  rcloneListBuckets,
} = require('./controllers/rcloneController');
const {
  assignVariablesForFS,
  getBucketLoc,
} = require('./controllers/assignController.js');
const resetAWSConfig = require('./controllers/resetAWSController.js');
const { rcloneCopyString } = require('./services/rcloneCopyString.js');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const fs = require('fs');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.post('/listBuckets', resetAWSConfig, rcloneListBuckets, (req, res) => {
  res.status(200).json(res.locals.buckets);
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
      const relevantString = rcloneCopyString(data.toString());
      io.emit('data transfer', relevantString);
    });
    //WILL WANT TO DO SOME ERROR HANDLING DURING THE TRANSFER PROCESS AT SOME POINT.
    res.locals.rcloneCopy.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    //delete config file
    // try {
    //   fs.unlinkSync(path.resolve(__dirname, '../rclone.conf'));
    // } catch (error) {
    //   console.log(error);
    // }
    res.sendStatus(200);
  }
);

app.get('/deleteConfig', )

//Redirect if there's any request to a page that doesn't exist.
app.get('*', (req, res) => {
  res.redirect('/');
});

//GLOBAL ERROR HANDLER NEEDED.
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
    field: '',
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res
    .status(errorObj.status)
    .json({ message: errorObj.message, field: errorObj.field });
});

server.listen(3000, () => console.log('Serving listening on port 3000...'));

module.exports = { io };
