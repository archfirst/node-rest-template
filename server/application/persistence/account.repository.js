'use strict';

module.exports = {
    createAccount: createAccount,
    updateAccount: updateAccount,
    getAccount: getAccount,
    getAccounts: getAccounts,
    deleteAccount: deleteAccount
};

var knex = require('./db').knex;
var joinjs = require('join-js');
var resultMaps = require('./resultmaps');
var Account = require('../../domain').Account;

/**
 * Creates a new account and inserts it in to the database.
 * @param {Object} accountData minus the id
 * @return {Promise} A promise that returns the inserted account (including the id)
 */
function createAccount(accountData) {

    var account = new Account(accountData);

    return knex('accounts')
        .returning('id')
        .insert(account)
        .then(function(ids) {
            account.id = ids[0];
            return account;
        });
}

/**
 * Updates an existing account.
 * @param {Object} accountData including the id
 * @return {Promise} A promise that returns the updated account (including the id)
 */
function updateAccount(accountData) {

    var account = new Account(accountData);

    return knex('accounts')
        .where('id', account.id)
        .update(account)
        .then(function() {
            return account;
        });
}

/**
 * Gets an existing account.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired account.
 */
function getAccount(id) {
    return knex
        .select('id', 'name')
        .from('accounts')
        .where('id', id)

        .then(function(resultSet) {
            return joinjs.mapOne(resultSet, resultMaps, 'accountMap');
        });
}

/**
 * Gets all accounts.
 * @return {Promise} A promise that returns an array of all accounts.
 */
function getAccounts() {
    return knex
        .select('id', 'name')
        .from('accounts')

        .then(function(resultSet) {
            return joinjs.map(resultSet, resultMaps, 'accountMap');
        });
}

/**
 * Deletes an account.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the account is deleted.
 */
function deleteAccount(id) {
    return knex('accounts')
        .where('id', id)
        .delete();
}
