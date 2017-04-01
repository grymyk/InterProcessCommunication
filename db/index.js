'use strict';

let data = null;

function connect() {
    data = require('./data.json');
}

function get() {
    return data;
}

module.exports = {
    connect,
    get
};

