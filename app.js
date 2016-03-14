'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var debug = require('debug')('restapi');

var config = require('./config/');
var log = require('./lib/log')(module);
var oauth2 = require('./lib/auth/oauth2');
var middlewares = require('./middleware');
var db = require('./db/mongoose');

var app = express();

app.set('host', process.env.HOST || config.host || 'localhost');
app.set('port', process.env.PORT || config.port || 4002);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Set a public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(middlewares.RequestLoggerHandler);
app.use('/ping', middlewares.PingHandler);

// Router middleware
middlewares.Router(app);

// 404 error
app.all('*', middlewares.NotFoundHandler);

// Error handler
app.use(middlewares.ErrorHandler);

// Start app
app.listen(app.get('port'), function () {
  var message = '=> API Server | ' + app.get('host') + ':' + app.get('port') + ' | ' + app.get('env');
  console.log(message);
  debug(message);
  log.info(message);
});

module.exports = app;
