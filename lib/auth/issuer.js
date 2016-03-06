  'use strict';

var models = require('../../models');
var errors = require('../errors');
var log = require('../log')(module);

exports.clientAuthenticate = function (clientId, secret, done) {
  models.Client.findOne({
    clientId: clientId,
    clientSecret: secret,
  }, function (err, client) {
    if (err) return done(err);
    if (!client) return done(null, false);

    return done(null, client);
  });
};

exports.userAuthenticate = function (username, password, done) {
  models.User.findOne({ email: username }, function (err, user) {
    if (err)
      return done(err);
    if (!user)
      return done(null, false);

    user.verifyPassword(password, (err, isMatch) => {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
};

exports.bearerAuthenticate = function (accessToken, done) {
  models.AccessToken.findOne({ token: accessToken }, function (err, token) {
    if (err) return done(err);
    if (!token) return done(null, false);
    if (token.isExpired()) return done(null, false);

    models.User.findById(token.userId, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'User Not Found.' });

      return done(null, user, { scope: '*' });
    });
  });
};
