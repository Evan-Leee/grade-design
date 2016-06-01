'use strict';

var Reflux = require('reflux');
var DashboardActions = require('../../actions/dashboard/dashboard-actions');
var request = require('superagent');
var nocache = require('superagent-no-cache');
var errorHandler = require('../../../../tools/error-handler.jsx');
var page = require('page');

var DashboardStore = Reflux.createStore({
  listenables: DashboardActions,


});

module.exports = DashboardStore;
