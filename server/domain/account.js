'use strict';

var _ = require('lodash');

var Account = function(accountData) {
    if (accountData) {
        _.extend(this, accountData);
    }
};

module.exports = Account;
