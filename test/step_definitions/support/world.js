/* jshint expr: true */
'use strict';

var expect = require('./chai-helpers').expect;
var application = require(process.cwd() + '/server/application');
var errors = require(process.cwd() + '/server/infrastructure').errors;
var accountService = application.accountService;


var World = function World(callback) {
    // Cached objects
    this.account = undefined;

    // ----- Accounts -----
    this.createAccount = function(name, callback) {
        var self = this;

        accountService.createAccount({name: name})
            .then(function(account) {
                self.account = account;
                callback();
            });
    };

    this.changeAccountName = function(name, callback) {
        var self = this;

        self.account.name = name;

        accountService.updateAccount(self.account)
            .then(function(account) {
                self.account = account;
                callback();
            });
    };

    this.getAccount = function(callback) {
        var self = this;

        accountService.getAccount(self.account.id)
            .then(function(account) {
                self.account = account;
                callback();
            });
    };

    this.deleteAccount = function(callback) {

        accountService.deleteAccount(this.account.id)
            .then(function() {
                callback();
            });
    };

    this.assertAccountName = function(expectedName) {
        expect(this.account.name).to.equal(expectedName);
    };

    this.assertAccountDoesNotExist = function(callback) {
        accountService.getAccount(this.account.id)
            .then(function(account) {
                callback.fail(new Error('Account exists: ' + account.get('name')));
            })
            .catch(errors.NotFoundError, function() {
                // NotFoundError is expected
                callback();
            });
    };

    callback();
};

module.exports = {
    World: World
};
