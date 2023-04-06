const { io } = require('./server');

//PUT ALL THE WEBSOCKET LOGIC HERE FOR NOW.
io.on('connection', (socket) => {
  console.log('a user connected');
});
