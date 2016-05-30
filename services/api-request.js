'use strict';

var yamlConfig = require('node-yaml-config');
var apiServer = yamlConfig.load('./config/config.yml').paperApiServer;
var baseApiRequest = require('./base-api-request');

var apiRequest = baseApiRequest(apiServer);

module.exports = apiRequest;
