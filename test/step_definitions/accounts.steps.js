'use strict';

module.exports = function() {

    this.World = require('./support/world').World;

    this.Given(/^an account called "([^"]*)"$/, function(name, callback) {
        this.createAccount(name, callback);
    });

    this.When(/^I create an account called "([^"]*)"$/, function(name, callback) {
        this.createAccount(name, callback);
    });

    this.When(/^I change the account name to "([^"]*)"$/, function(name, callback) {
        this.changeAccountName(name, callback);
    });

    this.When(/^I ask for the account$/, function(callback) {
        this.getAccount(callback);
    });

    this.When(/^I delete the account$/, function(callback) {
        this.deleteAccount(callback);
    });

    this.Then(/^I should get the account called "([^"]*)"$/, function(name, callback) {
        this.assertAccountName(name);
        callback();
    });

    this.Then(/^the account should not exist$/, function(callback) {
        this.assertAccountDoesNotExist(callback);
    });
};