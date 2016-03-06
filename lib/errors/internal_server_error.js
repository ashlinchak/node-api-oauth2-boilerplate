'use strict';

var BaseError = require('./base_error');
var errors = require('../../config/errors');

class InternalServerError extends BaseError {
  constructor(message) {
    super(message);
    this.info = errors.internalServerError;
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
