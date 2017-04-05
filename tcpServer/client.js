'use strict';

global.tcp = {};

tcp.net = require('net');
tcp.data = require('../db');

tcp.data.connect();

let socket = new tcp.net.Socket();
let user = null;

socket.connect({
        port: 2000,
        host: '127.0.0.1',
    }, () => {
        let data = JSON.stringify( tcp.data.get() );

        //socket.write('Hello from client');
        socket.write(data);

        socket.on('data', (data) => {
            user = JSON.parse(data);

            console.log('Data received (by client): ' + data);
            console.log('Age of ' + user.name + ' is ' + user.age);
        });
    }
);

