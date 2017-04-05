'use strict';

global.tcp = {};

tcp.net = require('net');
tcp.workers = require('../workers');

let user = {
	name: 'Marcus Aurelius',
	age: 1895
};

let server = tcp.net.createServer( (socket) => {
    console.log('Connected: ' + socket.localAddress);

    socket.on('end', () => {
        console.log('client disconnected');
    });

    socket.write( JSON.stringify(user) );

    socket.on('data', (data) => {
        console.log('Data received (by server): ' + data);

        tcp.workers.get( JSON.parse(data) );
    });
});

server.on('error', (err) => {
    throw err;
});

server.listen(2000, () => {
    console.log('Listening at port 2000');
});

