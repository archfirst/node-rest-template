'use strict';

var bunyan = require('bunyan');

var logger = bunyan.createLogger({
    name: 'app',
    streams: [
        {
            level: 'info',
            stream: process.stdout     // log INFO and above to stdout
        },
        {
            level: 'error',
            path: 'app-error.log'      // log ERROR and above to a file
        }
    ]
});

module.exports = logger;
