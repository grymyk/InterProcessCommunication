'use strict';

multicore.net = require('net');

module.exports = () => {
    let id = +multicore.cluster.worker.id;
    let PORT = 8120 + id;

    console.log(
        '\n "Ready" worker ' +
        'pid:' + process.pid + ' ' +
        'id:' + id
    );

    net.createServer( (socket) => {
        console.log('Client connected');

        socket.on('end', () => {
            console.log('Client disconnected');
        });

        socket.write('Hello\r\n');
         
        socket.pipe(socket);

        process.on('message', (message) => {
            console.log(
                '\n "Get task" from master: ' + JSON.stringify(message) +
                ' to worker pid:' + process.pid
            );

            let value = message.task.map( (item) => {
                return item * 2;
            });

            process.send({
                value,
                id,
            });
        });

    }).listen(PORT, () => {
        console.log('TCP Server Bound');
    });
};

