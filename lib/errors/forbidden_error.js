'use strict';

var BaseError = require('./base_error');
var errors = require('../../config/errors');

class ForbiddenError extends BaseError {
  constructor(message) {
    super(message);
    this.info = errors.forbidden;
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
