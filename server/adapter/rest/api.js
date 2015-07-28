/**
 * api.js
 * Returns the api that will be used to create the HTTP server
 */
'use strict';

var express = require('express');
var api = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// Add middleware to enable CORS
api.use(cors());

// Add middleware to parse the POST data of the body
api.use(bodyParser.urlencoded({extended: true}));

// Add middleware to parse application/json
api.use(bodyParser.json());

// Serve static content from the public directory
api.use('/', express.static(__dirname + '/../../public'));

// Add API routes
require('./account.resource').addRoutes(api);

module.exports = api;