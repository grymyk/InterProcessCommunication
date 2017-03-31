'use strict';

function gatherSubTask(results, result) {
	return results.push(results);
}

function sortTask(task) {
	task.sort( (a, b) => {
        if (a > b) {
            return 1;
        }

        if (b > a) {
            return -1
        }
    });
}

function get(cpuCount, tasks) {
	let subTasks = [];

    let taskSize = tasks.length;
    let subTaskSize = Math.ceil(taskSize / cpuCount);

    let begin = 0;
    let end = subTaskSize;
    let len = subTaskSize * cpuCount;

    sortTask(tasks);

    for ( ; end <= len; ) {
        subTasks.push( tasks.slice(begin, end) );

        begin += subTaskSize;
        end += subTaskSize;
    }

    return subTasks;
}

function sortById(a, b) {
    let key = 'id';

    if (a[key] > b[key]) {
        return 1;
    }

    if (b[key] > a[key]) {
        return -1;
    }
}


function arrange(tasks) {
	tasks.sort( sortById );

    let result = [];

    for (let i = 0, len = tasks.length; i < len; i += 1) {
        result[i] = tasks[i]['value'];
    }

    result = result.reduce( (prev, cur) => {
        return prev.concat(cur);
    }, []);

    return result;	
}

module.exports = {
	get,
	arrange
};

