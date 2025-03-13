const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const users = new Map()
const io = new Server(server, {
    cors: {
        origin: '*', // Разрешить все запросы (для разработки)
    },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', (message) => {
        io.emit('newMessage', message);
    });

    socket.on('userConnect', (user) => {
        users.set(socket.id, user);
        io.emit('newMessage', {
            user,
            type:'system',
            content:{
                text:`${user.name} have joined our chat`,
                time: Date.now(),
            }
        });
    });
    socket.on('disconnect', () => {
        const user = users.get(socket.id);
        io.emit('newMessage', {
            user,
            type:'system',
            content:{
                text:`${user.name} has left the chat`,
                time: Date.now(),
            }
        });
        users.delete(socket.id);
    });

});

server.listen(3000, () => {
    console.log('WebSocket server is running on port 3000');
});