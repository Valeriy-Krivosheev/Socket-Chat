import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);

const port = process.env.PORT || 5000;
import messages from './routes/api/messages.js'
import auth from './routes/api/auth.js'

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
        // }
    });

});

app.get('/', (req, res) => {
    res.send('<h1>Hello from backed</h1>');
});

server.listen(port, () => {
    console.log('WebSocket server is running on port 5000');
});