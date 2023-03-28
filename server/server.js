const path = require('path');
const express = require('express');
const fsController = require('./controllers/fsController.js');
const rcloneCopy = require('./controllers/rcloneController');

const app = express();

//PUT ALL THE WEBSOCKET HERE FOR NOW.

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/index.html')));

//Don't think we need this.
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

app.post('/transfer', fsController.config, (req, res) => {
  res.sendStatus(200);
});

//404 NEEDED

//GLOBAL ERROR HANDLER NEEDED.
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('Serving listening on port 3000...'));
