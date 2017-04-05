'use strict';

global.multicore = {};

multicore.cluster = require('cluster');
multicore.os = require('os');
multicore.data = require('../db');

global.app = {};

app.master = require('./master.js');
//app.worker = require('./worker.js');
app.tcpworker = require('./tcpworker.js');

function init(data) {
    if (multicore.cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        app.master(data);
    } else {
        console.log(`Worker ${process.pid} is running`);

        app.worker();
    }
};

multicore.data.connect();

if (module.parent) {
    module.exports.get = init; 
} else {
    init( multicore.data.get() );
}

