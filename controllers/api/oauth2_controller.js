'use strict';

var express = require('express');
var oauth2 = require('../../lib/auth/oauth2');
var auth = require('../../lib/auth/auth');
var encryption = require('../../lib/utils/encryption');
var config = require('../../config');
var models = require('../../models');
var errors = require('../../lib/errors/');

var router = express.Router();

router.post('/token', oauth2.token);

router.get('/authorize', auth.userAuthenticated, function (req, res, next) {
  var response_type = req.query.response_type;
  if (!response_type) {
    return next(new errors.BadRequestError('Missing required parameter: response_type'));
  }
  if (response_type != 'code') {
    return next(new errors.BadRequestError('Unsupported response type: ' + response_type));
  }
  if (!req.query.client_id) {
    return next(new errors.BadRequestError('Missing required parameter: client_id'));
  }

  models.Client.findOne({ clientId: req.query.client_id }, function (err, client) {
    if (err) return next(err);
    if (!client) {
      return next(new errors.NotFoundError('Client not found.'));
    } else {
      var code = encryption.generateToken();
      var authorizationCode = new models.AuthorizationCode({
        code: code,
        clientId: client.id,
        userId: req.user.id,
        expiresIn: config.get('auth:authorizationCode:expiresIn'),
        redirectUri: req.query.redirect_uri
      });

      authorizationCode.save(function (err, model) {
        if (err) return next(err);
        res.json({
          code: model.code,
        });
      });
    }
  });
});

module.exports = router;
