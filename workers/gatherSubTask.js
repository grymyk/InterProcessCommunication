'use strict';

module.exports = (results, result) => {
    for (let i = 0, len = result.length; i < len; i += 1) {
        results.push( result[i] );
    }

    return results;
};

