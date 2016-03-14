'use strict';

var express = require('express');
var oauth2 = require('../../lib/auth/oauth2');
var auth = require('../../lib/auth/auth');
var encryption = require('../../lib/utils/encryption');
var config = require('../../config');
var models = require('../../models');
var errors = require('../../lib/errors/');

var router = express.Router();

/**
* @api {post} /api/oauth2/token Use Authorization Code to Request an Access Token
* @apiVersion 1.0.0
* @apiName GetAccessToken
* @apiGroup Auth
*
* @apiParam {Number} client_id [Required] The client ID of the native client application.
* @apiParam {String} client_secret [Required] The client secret code of the native client application.
* @apiParam {String} grant_type [Required] Indicated the type of grant you are using. For an authorization code grant, the value is <b>authorization_code</b>.
*
* @apiHeader {String} Authorization [Required] Authorization value.
*
* @apiSuccess {String} access_token AccessToken
* @apiSuccess {String} token_type Token type. Value is <b>Bearer</b>
* @apiSuccess {Number} expires_in Total seconds when Access Token will be expired.
* @apiSuccess {String} resource Resource where the Access Token is valid.
* @apiSuccess {String} refresh_token Refresh Token for generating a new Access Token.
*
* @apiSuccessExample {json} Success-Response:
*   HTTP/1.1 200 OK
*    {
*    	"access_token": "b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65",
*    	"token_type": "Bearer",
*    	"expires_in": "3600",
*    	"resource": "node-api-oauth2-boilerplate",
*    	"refresh_token": "b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65"
*    }
*
* @apiUse InternalAPIServerError
* @apiUse UnauthorizedError
**/

/**
* @api {post} /api/oauth2/token Use Refresh Token to Request a New Access Token
* @apiVersion 1.0.0
* @apiName ExchangeRefreshTokenOnAccessToken
* @apiGroup Auth
*
* @apiParam {Number} client_id [Required] The client ID of the native client application.
* @apiParam {String} client_secret [Required] The client secret code of the native client application.
* @apiParam {String} grant_type [Required] Indicates the type of grant being used. In this case, the value must be <b>refresh_token</b>.
* @apiParam {String} refresh_token [Required] The refresh token that was included in the response that provided the access token.
*
* @apiHeader {String} Authorization [Required] Authorization value.
*
* @apiSuccess {String} access_token AccessToken
* @apiSuccess {String} token_type Token type. Value is <b>Bearer</b>
* @apiSuccess {Number} expires_in Total seconds when Access Token will be expired.
* @apiSuccess {String} resource Resource where the Access Token is valid.
* @apiSuccess {String} refresh_token Refresh Token for generating a new Access Token.
*
* @apiSuccessExample {json} Success-Response:
*   HTTP/1.1 200 OK
*    {
*    	"access_token": "b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65",
*    	"token_type": "Bearer",
*    	"expires_in": "3600",
*    	"resource": "node-api-oauth2-boilerplate",
*    	"refresh_token": "b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65"
*    }
*
* @apiUse InternalAPIServerError
* @apiUse UnauthorizedError
**/
router.post('/token', oauth2.token);

/**
* @api {post} /api/oauth2/authorize Request an Authorization Code
* @apiVersion 1.0.0
* @apiName GetAuthorizationCode
* @apiGroup Auth
*
* @apiParam {Number} client_id [Required] The client ID of the native client application.
* @apiParam {String} response_type [Required] Specifies the requested response type. In an authorization code grant request, the value must be <b>code</b>.
* @apiParam {String} [redirect_uri] [Not implemented] Specifies the reply URL of the application.
*
* @apiHeader {String} Authorization [Required] Authorization value.
*
* @apiSuccess {String} code AuthorizationCode.
*
* @apiSuccessExample {json} Success-Response:
*   HTTP/1.1 200 OK
*    {
*    	"code": "b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65"
*    }
*
* @apiUse InternalAPIServerError
* @apiUse UnauthorizedError
**/
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
