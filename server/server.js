'use strict';

var log = require('./infrastructure/logger');

// -----------------------------------------------------------------------------
// Start the database
// -----------------------------------------------------------------------------
var persistence = require('./application/persistence');
log.info('Database Started');

// -----------------------------------------------------------------------------
// Start the HTTP Server and expose the RESTful API
// -----------------------------------------------------------------------------
var port = process.env.PORT || 8080;

var api = require('./adapter/rest/api');
var server = require('http').createServer(api);

// Start listening to HTTP requests
server.listen(port, function() {
    log.info('Listening on port ' + port);
});

// -----------------------------------------------------------------------------
// Stop the HTTP server and the database when SIGINT is received
// (i.e. Ctrl-C is pressed)
// -----------------------------------------------------------------------------
process.on('SIGINT', function() {
    log.info('SIGINT received ...');
    server.close(function() {
        log.info('Server stopped ...');
        persistence.destroyConnectionPool(function() {
            log.info('Database stopped ...');
            log.info('Exiting process ...');
            process.exit();
        });
    });
});
