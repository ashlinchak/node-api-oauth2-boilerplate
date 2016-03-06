'use strict';

var config = require('../config');

exports.get = function (req) {
  var limit = req.query.limit || config.pagination.limit;
  var offset = req.query.offset || 0;
  return {
    limit: limit,
    offset: offset,
  };
};
