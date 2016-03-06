'use strict';

var passport = require('passport');
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var issuer = require('./issuer');

passport.use(new ClientPasswordStrategy(issuer.clientAuthenticate));
passport.use(new BasicStrategy(issuer.userAuthenticate));
passport.use(new BearerStrategy(issuer.bearerAuthenticate));

exports.clientAuthenticated = passport.authenticate('oauth2-client-password', { session: false });
exports.userAuthenticated = passport.authenticate('basic', { session: false });
exports.authenticated = passport.authenticate('bearer', { session: false });
exports.passport = passport;
