const express = require('express');

const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.listen(3000, () => console.log('listening'));
