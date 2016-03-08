var mongoose = require('mongoose');
var _ = require('lodash');

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

User.statics.fieldsForJSON = ['id', 'username', 'email', 'createdAt'];

// Viruals
User.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.salt = encryption.generateSaltSync();
    this.hashedPassword = encryption.generateHashSync(password, this.salt);
  })
  .get(function () { return this._plainPassword; });

// Class methods
User.methods.forJSON = function () {
  return _.pick(this, this.constructor.fieldsForJSON);
};

// Instance methods
User.methods.verifyPassword = function (password, cb) {
  encryption.validateHash(password, this.hashedPassword, function (err, isMatch) {
    if (err) { cb(err); }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', User);
