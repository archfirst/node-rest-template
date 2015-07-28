var createError = require('create-error');

var errors = {
    // Thrown when a persisted object is not found
    NotFoundError: createError('NotFoundError')
};

module.exports = errors;
