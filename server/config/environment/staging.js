'use strict';

// Inherit from the development environment.
var config = require('./development.js');

config.seedDB = false;

module.exports = config;
