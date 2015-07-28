'use strict';

module.exports = {
    addRoutes: addRoutes
};

/**
 * Adds routes to the api.
 */
function addRoutes(api) {
    api.post('/accounts', createAccount);
    api.put('/accounts/:id', updateAccount);
    api.get('/accounts', getAccounts);
    api.get('/accounts/:id', getAccount);
    api.delete('/accounts/:id', deleteAccount);
}


var infrastructure = require('../../infrastructure');
var log = infrastructure.logger;
var errors = infrastructure.errors;

var application = require('../../application');
var accountService = application.accountService;

/**
 * Creates a new account.
 */
function createAccount(req, res) {

    var accountData = req.body;

    accountService.createAccount(accountData)
        .then(function(account) {
            res.send(account);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Updates an existing account.
 */
function updateAccount(req, res) {

    var accountData = req.body;

    accountService.updateAccount(accountData)
        .then(function(account) {
            res.send(account);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets an existing account.
 */
function getAccount(req, res) {

    var id = req.params.id;

    accountService.getAccount(id)
        .then(function(account) {
            res.send(account);
        })
        .catch(errors.NotFoundError, function() {
            res.status(404).send({'message': 'Account ' + id + ' does not exist'});
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets all accounts.
 */
function getAccounts(req, res) {
    accountService.getAccounts()
        .then(function(accounts) {
            res.send(accounts);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Deletes an account.
 */
function deleteAccount(req, res) {

    var id = req.params.id;

    accountService.deleteAccount(id)
        .then(function() {
            res.status(204).send();  // No Content
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
