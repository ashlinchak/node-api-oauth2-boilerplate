'use strict';

var bcrypt = require('bcrypt');
var crypto = require('crypto');
var config = require('../../config/');

// // cb = function(err, encrypted) {}
var generateHash = function (string, cb) {
  bcrypt.genSalt(config.get('bcrypt:rounds'), function (err, salt) {
    bcrypt.hash(string, salt, function (err, hash) {
      if (err) { cb(err); }

      cb(null, hash, salt);
    });
  });
};

// cb = function(err, res) {}
// res can be true of false
var validateHash = function (string, hash, cb) {
  bcrypt.compare(string, hash, function (err, isMatch) {
    if (err) { cb(err); }

    cb(null, isMatch);
  });
};

var generateToken = function () {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateHash: generateHash,
  validateHash: validateHash,
  generateToken: generateToken,
};
