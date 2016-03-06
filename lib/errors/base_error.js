'use strict';

class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor.name);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

module.exports = BaseError;
