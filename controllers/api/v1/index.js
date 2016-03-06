'use strict';

var express = require('express');
var UsersController = require('./users_controller');
var auth = require('../../../lib/auth/auth');

var router = express.Router();

// User endpoints
router.route('/users')
  .get(auth.authenticated, UsersController.index);

module.exports = router;
