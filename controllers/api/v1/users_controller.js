'use strict';

var User = require('../../../models/user');
var InternalServerError = require('../../../lib/errors/internal_server_error');

/**
* @api {get} /api/v1/users Get list of users
* @apiVersion 1.0.0
* @apiName GetUsers
* @apiGroup User
*
* @apiParam {Number} [limit=20]
* @apiParam {Number} [offset=0]
*
* @apiUse AuthorizationByAccessToken
*
* @apiSuccess {Object[]} users List of users.
* @apiSuccess {id} users.id User's id.
* @apiSuccess {email} users.email User's email.
*
* @apiSuccessExample {json} Success-Response:
*   HTTP/1.1 200 OK
*    [{
*      "id": "1",
*      "email": "mail@mail.com"
*    }]
* @apiUse InternalAPIServerError
* @apiUse UnauthorizedError
**/
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
