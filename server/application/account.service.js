'use strict';

module.exports = {
    createAccount: createAccount,
    updateAccount: updateAccount,
    getAccount: getAccount,
    getAccounts: getAccounts,
    deleteAccount: deleteAccount
};

var persistence = require('./persistence');
var AccountRepository = persistence.accountRepository;

/**
 * Creates a new account and inserts it in to the database.
 * @param {Object} accountData - Full account data, excluding the id. For example:
 * {
 *     name: 'Cash'
 * }
 * @return {Promise} A promise that returns a full copy of the inserted account (including the id) on fulfillment.
 */
function createAccount(accountData) {
    return AccountRepository.createAccount(accountData);
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
    return AccountRepository.updateAccount(accountData);
}

/**
 * Gets an existing account.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired account on fulfillment.
 */
function getAccount(id) {
    return AccountRepository.getAccount(id);
}

/**
 * Gets all accounts.
 * @return {Promise} A promise that returns an array of all accounts on fulfillment.
 */
function getAccounts() {
    return AccountRepository.getAccounts();
}

/**
 * Deletes an account.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the account is deleted.
 */
function deleteAccount(id) {
    return AccountRepository.deleteAccount(id);
}
