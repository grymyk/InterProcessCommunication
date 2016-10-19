'use strict';

function sortBy(a, b) {
	let key = 'id';

	if (a[key] > b[key]) {
		return 1;
	}

	if (b[key] > a[key]) {
		return -1;
	}
}

module.exports = (tasks) => {
	tasks.sort(sortBy);
	let result = [];

	for (let i = 0, len = tasks.length; i < len; i += 1) {
		result[i] = tasks[i]['value'];
	}

	result = result.reduce( (prev, cur) => {
		return prev.concat(cur);
	}, []);

	return result;
};

