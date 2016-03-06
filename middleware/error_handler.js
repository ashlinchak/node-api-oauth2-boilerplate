'use strict';

var errors = require('../lib/errors/');

module.exports = function (err, req, res, next) {
  if (err instanceof errors.BaseError) {
    if (err.message) {
      err.info.message = err.message;
    }

    res.status(err.statusCode).json(err.info);
  } else {
    var internalServerError = new errors.InternalServerError();
    if (err.message) {
      internalServerError.info.message = err.message;
    }

    res.status(internalServerError.statusCode).json(internalServerError.info);
  }
};
