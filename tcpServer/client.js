'use strict';

global.api = {};

api.net = require('net');
api.data = require('../data');

let socket = new api.net.Socket();
let user = null;

socket.connect({
		port: 2000,
		host: '127.0.0.1',
	}, () => {
        let data = JSON.stringify( api.data.get() );

        //socket.write('Hello from client');
        socket.write(data);

		socket.on('data', (data) => {
    		user = JSON.parse(data);
    		
			console.log('Data received (by client): ' + data);
    		console.log('Age of ' + user.name + ' is ' + user.age);
  		});
	}
);

