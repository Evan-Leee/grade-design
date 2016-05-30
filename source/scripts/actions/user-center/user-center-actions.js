'use strict';

var Reflux = require('reflux');

var UserCenterActions = Reflux.createActions([
  'loadUserDetail',
  'updateUserDetail',
  'changeState',
  'changeGender',
  'validateGender',
  'checkGender',
  'loadResult'
]);

module.exports = UserCenterActions;
