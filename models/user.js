var mongoose = require('mongoose');
var encryption = require('../lib/utils/encryption');

var User = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

User.methods.verifyPassword = function(password, cb) {
  encryption.validateHash(password, this.hashedPassword, function (err, isMatch) {
    if (err) { cb(err); }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', User);
