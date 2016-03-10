'use strict';

var nconf = require('nconf');

var env = process.env.NODE_ENV || 'development';

nconf.argv().env().file({
  file: process.cwd() + '/config/' + env + '.json',
});

module.exports = nconf;
