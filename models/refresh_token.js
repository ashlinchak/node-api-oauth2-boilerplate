'use strict';

var mongoose = require('mongoose');

var date = require('../lib/utils/date');

var RefreshToken = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
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

RefreshToken.methods.isExpired = function () {
  return date.isExpired(this.createdAt, this.expiresIn);
};

module.exports  = mongoose.model('RefreshToken', RefreshToken);
