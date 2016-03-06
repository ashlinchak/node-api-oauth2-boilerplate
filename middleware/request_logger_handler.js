'use strict';

var debug = require('debug')('restapi');

var log = require('../lib/log')(module);
var IP = require('../lib/utils/ip');

module.exports = function (req, res, next) {
  var message = 'Request: ' + req.method + ' ' + req.url;
  debug(message);
  log.info(message);
  next();
};
