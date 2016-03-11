'use strict';

var nconf = require('nconf');
var fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var defaultConfigPath = null;
var envConfigPath = null;

if (process.NODE_ENV == 'production') {
  defaultConfigPath = process.cwd() + 'current/config/defaults.json';
} else {
  defaultConfigPath = process.cwd() + '/config/defaults.json';
}

if (process.NODE_ENV == 'production') {
  envConfigPath = process.cwd() + '/current/config/' + env + '.json';
} else {
  envConfigPath = process.cwd() + '/config/' + env + '.json';
}

var defaults = JSON.parse(fs.readFileSync(defaultConfigPath));

nconf.argv().env().file({ file: envConfigPath });

nconf.defaults(defaults);

module.exports = nconf;
