'use strict';

var mongoose = require('mongoose');

var date = require('../lib/utils/date');

var AuthorizationCode = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  redirectUri: {
    type: String
  },
  expiresIn: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

AuthorizationCode.methods.isExpired = function () {
  return date.isExpired(this.createdAt, this.expiresIn);
};

module.exports  = mongoose.model('AuthorizationCode', AuthorizationCode);
