'use strict';

var oauth2orize = require('oauth2orize');

var models = require('../../models');
var auth = require('./auth');
var config = require('../../config');
var encryption = require('../utils/encryption');
var errors = require('../errors');

var server = oauth2orize.createServer();

// Generic error handler
var errFn = function (cb, err) {
  if (err) { return cb(err); }
};

var generateAccessAndRefreshTokens = function (userId, clientId, done) {
  var errorHandler = errFn.bind(undefined, done);
  var valueForAccessToken = encryption.generateToken();
  var valueForRefreshToken = encryption.generateToken();

  var accessToken = new models.AccessToken({
    userId: userId,
    clientId: clientId,
    token: valueForAccessToken,
    expiresIn: config.get('auth:accessToken:expiresIn'),
  });

  var refreshToken = new models.RefreshToken({
    userId: userId,
    clientId: clientId,
    token: valueForRefreshToken,
    expiresIn: config.get('auth:refreshToken:expiresIn'),
  });

  refreshToken.save(errorHandler);
  accessToken.save(function (err, token) {
    if (err) return done(err);

    var additionalAttributes = {
      expires_in: token.expiresIn,
      resource: config.get('reource'),
    };
    return done(null, token.token, refreshToken.token, additionalAttributes);
  });
};

// Exchanges authorization codes for access tokens.
server.exchange(oauth2orize.exchange.authorizationCode(function (client, code, redirectURI, done) {
  models.AuthorizationCode.findOne({ code: code }, function (err, authorizationCode) {
    if (err) return done(err);
    if (!authorizationCode) return done(null, false);
    if (authorizationCode.isExpired()) return done(null, false);
    if (client.id !== authorizationCode.clientId) return done(null, false);

    authorizationCode.remove(function (err) {
      if (err) return done(err);

      generateAccessAndRefreshTokens(authorizationCode.userId, client.clientId, done);
    });
  });
}));

// Use Refresh Token to Request a New Access Token
server.exchange(oauth2orize.exchange.refreshToken(function (client, token, scope, done) {
  models.RefreshToken.findOne({ token: token }, function (err, refreshToken) {
    if (err) return done(err);
    if (!refreshToken) return done(null, false);
    if (refreshToken.isExpired()) return done(null, false);

    refreshToken.remove(function (err) {
      if (err) return done(err);

      generateAccessAndRefreshTokens(refreshToken.userId, client.clientId, done);
    });
  });
}));

exports.server = server;
exports.token = [
  auth.userAuthenticated,
  auth.clientAuthenticated,
  server.token(),
  server.errorHandler(),
];
