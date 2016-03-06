'use strict';

var OAuth2Controller = require('../controllers/api/oauth2_controller');
var ApiV1Controllers = require('../controllers/api/v1');

module.exports = function (app) {
  app.use('/api/oauth2', OAuth2Controller);
  app.use('/api/v1', ApiV1Controllers);
};
