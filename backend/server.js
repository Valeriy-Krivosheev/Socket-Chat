require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);

// const users = new Map()
const port = process.env.PORT || 5000;
const messages = require('./routes/api/messages');
const auth = require('./routes/api/auth');

app.use('/api/messages', messages);
app.use('/api/auth', auth);

const io = new Server(server, {
    cors: {
        origin: '*', // Разрешить все запросы (для разработки)
    },
});



io.on('connection', (socket) => {
    socket.on('sendMessage', (message) => {
        io.emit('newMessage', message);
    });

    socket.on('userConnect', (user) => {
        // users.set(socket.id, user);
        // io.emit('newMessage', {
        //     user,
        //     type:'system',
        //     content:{
        //         text:`${user.name} has joined our chat`,
        //         time: Date.now(),
        //     }
        // });
    });
    socket.on('disconnect', () => {
        // const user = users.get(socket.id);
        // if(user?.name){
        //     io.emit('newMessage', {
        //         user,
        //         type:'system',
        //         content:{
        //             text:`${user?.name} has left the chat`,
        //             time: Date.now(),
        //         }
        //     });
        //     users.delete(socket.id);
        // }
    });

});

app.get('/', (req, res) => {
    res.send('<h1>Hello from backed</h1>');
});

server.listen(port, () => {
    console.log('WebSocket server is running on port 5000');
});