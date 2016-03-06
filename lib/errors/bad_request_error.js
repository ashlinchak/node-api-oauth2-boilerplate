'use strict';

var BaseError = require('./base_error');
var errors = require('../../config/errors');

class BadRequestError extends BaseError {
  constructor(message) {
    super(message);
    this.info = errors.badRequest;
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
