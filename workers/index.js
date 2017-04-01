'use strict';

global.workers = {};

workers.cluster = require('cluster');
workers.os = require('os');
workers.data = require('../db');

global.workers.application = {};

let app = global.workers.application;

app.master = require('./master.js');
app.worker = require('./worker.js');

function init(data) {
    if (workers.cluster.isMaster) {
        app.master(data);
    } else {
	    app.worker(data);
    }
};

workers.data.connect();

if (module.parent) {
    module.exports.get = init; 
} else {
    init( workers.data.get() );
}

