'use strict';

var User = require('../../../models/user');
var InternalServerError = require('../../../lib/errors/internal_server_error');

exports.index = function (req, res, next) {
  User.find({}, 'email username createdAt', function (err, users) {
    if (!err) {
      return res.json(users);
    } else {
      log.error('Internal error(%d): %s', res.statusCode, err.message);
      return next(new InternalServerError(err.message));
    }
  });
};
