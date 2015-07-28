'use strict';

var persistence = require(process.cwd() + '/server/application/persistence');
var knex = persistence.knex;

var myHooks = function() {

    this.Before(function(callback) {

        // Truncate tables
        knex.raw('truncate table accounts cascade')
            .then(function() {
                callback();
            })
            .catch(function(e) {
                console.error(e);
            });
    });

    // Stop the database after all tests are done
    this.registerHandler('AfterFeatures', function(event, callback) {
        persistence.destroyConnectionPool(callback);
    });
};

module.exports = myHooks;