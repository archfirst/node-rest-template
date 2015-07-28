'use strict';

/**
 * An account.
 *   {int}     id
 *   {String}  name - name of the account
 *
 * Example:
 *   {
 *       id: [number],
 *       name: 'Cash'
 *   }
 */

var _ = require('lodash');

var Account = function(accountData) {
    if (accountData) {
        _.extend(this, accountData);
    }
};

module.exports = Account;
