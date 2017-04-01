'use strict';

global.api = {};

api.cluster = require('cluster');
api.os = require('os');
api.data = require('../db');

global.application = {};

application.master = require('./master.js');
application.worker = require('./worker.js');

function init(data) {
    if (api.cluster.isMaster) {
        application.master(data);
    } else {
	    application.worker(data);
    }
};

api.data.connect();

if (module.parent) {
    module.exports.get = init; 
} else {
    init( api.data.get() );
}

