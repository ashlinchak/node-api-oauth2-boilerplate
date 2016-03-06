'use strict';

var BaseError = require('./base_error');
var errors = require('../../config/errors');

class NotFoundError extends BaseError {
  constructor(message) {
    super(message);
    this.info = errors.notFound;
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
