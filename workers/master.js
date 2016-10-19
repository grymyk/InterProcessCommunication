'use strict';

let getSubTasks = require('./subTasks.js');
//let gatherSubTask = require('./gatherSubTask.js');

module.exports = () => {
	let cpuCount = api.os.cpus().length;
	let workers = [];

	for (let i = 0; i < cpuCount; i += 1) {
		let worker = api.cluster.fork();

		workers.push(worker);
	}

let task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];

	let subTask = getSubTasks(cpuCount, task);

	let results = [];

	workers.forEach( (worker, index) => {
		worker.send({
			task: {
				task: subTask[index],
				index: index
			}
		});

		worker.on('exit', (code) => {
			console.log('exit ' + worker.process.pid + ' ' + code);
		});

		worker.on('message', (message) => {
			console.log(
				'message from worker ' +
				worker.process.pid + ': ' +
				JSON.stringify(message)
			);

			results.push(message.result);

			if (results.length === cpuCount) {
				process.exit(1);
			}
		});
	});
};

