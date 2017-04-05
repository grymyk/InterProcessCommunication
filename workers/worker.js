'use strict';

module.exports = () => {
    let id = multicore.cluster.worker.id;

    console.log(
        '\n "Ready" worker ' +
        'pid:' + process.pid + ' ' +
        'id:' + id
    );

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
};

