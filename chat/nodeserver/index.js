
// node server wich will handles socketio connection
// var io = require('socket.io')(3000)
const users = {};
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// //if any user joins, let other users connected to the server know!
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    //if some one sends a message .broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    // if someone leaves the chat ,let others know
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

//////////////////////////////////////////////////////////////
// const express = require('express');
// const { createServer } = require('node:http');
// const { join } = require('node:path');
// const { Server } = require('socket.io');


// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });
// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });

// server.listen(3000, () => {
//   console.log('server running at http://localhost:3000');
// });
