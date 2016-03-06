'use strict';

var log = require('../lib/log')(module);
var NotFoundError = require('../lib/errors/not_found_error');

module.exports = function (req, res, next) {
  log.debug('%s %d %s', req.method, res.statusCode, req.url);
  return next(new NotFoundError());
};
