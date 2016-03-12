'use strict';

var nconf = require('nconf');
var fs = require('fs');
var path = require('path');

var env = process.env.NODE_ENV || 'development';
var defaultConfigPath = path.join(__dirname, 'defaults.json');
var envConfigPath = path.join(__dirname, env + '.json');
var defaults = JSON.parse(fs.readFileSync(defaultConfigPath));

nconf.argv().env().file({ file: envConfigPath });
nconf.defaults(defaults);

module.exports = nconf;
