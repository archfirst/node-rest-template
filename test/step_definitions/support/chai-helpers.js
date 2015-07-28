'use strict';

var chai = require('chai');

// Matchers for common date comparisons
chai.use(require('chai-datetime'));

// Statistical and numerical assertions such as .almost.equal
chai.use(require('chai-stats'));

// Exports
module.exports = {
    expect: chai.expect
};
