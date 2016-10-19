'use strict';

module.exports = () => {
	console.log(
		'Hello from worker ' +
		process.pid + ' ' +
		api.cluster.worker.id
	);

	process.on('message', (message) => {
		console.log(
			'message to worker ' + process.pid +
			' from master: ' + JSON.stringify(message)
		);

		process.send({
			result: message.task['task'].map( (item) => {
				return item * 2;
			})
		});
	});
};

