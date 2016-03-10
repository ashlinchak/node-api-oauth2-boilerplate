'use strict';

var nconf = require('nconf');
var fs = require('fs');

var defaults = JSON.parse(fs.readFileSync(process.cwd() + '/config/defaults.json'));

var env = process.env.NODE_ENV || 'development';

nconf.argv().env().file({
  file: process.cwd() + '/config/' + env + '.json',
});

nconf.defaults(defaults);

module.exports = nconf;
