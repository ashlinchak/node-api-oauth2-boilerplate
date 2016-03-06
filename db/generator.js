var faker = require('faker');

var log = require('../lib/log')(module);
var db = require('../db/mongoose');
var config = require('../config/');
var encryption = require('../lib/utils/encryption');

var models = require('../models/');

var User = models.User;
var Client = models.Client;
var AccessToken = models.AccessToken;
var RefreshToken = models.RefreshToken;
var AuthorizationCode = models.AuthorizationCode;

User.find({}, function (err, users) {
  console.log('users: ' + users);
  if (err) throw err;

  // object of all the users
  console.log(users);
});

User.remove({}, function (err) {
  var user = new User({
    username: config.get('default:user:username'),
    email: config.get('default:user:email'),
  });
  user.password = config.get('default:user:password');

  encryption.generateHash(user.password, function (err, hash, salt) {
    if (!err) {
      user.hashedPassword = hash;
      user.salt = salt;
      user.save(function (err, user) {
        if (!err) {
          log.info('New user - %s:%s', user.username, user.password);
        } else {
          return log.error(err);
        }
      });
    } else {
      return log.error(err);
    }
  })
});

Client.remove({}, function (err) {
  var client = new Client({
    name: config.get('default:client:name'),
    clientId: config.get('default:client:clientId'),
    clientSecret: config.get('default:client:clientSecret')
  });

  client.save(function (err, client) {
    if (!err) {
      log.info('New client - %s:%s', client.clientId, client.clientSecret);
    } else {
      return log.error(err);
    }
  });
});

AccessToken.remove({}, function (err) {
  if (err) {
    return log.error(err);
  }
});

RefreshToken.remove({}, function (err) {
  if (err) {
    return log.error(err);
  }
});

setTimeout(function () {
  db.disconnect();
}, 3000);
