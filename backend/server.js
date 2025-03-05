const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Разрешить все запросы (для разработки)
    },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Отправка сообщения всем пользователям
    socket.on('sendMessage', (message) => {
        io.emit('newMessage', message);
    });

    // Отключение пользователя
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('WebSocket server is running on port 3000');
});