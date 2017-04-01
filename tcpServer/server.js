'use strict';

global.api = {};

api.net = require('net');
api.workers = require('../workers');

let user = {
	name: 'Marcus Aurelius',
	age: 1895
};

let server = api.net.createServer( (socket) => {
    socket.write( JSON.stringify(user) );

    console.log('Connected: ' + socket.localAddress);

    socket.on('end', () => {
        console.log('client disconnected');
    });

    socket.on('data', (data) => {
        console.log('Data received (by server): ' + data);

        api.workers.get(data);
    });
});

server.on('error', (err) => {
    throw err;
});

server.listen(2000, () => {
    console.log('Listening at port 2000');
});

