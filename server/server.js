console.log('Hello world!');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const randomColor = require('randomcolor');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (sock) => {
const color = randomColor();
console.log('smb is connected');
sock.emit('message', 'You are connected');

sock.on('message', (text) => io.emit('message', text));
sock.on('turn', ({x,y}) => io.emit('turn', {x,y, color}));
});

server.on('error', (err) => {
    console.error(err);
});

server.listen(8080, () => {
    console.log('server is ready');
});