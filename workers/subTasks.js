'use strict';

module.exports = (cpuCount, tasks) => {
    let subTasks = [];

    let taskSize = tasks.length;

	let begin = 0;
	let end = cpuCount;
	let len = Math.ceil(taskSize / cpuCount) * cpuCount;
	
	for ( ; end <= len; ) {
		subTasks.push( tasks.slice(begin, end) );

		begin += cpuCount;
		end += cpuCount;	
	}
	
	return subTasks;
}

