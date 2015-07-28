'use strict';

var domain = require('../../domain');

var resultMaps = [
    {
        mapId: 'accountMap',
        createNew: function() {
            return new domain.Account();
        },
        properties: [
            {name: 'name', column: 'name'}
        ]
    }
];

module.exports = resultMaps;
