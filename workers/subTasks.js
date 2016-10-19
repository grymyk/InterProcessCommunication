'use strict';

module.exports = (cpuCount, tasks) => {
    let subTasks = [];

    let taskSize = tasks.length;
    let subTaskSize = Math.ceil(taskSize / cpuCount);

	let begin = 0;
	let end = subTaskSize;
	let len = subTaskSize * cpuCount;
	
	for ( ; end <= len; ) {
		subTasks.push( tasks.slice(begin, end) );

		begin += subTaskSize;
		end += subTaskSize;
	}
	
	return subTasks;
}

