'use strict';

let subtask = require('../subtask');

module.exports = (task) => {
    let cpuCount = multicore.os.cpus().length;
    console.log(' CPU Count: ', cpuCount);

    let workers = [];

    for (let i = 0; i < cpuCount; i += 1) {
        let worker = multicore.cluster.fork();

        workers.push(worker);
    }

    console.log('\n task: %j', task);

    let subTask = subtask.get(cpuCount, task);
    console.log('\n subTask: %j', subTask);

    let results = [];

    workers.forEach( (worker, id) => {
        worker.send({
            task: subTask[id]
        });

        worker.on('exit', (code, signal) => {
            if (signal) {
                console.log(` Worker ${worker.process.pid} was killed by signal: ${signal}`);
            } else if (code !== 0) {
                console.log('gyc  exit ' + worker.process.pid + ' ' + code);
            } else {
                console.log(`worker ${worker.process.pid} is successed`);
            }
        });

        worker.on('message', (message) => {
            console.log(
                '\n "Done task" from worker ' + worker.process.pid + ': ' +
                JSON.stringify(message)
            );

            results.push(message);

            if (results.length === cpuCount) {
                results = subtask.arrange(results);

                console.log('\n results: %j', results);

                process.exit(1);
            }
        });

        worker.on('disconnent', () => {
            console.log(' Worker has disconnected');
        });

        worker.on('error', (err) => {
            throw err;
        });

        worker.on('listening', (address) => {
            console.log(`Worker ${address} is listening`);
        });

        worker.on('uncaughtException', (err) => {
            console.log('An uncaught error occurred!');
            console.log('error stack: ', err.stack);
        });
    });
};

