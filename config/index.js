'use strict';

var nconf = require('nconf');

nconf.argv().env().file({
  file: process.cwd() + '/config/options.json',
});

module.exports = nconf;
