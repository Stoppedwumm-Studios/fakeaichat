const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/bot', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    const url = socket.handshake.headers.referer;

    socket.on('message', (msg) => {
        // Determine the prefix based on the URL
        const prefix = url.includes('/bot') ? 'Bot: ' : 'User: ';

        // Send the message to all connected clients with the appropriate prefix
        io.emit('message', prefix + msg);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
