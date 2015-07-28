'use strict';

module.exports = function() {
    var root = './';
    var server = './server/';
    var test   = './test/';

    var config = {
        alljs: [
            root + '*.js',
            server + '**/*.js',
            test + '**/*.js'
        ],
        root: root,
        server: server,
        test: test,
        testDependencies: [
            server + '**/*',
            test + '**/*'
        ],

        /* ----- Tests ----- */
        features: test + 'features/',
        steps: test + 'step_definitions/',

        /* ----- Node settings ----- */
        nodeServer: server + 'server.js',
        defaultPort: '8080'
    };

    return config;
};