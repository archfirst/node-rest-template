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
var errors = require('./../../infrastructure/errors');
var resultMaps = require('./resultmaps');
var domain = require('../../domain');
var Account = domain.Account;

/**
 * Creates a new account and inserts it in to the database.
 * @param {Object} accountData - Full account data, excluding the id. For example:
 * {
 *     name: 'Cash'
 * }
 * @return {Promise} A promise that returns a full copy of the inserted account (including the id) on fulfillment.
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
 * @param {Object} accountData - Full account data, including the id. For example:
 * {
 *     id: 1,
 *     name: 'Cash'
 * }
 * @return {Promise} A promise that returns a full copy of the updated account on fulfillment.
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
 * @return {Promise} A promise that returns the desired account on fulfillment.
 */
function getAccount(id) {
    return knex
        .select('id', 'name')
        .from('accounts')
        .where('id', id)

        .then(function(resultSet) {
            return joinjs.mapOne(resultSet, resultMaps, 'accountMap');
        })
        .catch(joinjs.NotFoundError, function(e) {
            throw new errors.NotFoundError(e.message);
        });
}

/**
 * Gets all accounts.
 * @return {Promise} A promise that returns an array of all accounts on fulfillment.
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
