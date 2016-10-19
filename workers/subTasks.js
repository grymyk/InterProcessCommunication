'use strict';

function changeTask(task) {
    task.sort( (a, b) => {
        if (a > b) {
            return 1;
        }

        if (b > a) {
            return -1
        }
    });
}

module.exports = (cpuCount, tasks) => {
    let subTasks = [];

    let taskSize = tasks.length;
    let subTaskSize = Math.ceil(taskSize / cpuCount);

	let begin = 0;
	let end = subTaskSize;
	let len = subTaskSize * cpuCount;

    changeTask(tasks);
	
	for ( ; end <= len; ) {
		subTasks.push( tasks.slice(begin, end) );

		begin += subTaskSize;
		end += subTaskSize;
	}
	
	return subTasks;
}

