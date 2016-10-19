'use strict';

module.exports = () => {
	let idWorker = api.cluster.worker.id;

	console.log(
		'\n Hello from worker ' +
		process.pid + ' ' +
		idWorker
	);

	process.on('message', (message) => {
		console.log(
			'\n message to worker ' + process.pid +
			' from master: ' + JSON.stringify(message)
		);

		let value = message.task.map( (item) => {
						return item * 2;
					});

		process.send({
			value: value,
			id: idWorker
		});
	});
};

