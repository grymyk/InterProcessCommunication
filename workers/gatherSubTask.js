'use strict';

module.exports = (tasks) {
	

	tasks.sort((a, b) => {
		if (a > b) {
			return -1;
		}

		if (b > a) {
			return 1;
		}
	});
};

