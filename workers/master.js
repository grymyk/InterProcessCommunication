'use strict';

let subtask = require('../subtask');
let data = require('../data');

module.exports = () => {
    let cpuCount = api.os.cpus().length;
    console.log(' CPU Count length: ', cpuCount);

    let workers = [];

    for (let i = 0; i < cpuCount; i += 1) {
        let worker = api.cluster.fork();

        workers.push(worker);
    }

    let task = data.get();
    console.log('\n task: %j', task);

    let subTask = subtask.get(cpuCount, task);
    console.log('\n subTask: %j', subTask);

    let results = [];

    workers.forEach( (worker, id) => {
        worker.send({
            task: subTask[id]
        });

        worker.on('exit', (code) => {
            console.log('exit ' + worker.process.pid + ' ' + code);
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
    });
};

