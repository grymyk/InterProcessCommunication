'use strict';

let getSubTasks = require('./getSubTask.js');
let gatherSubTask = require('./gatherSubTask.js');
let sortSubTask = require('./sortSubTask');

module.exports = () => {
	let cpuCount = api.os.cpus().length;
	let workers = [];

	for (let i = 0; i < cpuCount; i += 1) {
		let worker = api.cluster.fork();

		workers.push(worker);
	}

    let task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
	console.log('\n task: %j', task);

    let subTask = getSubTasks(cpuCount, task);
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
				'\n message from worker ' + worker.process.pid + ': ' +
				JSON.stringify(message)
			);

            results.push(message);

			if (results.length === cpuCount) {
				results = sortSubTask(results);

				console.log('\n results: %j', results);

                process.exit(1);
            }
		});
    });
};

